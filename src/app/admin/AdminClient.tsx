"use client";

import { useState } from "react";
import { Plus, Save, Building2, FileText, Activity, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge, statusTone } from "@/components/ui/Badge";
import { properties as seedProperties } from "@/data/properties";
import { Property, PoolStatus } from "@/lib/types";
import { formatBnb } from "@/lib/utils";

const STATUSES: PoolStatus[] = [
  "Due Diligence",
  "Open for Eligible Users",
  "Fully Allocated",
  "Closed",
];

/**
 * Issuer dashboard — edits an in-memory copy of the pool list.
 * Nothing is persisted; this demonstrates the shape of issuer tooling that
 * would later write to a backend / on-chain registry.
 */
export function AdminClient() {
  const [pools, setPools] = useState<Property[]>(seedProperties);
  const [selectedId, setSelectedId] = useState<string>(seedProperties[0]?.id ?? "");

  const selected = pools.find((p) => p.id === selectedId);

  function update(id: string, patch: Partial<Property>) {
    setPools((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }

  function addPool() {
    const n = pools.length + 1;
    const id = `jia-draft-${n}`;
    const draft: Property = {
      ...seedProperties[0],
      id,
      slug: `new-pool-${n}`,
      name: `New Property Pool ${n}`,
      tagline: "Draft pool pending due diligence.",
      status: "Due Diligence",
      raisedBnb: 0,
      contractAddress: null,
      auditStatus: "Not Started",
    };
    setPools((prev) => [...prev, draft]);
    setSelectedId(id);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
      {/* Pool list */}
      <div className="space-y-3">
        <Button onClick={addPool} className="w-full">
          <Plus className="h-4 w-4" /> Add property pool
        </Button>
        <div className="space-y-2">
          {pools.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedId(p.id)}
              className={`w-full rounded-xl border p-4 text-left transition-colors ${
                p.id === selectedId
                  ? "border-gold/50 bg-gold/10"
                  : "border-gold bg-card hover:border-gold/40"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="truncate text-sm font-medium text-cream">{p.name}</span>
                <Badge tone={statusTone(p.status)}>{p.status}</Badge>
              </div>
              <div className="mt-1 text-xs text-muted">
                {formatBnb(p.raisedBnb)} / {formatBnb(p.targetBnb)}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Editor */}
      {selected ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-gold bg-card p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <Building2 className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg font-semibold text-cream">Pool details</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Pool name">
                <input
                  value={selected.name}
                  onChange={(e) => update(selected.id, { name: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Location">
                <input
                  value={selected.location}
                  onChange={(e) => update(selected.id, { location: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Lifecycle status">
                <select
                  value={selected.status}
                  onChange={(e) => update(selected.id, { status: e.target.value as PoolStatus })}
                  className={inputCls}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s} className="bg-elevated">{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Risk rating">
                <select
                  value={selected.riskLevel}
                  onChange={(e) => update(selected.id, { riskLevel: e.target.value as Property["riskLevel"] })}
                  className={inputCls}
                >
                  {["Low", "Medium", "High"].map((s) => (
                    <option key={s} value={s} className="bg-elevated">{s}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-gold bg-card p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <Activity className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg font-semibold text-cream">Funding status</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Target raise (BNB)">
                <input
                  type="number"
                  value={selected.targetBnb}
                  onChange={(e) => update(selected.id, { targetBnb: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>
              <Field label="Raised (BNB)">
                <input
                  type="number"
                  value={selected.raisedBnb}
                  onChange={(e) => update(selected.id, { raisedBnb: Number(e.target.value) })}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-gold bg-card p-6">
            <div className="mb-5 flex items-center gap-2.5">
              <ShieldCheck className="h-5 w-5 text-gold" />
              <h2 className="font-display text-lg font-semibold text-cream">Contract & audit</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Contract address">
                <input
                  value={selected.contractAddress ?? ""}
                  placeholder="0x…"
                  onChange={(e) => update(selected.id, { contractAddress: e.target.value || null })}
                  className={inputCls}
                />
              </Field>
              <Field label="Audit status">
                <select
                  value={selected.auditStatus}
                  onChange={(e) => update(selected.id, { auditStatus: e.target.value as Property["auditStatus"] })}
                  className={inputCls}
                >
                  {["Not Started", "In Audit", "Audited"].map((s) => (
                    <option key={s} value={s} className="bg-elevated">{s}</option>
                  ))}
                </select>
              </Field>
              <Field label="Legal review status">
                <input
                  value={selected.legalReviewStatus}
                  onChange={(e) => update(selected.id, { legalReviewStatus: e.target.value })}
                  className={inputCls}
                />
              </Field>
              <Field label="Risk notes / legal wrapper">
                <input
                  value={selected.legalWrapper}
                  onChange={(e) => update(selected.id, { legalWrapper: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-gold/20 bg-gold/[0.04] p-4">
            <div className="flex items-center gap-2.5 text-sm text-muted">
              <FileText className="h-4 w-4 text-gold" />
              Changes are held in memory for this demo and are not persisted.
            </div>
            <Button size="sm" onClick={() => alert("Saved to in-memory demo state.")}>
              <Save className="h-4 w-4" /> Save draft
            </Button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-gold bg-card p-10 text-center text-sm text-muted">
          Select a pool to edit.
        </div>
      )}
    </div>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-gold bg-base px-3 text-sm text-cream outline-none transition-colors focus:border-gold/50";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted">{label}</span>
      {children}
    </label>
  );
}
