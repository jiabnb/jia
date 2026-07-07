"use client";

import { useEffect, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";
import {
  Wallet,
  WifiOff,
  Coins,
  Layers,
  Gift,
  Clock,
  FileSignature,
  ArrowUpRight,
  Inbox,
  AlertCircle,
} from "lucide-react";
import { ConnectWallet } from "@/components/wallet/ConnectWallet";
import { Badge, statusTone } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SUPPORTED_CHAIN_IDS, DEMO_ADDRESS } from "@/lib/wagmi";
import { useJiaStore } from "@/lib/store";
import { formatBnb, shortenAddress, cn } from "@/lib/utils";
import { properties } from "@/data/properties";
import { PoolStatus } from "@/lib/types";

/** Position shape — mirrors what an indexer would return per wallet. */
interface Position {
  slug: string;
  name: string;
  location: string;
  participatedBnb: number;
  status: PoolStatus;
  claimableBnb: number;
  documentsSigned: number;
}

interface Txn {
  hash: string;
  type: string;
  pool: string;
  amount: number;
  date: string;
}

// Baseline sample holdings — attributed to the Demo Wallet only, so a real
// injected wallet with no recorded participations correctly shows the empty
// state. Structured for replacement by on-chain reads / an indexer.
const SAMPLE_POSITIONS: Position[] = [
  {
    slug: "the-address-by-emaar",
    name: "The Address By Emaar",
    location: "Dubai, UAE",
    participatedBnb: 1.5,
    status: "Open for Eligible Users",
    claimableBnb: 0.04,
    documentsSigned: 3,
  },
  {
    slug: "palazzo-versace",
    name: "Palazzo Versace",
    location: "Dubai, UAE",
    participatedBnb: 1,
    status: "Fully Allocated",
    claimableBnb: 0,
    documentsSigned: 4,
  },
];

const SAMPLE_TXNS: Txn[] = [
  { hash: "0x9f2a…3c1d", type: "Participation", pool: "The Address By Emaar", amount: 1.5, date: "2026-06-24" },
  { hash: "0x71b8…9e0f", type: "Participation", pool: "Palazzo Versace", amount: 1, date: "2026-05-29" },
  { hash: "0x44c2…7a5b", type: "Distribution", pool: "The Address By Emaar", amount: 0.04, date: "2026-07-01" },
];

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card-base flex items-center gap-4 p-5">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
        {icon}
      </div>
      <div>
        <div className="font-display text-xl font-semibold text-cream">{value}</div>
        <div className="text-xs text-muted">{label}</div>
      </div>
    </div>
  );
}

function EmptyState({ icon, title, body, cta }: { icon: React.ReactNode; title: string; body: string; cta?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold bg-card px-6 py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
        {icon}
      </div>
      <div>
        <h3 className="font-display text-lg text-cream">{title}</h3>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted">{body}</p>
      </div>
      {cta}
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-[92px]" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="skeleton h-40" />
        ))}
      </div>
    </div>
  );
}

