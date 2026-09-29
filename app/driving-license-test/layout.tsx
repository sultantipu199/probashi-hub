import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সৌদি দাল্লাহ ড্রাইভিং লাইসেন্স কম্পিউটার টেস্ট সিমুলেটর | Dallah Driving Test Bangla",
  description:
    "সৌদি ট্রাফিক পুলিশ (মুরুুর) ও দাল্লাহ ড্রাইভিং স্কুলের কম্পিউটার থিওরি পরীক্ষার বাংলা প্রস্তুতি। ২০টি জরুরি প্রশ্ন, ট্রাফিক সাইন ও তাৎক্ষণিক স্কোরিং।",
  keywords: [
    "Dallah Driving Test",
    "দাল্লাহ ড্রাইভিং টেস্ট",
    "সৌদি ড্রাইভিং লাইসেন্স পরীক্ষা বাংলা",
    "মুরুুর কম্পিউটার টেস্ট",
    "ট্রাফিক সাইন সৌদি আরব",
    "Saudi Driving License Computer Test",
    "দাল্লাহ টেস্ট প্রস্তুতি",
  ],
  alternates: {
    canonical: "https://probashi-hub.vercel.app/driving-license-test",
  },
  openGraph: {
    title: "সৌদি দাল্লাহ ড্রাইভিং লাইসেন্স কম্পিউটার টেস্ট | Probashi Hub",
    description:
      "মুরুুর অনুমোদিত ট্রাফিক সাইন, অগ্রাধিকার ও গোলচত্বরের নিয়ম নিয়ে বাংলা অনলাইন ড্রাইভিং টেস্ট সিমুলেটর।",
    url: "https://probashi-hub.vercel.app/driving-license-test",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saudi Dallah Driving License Test Bangla Simulator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সৌদি দাল্লাহ ড্রাইভিং লাইসেন্স কম্পিউটার টেস্ট",
    description:
      "সৌদি ড্রাইভিং লাইসেন্স থিওরি পরীক্ষার প্রশ্ন ও ব্যাখ্যা বাংলায় শিখুন।",
    images: ["/og-image.png"],
  },
};

export default function DrivingTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "name": "সৌদি দাল্লাহ ড্রাইভিং লাইসেন্স কম্পিউটার টেস্ট সিমুলেটর",
        "url": "https://probashi-hub.vercel.app/driving-license-test",
        "applicationCategory": "EducationalApplication",
        "operatingSystem": "All",
        "description": "Interactive theory quiz simulation for Saudi Arabia Dallah Driving License test with Bengali explanations and instant scores.",
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
            "name": "দাল্লাহ কম্পিউটার টেস্টে মোট কতটি প্রশ্ন থাকে এবং পাসের মার্ক কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "সাধারণত ৩০টি বহুনির্বাচনী প্রশ্ন থাকে এবং পাস করতে কমপক্ষে ২৪টি প্রশ্নের (৮০%) সঠিক উত্তর দিতে হয়।"
            }
          },
          {
            "@type": "Question",
            "name": "সৌদি আরবে গোলচত্বরে (Roundabout) অগ্রাধিকার কার?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "যে গাড়িটি ইতোমধ্যে গোলচত্বরের ভেতরে ঘুরছে তার অগ্রাধিকার আগে। নতুন প্রবেশকারী গাড়িকে অবশ্যই থামতে হবে।"
            }
          },
          {
            "@type": "Question",
            "name": "দাল্লাহ কম্পিউটার পরীক্ষা কি বাংলায় দেওয়া যায়?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "হ্যাঁ, সৌদি ট্রাফিক পুলিশ অনুমোদিত কম্পিউটারে বাংলা ভাষা সিলেক্ট করে পরীক্ষা দেওয়া সম্ভব।"
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
            "name": "দাল্লাহ ড্রাইভিং লাইসেন্স টেস্ট",
            "item": "https://probashi-hub.vercel.app/driving-license-test"
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
