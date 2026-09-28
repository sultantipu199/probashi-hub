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

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://probashihub.com";

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

  return <ServiceDetailClient problem={problem} relatedProblems={relatedProblems} />;
}
