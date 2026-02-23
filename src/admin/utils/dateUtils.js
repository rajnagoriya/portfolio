const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Parse "Nov-2024" to "2024-11" for input[type="month"] */
export function parseMonthToInput(str) {
  if (!str || str === "Present") return "";
  const match = String(str).match(/^([A-Za-z]{3})-(\d{4})$/);
  if (!match) return "";
  const mi = MONTHS.indexOf(match[1]) + 1;
  return mi ? `${match[2]}-${String(mi).padStart(2, "0")}` : "";
}

/** Convert "2024-11" to "Nov-2024" for display */
export function formatMonthForDisplay(ym) {
  if (!ym) return "Present";
  const [y, m] = String(ym).split("-");
  const month = parseInt(m, 10);
  return month ? `${MONTHS[month - 1]}-${y}` : ym;
}

/** Parse "Nov-2024 to Nov-2024" or "Jun-2024 to Present" */
export function parseDateRange(dateStr) {
  if (!dateStr) return { startDate: "", endDate: "", isPresent: false };
  const parts = String(dateStr).split(" to ");
  const start = parseMonthToInput(parts[0]?.trim());
  const endPart = parts[1]?.trim();
  if (endPart === "Present" || !endPart) {
    return { startDate: start, endDate: "", isPresent: true };
  }
  return { startDate: start, endDate: parseMonthToInput(endPart), isPresent: false };
}

/** Build date string from form values */
export function buildDateString(startDate, endDate, isPresent) {
  if (!startDate) return "";
  const start = formatMonthForDisplay(startDate);
  if (isPresent) return `${start} to Present`;
  if (!endDate) return start;
  return `${start} to ${formatMonthForDisplay(endDate)}`;
}
