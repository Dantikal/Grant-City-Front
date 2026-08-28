type Period = "month" | null;

/** Format a numeric price as USD, optionally with a "/mo" suffix for rentals. */
export function formatPrice(value: number, period: Period = null): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
  return period === "month" ? `${formatted} / mo` : formatted;
}

/** Short price for compact cards: $895K, $1.2M, $3.4K/mo. */
export function formatPriceCompact(value: number, period: Period = null): string {
  const compact = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
  return period === "month" ? `${compact}/mo` : compact;
}
