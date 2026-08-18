import { withPayload } from "@payloadcms/next/withPayload";

// Baseline security headers applied to every response.
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

// Content-Security-Policy is applied only to the public marketing site.
// The Payload admin (/admin) and API are excluded because the admin relies on
// inline styles/scripts that a strict CSP would break.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  // Tree-shake large client libraries so only used exports ship to the browser.
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    // Serve next-gen formats; browsers fall back automatically.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images at the edge for 30 days.
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Allow CMS media: Vercel Blob CDN + same-origin Payload file routes.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "n8abscuqkk8r6asr.public.blob.vercel-storage.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.launch-nest.com",
        pathname: "/api/media/**",
      },
      {
        protocol: "https",
        hostname: "launch-nest.com",
        pathname: "/api/media/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // CSP for public routes only (exclude admin + api).
        source: "/((?!admin|api).*)",
        headers: [{ key: "Content-Security-Policy", value: contentSecurityPolicy }],
      },
    ];
  },
  async redirects() {
    const canonical = "https://www.launch-nest.com";
    /** 301 + absolute Location — GSC consolidates better than Next's default 308 + relative path. */
    const to = (source, destPath) => {
      const destination = `${canonical}${destPath}`;
      const noSlash = source.endsWith("/") ? source.slice(0, -1) : source;
      const withSlash = `${noSlash}/`;
      return [
        { source: noSlash, destination, statusCode: 301 },
        { source: withSlash, destination, statusCode: 301 },
      ];
    };

    return [
      // Collapse HTTPS apex → www in one hop (HTTP→HTTPS same-host is Vercel TLS; set
      // Domains → launch-nest.com → Redirect to www to collapse that hop too).
      {
        source: "/",
        has: [{ type: "host", value: "launch-nest.com" }],
        destination: `${canonical}/`,
        statusCode: 301,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "launch-nest.com" }],
        destination: `${canonical}/:path*`,
        statusCode: 301,
      },
      // Case study index lives inside Portfolio; detail pages stay at /work/:slug.
      ...to("/work", "/portfolio"),
      ...to("/services/social-media-management", "/services/ai-automation"),
      // Retired fictional case studies (GSC: Page with redirect). One-hop 301s including
      // trailing-slash variants so Google does not chain /path/ → /path → /portfolio.
      ...to("/work/brightpath-saas-onboarding", "/portfolio"),
      ...to("/work/meridian-legal-site", "/portfolio"),
      ...to("/work/northform-checkout-rebuild", "/portfolio"),
      ...to("/work/cadence-saas-performance", "/portfolio"),
      ...to("/work/harbour-goods-replatform", "/portfolio"),
    ];
  },
};

export default withPayload(nextConfig);
