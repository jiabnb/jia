import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TrustBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
}

/** A single item in the trust strip. */
export function TrustBadge({ icon, label, className }: TrustBadgeProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-muted transition-colors hover:text-cream",
        className
      )}
    >
      <span className="text-gold/80">{icon}</span>
      {label}
    </div>
  );
}
