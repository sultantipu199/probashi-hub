import React from "react";
import Link from "next/link";
import { Mail, MessageSquare, PhoneCall, MapPin, ArrowLeft, Send } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "যোগাযোগ (Contact Us) | Probashi Hub",
  description: "প্রবাসী হাব টিমের সাথে সরাসরি যোগাযোগ করুন। ইমেইল, হোয়াটসঅ্যাপ ও জরুরি সহায়তা।",
  alternates: {
    canonical: "https://probashi-hub.vercel.app/contact",
  },
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "966500000000";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-slate-400 hover:text-emerald-400 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
          মূল হোমপেজে ফিরে যান
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info Sidebar */}
        <div className="space-y-4">
          <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white mb-2">সরাসরি যোগাযোগ</h2>

            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <span className="block font-semibold text-white">ইমেইল হেল্পডেস্ক</span>
                <a href="mailto:support@probashihub.com" className="hover:text-emerald-400 transition">
                  support@probashihub.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <MessageSquare className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <span className="block font-semibold text-white">হোয়াটসঅ্যাপ সাপোর্ট</span>
                <span>২৪/৭ মেসেজ সহায়তা</span>
              </div>
            </div>

            <div className="flex items-start space-x-3 text-xs text-slate-300">
              <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <span className="block font-semibold text-white">কভারেজ জোন</span>
                <span>রিয়াদ, জেদ্দা, দাম্মাম, মক্কা ও মদিনা, কেএসএ</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent("প্রবাসী হাব হেল্পডেস্ক: আমার একটি সাধারণ জিজ্ঞাসা রয়েছে")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg transition"
              >
                <MessageSquare className="w-4 h-4" />
                <span>হোয়াটসঅ্যাপে মেসেজ পাঠান</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Message Form */}
        <div className="md:col-span-2">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-5">
            <h1 className="text-xl sm:text-2xl font-black text-white">
              আমাদের বার্তা পাঠান (Send a Message)
            </h1>
            <p className="text-xs text-slate-400">
              আপনার মতামত, পরামর্শ বা যেকোনো সহায়তার জন্য নিচের ফর্মটি পূরণ করুন:
            </p>

            <form
              action="mailto:support@probashihub.com"
              method="GET"
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-slate-300 font-semibold mb-1">আপনার নাম</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="যেমন: মোঃ করিমুল ইসলাম"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">আপনার বার্তা / জিজ্ঞাসা</label>
                <textarea
                  name="body"
                  rows={4}
                  required
                  placeholder="আপনার প্রশ্ন বা পরামর্শ বিস্তারিত লিখুন..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition"
              >
                <Send className="w-4 h-4" />
                <span>বার্তা প্রেরণ করুন</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
