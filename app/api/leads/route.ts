import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const LEADS_FILE_PATH = path.join(process.cwd(), "data", "leads.json");

// In-memory rate limiter for lead submissions: IP -> timestamp array
const RATE_LIMIT_MAP: Record<string, number[]> = {};
const RATE_LIMIT_MAX = 5; // Max 5 leads per IP
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (RATE_LIMIT_MAP[ip] || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (timestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }
  timestamps.push(now);
  RATE_LIMIT_MAP[ip] = timestamps;
  return true;
}

// XSS Sanitizer: strips HTML tags and limits length
function sanitizeString(input: any, maxLength = 255): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/<[^>]*>/g, "") // Strip HTML tags
    .replace(/[<>"'&]/g, "") // Strip dangerous entity chars
    .trim()
    .slice(0, maxLength);
}

// Verify Admin HMAC Token
function verifyAdminAuth(req: NextRequest): boolean {
  const tokenFromHeader = req.headers.get("x-admin-token");
  const tokenFromCookie = req.cookies.get("probashi_admin_token")?.value;
  const token = tokenFromHeader || tokenFromCookie;
  if (!token) return false;

  const secret = process.env.ADMIN_SECRET_KEY || "probashi_hub_secure_key_2026";
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);

  const expectedToday = crypto
    .createHmac("sha256", secret)
    .update(`admin_session_${today}`)
    .digest("hex");
  const expectedYesterday = crypto
    .createHmac("sha256", secret)
    .update(`admin_session_${yesterday}`)
    .digest("hex");

  return token === expectedToday || token === expectedYesterday;
}

function getLocalLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const content = fs.readFileSync(LEADS_FILE_PATH, "utf-8");
      return JSON.parse(content || "[]");
    }
  } catch (err) {
    console.error("[LOCAL LEADS READ ERROR]");
  }
  return [];
}

function saveLocalLead(newLead: any) {
  try {
    const existing = getLocalLeads();
    const updated = [newLead, ...existing.filter((item) => item.id !== newLead.id)];
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("[LOCAL LEADS WRITE ERROR]");
  }
}

function updateLocalLeadStatus(leadId: string, status: string, notes?: string) {
  try {
    const existing = getLocalLeads();
    const updated = existing.map((item) => {
      if (item.id === leadId) {
        return {
          ...item,
          status,
          admin_notes: notes !== undefined ? notes : item.admin_notes,
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.error("[LOCAL LEADS UPDATE ERROR]");
    return false;
  }
}

// GET: Securely fetch leads (Admin Auth Required)
export async function GET(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, message: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন টোকেন আবশ্যক।" },
      { status: 401 }
    );
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project") && !supabaseUrl.includes("mock-supabase")) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from("b2b_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        return NextResponse.json({
          success: true,
          source: "supabase",
          leads: data,
          total: data.length,
        });
      }
    }

    // Fallback to local storage
    const localLeads = getLocalLeads();
    return NextResponse.json({
      success: true,
      source: "local_storage",
      leads: localLeads,
      total: localLeads.length,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "লিড ডাটা লোড করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}

// POST: Public submission with Anti-Spam Rate Limiting and Sanitization
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "আপনি অল্প সময়ে অনেকবার চেষ্টা করেছেন। অনুগ্রহ করে ১০ মিনিট পর আবার চেষ্টা করুন।" },
        { status: 429 }
      );
    }

    const body = await req.json();
    const user_name = sanitizeString(body?.user_name, 80);
    const phone_number = sanitizeString(body?.phone_number, 25);
    const whatsapp_number = sanitizeString(body?.whatsapp_number || body?.phone_number, 25);
    const saudi_city = sanitizeString(body?.saudi_city || "রিয়াদ (Riyadh)", 50);
    const service_category = sanitizeString(body?.service_category || "Legal Aid", 50);
    const service_slug = sanitizeString(body?.service_slug || "general-inquiry", 80);
    const service_title = sanitizeString(body?.service_title || "সাধারণ জিজ্ঞাসা ও আইনি সহায়তা", 100);
    const details = sanitizeString(body?.details || "পরামর্শ প্রয়োজন", 1000);

    // Validation
    if (!user_name || user_name.length < 2) {
      return NextResponse.json(
        { success: false, message: "অনুগ্রহ করে আপনার সঠিক নাম প্রদান করুন।" },
        { status: 400 }
      );
    }

    // Phone format check: minimum 8 chars, only digits, plus, hyphens, spaces
    if (!phone_number || phone_number.length < 8 || !/^[0-9+\-\s()]+$/.test(phone_number)) {
      return NextResponse.json(
        { success: false, message: "সঠিক ফোন বা হোয়াটসঅ্যাপ নম্বর প্রদান করুন।" },
        { status: 400 }
      );
    }

    const leadId = `lead_${Date.now()}`;
    const leadPayload = {
      id: leadId,
      user_name,
      phone_number,
      whatsapp_number,
      saudi_city,
      service_category,
      service_slug,
      service_title,
      details,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    // Save locally
    saveLocalLead(leadPayload);

    // Save to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project") && !supabaseUrl.includes("mock-supabase")) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("b2b_leads").insert([leadPayload]);
      } catch (sbErr) {
        console.error("[SUPABASE INSERT FAILED, SAVED LOCALLY]");
      }
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      message: "আপনার আবেদন সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের প্রতিনিধি যোগাযোগ করবেন।",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি হোয়াটসঅ্যাপ করুন।" },
      { status: 500 }
    );
  }
}

// PATCH: Securely update lead status (Admin Auth Required)
export async function PATCH(req: NextRequest) {
  if (!verifyAdminAuth(req)) {
    return NextResponse.json(
      { success: false, message: "অননুমোদিত অ্যাক্সেস। অ্যাডমিন টোকেন আবশ্যক।" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const lead_id = sanitizeString(body?.lead_id, 50);
    const status = sanitizeString(body?.status, 30);
    const notes = sanitizeString(body?.notes, 500);

    if (!lead_id || !status) {
      return NextResponse.json(
        { success: false, message: "lead_id এবং status আবশ্যক।" },
        { status: 400 }
      );
    }

    updateLocalLeadStatus(lead_id, status, notes);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project") && !supabaseUrl.includes("mock-supabase")) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from("b2b_leads")
          .update({ status, admin_notes: notes, updated_at: new Date().toISOString() })
          .eq("id", lead_id);
      } catch (sbErr) {
        console.error("[SUPABASE UPDATE FAILED]");
      }
    }

    return NextResponse.json({
      success: true,
      message: "লিড স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "লিড আপডেট করতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}
