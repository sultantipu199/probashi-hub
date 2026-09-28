import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Scale,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookOpen,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  FileCheck
} from "lucide-react";
import GratuityCalculator from "@/components/GratuityCalculator";

export const metadata: Metadata = {
  title: "সৌদি শ্রম আইন একাডেমি ও গ্র্যাচুইটি হিসাব | Probashi Hub",
  description:
    "সৌদি শ্রম আইনের ধারা ৮৪, ৮৫, ৭৭ ও ৮৩ এর বিশ্লেষণ। মিথ বনাম সত্য এবং রিয়েল-টাইম সার্ভিস বেনিফিট ক্যালকুলেটর।",
};

const LAW_ARTICLES = [
  {
    article: "ধারা ৮৪ (Article 84)",
    title: "সার্ভিস বেনিফিট বা গ্র্যাচুইটি অর্জনের মূল বিধান",
    description:
      "চাকরি সমাপ্তিতে প্রথম ৫ বছরের জন্য প্রতি বছর অর্ধ মাসের মূল বেতন (Basic Salary) এবং পরবর্তী প্রতি বছরের জন্য পূর্ণ এক মাসের মূল বেতন পরিশোধ করতে হবে।",
    highlight: "কোম্পানি ছাঁটাই করলে ১০০% পূর্ণ পাওনা প্রাপ্য।",
  },
  {
    article: "ধারা ৮৫ (Article 85)",
    title: "শ্রমিক নিজে পদত্যাগ (Resignation) করলে গ্র্যাচুইটির হার",
    description:
      "শ্রমিক স্বেচ্ছায় পদত্যাগ করলে: ২ বছরের কম সময়ে ০%, ২ থেকে ৫ বছর পর্যন্ত ৩৩.৩৩% (এক তৃতীয়াংশ), ৫ থেকে ১০ বছর পর্যন্ত ৬৬.৬৬% (দুই তৃতীয়াংশ), এবং ১০ বছরের বেশি হলে ১০০% সম্পূর্ণ গ্র্যাচুইটি প্রাপ্য।",
    highlight: "১০ বছর চাকরি করলে পদত্যাগে কোনো টাকা কাটার অধিকার কফিলের নেই।",
  },
  {
    article: "ধারা ৭৭ (Article 77)",
    title: "অন্যায় বা বেআইনি বরখাস্তের (Arbitrary Dismissal) ক্ষতিপূরণ",
    description:
      "চুক্তির মেয়াদের আগে কোনো বৈধ কারণ ছাড়া কফিল চাকরিচ্যুত করলে চুক্তির অবশিষ্ট মেয়াদের সম্পূর্ণ বেতন অথবা অনির্দিষ্ট মেয়াদী চুক্তিতে প্রতি বছরের জন্য ১৫ দিনের বেতন ক্ষতিপূরণ দিতে বাধ্য।",
    highlight: "শ্রমিককে কোনো অজুহাতে হুট করে তাড়িয়ে দেওয়া বেআইনি।",
  },
  {
    article: "ধারা ৮৩ (Article 83)",
    title: "নন-কম্পিট বা প্রতিদ্বন্দ্বী প্রতিষ্ঠানে যোগদানের শর্তাবলী",
    description:
      "কোম্পানির বাণিজ্যিক গোপন তথ্য সুরক্ষায় নন-কম্পিট ক্লজ সর্বোচ্চ ২ বছর মেয়াদে সুনির্দিষ্ট ভৌগোলিক এলাকায় সীমাবদ্ধ হতে পারে। ঢালাওভাবে সাধারণ কর্মীদের অন্য কাজে বাধা দেওয়া যায় না।",
    highlight: "কফিল বেতন বকেয়া রাখলে এই শর্ত স্বয়ংক্রিয়ভাবে অকার্যকর হয়।",
  },
  {
    article: "ধারা ১০৭ (Article 107)",
    title: "ওভারটাইম বেতন ও কর্মঘণ্টা বিধান (দেড় গুণ রেট)",
    description:
      "দৈনিক ৮ ঘণ্টা বা সপ্তাহে ৪৮ ঘণ্টার অতিরিক্ত যেকোনো কাজের জন্য প্রতি ঘণ্টার মূল বেতনের সাথে আরও ৫০% অতিরিক্ত (মোট ১৫০% রেট) দিতে হবে। সাপ্তাহিক ছুটির দিনের কাজেও পূর্ণ ওভারটাইম প্রযোজ্য।",
    highlight: "ফিক্সড বেতনের অজুহাতে ফ্রি ওভারটাইম করানো শাস্তিযোগ্য অপরাধ।",
  },
  {
    article: "ধারা ১১১ (Article 111)",
    title: "বাৎসরিক অব্যবহৃত ছুটির নগদ ক্যাশ এনক্যাশমেন্ট",
    description:
      "চাকরি অবসানের সময় কর্মী যে পরিমাণ বাৎসরিক ছুটি (২১ বা ৩০ দিন প্রতি বছর) ভোগ করেননি, প্রতিটি অব্যবহৃত ছুটির দিনের জন্য পূর্ণ মূল বেতনের সমপরিমাণ নগদ টাকা কফিলকে পরিশোধ করতে হবে।",
    highlight: "ছুটির টাকা সার্ভিস বেনিফিট থেকে সম্পূর্ণ আলাদা পাওনা।",
  },
];

