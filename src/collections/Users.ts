import type { CollectionConfig } from "payload";
import { isAdmin, isAdminOrSelf, isAdminFieldLevel } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Brute-force protection: lock the account after repeated failures.
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 minutes
    tokenExpiration: 2 * 60 * 60, // 2 hours
    cookies: {
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    },
  },
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "name", "role"],
    group: "Admin",
  },
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    // Only authenticated staff can reach the admin panel at all.
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text" },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      // Editors cannot escalate their own privileges.
      access: {
        create: isAdminFieldLevel,
        update: isAdminFieldLevel,
      },
      admin: { description: "Admins manage users and settings; editors manage content." },
    },
  ],
};
