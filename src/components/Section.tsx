import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  /** Background treatment. */
  tone?: "white" | "offwhite" | "navy";
  className?: string;
  id?: string;
};

const tones = {
  white: "bg-white",
  offwhite: "bg-offwhite",
  navy: "bg-navy",
};

export function Section({ children, tone = "white", className = "", id }: SectionProps) {
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

/** Small mono-font label with a gold accent rule — the version-tag style UI touch. */
export function Eyebrow({ children, onNavy = false }: EyebrowProps) {
  return (
    <span className="mb-4 inline-flex items-center gap-3 font-mono text-xs font-medium uppercase tracking-[0.2em]">
      <span className="h-px w-8 bg-gold" aria-hidden="true" />
      <span className={onNavy ? "text-gold" : "text-slate"}>{children}</span>
    </span>
  );
}
