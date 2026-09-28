"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  FileText,
  Scale,
  Sparkles,
  PhoneCall,
  Briefcase,
  Layers,
  Car,
  HeartPulse,
  Landmark,
  Plane,
  Building2,
  AlertOctagon,
  Award,
  ExternalLink,
  ChevronRight,
  Clock,
  Coins
} from "lucide-react";
import problemsData from "@/data/problems.json";

// 17 Structured Categories with Custom Icons
const CATEGORIES = [
  { id: 1, name: "ইকামা ও পরিচয়পত্র", en: "Iqama Services", icon: Award, color: "from-emerald-500 to-teal-700" },
  { id: 2, name: "কিওয়া ও ইলেকট্রনিক চুক্তি", en: "Qiwa & Contracts", icon: FileText, color: "from-blue-500 to-cyan-700" },
  { id: 3, name: "মক্তব আমল ও শ্রম বিরোধ", en: "Labor Disputes", icon: Scale, color: "from-indigo-500 to-purple-700" },
  { id: 4, name: "কাফালা ও স্পন্সরশিপ", en: "Kafala Transfer", icon: Layers, color: "from-violet-500 to-fuchsia-700" },
  { id: 5, name: "আবশির ও তাওয়াক্কালনা", en: "Absher & Tawakkalna", icon: Sparkles, color: "from-emerald-600 to-green-800" },
  { id: 6, name: "ভিসা ও ছুটি (খুরুজ)", en: "Exit Re-Entry & Final Exit", icon: Plane, color: "from-amber-500 to-orange-700" },
  { id: 7, name: "হুরুব ও স্ট্যাটাস জটিলতা", en: "Huroob Status", icon: AlertOctagon, color: "from-red-600 to-rose-800" },
  { id: 8, name: "সার্ভিস বেনিফিট ও গ্র্যাচুইটি", en: "End of Service (EOSB)", icon: Landmark, color: "from-yellow-500 to-amber-700" },
  { id: 9, name: "ট্রাফিক জরিমানা ও সাহের", en: "Traffic & Saher", icon: Car, color: "from-orange-500 to-red-700" },
  { id: 10, name: "ড্রাইভিং লাইসেন্স ও নাজম", en: "Driving & Najm", icon: Car, color: "from-teal-500 to-emerald-700" },
  { id: 11, name: "বৈধ রেমিট্যান্স ও ব্যাংকিং", en: "Remittance & Banking", icon: Coins, color: "from-emerald-500 to-green-700" },
  { id: 12, name: "স্বাস্থ্য ও চিকিৎসা বীমা", en: "Health & CCHI", icon: HeartPulse, color: "from-rose-500 to-pink-700" },
  { id: 13, name: "ওমরাহ ও হজ পারমিট", en: "Umrah & Nusuk", icon: Landmark, color: "from-purple-500 to-indigo-700" },
  { id: 14, name: "আইনি সহায়তা ও পুলিশ", en: "Legal Aid & Police", icon: ShieldAlert, color: "from-red-500 to-rose-700" },
  { id: 15, name: "দূতাবাস সেবা ও পাসপোর্ট", en: "Embassy & Passports", icon: Briefcase, color: "from-blue-600 to-indigo-800" },
  { id: 16, name: "কার্গো ও ব্যাগেজ কাস্টমস", en: "Cargo & Customs", icon: Plane, color: "from-cyan-500 to-blue-700" },
  { id: 17, name: "ব্যবসা ও MISA বিনিয়োগ", en: "Business & MISA", icon: Building2, color: "from-amber-600 to-yellow-800" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ratesData, setRatesData] = useState<any>(null);
  const [calcSAR, setCalcSAR] = useState<number>(1000);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("/api/rates");
        if (res.ok) {
          const data = await res.json();
          setRatesData(data);
        }
      } catch (e) {
        // Fallback
      }
    }
    fetchRates();
  }, []);

  // Filter problems in real-time
  const filteredProblems = useMemo(() => {
    return problemsData.filter((item) => {
      const matchesCategory = selectedCategory === null || item.category_id === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const inTitle = item.title.toLowerCase().includes(q);
      const inTitleEn = item.title_en.toLowerCase().includes(q);
      const inSummary = item.summary.toLowerCase().includes(q);
      const inPortal = item.official_portal.toLowerCase().includes(q);
      const inCategory = item.category_name.toLowerCase().includes(q);

      return matchesCategory && (inTitle || inTitleEn || inSummary || inPortal || inCategory);
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="space-y-12">
      {/* 1. HIGH-CONTRAST RED SOS EMERGENCY STRIP */}
      <div className="bg-gradient-to-r from-red-700 via-rose-700 to-red-800 text-white px-4 py-3 shadow-xl border-b border-red-500/50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center space-x-3">
            <span className="p-2 bg-red-950/80 rounded-full text-white animate-bounce">
              <PhoneCall className="w-5 h-5" />
            </span>
            <div>
              <span className="font-black text-sm uppercase tracking-wide bg-red-900/90 px-2 py-0.5 rounded text-red-200 mr-2">
                জরুরি SOS
              </span>
              <span className="font-bold text-sm">
                বিপদে পড়লে তাৎক্ষণিক কল করুন: অ্যাম্বুলেন্স ৯৯৭ | পুলিশ ৯৯৯ | নাজম ৯২০০০৫৬০ | দূতাবাস
              </span>
            </div>
          </div>
          <Link
            href="/urgent-sos"
            className="shrink-0 flex items-center space-x-1.5 bg-white text-red-700 hover:bg-red-50 font-black px-4 py-1.5 rounded-full text-xs shadow-md transition transform active:scale-95"
          >
            <span>জরুরি ডায়ালার খুলুন</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 2. HERO SECTION WITH INSTANT LIVE SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-saudi-900/60 border border-saudi-600/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>সৌদি আরবের ৫০+ জটিল সমস্যার সরকারি নির্দেশিকা ও আইনি সমাধান</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            সৌদি প্রবাসী <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">ওয়ান-স্টপ হাব</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            ইকামা রিনিউ, কিওয়া চুক্তি গ্রহণ, ৩ মাস বেতন বকেয়া কাফালা, ধারা ৮৪ গ্র্যাচুইটি হিসাব কিংবা পাসপোর্ট সেবা—দালালমুক্ত সঠিক সরকারি তথ্য এক প্ল্যাটফর্মে।
          </p>

          {/* Instant Search Bar */}
          <div className="relative max-w-2xl mx-auto mt-6">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-emerald-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="সমস্যা খুঁজুন (যেমন: ইকামা, কিওয়া, হুরুব, বেতন বকেয়া, নাজম, ফাইনাল এক্সিট)..."
                className="w-full bg-slate-900/90 border-2 border-emerald-600/50 rounded-2xl pl-12 pr-10 py-4 text-base text-white placeholder-slate-400 shadow-2xl focus:outline-none focus:border-emerald-400 transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  মুছুন
                </button>
              )}
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">জনপ্রিয় সার্চ:</span>
              {["৩ মাস বেতন বকেয়া", "ইকামা রিনিউ", "ধারা ৮৪ গ্র্যাচুইটি", "হুরুব মামলা", "ছুটির ভিসা"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="bg-slate-800/80 hover:bg-emerald-900/50 hover:text-emerald-300 px-2.5 py-1 rounded-lg border border-slate-700/60 transition"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DAILY CURRENCY REMITTANCE WIDGET (#rates) */}
      <section id="rates" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>আজকের রিয়াল এক্সচেঞ্জ রেট (SAR to BDT)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                সৌদি ব্যাংক ও ডিজিটাল ওয়ালেট লাইভ রেট তুলনা
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                বৈধ চ্যানেলে রেমিট্যান্স পাঠালে বাংলাদেশ সরকারের নগদ ২.৫% প্রণোদনা স্বয়ংক্রিয়ভাবে যুক্ত হয়।
              </p>
            </div>

            {/* Interactive Currency Quick Converter */}
            <div className="bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl flex items-center space-x-3 text-sm">
              <div>
                <label className="text-[10px] text-slate-400 block font-semibold">হিসাব করুন (SAR):</label>
                <input
                  type="number"
                  min="1"
                  value={calcSAR}
                  onChange={(e) => setCalcSAR(Math.max(1, Number(e.target.value)))}
                  className="w-24 bg-transparent font-bold text-emerald-300 text-lg focus:outline-none"
                />
              </div>
              <div className="text-slate-600 font-black">→</div>
              <div>
                <label className="text-[10px] text-slate-400 block font-semibold">পাবেন (আনুমানিক BDT):</label>
                <div className="font-bold text-amber-400 text-lg">
                  ৳ {(calcSAR * (ratesData?.providers?.[0]?.rate_bdt || 32.5)).toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Rates Table / Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {ratesData?.providers ? (
              ratesData.providers.map((p: any) => (
                <div
                  key={p.provider_code}
                  className={`p-4 rounded-2xl border transition relative overflow-hidden ${
                    p.is_best_rate
                      ? "bg-gradient-to-br from-saudi-950 to-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                  }`}
                >
                  {p.is_best_rate && (
                    <span className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-bl-xl uppercase tracking-wider">
                      সেরা রেট
                    </span>
                  )}
                  <div className="font-bold text-white text-base">{p.provider_name}</div>
                  <div className="flex items-baseline space-x-2 my-2">
                    <span className="text-2xl font-black text-emerald-400">
                      ৳ {Number(p.rate_bdt).toFixed(2)}
                    </span>
                    <span className="text-xs text-slate-400">/ ১ SAR</span>
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>ফি: {p.fee_sar > 0 ? `${p.fee_sar} SAR` : "ফ্রি"}</div>
                    <div className="text-[11px] text-slate-300 flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-emerald-400 inline" />
                      {p.transfer_speed}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-6 text-sm text-slate-400">
                রেট লোড হচ্ছে...
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. 17 CATEGORY SELECTION CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">সেবা ক্যাটাগরি সমূহ (১৭টি বিভাগ)</h2>
            <p className="text-xs text-slate-400">আপনার প্রয়োজনীয় ক্যাটাগরি সিলেক্ট করে নির্দিষ্ট সমস্যাটি বেছে নিন</p>
          </div>
          {selectedCategory !== null && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-xs font-semibold text-emerald-400 hover:underline"
            >
              সব ক্যাটাগরি দেখুন
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = problemsData.filter((p) => p.category_id === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between h-28 group relative overflow-hidden ${
                  isSelected
                    ? "bg-emerald-950/80 border-emerald-400 shadow-lg shadow-emerald-950/50"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded-md">
                    {count}টি
                  </span>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition line-clamp-1">
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{cat.en}</div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 5. FILTERED PROBLEMS DATASET (50 Saudi Expat Solutions) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {searchQuery ? `"${searchQuery}" এর সার্চ ফলাফল` : selectedCategory ? `${CATEGORIES.find(c => c.id === selectedCategory)?.name}` : "সকল সমস্যা ও সরকারি সমাধান (৫০টি গাইড)"}
            </h2>
            <p className="text-xs text-slate-400">
              মোট {filteredProblems.length}টি সমাধান প্রদর্শিত হচ্ছে
            </p>
          </div>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-base font-semibold text-slate-300">কোনো ফলাফল পাওয়া যায়নি</p>
            <p className="text-xs text-slate-500 mt-1">অন্য কোনো কি-ওয়ার্ড দিয়ে আবার চেষ্টা করুন।</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold"
            >
              সব সমাধান দেখুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProblems.map((prob) => (
              <Link
                key={prob.slug}
                href={`/services/${prob.slug}`}
                className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/50 transition group flex flex-col justify-between hover:shadow-xl hover:shadow-emerald-950/20"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-lg border border-emerald-800/40">
                      {prob.category_name.split("(")[0]}
                    </span>
                    {prob.urgent && (
                      <span className="text-[10px] font-bold text-red-300 bg-red-950 px-2 py-0.5 rounded-md border border-red-800 animate-pulse">
                        জরুরি
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                    {prob.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {prob.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-slate-400 truncate max-w-[180px]">
                    🏛️ {prob.official_portal.split("(")[0]}
                  </span>
                  <span className="flex items-center text-emerald-400 font-semibold group-hover:translate-x-1 transition">
                    সমাধান <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 6. PROACTIVE ACTION TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tile 1: Labor Law Academy & Gratuity */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/60 p-6 sm:p-8 rounded-3xl border border-emerald-600/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-saudi-800 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">সৌদি শ্রম আইন একাডেমি ও গ্র্যাচুইটি</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                চাকরি ছাড়লে বা কফিল তাড়িয়ে দিলে কত টাকা গ্র্যাচুইটি (ধারা ৮৪) ও ছুটির টাকা (ধারা ১১১) আইনত পাবেন? মিথ বনাম বাস্তব আইন সরাসরি হিসাব করুন।
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/law-academy"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition"
              >
                <span>ক্যালকুলেটর ব্যবহার করুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Tile 2: Arabic Letter Generator */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950/50 p-6 sm:p-8 rounded-3xl border border-amber-600/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-900/60 text-amber-300 flex items-center justify-center border border-amber-500/40">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">আরবি দরখাস্ত মেকার (মক্তব আমল ও কাফালা)</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                কফিলকে নোটিশ, কাফালার অনুরোধপত্র কিংবা শ্রম আদালতে বকেয়া বেতন দাবির জন্য সৌদি সরকারের অফিশিয়াল ফরম্যাটের আরবি আবেদন তৈরি ও প্রিন্ট করুন।
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/arabic-letter-generator"
                className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition"
              >
                <span>দরখাস্ত তৈরি করুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
