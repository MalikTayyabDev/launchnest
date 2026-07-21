import { Hero } from "@/components/Hero";
import { HeroLeadForm } from "@/components/HeroLeadForm";
import { NextStepsStrip } from "@/components/NextStepsStrip";
import { Section, Eyebrow } from "@/components/Section";
import { StatCallout } from "@/components/StatCallout";
import { ServiceCard } from "@/components/ServiceCard";
import { PortfolioCard } from "@/components/PortfolioCard";
import { Button } from "@/components/Button";
import { TestimonialQuote } from "@/components/TestimonialQuote";
import { CTASection } from "@/components/CTASection";
import { FAQ } from "@/components/FAQ";
import { Reveal } from "@/components/Reveal";
import { getAllCaseStudies } from "@/lib/content";
import { getFeaturedProjects } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

const pillars = [
  {
    label: "Launch",
    icon: "build" as const,
    description:
      "Brand, UI/UX, and engineering for landing pages, SaaS sites, startup MVPs, and business websites — end-to-end, one partner.",
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
  "LaunchNest is an engineering-first digital solutions agency — a launch and growth partner for startups, SaaS companies, agencies, and growing businesses. We don't sell websites. We sell growth, lead generation, conversion, SEO visibility, and long-term partnership through modern design, engineering, SEO, AI, and systems that scale.";

const trustSignals = [
  "SaaS",
  "AI Startups",
  "Tech Startups",
  "Agencies",
  "Ecommerce",
  "Professional services",
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
    body: "Free audit or 30-minute call — we map goals, bottlenecks, and the fastest path to leads and conversion.",
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
    a: "Primary clients are SaaS companies, AI and tech startups, and agencies. We also partner with SMBs, healthcare, law firms, home services, real estate, coaches, consultants, and ecommerce brands.",
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

export const revalidate = 60;

export default async function HomePage() {
  const [caseStudies, featuredProjects] = await Promise.all([
    getAllCaseStudies(),
    getFeaturedProjects(6),
  ]);

  return (
    <>
      <Hero
        eyebrow={siteConfig.positioning.label}
        headline="Launch and scale digital products that grow the business."
        subhead="Engineering-first design, development, SEO, and AI for startups, SaaS companies, agencies, and growing businesses. One partner — branding through deployment and ongoing growth."
        trustChips={[
          "100+ projects shipped",
          "UK · US · AU",
          "Free growth audit",
          "Reply in 1 business day",
        ]}
        secondaryCta={{ label: "See the work", href: "/portfolio" }}
        cta={{ label: "See solutions", href: "/services" }}
        aside={<HeroLeadForm />}
      />

      <NextStepsStrip />

      <div className="border-y border-navy/10 bg-offwhite">
        <div className="mx-auto flex w-full max-w-content flex-col items-start gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-mono text-lg font-semibold tracking-tight text-navy">
            Complete launch solutions.{" "}
            <span className="text-gold">One accountable partner.</span>
          </p>
          <div className="flex gap-10">
            <StatCallout value="< 2.5s" label="LCP standard" />
            <StatCallout value="est. 2022" label="Building since" />
          </div>
        </div>
      </div>

      <div className="border-b border-navy/10 bg-white">
        <div className="mx-auto w-full max-w-content px-6 py-6 lg:px-8">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-slate">
            Built for the clients we want to partner with
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {trustSignals.map((item) => (
              <span
                key={item}
                className="font-heading text-sm font-semibold tracking-tight text-navy/70"
              >
                {item}
              </span>
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
              <div className="flex h-full flex-col rounded-lg border border-navy/10 bg-white p-6">
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
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Real products. Live businesses. Shipping results.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              A cross-section of launches across stacks — every card links to a live
              site. Platforms are tools; outcomes are the point.
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
        body="Book a free growth audit or a 30-minute call. We'll tell you what's blocking leads, conversion, and speed — no sales script."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
        secondaryCta={{ label: "See solutions", href: "/services" }}
      />
    </>
  );
}
