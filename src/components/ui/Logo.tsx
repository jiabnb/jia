import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Jia mark + wordmark.
 *
 * Uses the official Jia logo (家 — "home / family" — rendered as a pagoda
 * house) from /public/jia-logo.jpg. Presented on its native cream ground as a
 * rounded chip so it reads cleanly on the dark interface.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-gold/30 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.6)]">
        <Image
          src="/jia-logo.jpg"
          alt="Jia"
          fill
          sizes="36px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </span>
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-cream">
            Jia
          </span>
          <span className="text-[9px] font-medium uppercase tracking-[0.22em] text-muted">
            RWA · BNB Chain
          </span>
        </span>
      )}
    </Link>
  );
}
