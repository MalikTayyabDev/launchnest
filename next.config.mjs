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
    // Allow CMS media served from Vercel Blob.
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
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
};

export default withPayload(nextConfig);
