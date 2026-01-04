/**
 * The starter JSON contains <br> tags in description.
 * We DO NOT render it as HTML (no dangerouslySetInnerHTML).
 * We convert breaks to plain text to keep content safe.
 */
export function sanitizeText(value) {
  if (value == null) return "";
  return String(value)
    .replace(/<\s*br\s*\/?\s*>/gi, "\n")
    .replace(/<[^>]*>/g, "")  // strip any other tags
    .trim();
}