export function PortfolioClient() {
  const { address, isConnected, chainId } = useAccount();
  const { participations, eligibilityComplete, ready } = useJiaStore();
  const [loading, setLoading] = useState(false);
  const wrongNetwork = isConnected && chainId != null && !SUPPORTED_CHAIN_IDS.includes(chainId);

  const isDemoWallet = address?.toLowerCase() === DEMO_ADDRESS.toLowerCase();

  // Simulate an indexer fetch whenever a valid connection is established.
  useEffect(() => {
    if (isConnected && !wrongNetwork) {
      setLoading(true);
      const t = setTimeout(() => setLoading(false), 900);
      return () => clearTimeout(t);
    }
  }, [isConnected, wrongNetwork, address]);

  // Merge baseline (demo only) holdings with live recorded participations.
  const { positions, txns } = useMemo(() => {
    const map = new Map<string, Position>();
    const baseline = isDemoWallet ? SAMPLE_POSITIONS : [];
    for (const b of baseline) map.set(b.slug, { ...b });

    for (const p of participations) {
      const existing = map.get(p.slug);
      if (existing) {
        existing.participatedBnb += p.amountBnb;
        existing.documentsSigned += 1;
      } else {
        const prop = properties.find((x) => x.slug === p.slug);
        map.set(p.slug, {
          slug: p.slug,
          name: p.name,
          location: p.location,
          participatedBnb: p.amountBnb,
          status: prop?.status ?? "Open for Eligible Users",
          claimableBnb: 0,
          documentsSigned: 1,
        });
      }
    }

    const liveTxns: Txn[] = participations.map((p) => ({
      hash: p.txHash,
      type: "Participation",
      pool: p.name,
      amount: p.amountBnb,
      date: p.date,
    }));

    return {
      positions: [...map.values()],
      txns: [...liveTxns, ...(isDemoWallet ? SAMPLE_TXNS : [])],
    };
  }, [isDemoWallet, participations]);

  // --- Not connected ---
  if (!isConnected) {
    return (
      <EmptyState
        icon={<Wallet className="h-6 w-6" />}
        title="Connect your wallet"
        body="Connect your wallet to view Jia pool positions associated with your address."
        cta={<ConnectWallet />}
      />
    );
  }

  // --- Wrong network ---
  if (wrongNetwork) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] px-6 py-16 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
          <WifiOff className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-display text-lg text-cream">Wrong network</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-muted">
            Switch to BNB Chain to view the positions associated with this wallet.
          </p>
        </div>
        <ConnectWallet />
      </div>
    );
  }

  // --- Loading ---
  if (loading || !ready) return <LoadingSkeleton />;

  // --- Connected, no positions ---
  if (positions.length === 0) {
    return (
      <EmptyState
        icon={<Inbox className="h-6 w-6" />}
        title="No positions yet"
        body="No Jia pool positions found for this wallet. Explore pools and complete eligibility to participate."
        cta={
          <Link href="/pools">
            <Button size="sm" variant="secondary">Explore pools</Button>
          </Link>
        }
      />
    );
  }

  const totalParticipated = positions.reduce((s, p) => s + p.participatedBnb, 0);
  const totalClaimable = positions.reduce((s, p) => s + p.claimableBnb, 0);
  const docsSigned = positions.reduce((s, p) => s + p.documentsSigned, 0);

  return (
    <div className="space-y-8">
      {/* Demo banner */}
      <div className="flex items-start gap-2.5 rounded-xl border border-gold/15 bg-gold/[0.04] p-4 text-xs leading-relaxed text-muted">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
        <span>
          Showing prototype portfolio data for {shortenAddress(address)}. Positions you
          record on a pool appear here instantly. In production these would be read from
          on-chain pool contracts and an indexer.
        </span>
      </div>

      {/* Summary tiles */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatTile icon={<Coins className="h-5 w-5" />} label="Total participated" value={formatBnb(totalParticipated)} />
        <StatTile icon={<Layers className="h-5 w-5" />} label="Active positions" value={String(positions.length)} />
        <StatTile icon={<Gift className="h-5 w-5" />} label="Claimable distributions" value={formatBnb(totalClaimable)} />
        <StatTile icon={<FileSignature className="h-5 w-5" />} label="Documents signed" value={String(docsSigned)} />
      </div>

      {/* Positions */}
      <div>
        <h2 className="font-display text-xl font-semibold text-cream">Pool positions</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {positions.map((pos) => {
            const property = properties.find((p) => p.slug === pos.slug);
            return (
              <div key={pos.slug} className="card-base card-hover p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-cream">{pos.name}</h3>
                    <p className="text-xs text-muted">{pos.location}</p>
                  </div>
                  <Badge tone={statusTone(pos.status)}>{pos.status}</Badge>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                    <div className="text-xs text-muted">Participated</div>
                    <div className="font-medium text-cream">{formatBnb(pos.participatedBnb)}</div>
                  </div>
                  <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                    <div className="text-xs text-muted">Claimable</div>
                    <div className={cn("font-medium", pos.claimableBnb > 0 ? "text-emerald-300" : "text-cream")}>
                      {formatBnb(pos.claimableBnb)}
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                    <FileSignature className="h-3.5 w-3.5" /> {pos.documentsSigned} documents signed
                  </span>
                  {property && (
                    <Link
                      href={`/pools/${pos.slug}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-gold hover:underline"
                    >
                      View pool <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Eligibility */}
      <div className="rounded-2xl border border-gold bg-card p-5">
        <div className="flex items-center gap-2.5">
          <Clock className="h-4.5 w-4.5 text-gold" />
          <h3 className="text-sm font-semibold text-cream">Eligibility status</h3>
        </div>
        <p className="mt-2 text-sm text-muted">
          {eligibilityComplete
            ? "Eligibility checks are complete for this wallet (demo). You can participate in additional open pools."
            : "No eligibility checks completed yet. Eligibility is required before participating in live pools."}
        </p>
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="font-display text-xl font-semibold text-cream">Transaction history</h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-gold bg-card">
          <div className="hidden grid-cols-[1.2fr_1.6fr_0.8fr_1fr] gap-4 border-b border-white/5 px-5 py-3 text-xs font-medium uppercase tracking-wide text-muted sm:grid">
            <span>Type</span>
            <span>Pool</span>
            <span className="text-right">Amount</span>
            <span className="text-right">Date</span>
          </div>
          <ul className="divide-y divide-white/5">
            {txns.map((tx, i) => (
              <li
                key={`${tx.hash}-${i}`}
                className="grid grid-cols-2 gap-2 px-5 py-3.5 text-sm sm:grid-cols-[1.2fr_1.6fr_0.8fr_1fr] sm:gap-4"
              >
                <span className="font-medium text-cream">{tx.type}</span>
                <span className="text-muted">{tx.pool}</span>
                <span className="text-right font-medium text-cream">{formatBnb(tx.amount)}</span>
                <span className="text-right text-muted">{tx.date}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
