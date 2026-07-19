import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from "../access";
import { slugField } from "../fields/slug";
import { seoField } from "../fields/seo";

export const CaseStudies: CollectionConfig = {
  slug: "case-studies",
  labels: { singular: "Case Study", plural: "Case Studies" },
  admin: {
    useAsTitle: "client",
    defaultColumns: ["client", "industry", "headlineResult", "status"],
    group: "Content",
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
          admin: { width: "50%", description: "One-line stat for the card, e.g. 'Checkout load time cut by 1.8s'" },
        },
      ],
    },
    { name: "summary", type: "textarea", required: true },
    { name: "coverImage", type: "upload", relationTo: "media" },
    {
      name: "accent",
      type: "text",
      defaultValue: "#0B1F3A",
      admin: { description: "Hex color for the thumbnail block (brand palette only)." },
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
            { name: "metric", type: "text", required: true, admin: { width: "50%" } },
            { name: "label", type: "text", required: true, admin: { width: "50%" } },
          ],
        },
      ],
    },
    {
      name: "quote",
      type: "group",
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
};
