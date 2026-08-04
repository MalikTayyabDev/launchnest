import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from "../access";
import { slugField } from "../fields/slug";
import { seoField } from "../fields/seo";
import { revalidateCaseStudy } from "../lib/revalidate";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "industry", "liveDomain", "status"],
    group: "Content",
    description:
      "Featured outcomes must include a Live URL that matches the portfolio grid. Edits publish when Status is Published.",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: "client", type: "text", required: true },
    slugField("client"),
    {
      type: "row",
      fields: [
        {
          name: "industry",
          type: "select",
          required: true,
          options: [
            { label: "E-commerce", value: "E-commerce" },
            { label: "Professional Services", value: "Professional Services" },
            { label: "SaaS", value: "SaaS" },
          ],
          admin: { width: "50%" },
        },
        {
          name: "headlineResult",
          type: "text",
          required: true,
          admin: {
            width: "50%",
            description:
              "One-line outcome for the card, e.g. 'Live AI product marketing site in production'",
          },
        },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    {
      type: "row",
      fields: [
        {
          name: "liveUrl",
          type: "text",
          required: true,
          admin: {
            width: "60%",
            description:
              "Full https URL of the live site (must appear in the portfolio grid).",
          },
        },
        {
          name: "liveDomain",
          type: "text",
          admin: {
            width: "40%",
            description: "Display domain, e.g. wiz.ai",
          },
        },
      ],
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Optional cover for the case study page + Open Graph.",
      },
    },
    {
      name: "accent",
      type: "text",
      defaultValue: "#0B1F3A",
      admin: {
        description: "Hex color for the thumbnail block (brand palette only).",
      },
    },
    { name: "situation", type: "textarea", required: true },
    { name: "problem", type: "textarea", required: true },
    {
      name: "whatWeDid",
      type: "array",
      labels: { singular: "Step", plural: "Steps" },
      fields: [{ name: "step", type: "text", required: true }],
    },
    {
      name: "results",
      type: "array",
      labels: { singular: "Result", plural: "Results" },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "metric",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
            {
              name: "label",
              type: "text",
              required: true,
              admin: { width: "50%" },
            },
          ],
        },
      ],
    },
    {
      name: "quote",
      type: "group",
      admin: {
        description:
          "Optional — only add permissioned client quotes. Leave blank until approved.",
      },
      fields: [
        { name: "text", type: "textarea" },
        {
          type: "row",
          fields: [
            { name: "name", type: "text", admin: { width: "50%" } },
            { name: "role", type: "text", admin: { width: "50%" } },
          ],
        },
      ],
    },
    seoField,
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
  ],
  hooks: {
    afterChange: [
      ({ doc, previousDoc }) => {
        if (doc?.slug) revalidateCaseStudy(String(doc.slug));
        const prevSlug = previousDoc?.slug;
        if (prevSlug && prevSlug !== doc?.slug) {
          revalidateCaseStudy(String(prevSlug));
        }
      },
    ],
    afterDelete: [
      ({ doc }) => {
        if (doc?.slug) revalidateCaseStudy(String(doc.slug));
      },
    ],
  },
};
