import { format, formatDistanceToNow, parseISO } from "date-fns";

export function formatDate(date: string | Date, pattern = "d MMM yyyy"): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, pattern);
}

export function fromNow(date: string | Date): string {
  const d = typeof date === "string" ? parseISO(date) : date;
  return formatDistanceToNow(d, { addSuffix: true });
}
