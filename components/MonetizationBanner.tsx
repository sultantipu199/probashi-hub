"use client";

import React from "react";
import Link from "next/link";
import {
  Plane,
  Scale,
  Coins,
  ShieldCheck,
  ArrowRight,
  MessageSquare,
  Car,
  Briefcase,
  Sparkles,
  ExternalLink
} from "lucide-react";

export type MonetizationType =
  | "cargo_travel"
  | "legal_aid"
  | "car_insurance"
  | "remittance_offer"
  | "misa_business"
  | "inline_ad";

interface MonetizationBannerProps {
  type?: MonetizationType;
  onOpenLead?: () => void;
  className?: string;
}

export default function MonetizationBanner({
  type = "cargo_travel",
  onOpenLead,
  className = "",
}: MonetizationBannerProps) {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

  // 1. CARGO & TRAVEL MONETIZATION BANNER
  if (type === "cargo_travel") {
    return (
      <div className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-2 border-blue-500/40 shadow-2xl ${className}`}>
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
            {onOpenLead ? (
              <button
                onClick={onOpenLead}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
              >
                <span>বুকিং অনুরোধ</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            ) : null}
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

  // 2. LEGAL AID & LABOR LAW MONETIZATION BANNER
  if (type === "legal_aid") {
    return (
      <div className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border-2 border-emerald-500/40 shadow-2xl ${className}`}>
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
                <span className="text-xs text-emerald-400 font-bold">অনুমোদিত সৌদি লিগ্যাল টিম</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                সৌদি শ্রম আদালত, বকেয়া বেতন ক্লেইম ও কাফালা জটিলতায় আইনি সহায়তা
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                ৩ মাসের বকেয়া বেতন আদায়, সার্ভিস বেনিফিট (গ্র্যাচুইটি ধারা ৮৪) ও অবৈধ হুরুব মামলায় সৌদি সনদপ্রাপ্ত আইনজীবীর সরাসরি পরামর্শ নিন।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            {onOpenLead ? (
              <button
                onClick={onOpenLead}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
              >
                <span>আইনি ফাইল সাবমিট</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            ) : null}
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

  // 3. CAR INSURANCE & DRIVING TEST MONETIZATION BANNER
  if (type === "car_insurance") {
    return (
      <div className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-amber-950 via-slate-900 to-rose-950 border-2 border-amber-500/40 shadow-2xl ${className}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-500 text-white shadow-lg shrink-0">
              <Car className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-900/80 text-amber-300 px-2 py-0.5 rounded-full border border-amber-700/50">
                  নাজম ও মুরুুর অনুমোদিত
                </span>
                <span className="text-xs text-amber-400 font-bold">ইনস্ট্যান্ট পলিসি ইস্যু</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                সৌদি গাড়ি ইন্স্যুরেন্স (তাওনিয়া/মালাথ) ও ড্রাইভিং স্কুল বুকিং
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                দাল্লাহ ড্রাইভিং টেস্ট ট্রেনিং প্যাকেজ এবং সবচেয়ে কম প্রিমিয়ামে থার্ড-পার্টি ও কমপ্রিহেন্সিভ ইন্স্যুরেন্স সরাসরি অনলাইনে অ্যাক্টিভ করুন।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub থেকে গাড়ি ইন্স্যুরেন্স কোটেশন ও ড্রাইভিং টেস্ট প্যাকেজ সম্পর্কে জানতে চাই।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span>ইন্স্যুরেন্স কোটেশন নিন</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 4. REMITTANCE & BANKING 2.5% CASHBACK BANNER
  if (type === "remittance_offer") {
    return (
      <div className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 border-2 border-emerald-500/40 shadow-2xl ${className}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-cyan-500 text-white shadow-lg shrink-0">
              <Coins className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                  রেমিট্যান্স অফার
                </span>
                <span className="text-xs text-amber-300 font-bold">বাংলাদেশ সরকার ২.৫% বোনাস</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Urpay, STC Pay ও Al Rajhi মাধ্যমে তাৎক্ষণিক বিকাশ ও ব্যাংকে রেমিট্যান্স
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                জিরো ট্রান্সফার ফি এবং সেরা রিয়াল-টাকা এক্সচেঞ্জ রেট দিয়ে প্রিয়জনের কাছে অর্থ পাঠান। ক্যাশ পিক-আপ কিংবা সরাসরি অ্যাকাউন্ট ডিপোজিট।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            <Link
              href="/#rates"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
            >
              <span>লাইভ রেট তুলনা করুন</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 5. MISA BUSINESS SETUP & COMMERCIAL REGISTRATION
  if (type === "misa_business") {
    return (
      <div className={`relative overflow-hidden rounded-3xl p-5 sm:p-7 bg-gradient-to-r from-purple-950 via-slate-900 to-slate-950 border-2 border-purple-500/40 shadow-2xl ${className}`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 relative z-10">
          <div className="flex items-start sm:items-center space-x-4">
            <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 text-white shadow-lg shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider bg-purple-900/80 text-purple-300 px-2 py-0.5 rounded-full border border-purple-700/50">
                  MISA ইনভেস্টর ডেস্ক
                </span>
                <span className="text-xs text-purple-300 font-bold">১০০% ফরেন ওনারশিপ</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                সৌদি আরবে নিজস্ব কোম্পানি, ট্রেড লাইসেন্স (CR) ও প্রিমিয়াম রেসিডেন্সি
              </h3>
              <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                কফিল ছাড়া বৈধভাবে নিজের ব্যবসা শুরু করুন। MISA ইনভেস্টমেন্ট লাইসেন্স, ব্যাংক অ্যাকাউন্ট ও বাণিজ্যিক চেম্বার রেজিস্ট্রেশন গাইড।
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2.5 shrink-0 w-full sm:w-auto">
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub থেকে সৌদি আরবে MISA কোম্পানি সেটআপ ও ইনভেস্টর লাইসেন্স সম্পর্কে জানতে চাই।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center shadow-lg transition"
            >
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              <span>ইনভেস্টর কনসালটেন্সি</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // 6. DEFAULT INLINE NATIVE AD / AFFILIATE SLOT
  return (
    <div className={`p-5 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2 ${className}`}>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold flex items-center justify-center space-x-1.5">
        <Sparkles className="w-3 h-3 text-amber-400" />
        <span>বিজ্ঞাপন ও পার্টনার সার্ভিস • SPONSORED</span>
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