const MYTH_VS_FACT = [
  {
    myth: "কফিল না চাইলে কোনোভাবেই অন্য প্রতিষ্ঠানে কাফালা হওয়া যায় না।",
    fact: "টানা ৩ মাস বেতন বকেয়া থাকলে, ইকামা শেষ হওয়ার ৩০ দিন পার হলে অথবা কফিল লাল জোনে থাকলে কিওয়া (Qiwa) পোর্টালে কফিলের অনুমোদন ছাড়াই স্বয়ংক্রিয়ভাবে বদলি হওয়া যায়।",
  },
  {
    myth: "শ্রমিক নিজে পদত্যাগ করলে কোম্পানি তাকে এক রিয়ালও গ্র্যাচুইটি দিতে বাধ্য নয়।",
    fact: "সৌদি শ্রম আইনের ধারা ৮৫ অনুযায়ী ২ বছরের বেশি চাকরি থাকলে পদত্যাগ করলেও ৩৩%, ৫ বছর পার হলে ৬৬% এবং ১০ বছর পার হলে ১০০% সম্পূর্ণ গ্র্যাচুইটি আইনত দিতে বাধ্য।",
  },
  {
    myth: "কফিল চাইলে শ্রমিকের মূল পাসপোর্ট সারা জীবন নিজের লকারে আটকে রাখতে পারে।",
    fact: "সৌদি রাজকীয় ফরমান অনুসারে শ্রমিকের পাসপোর্ট আটকে রাখা গুরুতর ফৌজদারি অপরাধ। পাসপোর্ট আটকে রাখলে কফিলকে প্রতিষ্ঠানপ্রতি ২০,০০০ রিয়াল জরিমানা করা হয়।",
  },
  {
    myth: "হুরুব পড়লে প্রবাসীকে সারাজীবন সৌদি আরবের জেলে পচতে হবে, দেশে ফেরা সম্ভব নয়।",
    fact: "বাংলাদেশ দূতাবাসের ট্রাভেল পারমিট (আউটপাস) এবং জাওয়াযাত তারহিল ক্লিয়ারেন্সের মাধ্যমে কোনো প্রকার জেল ছাড়াই সসম্মানে দেশে ফেরা সম্ভব।",
  },
  {
    myth: "কাগজে স্ট্যাম্পে সই করা চুক্তিই সব, কিওয়া চুক্তি কোনো কাজে আসে না।",
    fact: "সৌদি শ্রম আদালতের নির্দেশ অনুযায়ী কিওয়া (Qiwa) পোর্টালে ডিজিটালভাবে নিবন্ধিত চুক্তি ছাড়া অন্য কোনো কাগজের চুক্তি আইনি ভিত্তি বহন করে না।",
  },
];

