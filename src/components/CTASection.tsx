import { Button } from "./Button";

type CTASectionProps = {
  heading: string;
  body?: string;
  /** Specific, low-risk action — never a bare "Contact Us". */
  cta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/** Reusable navy-background CTA band with a specific-action button. */
export function CTASection({ heading, body, cta, secondaryCta }: CTASectionProps) {
  return (
    <section className="bg-navy">
      <div className="relative mx-auto w-full max-w-content overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        {/* Thin gold accent rule */}
        <span className="mb-8 block h-0.5 w-14 bg-gold" aria-hidden="true" />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-bold leading-tight tracking-tight text-offwhite sm:text-4xl">
              {heading}
            </h2>
            {body && <p className="mt-4 text-lg leading-relaxed text-offwhite/70">{body}</p>}
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <Button href={cta.href} variant="primary">
              {cta.label}
            </Button>
            {secondaryCta && (
              <Button
                href={secondaryCta.href}
                variant="ghost"
                className="border-offwhite/25 text-offwhite hover:bg-offwhite/10"
              >
                {secondaryCta.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
