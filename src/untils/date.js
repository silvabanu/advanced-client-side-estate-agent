export const MONTHS = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11
};

export function toDate(added) {
  if (!added) return null;
  const m = MONTHS[String(added.month || "").toLowerCase()];
  if (m === undefined) return null;
  return new Date(Number(added.year), m, Number(added.day));
}

export function isValidDate(d) {
  return d instanceof Date && !Number.isNaN(d.valueOf());
}
