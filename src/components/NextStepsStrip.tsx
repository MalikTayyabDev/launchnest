import Link from "next/link";
import { whatsappLink } from "@/lib/site";

const paths = [
  {
    href: "/portfolio",
    label: "See outcomes",
    hint: "Case studies + live sites",
  },
  {
    href: "/for/saas",
    label: "Built for SaaS",
    hint: "Trial & pipeline focus",
  },
  {
    href: "/pricing",
    label: "View pricing",
    hint: "Growth-first ranges",
  },
  {
    href: whatsappLink,
    label: "Chat on WhatsApp",
    hint: "Usually fastest",
    external: true,
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
          {paths.map((p) => {
            const className =
              "group flex flex-col rounded-lg border border-navy/10 bg-offwhite/60 px-5 py-4 transition-colors hover:border-gold/50 hover:bg-offwhite";
            const inner = (
              <>
                <span className="font-heading text-base font-semibold text-navy group-hover:text-navy">
                  {p.label}
                </span>
                <span className="mt-1 text-sm text-slate">{p.hint}</span>
              </>
            );
            return p.external ? (
              <a
                key={p.href}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                {inner}
              </a>
            ) : (
              <Link key={p.href} href={p.href} className={className}>
                {inner}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
