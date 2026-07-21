import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import { spaceGrotesk, inter, jetbrainsMono } from "../fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ChatAgent } from "@/components/chat/ChatAgent";
import { IntroOfferBanner } from "@/components/IntroOfferBanner";
import { JsonLd } from "@/components/JsonLd";
import { siteConfig, brandAssets } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Build · Optimize · Launch`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "web agency",
    "technical partner",
    "website maintenance",
    "Shopify development",
    "WordPress development",
    "Webflow development",
    "Core Web Vitals",
    "technical SEO",
  ],
  openGraph: {
    type: "website",
    title: `${siteConfig.name} — Build · Optimize · Launch`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: brandAssets.horizontalWhite.path,
        width: brandAssets.horizontalWhite.width,
        height: brandAssets.horizontalWhite.height,
        alt: brandAssets.horizontalWhite.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Build · Optimize · Launch`,
    description: siteConfig.description,
    images: [brandAssets.horizontalWhite.path],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0B1F3A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-body">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:font-heading focus:text-sm focus:text-offwhite"
        >
          Skip to content
        </a>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={websiteSchema()} />
        <Header />
        <IntroOfferBanner />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <ChatAgent />
        <WhatsAppButton />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
