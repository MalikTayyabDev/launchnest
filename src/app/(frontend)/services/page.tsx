import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { TechStacksSection } from "@/components/TechStacksSection";
import { JsonLd } from "@/components/JsonLd";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { breadcrumbSchema, selfCanonical } from "@/lib/seo";

const seo = selfCanonical("/services");

export const metadata: Metadata = {
  title: {
    absolute:
      "Software Development & Engineering Services for SaaS & AI Startups",
  },
  description:
    "Software development & engineering for SaaS and AI startups from LaunchNest at launch-nest.com — with SaaS site engineering, UI/UX, technical SEO, and AI automation. One partner from launch through scale.",
  keywords: [
    "website development services",
    "graphic design for startups",
    "UI UX design agency",
    "software development agency",
    "engineering partner",
    "SaaS website development",
    "technical SEO agency",
    "launch-nest.com",
  ],
  alternates: { canonical: seo.canonical },
  openGraph: {
    ...seo.openGraph,
    title:
      "Software Development & Engineering Services for SaaS & AI Startups",
    description:
      "Engineering-first digital services for SaaS and AI startups from LaunchNest at launch-nest.com.",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Software development & engineering services — for SaaS, AI, and custom product builds.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            {siteConfig.positioning.sell} Capabilities span branding, UI/UX,
            SaaS website development, custom software surfaces, content, technical SEO,
            QA, deployment, AI integrations, automation, and ongoing maintenance —
            on Next.js, WordPress, Shopify, Webflow, Wix, GoHighLevel, and custom
            stacks when your roadmap needs it.
          </p>
        </div>
      </Section>

      <TechStacksSection tone="white" showCta={false} />

      <Section tone="offwhite">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <ServiceCard
                label={s.label}
                description={s.shortDescription}
                href={`/services/${s.slug}`}
                index={`0${i + 1}`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        heading="Not sure which solution you need?"
        body="Book a free growth audit — we'll map the fastest path to leads, conversion, and a stack you can scale."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
