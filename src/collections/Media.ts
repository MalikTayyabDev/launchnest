import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrEditor } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Content" },
  access: {
    read: () => true, // public assets
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    // Restrict uploads to images (defence against arbitrary file upload).
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumbnail", width: 480 },
      { name: "card", width: 960 },
      { name: "hero", width: 1600 },
    ],
    focalPoint: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for accessibility and SEO." },
    },
  ],
};
