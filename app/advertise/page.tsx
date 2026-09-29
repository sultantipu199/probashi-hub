"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Megaphone,
  CheckCircle2,
  Users,
  Eye,
  TrendingUp,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  Building,
  Mail,
  PhoneCall,
  ArrowRight,
  Send,
  Loader2
} from "lucide-react";

export default function AdvertisePage() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("কার্গো ও ট্রাভেল (Cargo & Travel)");
  const [budget, setBudget] = useState("৩০০ - ৫০০ রিয়াল/মাস");
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${name} (${company || "Company"})`,
          phone,
          city: "সৌদি আরব (বিজ্ঞাপন অনুসন্ধান)",
          category: "Advertising & Sponsorship",
          details: `বাজেট: ${budget} | ক্যাটাগরি: ${category} | বিবরণ: ${details}`,
          service_title: "বিজ্ঞাপন ও পার্টনারশিপ অনুসন্ধান",
          service_slug: "advertise-partner",
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitted(true);
      } else {
        setErrorMsg("দুঃখিত, তথ্য জমা দেওয়া সম্ভব হয়নি। সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।");
      }
    } catch (err) {
      setErrorMsg("নেটওয়ার্ক ত্রুটি। অনুগ্রহ করে সরাসরি হোয়াটসঅ্যাপে লিখুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 bg-saudi-900/60 border border-saudi-600/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300">
          <Megaphone className="w-3.5 h-3.5 text-emerald-400" />
          <span>প্রবাসী হাব স্পনসরশিপ ও পার্টনারশিপ প্রোগ্রাম</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          সৌদি প্রবাসী কমিউনিটির কাছে পৌঁছান <span className="text-emerald-400">সরাসরি</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          সৌদি আরবে বসবাসরত ৩০ লক্ষ বাংলাদেশি প্রবাসীর সবচেয়ে দ্রুত বর্ধনশীল ওয়ান-স্টপ ইনফরমেশন হাব। আপনার কার্গো, ট্রাভেল, আইনি সেবা বা বাণিজ্যিক প্রতিষ্ঠানের প্রচার বাড়ান।
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <Users className="w-6 h-6 text-emerald-400 mx-auto" />
          <div className="text-2xl font-black text-white">৫০,০০০+</div>
          <div className="text-xs text-slate-400 font-medium">মাসিক নিয়মিত ভিজিটর</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <Eye className="w-6 h-6 text-blue-400 mx-auto" />
          <div className="text-2xl font-black text-white">১,৫০,০০০+</div>
          <div className="text-xs text-slate-400 font-medium">মাসিক ইমপ্রেশন</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <TrendingUp className="w-6 h-6 text-amber-400 mx-auto" />
          <div className="text-2xl font-black text-white">১০০%</div>
          <div className="text-xs text-slate-400 font-medium">সৌদি প্রবাসী টার্গেটেড</div>
        </div>
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center space-y-1">
          <ShieldCheck className="w-6 h-6 text-teal-400 mx-auto" />
          <div className="text-2xl font-black text-white">ভেরিফাইড</div>
          <div className="text-xs text-slate-400 font-medium">অফিশিয়াল পার্টনার ট্যাগ</div>
        </div>
      </div>

      {/* Sponsorship Tiers */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white">আমাদের বিজ্ঞাপন ও পার্টনারশিপ প্যাকেজ</h2>
          <p className="text-xs text-slate-400">আপনার ব্যবসার ধরন অনুযায়ী সেরা প্ল্যান নির্বাচন করুন</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Package 1 */}
          <div className="rounded-3xl p-6 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-blue-400 bg-blue-950/60 px-3 py-1 rounded-full border border-blue-800/40">
                স্ট্যান্ডার্ড ব্যানার
              </span>
              <h3 className="text-xl font-bold text-white">ক্যাটাগরি ব্যানার স্পনসর</h3>
              <div className="text-3xl font-black text-emerald-400">
                ৩০০ <span className="text-sm font-normal text-slate-400">SAR / মাস</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>নির্দিষ্ট ক্যাটাগরির সকল পেজে টপ ব্যানার</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>সরাসরি হোয়াটসঅ্যাপ ডিরেক্ট ক্লিক বাটন</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>মাসিক পারফরম্যান্স ক্লিক রিপোর্ট</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub-এ ক্যাটাগরি ব্যানার স্পনসরশিপ নিতে আগ্রহী।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition block"
            >
              বুকিং করুন
            </a>
          </div>

          {/* Package 2 - Best Value */}
          <div className="rounded-3xl p-6 bg-gradient-to-b from-saudi-950 via-slate-900 to-slate-900 border-2 border-emerald-500 shadow-2xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              সর্বোচ্চ কনভার্সন
            </div>
            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                পে-পার-লিড (PPL)
              </span>
              <h3 className="text-xl font-bold text-white">ভেরিফাইড কাস্টমার লিড</h3>
              <div className="text-3xl font-black text-emerald-400">
                ৫০ <span className="text-sm font-normal text-slate-400">SAR / প্রতি লিড</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>শুধুমাত্র প্রকৃত আগ্রহী গ্রাহকের নাম ও ফোন নম্বর</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>কার্গো, টিকেট, আইনজীবী ও ব্যবসা সেটআপ লিড</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>তাৎক্ষণিক হোয়াটসঅ্যাপ ও ইমেইল ফরোয়ার্ড</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>অ্যাডমিন প্যানেলে লাইভ স্ট্যাটাস ট্র্যাকিং</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub-এর ভেরিফাইড লিড জেনারেশন প্যাকেজ সম্পর্কে কথা বলতে চাই।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs text-center shadow-lg transition block"
            >
              লিড পার্টনার হন
            </a>
          </div>

          {/* Package 3 */}
          <div className="rounded-3xl p-6 bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="text-xs font-bold text-purple-400 bg-purple-950/60 px-3 py-1 rounded-full border border-purple-800/40">
                এক্সক্লুসিভ স্পনসর
              </span>
              <h3 className="text-xl font-bold text-white">হোমপেজ ও সাইটওয়াইড পার্টনার</h3>
              <div className="text-3xl font-black text-purple-400">
                ১,০০০ <span className="text-sm font-normal text-slate-400">SAR / মাস</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>হোমপেজের মূল ব্যানার সেকশনে লোগো ও অফার</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>৮৪টি পেজের ফুটারে অফিশিয়াল পার্টনার লিংক</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>সোশ্যাল মিডিয়া পেজে মাসিক ২টি প্রোমোশনাল পোস্ট</span>
                </li>
              </ul>
            </div>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                "আসসালামু আলাইকুম, আমি Probashi Hub-এ এক্সক্লুসিভ সাইটওয়াইড স্পনসরশিপ নিতে চাই।"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs text-center transition block"
            >
              বুকিং আলোচনা
            </a>
          </div>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-bold text-white">অনলাইনে বিজ্ঞাপন প্রস্তাব পাঠান</h3>
          <p className="text-xs text-slate-400">ফর্মটি পূরণ করুন, আমাদের বাণিজ্যিক টিম ২৪ ঘণ্টার মধ্যে যোগাযোগ করবে।</p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h4 className="text-lg font-bold text-white">ধন্যবাদ! আপনার প্রস্তাব গৃহীত হয়েছে।</h4>
            <p className="text-xs text-slate-300">আমাদের অ্যাডভার্টাইজিং টিম দ্রুতই আপনার ফোন নম্বরে যোগাযোগ করবে।</p>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:underline pt-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>জরুরি প্রয়োজনে সরাসরি হোয়াটসঅ্যাপ করুন</span>
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <div className="p-3 bg-red-950/60 border border-red-800 rounded-xl text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="উদাঃ মোহাম্মদ হাসান"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">প্রতিষ্ঠানের নাম</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="উদাঃ আল-আমানাহ কার্গো সার্ভিসেস"
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-300 mb-1">হোয়াটসঅ্যাপ / ফোন নম্বর *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="05XXXXXXXX / +966..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">সার্ভিস ক্যাটাগরি</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="কার্গো ও ট্রাভেল (Cargo & Travel)">কার্গো ও ট্রাভেল</option>
                  <option value="লিগ্যাল এইড ও আইনজীবী (Legal Aid)">লিগ্যাল এইড ও আইনজীবী</option>
                  <option value="গাড়ি ইন্স্যুরেন্স ও ড্রাইভিং স্কুল (Car Insurance)">গাড়ি ইন্স্যুরেন্স ও ড্রাইভিং স্কুল</option>
                  <option value="রেমিট্যান্স ও ফিনটেক (Remittance & Banking)">রেমিট্যান্স ও ব্যাংকিং</option>
                  <option value="MISA ও ব্যবসা কনসালটেন্সি (Business Setup)">MISA ও ব্যবসা কনসালটেন্সি</option>
                  <option value="অন্যান্য (Other Services)">অন্যান্য সেবা</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">মাসিক আনুমানিক বাজেট</label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
              >
                <option value="৩০০ - ৫০০ রিয়াল/মাস">৩০০ - ৫০০ SAR / মাস (ক্যাটাগরি ব্যানার)</option>
                <option value="৫০ রিয়াল/প্রতি লিড">৫০ SAR / লিড (পে-পার-লিড)</option>
                <option value="১,০০০+ রিয়াল/মাস">১,০০০+ SAR / মাস (এক্সক্লুসিভ স্পনসর)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">বিস্তারিত প্রস্তাব বা বার্তা</label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="আপনার বিজ্ঞাপন লক্ষ্য এবং পছন্দের পেজ সম্পর্কে জানান..."
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-lg transition"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>জমা হচ্ছে...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>বিজ্ঞাপন প্রস্তাব সাবমিট করুন</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
