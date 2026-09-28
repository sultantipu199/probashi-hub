import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MobileDock from "@/components/MobileDock";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#006C35",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app"),
  title: {
    default: "Probashi Hub | সৌদি প্রবাসী ওয়ান-স্টপ হাব (ইকামা, কাফালা ও শ্রম আইন)",
    template: "%s | Probashi Hub Saudi Arabia",
  },
  description:
    "সৌদি প্রবাসী বাংলাদেশিদের জন্য সম্পূর্ণ ওয়ান-স্টপ প্ল্যাটফর্ম। ইকামা রিনিউ, কিওয়া চুক্তি, ৩ মাস বেতন বকেয়া কাফালা, ধারা ৮৪ গ্র্যাচুইটি হিসাব, নাজম এক্সিডেন্ট ও দূতাবাস সেবা।",
  keywords: [
    "Saudi Probashi Hub",
    "সৌদি প্রবাসী",
    "ইকামা রিনিউ নিয়ম",
    "কিওয়া চুক্তি গ্রহণ",
    "সৌদি শ্রম আইন ধারা ৮৪",
    "কাফালা ট্রান্সফার নিয়ম",
    "আজকের রিয়াল রেট",
    "জরুরি পুলিশ ৯৯৯ অ্যাম্বুলেন্স ৯৯৭",
    "বাংলাদেশ দূতাবাস রিয়াদ",
    "আউটপাস তারহিল",
  ],
  authors: [{ name: "Probashi Hub Engineering Team" }],
  openGraph: {
    title: "Probashi Hub | সৌদি প্রবাসী ওয়ান-স্টপ হাব",
    description:
      "সৌদি আরব প্রবাসীদের ৫০টি জটিল সমস্যার সরকারি সমাধান, শ্রম আইন ক্যালকুলেটর ও জরুরি হটলাইন।",
    url: "https://probashi-hub.vercel.app",
    siteName: "Probashi Hub",
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Probashi Hub | সৌদি প্রবাসী ওয়ান-স্টপ হাব",
    description:
      "ইকামা, কাফালা, কিওয়া ও শ্রম আইন সমাধান এক ক্লিকে। শতভাগ নির্ভরযোগ্য নির্দেশিকা।",
  },
  alternates: {
    canonical: "https://probashi-hub.vercel.app",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://probashi-hub.vercel.app/#website",
        "url": "https://probashi-hub.vercel.app",
        "name": "Probashi Hub - সৌদি প্রবাসী ওয়ান-স্টপ হাব",
        "description": "Comprehensive Saudi expat one-stop support portal for legal guidance, emergency SOS, and remittances.",
        "inLanguage": "bn-BD",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://probashi-hub.vercel.app/?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://probashi-hub.vercel.app/#organization",
        "name": "Probashi Hub",
        "url": "https://probashi-hub.vercel.app",
        "logo": "https://probashi-hub.vercel.app/icon.svg",
        "sameAs": [
          "https://facebook.com/probashihub",
          "https://youtube.com/@probashihub"
        ]
      }
    ]
  };

  return (
    <html lang="bn" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased selection:bg-saudi-600 selection:text-white flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        {/* Footer */}
        <footer className="mt-20 border-t border-slate-800 bg-slate-950 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 pb-24 md:pb-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-saudi-700 flex items-center justify-center text-white font-black text-sm">
                  প্র
                </div>
                <span className="text-base font-bold text-white">Probashi Hub</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                সৌদি আরব প্রবাসী বাংলাদেশিদের জন্য সর্বাধুনিক উন্মুক্ত তথ্য ও আইনি সহায়তা কেন্দ্র।
              </p>
              <p className="text-[11px] text-emerald-400">
                🇸🇦 রিয়াদ, জেদ্দা, দাম্মাম, মক্কা ও মদিনা জোন
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-3">জরুরি সেবা</h4>
              <ul className="space-y-2">
                <li><a href="/urgent-sos" className="hover:text-emerald-400 transition">জরুরি SOS হটলাইন</a></li>
                <li><a href="/urgent-sos#police" className="hover:text-emerald-400 transition">পুলিশ ও ট্রাফিক পুলিশ</a></li>
                <li><a href="/urgent-sos#ambulance" className="hover:text-emerald-400 transition">রেড ক্রিসেন্ট অ্যাম্বুলেন্স (৯৯৭)</a></li>
                <li><a href="/urgent-sos#embassy" className="hover:text-emerald-400 transition">বাংলাদেশ দূতাবাস ও কনস্যুলেট</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-3">টুলস ও ক্যালকুলেটর</h4>
              <ul className="space-y-2">
                <li><a href="/law-academy#calculator" className="hover:text-emerald-400 transition">গ্র্যাচুইটি ক্যালকুলেটর (ধারা ৮৪)</a></li>
                <li><a href="/iqama-fee-calculator" className="hover:text-emerald-400 transition">ইকামা ও মক্তব আমল ফি ক্যালকুলেটর</a></li>
                <li><a href="/driving-license-test" className="hover:text-emerald-400 transition">সৌদি ড্রাইভিং টেস্ট সিমুলেটর</a></li>
                <li><a href="/arabic-letter-generator" className="hover:text-emerald-400 transition">আরবি মক্তব আমল দরখাস্ত</a></li>
                <li><a href="/#rates" className="hover:text-emerald-400 transition">লাইভ রিয়াল রেমিট্যান্স রেট</a></li>
                <li><a href="/law-academy" className="hover:text-emerald-400 transition">সৌদি শ্রম আইন একাডেমি</a></li>
                <li><a href="/admin" className="text-slate-500 hover:text-emerald-400 transition flex items-center">🔐 অ্যাডমিন ও লিড পোর্টাল</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white text-sm mb-3">আইনি ডিসক্লেইমার</h4>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Probashi Hub একটি স্বাধীন তথ্য ও শিক্ষা প্ল্যাটফর্ম, কোনো সৌদি বা বাংলাদেশি সরকারি সংস্থা নয়। সকল তথ্য সৌদি শ্রম মন্ত্রণালয় (HRSD), জাওয়াযাত ও কিওয়ার অফিশিয়াল গেজেট অনুসারে সংগৃহীত।
              </p>
              <div className="mt-4 pt-3 border-t border-slate-900 text-[10px] text-slate-600 flex items-center justify-between">
                <span>© {new Date().getFullYear()} Probashi Hub KSA. All rights reserved.</span>
                <a href="/admin" className="text-slate-600 hover:text-slate-400">Admin</a>
              </div>
            </div>
          </div>
        </footer>

        <MobileDock />
      </body>
    </html>
  );
}
