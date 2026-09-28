"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PhoneCall,
  ShieldAlert,
  Ambulance,
  Car,
  Flame,
  Building,
  MapPin,
  Copy,
  Check,
  ArrowLeft,
  Volume2,
  AlertOctagon,
  HeartPulse,
  Scale
} from "lucide-react";

interface EmergencyContact {
  name: string;
  name_ar: string;
  number: string;
  description: string;
  bgGradient: string;
  icon: any;
  priority: boolean;
}

const EMERGENCY_SERVICES: EmergencyContact[] = [
  {
    name: "রেড ক্রিসেন্ট অ্যাম্বুলেন্স (Ambulance)",
    name_ar: "الهلال الأحمر السعودي",
    number: "997",
    description: "যেকোনো আকস্মিক অসুস্থতা, হার্ট অ্যাটাক বা মারাত্মক রক্তপাতের জরুরি চিকিৎসা",
    bgGradient: "from-red-600 to-rose-700",
    icon: Ambulance,
    priority: true,
  },
  {
    name: "সৌদি পুলিশ (Saudi Police)",
    name_ar: "الشرطة",
    number: "999",
    description: "হামলা, ছিনতাই, চুরি, মারামারি বা যেকোনো ফৌজদারি অপরাধের তাৎক্ষণিক রিপোর্ট",
    bgGradient: "from-blue-600 to-indigo-800",
    icon: ShieldAlert,
    priority: true,
  },
  {
    name: "নাজম সড়ক দুর্ঘটনা (Najm Accident)",
    name_ar: "نجم لخدمات التأمين",
    number: "920000560",
    description: "রাস্তায় গাড়ির সংঘর্ষ হলে ইন্স্যুরেন্স ক্লেইমের জন্য ঘটনাস্থলে নাজম সার্ভেয়ার তলব",
    bgGradient: "from-amber-600 to-orange-700",
    icon: Car,
    priority: true,
  },
  {
    name: "মরুর - ট্রাফিক পুলিশ (Traffic Police)",
    name_ar: "المرور السعودي",
    number: "993",
    description: "বড় সড়ক জ্যাম, ট্রাফিক সিগন্যাল সমস্যা ও শারীরিক জখমযুক্ত বড় দুর্ঘটনা",
    bgGradient: "from-teal-600 to-emerald-800",
    icon: Car,
    priority: false,
  },
  {
    name: "সিভিল ডিফেন্স ও ফায়ার সার্ভিস (Fire)",
    name_ar: "الدفاع المدني",
    number: "998",
    description: "আগুনের সূত্রপাত, ভবন ধস, গ্যাস লিকেজ বা বন্যার উদ্ধার কাজ",
    bgGradient: "from-orange-600 to-red-700",
    icon: Flame,
    priority: false,
  },
  {
    name: "স্বাস্থ্য মন্ত্রণালয় হটলাইন (MOH Seha)",
    name_ar: "وزارة الصحة",
    number: "937",
    description: "হাসপাতাল অনিয়ম, জরুরি ওষুধ ও টেলিমেডিসিন সরকারি ডাক্তার সেবা",
    bgGradient: "from-emerald-600 to-teal-800",
    icon: HeartPulse,
    priority: false,
  },
  {
    name: "শ্রম মন্ত্রণালয় অভিযোগ সেল (Labor Helpline)",
    name_ar: "وزارة الموارد البشرية",
    number: "19911",
    description: "কফিলের বিরুদ্ধে অভিযোগ, পাসপোর্ট জব্দ বা বেতন বন্ধের অভিযোগ (ইংরেজি ও আরবি)",
    bgGradient: "from-indigo-600 to-purple-800",
    icon: Scale,
    priority: false,
  },
  {
    name: "জাওয়াযাত পাসপোর্ট কন্ট্রোল (Jawazat)",
    name_ar: "الجوازات السعودية",
    number: "992",
    description: "ইকামা, বর্ডার এন্ট্রি ও ফাইনাল এক্সিট সংক্রান্ত জরুরি সরকারি তথ্য",
    bgGradient: "from-slate-700 to-slate-900",
    icon: Building,
    priority: false,
  },
  {
    name: "বাংলাদেশ দূতাবাস রিয়াদ (Embassy Riyadh)",
    name_ar: "سفارة بنجلاديش بالرياض",
    number: "+966114195300",
    description: "লেবার উইং, পাসপোর্ট, আউটপাস, মৃত্যু ও আইনি কল্যাণ শাখা (রিয়াদ জোন)",
    bgGradient: "from-saudi-700 to-emerald-900",
    icon: Building,
    priority: true,
  },
  {
    name: "বাংলাদেশ কনস্যুলেট জেনারেল জেদ্দা (Consulate)",
    name_ar: "القنصلية العامة بجدة",
    number: "+966126878465",
    description: "জেদ্দা, মক্কা ও মদিনা অঞ্চলের প্রবাসীদের পাসপোর্ট ও লিগ্যাল সাপোর্ট",
    bgGradient: "from-saudi-700 to-emerald-900",
    icon: Building,
    priority: true,
  },
];

