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

const homeTitle = "LaunchNest — SaaS & AI Website Engineering Partner";
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
    label: "Build",
    icon: "build" as const,
    description:
      "SaaS marketing sites, product pages, and MVP shells engineered for demos and trials — not slide-deck mockups.",
    href: "/services/website-design-dev",
  },
  {
    label: "Improve",
    icon: "optimize" as const,
    description:
      "Speed, technical SEO, messaging, and conversion fixes on the pages that already get traffic.",
    href: "/services/seo",
  },
  {
    label: "Partner",
    icon: "launch" as const,
    description:
      "Ongoing care, QA, and iteration so the site keeps matching the product after launch day.",
    href: "/services/maintenance-support",
  },
];

const positioning =
  "We build and speed up SaaS and AI websites that turn visitors into demos. Clear offer, fast pages, honest stack choices — and a partner who stays after go-live.";

const trustSignals = [
  { label: "For SaaS", href: "/for/saas" },
  { label: "For AI startups", href: "/for/ai-startups" },
  { label: "Free growth audit", href: "/for/website-audit" },
];

const process = [
  {
    step: "01",
    title: "Audit",
    body: "We review your live URL: speed, messaging, SEO basics, and what is blocking demos or trials.",
  },
  {
    step: "02",
    title: "Plan",
    body: "A short scope ranked by impact — what to fix first, what can wait, and a clear budget range.",
  },
  {
    step: "03",
    title: "Ship",
    body: "Design and engineering on the stack that fits your team — Next.js when you need it, CMS when editors need ownership.",
  },
  {
    step: "04",
    title: "Stay",
    body: "Optional care and growth retainers for updates, performance, and SEO after launch.",
  },
];

const homeFaqs = [
  {
    q: "What do you actually build?",
    a: "SaaS and AI marketing sites, product pages, and conversion redesigns — plus the SEO and speed work that makes them useful. We also ship on WordPress, Shopify, or Webflow when that is the right tool for your editors and roadmap.",
  },
  {
    q: "Who is this for?",
    a: "Primarily SaaS companies, AI startups, and tech teams in the UK, US, and Australia. Agencies and ecommerce brands are a fit when the problem is the same: a site that needs to convert.",
  },
  {
    q: "Are you a cheap website shop?",
    a: "No. Homepage work is scoped for product and growth teams who care about demos, trials, and long-term ownership. Starter packages exist for focused scopes — we will tell you honestly if a $20 template page is or is not the right path.",
  },
  {
    q: "Do you only build new sites?",
    a: "No. Many engagements start with a growth audit on a live URL, then redesign, speed work, SEO, or ongoing care.",
  },
  {
    q: "How do I contact you?",
    a: `Email ${siteConfig.email}, book a free growth audit on the contact page, or WhatsApp for a quick question. We typically reply within one business day.`,
  },
];

const socialProof = [
  { value: "3", label: "Live case studies you can open" },
  { value: "< 2.5s", label: "LCP standard we ship to" },
  { value: "UK · US · AU", label: "Markets we write and build for" },
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
        headline="We build and speed up SaaS websites that turn visitors into demos."
        subhead="LaunchNest is the website engineering partner for SaaS and AI teams. Clear messaging, fast pages, and stacks your team can own — for buyers in the UK, US, and Australia."
        trustChips={["SaaS & AI focus", "UK · US · AU", "Next.js when it fits", "Reply in 1 business day"]}
        cta={primaryCta}
        aside={<HeroLeadForm />}
      />

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
        </div>
      </div>

      <Section tone="offwhite">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Live proof</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Open the sites. Then read the story.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Three production builds you can verify in one click — problem, what we
              shipped, and checkable outcomes. More work lives on the portfolio page.
            </p>
          </div>
          <div className="hidden shrink-0 sm:block">
            <Button href="/portfolio" variant="ghost">
              Full portfolio
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
            Full portfolio
          </Button>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="max-w-2xl">
            <Eyebrow>Who&apos;s behind this</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              A small engineering partner — not a faceless bid farm.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              {siteConfig.positioning.sell} Talk to a human who will review your live
              URL before pitching a package.
            </p>
            <ul className="mt-6 flex flex-col gap-3 text-sm text-slate">
              <li>
                <span className="font-heading font-semibold text-navy">Email: </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="underline decoration-gold underline-offset-2 hover:text-navy"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <span className="font-heading font-semibold text-navy">Reviews: </span>
                <a
                  href={siteConfig.googleBusiness}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-gold underline-offset-2 hover:text-navy"
                >
                  Google Business Profile
                </a>
              </li>
              <li>
                <Link
                  href="/about"
                  className="font-heading font-semibold text-navy underline decoration-gold underline-offset-2"
                >
                  About LaunchNest
                </Link>
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-navy/10 bg-offwhite p-8">
            <p className="font-heading text-lg font-bold text-navy">
              Prefer a short call first?
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate">
              Book the free growth audit — same agenda every time, no pitch deck
              theater.
            </p>
            <div className="mt-6">
              <Button href={primaryCta.href} variant="primary">
                {primaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Build. Improve. Partner.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            One team for the site work that moves pipeline — so you are not juggling a
            designer, a freelancer, and an SEO vendor to ship one launch.
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

      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            From your live URL to a clear next step.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Built for founders and product marketers who want specifics — not a pile of
            unused deliverables.
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
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Straight answers before you book.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate">
              Prefer email?{" "}
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

      <Section tone="white" id="audit-form">
        <GrowthAuditAgenda />
      </Section>

      <CTASection
        heading="Ready for a free growth audit?"
        body="We walk your live site against a fixed agenda and leave you with prioritized next steps — usually within one business day of booking."
        cta={primaryCta}
      />
    </>
  );
}
