import { Button } from "./Button";

type PricingTierProps = {
  name: string;
  range: string;
  summary?: string;
  features: string[];
  featured?: boolean;
  cta?: { label: string; href: string };
  /** Render as a lighter recurring-plan card. */
  recurring?: boolean;
};

export function PricingTier({
  name,
  range,
  summary,
  features,
  featured = false,
  cta,
  recurring = false,
}: PricingTierProps) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-xl border p-7 ${
        featured
          ? "border-gold bg-navy text-offwhite shadow-[0_20px_60px_-24px_rgba(11,31,58,0.5)]"
          : "border-navy/10 bg-white"
      }`}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-gold px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-navy">
          Most chosen
        </span>
      )}
      <h3
        className={`font-heading text-xl font-semibold ${
          featured ? "text-offwhite" : "text-navy"
        }`}
      >
        {name}
      </h3>
      <div className="mt-4 flex items-baseline gap-1">
        <span
          className={`font-mono text-2xl font-bold tracking-tight ${
            featured ? "text-gold" : "text-navy"
          }`}
        >
          {range}
        </span>
      </div>
      {summary && (
        <p
          className={`mt-3 text-sm leading-relaxed ${
            featured ? "text-offwhite/70" : "text-slate"
          }`}
        >
          {summary}
        </p>
      )}
      <ul className="mt-6 flex flex-1 flex-col gap-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm leading-relaxed">
            <CheckIcon featured={featured} />
            <span className={featured ? "text-offwhite/90" : "text-slate"}>{f}</span>
          </li>
        ))}
      </ul>
      {cta && (
        <div className="mt-8">
          <Button
            href={cta.href}
            variant={featured ? "primary" : recurring ? "ghost" : "secondary"}
            className="w-full"
          >
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}

function CheckIcon({ featured }: { featured: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <path
        d="M3.5 9.5 7 13l7.5-8"
        stroke={featured ? "#C9A227" : "#1E8E5A"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
