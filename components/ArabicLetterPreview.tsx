"use client";

import React, { useState } from "react";
import { Printer, Copy, Check, Download, Share2, FileCheck } from "lucide-react";

interface ArabicLetterPreviewProps {
  letterType: string;
  letterTitle: string;
  arabicContent: string;
  workerName: string;
  iqamaNumber: string;
  passportNumber: string;
  companyName: string;
  dateStr: string;
}

export default function ArabicLetterPreview({
  letterType,
  letterTitle,
  arabicContent,
  workerName,
  iqamaNumber,
  passportNumber,
  companyName,
  dateStr,
}: ArabicLetterPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(arabicContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([arabicContent], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = `${letterType}_arabic_letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="w-full space-y-4">
      {/* Top Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 border border-slate-800 p-3 rounded-2xl no-print">
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">{letterTitle}</span>
          <span className="text-slate-500">|</span>
          <span className="text-emerald-400">মক্তব আমল ও আদালতের জন্য অফিশিয়াল ফরম্যাট</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium transition"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">কপি হয়েছে</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>আরবি টেক্সট কপি</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-xl text-xs font-medium transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>ফাইল সেভ</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>প্রিন্ট / PDF ডাউনলোড</span>
          </button>
        </div>
      </div>

      {/* Official A4 Sheet Preview Container */}
      <div
        dir="rtl"
        className="print-container bg-white text-slate-900 rounded-2xl p-8 sm:p-12 shadow-2xl border border-slate-300/60 max-w-3xl mx-auto font-serif leading-relaxed text-right min-h-[700px] flex flex-col justify-between"
      >
        {/* Letterhead */}
        <div>
          <div className="text-center pb-6 border-b-2 border-emerald-900">
            <p className="text-base font-bold text-emerald-900 mb-1">المملكة العربية السعودية</p>
            <p className="text-sm font-semibold text-slate-700">وزارة الموارد البشرية والتنمية الاجتماعية</p>
            <p className="text-xs text-slate-500 mt-1">وثيقة رسمية موجهة للجهات المعنية / مكتب العمل</p>
            <p className="text-xs text-slate-500 mt-0.5">التاريخ: {dateStr || new Date().toISOString().split("T")[0]}م</p>
          </div>

          <div className="text-center my-6">
            <span className="text-sm font-bold text-slate-800 tracking-wider">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </span>
          </div>

          {/* Letter Body */}
          <div className="text-slate-800 text-sm sm:text-base space-y-4 whitespace-pre-line text-justify leading-loose">
            {arabicContent}
          </div>
        </div>

        {/* Footer Signature Block */}
        <div className="pt-10 mt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs text-slate-700">
          <div>
            <p className="font-bold text-slate-900">مقدم الطلب / العامل:</p>
            <p className="mt-1">الاسم: {workerName || "............................"}</p>
            <p>رقم الإقامة: {iqamaNumber || "............................"}</p>
            <p>رقم الجواز: {passportNumber || "............................"}</p>
            <p className="mt-4">التوقيع: ............................</p>
          </div>

          <div className="text-left" dir="ltr">
            <div className="w-24 h-24 border border-dashed border-slate-400 rounded-lg flex items-center justify-center text-[10px] text-slate-400 ml-auto">
              بصمة الإبهام<br/>(Fingerprint)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
