import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DEFAULT_FALLBACK_RATES = {
  base_market_rate: 32.78,
  gov_incentive_percent: 2.5,
  last_updated: "Live Today (06:00 AM AST)",
  providers: [
    {
      provider_name: "Urpay (Al Rajhi Digital)",
      provider_code: "urpay",
      rate_bdt: 32.43,
      fee_sar: 15.0,
      transfer_speed: "তাৎক্ষণিক (Instant via bKash / Account)",
      incentive_percent: 2.5,
      is_best_rate: true,
    },
    {
      provider_name: "STC Pay (Western Union)",
      provider_code: "stc_pay",
      rate_bdt: 32.50,
      fee_sar: 17.25,
      transfer_speed: "১০ মিনিট (Instant Wallet Transfer)",
      incentive_percent: 2.5,
      is_best_rate: false,
    },
    {
      provider_name: "Mobily Pay",
      provider_code: "mobily_pay",
      rate_bdt: 32.48,
      fee_sar: 15.0,
      transfer_speed: "তাৎক্ষণিক (Instant bKash/Nagad)",
      incentive_percent: 2.5,
      is_best_rate: false,
    },
    {
      provider_name: "Al Rajhi Tahweel",
      provider_code: "tahweel_rajhi",
      rate_bdt: 32.38,
      fee_sar: 18.0,
      transfer_speed: "তাৎক্ষণিক ক্যাশ পিকআপ ও ব্যাংক",
      incentive_percent: 2.5,
      is_best_rate: false,
    },
    {
      provider_name: "SNB QuickPay",
      provider_code: "snb_quickpay",
      rate_bdt: 32.33,
      fee_sar: 20.0,
      transfer_speed: "২ থেকে ৪ ঘণ্টা (Bank Account Credit)",
      incentive_percent: 2.5,
      is_best_rate: false,
    },
    {
      provider_name: "Enjaz Bank (Albilad)",
      provider_code: "enjaz",
      rate_bdt: 32.28,
      fee_sar: 22.0,
      transfer_speed: "একই দিনে ব্যাংক ডিপোজিট",
      incentive_percent: 2.5,
      is_best_rate: false,
    },
  ],
};

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "rates.json");
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, "utf-8");
      const rates = JSON.parse(fileData);
      return NextResponse.json(rates, {
        headers: {
          "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
        },
      });
    }
  } catch (err) {
    console.error("[RATES FILE READ ERROR]", err);
  }

  return NextResponse.json(DEFAULT_FALLBACK_RATES, {
    headers: {
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}
