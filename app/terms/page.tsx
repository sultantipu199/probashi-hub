import React from "react";
import Link from "next/link";
import { Scale, AlertCircle, FileCheck, ArrowLeft, ShieldAlert } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ব্যবহারের শর্তাবলী (Terms of Service) | Probashi Hub",
  description: "প্রবাসী হাব ব্যবহারের নিয়মাবলী, আইনি দায়মুক্তি ও সেবার শর্তাবলী।",
  alternates: {
    canonical: "https://probashi-hub.vercel.app/terms",
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          মূল হোমপেজে ফিরে যান
        </Link>
      </div>

      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 space-y-8 text-slate-300 leading-relaxed text-sm">
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Scale className="w-4 h-4" />
            <span>ব্যবহারকারী চুক্তি</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ব্যবহারের শর্তাবলী (Terms of Service)
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            সর্বশেষ পরিমার্জন: সেপ্টেম্বর ২০২৬ | প্রবাসী হাব
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <FileCheck className="w-4 h-4 mr-2 text-emerald-400" />
            ১. শর্তাবলীর গ্রহণযোগ্যতা
          </h2>
          <p>
            প্রবাসী হাব (Probashi Hub) ওয়েবসাইট ও এর টুলস ব্যবহার করার মাধ্যমে আপনি এই ব্যবহারের শর্তাবলীতে পূর্ণ সম্মতি প্রকাশ করছেন। যদি আপনি এই শর্তাবলীতে একমত না হন, তবে অনুগ্রহ করে ওয়েবসাইটটির ব্যবহার থেকে বিরত থাকুন।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <AlertCircle className="w-4 h-4 mr-2 text-emerald-400" />
            ২. তথ্যের যথার্থতা ও শিক্ষামূলক উদ্দেশ্য
          </h2>
          <p>
            প্রবাসী হাবে প্রকাশিত শ্রম আইন, গ্র্যাচুইটি নিয়মাবলী, ভিসা ও ট্রাফিক নির্দেশনাসমূহ কেবলমাত্র সাধারণ সচেতনতা ও শিক্ষামূলক উদ্দেশ্যে প্রস্তুত করা হয়েছে। সৌদি শ্রম মন্ত্রণালয় (HRSD), জাওয়াযাত বা সরকারের বিধিমালা সময়ের সাথে পরিবর্তিত হতে পারে।
          </p>
        </section>

        <section className="space-y-3 bg-red-950/20 p-5 rounded-2xl border border-red-900/40">
          <h2 className="text-lg font-bold text-red-300 flex items-center">
            <ShieldAlert className="w-4 h-4 mr-2 text-red-400" />
            ৩. আইনি দায়মুক্তি (Legal Disclaimer)
          </h2>
          <p className="text-xs text-red-200/90 leading-relaxed">
            প্রবাসী হাব কোনো অফিসিয়াল সরকারি সংস্থা বা আইনগত ফার্ম নয়। আমাদের ক্যালকুলেটরের ফলাফল অফিশিয়াল সিদ্ধান্তের বিকল্প নয়। জটিল আইনি বিরোধে সর্বদাই সৌদি আরবের শ্রম আদালত (Labor Court) অথবা নিবন্ধিত আইনজীবীর পরামর্শ গ্রহণের অনুরোধ করা হচ্ছে।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Scale className="w-4 h-4 mr-2 text-emerald-400" />
            ৪. বুদ্ধিবৃত্তিক সম্পদ ও ব্যবহারের অধিকার
          </h2>
          <p>
            প্রবাসী হাবের সকল লেখা, ডিজাইন, টুলস ও কোড কপিরাইট দ্বারা সুরক্ষিত। কোনো বাণিজ্যিক উদ্দেশ্যে এগুলো অননুমোদিতভাবে পুনরুৎপাদন বা কপি করা নিষিদ্ধ।
          </p>
        </section>
      </div>
    </div>
  );
}
