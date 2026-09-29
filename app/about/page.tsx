import React from "react";
import Link from "next/link";
import { Users, HeartHandshake, Award, ShieldCheck, ArrowLeft, Target, Globe } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে (About Us) | Probashi Hub",
  description: "প্রবাসী হাবের লক্ষ্য, উদ্দেশ্য এবং সৌদি প্রবাসী ভাইদের সেবায় আমাদের অঙ্গীকার।",
  alternates: {
    canonical: "https://probashi-hub.vercel.app/about",
  },
};

export default function AboutPage() {
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
            <Users className="w-4 h-4" />
            <span>প্রবাসীদের নির্ভরযোগ্য সহচর</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            আমাদের সম্পর্কে (About Probashi Hub)
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            সৌদি প্রবাসী বাংলাদেশিদের জন্য সর্বাধুনিক উন্মুক্ত তথ্য ও আইনি সহায়তা কেন্দ্র
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <Target className="w-4 h-4 mr-2 text-emerald-400" />
            আমাদের লক্ষ্য ও উদ্দেশ্য (Our Mission)
          </h2>
          <p>
            সৌদি আরবে প্রায় ৩০ লক্ষাধিক প্রবাসী বাংলাদেশি ভাই-বোন অক্লান্ত পরিশ্রম করে দেশের অর্থনীতিতে অবদান রাখছেন। কিন্তু ভাষা ও আইনি তথ্যের অভাবে অনেকেই ন্যায্য অধিকার থেকে বঞ্চিত হন অথবা বিভিন্ন জটিলতায় পড়েন। <strong>প্রবাসী হাব (Probashi Hub)</strong>-এর মূল লক্ষ্য হলো সৌদি শ্রম আইন, ইকামা ও মক্তব আমল নিয়মাবলী, জরুরি ডায়ালার ও দাপ্তরিক আরবি দরখাস্ত সেবা সম্পূর্ণ বাংলায়, সহজ ও উন্মুক্ত উপায়ে প্রতিটি প্রবাসীর হাতের মুঠোয় পৌঁছে দেওয়া।
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <Award className="w-6 h-6 text-emerald-400 mb-2" />
            <h3 className="font-bold text-white text-base mb-1">অফিশিয়াল ডেটা অনুবর্তী</h3>
            <p className="text-xs text-slate-400">
              সৌদি শ্রম মন্ত্রণালয় (HRSD), কিওয়া (Qiwa), জাওয়াযাত ও সৌদি ট্রাফিক পুলিশের অফিশিয়াল নিয়মের সাথে মিলিয়ে তথ্য হালনাগাদ করা হয়।
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <Globe className="w-6 h-6 text-teal-400 mb-2" />
            <h3 className="font-bold text-white text-base mb-1">সর্বাধুনিক প্রযুক্তি</h3>
            <p className="text-xs text-slate-400">
              Next.js 14 আর্কিটেকচারে তৈরি হওয়ায় যেকোনো মোবাইল ব্রাউজারে সেকেন্ডের ভগ্নাংশে এবং অফলাইনেও দ্রুত কাজ করে।
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center">
            <HeartHandshake className="w-4 h-4 mr-2 text-emerald-400" />
            আমাদের প্রতিশ্রুতি
          </h2>
          <p>
            আমরা প্রবাসী ভাইদের কষ্টার্জিত শ্রমের মর্যাদা দিই। কোনো দালাল বা মধ্যস্বত্বভোগী ছাড়াই যেন সাধারণ শ্রমিক ভাইরা নিজের গ্র্যাচুইটি হিসাব করতে পারেন, আরবি দরখাস্ত প্রস্তুত করতে পারেন কিংবা বিপদে সঠিক নম্বরে কল করতে পারেন—এটাই আমাদের একমাত্র ব্রত।
          </p>
        </section>
      </div>
    </div>
  );
}
