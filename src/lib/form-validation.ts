/** Shared client/server helpers for contact + offer forms. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isNonEmpty(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function isValidEmail(value: unknown): boolean {
  return typeof value === "string" && EMAIL_RE.test(value.trim());
}

/**
 * Returns an error message if required fields are missing / invalid, else null.
 */
export function validateRequired(
  data: Record<string, unknown>,
  fields: string[],
): string | null {
  const missing = fields.filter((k) => !isNonEmpty(data[k]));
  if (missing.length > 0) {
    return `Please fill in: ${missing.join(", ")}.`;
  }
  if (fields.includes("email") && !isValidEmail(data.email)) {
    return "Please enter a valid email address.";
  }
  return null;
}

/**
 * Client-side: check HTML5 validity and surface a clear message.
 * Call after preventDefault when you want custom error UI.
 */
export function getClientFormError(form: HTMLFormElement): string | null {
  if (form.checkValidity()) return null;

  const invalid = form.querySelector(":invalid") as
    | HTMLInputElement
    | HTMLSelectElement
    | HTMLTextAreaElement
    | null;

  if (invalid) {
    invalid.focus();
    if (invalid.validity.valueMissing) {
      return "Please fill in all required fields.";
    }
    if (invalid.validity.typeMismatch && invalid.type === "email") {
      return "Please enter a valid email address.";
    }
    return invalid.validationMessage || "Please check the form and try again.";
  }

  return "Please fill in all required fields.";
}
