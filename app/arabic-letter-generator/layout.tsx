import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সৌদি আরবি দরখাস্ত ও আইনি চিঠি জেনারেটর | কাফালা, বকেয়া বেতন ও ছুটি",
  description:
    "মক্তব আমল, কিওয়া ও জাওয়াজাতের জন্য শুদ্ধ ফরমাল আরবি দরখাস্ত ও অভিযোগপত্র তৈরি করুন। কাফালা ছাড়পত্র, বেতন বকেয়া নালিশ ও ছুটির আবেদন এক ক্লিকে প্রিন্ট-রেডি।",
  keywords: [
    "Arabic Letter Generator",
    "আরবি দরখাস্ত লেখার নিয়ম",
    "মক্তব আমল দরখাস্ত",
    "কাফালা রিলিজ আরবি চিঠি",
    "বকেয়া বেতন অভিযোগ আরবি",
    "Saudi Legal Arabic Letter",
    "خطاب نقل كفالة",
  ],
  alternates: {
    canonical: "https://probashi-hub.vercel.app/arabic-letter-generator",
  },
  openGraph: {
    title: "সৌদি আরবি দরখাস্ত ও আইনি চিঠি জেনারেটর | Probashi Hub",
    description:
      "কফিল, কোম্পানি ও শ্রম আদালতের জন্য অফিশিয়াল আরবি দরখাস্ত নিমেষেই প্রস্তুত ও প্রিন্ট করার ডিজিটাল টুল।",
    url: "https://probashi-hub.vercel.app/arabic-letter-generator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saudi Official Arabic Legal Letter Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সৌদি আরবি দরখাস্ত ও আইনি চিঠি জেনারেটর",
    description:
      "কাফালা, বেতন ও ছুটির ফরমাল আরবি আবেদন এক ক্লিকে প্রিন্ট ও কপি করুন।",
    images: ["/og-image.png"],
  },
};

export default function ArabicLetterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "সৌদি আরবি দরখাস্ত ও আইনি চিঠি জেনারেটর (Arabic Legal Letter Generator)",
        "url": "https://probashi-hub.vercel.app/arabic-letter-generator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "Generates formal Arabic legal letters and petitions for Saudi Labor Office, Qiwa, Jawazat, and sponsors.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "SAR"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "মক্তব আমলে বকেয়া বেতনের জন্য আরবি দরখাস্ত কীভাবে পেশ করতে হয়?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "শ্রমিককে তার ইকামা ও বকেয়া মাসের বিবরণসহ সৌদি শ্রম আইনের ধারা ৯০ এবং মজুরি সুরক্ষা ব্যবস্থা (WPS) উল্লেখপূর্বক 'تسوية ودية' (সৌহার্দ্যপূর্ণ নিষ্পত্তি) বিভাগে চিঠি জমা দিতে হয়।"
            }
          },
          {
            "@type": "Question",
            "name": "কাফালা বা স্পনসরশিপ পরিবর্তনের অনাপত্তি (NOC) চিঠির ফরম্যাট কী?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "বর্তমান কফিলের নাম ও প্রতিষ্ঠানের বিবরণসহ কিওয়া (Qiwa) প্ল্যাটফর্মে ইলেক্ট্রনিক সম্মতির অনুরোধ সম্বলিত স্ট্যান্ডার্ড আরবি ফরম্যাট ব্যবহার করা হয়।"
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "হোম",
            "item": "https://probashi-hub.vercel.app"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "আরবি দরখাস্ত জেনারেটর",
            "item": "https://probashi-hub.vercel.app/arabic-letter-generator"
          }
        ]
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
