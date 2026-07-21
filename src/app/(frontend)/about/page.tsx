import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { StatCallout } from "@/components/StatCallout";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "LaunchNest is an engineering-first digital solutions agency — a launch and growth partner for startups, SaaS companies, agencies, and growing businesses.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Outcomes over outputs",
    body: "We sell growth, lead generation, conversion, speed, and SEO visibility — not deliverable piles. If it does not move the business, it does not make the plan.",
  },
  {
    title: "Engineering-first, end-to-end",
    body: "Branding, UI/UX, development, content, SEO, QA, deployment, and maintenance under one partner — so quality does not fall through vendor gaps.",
  },
  {
    title: "Premium partnership, not price wars",
    body: "We compete on expertise and results. Prefer retainers and long-term systems over race-to-the-bottom project pricing.",
  },
];

const team = [
  {
    name: "Launch engineering",
    role: "Design & Product Build",
    body: "UI/UX and engineering for SaaS sites, MVPs, landing pages, and business platforms — Next.js, WordPress, Shopify, Webflow, Wix, GoHighLevel.",
    initials: "LE",
  },
  {
    name: "Growth systems",
    role: "SEO, Content & AI",
    body: "Technical SEO, content, speed, AI integrations, automation, and CRM wiring aimed at qualified demand.",
    initials: "GS",
  },
  {
    name: "Ongoing partnership",
    role: "QA, Hosting & Care",
    body: "QA, deployment support, monitoring, and retainers — the team that stays after launch so results compound.",
    initials: "OP",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>About LaunchNest</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {siteConfig.positioning.label}.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            We help startups, SaaS companies, agencies, and growing businesses launch,
            scale, and optimize their digital presence through modern design,
            engineering, SEO, AI, and growth-focused solutions.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            We are not just another web development agency — and we are not a
            WordPress, Shopify, or &ldquo;web design&rdquo; shop. We are a launch
            partner for modern businesses.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>The story</Eyebrow>
            <p className="text-lg leading-relaxed text-slate">
              Too many founders were sold beautiful websites that failed under real
              traffic, real buyers, and real growth goals. Platforms were treated like
              art projects. Nobody stayed to own performance, SEO, or conversion after
              launch day.
            </p>
            <p className="text-lg leading-relaxed text-slate">
              LaunchNest was built as the opposite: complete launch solutions — branding
              through UI/UX, engineering, content, SEO, QA, deployment, and maintenance —
              with an engineering-first standard and a long-term partnership model.
            </p>
            <p className="text-lg leading-relaxed text-slate">
              {siteConfig.positioning.sell}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-8 rounded-xl bg-navy p-8">
            <StatCallout value="100+" label="projects delivered" onNavy />
            <StatCallout value="est. 2022" label="building since" onNavy />
            <StatCallout value="< 2.5s" label="LCP standard" onNavy />
            <StatCallout value="0" label="disappearing acts" onNavy />
          </div>
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="max-w-2xl">
          <Eyebrow>Who we partner with</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            Primary focus. Secondary fit.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            We prioritize clients where engineering and growth systems create the most
            leverage — then extend the same standard to strong secondary markets.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-navy/10 bg-white p-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-gold">
              Primary
            </p>
            <ul className="mt-4 flex flex-col gap-2">
              {siteConfig.positioning.primaryClients.map((c) => (
                <li key={c} className="font-heading text-base font-semibold text-navy">
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-navy/10 bg-white p-7">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
              Secondary
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {siteConfig.positioning.secondaryClients.map((c) => (
                <li
                  key={c}
                  className="rounded-md border border-navy/10 px-3 py-1.5 text-sm text-slate"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            How we run the agency.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-navy/10 bg-white p-7">
                <span className="block h-0.5 w-10 bg-gold" aria-hidden="true" />
                <h3 className="mt-5 font-heading text-lg font-semibold text-navy">
                  {v.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section tone="offwhite">
        <div className="max-w-2xl">
          <Eyebrow>The team</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            Launch. Growth systems. Ongoing partnership.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Organized around how modern businesses actually ship — not around billable
            padding.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((member, i) => (
            <Reveal key={member.name} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-navy/10 bg-white p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-navy font-mono text-lg font-bold text-gold">
                  {member.initials}
                </div>
                <h3 className="mt-5 font-heading text-lg font-semibold text-navy">
                  {member.name}
                </h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-wider text-slate">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-slate">{member.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        heading="Looking for a launch partner — not another vendor?"
        body="Start with a free growth audit or a 30-minute call. Straight talk on what will move leads and conversion."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
      />
    </>
  );
}
