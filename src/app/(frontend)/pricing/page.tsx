import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { PricingTier } from "@/components/PricingTier";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { CustomOfferForm } from "@/components/CustomOfferForm";
import { JsonLd } from "@/components/JsonLd";
import { packages, maintenancePlans } from "@/lib/pricing";
import { primaryCta, whatsappLink } from "@/lib/site";
import { breadcrumbSchema, selfCanonical } from "@/lib/seo";
import Link from "next/link";

const seo = selfCanonical("/pricing");
const pricingTitle = "Pricing — Speed Fixes, Builds & Retainers | LaunchNest";
const pricingDescription =
  "Productized pricing for SaaS and AI teams: speed + SEO fixes, custom marketing builds, and monthly care retainers. Book a free growth audit first.";

export const metadata: Metadata = {
  title: { absolute: pricingTitle },
  description: pricingDescription,
  alternates: { canonical: seo.canonical },
  openGraph: {
    ...seo.openGraph,
    title: pricingTitle,
    description: pricingDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: pricingTitle,
    description: pricingDescription,
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Pricing", path: "/pricing" },
        ])}
      />
      <Section tone="paper">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-navy sm:text-5xl">
            Productized offers. Retainers that stick.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            We lead with measurable fixes and ongoing care — not race-to-the-bottom
            brochure sites. Final scope is pinned after a free growth audit. A limited{" "}
            <Link
              href="/intro-offer"
              className="font-semibold text-navy underline decoration-gold underline-offset-2"
            >
              proof-builder landing page
            </Link>{" "}
            may still exist while we collect early reviews; it is not our identity.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <Eyebrow>Fixed-scope work</Eyebrow>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy">
          One-time engagements
        </h2>
        <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:items-stretch">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <PricingTier
                name={pkg.name}
                range={pkg.range}
                typical={pkg.typical}
                summary={pkg.summary}
                features={pkg.features}
                featured={pkg.featured}
                cta={primaryCta}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <Eyebrow>Recurring</Eyebrow>
        <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy">
          Monthly care — the AI-resistant revenue
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate">
          Trust and accountability do not get replaced by a template. Aim to grow the
          share of revenue that is recurring.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {maintenancePlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <PricingTier
                name={plan.name}
                range={plan.price}
                typical={plan.typical}
                summary={plan.summary}
                features={plan.features}
                cta={{ label: "Ask about retainers", href: "/contact" }}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Eyebrow>Custom scope</Eyebrow>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy">
              Need something outside the packages?
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Send a brief — automation, AI assist, or a larger product surface. We
              reply with fit and a deposit-backed proposal.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block font-heading text-sm font-semibold text-navy underline decoration-gold underline-offset-4"
            >
              Or message on WhatsApp
            </a>
          </div>
          <CustomOfferForm />
        </div>
      </Section>

      <CTASection
        heading="Start with a free growth audit"
        body="We diagnose your live URL before anyone quotes a rebuild."
        cta={primaryCta}
      />
    </>
  );
}
