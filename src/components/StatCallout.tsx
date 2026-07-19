type StatCalloutProps = {
  /** The number/metric, e.g. "100+", "1.8s", "est. 2022". */
  value: string;
  /** Supporting label, e.g. "projects delivered". */
  label: string;
  onNavy?: boolean;
  className?: string;
};

/**
 * Mono-font stat component for callouts like "100+ projects delivered".
 * Uses JetBrains Mono to give the version-tag / engineering feel.
 */
export function StatCallout({ value, label, onNavy = false, className = "" }: StatCalloutProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span
        className={`font-mono text-3xl font-bold tracking-tight sm:text-4xl ${
          onNavy ? "text-offwhite" : "text-navy"
        }`}
      >
        {value}
      </span>
      <span
        className={`mt-2 font-mono text-xs uppercase tracking-[0.16em] ${
          onNavy ? "text-offwhite/60" : "text-slate"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
