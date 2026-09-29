"use client";

import React, { useEffect } from "react";
import Script from "next/script";

interface GoogleAdSenseProps {
  clientId?: string;
}

export default function GoogleAdSense({
  clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5913679984174223",
}: GoogleAdSenseProps) {
  if (!clientId) return null;

  return (
    <Script
      id="google-adsense"
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}

// Responsive Display Ad Unit with fallback
export function AdSenseUnit({
  slot = "1234567890",
  format = "auto",
  responsive = "true",
  className = "",
}: {
  slot?: string;
  format?: string;
  responsive?: string;
  className?: string;
}) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error("[ADSENSE PUSH ERROR]", err);
    }
  }, []);

  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-5913679984174223";

  return (
    <div className={`overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800 text-center my-4 p-2 ${className}`}>
      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-1">
        বিজ্ঞাপন • SPONSORED AD
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client={clientId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
