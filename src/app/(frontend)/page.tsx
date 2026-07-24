import { Hero } from "@/components/Hero";
import { HeroLeadForm } from "@/components/HeroLeadForm";
import { NextStepsStrip } from "@/components/NextStepsStrip";
import { Section, Eyebrow } from "@/components/Section";
import { StatCallout } from "@/components/StatCallout";
import { ServiceCard } from "@/components/ServiceCard";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Button } from "@/components/Button";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { getAllCaseStudies } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";
import { primaryCta, siteConfig } from "@/lib/site";
import { selfCanonical } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";

const homeCanonical = selfCanonical("/");

export const metadata: Metadata = {
  title: {
    absolute:
      "LaunchNest — Engineering-First Digital Solutions for SaaS & Startups",
  },
  description: siteConfig.description,
  alternates: { canonical: homeCanonical.canonical },
  openGraph: {
    ...homeCanonical.openGraph,
    title:
      "LaunchNest — Engineering-First Digital Solutions for SaaS & Startups",
    description: siteConfig.description,
  },
};

const pillars = [
  {
    label: "Launch",
    icon: "build" as const,
    description:
      "Brand, UI/UX, and engineering for SaaS marketing sites, startup MVPs, and conversion-focused launches — end-to-end, one partner.",
    href: "/services/website-design-dev",
  },
  {
    label: "Grow",
    icon: "optimize" as const,
    description:
      "Technical SEO, content, speed, AI integrations, and conversion work that turns traffic into pipeline — not vanity metrics.",
    href: "/services/seo",
  },
  {
    label: "Scale",
    icon: "launch" as const,
    description:
      "QA, hosting & deployment, automation, CRM, and retainers so your digital presence keeps compounding after launch.",
    href: "/services/maintenance-support",
  },
];

const positioning =
  "LaunchNest is an engineering-first growth partner for SaaS companies, AI startups, and agencies. We don't sell websites. We sell lead generation, conversion, SEO visibility, and long-term partnership — through modern design, engineering, and systems that scale.";

const trustSignals = [
  { label: "SaaS companies", href: "/for/saas" },
  { label: "AI startups", href: "/for/ai-startups" },
  { label: "Tech startups", href: "/for/ai-startups" },
  { label: "Agencies", href: "/services" },
];

const capabilitySignals = [
  "Next.js",
  "WordPress",
  "Shopify",
  "Webflow",
  "Wix",
  "GoHighLevel",
  "AI & Automation",
];

const process = [
  {
    step: "01",
    title: "Discover",
    body: "Free growth audit — we map goals, bottlenecks, and the fastest path to leads and conversion.",
  },
  {
    step: "02",
    title: "Plan",
    body: "A clear scope: branding, UI/UX, engineering, content, SEO, QA, and deployment — prioritized by business impact.",
  },
  {
    step: "03",
    title: "Build",
    body: "We execute end-to-end: design systems, engineering, integrations, and launch-ready performance standards.",
  },
  {
    step: "04",
    title: "Partner",
    body: "Retainers for SEO, maintenance, AI/automation, and growth work — so results compound after day one.",
  },
];

const homeFaqs = [
  {
    q: "Are you a WordPress or Shopify agency?",
    a: "No. We are an engineering-first digital solutions agency. WordPress, Shopify, Webflow, Wix, GoHighLevel, and Next.js are capabilities we use when they fit — we never position ourselves as a single-platform shop.",
  },
  {
    q: "Who do you work with?",
    a: "Primary clients are SaaS companies, AI and tech startups, and agencies. We also partner with growing businesses when the fit is right — but product and growth teams are our core.",
  },
  {
    q: "What do you actually sell?",
    a: "Growth outcomes — lead generation, better UX, faster sites, higher conversion, premium branding, SEO visibility, and long-term partnership. The website or product is the vehicle, not the pitch.",
  },
  {
    q: "Do you only build new sites?",
    a: "No. We launch new products, redesign underperforming sites, optimize speed and SEO, add AI/automation, and run ongoing care retainers.",
  },
  {
    q: "Do you work with clients in the UK, US, and Australia?",
    a: "Yes. We work across English-speaking markets and structure sites, SEO, and messaging for those regions.",
  },
];

const socialProof = [
  { value: "100+", label: "Projects shipped" },
  { value: "< 2.5s", label: "LCP standard" },
  { value: "1 day", label: "Typical reply time" },
  { value: "est. 2022", label: "Building since" },
];

export const revalidate = 60;

