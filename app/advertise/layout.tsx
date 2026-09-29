import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রবাসী হাবে বিজ্ঞাপন ও স্পনসরশিপ | Advertise With Probashi Hub KSA",
  description:
    "সৌদি আরবে বসবাসরত লাখ লাখ বাংলাদেশি প্রবাসীদের কাছে আপনার কার্গো, ট্রাভেল, লিগ্যাল ও ব্যবসা সেবা তুলে ধরুন। প্রবাসীদের সবচেয়ে বিশ্বস্ত ডিজিটাল পোর্টালে বিজ্ঞাপন দিন।",
  keywords: [
    "Advertise With Probashi Hub",
    "প্রবাসী হাবে বিজ্ঞাপন",
    "সৌদি প্রবাসী বিজ্ঞাপন",
    "Saudi Expat Advertising",
    "কার্গো স্পনসরশিপ",
    "ট্রাভেল এজেন্সি পার্টনার",
    "সৌদি লিগ্যাল এইড স্পনসর",
  ],
  alternates: {
    canonical: "https://probashi-hub.vercel.app/advertise",
  },
  openGraph: {
    title: "প্রবাসী হাবে বিজ্ঞাপন ও পার্টনারশিপ | Probashi Hub",
    description:
      "সৌদি প্রবাসী কমিউনিটির কাছে আপনার ব্র্যান্ডের প্রচারণা বাড়ান। প্রিমিয়াম ব্যানার স্পেস ও ভেরিফাইড লিড প্যাকেজ।",
    url: "https://probashi-hub.vercel.app/advertise",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Advertise With Probashi Hub KSA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "প্রবাসী হাবে বিজ্ঞাপন ও স্পনসরশিপ",
    description: "সৌদি আরবে আপনার প্রতিষ্ঠানের সেবা প্রবাসীদের মাঝে ছড়িয়ে দিন।",
    images: ["/og-image.png"],
  },
};

export default function AdvertiseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
