import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Background treatment. */
  tone?: "white" | "offwhite" | "navy" | "paper";
  className?: string;
  id?: string;
};

const tones = {
  white: "bg-white",
  paper: "bg-[var(--color-paper)]",
  offwhite: "bg-offwhite",
  navy: "bg-navy",
};

export function Section({
  children,
  tone = "white",
  className = "",
  id,
}: SectionProps) {
  return (
    <section id={id} className={`${tones[tone]} py-20 sm:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-content px-6 lg:px-8">{children}</div>
    </section>
  );
}

type EyebrowProps = {
  children: ReactNode;
  onNavy?: boolean;
};

/** Editorial label — thin gold rule, restrained tracking. */
export function Eyebrow({ children, onNavy = false }: EyebrowProps) {
  return (
    <span className="mb-5 inline-flex items-center gap-3 font-mono text-[11px] font-medium uppercase tracking-[0.22em]">
      <span className="h-px w-7 bg-gold" aria-hidden="true" />
      <span className={onNavy ? "text-gold" : "text-slate/80"}>{children}</span>
    </span>
  );
}
