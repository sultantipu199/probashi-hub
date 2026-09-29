import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "সৌদি জরুরি হটলাইন ও এসওএস ডায়ালার | পুলিশ ৯৯৯, অ্যাম্বুলেন্স ৯৯৭ ও দূতাবাস",
  description:
    "সৌদি আরবের সকল জরুরি হটলাইন নম্বর (পুলিশ ৯৯৯, অ্যাম্বুলেন্স ৯৯৭, ট্রাফিক নাজম, সিভিল ডিফেন্স ৯৯৮, দূতাবাস), ওয়ান-ক্লিক ডায়াল ও জিপিএস লোকেশন সেন্ডার।",
  keywords: [
    "Saudi Emergency Numbers",
    "সৌদি পুলিশ নম্বর ৯৯৯",
    "অ্যাম্বুলেন্স ৯৯৭",
    "নাজম এক্সিডেন্ট ৯২০০১৪৪৪৪",
    "সৌদি জরুরি হটলাইন",
    "বাংলাদেশ দূতাবাস রিয়াদ ফোন",
    "জেদ্দা কনস্যুলেট জরুরি নম্বর",
    "Saudi SOS",
  ],
  alternates: {
    canonical: "https://probashi-hub.vercel.app/urgent-sos",
  },
  openGraph: {
    title: "সৌদি জরুরি এসওএস ও হটলাইন ডায়ালার | Probashi Hub",
    description:
      "জরুরি মুহূর্তে পুলিশ, অ্যাম্বুলেন্স, ফায়ার সার্ভিস, নাজম ও বাংলাদেশ দূতাবাসের ওয়ান-ট্যাপ ডায়ালার ও লাইভ জিপিএস লোকেশন কপি।",
    url: "https://probashi-hub.vercel.app/urgent-sos",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Saudi Emergency Hotlines and SOS GPS Dialer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "সৌদি জরুরি হটলাইন ও এসওএস ডায়ালার",
    description:
      "বিপদে পুলিশ ৯৯৯, অ্যাম্বুলেন্স ৯৯৭, নাজম ও দূতাবাস নম্বরে সরাসরি কল করার সুবিধা।",
    images: ["/og-image.png"],
  },
};

export default function UrgentSosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "GovernmentService",
        "name": "সৌদি আরব জরুরি এসওএস ও সহায়তা সার্ভিস (Saudi Emergency SOS Directory)",
        "url": "https://probashi-hub.vercel.app/urgent-sos",
        "serviceType": "Emergency and Public Safety Directory",
        "provider": {
          "@type": "Organization",
          "name": "Probashi Hub",
          "url": "https://probashi-hub.vercel.app"
        },
        "areaServed": "Saudi Arabia",
        "availableChannel": {
          "@type": "ServiceChannel",
          "servicePhone": {
            "@type": "ContactPoint",
            "telephone": "999",
            "contactType": "Emergency Police"
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "সৌদি আরবে সড়ক দুর্ঘটনা ঘটলে সর্বপ্রথম কাকে ফোন করতে হবে?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "দুর্ঘটনায় যদি কেবল গাড়ির ক্ষয়ক্ষতি হয় এবং কোনো ব্যক্তি আহত না হয়, তবে নাজম (Najm) এর নম্বরে ৯২০০১৪৪৪৪ অথবা ৯২০ অথবা নাজম অ্যাপে রিপোর্ট করতে হবে।"
            }
          },
          {
            "@type": "Question",
            "name": "সৌদি আরবে অ্যাম্বুলেন্সের জরুরি ফ্রি নম্বর কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "রেড ক্রিসেন্ট জরুরি অ্যাম্বুলেন্স সার্ভিস নম্বর হলো ৯৯৭ (টোল-ফ্রি)।"
            }
          },
          {
            "@type": "Question",
            "name": "বাংলাদেশ দূতাবাস রিয়াদের জরুরি হটলাইন নম্বর কত?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "রিয়াদ দূতাবাস হটলাইন: ০১১-৪৮৫৭৬৬৩ অথবা ০৮০০২৪৪০০৫৫ এবং জেদ্দা কনস্যুলেট: ০১২-৬৮৭৮৪৩৩।"
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
            "name": "জরুরি এসওএস ও হটলাইন",
            "item": "https://probashi-hub.vercel.app/urgent-sos"
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
