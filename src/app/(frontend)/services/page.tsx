import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Build, optimize, and maintain premium web platforms. Website design & development, UI/UX, SEO, maintenance, and more — priced in clear ranges.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Everything your platform needs — from first build to year ten.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            We work as one technical partner across the whole lifecycle: design and
            build, then optimize and maintain. Each engagement is scoped to a specific
            outcome, not a vague deliverable.
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
        heading="Not sure which service you actually need?"
        body="Book a free technical audit and we'll tell you exactly what's worth doing — and what isn't."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
