// Dates en français (utilisables côté serveur et navigateur).

export function daysUntil(dateStr: string, today: Date) {
  const d = new Date(dateStr + "T00:00:00");
  return Math.max(0, Math.ceil((d.getTime() - today.getTime()) / 86400000));
}

const MONTHS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
const MONTHS_LONG = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

export function formatDate(dateStr: string, long = false) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d} ${(long ? MONTHS_LONG : MONTHS)[m - 1]} ${y}`;
}

export function formatRange(start: string, end: string) {
  const [y1, m1, d1] = start.split("-").map(Number);
  const [y2, m2, d2] = end.split("-").map(Number);
  if (y1 === y2 && m1 === m2) return `${d1} – ${d2} ${MONTHS_LONG[m1 - 1]} ${y1}`;
  return `${d1} ${MONTHS[m1 - 1]} – ${d2} ${MONTHS[m2 - 1]} ${y2}`;
}
