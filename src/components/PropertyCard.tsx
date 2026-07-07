import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  ShieldCheck,
  FileText,
  FileCheck2,
  ArrowRight,
  Building2,
  Lock,
} from "lucide-react";
import { Property } from "@/lib/types";
import { Badge, statusTone, riskTone } from "./ui/Badge";
import { ChainIcon } from "./ChainBadge";
import { FundingProgress } from "./FundingProgress";
import { cn, formatBnb } from "@/lib/utils";

export function PropertyCard({ property }: { property: Property }) {
  const locked = property.locked;

  const cardClasses = cn(
    "group flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300",
    locked
      ? "cursor-default border-white/10"
      : "border-gold hover:-translate-y-1 hover:border-gold/40 hover:shadow-card-lift"
  );

  const content = (
    <>
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-elevated">
        <Image
          src={property.image}
          alt={property.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={cn(
            "object-cover transition-transform duration-500",
            locked ? "scale-[1.02] blur-[2px] brightness-[0.5]" : "group-hover:scale-[1.04]"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

        {/* Locked overlay */}
        {locked && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-base/70 text-gold backdrop-blur-sm">
              <Lock className="h-5 w-5" />
            </div>
            <span className="rounded-full border border-white/10 bg-base/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cream backdrop-blur-sm">
              Locked
            </span>
          </div>
        )}

        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          <Badge tone={statusTone(property.status)}>{property.status}</Badge>
        </div>
        <div className="absolute right-3 top-3 z-20">
          <Badge tone={riskTone(property.riskLevel)}>{property.riskLevel} risk</Badge>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-lg font-semibold leading-tight text-cream">
              {property.name}
            </h3>
          </div>
          <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" /> {property.location}
            </span>
            <span className="inline-flex items-center gap-1">
              <Building2 className="h-3.5 w-3.5" /> {property.assetType}
            </span>
          </div>
        </div>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {property.tagline}
        </p>

        <div className="mt-auto space-y-4">
          <FundingProgress raised={property.raisedBnb} target={property.targetBnb} />

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              <div className="text-muted">Target allocation</div>
              <div className="font-medium text-cream">{formatBnb(property.targetBnb)}</div>
            </div>
            <div className="rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
              <div className="text-muted">Min. participation</div>
              <div className="font-medium text-cream">
                {formatBnb(property.minParticipationBnb)}
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-2">
            <Badge tone="gold" icon={<ChainIcon chain="bnb" className="h-3 w-3" />}>
              BNB Chain
            </Badge>
            {property.kycRequired && (
              <Badge tone="gold" icon={<ShieldCheck className="h-3 w-3" />}>
                KYC required
              </Badge>
            )}
            <Badge tone="neutral" icon={<FileText className="h-3 w-3" />}>
              {property.documentsAvailable} docs
            </Badge>
            {property.contractAddress && (
              <Badge tone="neutral" icon={<FileCheck2 className="h-3 w-3" />}>
                Contract
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-xs text-muted">{property.jurisdiction}</span>
            {locked ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted">
                <Lock className="h-3.5 w-3.5" /> Locked
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold transition-transform group-hover:translate-x-0.5">
                View Details <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );

  if (locked) {
    return (
      <div className={cardClasses} aria-disabled="true" title="This pool is locked">
        {content}
      </div>
    );
  }

  return (
    <Link href={`/pools/${property.slug}`} className={cardClasses}>
      {content}
    </Link>
  );
}

/** Skeleton placeholder matching PropertyCard dimensions. */
export function PropertyCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gold bg-card">
      <div className="skeleton aspect-[16/10] w-full rounded-none" />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-10 w-full" />
        <div className="skeleton h-2 w-full" />
        <div className="grid grid-cols-2 gap-3">
          <div className="skeleton h-12" />
          <div className="skeleton h-12" />
        </div>
      </div>
    </div>
  );
}
