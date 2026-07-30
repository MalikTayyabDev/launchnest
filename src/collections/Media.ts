import type { CollectionConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";
import { isAdmin, isAdminOrEditor } from "../access";
import { revalidateAllContent } from "../lib/revalidate";

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
    read: () => true,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  upload: {
    staticDir: path.resolve(dirname, "../../media"),
    mimeTypes: ["image/*"],
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
  hooks: {
    afterChange: [
      () => {
        revalidateAllContent();
      },
    ],
    afterDelete: [
      () => {
        revalidateAllContent();
      },
    ],
  },
};
