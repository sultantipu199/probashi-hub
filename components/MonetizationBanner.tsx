"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plane, Scale, Coins, ShieldCheck, ArrowRight, MessageSquare, PhoneCall, Sparkles } from "lucide-react";

interface MonetizationBannerProps {
  type?: "cargo_travel" | "legal_aid" | "remittance_offer" | "inline_ad";
}

export default function MonetizationBanner({ type = "cargo_travel" }: MonetizationBannerProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

  if (type === "cargo_travel") {
    return (
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-blue-500/40 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shrink-0">
              <Plane className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-blue-900/80 text-blue-300 px-2 py-0.5 rounded-full border border-blue-700/50">
                  ভেরিফাইড স্পনসরশিপ
                </span>
                <span className="text-xs text-amber-300 font-bold">★ বিশেষ প্রবাসী ছাড়</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                সৌদি টু বাংলাদেশ ডোর-টু-ডোর এয়ার কার্গো ও বিমান টিকিট
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                রিয়াদ, জেদ্দা, দাম্মাম থেকে বাংলাদেশে লাগেজ ও মালামাল নিরাপদে ডেলিভারি নিন। সাশ্রয়ী ভাড়ায় রিটার্ন টিকেট বুকিং সহায়তা।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub থেকে কার্গো ও ট্রাভেল সার্ভিসের রেট এবং অফার জানতে চাই।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span>কার্গো রেট জানুন</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (type === "legal_aid") {
    return (
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-7 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/40 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-lg shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  আইনি সহায়তা ডেস্ক
                </span>
                <span className="text-xs text-emerald-400 font-bold">সরকারি ফি ছাড়া অতিরিক্ত নয়</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                সৌদি শ্রম আদালত ও কাফালা জটিলতায় সরাসরি লাইসেন্সধারী সহায়তা
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                ৩ মাসের বকেয়া বেতন ক্লেইম, কিওয়া চুক্তি বিরোধ ও হুরুব সংক্রান্ত জটিলতায় অনুমোদিত লিগ্যাল পার্টনারের পরামর্শ নিন।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub থেকে শ্রম আইন ও কাফালা সংক্রান্ত আইনি পরামর্শের জন্য যোগাযোগ করছি।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span>আইনজীবীর পরামর্শ নিন</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Default Inline Ad / Affiliate Slot
  return (
    <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        বিজ্ঞাপন ও পার্টনার সার্ভিস
      </div>
      <div className="text-sm font-bold text-white">
        বৈধ চ্যানেলে রেমিট্যান্স পাঠিয়ে বাংলাদেশ সরকারের নগদ ২.৫% প্রণোদনা নিশ্চিত করুন
      </div>
      <p className="text-xs text-slate-400 max-w-lg mx-auto">
        Urpay, STC Pay এবং Alinma Pay অ্যাপের মাধ্যমে সরাসরি বিকাশ বা ব্যাংক অ্যাকাউন্টে শূন্য ফিতে টাকা পাঠান।
      </p>
    </div>
  );
}
