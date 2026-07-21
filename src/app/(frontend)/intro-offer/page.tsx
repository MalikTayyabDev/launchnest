import type { Metadata } from "next";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { FAQ } from "@/components/FAQ";
import { IntroOfferForm } from "@/components/IntroOfferForm";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import {
  getIntroOfferSettings,
  introOfferFaqs,
  introOfferNotIncluded,
  introOfferScope,
  introOfferWhatsappLink,
  INTRO_OFFER_PRICE,
} from "@/lib/intro-offer";

/** Always read live slot counts from the admin global. */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Intro offer — $20 landing page",
  description:
    "Limited first-client rate: a template-based landing page delivered in 3 business days for $20. Fixed scope, limited slots — building LaunchNest's review portfolio.",
  alternates: { canonical: "/intro-offer" },
};

export default async function IntroOfferPage() {
  const settings = await getIntroOfferSettings();

  return (
    <>
      <Section tone="offwhite">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <Eyebrow>Limited intro rate</Eyebrow>
            {settings.accepting ? (
              <span className="mb-4 inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-navy">
                {settings.slotsRemaining} of {settings.maxSlots} slots open
              </span>
            ) : (
              <span className="mb-4 inline-flex items-center rounded-full border border-navy/15 bg-white px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider text-slate">
                Intro slots full
              </span>
            )}
            <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
              A live landing page for {INTRO_OFFER_PRICE}.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-slate">
              A limited first-clients rate while LaunchNest builds public reviews
              and case studies. Fixed scope, template-based, delivered in{" "}
              <strong className="font-semibold text-navy">3 business days</strong> — so
              you get a fast yes and we get proof we can show the next client.
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate">
              This is <em>not</em> our standard pricing. Standard builds start from
              $79 once intro slots are gone.
            </p>
            {settings.accepting && (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button href="#claim" variant="primary">
                  Claim an intro slot
                </Button>
                <a
                  href={introOfferWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-navy/20 px-6 py-3 font-heading text-sm font-semibold text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  WhatsApp us
                </a>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-navy/10 bg-white p-8 shadow-lg">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
              At a glance
            </p>
            <dl className="mt-6 space-y-5">
              {[
                ["Price", `${INTRO_OFFER_PRICE} flat (intro rate)`],
                ["Timeline", "3 business days"],
                ["Build", "Template-based · up to 3 sections"],
                ["Revisions", "1 round included"],
                ["Best for", "First hire · fast launch · review swap"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="font-mono text-xs uppercase tracking-wider text-slate">
                    {label}
                  </dt>
                  <dd className="mt-1 font-heading text-lg font-semibold text-navy">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Scope</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              What&apos;s included
            </h2>
            <ul className="mt-8 flex flex-col gap-4">
              {introOfferScope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-slate">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-confirm"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Boundaries</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              Not included
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Extra scope is quoted at standard rates — no surprises, but no free
              extras either.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {introOfferNotIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-slate">
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-navy/25"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="navy">
        <div className="max-w-3xl">
          <Eyebrow onNavy>The real deliverable</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-offwhite sm:text-4xl">
            You get a live page. We get proof.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-offwhite/70">
            At this stage we&apos;re pricing for volume and reviews, not margin. After
            delivery we ask for an honest review with specifics — what problem was
            solved, how fast it shipped, what it was like to work together — plus
            permission to show the project in our portfolio.
          </p>
          <p className="mt-4 text-base leading-relaxed text-offwhite/60">
            Payment is upfront (Upwork/Fiverr escrow, PayPal, or Wise) before work
            starts. We confirm your slot and scope in writing before you pay.
          </p>
        </div>
      </Section>

      <Section tone="offwhite" id="claim">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Get started</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              {settings.accepting ? "Request your intro slot" : "Intro slots are full"}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {settings.accepting
                ? "Tell us what you need. We'll reply within one business day to confirm availability, scope, and payment — usually faster on WhatsApp."
                : "We've hit our intro cap. Standard landing pages and full sites are still available at regular pricing."}
            </p>
            {settings.accepting && (
              <ol className="mt-8 flex flex-col gap-4 text-base text-slate">
                {[
                  "Submit the form or WhatsApp us",
                  "We confirm slot + scope (same day)",
                  "You pay $20 upfront",
                  "Page live in 3 business days",
                  "One revision round if needed",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4">
                    <span className="font-mono text-sm font-bold text-gold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            )}
          </div>
          <Reveal>
            <IntroOfferForm accepting={settings.accepting} />
          </Reveal>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
              Before you book
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Still unsure?{" "}
              <Link
                href="/portfolio"
                className="text-navy underline decoration-gold underline-offset-2"
              >
                See our live work
              </Link>{" "}
              or{" "}
              <Link
                href="/contact"
                className="text-navy underline decoration-gold underline-offset-2"
              >
                book a free audit
              </Link>{" "}
              for a bigger project.
            </p>
          </div>
          <FAQ items={introOfferFaqs} />
        </div>
      </Section>
    </>
  );
}
