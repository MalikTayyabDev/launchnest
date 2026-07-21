import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { CTASection } from "@/components/CTASection";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { FAQ } from "@/components/FAQ";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { getService, services } from "@/lib/services";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service not found" };
  return {
    title: service.label,
    description: service.shortDescription,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={serviceSchema(service)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.label, path: `/services/${service.slug}` },
        ])}
      />
      <Section tone="offwhite">
        <div className="max-w-3xl">
          <Eyebrow>{service.tagline}</Eyebrow>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-navy sm:text-5xl">
            {service.label}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate">
            {service.shortDescription}
          </p>
          <div className="mt-8">
            <Button href="/contact" variant="primary">
              Book a Free Growth Audit
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Eyebrow>Overview</Eyebrow>
            <div className="mt-2 flex flex-col gap-5">
              {service.overview.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-slate">
                  {p}
                </p>
              ))}
            </div>

            <h2 className="mt-12 font-heading text-2xl font-bold text-navy">
              What you get
            </h2>
            <ul className="mt-6 flex flex-col gap-4">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    aria-hidden="true"
                    className="mt-1 shrink-0"
                  >
                    <path
                      d="M3.5 9.5 7 13l7.5-8"
                      stroke="#1E8E5A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-base leading-relaxed text-slate">{d}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 rounded-lg border-l-2 border-gold bg-offwhite p-6">
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
                The outcome
              </p>
              <p className="mt-2 font-heading text-lg font-medium leading-relaxed text-navy">
                {service.outcome}
              </p>
            </div>
          </div>

          {/* Pricing anchor block */}
          <aside>
            <Reveal>
              <div className="sticky top-28 rounded-xl border border-navy/10 bg-white p-7 shadow-[0_12px_40px_-20px_rgba(11,31,58,0.3)]">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
                  Starting from
                </p>
                <p className="mt-2 font-mono text-3xl font-bold tracking-tight text-navy">
                  {service.pricing.anchor}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate">
                  {service.pricing.note}
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Button href="/contact" variant="primary" className="w-full">
                    Book a Free Growth Audit
                  </Button>
                  <Button href="/pricing" variant="ghost" className="w-full">
                    See full pricing
                  </Button>
                </div>
                <p className="mt-4 text-center font-mono text-xs text-slate">
                  Ranges shown are current starting points.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>

        <div className="mt-16 border-t border-navy/10 pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-slate">
            Other services
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="rounded-full border border-navy/15 px-4 py-2 font-heading text-sm font-medium text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  {s.label}
                </Link>
              ))}
          </div>
        </div>
      </Section>

      {service.faqs && service.faqs.length > 0 && (
        <Section tone="offwhite">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <Eyebrow>FAQ</Eyebrow>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-navy">
                {service.label}, answered.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                Still not sure it&apos;s a fit?{" "}
                <Link href="/portfolio" className="text-navy underline decoration-gold underline-offset-2">
                  See the work
                </Link>{" "}
                or{" "}
                <Link href="/contact" className="text-navy underline decoration-gold underline-offset-2">
                  book a free audit
                </Link>
                .
              </p>
            </div>
            <FAQ items={service.faqs} withSchema />
          </div>
        </Section>
      )}

      <CTASection
        heading={`Want a straight answer on ${service.label.toLowerCase()}?`}
        body="We'll review what you have now and tell you exactly what's worth doing."
        cta={{ label: "Book a Free Growth Audit", href: "/contact" }}
      />
    </>
  );
}
