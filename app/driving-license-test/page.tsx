"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Car,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  Award,
  ChevronRight,
  ShieldCheck,
  PhoneCall,
  Share2,
  Sparkles,
  HelpCircle
} from "lucide-react";

interface Question {
  id: number;
  question: string;
  arabic_term?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "সৌদি আরবে গোলচত্বর (Roundabout / دَوَّار)-এ প্রবেশের ক্ষেত্রে অগ্রাধিকার (Priority) কার?",
    arabic_term: "حق الأولوية في الدوار",
    options: [
      "যে গাড়িটি গোলচত্বরে নতুন প্রবেশ করছে তার",
      "যে গাড়িটি ইতোমধ্যে গোলচত্বরের ভেতরে ঘুরছে তার",
      "যে গাড়িটি দ্রুত গতিতে আসছে তার",
      "যেকোনো বড় গাড়ির"
    ],
    correctAnswer: 1,
    explanation: "সৌদি ট্রাফিক আইন অনুসারে, গোলচত্বরের (Dawwar) ভেতরে থাকা গাড়ির অগ্রাধিকার সবার আগে। ভেতরে গাড়ি থাকলে বাইরে থেকে থামতে হবে।"
  },
  {
    id: 2,
    question: "সাহের (Saher) ক্যামেরায় ট্রাফিক সিগন্যালে লাল বাতি (Red Light) অমান্য করার সরকারি জরিমানা কত?",
    arabic_term: "قطع الإشارة الحمراء",
    options: [
      "৫০০ থেকে ১,০০০ রিয়াল",
      "১,৫০০ থেকে ২,০০০ রিয়াল",
      "৩,০০০ থেকে ৬,০০০ রিয়াল",
      "১০,০০০ রিয়াল"
    ],
    correctAnswer: 2,
    explanation: "লাল বাতি অতিক্রম করলে স্বয়ংক্রিয় সাহের ক্যামেরায় ৩,০০০ থেকে ৬,০০০ সৌদি রিয়াল পর্যন্ত জরিমানা ও ট্রাফিক ব্ল্যাক পয়েন্ট যুক্ত হয়।"
  },
  {
    id: 3,
    question: "সড়কে সাধারণ গাড়ি এক্সিডেন্ট হলে উভয় গাড়ির ভ্যালিড ইন্স্যুরেন্স থাকলে কোন নম্বরে কল করতে হবে?",
    arabic_term: "نجم لخدمات التأمين",
    options: [
      "পুলিশ ৯৯৯",
      "নাজম ৯২০০১৪৪৪৪ (Najm 920014444 বা Najm App)",
      "অ্যাম্বুলেন্স ৯৯৭",
      "সিভিল ডিফেন্স ৯৯৮"
    ],
    correctAnswer: 1,
    explanation: "যদি কোনো ব্যক্তি আহত বা নিহত না হয় এবং গাড়ির ইন্স্যুরেন্স থাকে, তবে সরাসরি নাজম (Najm)-এ কল করতে হবে।"
  },
  {
    id: 4,
    question: "গাড়ি চালানোর সময় হাতে মোবাইল ফোন ব্যবহার বা স্ক্রলিং করার জরিমানা কত?",
    arabic_term: "استخدام الهاتف المحمول أثناء القيادة",
    options: [
      "১০০ থেকে ২০০ রিয়াল",
      "৫০০ থেকে ৯০০ রিয়াল",
      "২,০০০ রিয়াল",
      "কোনো জরিমানা নেই"
    ],
    correctAnswer: 1,
    explanation: "হাতে মোবাইল ফোন ধরা বা ব্যবহার করলে আধুনিক এআই সাহের ক্যামেরায় ৫০০ থেকে ৯০০ রিয়াল জরিমানা ধার্য হয়।"
  },
  {
    id: 5,
    question: "ত্রিকোণাকার লাল বর্ডারযুক্ত ট্রাফিক সাইন (Triangle Sign) কী নির্দেশ করে?",
    arabic_term: "الإشارات التحذيرية",
    options: [
      "বাধ্যতামূলক নির্দেশ",
      "সতর্কতামূলক সংকেত (Warning Sign)",
      "তথ্যমূলক সংকেত",
      "রাস্তা বন্ধ"
    ],
    correctAnswer: 1,
    explanation: "ত্রিভুজাকৃতির লাল বর্ডারযুক্ত সকল সাইন হলো সতর্কতামূলক (Warning Sign), যেমন: সামনে গতি কমান, বাঁক বা পথচারী ক্রসিং।"
  },
  {
    id: 6,
    question: "অষ্টভুজ (Octagon) লাল রঙের সাইন যার ভেতর 'قف' বা 'STOP' লেখা থাকে, এর নিয়ম কী?",
    arabic_term: "إشارة قف (STOP)",
    options: [
      "শুধু গতি কমিয়ে দেখে যাওয়া",
      "গাড়ি সম্পূর্ণভাবে থামানো বাধ্যতামূলক (Full Stop)",
      "হর্ন দিয়ে দ্রুত চলে যাওয়া",
      "শুধু ডান দিকে যাওয়া"
    ],
    correctAnswer: 1,
    explanation: "STOP সাইনের সামনে রাস্তা সম্পূর্ণ ফাঁকা থাকলেও অন্তত ২-৩ সেকেন্ডের জন্য গাড়ি সম্পূর্ণ থামানো (Full Stop) বাধ্যতামূলক।"
  },
  {
    id: 7,
    question: "হাইওয়েতে অন্য গাড়িকে ওভারটেক (Overtake) করার সঠিক নিয়ম কোনটি?",
    arabic_term: "التجاوز النظامي",
    options: [
      "শুধুমাত্র বাম পাশ দিয়ে (Left Side)",
      "যেকোনো ফাঁকা পাশ দিয়ে",
      "ডান পাশের ইমার্জেন্সি লেন দিয়ে",
      "উভয় পাশ দিয়ে"
    ],
    correctAnswer: 0,
    explanation: "সৌদি আরবে ট্রাফিক নিয়ম অনুযায়ী ডান পাশ দিয়ে বা শোল্ডার লেন দিয়ে ওভারটেক করা মারাত্মক লঙ্ঘন ও জরিমানাযোগ্য অপরাধ।"
  },
  {
    id: 8,
    question: "গাড়ির পেছনের সাইডভিউ মিরর ও রিয়ারভিউ মিররে না দেখা যাওয়া অংশকে কী বলা হয়?",
    arabic_term: "النقطة العمياء (Blind Spot)",
    options: [
      "সেফ জোন",
      "ব্লাইন্ড স্পট (Blind Spot)",
      "ডেড জোন",
      "ক্লিয়ার জোন"
    ],
    correctAnswer: 1,
    explanation: "আয়নায় যে কোণ দেখা যায় না তাকে ব্লাইন্ড স্পট বলে। লেন পরিবর্তনের আগে হালকা ঘাড় ঘুরিয়ে শোল্ডার চেক করা বাধ্যতামূলক।"
  },
  {
    id: 9,
    question: "জরুরি সেবার গাড়ি (যেমন: অ্যাম্বুলেন্স বা ফায়ার সার্ভিস সাইরেন বাজিয়ে এলে) চালকের করণীয় কী?",
    arabic_term: "مركبات الطوارئ",
    options: [
      "গতি বাড়িয়ে তাদের আগে চলে যাওয়া",
      "অবিলম্বে ডান লেনে সরে গিয়ে পথ ছেড়ে দেওয়া",
      "মাঝের লেনে গাড়ি থামিয়ে দেওয়া",
      "হর্ন বাজানো"
    ],
    correctAnswer: 1,
    explanation: "জরুরি সার্ভিসের গাড়ি দেখলে অবিলম্বে ডান লেনে সরে গিয়ে রাস্তা ফাঁকা করে দিতে হবে। বাধা দিলে ১০০০-২০০০ রিয়াল জরিমানা।"
  },
  {
    id: 10,
    question: "সড়কের মাঝে আঁকা 'হলুদ অবিচ্ছিন্ন লাইন' (Solid Yellow Line)-এর অর্থ কী?",
    arabic_term: "خط أصفر متصل",
    options: [
      "ওভারটেক বা লেন পরিবর্তন সম্পূর্ণ নিষেধ",
      "ইচ্ছেমতো ওভারটেক করা যাবে",
      "গতি বাড়ানোর লাইন",
      "পার্কিং করার স্থান"
    ],
    correctAnswer: 0,
    explanation: "অবিচ্ছিন্ন (Solid) লাইন থাকলে তা অতিক্রম করা বা তার ওপর দিয়ে লেন পরিবর্তন করা আইনত সম্পূর্ণ নিষিদ্ধ।"
  },
  {
    id: 11,
    question: "গাড়িতে চালক ও যাত্রীদের সিটবেল্ট না বাঁধার সরকারি জরিমানা কত?",
    arabic_term: "عدم ربط حزام الأمان",
    options: [
      "৫০ রিয়াল",
      "১৫০ থেকে ৩০০ রিয়াল",
      "১,০০০ রিয়াল",
      "৫,০০০ রিয়াল"
    ],
    correctAnswer: 1,
    explanation: "সামনের বা পেছনের কোনো যাত্রী সিটবেল্ট না বাঁধলে ১৫০ থেকে ৩০০ রিয়াল পর্যন্ত সাহের ফাইন আসে।"
  },
  {
    id: 12,
    question: "রোড এক্সিডেন্টে কোনো পক্ষ যদি আহত হয় বা কারও ইন্স্যুরেন্স না থাকে, তখন কাকে ডাকতে হবে?",
    arabic_term: "مرور (Traffic Police)",
    options: [
      "মুরুুর / ট্রাফিক পুলিশ (৯৯৩) ও অ্যাম্বুলেন্স (৯৯৭)",
      "জাওয়াযাত",
      "নাজম",
      "বলদিয়া"
    ],
    correctAnswer: 0,
    explanation: "যদি কোনো ব্যক্তি আহত বা নিহত হন অথবা কারও ইন্স্যুরেন্স না থাকে, তাহলে নাজম কেস নেবে না, সরাসরি ট্রাফিক পুলিশ (৯৯৩) আসবে।"
  },
];

