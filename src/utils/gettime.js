import {
  differenceInCalendarDays,
  differenceInHours,
  format,
  isYesterday,
  startOfDay,
} from "date-fns";

export function getTime(isoString) {
  const now = new Date(Date.now());
  const midnight = new Date(startOfDay(now));
  const elpasedHours = differenceInHours(now, midnight);
  const fromDays = new Date(isoString);
  const calendarDays = differenceInCalendarDays(now, fromDays);

  if (calendarDays === 1) return "Yesterday";
  if (calendarDays === 2) return "2 days ago";
  if (calendarDays > 2 && calendarDays <= 7) return format(fromDays, "EEEE");
  if (calendarDays > 7) return format(fromDays, "MM/dd/yyyy");

  console.log(isYesterday, now, elpasedHours);
}
