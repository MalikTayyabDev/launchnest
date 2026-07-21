import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  APEX_HOST,
  CANONICAL_HOST,
  LEGACY_VERCEL_HOST,
} from "@/lib/site-origins";

/** Permanent redirect to the canonical www host (SEO + single origin for GSC). */
function redirectToCanonical(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = CANONICAL_HOST;
  return NextResponse.redirect(url, 308);
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";

  if (host === APEX_HOST) {
    return redirectToCanonical(request);
  }

  // Consolidate the old Vercel URL once the custom domain is live.
  if (host === LEGACY_VERCEL_HOST) {
    return redirectToCanonical(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except static assets and metadata routes that should stay
     * reachable on any host during DNS propagation.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
