"use client";

import React, { useState } from "react";
import { X, Send, ShieldCheck, CheckCircle2, MessageSquare, PhoneCall, Loader2, Sparkles } from "lucide-react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  serviceTitle?: string;
  serviceSlug?: string;
}

const SAUDI_CITIES = [
  "রিয়াদ (Riyadh)",
  "জেদ্দা (Jeddah)",
  "দাম্মাম / খোবার (Dammam / Khobar)",
  "মক্কা মুকাররমা (Makkah)",
  "মদিনা মুনাওয়ারা (Madinah)",
  "জুবাইল (Jubail)",
  "আল কাসিম / বুরাইদা (Al Qassim)",
  "আবহা / খামিস মুশায়াত (Abha / Khamis)",
  "তাবুক (Tabuk)",
  "নাজরান / জিজান (Najran / Jizan)",
  "হাফার আল বাতেন (Hafar Al Batin)",
  "অন্যান্য শহর (Other)"
];

export default function LeadModal({
  isOpen,
  onClose,
  defaultCategory = "Legal Aid",
  serviceTitle = "জরুরি সেবা অনুসন্ধান",
  serviceSlug = "general-inquiry",
}: LeadModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("রিয়াদ (Riyadh)");
  const [category, setCategory] = useState(defaultCategory);
  const [details, setDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonBodyString(),
      });

      const resData = await response.json();
      if (response.ok && resData.success) {
        setSuccess(true);
      } else {
        setErrorMsg(resData.message || "আবেদনটি প্রক্রিয়াকরণ করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।");
      }
    } catch (err: any) {
      setErrorMsg("নেটওয়ার্ক ত্রুটি হয়েছে। সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।");
    } finally {
      setLoading(false);
    }
  };

  const jsonBodyString = () => {
    return JSON.stringify({
      user_name: name,
      phone_number: phone,
      whatsapp_number: phone,
      saudi_city: city,
      service_category: category,
      service_slug: serviceSlug,
      details: details || `${serviceTitle} বিষয়ে পরামর্শ প্রয়োজন।`,
    });
  };

  const getDirectWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি Probashi Hub থেকে যোগাযোগ করছি।\nসেবা: ${serviceTitle}\nনাম: ${name || "প্রবাসী ভাই"}\nশহর: ${city}\nসমস্যা: ${details || "জরুরি আইনি/সেবা সহায়তা প্রয়োজন।"}`
    );
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          /* Success Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">আবেদন সফলভাবে গ্রহণ করা হয়েছে!</h3>
            <p className="text-sm text-slate-300">
              আপনার তথ্য আমাদের বিশেষজ্ঞ লিগ্যাল/সার্ভিস টিমের কাছে পৌঁছেছে। দ্রুত সমাধানের জন্য নিচে বাটনে ক্লিক করে সরাসরি হোয়াটসঅ্যাপে চ্যাট শুরু করুন।
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <a
                href={getDirectWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition"
              >
                <MessageSquare className="w-5 h-5" />
                <span>সরাসরি হোয়াটসঅ্যাপ করুন</span>
              </a>
              <button
                onClick={onClose}
                className="py-3 px-5 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 text-sm font-medium transition"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        ) : (
          /* Form Screen */
          <div>
            <div className="flex items-center space-x-2 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>ভেরিফাইড বিশেষজ্ঞ সহায়তা</span>
            </div>
            <h3 className="text-xl font-bold text-white">{serviceTitle}</h3>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              আপনার তথ্য সম্পূর্ণ গোপনীয় থাকবে। নির্ভরযোগ্য সৌদি লাইসেন্সপ্রাপ্ত অংশীদারের মাধ্যমে সমাধান পৌঁছে দেওয়া হবে।
            </p>

            {errorMsg && (
              <div className="mb-4 p-3 bg-red-950/60 border border-red-800/80 rounded-xl text-xs text-red-300">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  আপনার নাম (Full Name) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="যেমন: মোহাম্মদ রফিকুল ইসলাম"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    হোয়াটসঅ্যাপ নম্বর (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+966 5X XXX XXXX"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    সৌদি শহর (City in KSA)
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                  >
                    {SAUDI_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  সমস্যার সংক্ষিপ্ত বিবরণ (Details) *
                </label>
                <textarea
                  rows={3}
                  required
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="আপনার সমস্যার কথা সংক্ষেপে লিখুন (যেমন: কফিল বেতন আটকে রেখেছে, পাসপোর্ট উদ্ধার করতে চাই...)"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center text-[11px] text-slate-400 space-x-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>সৌদি আরবের ১০০% ফ্রি প্রাথমিক পর্যালোচনা ও আইনি পরামর্শ</span>
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-saudi-600 to-emerald-600 hover:from-saudi-500 hover:to-emerald-500 text-white font-bold py-3 px-5 rounded-xl shadow-lg shadow-emerald-950/60 transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>পাঠানো হচ্ছে...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>বিনামূল্যে অনুরোধ পাঠান</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
