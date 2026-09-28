import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const LEADS_FILE_PATH = path.join(process.cwd(), "data", "leads.json");

function getLocalLeads(): any[] {
  try {
    if (fs.existsSync(LEADS_FILE_PATH)) {
      const content = fs.readFileSync(LEADS_FILE_PATH, "utf-8");
      return JSON.parse(content || "[]");
    }
  } catch (err) {
    console.error("[LOCAL LEADS READ ERROR]", err);
  }
  return [];
}

function saveLocalLead(newLead: any) {
  try {
    const existing = getLocalLeads();
    const updated = [newLead, ...existing.filter((item) => item.id !== newLead.id)];
    fs.writeFileSync(LEADS_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("[LOCAL LEADS WRITE ERROR]", err);
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
    console.error("[LOCAL LEADS UPDATE ERROR]", err);
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase
        .from("b2b_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
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
    console.error("[LEADS GET ERROR]", error);
    return NextResponse.json(
      { success: false, message: "লিড ডাটা লোড করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      user_name,
      phone_number,
      whatsapp_number,
      saudi_city,
      service_category,
      service_slug,
      service_title,
      details,
    } = body;

    // Strict validation
    if (!user_name || user_name.trim().length < 2) {
      return NextResponse.json(
        { success: false, message: "অনুগ্রহ করে আপনার সঠিক নাম প্রদান করুন।" },
        { status: 400 }
      );
    }

    if (!phone_number || phone_number.trim().length < 8) {
      return NextResponse.json(
        { success: false, message: "সঠিক ফোন বা হোয়াটসঅ্যাপ নম্বর প্রদান করুন।" },
        { status: 400 }
      );
    }

    const leadId = `lead_${Date.now()}`;
    const leadPayload = {
      id: leadId,
      user_name: user_name.trim(),
      phone_number: phone_number.trim(),
      whatsapp_number: (whatsapp_number || phone_number).trim(),
      saudi_city: saudi_city || "রিয়াদ (Riyadh)",
      service_category: service_category || "Legal Aid",
      service_slug: service_slug || "general-inquiry",
      service_title: service_title || "সাধারণ জিজ্ঞাসা ও আইনি সহায়তা",
      details: details ? details.trim() : "পরামর্শ প্রয়োজন",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    // Save locally first for guaranteed zero data loss
    saveLocalLead(leadPayload);

    // Save to Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase.from("b2b_leads").insert([leadPayload]);
      } catch (sbErr) {
        console.error("[SUPABASE INSERT FAILED, SAVED LOCALLY]", sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      lead_id: leadId,
      message: "আপনার আবেদন সফলভাবে গ্রহণ করা হয়েছে। শীঘ্রই আমাদের প্রতিনিধি যোগাযোগ করবেন।",
    });
  } catch (error: any) {
    console.error("[LEAD API EXCEPTION]", error);
    return NextResponse.json(
      { success: false, message: "সার্ভারে সমস্যা হয়েছে। অনুগ্রহ করে সরাসরি হোয়াটসঅ্যাপ করুন।" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { lead_id, status, notes } = body;

    if (!lead_id || !status) {
      return NextResponse.json(
        { success: false, message: "lead_id এবং status আবশ্যক।" },
        { status: 400 }
      );
    }

    // Update local storage
    updateLocalLeadStatus(lead_id, status, notes);

    // Update Supabase if configured
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        await supabase
          .from("b2b_leads")
          .update({ status, admin_notes: notes, updated_at: new Date().toISOString() })
          .eq("id", lead_id);
      } catch (sbErr) {
        console.error("[SUPABASE UPDATE FAILED]", sbErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "লিড স্ট্যাটাস সফলভাবে আপডেট করা হয়েছে।",
    });
  } catch (error: any) {
    console.error("[LEAD PATCH EXCEPTION]", error);
    return NextResponse.json(
      { success: false, message: "লিড আপডেট করতে ব্যর্থ হয়েছে।" },
      { status: 500 }
    );
  }
}
