import {
  differenceInCalendarDays,
  differenceInSeconds,
  format,
} from "date-fns";

export function getTime(isoString) {
  const now = new Date(Date.now());
  const fromDays = new Date(isoString);
  const calendarDays = differenceInCalendarDays(now, fromDays);
  const subMins = differenceInSeconds(now, fromDays);

  if (calendarDays === 0) {
    if (subMins < 60) {
      return "Just now";
    } else {
      return format(fromDays, "h:mm a");
    }
  }
  if (calendarDays === 1) return "Yesterday";
  if (calendarDays === 2) return "2 days ago";
  if (calendarDays > 2 && calendarDays <= 7) return format(fromDays, "EEEE");
  if (calendarDays > 7) return format(fromDays, "MM/dd/yyyy");
}

export function getTimeSent(isoString) {
  if (isNaN(new Date(isoString).getTime())) {
    console.error("Invalid Date:", isoString); // Log invalid dates for debugging
    return "Invalid Time"; // Fallback when date is invalid
  }

  return format(new Date(isoString), "h:mm a");
}
