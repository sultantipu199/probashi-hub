# Probashi Hub (প্রবাসী হাব) - Autonomous Agent Operating Guidelines

## 🚀 Project Overview
Probashi Hub is a comprehensive platform for expatriates (প্রবাসী), built with Next.js 14 (App Router), TypeScript, TailwindCSS, and Supabase.

## 👥 Dual-Brain AI Coworker Team
- **Antigravity Agent (Google DeepMind)**: Primary workspace orchestrator, frontend/backend component author, terminal automation, and cloud deployment.
- **Anthropic Claude AI (Claude Code)**: Architectural critique, Supabase data model integrity, security validation, and peer code reviews.

## 🛠️ Tech Stack & Commands
- **Framework**: Next.js 14.2.15 (App Router)
- **Database/Auth**: Supabase (`@supabase/supabase-js`)
- **Styling**: TailwindCSS, clsx, tailwind-merge, Lucide React
- **Dev Server**: `npm run dev`
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Seed Script**: `python scripts/seed_database.py`

## 📋 Coding Standards
1. Use Next.js 14 App Router conventions (`app/` directory, Server Components by default, `"use client"` only when interactive state is required).
2. All components must be strictly typed with TypeScript.
3. Supabase queries must handle errors gracefully and maintain RLS security.
4. Maintain bilingual or culturally appropriate UI copy for expatriates (Bangla / English).
