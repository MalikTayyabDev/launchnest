import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { isAdmin, isAdminOrEditor } from "../access";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Content",
    description:
      "Image uploads for projects, posts, and case studies. Production uses Vercel Blob (BLOB_READ_WRITE_TOKEN); local dev writes to /media on disk.",
  },
  access: {
    read: () => true, // public assets
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    // Local/dev disk path. Ignored when Vercel Blob plugin is enabled.
    staticDir: path.resolve(dirname, "../../media"),
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
