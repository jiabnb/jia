import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PoolStatus, RiskLevel } from "@/lib/types";

type Tone = "gold" | "neutral" | "green" | "amber" | "red" | "blue";

const tones: Record<Tone, string> = {
  gold: "border-gold/30 bg-gold/10 text-gold",
  neutral: "border-white/10 bg-white/5 text-muted",
  green: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
  amber: "border-amber-400/25 bg-amber-400/10 text-amber-300",
  red: "border-rose-400/25 bg-rose-400/10 text-rose-300",
  blue: "border-accent/30 bg-accent/10 text-indigo-300",
};

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  icon?: ReactNode;
}

export function Badge({ children, tone = "neutral", className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
        tones[tone],
        className
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function statusTone(status: PoolStatus): Tone {
  switch (status) {
    case "Open for Eligible Users":
      return "green";
    case "Due Diligence":
      return "amber";
    case "Fully Allocated":
      return "blue";
    case "Closed":
      return "neutral";
  }
}

export function riskTone(risk: RiskLevel): Tone {
  switch (risk) {
    case "Low":
      return "green";
    case "Medium":
      return "amber";
    case "High":
      return "red";
  }
}
