"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, MessageSquare, PhoneCall } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[PROBASHI HUB RUNTIME ERROR]:", error);
  }, [error]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 glass-panel p-8 rounded-3xl border border-red-500/30 shadow-2xl bg-gradient-to-b from-slate-950 via-slate-900 to-red-950/20">
        <div className="w-16 h-16 rounded-2xl bg-red-950 border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-lg">
          <AlertOctagon className="w-8 h-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-red-400 bg-red-950/80 px-3 py-1 rounded-full border border-red-800/50">
            সাময়িক কারিগরি ত্রুটি
          </span>
          <h1 className="text-2xl font-black text-white">
            কিছু একটা ঠিকমতো কাজ করেনি
          </h1>
          <p className="text-xs text-slate-300 leading-relaxed">
            আমরা আন্তরিকভাবে দুঃখিত। সার্ভারের সাময়িক নেটওয়ার্ক জনিত কারণে এই সমস্যাটি হতে পারে। নিচে ক্লিক করে পেজটি পুনরায় লোড করুন।
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => reset()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition"
          >
            <RotateCcw className="w-4 h-4" />
            <span>আবার চেষ্টা করুন (Try Again)</span>
          </button>

          <Link
            href="/"
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 font-medium rounded-xl text-xs flex items-center justify-center space-x-2 border border-slate-800 transition"
          >
            <Home className="w-4 h-4" />
            <span>হোমপেজে ফিরে যান</span>
          </Link>

          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("জরুরি কারিগরি সহায়তা প্রয়োজন")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-slate-900/60 hover:bg-slate-800 text-emerald-400 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 border border-emerald-900/40 transition"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>হোয়াটসঅ্যাপ হেল্পডেস্কে জানান</span>
          </a>
        </div>
      </div>
    </div>
  );
}
