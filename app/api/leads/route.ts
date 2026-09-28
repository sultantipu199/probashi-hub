import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

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

    const leadPayload = {
      user_name: user_name.trim(),
      phone_number: phone_number.trim(),
      whatsapp_number: (whatsapp_number || phone_number).trim(),
      saudi_city: saudi_city || "Riyadh",
      service_category: service_category || "Legal Aid",
      service_slug: service_slug || "general-inquiry",
      details: details ? details.trim() : "পরামর্শ প্রয়োজন",
      status: "pending",
      ip_address: req.headers.get("x-forwarded-for") || req.ip || "unknown",
      user_agent: req.headers.get("user-agent") || "unknown",
      created_at: new Date().toISOString(),
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let leadId = `lead_${Date.now()}`;

    if (supabaseUrl && supabaseKey && !supabaseUrl.includes("your-project")) {
      const supabase = createClient(supabaseUrl, supabaseKey);
      const { data, error } = await supabase.from("b2b_leads").insert([leadPayload]).select();
      if (error) {
        console.error("[SUPABASE LEADS ERROR]", error);
      } else if (data && data.length > 0) {
        leadId = data[0].id;
      }
    } else {
      console.log("[LOCAL LEAD RECORDED]", leadPayload);
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
