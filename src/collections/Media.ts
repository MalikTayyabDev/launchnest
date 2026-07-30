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
      "Image uploads for projects, posts, and case studies. Production requires BLOB_READ_WRITE_TOKEN (Vercel Blob). After uploading, open the Blog Post / Case Study and set Cover Image, then Save — files only in Media are not shown on the site until linked.",
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
    // No derived sizes — resized variants often 404 on Blob and caused
    // /_next/image 400s when the frontend preferred card/hero over the original.
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
