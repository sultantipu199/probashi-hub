import urllib.request
import json
import time

with open('data/problems.json', encoding='utf-8') as f:
    problems = json.load(f)

endpoints = [
    'https://probashi-hub.vercel.app/',
    'https://probashi-hub.vercel.app/icon-192x192.png',
    'https://probashi-hub.vercel.app/icon-512x512.png',
    'https://probashi-hub.vercel.app/apple-touch-icon.png',
    'https://probashi-hub.vercel.app/favicon.ico',
    'https://probashi-hub.vercel.app/manifest.json',
    'https://probashi-hub.vercel.app/robots.txt',
    'https://probashi-hub.vercel.app/sitemap.xml',
    'https://probashi-hub.vercel.app/api/rates',
    'https://probashi-hub.vercel.app/urgent-sos',
    'https://probashi-hub.vercel.app/law-academy',
    'https://probashi-hub.vercel.app/arabic-letter-generator',
    'https://probashi-hub.vercel.app/iqama-fee-calculator',
    'https://probashi-hub.vercel.app/driving-license-test',
    'https://probashi-hub.vercel.app/advertise',
    'https://probashi-hub.vercel.app/about',
    'https://probashi-hub.vercel.app/contact',
    'https://probashi-hub.vercel.app/privacy',
    'https://probashi-hub.vercel.app/terms',
    'https://probashi-hub.vercel.app/ads.txt',
    'https://probashi-hub.vercel.app/feed.xml',
    'https://probashi-hub.vercel.app/og-image.png',
    'https://probashi-hub.vercel.app/admin',
]

# Add all 17 category pages
for cat_id in range(1, 18):
    endpoints.append(f"https://probashi-hub.vercel.app/categories/{cat_id}")

# Add all 50 service pages
for p in problems:
    endpoints.append(f"https://probashi-hub.vercel.app/services/{p['slug']}")

print(f"Auditing {len(endpoints)} live production endpoints on https://probashi-hub.vercel.app ...")

failed = []
passed = 0

for url in endpoints:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status == 200:
                passed += 1
            else:
                failed.append((url, resp.status))
    except Exception as e:
        failed.append((url, str(e)))

print(f"\nAUDIT SUMMARY:")
print(f"Total Checked: {len(endpoints)}")
print(f"Passed (200 OK): {passed}")
print(f"Failed: {len(failed)}")

if failed:
    print("\nFailed URLs:")
    for f_url, err in failed:
        print(f"  - {f_url} : {err}")
else:
    print("\n[SUCCESS] ALL 62 ENDPOINTS ON VERCEL ARE 100% HEALTHY (HTTP 200 OK)!")
