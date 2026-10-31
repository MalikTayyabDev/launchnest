"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "./Button";
import { Eyebrow } from "./Section";

type HeroProps = {
  eyebrow?: string;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  /** Optional slot rendered alongside the copy (e.g. a lead-capture form). */
  aside?: ReactNode;
  /** Quiet credibility line under the subhead (not pill chips). */
  trustLine?: string;
  /** @deprecated Prefer trustLine — kept for call-site compatibility. */
  trustChips?: string[];
};

/** Reusable hero with editable headline/subhead/CTA props. */
export function Hero({
  eyebrow,
  headline,
  subhead,
  cta,
  secondaryCta,
  aside,
  trustLine,
  trustChips,
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const anim = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
        };

  const credibility =
    trustLine ||
    (trustChips && trustChips.length > 0 ? trustChips.join(" · ") : undefined);

  return (
    <section className="hero-wash relative overflow-hidden">
      <TrajectoryBackdrop />
      <div className="relative mx-auto w-full max-w-content px-6 pb-20 pt-14 sm:pb-28 sm:pt-24 lg:px-8">
        <div
          className={
            aside
              ? "grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20"
              : ""
          }
        >
          {aside && (
            <motion.div
              id="audit-form"
              className="scroll-mt-28 order-1 lg:order-2"
              {...anim(0.1)}
            >
              {aside}
            </motion.div>
          )}
          <div className={`order-2 lg:order-1 ${aside ? "max-w-xl" : "max-w-3xl"}`}>
            {eyebrow && (
              <motion.div {...anim(0)}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </motion.div>
            )}
            <motion.h1
              className="font-heading text-[2.35rem] font-semibold leading-[1.05] text-navy sm:text-5xl lg:text-[3.5rem]"
              {...anim(0.05)}
            >
              {headline}
            </motion.h1>
            <motion.p
              className="mt-6 max-w-xl text-lg leading-[1.7] text-slate"
              {...anim(0.1)}
            >
              {subhead}
            </motion.p>
            {credibility && (
              <motion.p
                className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-slate/70"
                {...anim(0.12)}
              >
                {credibility}
              </motion.p>
            )}
            {(cta || secondaryCta) && (
              <motion.div
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
                {...anim(0.16)}
              >
                {cta && (
                  <Button href={cta.href} variant="primary">
                    {cta.label}
                  </Button>
                )}
                {secondaryCta && (
                  <Button href={secondaryCta.href} variant="ghost">
                    {secondaryCta.label}
                  </Button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Quiet trajectory lines — logo motif, not decorative noise. */
function TrajectoryBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute -right-8 top-0 hidden h-full w-[42%] opacity-[0.045] lg:block"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMid slice"
    >
      {[40, 100, 160, 220].map((offset) => (
        <path
          key={offset}
          d={`M${offset} 400 L${offset + 180} 200 L${offset} 0`}
          stroke="#0B1F3A"
          strokeWidth="1.25"
        />
      ))}
    </svg>
  );
}
