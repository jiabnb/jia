/**
 * Network positioning for Jia.
 *
 * BNB Chain is the primary, live settlement network. Solana and Base are
 * roadmap expansions — "coming soon" only. Nothing here should imply Solana or
 * Base are live, and no contracts or partnerships are claimed for them.
 */
export type ChainStatus = "live" | "soon";
export type ChainKey = "bnb" | "solana" | "base";

export interface ChainInfo {
  key: ChainKey;
  name: string;
  status: ChainStatus;
  /** Short pill label. */
  statusLabel: string;
  /** Role line used on expansion cards. */
  role: string;
  /** Longer description for the multichain expansion section. */
  blurb: string;
}

export const chains: ChainInfo[] = [
  {
    key: "bnb",
    name: "BNB Chain",
    status: "live",
    statusLabel: "Live",
    role: "Live · Primary Network",
    blurb:
      "Jia's initial property pool experience is built around BNB Chain for low-cost participation, transparent smart-contract records, and scalable RWA infrastructure.",
  },
  {
    key: "solana",
    name: "Solana",
    status: "soon",
    statusLabel: "Coming Soon",
    role: "Planned · Future Network",
    blurb:
      "Solana support is planned to bring Jia's real-estate RWA experience to a high-performance ecosystem known for fast settlement and active retail participation.",
  },
  {
    key: "base",
    name: "Base",
    status: "soon",
    statusLabel: "Coming Soon",
    role: "Planned · Future Network",
    blurb:
      "Base support is planned to expand Jia's reach into an Ethereum-aligned ecosystem with strong consumer adoption and growing onchain finance activity.",
  },
];

export const liveChains = chains.filter((c) => c.status === "live");
export const upcomingChains = chains.filter((c) => c.status === "soon");

/** Tooltip used on any disabled future-network control. */
export const COMING_SOON_TOOLTIP =
  "Coming soon. Jia currently supports BNB Chain for live pool interactions.";
