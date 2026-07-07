import { type ClassValue } from "./types";

/**
 * Minimal className combiner (no external clsx dependency).
 * Accepts strings, arrays, and conditional objects.
 */
export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === "string" || typeof input === "number") {
      out.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) out.push(nested);
    } else if (typeof input === "object") {
      for (const [key, value] of Object.entries(input)) {
        if (value) out.push(key);
      }
    }
  }
  return out.join(" ");
}

/** Format a BNB amount with sensible precision and a trailing symbol. */
export function formatBnb(value: number, opts?: { symbol?: boolean }): string {
  const symbol = opts?.symbol === false ? "" : " BNB";
  const formatted =
    value >= 1000
      ? value.toLocaleString("en-US", { maximumFractionDigits: 0 })
      : value.toLocaleString("en-US", { maximumFractionDigits: 2 });
  return `${formatted}${symbol}`;
}

/** Percentage of raised vs target, clamped 0–100 with one decimal. */
export function fundingPercent(raised: number, target: number): number {
  if (target <= 0) return 0;
  const pct = (raised / target) * 100;
  return Math.max(0, Math.min(100, Math.round(pct * 10) / 10));
}

/** Shorten an EVM address to 0x1234…abcd */
export function shortenAddress(address?: string, chars = 4): string {
  if (!address) return "";
  return `${address.slice(0, chars + 2)}…${address.slice(-chars)}`;
}
