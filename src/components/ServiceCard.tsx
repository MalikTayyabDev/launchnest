import Link from "next/link";

type ServiceCardProps = {
  label: string;
  description: string;
  href: string;
  /** Short mono index label like "01". */
  index?: string;
  icon?: "build" | "optimize" | "launch" | "default";
};

export function ServiceCard({ label, description, href, index, icon = "default" }: ServiceCardProps) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-lg border border-navy/10 bg-white p-7 transition-all duration-200 hover:border-gold/50 hover:shadow-[0_12px_40px_-16px_rgba(11,31,58,0.25)]"
    >
      <div className="mb-6 flex items-center justify-between">
        <ServiceIcon icon={icon} />
        {index && (
          <span className="font-mono text-xs font-medium tracking-widest text-slate/50">
            {index}
          </span>
        )}
      </div>
      <h3 className="font-heading text-xl font-semibold text-navy">{label}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-slate">{description}</p>
      <span className="mt-6 inline-flex items-center gap-2 font-heading text-sm font-semibold text-navy transition-colors group-hover:text-gold">
        Learn more
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
          <path
            d="M1 6h12M9 1.5 13.5 6 9 10.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

function ServiceIcon({ icon }: { icon: NonNullable<ServiceCardProps["icon"]> }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 28 28",
    fill: "none",
    "aria-hidden": true,
  } as const;

  const stroke = { stroke: "#0B1F3A", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-md bg-offwhite">
      {icon === "build" && (
        <svg {...common}>
          <path d="M4 20 14 6l10 14" {...stroke} />
          <path d="M9 20h10" {...stroke} />
        </svg>
      )}
      {icon === "optimize" && (
        <svg {...common}>
          <path d="M4 18 10 12l4 4 8-9" {...stroke} />
          <path d="M18 7h4v4" {...stroke} />
        </svg>
      )}
      {icon === "launch" && (
        <svg {...common}>
          <path d="M5 14h14M13 8l6 6-6 6" {...stroke} />
        </svg>
      )}
      {icon === "default" && (
        <svg {...common}>
          <path d="M6 8h16M6 14h16M6 20h10" {...stroke} />
        </svg>
      )}
    </span>
  );
}
