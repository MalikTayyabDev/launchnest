import type { Access, FieldAccess } from "payload";

/** Only users with the admin role. */
export const isAdmin: Access = ({ req: { user } }) => user?.role === "admin";

/** Admin or editor role (content managers). */
export const isAdminOrEditor: Access = ({ req: { user } }) =>
  Boolean(user && (user.role === "admin" || user.role === "editor"));

/** Any authenticated user. */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user);

/**
 * Public read of published content only. Authenticated staff can see drafts too.
 * Returns a query constraint for anonymous requests so drafts never leak.
 */
export const publishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true;
  return { status: { equals: "published" } };
};

/** Field-level: only admins may change the value (e.g. a user's role). */
export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) =>
  user?.role === "admin";

/** Users can read/update their own record; admins can do anyone's. */
export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (user.role === "admin") return true;
  return { id: { equals: user.id } };
};
