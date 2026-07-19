import type { Field } from "payload";

const format = (val: string): string =>
  val
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/-+/g, "-")
    .toLowerCase();

/**
 * A URL slug field that auto-derives from a source field (default: "title")
 * when left blank, and stays unique per collection.
 */
export const slugField = (sourceField = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "URL path segment. Leave blank to auto-generate from the title.",
  },
  hooks: {
    beforeValidate: [
      ({ value, data }) => {
        if (typeof value === "string" && value.length > 0) {
          return format(value);
        }
        const source = data?.[sourceField];
        if (typeof source === "string" && source.length > 0) {
          return format(source);
        }
        return value;
      },
    ],
  },
});
