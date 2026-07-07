"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn, formatBnb, fundingPercent } from "@/lib/utils";

interface FundingProgressProps {
  raised: number;
  target: number;
  className?: string;
  showLabels?: boolean;
}

/** Horizontal funding bar with raised / target labels. */
export function FundingProgress({
  raised,
  target,
  className,
  showLabels = true,
}: FundingProgressProps) {
  const pct = fundingPercent(raised, target);
  const reduce = useReducedMotion();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {showLabels && (
        <div className="flex items-baseline justify-between text-sm">
          <span className="font-semibold text-cream">{formatBnb(raised)}</span>
          <span className="text-muted">of {formatBnb(target)}</span>
        </div>
      )}
      <div
        className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <motion.div
          className="h-full rounded-full bg-gold-gradient"
          initial={reduce ? { width: `${pct}%` } : { width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {showLabels && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted">{pct}% allocated</span>
          <span className="text-muted">
            {formatBnb(Math.max(0, target - raised))} remaining
          </span>
        </div>
      )}
    </div>
  );
}

interface FundingRingProps {
  raised: number;
  target: number;
  size?: number;
  stroke?: number;
  className?: string;
}

/**
 * Circular funding ring. The percentage is rendered as a single centered
 * label inside the ring — never layered/duplicated — to avoid overlap bugs.
 */
export function FundingRing({
  raised,
  target,
  size = 132,
  stroke = 10,
  className,
}: FundingRingProps) {
  const pct = fundingPercent(raised, target);
  const reduce = useReducedMotion();
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  const center = size / 2;

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={stroke}
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#ring-g)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={reduce ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: offset }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <defs>
          <linearGradient id="ring-g" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#F2C766" />
            <stop offset="1" stopColor="#E5B84B" />
          </linearGradient>
        </defs>
      </svg>
      {/* Single centered label — absolutely positioned, pointer-events none */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-2xl font-semibold leading-none text-cream">
          {pct}%
        </span>
        <span className="mt-1 text-[11px] font-medium uppercase tracking-wide text-muted">
          allocated
        </span>
      </div>
    </div>
  );
}
