import type { Field } from "payload";

/** Reusable SEO metadata group for content collections. */
export const seoField: Field = {
  name: "seo",
  type: "group",
  label: "SEO",
  admin: {
    description: "Overrides the default page title/description in search + social.",
  },
  fields: [
    {
      name: "metaTitle",
      type: "text",
      admin: { description: "Defaults to the item title if left blank." },
    },
    {
      name: "metaDescription",
      type: "textarea",
      admin: { description: "Aim for 150-160 characters." },
    },
  ],
};
