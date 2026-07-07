import type { Metadata } from "next";
import { PoolsClient } from "./PoolsClient";
import { properties } from "@/data/properties";
import { Reveal } from "@/components/ui/Reveal";
import { ChainBadge } from "@/components/ChainBadge";
import { chains } from "@/data/chains";

export const metadata: Metadata = {
  title: "Property Pools",
  description:
    "Browse curated real-estate property pools on BNB Chain with documentation, jurisdiction, funding context, and lifecycle status.",
};

export default function PoolsPage() {
  return (
    <div className="section-pad">
      <div className="container-page">
        <Reveal className="flex flex-col gap-4">
          <span className="eyebrow">Property Pools</span>
          <h1 className="heading-xl">Explore curated property pools</h1>
          <p className="body-muted max-w-2xl">
            Each pool is a curated real-estate opportunity presented with property
            documentation, jurisdiction, funding context, KYC requirements, and a clear
            lifecycle status. Participation is limited to eligible users.
          </p>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center">
            <span className="text-xs font-medium uppercase tracking-wide text-muted">
              Live pools settle on
            </span>
            <div className="flex flex-wrap gap-2">
              {chains.map((chain) => (
                <ChainBadge key={chain.key} chain={chain} />
              ))}
            </div>
          </div>
          <p className="text-xs text-muted">
            All pools currently run on BNB Chain. Solana and Base are planned expansions —
            no pool is available on those networks yet.
          </p>
        </Reveal>

        <div className="mt-10">
          <PoolsClient properties={properties} />
        </div>
      </div>
    </div>
  );
}