export default function LawAcademyPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-saudi-900/60 border border-saudi-600/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
          <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
          <span>সৌদি শ্রম আইন একাডেমি (Saudi Labor Regulations)</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          সৌদি শ্রম আইন ও আপনার <span className="text-emerald-400">মৌলিক অধিকার</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          সৌদি আরবে কাজ করার সময় অধিকাংশ প্রবাসী আইন না জানার কারণে ন্যায্য পাওনা থেকে বঞ্চিত হন। জেনে নিন শ্রম আইনের প্রধান ধারা এবং ব্যবহার করুন অফিশিয়াল গ্র্যাচুইটি ক্যালকুলেটর।
        </p>
      </div>

      {/* EMBEDDED GRATUITY CALCULATOR */}
      <section className="space-y-4">
        <GratuityCalculator />
      </section>

      {/* MYTH VS FACT SECTION */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white">প্রবাসী সমাজে প্রচলিত ৫টি ভুল ধারণা বনাম সত্য আইন</h2>
          <p className="text-xs text-slate-400 mt-1">দালাল ও অসৎ কফিলের মিথ বনাম সৌদি শ্রম মন্ত্রণালয়ের অফিশিয়াল বাস্তব নিয়ম</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MYTH_VS_FACT.map((item, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-start space-x-2 text-red-400 text-xs font-bold uppercase tracking-wider">
                  <XCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>ভুল ধারণা (Myth):</span>
                </div>
                <p className="text-sm text-red-200 font-semibold bg-red-950/40 p-3 rounded-xl border border-red-900/40">
                  &ldquo;{item.myth}&rdquo;
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-start space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>প্রকৃত সত্য আইন (Official Fact):</span>
                </div>
                <p className="text-sm text-slate-200 bg-emerald-950/30 p-3 rounded-xl border border-emerald-900/40 leading-relaxed font-medium">
                  {item.fact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ESSENTIAL LABOR LAW ARTICLES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">জরুরি সৌদি শ্রম আইনের ধারা ও ব্যাখ্যা</h2>
            <p className="text-xs text-slate-400">শ্রমিকদের সুরক্ষায় সৌদি রাজকীয় আইনের মৌলিক বিধানসমূহ</p>
          </div>
          <Link
            href="/arabic-letter-generator"
            className="hidden sm:inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>আরবি দরখাস্ত প্রস্তুত করুন</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {LAW_ARTICLES.map((art, idx) => (
            <div
              key={idx}
              className="glass-panel p-5 rounded-3xl border border-slate-800 hover:border-emerald-500/40 transition flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <span className="text-xs font-black text-emerald-400 bg-saudi-950 px-2.5 py-1 rounded-lg border border-emerald-800/50">
                  {art.article}
                </span>
                <h3 className="text-base font-bold text-white leading-snug pt-1">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {art.description}
                </p>
              </div>

              <div className="text-[11px] text-amber-300 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40 font-medium">
                💡 মূল পয়েন্ট: {art.highlight}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA to Arabic Letter Generator */}
      <section className="bg-gradient-to-r from-saudi-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            মক্তব আমল বা কফিলের জন্য দরখাস্ত লাগবে?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            আমাদের অটোমেটিক জেনারেটরের মাধ্যমে সঠিক আরবি শব্দবিন্যাসে কাফালা রিলিজ, বকেয়া বেতন দাবি কিংবা পদত্যাগপত্র প্রস্তুত ও প্রিন্ট করুন।
          </p>
        </div>
        <Link
          href="/arabic-letter-generator"
          className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition"
        >
          <FileCheck className="w-5 h-5" />
          <span>আরবি দরখাস্ত মেকার</span>
        </Link>
      </section>
    </div>
  );
}
