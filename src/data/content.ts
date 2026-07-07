import {
  ShieldCheck,
  FileText,
  Scale,
  FileCheck2,
  AlertTriangle,
  Network,
  Search,
  BookOpen,
  UserCheck,
  Wallet,
  Coins,
  LineChart,
  Building2,
  Landmark,
  FileSignature,
  Lock,
  BadgeCheck,
  Globe,
} from "lucide-react";

// Non-chain trust items. The chain items (BNB Chain Live, Solana / Base coming
// soon) are rendered from `@/data/chains` alongside these on the home page.
export const trustStrip = [
  { label: "Property Documentation", icon: FileText },
  { label: "KYC/AML Flow", icon: ShieldCheck },
  { label: "Legal Wrapper", icon: Scale },
];

export const whyJia = [
  {
    icon: ShieldCheck,
    title: "Compliance-first by design",
    body: "Every pool is built around KYC/AML flows, eligibility requirements, and jurisdictional disclosures — not around bypassing them.",
  },
  {
    icon: Scale,
    title: "Legal wrapper + on-chain record",
    body: "Live pools are designed to connect an offchain legal wrapper (such as an SPV) with an onchain participation record for transparency.",
  },
  {
    icon: FileText,
    title: "Document transparency",
    body: "A structured document vault gives eligible users access to valuation, title review, legal summaries, audits, and pool terms.",
  },
  {
    icon: FileCheck2,
    title: "Audited smart contracts",
    body: "Pool contracts are prepared for third-party audit, with contract addresses and audit status surfaced directly in each pool.",
  },
  {
    icon: AlertTriangle,
    title: "Honest risk disclosure",
    body: "We present risk ratings and factors plainly. No pool is described as risk-free, and no returns are guaranteed.",
  },
  {
    icon: Network,
    title: "Built for BNB Chain",
    body: "Participation records and settlement run on BNB Chain, with wallet connection and network checks built into the flow.",
  },
];

export const howItWorksSteps = [
  {
    icon: Search,
    title: "Discover verified property pools",
    body: "Browse curated pools with location, asset type, jurisdiction, and current lifecycle status.",
  },
  {
    icon: BookOpen,
    title: "Review documents and risks",
    body: "Open the document vault and read the risk disclosures before considering participation.",
  },
  {
    icon: UserCheck,
    title: "Complete eligibility checks",
    body: "Eligible users complete KYC/AML checks and acknowledge the applicable risk disclosures.",
  },
  {
    icon: Wallet,
    title: "Connect wallet on a supported network",
    body: "Jia currently prioritizes BNB Chain, with Solana and Base planned for future support. Live pool availability, eligibility requirements, and contract interactions may vary by network.",
  },
  {
    icon: Coins,
    title: "Participate through a pool contract",
    body: "Record participation through the pool's audited smart contract, subject to pool terms.",
  },
  {
    icon: LineChart,
    title: "Track your position and updates",
    body: "Follow your positions, documents, and pool lifecycle updates from your portfolio.",
  },
];

/** The four-layer architecture used on the How It Works page. */
export const architectureLayers = [
  {
    icon: Building2,
    title: "Offchain asset",
    body: "The underlying real-estate property, held and operated in the physical world.",
  },
  {
    icon: Landmark,
    title: "Legal wrapper",
    body: "An SPV or comparable structure that holds or represents the asset under applicable law.",
  },
  {
    icon: FileCheck2,
    title: "Smart contract pool",
    body: "An audited on-chain contract that records eligible-user participation and pool terms.",
  },
  {
    icon: Wallet,
    title: "User wallet",
    body: "The eligible user's BNB Chain wallet, holding the on-chain participation record.",
  },
];

export const complianceSections = [
  {
    icon: BadgeCheck,
    title: "Compliance-first access",
    body: "Jia is designed to support compliance-aware real-estate tokenization workflows. Access to live pools is intended to be gated by eligibility, not open to everyone by default.",
  },
  {
    icon: ShieldCheck,
    title: "KYC/AML",
    body: "Participation in live pools is intended to require identity verification and anti-money-laundering checks, where applicable, before an allocation can be recorded.",
  },
  {
    icon: UserCheck,
    title: "Investor eligibility",
    body: "Eligibility requirements may apply based on jurisdiction, status, and pool-specific terms. Some pools may be restricted to certain categories of users.",
  },
  {
    icon: Scale,
    title: "Legal wrappers",
    body: "Live pools are intended to be connected to an offchain legal wrapper, such as an SPV. Pool documents describe what a position represents and does not represent.",
  },
  {
    icon: AlertTriangle,
    title: "Risk disclosures",
    body: "Each pool presents risk factors and a risk rating. Users must review the applicable disclosures and acknowledge them where required before participating.",
  },
  {
    icon: Lock,
    title: "Smart contract audits",
    body: "Pool contracts are prepared for third-party audit. Audit status and contract addresses are surfaced per pool so users can review them directly.",
  },
  {
    icon: FileSignature,
    title: "Property document verification",
    body: "The document vault is designed to hold valuation reports, title reviews, legal summaries, and pool terms, with status indicators for each document.",
  },
  {
    icon: Globe,
    title: "Jurisdictional limitations",
    body: "Participation may be subject to jurisdictional restrictions. Availability of any pool may vary by location and applicable regulation, where applicable.",
  },
];

export const homeFaq = [
  {
    question: "What exactly is a Jia property pool?",
    answer:
      "A property pool is a curated real-estate opportunity presented with documentation, a defined legal wrapper, risk disclosures, and — for live pools — an on-chain participation record. A pool position does not automatically represent direct property title unless the pool documents explicitly say so.",
  },
  {
    question: "Who can participate?",
    answer:
      "Participation is limited to eligible users who complete KYC/AML checks and meet the pool's eligibility requirements. Availability may be subject to jurisdictional restrictions and pool-specific terms.",
  },
  {
    question: "Does Jia guarantee returns?",
    answer:
      "No. Jia does not offer guaranteed returns. Real estate and tokenized participation carry risk, including market, liquidity, regulatory, and smart-contract risk. Please review the risk disclosures.",
  },
  {
    question: "How does BNB Chain fit in?",
    answer:
      "BNB Chain is used for wallet connection, network verification, and recording eligible-user participation through audited pool contracts. Settlement and participation records run on BNB Chain.",
  },
  {
    question: "Is this investment advice?",
    answer:
      "No. Jia provides technology for exploring tokenized real-estate pool participation. Nothing on this site is investment, legal, tax, or financial advice.",
  },
];