export default async function HomePage() {
  const [caseStudies, featuredProjects] = await Promise.all([
    getAllCaseStudies(),
    getFeaturedProjects(3),
  ]);

  const featuredStudies = [
    ...caseStudies.filter((c) => c.industry === "SaaS"),
    ...caseStudies.filter((c) => c.industry !== "SaaS"),
  ].slice(0, 3);

  return (
    <>
      <Hero
        eyebrow={siteConfig.positioning.label}
        headline="The growth partner for SaaS and AI startups."
        subhead="Engineering-first design, development, SEO, and AI — so your product presence converts trials, demos, and pipeline. One accountable partner from launch through scale."
        trustChips={[
          "SaaS · AI · Agencies",
          "100+ projects shipped",
          "UK · US · AU",
          "Reply in 1 business day",
        ]}
        secondaryCta={{ label: "See outcomes", href: "/portfolio" }}
        cta={primaryCta}
        aside={<HeroLeadForm />}
      />

      <NextStepsStrip />

      <div className="border-y border-navy/10 bg-offwhite">
        <div className="mx-auto grid w-full max-w-content grid-cols-2 gap-6 px-6 py-10 sm:grid-cols-4 lg:px-8">
          {socialProof.map((s) => (
            <StatCallout key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </div>

      <div className="border-b border-navy/10 bg-white">
        <div className="mx-auto w-full max-w-content px-6 py-6 lg:px-8">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-slate">
            Built for the clients we partner with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustSignals.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-heading text-sm font-semibold tracking-tight text-navy/70 transition-colors hover:text-gold"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <p className="mb-3 mt-8 text-center font-mono text-xs uppercase tracking-[0.16em] text-slate">
            Capabilities we engineer with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {capabilitySignals.map((item) => (
              <span
                key={item}
                className="font-mono text-xs font-medium tracking-wide text-slate"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Launch. Grow. Scale.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            End-to-end execution — branding, UI/UX, engineering, content, SEO, QA,
            deployment, and maintenance — so you are not coordinating five vendors
            to ship one digital product.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
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

      <Section tone="offwhite">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Outcomes</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Proof before pretty screenshots.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Situation, work, and metrics — the stories serious buyers actually need.
            </p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Button href="/portfolio" variant="ghost">
              View all work
            </Button>
          </div>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredStudies.map((study, i) => (
            <Reveal key={study.slug} delay={i * 0.06}>
              <CaseStudyCard study={study} priority={i === 0} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 sm:hidden">
          <Button href="/portfolio" variant="primary" className="w-full">
            View all work
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            From first conversation to long-term growth partner.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            A clear path designed for founders and operators who care about results —
            not deliverable theater.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <Reveal key={p.step} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-lg border border-navy/10 bg-offwhite p-6">
                <span className="font-mono text-sm font-bold text-gold">{p.step}</span>
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
          <span className="mb-8 block h-0.5 w-14 bg-gold" aria-hidden="true" />
          <Reveal>
            <p className="max-w-4xl font-heading text-2xl font-medium leading-snug tracking-tight text-offwhite sm:text-3xl lg:text-4xl">
              {positioning}
            </p>
          </Reveal>
          <span className="mt-8 block h-0.5 w-14 bg-gold" aria-hidden="true" />
        </div>
      </section>

      <Section tone="offwhite">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Live builds</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Sites in production across stacks.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Platforms are tools. Every card links to a live site.
            </p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Button href="/portfolio" variant="ghost">
              View full portfolio
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((item, i) => (
            <Reveal key={item.url} delay={i * 0.06}>
              <PortfolioCard item={item} priority={i < 2} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Button href="/portfolio" variant="primary" className="w-full">
            View full portfolio
          </Button>
        </div>
      </Section>

      {caseStudies.some((c) => c.quote.text) && (
        <Section tone="white">
          <div className="max-w-2xl">
            <Eyebrow>In their words</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The part clients actually remember.
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies
              .filter((c) => c.quote.text)
              .slice(0, 3)
              .map((c, i) => (
                <Reveal key={c.slug} delay={i * 0.08}>
                  <TestimonialQuote
                    text={c.quote.text}
                    name={c.quote.name}
                    role={c.quote.role}
                  />
                </Reveal>
              ))}
          </div>
        </Section>
      )}

      <Section tone="offwhite">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The questions serious buyers ask first.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Something we didn&apos;t cover?{" "}
              <a
                href="/contact"
                className="text-navy underline decoration-gold underline-offset-2"
              >
                Ask us directly.
              </a>
            </p>
          </div>
          <FAQ items={homeFaqs} withSchema />
        </div>
      </Section>

      <CTASection
        heading="Ready to launch or scale with an engineering-first partner?"
        body="Book a free growth audit. We'll tell you what's blocking leads, conversion, and speed — no sales script."
        cta={primaryCta}
        secondaryCta={{ label: "See solutions", href: "/services" }}
      />
    </>
  );
}
