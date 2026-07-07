"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string;
  hint?: string;
  float?: boolean;
  floatDelay?: number;
  className?: string;
}

/** Compact stat tile with an icon, used in hero and metrics rows. */
export function StatCard({
  icon,
  label,
  value,
  hint,
  float,
  floatDelay = 0,
  className,
}: StatCardProps) {
  const reduce = useReducedMotion();
  const shouldFloat = float && !reduce;

  return (
    <motion.div
      animate={shouldFloat ? { y: [0, -6, 0] } : undefined}
      transition={
        shouldFloat
          ? { duration: 6, repeat: Infinity, ease: "easeInOut", delay: floatDelay }
          : undefined
      }
      className={cn(
        "card-base card-hover flex flex-col gap-3 p-4 backdrop-blur-sm",
        className
      )}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
        {icon}
      </div>
      <div>
        <div className="font-display text-lg font-semibold text-cream">{value}</div>
        <div className="text-xs font-medium text-muted">{label}</div>
        {hint && <div className="mt-0.5 text-[11px] text-muted/70">{hint}</div>}
      </div>
    </motion.div>
  );
}
