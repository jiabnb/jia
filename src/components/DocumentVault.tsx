"use client";

import { FileText, Eye, Lock, Clock, CircleDashed } from "lucide-react";
import { Badge } from "./ui/Badge";
import { PropertyDocument, DocumentStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

function statusMeta(status: DocumentStatus) {
  switch (status) {
    case "Available":
      return { tone: "green" as const, icon: <FileText className="h-3 w-3" /> };
    case "Under Review":
      return { tone: "amber" as const, icon: <Clock className="h-3 w-3" /> };
    case "Pending":
      return { tone: "neutral" as const, icon: <CircleDashed className="h-3 w-3" /> };
  }
}

export function DocumentVault({ documents }: { documents: PropertyDocument[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold bg-card">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Lock className="h-4 w-4 text-gold" />
          <span className="text-sm font-semibold text-cream">Document Vault</span>
        </div>
        <span className="text-xs text-muted">
          {documents.filter((d) => d.status === "Available").length}/{documents.length}{" "}
          available
        </span>
      </div>
      <ul className="divide-y divide-white/5">
        {documents.map((doc) => {
          const meta = statusMeta(doc.status);
          const disabled = doc.status !== "Available" || !doc.href;
          return (
            <li
              key={doc.name}
              className="flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <FileText className="h-4 w-4 shrink-0 text-muted" />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium text-cream">{doc.name}</div>
                  <div className="text-xs text-muted">Updated {doc.lastUpdated}</div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <Badge tone={meta.tone} icon={meta.icon} className="hidden sm:inline-flex">
                  {doc.status}
                </Badge>
                <button
                  disabled={disabled}
                  title={disabled ? "Document not yet available" : "View document"}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors",
                    disabled
                      ? "cursor-not-allowed border-white/5 text-muted/50"
                      : "border-gold/30 text-gold hover:bg-gold/10"
                  )}
                >
                  <Eye className="h-3.5 w-3.5" />
                  View
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
