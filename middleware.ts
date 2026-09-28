import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const configuredFile = process.env.GOOGLE_VERIFICATION_FILENAME;

  // Only respond 200 if the exact configured verification file is requested.
  // Never wildcard-respond, as Google flags wildcard catch-alls as compromised/hacked sites.
  if (configuredFile && pathname === `/${configuredFile}`) {
    return new NextResponse(`google-site-verification: ${configuredFile}`, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
