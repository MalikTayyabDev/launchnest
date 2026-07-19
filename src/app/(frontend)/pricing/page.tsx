import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { PricingTier } from "@/components/PricingTier";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { packages, maintenancePlans } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting ranges for websites and platforms, plus recurring maintenance plans. Priced to pre-qualify, not to surprise you.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Clear starting ranges. No surprise invoices.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            These are current starting ranges, not fixed quotes — the final number
            depends on scope, which we&apos;ll pin down on a call. Showing ranges up
            front saves everyone time.
          </p>
        </div>
      </Section>

      {/* Build packages */}
      <Section tone="white">
        <Eyebrow>Build packages</Eyebrow>
        <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
          One-time builds
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {packages.map((pkg, i) => (
            <Reveal key={pkg.name} delay={i * 0.08}>
              <PricingTier
                name={pkg.name}
                range={pkg.range}
                summary={pkg.summary}
                features={pkg.features}
                featured={pkg.featured}
                cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Maintenance plans */}
      <Section tone="offwhite">
        <div className="max-w-2xl">
          <Eyebrow>Recurring</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            Maintenance plans
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            The build is the start, not the end. Keep your platform patched, backed up,
            and monitored — with someone who already knows your stack.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {maintenancePlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <PricingTier
                name={plan.name}
                range={plan.price}
                summary={plan.summary}
                features={plan.features}
                recurring
                cta={{ label: "Get a Free Speed & Security Report", href: "/contact" }}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* FAQ / qualification note */}
      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              Why ranges instead of fixed prices?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate">
              A five-page brochure site and a ten-page CMS-driven store are both
              &ldquo;a website,&rdquo; but they aren&apos;t the same job. Ranges let you
              self-select the right tier before we ever get on a call — so the call is
              about your problem, not a pricing dance.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-semibold text-navy">
              What happens on the audit call?
            </h3>
            <p className="mt-3 text-base leading-relaxed text-slate">
              We look at your current site (or your plan for one), tell you what&apos;s
              working, what&apos;s broken, and what it would realistically cost to fix.
              You leave with a clear picture whether or not you hire us.
            </p>
          </div>
        </div>
      </Section>

      <CTASection
        heading="Know your range? Let's talk specifics."
        body="Book a free technical audit and we'll turn a range into a real, scoped number."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
      />
    </>
  );
}
