"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Sparkles, Printer, Copy, Check, FileCheck, Info } from "lucide-react";
import ArabicLetterPreview from "@/components/ArabicLetterPreview";

const LETTER_TEMPLATES = [
  {
    id: "transfer_request",
    title: "কাফালা রিলিজ ও অনাপত্তি আবেদন (طلب نقل الكفالة والتنازل)",
    subject_ar: "الموضوع: طلب نقل خدمات (كفالة) والموافقة على إصدار التنازل",
    generateBody: (d: any) => `إلى سعادة المدير العام المحترم / كفيلي المحترم،
السلام عليكم ورحمة الله وبركاته،،،

الموضوع: طلب نقل خدمات وموافقة على نقل الكفالة

أتقدم إلى سعادتكم أنا العامل الموضح بياناتي أدناه، بطلب التكرم بالموافقة على نقل خدماتي (كفالتي) إلى صاحب عمل آخر، وذلك لظروف شخصية ومهنية خاصة، راجياً من كرمكم التكرم بالموافقة الإلكترونية عبر منصة (قوى Qiwa) وإصدار خطاب عدم ممانعة.

أفيد سعادتكم بأني سأقوم بتسليم كافة العهد والمهام الموكلة إلي وتصفية كافة الالتزامات المالية والمهنية المعلقة بيننا وفقاً للمتبع نظاماً وبما يرضي الله.

شاكراً ومقدراً لكم حسن تعاونكم وطيب المعاملة طوال فترة عملي معكم.

وتقبلوا خالص الشكر والتقدير والاحترام،،،`,
  },
  {
    id: "salary_complaint",
    title: "মক্তব আমলে বকেয়া বেতনের অভিযোগ (شكوى تأخر صرف الرواتب لمكتب العمل)",
    subject_ar: "الموضوع: شكوى عمالية رسمية بشأن تأخر صرف الرواتب الشهرية لأكثر من ۳ أشهر",
    generateBody: (d: any) => `إلى سعادة مدير إدارة التسوية الودية / مكتب العمل المحترم،
السلام عليكم ورحمة الله وبركاته،،،

الموضوع: شكوى رسمية بشأن تأخر صرف الأجور الشهرية وفقاً لنظام العمل السعودي

أتقدم لسيادتكم أنا العامل المقيم الموضحة بياناتي أدناه، بشكوى ضد المنشأة / الكفيل: (${d.companyName || "اسم المنشأة"})، حيث أفيدكم بأنه لم يتم صرف رواتبي الشهرية بانتظام، ويوجد تأخير لأكثر من ثلاثة أشهر متتالية حتى تاريخ هذا الخطاب، مما يخالف صريح المادة التسعين (90) من نظام العمل وبرنامج حماية الأجور (WPS).

وعليه، وبناءً على التوجيهات الوزارية والقرارات المنظمة لنقل الخدمات بدون موافقة صاحب العمل في حال تأخر الأجور، أطلب من سعادتكم الآتي:
1. إلزام المنشأة بصرف كافة مستحقاتي ورواتبي المتأخرة بالكامل.
2. تمكيني من نقل خدماتي إلى صاحب عمل جديد دون الرجوع للكفيل الحالي وفقاً للائحة التنفيذية.

مرفق لسعادتكم كشف الحساب البنكي وصورة من عقد العمل الموثق عبر منصة قوى.

وتقبلوا وافر التحية والتقدير،،،`,
  },
  {
    id: "passport_recovery",
    title: "আটকে রাখা পাসপোর্ট ফেরত পাওয়ার আবেদন (طلب استرداد جواز السفر المحتجز)",
    subject_ar: "الموضوع: طلب رسمي لاستلام أصل وثيقة السفر (جواز السفر)",
    generateBody: (d: any) => `إلى إدارة المنشأة / الكفيل المحترم (${d.companyName || "اسم الكفيل"})،
السلام عليكم ورحمة الله وبركاته،،،

الموضوع: طلب استلام أصل جواز السفر المحتجز

أحيطكم علماً بأني العامل المقيم لديكم بموجب رخصة الإقامة رقم (${d.iqamaNumber || "................"}). وحيث أن جواز السفر هو وثيقة شخصية رسمية تصدر من حكومة بلدي، واستناداً إلى المرسوم الملكي وقرار مجلس الوزراء الموقر رقم (166) والتعاميم الصادرة من وزارة الموارد البشرية والتنمية الاجتماعية التي تمنع وتجرم احتجاز جواز سفر العامل لدى صاحب العمل تحت أي مبرر:

فإني أرجو من سعادتكم التكرم بتسليمي أصل جواز سفري فور استلام هذا الخطاب، وذلك لإنهاء بعض الإجراءات الشخصية والقنصلية الهامة.

وفي حال الامتناع، سأضطر آسفاً لمخاطبة الجهات المعنية ومكتب العمل لحفظ حقوقي النظامية.

وتقبلوا فائق الاحترام والتقدير،،،`,
  },
  {
    id: "resignation_gratuity",
    title: "পদত্যাগপত্র ও গ্র্যাচুইটি দাবি (إشعار استقالة رسمية وتصفية المستحقات المادة 84)",
    subject_ar: "الموضوع: إشعار رسمي بإنهاء علاقة العمل بالاستقالة والمطالبة بمكافأة نهاية الخدمة",
    generateBody: (d: any) => `إلى إدارة الشركة / الكفيل المحترم،
السلام عليكم ورحمة الله وبركاته،،،

الموضوع: إشعار استقالة نظامية وتصفية مستحقات نهاية الخدمة وفقاً للمادتين (84 و 85)

أتقدم لسعادتكم بهذا الإشعار الرسمي برغبتي في إنهاء علاقة العمل بيننا بالاستقالة، وذلك اعتباراً من تاريخ اليوم مع الالتزام بفترة الإشعار النظامية المحددة في العقد الإلكتروني (منصة قوى).

وأطلب من إدارتكم الموقرة التكرم بإعداد المخالصة المالية النهائية وحساب مكافأة نهاية الخدمة المستحقة لي بموجب المادة (84) والمادة (85) من نظام العمل السعودي، بالإضافة إلى مقابل رصيد الإجازات السنوية غير المستخدمة وأي رواتب معلقة.

أشكركم على كل ما لقيته من تعاون خلال فترة عملي في المنشأة، وأتمنى لكم وللمنشأة دوام التقدم والازدهار.

وتفضلوا بقبول وافر الشكر والتقدير والاحترام،،،`,
  },
];

export default function ArabicLetterGeneratorPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState("transfer_request");
  const [workerName, setWorkerName] = useState("");
  const [iqamaNumber, setIqamaNumber] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateStr, setDateStr] = useState(new Date().toISOString().split("T")[0]);

  const activeTemplate = useMemo(() => {
    return LETTER_TEMPLATES.find((t) => t.id === selectedTemplateId) || LETTER_TEMPLATES[0];
  }, [selectedTemplateId]);

  const fullArabicText = useMemo(() => {
    const header = `${activeTemplate.subject_ar}\n\n`;
    const body = activeTemplate.generateBody({
      workerName,
      iqamaNumber,
      passportNumber,
      companyName,
      phoneNumber,
      dateStr,
    });
    return `${header}${body}`;
  }, [activeTemplate, workerName, iqamaNumber, passportNumber, companyName, phoneNumber, dateStr]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between no-print">
        <Link
          href="/"
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>হোম পেজে ফিরুন</span>
        </Link>
        <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800 px-3 py-1 rounded-full">
          সৌদি ফরমাল লিগ্যাল লেটার মেকার
        </span>
      </div>

      {/* Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-3 no-print">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-saudi-800 text-emerald-300 flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              আরবি দরখাস্ত জেনারেটর (Maktab Amal & Kafala Letters)
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              মক্তব আমল, পুলিশ প্রশাসন বা কফিলের জন্য সৌদি আইনসিদ্ধ বিশুদ্ধ আরবিতে আনুষ্ঠানিক আবেদনপত্র তৈরি করুন
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5 space-y-5 no-print">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-400" />
              দরখাস্তের ধরন ও তথ্য পূরণ করুন
            </h2>

            {/* Template Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                আবেদনের বিষয় (Letter Type)
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
              >
                {LETTER_TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Worker Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                আপনার নাম (পাসপোর্ট/ইকামা অনুযায়ী ইংরেজি বা আরবি)
              </label>
              <input
                type="text"
                value={workerName}
                onChange={(e) => setWorkerName(e.target.value)}
                placeholder="যেমন: MD SOHEL RANA"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Iqama & Passport */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  ১০ ডিজিট ইকামা নম্বর
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={iqamaNumber}
                  onChange={(e) => setIqamaNumber(e.target.value)}
                  placeholder="2XXXXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  পাসপোর্ট নম্বর
                </label>
                <input
                  type="text"
                  value={passportNumber}
                  onChange={(e) => setPassportNumber(e.target.value)}
                  placeholder="A0XXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Company / Sponsor Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                কফিল বা কোম্পানির নাম (Sponsor Name)
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="যেমন: مؤسسة الوفاق للمقاولات"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Phone & Date */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="05XXXXXXXX"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  আবেদনের তারিখ
                </label>
                <input
                  type="date"
                  value={dateStr}
                  onChange={(e) => setDateStr(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="p-3 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-xs text-emerald-300 flex items-start space-x-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                ডানপাশে স্বয়ংক্রিয়ভাবে তৈরি হওয়া আরবি দরখাস্তটি প্রিন্ট করে নিচে স্বাক্ষর ও আঙুলের ছাপ দিয়ে কফিল বা মক্তব আমলে জমা দিন।
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Printable Document Preview */}
        <div className="lg:col-span-7">
          <ArabicLetterPreview
            letterType={selectedTemplateId}
            letterTitle={activeTemplate.title}
            arabicContent={fullArabicText}
            workerName={workerName}
            iqamaNumber={iqamaNumber}
            passportNumber={passportNumber}
            companyName={companyName}
            dateStr={dateStr}
          />
        </div>
      </div>
    </div>
  );
}
