import { growthAuditAgenda, growthAuditOneLiner } from "@/lib/growth-audit";

/** Concrete “what’s on the free growth audit” block for contact / home CTAs. */
export function GrowthAuditAgenda({
  className = "",
  heading = "What's on the free growth audit",
}: {
  className?: string;
  heading?: string;
}) {
  return (
    <div className={className}>
      <h3 className="font-heading text-lg font-bold tracking-tight text-navy sm:text-xl">
        {heading}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate">{growthAuditOneLiner}</p>
      <ul className="mt-5 flex flex-col gap-3">
        {growthAuditAgenda.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold"
              aria-hidden="true"
            />
            <span className="text-sm leading-relaxed text-slate sm:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
