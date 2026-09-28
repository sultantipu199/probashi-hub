import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Clock,
  Banknote,
  ExternalLink,
  ChevronRight,
  Layers,
  Sparkles
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import problemsData from "@/data/problems.json";

interface CategoryPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    id: String(cat.id),
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categoryId = parseInt(params.id, 10);
  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    return {
      title: "ক্যাটাগরি পাওয়া যায়নি | Probashi Hub",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app";

  return {
    title: `${category.name} (${category.en}) সেবা সমূহ | Probashi Hub`,
    description: `সৌদি আরবে ${category.name}-এর সরকারি সমাধান, আইনি নির্দেশিকা ও প্রয়োজনীয় নথিপত্র। ${category.description}`,
    alternates: {
      canonical: `${appUrl}/categories/${category.id}`,
    },
    openGraph: {
      title: `${category.name} | Probashi Hub KSA`,
      description: category.description,
      url: `${appUrl}/categories/${category.id}`,
    },
  };
}

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const categoryId = parseInt(params.id, 10);
  const category = CATEGORIES.find((c) => c.id === categoryId);

  if (!category) {
    notFound();
  }

  const categoryProblems = problemsData.filter((p) => p.category_id === categoryId);
  const Icon = category.icon;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: `${category.name} (${category.en}) - Probashi Hub`,
        description: category.description,
        url: `${appUrl}/categories/${category.id}`,
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: categoryProblems.length,
          itemListElement: categoryProblems.map((p, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            url: `${appUrl}/services/${p.slug}`,
            name: p.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "হোম",
            item: appUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "ক্যাটাগরি",
            item: `${appUrl}/#categories`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: category.name,
            item: `${appUrl}/categories/${category.id}`,
          },
        ],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-emerald-400 transition">
          হোম
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <Link href="/#categories" className="hover:text-emerald-400 transition">
          ক্যাটাগরি
        </Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-emerald-300 font-semibold">{category.name}</span>
      </nav>

      {/* Category Header Hero */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-slate-900 via-emerald-950/80 to-slate-900 border-2 border-emerald-500/40 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-tr ${category.color} text-white shadow-xl shrink-0`}>
              <Icon className="w-8 h-8" />
            </div>
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-700/50">
                  বিভাগ #{category.id}
                </span>
                <span className="text-xs text-slate-400">
                  {categoryProblems.length} টি সরকারি সমাধান অন্তর্ভুক্ত
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {category.name}
              </h1>
              <p className="text-sm sm:text-base text-emerald-200 font-medium">
                {category.en}
              </p>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl pt-1 leading-relaxed">
                {category.description}
              </p>
            </div>
          </div>

          <div className="shrink-0 flex items-center space-x-3 w-full md:w-auto">
            <Link
              href="/"
              className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-white transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>সকল ক্যাটাগরি</span>
            </Link>
            <Link
              href="/urgent-sos"
              className="flex-1 md:flex-none inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-black text-white shadow-lg transition"
            >
              <ShieldAlert className="w-4 h-4" />
              <span>জরুরি SOS</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Services List for this Category */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
            <span>এই বিভাগের সেবা ও সমাধান সমূহ</span>
            <span className="text-xs font-black bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full">
              {categoryProblems.length}
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {categoryProblems.map((prob) => (
            <Link
              key={prob.slug}
              href={`/services/${prob.slug}`}
              className="glass-panel p-6 rounded-3xl border border-slate-800 hover:border-emerald-500 transition group flex flex-col justify-between shadow-xl hover:shadow-emerald-950/40 relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-800/40">
                    🏛️ {prob.official_portal}
                  </span>
                  {prob.urgent && (
                    <span className="text-[10px] font-black text-red-200 bg-red-950 px-2 py-0.5 rounded-md border border-red-800 animate-pulse">
                      জরুরি সমাধান
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition leading-snug">
                  {prob.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium">
                  {prob.title_en}
                </p>

                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {prob.summary}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-slate-400">
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                    <span className="block text-slate-500 text-[10px] font-semibold">প্রসেসিং সময়:</span>
                    <span className="text-slate-300 font-medium flex items-center mt-0.5">
                      <Clock className="w-3 h-3 mr-1 text-emerald-400 inline" />
                      {prob.processing_time}
                    </span>
                  </div>
                  <div className="bg-slate-900/80 p-2 rounded-xl border border-slate-800">
                    <span className="block text-slate-500 text-[10px] font-semibold">সরকারি ফি:</span>
                    <span className="text-slate-300 font-medium line-clamp-1 mt-0.5">
                      💳 {prob.official_fees_sar}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-emerald-400 font-bold group-hover:underline flex items-center">
                  সম্পূর্ণ ধাপে ধাপে গাইড দেখুন
                  <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition" />
                </span>
                <span className="text-[11px] text-slate-500">
                  {prob.steps.length}টি ধাপ
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Navigation to Other Categories */}
      <section className="pt-8 border-t border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">অন্যান্য সেবা ক্যাটাগরি সমূহ</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          {CATEGORIES.filter((c) => c.id !== categoryId).map((otherCat) => {
            const OtherIcon = otherCat.icon;
            return (
              <Link
                key={otherCat.id}
                href={`/categories/${otherCat.id}`}
                className="p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-left transition flex items-center space-x-2.5 group"
              >
                <div className={`p-1.5 rounded-lg bg-gradient-to-tr ${otherCat.color} text-white shadow shrink-0`}>
                  <OtherIcon className="w-3.5 h-3.5" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition truncate">
                    {otherCat.name}
                  </div>
                  <div className="text-[9px] text-slate-400 truncate">{otherCat.en}</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
