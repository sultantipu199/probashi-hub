import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Cookie, Server } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি (Privacy Policy) | Probashi Hub",
  description: "প্রবাসী হাবের গোপনীয়তা নীতি, তথ্য সুরক্ষা ও গুগল অ্যাডসেন্স কুকি নীতিমালা।",
  alternates: {
    canonical: "https://probashi-hub.vercel.app/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      {/* Breadcrumb */}
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
            <ShieldCheck className="w-4 h-4" />
            <span>আইনি সুরক্ষা ও তথ্য নিরাপত্তা</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            গোপনীয়তা নীতি (Privacy Policy)
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            সর্বশেষ পরিমার্জন: সেপ্টেম্বর ২০২৬ | কার্যকর: সকল প্রবাসী হাব ভিজিটরদের জন্য
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Lock className="w-4 h-4 mr-2 text-emerald-400" />
            ১. ভূমিকা ও প্রতিশ্রুতি
          </h2>
          <p>
            <strong>প্রবাসী হাব (Probashi Hub)</strong> সৌদি আরবে অবস্থানরত প্রবাসী বাংলাদেশিদের আইনি তথ্য, জরুরি সহায়তা ও ক্যালকুলেটর সেবা প্রদানকারী একটি উন্মুক্ত তথ্যসেবা প্ল্যাটফর্ম। আমরা আপনার ব্যক্তিগত তথ্যের সর্বোচ্চ গোপনীয়তা ও সুরক্ষায় প্রতিশ্রুতিবদ্ধ। এই গোপনীয়তা নীতিমালায় ব্যাখ্যা করা হয়েছে যে আমরা কীভাবে তথ্য সংগ্রহ, ব্যবহার এবং সংরক্ষণ করি।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Eye className="w-4 h-4 mr-2 text-emerald-400" />
            ২. আমরা কী ধরনের তথ্য সংগ্রহ করি
          </h2>
          <ul className="list-disc list-inside space-y-1 text-slate-300 pl-2">
            <li><strong>ব্যবহারকারীর প্রদত্ত তথ্য:</strong> যখন আপনি আমাদের দরখাস্ত মেকার, ক্যালকুলেটর বা লিড ফর্মে তথ্য প্রদান করেন, সেই তথ্য সাময়িকভাবে সংশ্লিষ্ট আউটপুট তৈরির কাজে ব্যবহৃত হয়।</li>
            <li><strong>লগ ফাইল ও কারিগরি তথ্য:</strong> আইপি ঠিকানা, ব্রাউজারের ধরন, রেফারাল পেজ, এবং ভিজিটের সময় সংক্রান্ত সাধারণ কারিগরি ডেটা যা নিরাপত্তা ও পারফরম্যান্স মূল্যায়নে ব্যবহৃত হয়।</li>
          </ul>
        </section>

        <section className="space-y-3 bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Cookie className="w-4 h-4 mr-2 text-amber-400" />
            ৩. কুকিজ এবং গুগল অ্যাডসেন্স (Google AdSense & Cookies)
          </h2>
          <p className="text-xs leading-relaxed text-slate-300">
            আমরা আমাদের ওয়েবসাইটে তৃতীয় পক্ষ বিজ্ঞাপন নেটওয়ার্ক যেমন <strong>Google AdSense</strong> ব্যবহার করতে পারি। গুগল একজন তৃতীয় পক্ষ ভেন্ডর হিসেবে এই সাইটে বিজ্ঞাপন প্রদর্শনের জন্য কুকিজ (Cookies) ব্যবহার করে।
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300 pl-2">
            <li>গুগল তার ডার্ট (DART) কুকির মাধ্যমে ব্যবহারকারীদের ইন্টারনেট ব্যবহারের অভ্যাসের ওপর ভিত্তি করে প্রাসঙ্গিক বিজ্ঞাপন প্রদর্শন করতে পারে।</li>
            <li>ব্যবহারকারীরা গুগলের বিজ্ঞাপন ও কনটেন্ট নেটওয়ার্ক গোপনীয়তা নীতি (<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Google Ads Policy</a>) পরিদর্শন করে ডার্ট কুকির ব্যবহার প্রত্যাখ্যান (Opt-out) করতে পারেন।</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Server className="w-4 h-4 mr-2 text-emerald-400" />
            ৪. তথ্য সুরক্ষা ও ডেটা নিরাপত্তা
          </h2>
          <p>
            আমরা ব্যবহারকারীর কোনো সংবেদনশীল ব্যক্তিগত ডেটা (যেমন আকামা নম্বর, পাসপোর্ট নম্বর বা ব্যাংকিং তথ্য) আমাদের ডাটাবেজে স্থায়ীভাবে সংরক্ষণ করি না। আমাদের সার্ভারগুলো আধুনিক এসএসএল (SSL/TLS) এনক্রিপশন দ্বারা সুরক্ষিত।
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <FileText className="w-4 h-4 mr-2 text-emerald-400" />
            ৫. যোগাযোগ
          </h2>
          <p>
            আমাদের এই গোপনীয়তা নীতি সম্পর্কিত কোনো জিজ্ঞাসা থাকলে আমাদের সাপোর্ট টিমের সাথে সরাসরি যোগাযোগ করতে পারেন: <a href="mailto:support@probashihub.com" className="text-emerald-400 hover:underline">support@probashihub.com</a> অথবা আমাদের <Link href="/contact" className="text-emerald-400 hover:underline">যোগাযোগ পেজ</Link> ব্যবহার করুন।
          </p>
        </section>
      </div>
    </div>
  );
}
