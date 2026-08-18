import Link from "next/link";
import { Eyebrow } from "./Section";
import { clientEntryPoints } from "@/lib/tech-stacks";

export function ClientEntryPoints() {
  return (
    <section className="bg-white">
      <div className="mx-auto w-full max-w-content px-6 py-16 lg:px-8">
        <div className="max-w-2xl">
          <Eyebrow>Common starting points</Eyebrow>
          <h2 className="font-heading text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Still SaaS and startup-led — but software-first across stacks.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate">
            Most clients find us for SaaS, AI, and product engineering. Many engagements
            start with a concrete problem — a site, store, automation gap, or agency
            delivery need — then grow into ongoing software development, integrations,
            and engineering care.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-navy/15 text-xs uppercase tracking-wider text-slate">
                <th className="py-3 pr-4 font-medium">Who</th>
                <th className="py-3 pr-4 font-medium">Problem</th>
                <th className="py-3 pr-4 font-medium">How we help</th>
                <th className="py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {clientEntryPoints.map((row) => (
                <tr key={row.prospect} className="border-b border-navy/10">
                  <td className="py-4 pr-4 font-medium text-navy">{row.prospect}</td>
                  <td className="py-4 pr-4 text-slate">{row.problem}</td>
                  <td className="py-4 pr-4 text-slate">{row.pitch}</td>
                  <td className="py-4 text-right">
                    <Link
                      href={row.href}
                      className="font-medium text-navy underline decoration-gold underline-offset-2"
                    >
                      Learn more
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
