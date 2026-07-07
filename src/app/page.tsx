import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Building2,
  Landmark,
  FileCheck2,
  Wallet,
  ShieldCheck,
  Lock,
  Network,
  Gauge,
  Layers,
  Server,
} from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { TrustBadge } from "@/components/TrustBadge";
import { PropertyCard } from "@/components/PropertyCard";
import { ChainIcon, StatusPill } from "@/components/ChainBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { properties } from "@/data/properties";
import { chains } from "@/data/chains";
import {
  trustStrip,
  whyJia,
  architectureLayers,
  complianceSections,
  homeFaq,
} from "@/data/content";

export default function HomePage() {
  const featured = properties.slice(0, 3);

  return (
    <>
      <Hero />

      {/* Trust strip */}
      <section className="border-y border-gold bg-surface/50">
        <div className="container-page py-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-4 sm:gap-x-8 lg:justify-between">
            {trustStrip.map((item) => (
              <TrustBadge key={item.label} icon={<item.icon className="h-4 w-4" />} label={item.label} />
            ))}
            {chains.map((chain) => (
              <div
                key={chain.key}
                className="flex items-center gap-2 whitespace-nowrap text-sm font-medium"
              >
                <ChainIcon
                  chain={chain.key}
                  className={
                    chain.status === "live"
                      ? "h-4 w-4 text-gold"
                      : chain.key === "solana"
                        ? "h-4 w-4 text-indigo-300/70"
                        : "h-4 w-4 text-sky-300/70"
                  }
                />
                <span className={chain.status === "live" ? "text-cream" : "text-muted"}>
                  {chain.name}
                </span>
                <StatusPill status={chain.status} label={chain.statusLabel} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Jia */}
      <section id="why" className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="Why Jia"
            title="A regulated-fintech approach to real-estate RWAs"
            description="Jia is not a permissionless free-for-all. It is a compliance-first platform that puts documentation, eligibility, and honest disclosure at the center of every property pool."
          />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyJia.map((item) => (
              <StaggerItem key={item.title}>
                <div className="card-base card-hover flex h-full flex-col gap-4 p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cream">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Featured pools */}
      <section className="section-pad bg-surface/40">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeading
              eyebrow="Featured Property Pools"
              title="Curated pools in due diligence and allocation"
              description="Each pool is presented with documentation, jurisdiction, funding context, and a clear lifecycle status."
            />
            <Reveal>
              <ButtonLink href="/pools" variant="secondary" className="shrink-0">
                View all pools <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <StaggerItem key={p.id} className="h-full">
                <PropertyCard property={p} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* How tokenized real estate works */}
      <section className="section-pad">
        <div className="container-page">
          <SectionHeading
            eyebrow="How tokenized real estate works"
            title="Four layers, from the physical asset to your wallet"
            description="Jia connects an offchain property and its legal wrapper to an audited smart-contract pool and, finally, your BNB Chain wallet."
            align="center"
          />
          <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {architectureLayers.map((layer, i) => (
              <StaggerItem key={layer.title}>
                <div className="relative flex h-full flex-col gap-4 rounded-2xl border border-gold bg-card p-6">
                  <span className="absolute right-5 top-5 font-display text-3xl font-semibold text-white/5">
                    0{i + 1}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                    <layer.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cream">{layer.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{layer.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-8 text-center">
            <ButtonLink href="/how-it-works" variant="outline">
              See the full flow <ArrowRight className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
        </div>
      </section>

      {/* Compliance & verification layer */}
      <section className="section-pad bg-surface/40">
        <div className="container-page grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow">Compliance & verification layer</span>
            <h2 className="heading-lg mt-4">
              Eligibility, documentation, and disclosure at every step
            </h2>
            <p className="body-muted mt-4">
              Jia is designed to support compliance-aware real-estate tokenization
              workflows. Participation in any live pool may be subject to jurisdictional
              restrictions, KYC/AML checks, eligibility requirements, pool-specific terms,
              and risk acknowledgements.
            </p>
            <div className="mt-8">
              <ButtonLink href="/compliance">
                Explore the compliance layer <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2">
            {complianceSections.slice(0, 4).map((s) => (
              <StaggerItem key={s.title}>
                <div className="card-base flex h-full flex-col gap-3 p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                    <s.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-semibold text-cream">{s.title}</h3>
                  <p className="text-xs leading-relaxed text-muted">{s.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* BNB Chain infrastructure */}
      <section className="section-pad">
        <div className="container-page">
          <div className="overflow-hidden rounded-3xl border border-gold bg-card">
            <div className="grid lg:grid-cols-2">
              <div className="flex flex-col justify-center gap-6 p-8 sm:p-12">
                <span className="eyebrow">
                  <Network className="h-3.5 w-3.5" /> BNB Chain infrastructure
                </span>
                <h2 className="heading-md">
                  Wallet connection, network checks, and on-chain records
                </h2>
                <p className="body-muted">
                  Jia runs on BNB Chain for fast, low-cost settlement. Wallet connection,
                  network verification, and participation records are built into the
                  product, with contract addresses and audit status surfaced per pool.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { icon: Gauge, label: "Low-cost settlement" },
                    { icon: Layers, label: "On-chain records" },
                    { icon: Server, label: "Audited contracts" },
                  ].map((f) => (
                    <div key={f.label} className="flex flex-col gap-2">
                      <f.icon className="h-5 w-5 text-gold" />
                      <span className="text-sm text-cream">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[280px] border-t border-gold lg:border-l lg:border-t-0">
                <Image
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"
                  alt="BNB Chain infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent lg:bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multichain RWA expansion */}
      <section className="section-pad bg-surface/40">
        <div className="container-page">
          <SectionHeading
            eyebrow="Multichain RWA Expansion"
            title="Expanding Real Estate RWAs Across Leading Chains"
            description="Jia starts with BNB Chain and is preparing future support for Solana and Base to make compliant real-estate RWA participation easier to access across multiple ecosystems."
            align="center"
          />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {chains.map((chain) => {
              const live = chain.status === "live";
              return (
                <StaggerItem key={chain.key} className="h-full">
                  <div
                    className={`flex h-full flex-col gap-4 rounded-2xl border p-6 ${
                      live
                        ? "border-gold/40 bg-gradient-to-b from-card to-surface"
                        : "border-gold bg-card"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                          live
                            ? "border-gold/25 bg-gold/10 text-gold"
                            : "border-white/10 bg-white/[0.03]"
                        } ${chain.key === "solana" ? "text-indigo-300/80" : ""} ${
                          chain.key === "base" ? "text-sky-300/80" : ""
                        }`}
                      >
                        <ChainIcon chain={chain.key} className="h-5 w-5" />
                      </div>
                      <StatusPill status={chain.status} label={chain.statusLabel} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-cream">
                        {chain.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-muted">
                        {chain.role}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-muted">{chain.blurb}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <Reveal className="mx-auto mt-8 max-w-3xl text-center">
            <p className="text-xs leading-relaxed text-muted">
              Solana and Base support are roadmap items and are not active unless marked
              live inside the app. Jia does not claim partnerships with Solana, Base, or
              any foundation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Document transparency */}
      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-center">
          <Stagger className="order-2 grid gap-3 lg:order-1">
            {[
              { icon: FileCheck2, title: "Property Summary Memo", status: "Available" },
              { icon: Building2, title: "Valuation Report", status: "Available" },
              { icon: Landmark, title: "Ownership / Title Review", status: "Under Review" },
              { icon: ShieldCheck, title: "Smart Contract Audit", status: "Available" },
            ].map((d) => (
              <StaggerItem key={d.title}>
                <div className="flex items-center justify-between rounded-xl border border-gold bg-card px-5 py-4">
                  <div className="flex items-center gap-3">
                    <d.icon className="h-4.5 w-4.5 text-gold" />
                    <span className="text-sm font-medium text-cream">{d.title}</span>
                  </div>
                  <span className="text-xs text-muted">{d.status}</span>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="order-1 lg:order-2">
            <span className="eyebrow">
              <Lock className="h-3.5 w-3.5" /> Document transparency
            </span>
            <h2 className="heading-lg mt-4">A document vault for every pool</h2>
            <p className="body-muted mt-4">
              Each pool includes a structured document vault — valuation reports, title
              reviews, legal wrapper summaries, risk disclosures, audits, and pool terms —
              with clear status indicators so eligible users know what has been reviewed.
            </p>
            <div className="mt-8">
              <ButtonLink href="/pools" variant="secondary">
                Browse pools <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Risk disclosure band */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal className="rounded-3xl border border-gold bg-gradient-to-br from-card to-surface p-8 sm:p-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <span className="eyebrow text-rose-300">Risk disclosure</span>
                <h2 className="heading-md mt-4">
                  Real estate and tokenized participation carry risk
                </h2>
                <p className="body-muted mt-4">
                  No pool is risk-free and no returns are guaranteed. Market, liquidity,
                  regulatory, jurisdiction, valuation, counterparty, and smart-contract
                  risks apply. Always review the official pool documents.
                </p>
              </div>
              <ButtonLink href="/risk" variant="outline" size="lg" className="shrink-0">
                Read risk disclosure <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section-pad bg-surface/40">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions eligible users ask"
            description="Straight answers about pools, eligibility, and how Jia works."
          />
          <Accordion items={homeFaq} />
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-3xl border border-gold bg-card px-8 py-14 text-center sm:px-12">
            <div className="bg-radial-fade absolute inset-0" />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
                <Wallet className="h-6 w-6" />
              </div>
              <h2 className="heading-lg">Explore curated real-estate pools on BNB Chain</h2>
              <p className="body-muted">
                Review documentation, understand the risks, and complete eligibility checks
                to participate in property pools — the compliance-first way.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href="/pools" size="lg">
                  Explore Pools <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/how-it-works" variant="secondary" size="lg">
                  How Jia Works
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
