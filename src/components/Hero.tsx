"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { Eyebrow } from "./Section";

type HeroProps = {
  eyebrow?: string;
  headline: string;
  subhead: string;
  cta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

/** Reusable hero with editable headline/subhead/CTA props. */
export function Hero({ eyebrow, headline, subhead, cta, secondaryCta }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white">
      <TrajectoryBackdrop />
      <div className="relative mx-auto w-full max-w-content px-6 pb-20 pt-16 sm:pb-28 sm:pt-24 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Eyebrow>{eyebrow}</Eyebrow>
            </motion.div>
          )}
          <motion.h1
            className="font-heading text-4xl font-bold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            {headline}
          </motion.h1>
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-slate"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            {subhead}
          </motion.p>
          {(cta || secondaryCta) && (
            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.19 }}
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
    </section>
  );
}

/** Subtle geometric chevron/trajectory lines echoing the logo arrow motif. */
function TrajectoryBackdrop() {
  return (
    <svg
      className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-[0.06]"
      viewBox="0 0 400 400"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMaxYMid slice"
    >
      {[0, 60, 120, 180, 240].map((offset) => (
        <path
          key={offset}
          d={`M${offset} 400 L${offset + 200} 200 L${offset} 0`}
          stroke="#0B1F3A"
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
