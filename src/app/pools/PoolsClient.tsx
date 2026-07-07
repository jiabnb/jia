"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { Property, PoolStatus, RiskLevel, AssetType } from "@/lib/types";
import { cn } from "@/lib/utils";

const STATUSES: PoolStatus[] = [
  "Due Diligence",
  "Open for Eligible Users",
  "Fully Allocated",
  "Closed",
];
const RISKS: RiskLevel[] = ["Low", "Medium", "High"];
const ASSET_TYPES: AssetType[] = ["Villa", "Residence", "Hotel Apartment", "Commercial"];

interface Filters {
  query: string;
  status: PoolStatus | "All";
  risk: RiskLevel | "All";
  assetType: AssetType | "All";
  documentedOnly: boolean;
}

const initialFilters: Filters = {
  query: "",
  status: "All",
  risk: "All",
  assetType: "All",
  documentedOnly: false,
};

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-gold/50 bg-gold/15 text-gold"
          : "border-gold text-muted hover:border-gold/40 hover:text-cream"
      )}
    >
      {children}
    </button>
  );
}

export function PoolsClient({ properties }: { properties: Property[] }) {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const q = filters.query.trim().toLowerCase();
      if (
        q &&
        !`${p.name} ${p.location} ${p.jurisdiction} ${p.assetType}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      if (filters.status !== "All" && p.status !== filters.status) return false;
      if (filters.risk !== "All" && p.riskLevel !== filters.risk) return false;
      if (filters.assetType !== "All" && p.assetType !== filters.assetType) return false;
      if (filters.documentedOnly && p.documentsAvailable < 5) return false;
      return true;
    });
  }, [properties, filters]);

  const activeCount =
    (filters.status !== "All" ? 1 : 0) +
    (filters.risk !== "All" ? 1 : 0) +
    (filters.assetType !== "All" ? 1 : 0) +
    (filters.documentedOnly ? 1 : 0);

  return (
    <div>
      {/* Search + filter toggle */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted" />
          <input
            value={filters.query}
            onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
            placeholder="Search property pools"
            className="h-12 w-full rounded-xl border border-gold bg-card pl-11 pr-4 text-sm text-cream outline-none transition-colors placeholder:text-muted focus:border-gold/40"
          />
        </div>
        <button
          onClick={() => setShowFilters((s) => !s)}
          className={cn(
            "inline-flex h-12 items-center justify-center gap-2 rounded-xl border px-4 text-sm font-medium transition-colors",
            showFilters || activeCount
              ? "border-gold/50 bg-gold/10 text-gold"
              : "border-gold text-muted hover:text-cream"
          )}
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-semibold text-[#1a1408]">
              {activeCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter panel */}
      {showFilters && (
        <div className="mt-4 space-y-5 rounded-2xl border border-gold bg-card p-5">
          <FilterGroup label="Status">
            <Chip active={filters.status === "All"} onClick={() => setFilters((f) => ({ ...f, status: "All" }))}>
              All
            </Chip>
            {STATUSES.map((s) => (
              <Chip key={s} active={filters.status === s} onClick={() => setFilters((f) => ({ ...f, status: s }))}>
                {s}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Asset type">
            <Chip active={filters.assetType === "All"} onClick={() => setFilters((f) => ({ ...f, assetType: "All" }))}>
              All
            </Chip>
            {ASSET_TYPES.map((a) => (
              <Chip key={a} active={filters.assetType === a} onClick={() => setFilters((f) => ({ ...f, assetType: a }))}>
                {a}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Risk level">
            <Chip active={filters.risk === "All"} onClick={() => setFilters((f) => ({ ...f, risk: "All" }))}>
              All
            </Chip>
            {RISKS.map((r) => (
              <Chip key={r} active={filters.risk === r} onClick={() => setFilters((f) => ({ ...f, risk: r }))}>
                {r}
              </Chip>
            ))}
          </FilterGroup>

          <FilterGroup label="Document status">
            <Chip
              active={filters.documentedOnly}
              onClick={() => setFilters((f) => ({ ...f, documentedOnly: !f.documentedOnly }))}
            >
              Document vault ≥ 5 available
            </Chip>
          </FilterGroup>

          {activeCount > 0 && (
            <button
              onClick={() => setFilters(initialFilters)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted hover:text-cream"
            >
              <X className="h-3.5 w-3.5" /> Clear all filters
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted">
          {filtered.length} pool{filtered.length !== 1 && "s"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 flex flex-col items-center gap-3 rounded-2xl border border-gold bg-card px-6 py-16 text-center">
          <Search className="h-8 w-8 text-muted" />
          <p className="text-sm text-muted">
            No property pools match your filters. Try adjusting your search.
          </p>
          <button
            onClick={() => setFilters(initialFilters)}
            className="text-sm font-medium text-gold hover:underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <Stagger className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <StaggerItem key={p.id} className="h-full">
              <PropertyCard property={p} />
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted">{label}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}
