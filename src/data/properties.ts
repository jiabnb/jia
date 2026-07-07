import { Property } from "@/lib/types";

/**
 * Mock property-pool data for the Jia platform.
 *
 * This structure mirrors what a real backend / indexer would return so the UI
 * can be wired to live APIs and on-chain reads later without shape changes.
 * All figures, addresses, and documents here are placeholders for demonstration.
 */
export const properties: Property[] = [
  {
    id: "jia-001",
    slug: "kempinski-residences",
    name: "Kempinski Residences",
    location: "Dubai, UAE",
    jurisdiction: "United Arab Emirates",
    assetType: "Residence",
    tagline:
      "A curated residential property pool undergoing document review and eligibility-gated allocation on BNB Chain.",
    description:
      "Kempinski Residences is a curated residential real-estate pool currently in structured due diligence. The pool is being prepared for eligibility-gated allocation, with an offchain legal wrapper and an onchain participation record designed to keep documentation, terms, and contribution history transparent for eligible users. Participation does not automatically represent direct property title unless explicitly stated in the pool documents.",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
    ],
    targetBnb: 40,
    raisedBnb: 16,
    minParticipationBnb: 0.25,
    status: "Due Diligence",
    riskLevel: "Medium",
    locked: true,
    kycRequired: true,
    documentsAvailable: 4,
    contractAddress: null,
    auditStatus: "In Audit",
    legalWrapper: "SPV (jurisdiction-specific), pending final review",
    legalReviewStatus: "Legal review in progress",
    expectedTimeline: "Allocation window expected to open following due diligence",
    specs: [
      { label: "Asset type", value: "Branded residence" },
      { label: "Bedrooms", value: "2–3 configurations" },
      { label: "Interior area", value: "~180–240 sqm" },
      { label: "Ownership model", value: "Pool position via legal wrapper" },
      { label: "Settlement network", value: "BNB Chain" },
      { label: "Currency", value: "BNB" },
    ],
    documents: [
      { name: "Property Summary Memo", status: "Available", lastUpdated: "2026-06-28" },
      { name: "Valuation Report", status: "Available", lastUpdated: "2026-06-20" },
      { name: "Ownership / Title Review", status: "Under Review", lastUpdated: "2026-07-01" },
      { name: "SPV / Legal Wrapper Summary", status: "Under Review", lastUpdated: "2026-07-02" },
      { name: "Risk Disclosure", status: "Available", lastUpdated: "2026-06-15" },
      { name: "Smart Contract Audit", status: "Pending", lastUpdated: "—" },
      { name: "Pool Terms", status: "Available", lastUpdated: "2026-06-30" },
    ],
    risks: [
      {
        title: "Due diligence not finalized",
        detail:
          "Title review and legal wrapper documentation are still under review. Terms may change before an allocation window opens.",
      },
      {
        title: "Real estate market risk",
        detail:
          "Property values and rental demand in the relevant market can decline. Historical performance does not indicate future results.",
      },
      {
        title: "Liquidity risk",
        detail:
          "Pool positions may be difficult or impossible to exit before a defined event. There is no assurance of a secondary market.",
      },
    ],
    timeline: [
      { phase: "Sourcing & screening", description: "Asset identified and initial screening completed.", state: "complete" },
      { phase: "Due diligence", description: "Title, valuation, and legal wrapper review underway.", state: "active" },
      { phase: "Contract & audit", description: "Pool contract deployment and third-party audit.", state: "upcoming" },
      { phase: "Eligibility-gated allocation", description: "Open to eligible users who complete KYC/AML checks.", state: "upcoming" },
    ],
    faq: [
      {
        question: "Can I participate in this pool today?",
        answer:
          "This pool is in due diligence and is not open for allocation. Eligible users can register interest and complete eligibility checks in advance.",
      },
      {
        question: "Does a pool position represent property title?",
        answer:
          "Not unless explicitly stated in the pool documents. The position represents participation in the pool as described by its legal wrapper and terms.",
      },
    ],
  },
  {
    id: "jia-002",
    slug: "the-address-by-emaar",
    name: "The Address By Emaar",
    location: "Dubai, UAE",
    jurisdiction: "United Arab Emirates",
    assetType: "Residence",
    tagline:
      "A premium residential RWA pool designed for transparent participation records, document access, and pool-level smart-contract tracking.",
    description:
      "The Address By Emaar is a premium residential RWA pool structured for transparent participation. Eligible users who complete KYC/AML checks can review the document vault, acknowledge the applicable risk disclosures, and record their participation through an audited pool contract on BNB Chain. The pool emphasizes clear terms, verifiable documentation, and on-chain contribution history rather than promises of return.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?auto=format&fit=crop&w=1600&q=80",
    ],
    targetBnb: 30,
    raisedBnb: 20,
    minParticipationBnb: 0.25,
    status: "Open for Eligible Users",
    riskLevel: "Medium",
    locked: false,
    kycRequired: true,
    documentsAvailable: 6,
    contractAddress: "0x7A9f1e2C4b6D8e0F1a2B3c4D5e6F7a8B9c0D1e2F",
    auditStatus: "Audited",
    legalWrapper: "SPV holding structure with defined pool terms",
    legalReviewStatus: "Legal review complete",
    expectedTimeline: "Allocation window currently open to eligible users",
    specs: [
      { label: "Asset type", value: "Branded residence" },
      { label: "Bedrooms", value: "1–3 configurations" },
      { label: "Interior area", value: "~90–210 sqm" },
      { label: "Ownership model", value: "Pool position via SPV" },
      { label: "Settlement network", value: "BNB Chain" },
      { label: "Currency", value: "BNB" },
    ],
    documents: [
      { name: "Property Summary Memo", status: "Available", lastUpdated: "2026-06-18" },
      { name: "Valuation Report", status: "Available", lastUpdated: "2026-06-10" },
      { name: "Ownership / Title Review", status: "Available", lastUpdated: "2026-06-12" },
      { name: "SPV / Legal Wrapper Summary", status: "Available", lastUpdated: "2026-06-14" },
      { name: "Risk Disclosure", status: "Available", lastUpdated: "2026-06-09" },
      { name: "Smart Contract Audit", status: "Available", lastUpdated: "2026-06-22" },
      { name: "Pool Terms", status: "Available", lastUpdated: "2026-06-25" },
    ],
    risks: [
      {
        title: "Real estate market risk",
        detail:
          "Property valuations and rental demand can fall. No target or projection should be read as a guaranteed outcome.",
      },
      {
        title: "Smart contract risk",
        detail:
          "Audited contracts reduce but do not eliminate the risk of bugs, exploits, or unexpected behavior.",
      },
      {
        title: "Regulatory & jurisdiction risk",
        detail:
          "Eligibility and participation may be restricted based on your jurisdiction and applicable regulations.",
      },
    ],
    timeline: [
      { phase: "Sourcing & screening", description: "Asset identified and initial screening completed.", state: "complete" },
      { phase: "Due diligence", description: "Title, valuation, and legal wrapper review completed.", state: "complete" },
      { phase: "Contract & audit", description: "Pool contract deployed and audited by a third party.", state: "complete" },
      { phase: "Eligibility-gated allocation", description: "Open to eligible users who complete KYC/AML checks.", state: "active" },
    ],
    faq: [
      {
        question: "What does completing eligibility involve?",
        answer:
          "Eligible users complete KYC/AML checks and acknowledge the risk disclosures before an allocation can be recorded on-chain. This demo uses placeholder eligibility status.",
      },
      {
        question: "Where can I review the contract?",
        answer:
          "The pool contract address is listed in the smart-contract section and the audit report is available in the document vault.",
      },
    ],
  },
  {
    id: "jia-003",
    slug: "palazzo-versace",
    name: "Palazzo Versace",
    location: "Dubai, UAE",
    jurisdiction: "United Arab Emirates",
    assetType: "Hotel Apartment",
    tagline:
      "A hospitality-linked real-estate opportunity presented with jurisdictional disclosures, property documentation, and eligibility-gated participation.",
    description:
      "Palazzo Versace is a hospitality-linked real-estate pool presented with full jurisdictional disclosures. The pool has completed its allocation window and is now fully allocated. Its document vault, legal wrapper summary, and on-chain participation records remain available so eligible participants can continue to review terms and track the pool through its lifecycle.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=80",
    ],
    targetBnb: 25,
    raisedBnb: 25,
    minParticipationBnb: 0.5,
    status: "Fully Allocated",
    riskLevel: "High",
    locked: true,
    kycRequired: true,
    documentsAvailable: 6,
    contractAddress: "0x3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0b1C2d",
    auditStatus: "Audited",
    legalWrapper: "SPV with hospitality-operator arrangements",
    legalReviewStatus: "Legal review complete",
    expectedTimeline: "Allocation closed; pool in active lifecycle tracking",
    specs: [
      { label: "Asset type", value: "Serviced hotel apartment" },
      { label: "Configuration", value: "Studio–2 bedroom" },
      { label: "Interior area", value: "~70–160 sqm" },
      { label: "Ownership model", value: "Pool position via SPV" },
      { label: "Settlement network", value: "BNB Chain" },
      { label: "Currency", value: "BNB" },
    ],
    documents: [
      { name: "Property Summary Memo", status: "Available", lastUpdated: "2026-05-28" },
      { name: "Valuation Report", status: "Available", lastUpdated: "2026-05-20" },
      { name: "Ownership / Title Review", status: "Available", lastUpdated: "2026-05-22" },
      { name: "SPV / Legal Wrapper Summary", status: "Available", lastUpdated: "2026-05-24" },
      { name: "Risk Disclosure", status: "Available", lastUpdated: "2026-05-18" },
      { name: "Smart Contract Audit", status: "Available", lastUpdated: "2026-05-30" },
      { name: "Pool Terms", status: "Available", lastUpdated: "2026-06-01" },
    ],
    risks: [
      {
        title: "Higher risk rating",
        detail:
          "This hospitality-linked pool carries a higher risk rating due to operator dependence and revenue variability. It is not a safe or low-risk position.",
      },
      {
        title: "Counterparty risk",
        detail:
          "Performance depends on third parties including the hospitality operator and the SPV. Counterparty failure can affect the pool.",
      },
      {
        title: "Liquidity & valuation risk",
        detail:
          "Positions may be illiquid and valuations are periodic estimates that can differ materially from realizable value.",
      },
    ],
    timeline: [
      { phase: "Sourcing & screening", description: "Asset identified and initial screening completed.", state: "complete" },
      { phase: "Due diligence", description: "Title, valuation, and legal wrapper review completed.", state: "complete" },
      { phase: "Contract & audit", description: "Pool contract deployed and audited by a third party.", state: "complete" },
      { phase: "Allocation completed", description: "Pool fully allocated; now in lifecycle tracking.", state: "complete" },
    ],
    faq: [
      {
        question: "Can I still participate?",
        answer:
          "No. This pool is fully allocated and the allocation window is closed. You can still review its documents and on-chain records.",
      },
      {
        question: "Why is the risk rating High?",
        answer:
          "Hospitality-linked assets depend on operator performance and variable revenue, which increases risk relative to standard residential pools.",
      },
    ],
  },
];

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return properties.map((p) => p.slug);
}
