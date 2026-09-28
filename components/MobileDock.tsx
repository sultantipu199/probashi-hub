"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShieldAlert, Calculator, FileText, Banknote } from "lucide-react";

export default function MobileDock() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "হোম",
      href: "/",
      icon: Home,
      highlight: false,
    },
    {
      label: "রেট",
      href: "/#rates",
      icon: Banknote,
      highlight: false,
    },
    {
      label: "জরুরি SOS",
      href: "/urgent-sos",
      icon: ShieldAlert,
      highlight: true,
    },
    {
      label: "গ্র্যাচুইটি",
      href: "/law-academy",
      icon: Calculator,
      highlight: false,
    },
    {
      label: "দরখাস্ত",
      href: "/arabic-letter-generator",
      icon: FileText,
      highlight: false,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-1 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto bg-slate-950/90 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl shadow-black/80 px-2 py-1.5 flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (item.highlight) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative -top-3 flex flex-col items-center justify-center"
              >
                <div className="w-13 h-13 p-3 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white shadow-lg shadow-red-900/60 border-2 border-slate-950 animate-pulse">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-bold text-red-400 mt-0.5">{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                isActive
                  ? "text-emerald-400 font-bold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
