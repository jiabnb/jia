# Jia — Compliance-first Real-Estate RWA Platform on BNB Chain

Jia helps eligible users explore tokenized real-estate opportunities with property
documentation, risk disclosures, KYC-gated participation, and transparent smart-contract
records. This repository is the rebuilt website and dApp experience — a premium,
compliance-aware RWA platform (not a presale page).

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — single design system (see `tailwind.config.ts` + `globals.css`)
- **Framer Motion** — tasteful reveal / stagger / float animations
- **lucide-react** — icons
- **wagmi + viem** — wallet connection, BNB Chain network detection

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Design system

| Token | Value |
| --- | --- |
| Backgrounds | `#08080D` / `#0D0D14` / `#12121C` |
| Cards | `#141420` / `#191927` |
| Gold | `#F2C766` / `#E5B84B` |
| Muted text | `#A7A7B5` |
| Cream text | `#FFF7E5` |
| Borders | `rgba(242,199,102,0.16)` |

Reusable UI primitives live in `src/components/ui` (`Button`, `Badge`, `Accordion`,
`SectionHeading`, `Reveal`, `Logo`). Domain components: `PropertyCard`, `DocumentVault`,
`RiskDisclosure`, `FundingProgress` (bar + ring), `StatCard`, `TrustBadge`, plus wallet
components (`ConnectWallet`, `WalletGate`, `EligibilityGate`) and `property/PoolPanel`.

## Pages / routes

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, trust strip, why Jia, featured pools, 4-layer model, compliance, BNB Chain, document transparency, risk band, FAQ |
| `/pools` | Property Pools listing with search + filters |
| `/pools/[slug]` | Property detail — gallery, specs, timeline, legal structure, risk factors, document vault, smart-contract info, FAQ, sticky pool panel |
| `/portfolio` | Wallet positions (all states: disconnected, wrong network, loading, empty, populated) |
| `/how-it-works` | 6-step journey + four-layer architecture diagram |
| `/compliance` | KYC/AML, eligibility, legal wrappers, disclosures, no-advice |
| `/risk` | Dedicated risk disclosure |
| `/admin` | Issuer dashboard (in-memory demo) for managing pools |

## Wiring real data / contracts later

Everything is mock-backed but shaped for real integration:

- **Property data** — `src/data/properties.ts` exports a typed `Property[]` and
  `getPropertyBySlug` / `getAllSlugs`. Replace these with API / indexer calls; the
  `Property` type in `src/lib/types.ts` is the contract.
- **Wallet / network** — `src/lib/wagmi.ts` configures BNB Chain (mainnet + testnet) via
  the injected connector. Add WalletConnect/other connectors here.
- **Participation flow** — `EligibilityGate` implements the gated steps (connect → network
  → KYC/AML → risk acknowledgement → amount → confirm). The confirm step is a clearly
  labelled placeholder; swap it for a `useWriteContract` call to the pool contract.
- **Portfolio** — `PortfolioClient` reads mock positions; replace with on-chain reads /
  an indexer keyed on the connected address.
- **Issuer dashboard** — `AdminClient` edits in-memory state; persist to a backend or an
  on-chain registry.

## Positioning & copy guardrails

Jia is a **compliance-first** platform. Copy avoids "guaranteed yield", "risk-free",
"own property instantly", "no middlemen", etc., and uses "eligible users", "property
pools", "legal wrapper / SPV", "KYC/AML", "risk disclosures", "audited contracts", and
"tokenized participation". Nothing on the site is investment advice, and no real
transaction is broadcast in this demo.
