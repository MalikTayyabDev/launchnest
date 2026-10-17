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
import Link from "next/link";

const seo = selfCanonical("/services");
const servicesTitle = "Software Development Agency Services | LaunchNest";
const servicesDescription =
  "Software development agency services for SaaS and AI startups — product engineering, UI/UX, technical SEO, and AI automation from LaunchNest.";

export const metadata: Metadata = {
  title: { absolute: servicesTitle },
  description: servicesDescription,
  alternates: { canonical: seo.canonical },
  openGraph: {
    ...seo.openGraph,
    title: servicesTitle,
    description: servicesDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: servicesTitle,
    description: servicesDescription,
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
            Software development agency services for SaaS and AI.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            {siteConfig.positioning.sell} Explore capabilities below, or start with our{" "}
            <Link
              href="/for/software-development-agency"
              className="font-semibold text-navy underline decoration-gold underline-offset-2"
            >
              software development agency overview
            </Link>
            .
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.06}>
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

      <TechStacksSection tone="white" />

      <CTASection
        heading="Compare software development agencies with a live URL audit"
        body="Book a free growth audit — we review speed, messaging, SEO, and stack fit before anyone pitches a rebuild."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
      />
    </>
  );
}
