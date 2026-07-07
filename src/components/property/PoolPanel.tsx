"use client";

import {
  Network,
  ShieldCheck,
  FileWarning,
  Target,
  Coins,
  UserCheck,
} from "lucide-react";
import { Property } from "@/lib/types";
import { FundingRing } from "@/components/FundingProgress";
import { Badge, statusTone } from "@/components/ui/Badge";
import { EligibilityGate } from "@/components/wallet/EligibilityGate";
import { ChainIcon, StatusPill } from "@/components/ChainBadge";
import { upcomingChains, COMING_SOON_TOOLTIP } from "@/data/chains";
import { formatBnb } from "@/lib/utils";
import { useJiaStore } from "@/lib/store";

function Row({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 py-2.5">
      <span className="inline-flex items-center gap-2 text-sm text-muted">
        <span className="text-gold/70">{icon}</span>
        {label}
      </span>
      <span className="text-right text-sm font-medium text-cream">{value}</span>
    </div>
  );
}

export function PoolPanel({ property }: { property: Property }) {
  const { eligibilityComplete } = useJiaStore();
  return (
    <div className="rounded-2xl border border-gold bg-card p-6">
      <div className="flex items-center justify-between">
        <Badge tone={statusTone(property.status)}>{property.status}</Badge>
        <span className="text-xs text-muted">{property.jurisdiction}</span>
      </div>

      <div className="mt-6 flex justify-center">
        <FundingRing raised={property.raisedBnb} target={property.targetBnb} />
      </div>

      <div className="mt-6 divide-y divide-white/5">
        <Row icon={<Target className="h-4 w-4" />} label="Target raise" value={formatBnb(property.targetBnb)} />
        <Row icon={<Coins className="h-4 w-4" />} label="Raised" value={formatBnb(property.raisedBnb)} />
        <Row
          icon={<Coins className="h-4 w-4" />}
          label="Min. participation"
          value={formatBnb(property.minParticipationBnb)}
        />
        <Row
          icon={<Network className="h-4 w-4" />}
          label="Network"
          value={
            <span className="inline-flex items-center gap-1.5">
              <ChainIcon chain="bnb" className="h-3.5 w-3.5 text-gold" />
              BNB Chain
            </span>
          }
        />
        <Row
          icon={<UserCheck className="h-4 w-4" />}
          label="Eligibility"
          value={<Badge tone="gold">Required</Badge>}
        />
        <Row
          icon={<ShieldCheck className="h-4 w-4" />}
          label="KYC status"
          value={
            eligibilityComplete ? (
              <Badge tone="green">Verified (demo)</Badge>
            ) : (
              <span className="text-amber-300">Placeholder</span>
            )
          }
        />
        <Row
          icon={<FileWarning className="h-4 w-4" />}
          label="Risk acknowledgement"
          value={<span className="text-muted">Required to participate</span>}
        />
      </div>

      {/* Future networks — disabled, roadmap only */}
      <div className="mt-5 rounded-lg border border-white/5 bg-white/[0.02] p-3">
        <div className="text-[11px] font-medium uppercase tracking-wide text-muted">
          Future networks
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {upcomingChains.map((chain) => (
            <span
              key={chain.key}
              title={COMING_SOON_TOOLTIP}
              aria-disabled="true"
              className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-xs text-muted/80"
            >
              <ChainIcon
                chain={chain.key}
                className={
                  chain.key === "solana"
                    ? "h-3.5 w-3.5 text-indigo-300/60"
                    : "h-3.5 w-3.5 text-sky-300/60"
                }
              />
              {chain.name}
              <StatusPill status="soon" label="Soon" />
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 border-t border-white/5 pt-6">
        <EligibilityGate property={property} />
      </div>
    </div>
  );
}
