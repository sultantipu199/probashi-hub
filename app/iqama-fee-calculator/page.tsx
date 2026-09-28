"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  ShieldCheck,
  AlertTriangle,
  Info,
  Building,
  Users,
  Calendar,
  CreditCard,
  Banknote,
  ArrowRight,
  Share2,
  CheckCircle2,
  Sparkles,
  HelpCircle
} from "lucide-react";

export default function IqamaFeeCalculatorPage() {
  const [workerType, setWorkerType] = useState<"commercial_excess" | "commercial_equal" | "small_entity" | "domestic">("commercial_excess");
  const [durationMonths, setDurationMonths] = useState<3 | 6 | 9 | 12>(12);
  const [dependentsCount, setDependentsCount] = useState<number>(0);
  const [lateTimes, setLateTimes] = useState<0 | 1 | 2>(0);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(true);
  const [exchangeRate, setExchangeRate] = useState<number>(32.78);
  const [copied, setCopied] = useState(false);

  // Saudi HRSD & Jawazat Official Fee Calculation Rules
  const result = useMemo(() => {
    // 1. Maktab Amal Levy (রুকসা আমল ফি - সাদাদ কোড ০১৩)
    let monthlyLevy = 0;
    if (workerType === "commercial_excess") {
      monthlyLevy = 800; // 9,600 SAR / yr
    } else if (workerType === "commercial_equal") {
      monthlyLevy = 700; // 8,400 SAR / yr
    } else if (workerType === "small_entity") {
      monthlyLevy = 0; // Exemption for small enterprises (1-4 workers)
    } else if (workerType === "domestic") {
      monthlyLevy = 0; // Domestic workers have 0 Maktab Amal levy
    }

    const totalMaktabAmalFee = (monthlyLevy * durationMonths);

    // 2. Jawazat Iqama Card Fee (জাওয়াযাত ফি - সাদাদ কোড ০৯০)
    // 650 SAR/yr for commercial, 600 SAR/yr for domestic
    const annualJawazat = workerType === "domestic" ? 600 : 650;
    const totalJawazatFee = Math.round((annualJawazat / 12) * durationMonths);

    // 3. Family Dependent Fee (ডিপেন্ডেন্ট লেভি - ৪০০ রিয়াল/মাস প্রতি সদস্য)
    const totalDependentFee = dependentsCount * 400 * durationMonths;

    // 4. Late Renewal Penalty (বিলম্ব ফি)
    let penalty = 0;
    if (lateTimes === 1) penalty = 500;
    if (lateTimes === 2) penalty = 1000;

    // 5. CCHI Medical Insurance (আনুমানিক)
    const insuranceFee = includeInsurance ? (workerType === "domestic" ? 350 : 650) : 0;

    const totalSAR = totalMaktabAmalFee + totalJawazatFee + totalDependentFee + penalty + insuranceFee;
    const totalBDT = Math.round(totalSAR * exchangeRate);
    const incentiveBDT = Math.round(totalBDT * 0.025);

    return {
      totalMaktabAmalFee,
      totalJawazatFee,
      totalDependentFee,
      penalty,
      insuranceFee,
      totalSAR,
      totalBDT,
      incentiveBDT,
      monthlyLevy,
    };
  }, [workerType, durationMonths, dependentsCount, lateTimes, includeInsurance, exchangeRate]);

  const copySummary = () => {
    const text = `🇸🇦 ইকামা ও সাদাদ ফি হিসাব (Probashi Hub):\n` +
      `ধরন: ${workerType === "commercial_excess" ? "বাণিজ্যিক কোম্পানি" : workerType === "small_entity" ? "ছোট প্রতিষ্ঠান (লেভি মুক্ত)" : "গৃহকর্মী"}\n` +
      `মেয়াদ: ${durationMonths} মাস\n` +
      `মক্তব আমল ফি: ${result.totalMaktabAmalFee} SAR\n` +
      `জাওয়াযাত ফি: ${result.totalJawazatFee} SAR\n` +
      `ডিপেন্ডেন্ট লেভি: ${result.totalDependentFee} SAR\n` +
      `বিলম্ব জরিমানা: ${result.penalty} SAR\n` +
      `সর্বমোট সরকারি সাদাদ ফি: ${result.totalSAR} SAR (৳ ${result.totalBDT.toLocaleString()} BDT)\n` +
      `লিঙ্ক: https://probashi-hub.vercel.app/iqama-fee-calculator`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-600/50 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>সৌদি মানবসম্পদ মন্ত্রণালয় (HRSD) ও জাওয়াযাত অফিসিয়াল সাদাদ ফি রেট</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          ইকামা রিনিউ ও মক্তব আমল <span className="text-emerald-400">ফি ক্যালকুলেটর</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          আপনার কফিল বা কোম্পানির ইকামা নবায়নের জন্য কত টাকা মক্তব আমল লেভি (০১৩) ও জাওয়াযাত ফি (০৯০) সাদাদে জমা দিতে হবে তা নিখুঁতভাবে হিসাব করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Configuration Panel (Left 7 Cols) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <h2 className="text-lg font-bold text-white flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <span>ইকামা ও প্রতিষ্ঠানের তথ্য নির্বাচন করুন</span>
          </h2>

          {/* 1. Worker / Entity Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              প্রতিষ্ঠানের ধরন ও লেভি ক্যাটাগরি:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setWorkerType("commercial_excess")}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  workerType === "commercial_excess"
                    ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/50 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-xs">বাণিজ্যিক কোম্পানি (বড়/মাঝারি)</div>
                <div className="text-[10px] text-slate-400 mt-1">৮০০ রিয়াল/মাস লেভি (৯,৬০০/বছর)</div>
              </button>

              <button
                type="button"
                onClick={() => setWorkerType("commercial_equal")}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  workerType === "commercial_equal"
                    ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/50 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-xs">সৌদিকরণ অনুপাত ৫০%+ কোম্পানি</div>
                <div className="text-[10px] text-slate-400 mt-1">৭০০ রিয়াল/মাস লেভি (৮,৪০০/বছর)</div>
              </button>

              <button
                type="button"
                onClick={() => setWorkerType("small_entity")}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  workerType === "small_entity"
                    ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/50 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-xs">ছোট প্রতিষ্ঠান (১-৪ জন কর্মী)</div>
                <div className="text-[10px] text-emerald-400 mt-1">মক্তব আমল লেভি ১০০% ফ্রি (০ রিয়াল)</div>
              </button>

              <button
                type="button"
                onClick={() => setWorkerType("domestic")}
                className={`p-3.5 rounded-2xl border text-left transition ${
                  workerType === "domestic"
                    ? "bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/50 text-white"
                    : "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700"
                }`}
              >
                <div className="font-bold text-xs">আমেল মানজিলি / ড্রাইভার (গৃহকর্মী)</div>
                <div className="text-[10px] text-emerald-400 mt-1">লেভি ফ্রি, শুধু জাওয়াযাত ৬০০ রিয়াল</div>
              </button>
            </div>
          </div>

          {/* 2. Renewal Duration */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ইকামা নবায়নের মেয়াদ (সৌদি সরকারের কিস্তি নিয়ম):
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "৩ মাস", value: 3 },
                { label: "৬ মাস", value: 6 },
                { label: "৯ মাস", value: 9 },
                { label: "১ বছর", value: 12 },
              ].map((d) => (
                <button
                  key={d.value}
                  type="button"
                  onClick={() => setDurationMonths(d.value as any)}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition text-center ${
                    durationMonths === d.value
                      ? "bg-emerald-600 text-white border-emerald-500 shadow-md"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Family Dependents Count */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300">
                পরিবারের সদস্য / ডিপেন্ডেন্ট সংখ্যা (মুরুফাকিন):
              </label>
              <span className="text-xs text-emerald-400 font-semibold">{dependentsCount} জন</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="range"
                min="0"
                max="8"
                value={dependentsCount}
                onChange={(e) => setDependentsCount(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs font-bold text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                {dependentsCount}
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              প্রতি ডিপেন্ডেন্টের জন্য প্রতি মাসে ৪০০ সৌদি রিয়াল সরকারি লেভি ধার্য হয়।
            </p>
          </div>

          {/* 4. Expiration Delay Penalty */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 block">
              ইকামা মেয়াদ শেষ হয়েছে কি? (বিলম্ব জরিমানা):
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: "মেয়াদ আছে (০ ফি)", value: 0 },
                { label: "১ম বার বিলম্ব (৫০০ রিয়াল)", value: 1 },
                { label: "২য় বার বিলম্ব (১০০০ রিয়াল)", value: 2 },
              ].map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setLateTimes(p.value as any)}
                  className={`py-2 px-1 rounded-xl border text-[11px] font-bold transition text-center ${
                    lateTimes === p.value
                      ? "bg-red-950 text-red-200 border-red-600 shadow"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* 5. Medical Insurance Checkbox */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div>
              <div className="text-xs font-bold text-white">মেডিকেল ইন্স্যুরেন্স প্রিমিয়াম অন্তর্ভুক্ত করুন</div>
              <div className="text-[10px] text-slate-400">ইকামা রিনিউ করতে বাধ্যতামূলক সিসিএইচআই ইন্স্যুরেন্স লাগে (~৬৫০ রিয়াল)</div>
            </div>
            <input
              type="checkbox"
              checked={includeInsurance}
              onChange={(e) => setIncludeInsurance(e.target.checked)}
              className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Calculation Result Panel (Right 5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-2 border-emerald-500 shadow-2xl shadow-emerald-950/60 space-y-6">
            <div>
              <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest block">
                সরকারি সাদাদ মোট হিসাব
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-4xl font-black text-white">
                  {result.totalSAR.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-emerald-300">SAR (সৌদি রিয়াল)</span>
              </div>
              <div className="text-xs text-amber-300 mt-1 font-semibold">
                ≈ ৳ {result.totalBDT.toLocaleString()} BDT (বাংলাদেশি টাকা)
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 pt-4 border-t border-emerald-800/40 text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>মক্তব আমল লেভি (সাদাদ ০১৩):</span>
                <span className="font-bold text-white">{result.totalMaktabAmalFee.toLocaleString()} SAR</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>জাওয়াযাত কার্ড ফি (সাদাদ ০৯০):</span>
                <span className="font-bold text-white">{result.totalJawazatFee.toLocaleString()} SAR</span>
              </div>
              {result.totalDependentFee > 0 && (
                <div className="flex justify-between items-center text-amber-300">
                  <span>ডিপেন্ডেন্ট লেভি ({dependentsCount} জন):</span>
                  <span className="font-bold">+{result.totalDependentFee.toLocaleString()} SAR</span>
                </div>
              )}
              {result.penalty > 0 && (
                <div className="flex justify-between items-center text-red-400">
                  <span>দেরি করার জরিমানা:</span>
                  <span className="font-bold">+{result.penalty.toLocaleString()} SAR</span>
                </div>
              )}
              {result.insuranceFee > 0 && (
                <div className="flex justify-between items-center text-slate-300">
                  <span>মেডিকেল ইন্স্যুরেন্স (আনুমানিক):</span>
                  <span className="font-bold text-white">+{result.insuranceFee.toLocaleString()} SAR</span>
                </div>
              )}
            </div>

            {/* SADAD Payment Info Box */}
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-[11px] space-y-1.5 text-slate-300">
              <div className="font-bold text-emerald-400 flex items-center">
                <CreditCard className="w-3.5 h-3.5 mr-1" />
                <span>সাদাদ বিলিং নিয়ম (SADAD Bill Codes):</span>
              </div>
              <div>• <strong>মক্তব আমল বিল কোড:</strong> 013 (MOL KSA)</div>
              <div>• <strong>জাওয়াযাত ও পাসপোর্ট কোড:</strong> 090 (MOI - Alien Control)</div>
              <div>• <strong>ব্যাংক অ্যাপ:</strong> Al Rajhi, SNB, Alinma-এর গভর্মেন্ট পেমেন্ট অপশন থেকে পরিশোধযোগ্য।</div>
            </div>

            <button
              onClick={copySummary}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition"
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? "✓ কপি সম্পন্ন হয়েছে!" : "হিসাবের বিবরণ কপি করুন"}</span>
            </button>
          </div>

          {/* Legal Rights Notice Box */}
          <div className="p-5 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-xs text-amber-200 space-y-2">
            <div className="font-bold flex items-center text-amber-300">
              <AlertTriangle className="w-4 h-4 mr-1.5 text-amber-400 shrink-0" />
              <span>সৌদি শ্রম আইন ধারা ৪০ অনুযায়ী আইনি বিধান:</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              সৌদি শ্রম আইনের ৪০ নং অনুচ্ছেদের ১ উপধারা অনুযায়ী, শ্রমিকের ইকামা নবায়ন, রুকসা আমল ও স্পনসরশিপ ট্রান্সফারের সরকারি ফি বহন করার সম্পূর্ণ দায়িত্ব <strong>নিয়োগকর্তা বা কফিলের</strong>। শ্রমিককে নিজ পকেট থেকে লেভি ফি পরিশোধ করতে বাধ্য করা আইনত দণ্ডনীয়।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
