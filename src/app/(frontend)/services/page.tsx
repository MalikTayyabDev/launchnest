import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { selfCanonical } from "@/lib/seo";

const seo = selfCanonical("/services");

export const metadata: Metadata = {
  title: "Digital Product Engineering Services for SaaS & Startups",
  description:
    "Engineering-first digital product engineering services: SaaS website development, UI/UX, brand identity, AI automation, technical SEO, and website maintenance retainers.",
  alternates: { canonical: seo.canonical },
  openGraph: { ...seo.openGraph },
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Complete launch solutions — digital product engineering for SaaS and startups.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            {siteConfig.positioning.sell} Capabilities span branding, UI/UX,
            SaaS website development, content, technical SEO, QA, deployment, AI
            integrations, automation, and ongoing website maintenance retainers.
          </p>
        </div>
      </Section>

      <Section tone="white">
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
