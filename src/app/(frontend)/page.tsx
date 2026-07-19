import { Hero } from "@/components/Hero";
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

const pillars = [
  {
    label: "Build",
    icon: "build" as const,
    description:
      "Premium web platforms and custom builds on WordPress, Shopify, and Webflow — architected to perform, documented to hand off.",
    href: "/services/website-design-dev",
  },
  {
    label: "Optimize",
    icon: "optimize" as const,
    description:
      "Speed, conversion-rate optimization, and technical SEO. We tell you exactly what breaks, why, and what the fix is worth.",
    href: "/services/seo",
  },
  {
    label: "Launch & Maintain",
    icon: "launch" as const,
    description:
      "An ongoing technical partnership — not a one-off handoff. Patched, backed up, monitored, and someone who answers.",
    href: "/services/maintenance-support",
  },
];

const positioning =
  "LaunchNest is the technical partner growing businesses call when their website has to actually perform — not just look good in a pitch deck. We build, fix, and maintain premium web platforms for founders who plan to stay in business for the next ten years.";

const trustSignals = [
  "E-commerce",
  "Professional services",
  "SaaS",
  "WordPress",
  "Shopify",
  "Webflow",
];

const process = [
  {
    step: "01",
    title: "Audit",
    body: "We start with a free technical review — speed, security, and what's costing you conversions. No sales script, just findings.",
  },
  {
    step: "02",
    title: "Plan",
    body: "You get a prioritized plan with specifics: what to fix, why it matters, and what each change is worth to the business.",
  },
  {
    step: "03",
    title: "Build",
    body: "We build or fix to a standard — fast page loads, clean code, and a CMS your team can actually run.",
  },
  {
    step: "04",
    title: "Maintain",
    body: "We stay on: updates, backups, monitoring, and a partner who already knows your stack when something breaks.",
  },
];

const homeFaqs = [
  {
    q: "What platforms do you work with?",
    a: "WordPress, Shopify, and Webflow, plus custom front-ends. We recommend the platform that fits how your team works and where the business is headed — not the one we'd prefer to sell.",
  },
  {
    q: "Do you work with clients in the UK, US, and Australia?",
    a: "Yes. We work with founders across the UK, US, and Australia and structure sites and SEO for multiple English-speaking markets.",
  },
  {
    q: "What does the free technical audit include?",
    a: "A real review of your site's speed, security, and conversion blockers — with specific findings like the exact scripts, queries, or assets slowing you down. No obligation.",
  },
  {
    q: "Do you only build new sites, or fix existing ones?",
    a: "Both. A lot of our work is rescuing and optimizing platforms someone else built — starting with an audit, then bringing them up to a maintainable standard.",
  },
  {
    q: "What happens after launch?",
    a: "You can take the fully documented site and run it yourself, or keep us on a maintenance plan for updates, backups, monitoring, and priority support. You're never locked in.",
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
        eyebrow="Technical web partner"
        headline="Your website should be growing your business — not costing you sales."
        subhead="LaunchNest builds and maintains premium web platforms for founders who plan to be around in 10 years. WordPress, Shopify, Webflow — built right, and kept right."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
        secondaryCta={{ label: "See the work", href: "/work" }}
      />

      {/* Proof strip */}
      <div className="border-y border-navy/10 bg-offwhite">
        <div className="mx-auto flex w-full max-w-content flex-col items-start gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p className="font-mono text-lg font-semibold tracking-tight text-navy">
            100+ projects delivered.{" "}
            <span className="text-gold">Zero disappearing acts.</span>
          </p>
          <div className="flex gap-10">
            <StatCallout value="< 2.5s" label="LCP standard" />
            <StatCallout value="est. 2022" label="Building since" />
          </div>
        </div>
      </div>

      {/* Trust / capability strip */}
      <div className="border-b border-navy/10 bg-white">
        <div className="mx-auto w-full max-w-content px-6 py-6 lg:px-8">
          <p className="mb-4 text-center font-mono text-xs uppercase tracking-[0.16em] text-slate">
            Platforms and sectors we work across
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
        </div>
      </div>

      {/* Service pillars */}
      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Three jobs. Done properly, then kept that way.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Most agencies build and vanish. We build, optimize, and stay — because a
            platform that has to run a business needs an owner, not a launch party.
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

      {/* How we work */}
      <Section tone="offwhite">
        <div className="max-w-2xl">
          <Eyebrow>How we work</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            A clear path from &ldquo;something&apos;s wrong&rdquo; to &ldquo;handled.&rdquo;
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            No mystery process. Four steps, and you know exactly where things stand
            at each one.
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

      {/* Positioning pulled-quote */}
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

      {/* Selected work — real, live client sites */}
      <Section tone="offwhite">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <Eyebrow>Selected work</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              Real sites. Real businesses. Live right now.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              A cross-section of what we&apos;ve shipped — WordPress, Shopify,
              Webflow, Wix, and custom builds. Every card links straight to the
              live site.
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
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <Button href="/portfolio" variant="primary" className="w-full">
            View full portfolio
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
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

      {/* FAQ */}
      <Section tone="offwhite">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              The questions we get before every project.
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
        heading="Not sure what's slowing your site down? We'll tell you — for free."
        body="A real technical review of your speed, security, and what's costing you conversions. No sales script, no obligation."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
        secondaryCta={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
