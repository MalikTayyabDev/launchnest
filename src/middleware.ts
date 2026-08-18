import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  APEX_HOST,
  CANONICAL_HOST,
  LEGACY_VERCEL_HOST,
} from "@/lib/site-origins";

/** Permanent redirect to the canonical www HTTPS origin (SEO + single origin for GSC). */
function redirectToCanonical(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.protocol = "https:";
  url.host = CANONICAL_HOST;
  return NextResponse.redirect(url, 301);
}

function forwardedProto(request: NextRequest): string {
  const raw = request.headers
    .get("x-forwarded-proto")
    ?.split(",")[0]
    ?.trim()
    .toLowerCase();
  return raw || request.nextUrl.protocol.replace(":", "");
}

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase() ?? "";
  const proto = forwardedProto(request);

  if (host === APEX_HOST || host === LEGACY_VERCEL_HOST) {
    return redirectToCanonical(request);
  }

  // Force HTTPS on the canonical host if the edge still forwards HTTP.
  if (host === CANONICAL_HOST && proto === "http") {
    return redirectToCanonical(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except Next internals and static file extensions.
     * Include robots.txt + sitemap.xml so apex requests also redirect to www.
     */
    "/((?!_next/static|_next/image|favicon.ico|icon.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff2?)$).*)",
  ],
};
