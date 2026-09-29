import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Defense 1: Block suspicious Path Traversal, SQLi, and Script injection probes
  const rawUrl = `${pathname}${search}`.toLowerCase();
  const dangerousPatterns = [
    "../",
    "..\\",
    "<script",
    "%3cscript",
    "union+select",
    "union%20select",
    "etc/passwd",
    ".env",
    "wp-admin",
    "phpmyadmin",
  ];

  for (const pattern of dangerousPatterns) {
    if (rawUrl.includes(pattern)) {
      return new NextResponse("Access Denied: Security Violation Detected.", {
        status: 403,
        headers: { "Content-Type": "text/plain" },
      });
    }
  }

  // Google Search Console verification file
  if (pathname === "/google2b521bc0d95a7f90.html") {
    return new NextResponse("google-site-verification: google2b521bc0d95a7f90.html", {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  const response = NextResponse.next();

  // Defense 2: Strict Security & Privacy Response Headers
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), browsing-topics=()"
  );
  response.headers.set(
    "Strict-Transport-Security",
    "max-age=63072000; includeSubDomains; preload"
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
