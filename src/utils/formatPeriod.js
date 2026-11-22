/**
 * One date format across the site: "Mar 2026 – Present", "2026 – Present",
 * "Nov 2026". The data keeps its compact "MM/YYYY — MM/YYYY|present" form;
 * this is the only place it turns into display text.
 */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function point(token) {
  const t = token.trim();
  if (!t) return "";
  if (/^present$/i.test(t)) return "Present";
  const my = t.match(/^(\d{1,2})\/(\d{4})$/);
  if (my) return `${MONTHS[Number(my[1]) - 1]} ${my[2]}`;
  return t;
}

export function formatPeriod(period = "") {
  const [from, to] = period.split(/\s*[—–-]\s*/);
  if (to === undefined) return point(from);
  return `${point(from)} – ${to ? point(to) : "Present"}`;
}
