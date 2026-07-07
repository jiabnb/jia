import { cn } from "@/lib/utils";
import { ChainInfo, ChainKey } from "@/data/chains";

/**
 * Brand-accurate chain glyphs.
 *
 * - BNB: Binance five-diamond mark (inherits `currentColor` → gold on-brand).
 * - Solana: three right-leaning bars with the official green→purple gradient.
 * - Base: solid #0052FF disc with a horizontal slot cut from the left edge.
 *
 * Solana/Base keep their real brand colors; the surrounding badge stays muted
 * so Jia's dark/gold identity remains dominant.
 */
export function ChainIcon({ chain, className }: { chain: ChainKey; className?: string }) {
  const common = cn("h-4 w-4", className);
  switch (chain) {
    case "bnb":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          {/* center + N/S/E/W diamonds (Binance mark) */}
          <path d="M12 9l3 3-3 3-3-3 3-3z" />
          <path d="M12 3l3 3-3 3-3-3 3-3z" />
          <path d="M12 15l3 3-3 3-3-3 3-3z" />
          <path d="M6 9l3 3-3 3-3-3 3-3z" />
          <path d="M18 9l3 3-3 3-3-3 3-3z" />
        </svg>
      );
    case "solana":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <defs>
            <linearGradient
              id="jia-solana-grad"
              gradientUnits="userSpaceOnUse"
              x1="21"
              y1="4"
              x2="3"
              y2="20"
            >
              <stop stopColor="#19E39A" />
              <stop offset="0.5" stopColor="#597CE3" />
              <stop offset="1" stopColor="#D035DE" />
            </linearGradient>
          </defs>
          <g fill="url(#jia-solana-grad)">
            <path d="M6.2 4.2H21l-3.2 3.4H3z" />
            <path d="M6.2 10.3H21l-3.2 3.4H3z" />
            <path d="M6.2 16.4H21l-3.2 3.4H3z" />
          </g>
        </svg>
      );
    case "base":
      return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#0052FF"
            d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM2 10.7h10v2.6H2z"
          />
        </svg>
      );
  }
}

/** Accent color per chain, intentionally understated for future networks. */
function iconTone(chain: ChainInfo): string {
  if (chain.status === "live") return "text-gold";
  if (chain.key === "solana") return "text-indigo-300/70";
  if (chain.key === "base") return "text-sky-300/70";
  return "text-muted";
}

interface ChainBadgeProps {
  chain: ChainInfo;
  className?: string;
}

/** Compact pill: icon + name + status. Live = gold accent, soon = muted. */
export function ChainBadge({ chain, className }: ChainBadgeProps) {
  const live = chain.status === "live";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium leading-none transition-colors",
        live
          ? "border-gold/40 bg-gold/10 text-cream"
          : "border-white/10 bg-white/[0.03] text-muted",
        className
      )}
    >
      <ChainIcon chain={chain.key} className={cn("h-4 w-4", iconTone(chain))} />
      {chain.name}
      <StatusPill status={chain.status} label={chain.statusLabel} />
    </span>
  );
}

export function StatusPill({
  status,
  label,
}: {
  status: "live" | "soon";
  label: string;
}) {
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-gold-gradient px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#1a1408]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#1a1408]" />
        {label}
      </span>
    );
  }
  return (
    <span className="rounded-full border border-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted/80">
      {label}
    </span>
  );
}
