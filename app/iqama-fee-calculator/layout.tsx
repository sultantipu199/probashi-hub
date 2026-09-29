import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সৌদি ইকামা ও মক্তব আমল ফি ক্যালকুলেটর ২০২৪-২০২৫ | রুকসা আমল ও সাদাদ ফি",
  description:
    "সৌদি আরবে কোম্পানি ও গৃহকর্মীদের ইকামা সরকারি ফি, মক্তব আমল (রুকসা আমল কোড ০১৩) লেভি, ডিপেন্ডেন্ট ফি এবং নবায়নে দেরির জরিমানা তাৎক্ষণিক হিসাব করুন।",
  keywords: [
    "Iqama Fee Calculator",
    "ইকামা ফি ক্যালকুলেটর",
    "মক্তব আমল ফি কত",
    "রুকসা আমল ফি",
    "সাদাদ কোড ০১৩",
    "ডিপেন্ডেন্ট ফি হিসাব",
    "ইকামা জরিমানা",
    "Saudi Expat Maktab Amal Levy",
  ],
  alternates: {
    canonical: "https://probashi-hub.vercel.app/iqama-fee-calculator",
  },
  openGraph: {
    title: "সৌদি ইকামা ও মক্তব আমল ফি ক্যালকুলেটর | Probashi Hub",
    description:
      "বাণিজ্যিক কোম্পানি, ক্ষুদ্র প্রতিষ্ঠান ও আমেল মানজিলির ইকামা রিনিউয়াল সরকারি ফি, ইন্স্যুরেন্স ও জরিমানার লাইভ ক্যালকুলেটর।",
    url: "https://probashi-hub.vercel.app/iqama-fee-calculator",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saudi Iqama and Maktab Amal Fee Calculator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সৌদি ইকামা ও মক্তব আমল ফি ক্যালকুলেটর",
    description:
      "ইকামা ও রুকসা আমল সরকারি ফি, ডিপেন্ডেন্ট ফি এবং জরিমানার নির্ভুল হিসাব।",
    images: ["/og-image.png"],
  },
};

export default function IqamaCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "সৌদি ইকামা ও মক্তব আমল ফি ক্যালকুলেটর (Saudi Iqama Fee Calculator)",
        "url": "https://probashi-hub.vercel.app/iqama-fee-calculator",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "description": "Calculates official Saudi Jawazat and HRSD Maktab Amal fees, dependent tax, and delayed renewal fines in SAR and BDT.",
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
            "name": "বাণিজ্যিক প্রতিষ্ঠানে কর্মীর ইকামা ও মক্তব আমল ফি কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "বাণিজ্যিক প্রতিষ্ঠানে সৌদি নাগরিকের চেয়ে বিদেশি কর্মী বেশি হলে মাসিক ৮০০ রিয়াল (বছরে ৯,৬০০ রিয়াল) এবং সমান বা কম হলে মাসিক ৭০০ রিয়াল (বছরে ৮,৪০০ রিয়াল) মক্তব আমল ফি প্রযোজ্য। সাথে জাওয়াযাত ইকামা ফি ৬৫০ রিয়াল।"
            }
          },
          {
            "@type": "Question",
            "name": "গৃহকর্মী (আমেল মানজিলি বা সাইক খাস) ইকামা ফি কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "গৃহকর্মীদের জন্য কোনো মক্তব আমল ফি নেই। শুধুমাত্র বার্ষিক সরকারি জাওয়াযাত ফি ৬০০ রিয়াল।"
            }
          },
          {
            "@type": "Question",
            "name": "ইকামা নবায়ন বিলম্বের সরকারি জরিমানা কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "ইকামার মেয়াদ শেষ হওয়ার ৩ দিনের মধ্যে রিনিউ না করলে প্রথমবার ৫০০ রিয়াল, দ্বিতীয়বার ১,০০০ রিয়াল এবং তৃতীয়বার স্থায়ী ডিপোর্টেশনের বিধান রয়েছে।"
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
            "name": "ইকামা ও মক্তব আমল ফি ক্যালকুলেটর",
            "item": "https://probashi-hub.vercel.app/iqama-fee-calculator"
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
