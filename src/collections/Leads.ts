import type { CollectionConfig } from "payload";
import { isAdmin } from "../access";

const esc = (v: unknown) =>
  String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export const Leads: CollectionConfig = {
  slug: "leads",
  labels: { singular: "Lead", plural: "Leads" },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["name", "company", "source", "budget", "createdAt"],
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
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== "create") return;
        const to = process.env.LEAD_NOTIFICATION_EMAIL;
        if (!to) return;

        const rows = [
          ["Name", doc.name],
          ["Company", doc.company],
          ["Email", doc.email],
          ["Budget", doc.budget],
          ["Timeline", doc.timeline],
          ["Site status", doc.siteStatus],
          ["Source", doc.source],
          ["Message", doc.message],
        ]
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 12px;font-weight:600;color:#0B1F3A;vertical-align:top">${label}</td><td style="padding:6px 12px;color:#334155">${esc(value)}</td></tr>`,
          )
          .join("");

        try {
          await req.payload.sendEmail({
            to,
            replyTo: doc.email,
            subject: `New lead: ${doc.name}${doc.company ? ` (${doc.company})` : ""}`,
            html: `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;max-width:560px">
  <h2 style="color:#0B1F3A;margin:0 0 4px">New lead from LaunchNest</h2>
  <p style="color:#64748b;margin:0 0 16px">A new enquiry just came in via the site.</p>
  <table style="border-collapse:collapse;width:100%;border:1px solid #e2e8f0;border-radius:8px">${rows}</table>
  <p style="color:#94a3b8;font-size:12px;margin-top:16px">Reply to this email to respond directly to ${esc(doc.email)}.</p>
</div>`,
          });
        } catch (err) {
          req.payload.logger.error(
            `Lead notification email failed: ${
              err instanceof Error ? err.message : String(err)
            }`,
          );
        }
      },
    ],
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
