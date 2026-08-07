import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";
import { revalidateIntroOffer } from "../lib/revalidate";

/** Admin-controlled settings for the Phase 0 $20 intro landing page offer. */
export const IntroOffer: GlobalConfig = {
  slug: "intro-offer",
  label: "Intro Offer",
  admin: {
    group: "Leads",
    description:
      "Control the $20 intro landing page. Slots Used auto-increments when someone submits the intro form — keep it accurate (or close the offer) so the public counter never looks fake.",
  },
  access: {
    // Public read so the marketing site can load live slot counts.
    // Only admins can change values.
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "open",
      type: "checkbox",
      defaultValue: true,
      label: "Accepting intro clients",
      admin: {
        description:
          "Uncheck to hide the banner and close the claim form immediately (after revalidate).",
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "maxSlots",
          type: "number",
          defaultValue: 10,
          min: 1,
          max: 15,
          required: true,
          admin: {
            width: "50%",
            description: "Hard cap for this intro cohort (10–15 recommended).",
          },
        },
        {
          name: "slotsUsed",
          type: "number",
          defaultValue: 0,
          min: 0,
          required: true,
          admin: {
            width: "50%",
            description:
              "Auto-increments on each intro-offer lead. Correct manually if you booked someone offline.",
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateIntroOffer();
      },
    ],
  },
};