export default function DrivingLicenseTestPage() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIdx]: optionIdx,
    }));
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const calculateScore = () => {
    let sc = 0;
    QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) {
        sc += 1;
      }
    });
    setScore(sc);
    setIsSubmitted(true);
  };

  const restartTest = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setScore(0);
  };

  const currentQ = QUESTIONS[currentIdx];
  const answeredCount = Object.keys(selectedAnswers).length;
  const isPass = score >= Math.ceil(QUESTIONS.length * 0.75); // 75%+ pass mark

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-600/50 px-3.5 py-1.5 rounded-full text-xs font-bold text-emerald-300">
          <Car className="w-3.5 h-3.5 text-emerald-400" />
          <span>সৌদি দাল্লাহ (Dallah) স্কুল কম্পিউটার টেস্ট সিমুলেটর</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          সৌদি ড্রাইভিং লাইসেন্স <span className="text-emerald-400">কম্পিউটার টেস্ট প্র্যাকটিস</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300">
          দাল্লাহ ও মুরুুরের অফিসিয়াল ট্রাফিক সাইন, সাহের ক্যামেরা জরিমানা ও রোড রুলস সম্পর্কিত প্রশ্নোত্তরে নিজের প্রস্তুতি যাচাই করুন।
        </p>
      </div>

      {/* Test Interface or Scorecard */}
      {!isSubmitted ? (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>প্রশ্ন {currentIdx + 1} / {QUESTIONS.length}</span>
              <span>উত্তর দেওয়া হয়েছে: {answeredCount}/{QUESTIONS.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-3 pt-2">
            {currentQ.arabic_term && (
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800/60 inline-block" dir="rtl">
                {currentQ.arabic_term}
              </span>
            )}
            <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
              {currentIdx + 1}. {currentQ.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, oIdx) => {
              const isSelected = selectedAnswers[currentIdx] === oIdx;
              return (
                <button
                  key={oIdx}
                  type="button"
                  onClick={() => handleSelect(oIdx)}
                  className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between text-sm ${
                    isSelected
                      ? "bg-emerald-950/90 border-emerald-400 ring-2 ring-emerald-400/80 text-white font-bold shadow-lg"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300 hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected
                          ? "bg-emerald-500 text-slate-950"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span>{option}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition ${
                currentIdx === 0
                  ? "opacity-40 cursor-not-allowed border-slate-800 text-slate-600"
                  : "bg-slate-900 border-slate-700 text-slate-300 hover:text-white"
              }`}
            >
              ← আগের প্রশ্ন
            </button>

            {currentIdx < QUESTIONS.length - 1 ? (
              <button
                type="button"
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center"
              >
                <span>পরের প্রশ্ন</span>
                <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            ) : (
              <button
                type="button"
                onClick={calculateScore}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black shadow-lg transition"
              >
                ফলাফল দেখুন ✓
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Scorecard */
        <div className="space-y-6">
          <div className={`p-8 rounded-3xl border-2 text-center space-y-4 shadow-2xl ${
            isPass
              ? "bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border-emerald-500 shadow-emerald-950/60"
              : "bg-gradient-to-br from-slate-900 via-rose-950 to-slate-900 border-red-500 shadow-red-950/60"
          }`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-white shadow-xl ${
              isPass ? "bg-emerald-600" : "bg-red-600"
            }`}>
              {isPass ? <Award className="w-9 h-9" /> : <AlertTriangle className="w-9 h-9" />}
            </div>

            <div className="space-y-1">
              <span className={`text-xs font-bold uppercase tracking-widest ${isPass ? "text-emerald-400" : "text-red-400"}`}>
                {isPass ? "অভিনন্দন! আপনি উত্তীর্ণ হয়েছেন" : "আরও অনুশীলন প্রয়োজন"}
              </span>
              <h2 className="text-3xl font-black text-white">
                আপনার স্কোর: {score} / {QUESTIONS.length}
              </h2>
              <p className="text-xs text-slate-300">
                পাস মার্ক: ৭৫% (কমপক্ষে ৯টি সঠিক উত্তর)। সৌদি দাল্লাহ স্কুলে পরীক্ষায় পাসের জন্য ট্রাফিক সাইন ও সাহের রুলস ভালো করে মনে রাখুন।
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-3">
              <button
                type="button"
                onClick={restartTest}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center transition"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                <span>পুনরায় পরীক্ষা দিন</span>
              </button>
              <Link
                href="/services/dallah-driving-license-test-process"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center transition shadow"
              >
                <span>দাল্লাহ লাইসেন্স সম্পূর্ণ গাইড</span>
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">প্রশ্নের সঠিক উত্তর ও ব্যাখ্যা পর্যালোচনা:</h3>
            <div className="space-y-3">
              {QUESTIONS.map((q, qIndex) => {
                const userAnswer = selectedAnswers[qIndex];
                const isCorrect = userAnswer === q.correctAnswer;
                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border text-xs space-y-2 ${
                      isCorrect
                        ? "bg-slate-900/60 border-emerald-500/40"
                        : "bg-slate-900/60 border-red-500/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-white text-sm">
                        {qIndex + 1}. {q.question}
                      </div>
                      <span className={`shrink-0 font-bold px-2 py-0.5 rounded text-[10px] ${
                        isCorrect ? "bg-emerald-950 text-emerald-300 border border-emerald-800" : "bg-red-950 text-red-300 border border-red-800"
                      }`}>
                        {isCorrect ? "✓ সঠিক" : "✕ ভুল"}
                      </span>
                    </div>

                    <div className="text-slate-300 space-y-1">
                      <div>
                        <span className="text-slate-500">আপনার উত্তর: </span>
                        <span className={isCorrect ? "text-emerald-400 font-bold" : "text-red-400 font-bold"}>
                          {userAnswer !== undefined ? q.options[userAnswer] : "উত্তর দেওয়া হয়নি"}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div>
                          <span className="text-slate-500">সঠিক উত্তর: </span>
                          <span className="text-emerald-400 font-bold">{q.options[q.correctAnswer]}</span>
                        </div>
                      )}
                    </div>

                    <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 text-slate-400 text-[11px] leading-relaxed">
                      💡 <strong>ব্যাখ্যা:</strong> {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
