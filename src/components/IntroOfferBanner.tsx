import Link from "next/link";
import { getIntroOfferSettings, INTRO_OFFER_PATH } from "@/lib/intro-offer";

/** Site-wide strip promoting the Phase 0 intro offer when slots are open. */
export async function IntroOfferBanner() {
  const settings = await getIntroOfferSettings();
  if (!settings.accepting) return null;

  return (
    <div className="border-b border-gold/30 bg-navy">
      <div className="mx-auto flex w-full max-w-content flex-col items-start gap-2 px-6 py-3 text-sm sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <p className="text-offwhite/90">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-gold">
            Intro offer
          </span>
          <span className="mx-2 hidden text-offwhite/30 sm:inline" aria-hidden="true">
            ·
          </span>
          <span className="mt-1 block sm:mt-0 sm:inline">
            Landing page for{" "}
            <strong className="font-semibold text-offwhite">$20</strong> — limited
            first-client rate ·{" "}
            <strong className="text-gold">{settings.slotsRemaining}</strong> of{" "}
            {settings.maxSlots} slots left
          </span>
        </p>
        <Link
          href={INTRO_OFFER_PATH}
          className="shrink-0 font-heading text-sm font-semibold text-gold underline decoration-gold/50 underline-offset-4 transition-colors hover:text-offwhite"
        >
          Claim a slot →
        </Link>
      </div>
    </div>
  );
}
