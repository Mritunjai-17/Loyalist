const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** ISO date (YYYY-MM-DD) to "October 19, 2026". */
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

const integer = new Intl.NumberFormat("en-US");
export function formatNumber(value: number): string {
  return integer.format(value);
}
