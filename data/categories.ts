import {
  Award,
  FileText,
  Scale,
  Layers,
  Sparkles,
  Plane,
  AlertOctagon,
  Landmark,
  Car,
  Coins,
  HeartPulse,
  ShieldAlert,
  Briefcase,
  Building2,
  LucideIcon
} from "lucide-react";

export interface CategoryItem {
  id: number;
  name: string;
  en: string;
  slug: string;
  icon: LucideIcon;
  color: string;
  description: string;
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 1,
    name: "ইকামা ও পরিচয়পত্র",
    en: "Iqama Services",
    slug: "iqama-services",
    icon: Award,
    color: "from-emerald-500 to-teal-700",
    description: "ইকামা নবায়ন, মেয়াদোত্তীর্ণ জরিমানা, হারিয়ে যাওয়া কার্ড উত্তোলন ও পেশা পরিবর্তন নির্দেশিকা।"
  },
  {
    id: 2,
    name: "কিওয়া ও ইলেকট্রনিক চুক্তি",
    en: "Qiwa & Contracts",
    slug: "qiwa-and-contracts",
    icon: FileText,
    color: "from-blue-500 to-cyan-700",
    description: "কিওয়া প্ল্যাটফর্মে ডিজিটাল কন্ট্রাক্ট যাচাই, গ্রহণ বা প্রত্যাখ্যান এবং শর্ত পরিবর্তনের নিয়ম।"
  },
  {
    id: 3,
    name: "মক্তব আমল ও শ্রম বিরোধ",
    en: "Labor Disputes",
    slug: "labor-disputes",
    icon: Scale,
    color: "from-indigo-500 to-purple-700",
    description: "বকেয়া বেতন আদায়, ওয়াদি পোর্টাল কেস ও সৌদি শ্রম আদালতের কার্যপ্রণালী।"
  },
  {
    id: 4,
    name: "কাফালা ও স্পন্সরশিপ",
    en: "Kafala Transfer",
    slug: "kafala-transfer",
    icon: Layers,
    color: "from-violet-500 to-fuchsia-700",
    description: "কফিলের অনুমতি ছাড়া কাফালা, কিওয়া রিকোয়েস্ট ও কোম্পানি স্থানান্তরের সরকারি নিয়ম।"
  },
  {
    id: 5,
    name: "আবশির ও তাওয়াক্কালনা",
    en: "Absher & Tawakkalna",
    slug: "absher-tawakkalna",
    icon: Sparkles,
    color: "from-emerald-600 to-green-800",
    description: "আবশির অ্যাকাউন্ট রিকভারি, ডিজিটাল ড্রাইভিং লাইসেন্স ও তাওয়াক্কালনা সেবা।"
  },
  {
    id: 6,
    name: "ভিসা ও ছুটি (খুরুজ)",
    en: "Exit Re-Entry & Final Exit",
    slug: "visas-and-exit",
    icon: Plane,
    color: "from-amber-500 to-orange-700",
    description: "খুরুজ আওদা (ছুটির ভিসা) এক্সটেনশন, ফাইনাল এক্সিট ও বাতিল করার নিয়ম।"
  },
  {
    id: 7,
    name: "হুরুব ও স্ট্যাটাস জটিলতা",
    en: "Huroob Status",
    slug: "huroob-status",
    icon: AlertOctagon,
    color: "from-red-600 to-rose-800",
    description: "কফিল হুরুব বা মাতলুব দিলে করণীয়, তারহিল আউটপাস ও বৈধ হওয়ার সুযোগ।"
  },
  {
    id: 8,
    name: "সার্ভিস বেনিফিট ও গ্র্যাচুইটি",
    en: "End of Service (EOSB)",
    slug: "end-of-service-benefits",
    icon: Landmark,
    color: "from-yellow-500 to-amber-700",
    description: "সৌদি শ্রম আইন ধারা ৮৪ ও ৮৫ অনুযায়ী চাকরির শেষ বেনিফিট ও গ্র্যাচুইটির সঠিক হিসাব।"
  },
  {
    id: 9,
    name: "ট্রাফিক জরিমানা ও সাহের",
    en: "Traffic & Saher",
    slug: "traffic-saher",
    icon: Car,
    color: "from-orange-500 to-red-700",
    description: "সাহের ক্যামেরা জরিমানা মওকুফ আবেদন, ২৫-৫০% ডিসকাউন্ট কিস্তি ও আপিল।"
  },
  {
    id: 10,
    name: "ড্রাইভিং লাইসেন্স ও নাজম",
    en: "Driving & Najm",
    slug: "driving-najm",
    icon: Car,
    color: "from-teal-500 to-emerald-700",
    description: "দুল্লাহ ড্রাইভিং স্কুল টেস্ট, রোড এক্সিডেন্টে নাজম কল ও ক্ষতিপূরণ দাবি।"
  },
  {
    id: 11,
    name: "বৈধ রেমিট্যান্স ও ব্যাংকিং",
    en: "Remittance & Banking",
    slug: "remittance-banking",
    icon: Coins,
    color: "from-emerald-500 to-green-700",
    description: "এসটিসি পে, উরপে দিয়ে দেশে টাকা পাঠানো, ২.৫% প্রণোদনা ও ব্যাংক অ্যাকাউন্ট সচল রাখা।"
  },
  {
    id: 12,
    name: "স্বাস্থ্য ও চিকিৎসা বীমা",
    en: "Health & CCHI",
    slug: "health-insurance",
    icon: HeartPulse,
    color: "from-rose-500 to-pink-700",
    description: "কাফালা বা ইকামার জন্য সিসিএইচআই (CCHI) হেলথ ইন্স্যুরেন্স ভ্যালিডেশন ও ক্লেইম।"
  },
  {
    id: 13,
    name: "ওমরাহ ও হজ পারমিট",
    en: "Umrah & Nusuk",
    slug: "umrah-nusuk",
    icon: Landmark,
    color: "from-purple-500 to-indigo-700",
    description: "নুসুক (Nusuk) অ্যাপে ওমরাহ ও রওজা শরিফ পারমিট বুকিং ও প্রবাসীদের নিয়ম।"
  },
  {
    id: 14,
    name: "আইনি সহায়তা ও পুলিশ",
    en: "Legal Aid & Police",
    slug: "legal-aid-police",
    icon: ShieldAlert,
    color: "from-red-500 to-rose-700",
    description: "শুরুতা বা সিআইডি পুলিশি ঝামেলা, আইনি নোটিশ ও শ্রম আদালতের উকিল সহায়তা।"
  },
  {
    id: 15,
    name: "দূতাবাস সেবা ও পাসপোর্ট",
    en: "Embassy & Passports",
    slug: "embassy-passport",
    icon: Briefcase,
    color: "from-blue-600 to-indigo-800",
    description: "রিয়াদ বাংলাদেশ দূতাবাস ও জেদ্দা কনস্যুলেট থেকে ই-পাসপোর্ট নবায়ন ও ওয়েজ আর্নার্স কল্যাণ।"
  },
  {
    id: 16,
    name: "কার্গো ও ব্যাগেজ কাস্টমস",
    en: "Cargo & Customs",
    slug: "cargo-customs",
    icon: Plane,
    color: "from-cyan-500 to-blue-700",
    description: "বিমানবন্দর ব্যাগেজ নিয়ম, বৈধ এয়ার কার্গো বুকিং ও কাস্টমস ডিউটি তথ্য।"
  },
  {
    id: 17,
    name: "ব্যবসা ও MISA বিনিয়োগ",
    en: "Business & MISA",
    slug: "business-misa",
    icon: Building2,
    color: "from-amber-600 to-yellow-800",
    description: "সৌদি আরবে প্রবাসীদের ১০০% মালিকানাধীন ব্যবসা, মিসা (MISA) লাইসেন্স ও সিআর।"
  },
];
