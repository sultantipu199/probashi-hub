"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { PhoneCall, ShieldAlert, FileText, Scale, Menu, X, ArrowUpRight, TrendingUp } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [liveRate, setLiveRate] = useState<number>(32.78);
  const [topProvider, setTopProvider] = useState<string>("Urpay");

  useEffect(() => {
    async function loadRates() {
      try {
        const res = await fetch("/api/rates");
        if (res.ok) {
          const data = await res.json();
          if (data && data.providers && data.providers.length > 0) {
            const best = data.providers.find((p: any) => p.is_best_rate) || data.providers[0];
            setLiveRate(best.rate_bdt);
            setTopProvider(best.provider_name.split(" ")[0]);
          }
        }
      } catch (err) {
        // Use initial fallback
      }
    }
    loadRates();
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Live Exchange Rate & 2.5% Incentive Top Ticker */}
      <div className="bg-emerald-950/90 text-emerald-200 border-b border-emerald-800/40 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 overflow-hidden">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-300">আজকের রিয়াল দর:</span>
            <span className="text-white font-bold tracking-wider">
              ১ SAR = ৳ {liveRate.toFixed(2)} BDT ({topProvider})
            </span>
            <span className="hidden md:inline-flex items-center text-emerald-400 bg-emerald-900/60 px-2 py-0.5 rounded text-[11px]">
              <TrendingUp className="w-3 h-3 mr-1 inline" /> +২.৫% সরকারি প্রণোদনা অন্তর্ভুক্ত
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <Link
              href="/urgent-sos"
              className="hidden sm:flex items-center text-red-300 hover:text-red-100 font-semibold transition"
            >
              <ShieldAlert className="w-3.5 h-3.5 mr-1 text-red-400 animate-pulse" />
              জরুরি হটলাইন (২৪/৭)
            </Link>
            <span className="text-emerald-700 hidden sm:inline">|</span>
            <span className="text-slate-300">🇸🇦 KSA Hub 🇧🇩 BD</span>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav className="glass-panel border-b border-slate-800 bg-slate-950/85">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saudi-700 to-emerald-500 flex items-center justify-center shadow-lg shadow-saudi-900/40 border border-emerald-400/30 group-hover:scale-105 transition">
                <span className="text-white font-black text-xl">প্র</span>
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg font-bold text-white tracking-tight">Probashi Hub</span>
                  <span className="text-[10px] font-bold bg-saudi-800 text-emerald-300 border border-saudi-600 px-1.5 py-0.5 rounded-full">
                    KSA
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400 font-medium">সৌদি প্রবাসী ওয়ান-স্টপ হাব</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
              <Link
                href="/"
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 transition"
              >
                হোম (Home)
              </Link>
              <Link
                href="/law-academy"
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 transition"
              >
                <Scale className="w-4 h-4 mr-1.5 text-emerald-400" />
                শ্রম আইন ও গ্র্যাচুইটি
              </Link>
              <Link
                href="/arabic-letter-generator"
                className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-slate-800/60 transition"
              >
                <FileText className="w-4 h-4 mr-1.5 text-amber-400" />
                আরবি দরখাস্ত জেনারেটর
              </Link>
            </div>

            {/* Emergency SOS Quick-Badge Action */}
            <div className="flex items-center space-x-3">
              <Link
                href="/urgent-sos"
                className="flex items-center space-x-2 bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-bold text-sm px-4 py-2 rounded-xl shadow-lg shadow-red-950/50 border border-red-500/40 hover:scale-[1.02] active:scale-95 transition"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>জরুরি SOS</span>
              </Link>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-5 space-y-2">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              হোম (Home)
            </Link>
            <Link
              href="/law-academy"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              <Scale className="w-5 h-5 mr-2 text-emerald-400" />
              শ্রম আইন ও গ্র্যাচুইটি হিসাব
            </Link>
            <Link
              href="/arabic-letter-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2.5 rounded-lg text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              <FileText className="w-5 h-5 mr-2 text-amber-400" />
              আরবি দরখাস্ত মেকার
            </Link>
            <Link
              href="/urgent-sos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg text-base font-bold text-red-300 bg-red-950/40 border border-red-800/40"
            >
              <span className="flex items-center">
                <ShieldAlert className="w-5 h-5 mr-2 text-red-400" />
                জরুরি এসওএস ডায়ালার
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
