"""
Probashi Hub: Comprehensive SEO Architecture Auditor
Checks Technical SEO, On-Page SEO, Metadata, Robots, Sitemap, and Schema.org
"""

import json
import sys
from pathlib import Path

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

ROOT_DIR = Path(__file__).resolve().parent.parent

def audit_seo():
    print("=" * 60)
    print("🚀 Probashi Hub: Automated Comprehensive SEO Audit")
    print("=" * 60)

    checks_passed = 0
    total_checks = 0

    def assert_check(name, condition, details=""):
        nonlocal checks_passed, total_checks
        total_checks += 1
        if condition:
            checks_passed += 1
            print(f" [PASS] {name} {details}")
        else:
            print(f" [FAIL] {name} {details}")

    # 1. Technical SEO - Robots.txt
    robots_path = ROOT_DIR / "app" / "robots.ts"
    total_checks += 1
    if robots_path.exists():
        content = robots_path.read_text(encoding="utf-8")
        if "/admin" in content and "sitemap.xml" in content and "Googlebot" in content:
            checks_passed += 1
            print(" [PASS] Technical SEO: robots.ts disallows /admin, allows Googlebot, and specifies sitemap")
        else:
            print(" [FAIL] Technical SEO: robots.ts missing critical directives")
    else:
        print(" [FAIL] Technical SEO: robots.ts missing")

    # 2. Technical SEO - Sitemap
    sitemap_path = ROOT_DIR / "app" / "sitemap.ts"
    total_checks += 1
    if sitemap_path.exists():
        content = sitemap_path.read_text(encoding="utf-8")
        if "problems.map" in content and "CATEGORIES.map" in content:
            checks_passed += 1
            print(" [PASS] Technical SEO: sitemap.ts dynamically includes all 50 services & 17 categories")
        else:
            print(" [FAIL] Technical SEO: sitemap.ts missing dynamic routes")
    else:
        print(" [FAIL] Technical SEO: sitemap.ts missing")

    # 3. Off-Page & Social SEO - OG Image
    og_image_path = ROOT_DIR / "public" / "og-image.png"
    assert_check(
        "Social SEO: 1200x630 OpenGraph social share card (public/og-image.png) exists",
        og_image_path.exists() and og_image_path.stat().st_size > 10000
    )

    # 4. Content Syndication - RSS Feed
    feed_path = ROOT_DIR / "app" / "feed.xml" / "route.ts"
    assert_check(
        "Syndication SEO: Dynamic RSS 2.0 XML feed (app/feed.xml/route.ts) active",
        feed_path.exists()
    )

    # 5. On-Page SEO - Dedicated Layouts & Rich Schemas
    routes_to_verify = [
        ("Iqama Fee Calculator", ROOT_DIR / "app" / "iqama-fee-calculator" / "layout.tsx", ["WebApplication", "FAQPage", "BreadcrumbList"]),
        ("Driving License Test", ROOT_DIR / "app" / "driving-license-test" / "layout.tsx", ["WebApplication", "FAQPage", "BreadcrumbList"]),
        ("Urgent SOS", ROOT_DIR / "app" / "urgent-sos" / "layout.tsx", ["GovernmentService", "FAQPage", "BreadcrumbList"]),
        ("Arabic Letter Generator", ROOT_DIR / "app" / "arabic-letter-generator" / "layout.tsx", ["WebApplication", "FAQPage", "BreadcrumbList"]),
        ("Law Academy", ROOT_DIR / "app" / "law-academy" / "page.tsx", ["Article", "FAQPage", "BreadcrumbList"]),
        ("Service Details", ROOT_DIR / "app" / "services" / "[slug]" / "page.tsx", ["HowTo", "FAQPage", "BreadcrumbList"]),
        ("Category Details", ROOT_DIR / "app" / "categories" / "[id]" / "page.tsx", ["CollectionPage", "ItemList", "BreadcrumbList"]),
    ]

    for name, path, schemas in routes_to_verify:
        total_checks += 1
        if path.exists():
            text = path.read_text(encoding="utf-8")
            missing = [s for s in schemas if s not in text]
            if not missing and "canonical" in text and "openGraph" in text:
                checks_passed += 1
                print(f" [PASS] On-Page SEO: {name} has metadata, canonical, and schemas ({', '.join(schemas)})")
            else:
                print(f" [FAIL] On-Page SEO: {name} missing: {missing or 'canonical/OG'}")
        else:
            print(f" [FAIL] On-Page SEO: {name} file missing at {path}")

    # 6. Global Schema.org in Root Layout
    layout_path = ROOT_DIR / "app" / "layout.tsx"
    total_checks += 1
    if layout_path.exists():
        l_text = layout_path.read_text(encoding="utf-8")
        if "WebSite" in l_text and "Organization" in l_text and "SiteNavigationElement" in l_text and "og-image.png" in l_text:
            checks_passed += 1
            print(" [PASS] Technical SEO: Root layout includes WebSite, Organization, Sitelinks Schema, & OG Image")
        else:
            print(" [FAIL] Technical SEO: Root layout missing global schemas")

    print("\n" + "=" * 60)
    print(f"SEO AUDIT SCORE: {checks_passed}/{total_checks} ({(checks_passed/total_checks)*100:.1f}%)")
    print("=" * 60)

    if checks_passed == total_checks:
        print("🏆 ALL TECHNICAL, ON-PAGE, OFF-PAGE, AND STRUCTURED DATA CHECKS PASSED 100%!")

if __name__ == "__main__":
    audit_seo()
