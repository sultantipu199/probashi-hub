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
  ExternalLink,
  ChevronRight,
  Clock,
  Check,
  X,
  Layers,
  ChevronDown,
  Mic,
  Calculator,
  Car
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import problemsData from "@/data/problems.json";
import cachedRates from "@/data/rates.json";
import MonetizationBanner from "@/components/MonetizationBanner";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [ratesData, setRatesData] = useState<any>(cachedRates);
  const [calcSAR, setCalcSAR] = useState<number>(1000);
  const [isListening, setIsListening] = useState(false);

  // Web Speech API Voice Search
  const startVoiceSearch = () => {
    if (typeof window === "undefined") return;
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRec) {
      alert("আপনার ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়। গুগল ক্রোম বা এজ ব্রাউজার ব্যবহার করুন।");
      return;
    }
    try {
      const recognition = new SpeechRec();
      recognition.lang = "bn-BD";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setSearchQuery(transcript);
          setSelectedCategory(null);
        }
      };
      recognition.start();
    } catch (err) {
      setIsListening(false);
    }
  };

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

  // Handle Category Click with Smooth Scroll to Showcase
  const handleCategoryClick = (catId: number) => {
    if (selectedCategory === catId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catId);
      setTimeout(() => {
        const el = document.getElementById("category-showcase");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

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

  const activeCategoryObj = useMemo(() => {
    return CATEGORIES.find((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  const categoryProblems = useMemo(() => {
    if (!selectedCategory) return [];
    return problemsData.filter((p) => p.category_id === selectedCategory);
  }, [selectedCategory]);

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
                placeholder="সমস্যা খুঁজুন বা মাইকে মুখে বলুন (যেমন: ইকামা, কিওয়া, বেতন বকেয়া)..."
                className="w-full bg-slate-900/90 border-2 border-emerald-600/50 rounded-2xl pl-12 pr-24 py-4 text-base text-white placeholder-slate-400 shadow-2xl focus:outline-none focus:border-emerald-400 transition"
              />
              <div className="absolute right-3 flex items-center space-x-1.5">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-semibold text-slate-400 hover:text-white px-2 py-1 rounded-md"
                  >
                    মুছুন
                  </button>
                )}
                <button
                  type="button"
                  onClick={startVoiceSearch}
                  title="মুখে বলুন (ভয়েস সার্চ)"
                  className={`p-2 rounded-xl transition ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-slate-800 text-emerald-400 hover:bg-emerald-950 hover:text-emerald-300"
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span className="font-semibold text-slate-500">জনপ্রিয় সার্চ:</span>
              {["৩ মাস বেতন বকেয়া", "ইকামা রিনিউ", "ধারা ৮৪ গ্র্যাচুইটি", "হুরুব মামলা", "ছুটির ভিসা"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    setSelectedCategory(null);
                  }}
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
 
      {/* MONETIZATION SPONSORED BANNER: CARGO & TRAVEL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <MonetizationBanner type="cargo_travel" />
      </div>

      {/* 4. 17 INTERACTIVE CATEGORY SELECTION CARDS */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <span>সেবা ক্যাটাগরি সমূহ (১৭টি বিভাগ)</span>
              <span className="text-xs bg-emerald-900/80 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-700/50">
                ট্যাপ করে সেবা খুলুন
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              যেকোনো ক্যাটাগরিতে ক্লিক করলে নিচে তাৎক্ষণিকভাবে সেই বিভাগের সকল সেবা ও নির্দেশিকা ওপেন হবে।
            </p>
          </div>
          {selectedCategory !== null && (
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-950/80 px-3 py-1.5 rounded-xl border border-emerald-800 transition"
            >
              <span>✕ ক্যাটাগরি বন্ধ করুন (সকল সেবা)</span>
            </button>
          )}
        </div>

        {/* 17 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = problemsData.filter((p) => p.category_id === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between h-32 group relative overflow-hidden cursor-pointer active:scale-95 ${
                  isSelected
                    ? "bg-emerald-950/95 border-emerald-400 ring-2 ring-emerald-400/80 shadow-xl shadow-emerald-950/60 scale-[1.02]"
                    : "bg-slate-900/60 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/60 hover:scale-[1.01]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl bg-gradient-to-tr ${cat.color} text-white shadow-md`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md transition ${
                      isSelected
                        ? "bg-emerald-400 text-slate-950 font-black flex items-center space-x-0.5"
                        : "text-slate-400 bg-slate-800/80"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-3 h-3 inline" />
                        <span>ওপেন</span>
                      </>
                    ) : (
                      `${count}টি সেবা`
                    )}
                  </span>
                </div>
                <div>
                  <div
                    className={`text-xs font-bold transition line-clamp-1 ${
                      isSelected ? "text-emerald-300 font-black" : "text-white group-hover:text-emerald-300"
                    }`}
                  >
                    {cat.name}
                  </div>
                  <div className="text-[10px] text-slate-400 line-clamp-1">{cat.en}</div>
                </div>

                <div className="text-[10px] font-semibold flex items-center justify-between pt-1 border-t border-slate-800/60">
                  <span className={isSelected ? "text-emerald-300 font-bold" : "text-slate-500 group-hover:text-emerald-400"}>
                    {isSelected ? "সেবা নিচে দেখুন ↓" : "ক্লিক করুন →"}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isSelected ? "rotate-180 text-emerald-400" : "text-slate-600 group-hover:text-emerald-400"
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* 4.1 INSTANT INLINE CATEGORY SHOWCASE DRAWER */}
        {selectedCategory && activeCategoryObj && (
          <div
            id="category-showcase"
            className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950/80 to-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/70 transition-all duration-300 scroll-mt-24 space-y-6"
          >
            {/* Header of the Selected Category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-emerald-800/40">
              <div className="flex items-start sm:items-center space-x-4">
                <div
                  className={`p-3.5 rounded-2xl bg-gradient-to-tr ${activeCategoryObj.color} text-white shadow-xl shrink-0`}
                >
                  <activeCategoryObj.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[11px] font-black text-emerald-300 bg-emerald-900/80 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                      বিভাগ #{activeCategoryObj.id}
                    </span>
                    <span className="text-xs text-slate-300 font-semibold">
                      মোট {categoryProblems.length}টি সমাধান অন্তর্ভুক্ত
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {activeCategoryObj.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                    {activeCategoryObj.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2 shrink-0">
                <Link
                  href={`/categories/${activeCategoryObj.id}`}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center shadow-lg transition"
                >
                  <span>আলাদা পেজে খুলুন</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold transition flex items-center space-x-1"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  <span>বন্ধ করুন</span>
                </button>
              </div>
            </div>

            {/* Services Cards within the Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categoryProblems.map((prob) => (
                <Link
                  key={prob.slug}
                  href={`/services/${prob.slug}`}
                  className="p-5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-emerald-600/40 hover:border-emerald-400 transition group flex flex-col justify-between shadow-xl relative overflow-hidden"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-lg border border-emerald-800/60">
                        🏛️ {prob.official_portal.split("(")[0]}
                      </span>
                      {prob.urgent && (
                        <span className="text-[10px] font-black text-red-200 bg-red-950 px-2 py-0.5 rounded-md border border-red-800 animate-pulse">
                          জরুরি
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-emerald-300 transition line-clamp-2 leading-snug">
                      {prob.title}
                    </h4>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {prob.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 text-[11px] flex items-center">
                      <Clock className="w-3 h-3 mr-1 text-emerald-400 inline" />
                      {prob.processing_time}
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center group-hover:translate-x-1 transition">
                      ধাপে ধাপে গাইড খুলুন <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 5. FILTERED PROBLEMS DATASET (50 Saudi Expat Solutions) */}
      <section id="services-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
              <span>
                {searchQuery
                  ? `"${searchQuery}" এর সার্চ ফলাফল`
                  : activeCategoryObj
                  ? `${activeCategoryObj.name} এর সেবা সমূহ`
                  : "সকল সমস্যা ও সরকারি সমাধান (৫০টি গাইড)"}
              </span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              মোট {filteredProblems.length}টি সমাধান প্রদর্শিত হচ্ছে
            </p>
          </div>

          {/* Active Filter Indicator */}
          {(selectedCategory !== null || searchQuery) && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400">ফিল্টার:</span>
              {activeCategoryObj && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-900/60 border border-emerald-600 text-emerald-300 text-xs font-bold">
                  <span>{activeCategoryObj.name}</span>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="hover:text-white ml-1 p-0.5"
                    title="ক্যাটাগরি ফিল্টার মুছুন"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold">
                  <span>খোঁজা: &ldquo;{searchQuery}&rdquo;</span>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:text-white ml-1 p-0.5"
                    title="সার্চ মুছুন"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                }}
                className="text-xs font-semibold text-emerald-400 hover:underline ml-1"
              >
                সব রিসেট করুন
              </button>
            </div>
          )}
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

      {/* 6. PROACTIVE ACTION TILES (4 CORE PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white">জরুরি প্রবাস টুলস ও একাডেমি</h2>
          <p className="text-xs text-slate-400">শ্রম আইন, মক্তব আমল সাদাদ ফি হিসাব, আরবি দরখাস্ত ও ড্রাইভিং লাইসেন্স প্র্যাকটিস</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tile 1: Labor Law Academy & Gratuity */}
          <div className="bg-gradient-to-br from-slate-900 to-emerald-950/60 p-5 rounded-3xl border border-emerald-600/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-saudi-800 text-emerald-300 flex items-center justify-center border border-emerald-500/40">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">শ্রম আইন ও গ্র্যাচুইটি</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                ধারা ৮৪ ও ৮৫ অনুযায়ী পদত্যাগ বনাম বরখাস্তে গ্র্যাচুইটির সঠিক অংক এবং ২.৫% প্রণোদনাসহ টাকায় হিসাব।
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/law-academy"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2 rounded-xl text-xs transition"
              >
                <span>ক্যালকুলেটর খুলুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tile 2: Iqama & Maktab Amal Fee Calculator */}
          <div className="bg-gradient-to-br from-slate-900 to-teal-950/60 p-5 rounded-3xl border border-teal-600/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-teal-900/60 text-teal-300 flex items-center justify-center border border-teal-500/40">
                <Calculator className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">ইকামা ও সাদাদ ফি</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                রুকসা আমল (সাদাদ ০১৩), জাওয়াযাত কার্ড ফি (০৯০) ও ডিপেন্ডেন্ট লেভির কিস্তি ও বিলম্ব জরিমানা হিসাব।
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/iqama-fee-calculator"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 rounded-xl text-xs transition"
              >
                <span>ফি হিসাব করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tile 3: Dallah Driving License Test Quiz */}
          <div className="bg-gradient-to-br from-slate-900 to-cyan-950/60 p-5 rounded-3xl border border-cyan-600/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-900/60 text-cyan-300 flex items-center justify-center border border-cyan-500/40">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">দাল্লাহ ড্রাইভিং টেস্ট</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                সৌদি ট্রাফিক সাইন, সাহের ক্যামেরা ফাইন ও রোড রুলসের অফিশিয়াল কম্পিউটার পরীক্ষার প্রশ্নোত্তর প্র্যাকটিস।
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/driving-license-test"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 rounded-xl text-xs transition"
              >
                <span>টেস্ট শুরু করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tile 4: Arabic Letter Generator */}
          <div className="bg-gradient-to-br from-slate-900 to-amber-950/50 p-5 rounded-3xl border border-amber-600/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-2xl bg-amber-900/60 text-amber-300 flex items-center justify-center border border-amber-500/40">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">আরবি দরখাস্ত মেকার</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                মক্তব আমল, জাওয়াযাত ও ট্রাফিক পুলিশের জন্য ফরমাল আরবি আবেদনপত্র তৈরি, প্রিভিউ ও A4 সাইজে সরাসরি প্রিন্ট।
              </p>
            </div>
            <div className="pt-4">
              <Link
                href="/arabic-letter-generator"
                className="w-full inline-flex items-center justify-center space-x-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 rounded-xl text-xs transition"
              >
                <span>দরখাস্ত তৈরি করুন</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
