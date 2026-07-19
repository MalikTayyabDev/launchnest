import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "company", "budget", "timeline", "createdAt"],
    group: "Leads",
    description: "Qualification submissions from the contact form.",
  },
  access: {
    // Anyone can submit; only admins can read/manage. Prevents lead data leaks.
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true, admin: { width: "50%" } },
        { name: "company", type: "text", required: true, admin: { width: "50%" } },
      ],
    },
    { name: "email", type: "email", required: true },
    {
      type: "row",
      fields: [
        { name: "budget", type: "text", admin: { width: "50%" } },
        { name: "timeline", type: "text", admin: { width: "50%" } },
      ],
    },
    { name: "siteStatus", type: "text" },
    { name: "message", type: "textarea" },
    {
      name: "source",
      type: "text",
      defaultValue: "contact-form",
      admin: { readOnly: true },
    },
    {
      name: "handled",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar", description: "Mark once you've followed up." },
    },
  ],
};
