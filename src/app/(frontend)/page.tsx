import { Hero } from "@/components/Hero";
import { HeroLeadForm } from "@/components/HeroLeadForm";
import { Section, Eyebrow } from "@/components/Section";
import { StatCallout } from "@/components/StatCallout";
import { ServiceCard } from "@/components/ServiceCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { Button } from "@/components/Button";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { GrowthAuditAgenda } from "@/components/GrowthAuditAgenda";
import { getAllCaseStudies } from "@/lib/content";
import { primaryCta, siteConfig } from "@/lib/site";
import { selfCanonical } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";

const homeCanonical = selfCanonical("/");

const homeTitle = "Software Development for SaaS & AI | LaunchNest";
const homeDescription = siteConfig.description;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: homeDescription,
  alternates: { canonical: homeCanonical.canonical },
  openGraph: {
    ...homeCanonical.openGraph,
    title: homeTitle,
    description: homeDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: homeTitle,
    description: homeDescription,
  },
};

const pillars = [
  {
    label: "Performance & technical SEO",
    icon: "optimize" as const,
    description:
      "Core Web Vitals, indexing, and conversion fixes on the pages that already get traffic — measurable before/after.",
    href: "/services/seo",
  },
  {
    label: "Custom builds & integrations",
    icon: "build" as const,
    description:
      "SaaS marketing sites and product surfaces with real hooks — payments, CRM, analytics — beyond page-builder tweaks.",
    href: "/services/website-design-dev",
  },
  {
    label: "Automation & retainers",
    icon: "launch" as const,
    description:
      "Lead routing, AI assist, and monthly care so speed, SEO, and demos keep improving after launch day.",
    href: "/services/maintenance-support",
  },
];

const positioning =
  "We are a software development partner for SaaS and AI startups. We sell results you can measure — faster pages, clearer demos, cleaner indexing — and stay accountable on retainer.";

const trustSignals = [
  { label: "SaaS & AI focus", href: "/for/saas" },
  { label: "Growth audit", href: "/for/website-audit" },
  { label: "Retainers", href: "/pricing" },
  { label: "Live proof", href: "/portfolio" },
];

const process = [
  {
    step: "01",
    title: "Audit",
    body: "Live URL review: speed, messaging, technical SEO, and what is blocking demos or trials.",
  },
  {
    step: "02",
    title: "Fix or build",
    body: "Ship the highest-leverage work first — performance, conversion, or a scoped custom build.",
  },
  {
    step: "03",
    title: "Automate",
    body: "Wire lead capture, CRM, and light AI workflows so pipeline does not die in inboxes.",
  },
  {
    step: "04",
    title: "Retain",
    body: "Monthly care for monitoring, SEO, and iteration — trust compounds with accountability.",
  },
];

const homeFaqs = [
  {
    q: "Who do you work with for the next 90 days?",
    a: `SaaS and AI startups in the UK, US, and Australia — ${siteConfig.positioning.niche90Days}. That matches our positioning and where custom engineering plus retainers create the most value.`,
  },
  {
    q: "What do you sell first?",
    a: "A free growth audit, then productized work: speed + technical SEO fixes, custom SaaS marketing builds, automation setups, and monthly care retainers. Brochure theme tweaks are not the headline offer.",
  },
  {
    q: "Are you a cheap $20 website shop?",
    a: "No. A limited proof-builder landing page may exist while we collect early reviews — it has an expiry and is not our identity. Standard work starts with audit-led fixes and custom builds priced for outcomes.",
  },
  {
    q: "Which stacks do you specialize in?",
    a: "We lead with custom / headless-friendly builds and Next.js when the product needs it, plus disciplined WordPress and Webflow when editors need ownership. We do not market ourselves as a five-platform generalist.",
  },
  {
    q: "How do I contact you?",
    a: `Email ${siteConfig.email} or book a free growth audit. We typically reply within one business day.`,
  },
];

const socialProof = [
  { value: "Audit-first", label: "Diagnose the live URL before pitching" },
  { value: "< 2.5s", label: "LCP standard we ship to" },
  { value: "Retainers", label: "Care after launch — not a disappearing act" },
  { value: "1 day", label: "Typical reply time" },
];

export const revalidate = 60;

