import Link from "next/link";

type ServiceCardProps = {
  label: string;
  description: string;
  href: string;
  /** Short mono index label like "01". */
  index?: string;
  icon?: "build" | "optimize" | "launch" | "default";
};

export function ServiceCard({
  label,
  description,
  href,
  index,
}: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col border-t border-navy/15 pt-6 transition-colors"
    >
      <div className="mb-5 flex items-center justify-between">
        {index ? (
          <span className="font-mono text-[11px] font-medium tracking-[0.18em] text-gold">
            {index}
          </span>
        ) : (
          <span className="h-px w-8 bg-gold" aria-hidden="true" />
        )}
        <span
          className="font-heading text-sm text-navy/40 transition-colors group-hover:text-gold"
          aria-hidden="true"
        >
          →
        </span>
      </div>
      <h3 className="font-heading text-xl font-semibold tracking-tight text-navy">
        {label}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{description}</p>
      <span className="mt-6 font-heading text-sm font-semibold text-navy underline decoration-gold/70 underline-offset-4 group-hover:decoration-gold">
        Learn more
      </span>
    </Link>
  );
}
