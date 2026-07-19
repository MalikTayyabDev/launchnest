import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { StatCallout } from "@/components/StatCallout";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "LaunchNest is a technical partner, not a creative studio. We build, fix, and maintain premium web platforms for founders who plan to stay in business.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Specific over stunning",
    body: "We'd rather tell you we cut load time by 1.8 seconds than that we delivered a stunning experience. Numbers you can check beat adjectives you can't.",
  },
  {
    title: "Partners, not vendors",
    body: "We don't build and vanish. The projects we're proudest of are the ones we've maintained for years — the same engineer who built it still answers the phone.",
  },
  {
    title: "Own your stack",
    body: "We hand over clean code, documentation, and source files. You should never be held hostage by your agency, including us.",
  },
];

const team = [
  {
    name: "The build team",
    role: "Design & Development",
    body: "Front-end and platform engineers who care about Core Web Vitals and clean handoffs — Shopify, WordPress, Webflow, and custom.",
    initials: "BD",
  },
  {
    name: "The optimize team",
    role: "Performance & SEO",
    body: "Technical SEO and performance specialists who find the exact script, query, or asset that's slowing you down — and fix it.",
    initials: "PS",
  },
  {
    name: "The partner team",
    role: "Maintenance & Support",
    body: "The people who keep your platform patched, backed up, and monitored — and who actually respond when something breaks.",
    initials: "MS",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>About LaunchNest</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            A technical partner — not a creative studio.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            LaunchNest started with a simple frustration: too many businesses were
            sold beautiful websites that fell apart the moment real traffic and real
            transactions hit them. Sites that looked great in a pitch deck and cost
            sales in production.
          </p>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-5">
            <Eyebrow>The story</Eyebrow>
            <p className="text-lg leading-relaxed text-slate">
              The founder had spent years being the person cleaning up after other
              agencies — inheriting slow checkouts, undocumented code, and clients who
              couldn&apos;t reach whoever built their site. The pattern was always the
              same: something impressive got built, then nobody stayed to keep it
              working.
            </p>
            <p className="text-lg leading-relaxed text-slate">
              LaunchNest was built to be the opposite. We take on platforms for the
              long haul — building them properly, tuning them for real performance, and
              maintaining them for founders who plan to stay in business for the next
              ten years. Not a launch party. A partnership.
            </p>
            <p className="text-lg leading-relaxed text-slate">
              That&apos;s why our positioning isn&apos;t &ldquo;we love design.&rdquo;
              It&apos;s that your website has to actually perform — and someone has to
              own that, past launch day.
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
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            How we work, in three lines.
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

      <Section tone="white">
        <div className="max-w-2xl">
          <Eyebrow>The team</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
            Build. Optimize. Launch &amp; maintain.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Small, senior, and organized around the three jobs your platform needs —
            not around billable-hour padding.
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
        heading="Want a partner who's still here in year ten?"
        body="Start with a free technical audit. No pitch deck, just a straight read on your platform."
        cta={{ label: "Book a Free Technical Audit", href: "/contact" }}
      />
    </>
  );
}
