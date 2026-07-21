import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { PricingTier } from "@/components/PricingTier";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { CustomOfferForm } from "@/components/CustomOfferForm";
import { packages, maintenancePlans } from "@/lib/pricing";
import { whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent starting ranges for launch and growth builds, plus recurring care retainers. Engineered for startups, SaaS, agencies, and growing businesses.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            Investment ranges for launch and growth.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            Starting ranges to pre-qualify fit — final scope is pinned on a call.
            We compete on outcomes and partnership, not race-to-the-bottom pricing.
          </p>
        </div>
      </Section>

      {/* Build packages */}
      <Section tone="white">
        <Eyebrow>Launch packages</Eyebrow>
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
                cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
              />
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-base text-slate">
          Something bigger, or a mix of the above?{" "}
          <a
            href="#custom-offer"
            className="font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold"
          >
            Get a custom offer &rarr;
          </a>
        </p>
        <p className="mt-4 text-sm text-slate">
          New to LaunchNest?{" "}
          <a
            href="/intro-offer"
            className="font-semibold text-navy underline decoration-gold underline-offset-4 hover:text-gold"
          >
            Limited $20 intro landing page
          </a>{" "}
          — first-client rate while slots are open (fixed scope, 3-day delivery).
        </p>
      </Section>

      {/* Custom offer */}
      <Section tone="navy" id="custom-offer">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow onNavy>Custom offer</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite">
              Tell us what you need. We&apos;ll price it around you.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-offwhite/70">
              Not every project fits a package. Share a few details and we&apos;ll put
              together a tailored scope and price — usually within one business day, with
              no obligation.
            </p>
            <ul className="mt-8 flex flex-col gap-3 text-offwhite/80">
              {[
                "Priced to your exact scope, not a fixed tier",
                "A clear breakdown of what's included",
                "Flexible payment options for larger builds",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
                  <span className="text-base">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-md border border-offwhite/25 px-5 py-3 font-heading text-sm font-semibold text-offwhite transition-colors hover:border-gold hover:text-gold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-5 w-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Or chat on WhatsApp
            </a>
          </div>
          <div className="rounded-xl bg-offwhite p-6 shadow-xl sm:p-8">
            <CustomOfferForm />
          </div>
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
        body="Book a Free Growth Audit and we'll turn a range into a real, scoped number."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
      />
    </>
  );
}
