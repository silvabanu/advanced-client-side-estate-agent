import { toDate, isValidDate } from "./date";

function normType(t) {
  return String(t || "").toLowerCase();
}

function postcodeArea(location) {
  // Expect something like "... BR6" or "... NW1"
  const m = String(location || "").match(/\b([A-Z]{1,2}\d{1,2})\b/i);
  return m ? m[1].toUpperCase() : "";
}

/**
 * Filters properties by any combination of criteria.
 * criteria = {
 *  type: 'any'|'house'|'flat',
 *  minPrice, maxPrice,
 *  minBeds, maxBeds,
 *  dateMode: 'any'|'after'|'between',
 *  dateAfter: Date|null,
 *  dateFrom: Date|null,
 *  dateTo: Date|null,
 *  postcodeArea: '' | 'BR6' etc
 * }
 */
export function filterProperties(properties, criteria) {
  const c = criteria || {};
  return (properties || []).filter((p) => {
    // type
    if (c.type && c.type !== "any") {
      if (normType(p.type) !== c.type) return false;
    }

    // price
    const price = Number(p.price);
    if (Number.isFinite(c.minPrice) && price < c.minPrice) return false;
    if (Number.isFinite(c.maxPrice) && price > c.maxPrice) return false;

    // bedrooms
    const beds = Number(p.bedrooms);
    if (Number.isFinite(c.minBeds) && beds < c.minBeds) return false;
    if (Number.isFinite(c.maxBeds) && beds > c.maxBeds) return false;

    // date added
    const d = toDate(p.added);
    if (c.dateMode === "after") {
      if (isValidDate(c.dateAfter) && isValidDate(d)) {
        if (d < c.dateAfter) return false;
      } else if (isValidDate(c.dateAfter)) {
        // property date missing => exclude
        return false;
      }
    }
    if (c.dateMode === "between") {
      const from = c.dateFrom;
      const to = c.dateTo;
      if (isValidDate(from) || isValidDate(to)) {
        if (!isValidDate(d)) return false;
        if (isValidDate(from) && d < from) return false;
        if (isValidDate(to) && d > to) return false;
      }
    }

    // postcode area
    if (c.postcodeArea) {
      const area = postcodeArea(p.location);
      if (area !== c.postcodeArea.toUpperCase()) return false;
    }

    return true;
  });
}

export function extractPostcodeAreas(properties) {
  const set = new Set();
  (properties || []).forEach((p) => {
    const m = String(p.location || "").match(/\b([A-Z]{1,2}\d{1,2})\b/i);
    if (m) set.add(m[1].toUpperCase());
  });
  return Array.from(set).sort();
}