export default async function HomePage() {
  const caseStudies = await getAllCaseStudies();

  const featuredStudies = [
    ...caseStudies.filter((c) => c.industry === "SaaS"),
    ...caseStudies.filter((c) => c.industry !== "SaaS"),
  ].slice(0, 3);

  return (
    <>
      <Hero
        eyebrow={siteConfig.positioning.label}
        headline="Performance, SEO, and custom builds for SaaS and AI."
        subhead="LaunchNest helps product teams turn visitors into demos — then stays for technical SEO, automation, and retainers. One narrow focus for the next 90 days: SaaS and AI startups."
        trustLine="UK · US · Australia · Audit-led · Retainer-backed"
        cta={primaryCta}
        aside={<HeroLeadForm />}
      />

      <div className="border-y border-navy/8 bg-white">
        <div className="mx-auto grid w-full max-w-content grid-cols-2 gap-8 px-6 py-12 sm:grid-cols-4 lg:px-8">
          {socialProof.map((s) => (
            <StatCallout key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>

      <div className="border-b border-navy/8 bg-[var(--color-paper)]">
        <div className="mx-auto w-full max-w-content px-6 py-7 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {trustSignals.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-heading text-sm font-medium tracking-wide text-navy/65 transition-colors hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Section tone="white">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Live proof</Eyebrow>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Open the sites. Then read the story.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Production work you can verify — problem, what we shipped, and checkable
              outcomes. We are collecting before/after metrics on every new engagement.
            </p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Button href="/portfolio" variant="ghost">
              Full portfolio
            </Button>
          </div>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {featuredStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <CaseStudyCard study={study} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 sm:hidden">
          <Button href="/portfolio" variant="primary" className="w-full">
            Full portfolio
          </Button>
        </div>
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-xl">
            <Eyebrow>Who we serve</Eyebrow>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              One customer for 90 days: SaaS and AI startups.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {siteConfig.positioning.sell} Local brochure work is not how we lead the
              brand — higher-value product teams are.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-slate">
              <li className="flex gap-3 border-t border-navy/10 pt-3">
                <span className="font-mono text-[11px] text-gold">01</span>
                <span>
                  <strong className="font-heading text-navy">Email </strong>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="underline decoration-gold underline-offset-2"
                  >
                    {siteConfig.email}
                  </a>
                </span>
              </li>
              <li className="flex gap-3 border-t border-navy/10 pt-3">
                <span className="font-mono text-[11px] text-gold">02</span>
                <span>
                  <strong className="font-heading text-navy">Reviews </strong>
                  <a
                    href={siteConfig.googleBusiness}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-gold underline-offset-2"
                  >
                    Google Business Profile
                  </a>
                </span>
              </li>
              <li className="flex gap-3 border-t border-navy/10 pt-3">
                <span className="font-mono text-[11px] text-gold">03</span>
                <Link href="/about" className="font-heading font-semibold text-navy">
                  About LaunchNest →
                </Link>
              </li>
            </ul>
          </div>
          <div className="surface-panel rounded-sm p-8 sm:p-10">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate/70">
              Start here
            </p>
            <p className="mt-3 font-heading text-2xl font-semibold text-navy">
              Free growth audit
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate">
              Speed, messaging, technical SEO, stack fit, prioritized next steps —
              whether you hire us or not.
            </p>
            <div className="mt-8">
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>What we sell</Eyebrow>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            The mathematics layer — results, not theme tweaks.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Performance, technical SEO, custom engineering, automation, and retainers.
            That is the work AI commoditizes slowest — and where we double down.
          </p>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <ServiceCard
                label={p.label}
                description={p.description}
                href={p.href}
                icon={p.icon}
                index={`0${i + 1}`}
              />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="paper">
        <div className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
            Audit → ship → automate → retain.
          </h2>
        </div>
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <div className="border-t border-navy/15 pt-5">
                <span className="font-mono text-xs font-medium tracking-[0.16em] text-gold">
                  {p.step}
                </span>
                <h3 className="mt-3 font-heading text-lg font-semibold text-navy">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <section className="bg-navy">
        <div className="mx-auto w-full max-w-content px-6 py-24 lg:px-8">
          <span className="mb-8 block h-px w-12 bg-gold" aria-hidden="true" />
          <Reveal>
            <p className="max-w-3xl font-heading text-2xl font-medium leading-snug tracking-tight text-offwhite sm:text-3xl lg:text-[2.15rem]">
              {positioning}
            </p>
          </Reveal>
          <span className="mt-8 block h-px w-12 bg-gold" aria-hidden="true" />
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
              Straight answers.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-navy underline decoration-gold underline-offset-2"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
          <FAQ items={homeFaqs} withSchema />
        </div>
      </Section>

      <Section tone="paper" id="audit-form">
        <GrowthAuditAgenda />
      </Section>

      <CTASection
        heading="Book a free growth audit"
        body="We walk your live site against a fixed agenda and leave prioritized next steps — usually within one business day."
        cta={primaryCta}
      />
    </>
  );
}
