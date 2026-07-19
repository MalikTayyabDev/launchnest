import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from "../access";
import { slugField } from "../fields/slug";
import { seoField } from "../fields/seo";

export const Posts: CollectionConfig = {
  slug: "posts",
  labels: { singular: "Blog Post", plural: "Blog Posts" },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
    group: "Content",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField("title"),
    {
      type: "row",
      fields: [
        {
          name: "category",
          type: "text",
          required: true,
          admin: { width: "50%", description: "e.g. Performance, SEO, Maintenance" },
        },
        {
          name: "readingTime",
          type: "text",
          admin: { width: "50%", description: "e.g. 6 min read" },
        },
      ],
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      admin: { description: "One or two sentences shown on the blog index and share cards." },
    },
    { name: "coverImage", type: "upload", relationTo: "media" },
    { name: "body", type: "richText" },
    {
      type: "row",
      fields: [
        {
          name: "author",
          type: "text",
          defaultValue: "LaunchNest",
          admin: { width: "50%" },
        },
        {
          name: "publishedAt",
          type: "date",
          admin: {
            width: "50%",
            date: { pickerAppearance: "dayOnly" },
          },
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
    beforeChange: [
      ({ data }) => {
        // Stamp a publish date the first time an item is published.
        if (data.status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
  },
};
