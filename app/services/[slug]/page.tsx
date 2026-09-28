import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import problemsData from "@/data/problems.json";
import ServiceDetailClient from "./ServiceDetailClient";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all 50 problem slugs for programmatic SEO
export async function generateStaticParams() {
  return problemsData.map((p) => ({
    slug: p.slug,
  }));
}

// Dynamic SEO Metadata for each service
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const problem = problemsData.find((p) => p.slug === params.slug);
  if (!problem) {
    return {
      title: "সেবা পাওয়া যায়নি | Probashi Hub",
    };
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app";

  return {
    title: `${problem.title} | Probashi Hub KSA`,
    description: problem.summary,
    keywords: [
      problem.title,
      problem.title_en,
      problem.official_portal,
      problem.category_name,
      "সৌদি প্রবাসী নিয়ম",
      "Saudi Labor Law",
    ],
    openGraph: {
      title: `${problem.title} | Probashi Hub`,
      description: problem.summary,
      url: `${appUrl}/services/${problem.slug}`,
      type: "article",
    },
    alternates: {
      canonical: `${appUrl}/services/${problem.slug}`,
    },
  };
}

export default function ServicePage({ params }: ServicePageProps) {
  const problem = problemsData.find((p) => p.slug === params.slug);

  if (!problem) {
    notFound();
  }

  // Find related problems in same category
  const relatedProblems = problemsData
    .filter((p) => p.category_id === problem.category_id && p.slug !== problem.slug)
    .slice(0, 3);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashi-hub.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "HowTo",
        name: problem.title,
        description: problem.summary,
        step: problem.steps.map((s, idx) => ({
          "@type": "HowToStep",
          position: idx + 1,
          name: `ধাপ ${idx + 1}`,
          text: s,
        })),
        supply: problem.required_documents.map((doc) => ({
          "@type": "HowToSupply",
          name: doc,
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `${problem.title} এর নিয়ম কী?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `${problem.summary} অফিসিয়াল পোর্টাল: ${problem.official_portal}`,
            },
          },
          {
            "@type": "Question",
            name: "এই সেবার জন্য কী কী কাগজপত্র বা ডকুমেন্ট প্রয়োজন?",
            acceptedAnswer: {
              "@type": "Answer",
              text: problem.required_documents.join(", "),
            },
          },
          {
            "@type": "Question",
            name: "অফিসিয়াল সরকারি ফি এবং প্রসেসিং সময় কত?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `ফি: ${problem.official_fees_sar} | সময়: ${problem.processing_time} | পোর্টাল: ${problem.official_portal}`,
            },
          },
          {
            "@type": "Question",
            name: "প্রবাসীদের জন্য বিশেষ সতর্কতা বা রেড ফ্ল্যাগ কী?",
            acceptedAnswer: {
              "@type": "Answer",
              text: problem.scam_warnings,
            },
          },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "হোম",
            item: appUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: problem.category_name,
            item: `${appUrl}/categories/${problem.category_id}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: problem.title,
            item: `${appUrl}/services/${problem.slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceDetailClient problem={problem} relatedProblems={relatedProblems} />
    </>
  );
}
