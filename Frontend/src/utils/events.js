/**
 * Event date helpers shared by pages that show events.
 * Dates from the API are 'YYYY-MM-DD' strings (startDate / endDate).
 */

// Parse 'YYYY-MM-DD' as a local date (new Date('YYYY-MM-DD') would use UTC).
export function parseLocalDate(isoDate) {
  if (!isoDate) return null;
  const [year, month, day] = String(isoDate).slice(0, 10).split('-').map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

// An event stays "upcoming" until the end of its last day.
export function isUpcoming(event, now = new Date()) {
  const lastDay = parseLocalDate(event.endDate || event.startDate);
  if (!lastDay) return false;
  lastDay.setHours(23, 59, 59, 999);
  return lastDay >= now;
}

/**
 * Splits events into upcoming (soonest first) and past (most recent first).
 */
export function splitEvents(events = [], now = new Date()) {
  const byStart = (a, b) =>
    (parseLocalDate(a.startDate)?.getTime() ?? 0) - (parseLocalDate(b.startDate)?.getTime() ?? 0);
  const upcoming = events.filter((e) => isUpcoming(e, now)).sort(byStart);
  const past = events.filter((e) => !isUpcoming(e, now)).sort((a, b) => byStart(b, a));
  return { upcoming, past };
}

/** { day: '15', month: 'Dec', year: '2025' } for the editorial date column. */
export function dateParts(isoDate) {
  const date = parseLocalDate(isoDate);
  if (!date) return null;
  return {
    day: String(date.getDate()).padStart(2, '0'),
    month: date.toLocaleDateString('en-GB', { month: 'short' }),
    year: String(date.getFullYear()),
  };
}
