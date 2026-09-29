import React from "react";
import Link from "next/link";
import { ArrowLeft, Home, ShieldAlert, Search, HelpCircle, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-saudi-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
          <Compass className="w-8 h-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800/50">
            Error 404
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            কাঙ্ক্ষিত পৃষ্ঠাটি পাওয়া যায়নি
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            আপনি যে সেবা বা লিংকটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা লিংকটি ভুল। নিচের অপশনগুলো থেকে প্রয়োজনীয় সেবা বেছে নিন।
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <Link
            href="/"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition"
          >
            <Home className="w-4 h-4" />
            <span>মূল হোমপেজে ফিরে যান</span>
          </Link>

          <Link
            href="/urgent-sos"
            className="w-full py-3 bg-red-950/60 hover:bg-red-900/60 text-red-200 border border-red-800/60 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 transition"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>জরুরি এসওএস ডায়ালার</span>
          </Link>

          <Link
            href="/law-academy"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium rounded-xl text-xs flex items-center justify-center space-x-2 border border-slate-800 transition"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>শ্রম আইন একাডেমি ও গ্র্যাচুইটি</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