const EMERGENCY_PHRASES = [
  {
    ar: "عندي حالة طارئة جداً",
    pronounce: "ইন্দি হালাহ ত্বারিআহ জিদ্দান",
    bn: "আমার অত্যন্ত জরুরি আপদকালীন অবস্থা",
  },
  {
    ar: "احتاج سيارة إسعاف بسرعة لو سمحت",
    pronounce: "এহতাজ সাইয়্যারাত ইস'আফ বিসুরআহ লাও সামাহ্ত",
    bn: "দয়া করে দ্রুত একটি অ্যাম্বুলেন্স পাঠান",
  },
  {
    ar: "صار حادث سيارة في الشارع",
    pronounce: "সার হাদিছ সাইয়্যারাহ ফিশ-শারে'",
    bn: "রাস্তায় একটি গাড়ি এক্সিডেন্ট হয়েছে",
  },
  {
    ar: "أنا مريض جداً وفاقد للوعي",
    pronounce: "আনা মারিদ জিদ্দান ওয়া ফাকিদুল লিওয়াই",
    bn: "আমি খুব অসুস্থ এবং জ্ঞান হারানোর মতো অবস্থা",
  },
  {
    ar: "موقعي الحالي هو...",
    pronounce: "মাউকিঈ আল-হালি হুয়া...",
    bn: "আমার বর্তমান লোকেশন হলো...",
  },
];

export default function UrgentSosPage() {
  const [coords, setCoords] = useState<string | null>(null);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [copiedCoords, setCopiedCoords] = useState(false);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("আপনার ডিভাইসে জিপিএস লোকেশন সমর্থিত নয়।");
      return;
    }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const text = `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
        setCoords(text);
        setGettingLocation(false);
      },
      (err) => {
        alert("লোকেশন পাওয়া যায়নি। অনুগ্রহ করে ফোনের লোকেশন অন করুন।");
        setGettingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCopyLocation = () => {
    if (coords && navigator.clipboard) {
      navigator.clipboard.writeText(coords);
      setCopiedCoords(true);
      setTimeout(() => setCopiedCoords(false), 2500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Back Nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরুন</span>
        </Link>
        <span className="text-xs font-bold text-red-400 bg-red-950/80 border border-red-800 px-3 py-1 rounded-full animate-pulse">
          জরুরি এসওএস ডায়ালার (২৪/৭ অফলাইন রেডি)
        </span>
      </div>

      {/* Main Alert Banner */}
      <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white p-6 sm:p-8 rounded-3xl shadow-2xl space-y-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
            <PhoneCall className="w-7 h-7 text-white animate-bounce" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              সৌদি আরব জরুরি ডায়াল সার্ভিস
            </h1>
            <p className="text-xs sm:text-sm text-red-100 font-medium">
              যেকোনো বিপদে নিচে থাকা নির্দিষ্ট নম্বরে সরাসরি এক ক্লিকে কল করুন
            </p>
          </div>
        </div>
      </div>

      {/* GPS Location Instant Sharer */}
      <div className="glass-panel p-5 rounded-2xl border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-saudi-800 text-emerald-300">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">জরুরি জিপিএস লোকেশন শেয়ার</h3>
            <p className="text-xs text-slate-400">
              পুলিশ বা অ্যাম্বুলেন্সকে আপনার বর্তমান সঠিক লোকেশন পাঠাতে এক ক্লিকে লিংক নিন
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full sm:w-auto">
          {coords ? (
            <button
              onClick={handleCopyLocation}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-lg"
            >
              {copiedCoords ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>ম্যাপ লিংক কপি হয়েছে</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>গুগল ম্যাপ লিংক কপি করুন</span>
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleGetLocation}
              disabled={gettingLocation}
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-emerald-500/40 px-4 py-2.5 rounded-xl text-xs font-bold transition"
            >
              <MapPin className="w-4 h-4" />
              <span>{gettingLocation ? "লোকেশন নেওয়া হচ্ছে..." : "আমার লোকেশন বের করুন"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Emergency Contact Dialer Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">সরাসরি ডায়াল করুন (Tap to Call)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EMERGENCY_SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <a
                key={srv.number}
                href={`tel:${srv.number}`}
                className={`p-5 rounded-3xl border text-white transition transform active:scale-95 flex items-center justify-between shadow-xl ${
                  srv.priority
                    ? "bg-slate-900 border-red-500/40 hover:border-red-400"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold text-white leading-tight">
                      {srv.name}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-serif" dir="rtl">
                    {srv.name_ar}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                    {srv.description}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${srv.bgGradient} flex items-center justify-center shadow-lg border border-white/20`}>
                    <PhoneCall className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-sm font-black text-white mt-1.5 tracking-wider">
                    {srv.number}
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* Essential Arabic Phrases for Emergency Calls */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-3 pb-3 border-b border-slate-800">
          <div className="p-2.5 rounded-xl bg-saudi-800 text-emerald-300">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              জরুরি ফোন কলে আরবি বলার সহায়িকা (Emergency Arabic Phrases)
            </h3>
            <p className="text-xs text-slate-400">
              অ্যাম্বুলেন্স বা পুলিশকে ফোন করার পর এই আরবি বাক্যগুলো উচ্চারণ করে সাহায্য চান
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {EMERGENCY_PHRASES.map((phrase, idx) => (
            <div
              key={idx}
              className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="space-y-1">
                <div className="text-base font-bold text-emerald-300 font-serif" dir="rtl">
                  {phrase.ar}
                </div>
                <div className="text-xs font-semibold text-slate-300">
                  উচ্চারণ: {phrase.pronounce}
                </div>
              </div>
              <div className="text-xs text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-800/50">
                অর্থ: {phrase.bn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
