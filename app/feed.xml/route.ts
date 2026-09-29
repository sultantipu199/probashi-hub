import { NextResponse } from "next/server";
import problems from "@/data/problems.json";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app";

  const itemsXml = problems
    .map(
      (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${baseUrl}/services/${p.slug}</link>
      <guid>${baseUrl}/services/${p.slug}</guid>
      <description><![CDATA[${p.summary} | সরকারি পোর্টাল: ${p.official_portal} | ফি: ${p.official_fees_sar}]]></description>
      <category><![CDATA[${p.category_name}]]></category>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Probashi Hub (সৌদি প্রবাসী ওয়ান-স্টপ হাব)</title>
    <link>${baseUrl}</link>
    <description>সৌদি আরব প্রবাসী বাংলাদেশিদের জন্য সর্বাধুনিক উন্মুক্ত তথ্য, আইনি সহায়তা ও সরকারি সমাধান কেন্দ্র।</description>
    <language>bn</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
