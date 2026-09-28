"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Calculator, ArrowRight, CheckCircle2, AlertTriangle, Info, Sparkles, Building, Banknote } from "lucide-react";

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(3000);
  const [years, setYears] = useState<number>(6);
  const [months, setMonths] = useState<number>(4);
  const [separationType, setSeparationType] = useState<"termination" | "resignation" | "special">("resignation");
  const [exchangeRate, setExchangeRate] = useState<number>(32.78);

  useEffect(() => {
    async function loadRates() {
      try {
        const res = await fetch("/api/rates");
        if (res.ok) {
          const data = await res.json();
          if (data?.base_market_rate) {
            setExchangeRate(Number(data.base_market_rate));
          } else if (data?.providers?.[0]?.rate_bdt) {
            setExchangeRate(Number(data.providers[0].rate_bdt));
          }
        }
      } catch (e) {
        // Fallback
      }
    }
    loadRates();
  }, []);

  // Exact Saudi Labor Law Article 84 & 85 calculation
  const calculation = useMemo(() => {
    const salary = Math.max(0, Number(basicSalary) || 0);
    const totalYears = Math.max(0, Number(years) || 0) + (Math.max(0, Number(months) || 0) / 12);

    if (salary === 0 || totalYears <= 0) {
      return {
        baseGratuity: 0,
        factor: 0,
        factorPercent: 0,
        finalGratuitySAR: 0,
        finalGratuityBDT: 0,
        first5YearsComponent: 0,
        subsequentYearsComponent: 0,
      };
    }

    // Article 84 base calculation
    let first5YearsComponent = 0;
    let subsequentYearsComponent = 0;

    if (totalYears <= 5) {
      first5YearsComponent = 0.5 * salary * totalYears;
    } else {
      first5YearsComponent = 0.5 * salary * 5;
      subsequentYearsComponent = salary * (totalYears - 5);
    }

    const baseGratuity = first5YearsComponent + subsequentYearsComponent;

    // Resignation factor according to Article 85
    let factor = 1.0;
    let factorPercent = 100;

    if (separationType === "resignation") {
      if (totalYears < 2) {
        factor = 0.0;
        factorPercent = 0;
      } else if (totalYears >= 2 && totalYears < 5) {
        factor = 1 / 3; // 33.33%
        factorPercent = 33.33;
      } else if (totalYears >= 5 && totalYears < 10) {
        factor = 2 / 3; // 66.66%
        factorPercent = 66.66;
      } else {
        factor = 1.0; // 100%
        factorPercent = 100;
      }
    } else if (separationType === "termination" || separationType === "special") {
      factor = 1.0;
      factorPercent = 100;
    }

    const finalGratuitySAR = Math.round((baseGratuity * factor) * 100) / 100;
    const finalGratuityBDT = Math.round(finalGratuitySAR * exchangeRate);

    return {
      baseGratuity: Math.round(baseGratuity * 100) / 100,
      factor,
      factorPercent,
      finalGratuitySAR,
      finalGratuityBDT,
      first5YearsComponent: Math.round(first5YearsComponent * 100) / 100,
      subsequentYearsComponent: Math.round(subsequentYearsComponent * 100) / 100,
    };
  }, [basicSalary, years, months, separationType, exchangeRate]);

  return (
    <div id="calculator" className="w-full max-w-4xl mx-auto rounded-3xl glass-panel p-6 sm:p-8 border border-emerald-500/20 shadow-2xl relative overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-saudi-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-saudi-800 text-emerald-300 border border-saudi-600/50 shadow-inner">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              সৌদি শ্রম আইন ধারা ৮৪ গ্র্যাচুইটি ক্যালকুলেটর
            </h2>
            <p className="text-xs sm:text-sm text-emerald-400">
              End of Service Benefits (EOSB) - নির্ভুল সরকারি ফর্মুলা
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900/90 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs text-slate-300">
          <Banknote className="w-4 h-4 text-amber-400" />
          <span>১ SAR = ৳ {exchangeRate} BDT</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Input Parameters Section */}
        <div className="lg:col-span-6 space-y-5">
          {/* Basic Monthly Salary */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1.5">
              মূল মাসিক বেতন (Basic Monthly Salary)
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={basicSalary || ""}
                onChange={(e) => setBasicSalary(Number(e.target.value))}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-emerald-500 transition pl-4 pr-16"
                placeholder="उदा. 3000"
              />
              <span className="absolute right-4 top-3.5 text-sm font-semibold text-slate-400">
                SAR (রিয়াল)
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              * নোট: খাদ্য ও ওভারটাইম ছাড়া চুক্তির ফিক্সড বেসিক বেতন ও হাউজিং যোগ করুন।
            </p>
          </div>

          {/* Service Length: Years & Months */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-1.5">
              চাকরির মোট মেয়াদ (Length of Service)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={years}
                    onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-base font-bold text-white focus:outline-none focus:border-emerald-500 transition pr-14"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-400">বছর (Yrs)</span>
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={months}
                    onChange={(e) => setMonths(Math.max(0, Math.min(11, parseInt(e.target.value) || 0)))}
                    className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-base font-bold text-white focus:outline-none focus:border-emerald-500 transition pr-14"
                  />
                  <span className="absolute right-3 top-3 text-xs text-slate-400">মাস (Mos)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Separation Type */}
          <div>
            <label className="block text-sm font-semibold text-slate-200 mb-2">
              চাকরি অবসানের কারণ (Reason for Separation)
            </label>
            <div className="space-y-2">
              <label className={`flex items-start p-3 rounded-xl border cursor-pointer transition ${separationType === "termination" ? "bg-emerald-950/40 border-emerald-500 text-white" : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"}`}>
                <input
                  type="radio"
                  name="separation"
                  checked={separationType === "termination"}
                  onChange={() => setSeparationType("termination")}
                  className="mt-1 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-bold">কোম্পানি ছাঁটাই / চুক্তি সমাপ্তি (Contract Expired)</div>
                  <div className="text-xs text-slate-400">শ্রমিক ১০০% পূর্ণ গ্র্যাচুইটি প্রাপ্য (ধারা ৮৪)</div>
                </div>
              </label>

              <label className={`flex items-start p-3 rounded-xl border cursor-pointer transition ${separationType === "resignation" ? "bg-emerald-950/40 border-emerald-500 text-white" : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"}`}>
                <input
                  type="radio"
                  name="separation"
                  checked={separationType === "resignation"}
                  onChange={() => setSeparationType("resignation")}
                  className="mt-1 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-bold">শ্রমিক নিজে পদত্যাগ করেছেন (Voluntary Resignation)</div>
                  <div className="text-xs text-slate-400">ধারা ৮৫ অনুযায়ী ২-৫ বছর ৩৩%, ৫-১০ বছর ৬৬%, ১০+ বছর ১০০%</div>
                </div>
              </label>

              <label className={`flex items-start p-3 rounded-xl border cursor-pointer transition ${separationType === "special" ? "bg-emerald-950/40 border-emerald-500 text-white" : "bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700"}`}>
                <input
                  type="radio"
                  name="separation"
                  checked={separationType === "special"}
                  onChange={() => setSeparationType("special")}
                  className="mt-1 text-emerald-500 focus:ring-emerald-500"
                />
                <div className="ml-3">
                  <div className="text-sm font-bold">বিশেষ কারণ / ফোর্স মেজার / কোম্পানি চুক্তিভঙ্গ (Special Case)</div>
                  <div className="text-xs text-slate-400">ধারা ৮৭ অনুযায়ী পদত্যাগ করলেও ১০০% পূর্ণ পাওনা</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Calculation Result Display Panel */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
          <div className="bg-gradient-to-br from-saudi-950/90 via-slate-900 to-slate-950 p-6 rounded-2xl border border-emerald-500/40 shadow-xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" />
                আপনার প্রাপ্য মোট গ্র্যাচুইটি
              </span>
              <span className="text-xs bg-emerald-900/70 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-700/50">
                প্রাপ্য অনুপাত: {calculation.factorPercent.toFixed(0)}%
              </span>
            </div>

            {/* Huge Output Figures */}
            <div className="my-5">
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline">
                {calculation.finalGratuitySAR.toLocaleString()}
                <span className="text-emerald-400 text-lg sm:text-xl font-bold ml-2">SAR (সৌদি রিয়াল)</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-amber-400 mt-2 flex items-baseline">
                ≈ ৳ {calculation.finalGratuityBDT.toLocaleString()}
                <span className="text-xs font-medium text-slate-400 ml-2">বাংলাদেশি টাকা</span>
              </div>
            </div>

            {/* Exact Breakdown Calculation */}
            <div className="space-y-2 text-xs bg-slate-950/80 p-3.5 rounded-xl border border-slate-800">
              <div className="text-slate-300 font-semibold mb-1 flex items-center">
                <Info className="w-3.5 h-3.5 mr-1 text-emerald-400" /> হিসাবের আইনি বিশ্লেষণ:
              </div>
              <div className="flex justify-between text-slate-400">
                <span>প্রথম ৫ বছরের অংশ (০.৫ × {basicSalary} × {Math.min(years + months/12, 5).toFixed(1)}):</span>
                <span className="text-slate-200 font-medium">{calculation.first5YearsComponent.toLocaleString()} SAR</span>
              </div>
              {years + months / 12 > 5 && (
                <div className="flex justify-between text-slate-400">
                  <span>পরবর্তী মেয়াদের অংশ (১ × {basicSalary} × {Math.max(0, (years + months/12) - 5).toFixed(1)}):</span>
                  <span className="text-slate-200 font-medium">{calculation.subsequentYearsComponent.toLocaleString()} SAR</span>
                </div>
              )}
              <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800/80">
                <span>ধারা ৮৪ মোট বেস গ্র্যাচুইটি:</span>
                <span className="text-slate-200 font-bold">{calculation.baseGratuity.toLocaleString()} SAR</span>
              </div>
              {separationType === "resignation" && (
                <div className="flex justify-between text-amber-400 pt-1 border-t border-slate-800/80">
                  <span>পদত্যাগ সমন্বয় গুণক (ধারা ৮৫):</span>
                  <span>× {calculation.factorPercent.toFixed(1)}%</span>
                </div>
              )}
            </div>
          </div>

          {/* Legal Advisory Notice Box */}
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3 text-xs text-slate-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">কফিল যদি টাকা দিতে অস্বীকার করে:</span>
              <p className="mt-0.5 text-slate-400">
                চাকরি সমাপ্তির সর্বোচ্চ ২ সপ্তাহের মধ্যে পাওনা পরিশোধ বাধ্যতামূলক। পরিশোধ না করলে মক্তব আমলের ওয়াদিয়া (Amicable Settlement) পোর্টালে সম্পূর্ণ বিনামূল্যে আবেদন করতে পারবেন।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
