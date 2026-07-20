import type { GlobalConfig } from "payload";
import { isAdmin } from "../access";

/** Admin-controlled settings for the Phase 0 $20 intro landing page offer. */
export const IntroOffer: GlobalConfig = {
  slug: "intro-offer",
  label: "Intro Offer",
  admin: {
    group: "Leads",
    description:
      "Control the $20 intro landing page offer — open/close it and track booked slots.",
  },
  access: {
    read: isAdmin,
    update: isAdmin,
  },
  fields: [
    {
      name: "open",
      type: "checkbox",
      defaultValue: true,
      label: "Accepting intro clients",
      admin: {
        description: "Uncheck when slots are full or you want to pause the offer.",
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
            description: "Hard cap (10–15 recommended).",
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
            description: "Increment when you confirm/book an intro client.",
          },
        },
      ],
    },
  ],
};
