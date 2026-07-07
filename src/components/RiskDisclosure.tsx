import { AlertTriangle, ShieldAlert } from "lucide-react";
import { RiskFactor } from "@/lib/types";

interface RiskDisclosureProps {
  risks: RiskFactor[];
  title?: string;
  compact?: boolean;
}

export function RiskDisclosure({
  risks,
  title = "Risk factors",
  compact,
}: RiskDisclosureProps) {
  return (
    <div className="rounded-2xl border border-rose-400/20 bg-rose-400/[0.03] p-6">
      <div className="mb-4 flex items-center gap-2.5">
        <ShieldAlert className="h-5 w-5 text-rose-300" />
        <h3 className="text-base font-semibold text-cream">{title}</h3>
      </div>
      <ul className="space-y-4">
        {risks.map((risk) => (
          <li key={risk.title} className="flex gap-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-rose-300/80" />
            <div>
              <div className="text-sm font-medium text-cream">{risk.title}</div>
              {!compact && (
                <p className="mt-0.5 text-sm leading-relaxed text-muted">{risk.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-5 border-t border-white/5 pt-4 text-xs leading-relaxed text-muted">
        Risk ratings are indicative and do not imply safety. No pool offers guaranteed
        returns. Review the full risk disclosure before participating.
      </p>
    </div>
  );
}
