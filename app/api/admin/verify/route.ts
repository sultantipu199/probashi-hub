import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// In-memory rate limiting and lockout state
const FAILED_ATTEMPTS: Record<string, { count: number; lockedUntil: number }> = {};
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
    const now = Date.now();

    // Check if IP is currently locked out
    const record = FAILED_ATTEMPTS[ip];
    if (record && record.lockedUntil > now) {
      const remainingMinutes = Math.ceil((record.lockedUntil - now) / 60000);
      return NextResponse.json(
        {
          success: false,
          message: `অতিরিক্ত ভুল চেষ্টার কারণে আপনার অ্যাক্সেস সাময়িকভাবে বন্ধ রয়েছে। অনুগ্রহ করে ${remainingMinutes} মিনিট পর আবার চেষ্টা করুন।`,
          isLocked: true,
        },
        { status: 429 }
      );
    }

    const body = await req.json();
    const pin = (body?.pin || "").trim();

    // Admin PIN from environment or secure production master default
    const MASTER_ADMIN_PIN = process.env.ADMIN_PIN || "probashi2026";

    if (pin && pin === MASTER_ADMIN_PIN) {
      // Clear failed attempts on success
      delete FAILED_ATTEMPTS[ip];

      // Generate a cryptographic session token
      const secret = process.env.ADMIN_SECRET_KEY || "probashi_hub_secure_key_2026";
      const token = crypto
        .createHmac("sha256", secret)
        .update(`admin_session_${new Date().toISOString().slice(0, 10)}`)
        .digest("hex");

      const response = NextResponse.json({
        success: true,
        message: "প্রমাণীকরণ সফল হয়েছে।",
        token,
      });

      // Set HttpOnly, Secure cookie
      response.cookies.set("probashi_admin_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 86400, // 24 hours
      });

      return response;
    }

    // Record failed attempt
    const currentCount = (record?.count || 0) + 1;
    const isNowLocked = currentCount >= MAX_ATTEMPTS;
    FAILED_ATTEMPTS[ip] = {
      count: currentCount,
      lockedUntil: isNowLocked ? now + LOCKOUT_MS : 0,
    };

    if (isNowLocked) {
      return NextResponse.json(
        {
          success: false,
          message: "অতিরিক্ত ভুল পিন দেওয়ার কারণে পরবর্তী ১৫ মিনিটের জন্য অ্যাক্সেস ব্লক করা হয়েছে।",
          isLocked: true,
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: `ভুল পিন নম্বর! অবশিষ্ট সুযোগ: ${MAX_ATTEMPTS - currentCount} বার।`,
        isLocked: false,
      },
      { status: 401 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "সার্ভারে প্রক্রিয়া করতে সমস্যা হয়েছে।" },
      { status: 500 }
    );
  }
}
