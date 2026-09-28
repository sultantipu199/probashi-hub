"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Clock,
  Coins,
  Building,
  CheckSquare,
  AlertTriangle,
  Volume2,
  VolumeX,
  MessageSquare,
  ArrowLeft,
  Share2,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Headphones,
  UserCheck
} from "lucide-react";
import LeadModal from "@/components/LeadModal";

interface ServiceDetailClientProps {
  problem: any;
  relatedProblems: any[];
}

export default function ServiceDetailClient({
  problem,
  relatedProblems,
}: ServiceDetailClientProps) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Web Speech API / TTS narration in Bangla
  const handleToggleAudio = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      alert("আপনার ব্রাউজারে অডিও স্পিচ সুবিধা সমর্থিত নয়।");
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
      return;
    }

    const narrationText = `${problem.title}। সমাধান ধাপসমূহ: ${problem.steps.join("। ")}। সরকারি ফি: ${problem.official_fees_sar}। সতর্কবার্তা: ${problem.scam_warnings}`;
    const utterance = new SpeechSynthesisUtterance(narrationText);
    utterance.lang = "bn-BD";
    utterance.rate = 0.95;

    utterance.onend = () => {
      setIsPlayingAudio(false);
    };
    utterance.onerror = () => {
      setIsPlayingAudio(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsPlayingAudio(true);
  };

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const getDirectWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `আসসালামু আলাইকুম, আমি Probashi Hub থেকে আসছি।\nসমস্যা: ${problem.title}\nলিঙ্ক: https://probashihub.com/services/${problem.slug}\nআমাকে জরুরিভাবে আইনি/পরামর্শ সহায়তা দিন।`
    );
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";
    return `https://wa.me/${whatsappNumber}?text=${text}`;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition flex items-center">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> হোম
        </Link>
        <span>/</span>
        <span className="text-slate-500">{problem.category_name.split("(")[0]}</span>
        <span>/</span>
        <span className="text-emerald-400 font-medium truncate max-w-[200px] sm:max-w-none">
          {problem.title}
        </span>
      </div>

      {/* Main Header Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-800/60">
              {problem.category_name}
            </span>
            {problem.urgent && (
              <span className="text-xs font-bold text-red-300 bg-red-950 px-2.5 py-1 rounded-full border border-red-800 animate-pulse">
                জরুরি সমাধান
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Audio Explanation Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                isPlayingAudio
                  ? "bg-red-600 text-white animate-pulse"
                  : "bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-600/30"
              }`}
            >
              {isPlayingAudio ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>অডিও থামান</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>ভয়েস শুনুন (বাংলায়)</span>
                </>
              )}
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="লিংক কপি করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {copiedLink && (
          <div className="mb-3 text-xs text-emerald-400 font-semibold bg-emerald-950/60 p-2 rounded-lg border border-emerald-800">
            ✅ সমাধান পেজের লিংক কপি হয়েছে! ইমো বা হোয়াটসঅ্যাপে শেয়ার করুন।
          </div>
        )}

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
          {problem.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 font-medium mt-1">
          {problem.title_en}
        </p>

        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
          {problem.summary}
        </p>

        {/* Quick Facts Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-[11px] text-slate-400 flex items-center font-medium">
              <Building className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> অফিশিয়াল পোর্টাল
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1 truncate">
              {problem.official_portal}
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-[11px] text-slate-400 flex items-center font-medium">
              <Coins className="w-3.5 h-3.5 mr-1.5 text-amber-400" /> সরকারি ফি
            </div>
            <div className="text-xs sm:text-sm font-bold text-amber-300 mt-1 truncate">
              {problem.official_fees_sar}
            </div>
          </div>

          <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800">
            <div className="text-[11px] text-slate-400 flex items-center font-medium">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-400" /> নিষ্পত্তির সময়সীমা
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-200 mt-1 truncate">
              {problem.processing_time}
            </div>
          </div>
        </div>
      </div>

      {/* Actionable Steps Section */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <div className="flex items-center space-x-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-saudi-800 text-emerald-300 flex items-center justify-center font-bold">
            ধাপ
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">ধাপে ধাপে সমাধান প্রক্রিয়া</h2>
            <p className="text-xs text-slate-400">নিচের ক্রমিক অনুযায়ী সরকারি পোর্টালে কাজ সম্পন্ন করুন</p>
          </div>
        </div>

        <div className="space-y-4">
          {problem.steps.map((step: string, index: number) => (
            <div
              key={index}
              className="flex items-start space-x-4 bg-slate-900/50 p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition"
            >
              <span className="shrink-0 w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center mt-0.5">
                {index + 1}
              </span>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Required Documents Checklist */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4">
        <div className="flex items-center space-x-2 text-white font-bold text-lg pb-3 border-b border-slate-800">
          <CheckSquare className="w-5 h-5 text-emerald-400" />
          <h2>প্রয়োজনীয় কাগজপত্র (Checklist)</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {problem.required_documents.map((doc: string, idx: number) => (
            <div
              key={idx}
              className="flex items-start space-x-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* High-visibility Scam Alert Warning Box */}
      <div className="bg-gradient-to-r from-red-950/90 to-rose-950/80 border-2 border-red-500/60 p-6 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center space-x-2.5 text-red-300 font-bold text-base">
          <AlertTriangle className="w-6 h-6 text-red-400 animate-bounce" />
          <span>দালাল ও ভুয়া এজেন্সির স্ক্যাম সতর্কতা</span>
        </div>
        <p className="text-sm text-red-100 leading-relaxed bg-red-900/30 p-3.5 rounded-xl border border-red-800/50">
          {problem.scam_warnings}
        </p>
        <p className="text-xs text-red-300/80 italic">
          * কোনো ব্যক্তি যদি দাবি করে সে সরকারি পেমেন্ট ছাড়া ব্যক্তিগতভাবে আপনার ইকামা/হিসাব ঠিক করে দেবে, তবে অবিলম্বে বিরত থাকুন।
        </p>
      </div>

      {/* WhatsApp Lead Button & LeadModal Trigger */}
      <div className="bg-gradient-to-br from-saudi-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-3xl border border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-800">
            <UserCheck className="w-3.5 h-3.5" />
            <span>ভেরিফাইড বিশেষজ্ঞ সহায়তা</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            নিজে করতে সমস্যা হচ্ছে? বিশেষজ্ঞের পরামর্শ নিন
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            আমাদের নিবন্ধিত সৌদি অংশীদার ও লিগ্যাল টিম আপনার মামলার কাগজপত্র পর্যালোচনা করবে। সম্পূর্ণ নিরাপদ ও নির্ভরযোগ্য।
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsLeadModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-saudi-600 to-emerald-600 hover:from-saudi-500 hover:to-emerald-500 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg transition active:scale-95 text-sm"
          >
            <span>পরামর্শের অনুরোধ পাঠান</span>
          </button>

          <a
            href={getDirectWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-3.5 rounded-2xl shadow-lg transition active:scale-95 text-sm"
          >
            <MessageSquare className="w-4 h-4" />
            <span>সরাসরি হোয়াটসঅ্যাপ</span>
          </a>
        </div>
      </div>

      {/* Related Problems in same category */}
      {relatedProblems.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-bold text-white">একই ক্যাটাগরির আরও দরকারি সমাধান</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedProblems.map((rel) => (
              <Link
                key={rel.slug}
                href={`/services/${rel.slug}`}
                className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold text-white hover:text-emerald-300 transition line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2">
                    {rel.summary}
                  </p>
                </div>
                <div className="flex items-center text-xs text-emerald-400 font-semibold mt-4">
                  <span>পড়ুন</span> <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lead Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        defaultCategory={problem.b2b_service_category || "Legal Aid"}
        serviceTitle={problem.title}
        serviceSlug={problem.slug}
      />
    </div>
  );
}
