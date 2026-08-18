import Link from "next/link";

const paths = [
  {
    href: "/for/website-audit",
    label: "Free website growth audit",
    hint: "Speed, SEO, stack fit",
  },
  {
    href: "/pricing",
    label: "SaaS website pricing",
    hint: "From $199 + retainers",
  },
  {
    href: "/services/website-design-dev",
    label: "Website & product engineering",
    hint: "SaaS sites, MVPs, redesigns",
  },
  {
    href: "/portfolio",
    label: "Live case studies",
    hint: "wiz.ai, Clearmatrix, more",
  },
];

/** Immediate next-step paths under the hero — turns single-page visits into engagement. */
export function NextStepsStrip() {
  return (
    <div className="border-b border-navy/10 bg-white">
      <div className="mx-auto w-full max-w-content px-6 py-8 lg:px-8">
        <p className="mb-5 text-center font-mono text-xs uppercase tracking-[0.16em] text-slate">
          Not ready to book? Start here
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {paths.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group flex flex-col rounded-lg border border-navy/10 bg-offwhite/60 px-5 py-4 transition-colors hover:border-gold/50 hover:bg-offwhite"
            >
              <span className="font-heading text-base font-semibold text-navy group-hover:text-navy">
                {p.label}
              </span>
              <span className="mt-1 text-sm text-slate">{p.hint}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
