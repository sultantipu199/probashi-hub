import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/services/",
          "/categories/",
          "/urgent-sos",
          "/law-academy",
          "/arabic-letter-generator",
          "/iqama-fee-calculator",
          "/driving-license-test",
          "/sitemap.xml",
        ],
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
      {
        userAgent: "Applebot",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
