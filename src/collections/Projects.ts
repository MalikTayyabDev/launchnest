import type { CollectionConfig } from "payload";
import { APIError } from "payload";
import { isAdmin, isAdminOrEditor, publishedOrLoggedIn } from "../access";
import { captureScreenshot } from "../lib/screenshot";

/** Derive a clean domain (no protocol / www / path) from a URL. */
function domainFromUrl(url: string): string {
  return url
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0];
}

export const Projects: CollectionConfig = {
  slug: "projects",
  labels: { singular: "Project", plural: "Projects" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "platform", "featured", "showInGrid", "status"],
    group: "Content",
    description:
      "Portfolio sites on /portfolio and home. Paste the live URL, save — we auto-capture a screenshot into Media (thum.io / ScreenshotOne). Requires working media storage (Vercel Blob in production).",
  },
  access: {
    read: publishedOrLoggedIn,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  hooks: {
    beforeChange: [
      // Normalise derived fields.
      ({ data }) => {
        if (data?.url) data.domain = domainFromUrl(String(data.url));
        if (!data?.stackLabel && data?.platform) data.stackLabel = data.platform;
        return data;
      },
      // Auto-capture a screenshot from the URL and store it in Media.
      async ({ data, req, originalDoc }) => {
        if (!data?.url) return data;

        const auto = data.autoScreenshot !== false;
        const force = Boolean(data.recapture);
        const urlChanged = Boolean(originalDoc && originalDoc.url !== data.url);
        // Capture when: forced, or auto-on and there's no screenshot yet, or the
        // URL changed. A manual upload is respected (skipped) unless forced.
        const shouldCapture =
          auto && (force || !data.screenshot || urlChanged);

        // Always clear the one-shot flag so it doesn't re-fire on the next save.
        data.recapture = false;

        if (!shouldCapture) return data;

        try {
          const shot = await captureScreenshot(String(data.url));
          const domain = domainFromUrl(String(data.url));
          const safe = domain.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
          const media = await req.payload.create({
            collection: "media",
            data: {
              alt: `${data.name || domain} — homepage screenshot`,
            },
            file: {
              data: shot.buffer,
              mimetype: shot.mimetype,
              name: `${safe}-${Date.now()}.${shot.ext}`,
              size: shot.buffer.length,
            },
            req,
          });
          data.screenshot = media.id;
        } catch (err) {
          const detail = err instanceof Error ? err.message : String(err);
          req.payload.logger.error(
            `Auto screenshot failed for ${data.url}: ${detail}`,
          );
          // Surface a clear admin error instead of silently saving without an image.
          const blobHint = process.env.BLOB_READ_WRITE_TOKEN
            ? ""
            : " If this is production, set BLOB_READ_WRITE_TOKEN (Vercel → Storage → Blob).";
          throw new APIError(
            `Could not capture/store screenshot for ${data.url}: ${detail}.${blobHint} Turn off “Auto screenshot” to save without an image, or upload a screenshot manually.`,
            400,
          );
        }

        return data;
      },
    ],
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Business / site name shown on the card." },
    },
    {
      type: "row",
      fields: [
        {
          name: "url",
          type: "text",
          required: true,
          admin: { width: "60%", description: "Full live URL (https://…)." },
        },
        {
          name: "domain",
          type: "text",
          admin: {
            width: "40%",
            readOnly: true,
            description: "Auto-filled from the URL.",
          },
        },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          defaultValue: "Custom",
          admin: { width: "50%", description: "Used for the filter buckets." },
          options: [
            { label: "WordPress", value: "WordPress" },
            { label: "Shopify", value: "Shopify" },
            { label: "Webflow", value: "Webflow" },
            { label: "Wix", value: "Wix" },
            { label: "GoHighLevel", value: "GoHighLevel" },
            { label: "Custom", value: "Custom" },
          ],
        },
        {
          name: "stackLabel",
          type: "text",
          admin: {
            width: "50%",
            description:
              "Badge text, e.g. 'WordPress (WooCommerce)'. Defaults to the platform.",
          },
        },
      ],
    },
    {
      name: "screenshot",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Auto-captured from the URL on save when left empty (HTTP screenshot service — not Python). Manual uploads are kept unless you tick 'Re-capture'.",
      },
    },
    {
      name: "autoScreenshot",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description:
          "Automatically fetch a screenshot from the URL on save (when none is set).",
      },
    },
    {
      name: "recapture",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description:
          "Tick to replace the current screenshot with a fresh capture on next save.",
      },
    },
    {
      name: "imagePath",
      type: "text",
      admin: {
        description:
          "Optional static image path (e.g. /portfolio/example-com.jpg). Used only if no screenshot is set.",
      },
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Show in the home page 'Selected work' section.",
      },
    },
    {
      name: "showInGrid",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
        description:
          "On = shown in the visual grid. Off = listed under 'Also delivered' (no preview).",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Lower numbers appear first.",
      },
    },
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
