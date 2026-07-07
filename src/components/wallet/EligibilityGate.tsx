"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAccount, useSwitchChain } from "wagmi";
import {
  Wallet,
  Network,
  ShieldCheck,
  FileWarning,
  Coins,
  CheckCircle2,
  Circle,
  Loader2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ConnectWallet } from "./ConnectWallet";
import { BNB_CHAIN_ID, SUPPORTED_CHAIN_IDS } from "@/lib/wagmi";
import { cn, formatBnb } from "@/lib/utils";
import { Property } from "@/lib/types";
import { useJiaStore } from "@/lib/store";

type StepState = "done" | "active" | "pending";

function StepRow({
  index,
  title,
  state,
  icon,
  children,
}: {
  index: number;
  title: string;
  state: StepState;
  icon: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
            state === "done" && "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
            state === "active" && "border-gold/40 bg-gold/10 text-gold",
            state === "pending" && "border-white/10 bg-white/[0.03] text-muted"
          )}
        >
          {state === "done" ? <CheckCircle2 className="h-4 w-4" /> : icon}
        </div>
        {index < 5 && (
          <div
            className={cn(
              "mt-1 w-px flex-1",
              state === "done" ? "bg-emerald-400/30" : "bg-white/8"
            )}
          />
        )}
      </div>
      <div className={cn("flex-1 pb-5", state === "pending" && "opacity-50")}>
        <div className="flex items-center gap-2 text-sm font-medium text-cream">{title}</div>
        {state === "active" && children && <div className="mt-3">{children}</div>}
      </div>
    </div>
  );
}

/**
 * Gated participation flow:
 *   1. Connect wallet → 2. Check network → 3. Eligibility (KYC placeholder)
 *   → 4. Risk acknowledgement → 5. Enter amount → 6. Confirm.
 *
 * This demo uses placeholder eligibility status and does not broadcast a real
 * transaction — it explicitly tells the user so, and never implies otherwise.
 */
export function EligibilityGate({ property }: { property: Property }) {
  const { isConnected, chainId } = useAccount();
  const { switchChain, isPending: switching } = useSwitchChain();
  const { eligibilityComplete, setEligibilityComplete, addParticipation } = useJiaStore();

  const [eligibilityStarted, setEligibilityStarted] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [riskAck, setRiskAck] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Eligibility is completed once per wallet across the whole prototype: if the
  // user already passed the check on another pool, skip straight past it.
  useEffect(() => {
    if (eligibilityComplete) setEligible(true);
  }, [eligibilityComplete]);

  const onNetwork = isConnected && chainId != null && SUPPORTED_CHAIN_IDS.includes(chainId);
  const poolOpen = property.status === "Open for Eligible Users";

  const amountNum = parseFloat(amount);
  const amountValid =
    !Number.isNaN(amountNum) && amountNum >= property.minParticipationBnb;

  // Determine current active step (0-indexed)
  const activeStep = useMemo(() => {
    if (!isConnected) return 0;
    if (!onNetwork) return 1;
    if (!eligible) return 2;
    if (!riskAck) return 3;
    if (!submitted) return 4;
    return 5;
  }, [isConnected, onNetwork, eligible, riskAck, submitted]);

  function stateFor(step: number): StepState {
    if (step < activeStep) return "done";
    if (step === activeStep) return "active";
    return "pending";
  }

  if (!poolOpen) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted">
        <div className="mb-1 flex items-center gap-2 font-medium text-cream">
          <Info className="h-4 w-4 text-gold" />
          Participation unavailable
        </div>
        {property.status === "Due Diligence"
          ? "This pool is in due diligence and is not open for allocation. Eligible users can complete eligibility checks in advance."
          : "This pool is fully allocated. The allocation window is closed."}
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-400/25 bg-emerald-400/[0.04] p-5 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-300" />
        <div className="mt-2 font-display text-lg text-cream">Participation recorded</div>
        <p className="mt-1 text-sm text-muted">
          Your {formatBnb(amountNum)} participation in {property.name} has been added to
          your portfolio. In production this would be submitted to the audited pool
          contract on BNB Chain — no real transaction was sent in this prototype.
        </p>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
          <Link href="/portfolio">
            <Button size="sm" className="w-full sm:w-auto">
              View in portfolio
            </Button>
          </Link>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setSubmitted(false);
              setAmount("");
            }}
          >
            Record another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 rounded-lg border border-gold/15 bg-gold/[0.04] p-3 text-xs leading-relaxed text-muted">
        Eligibility checks are required before participating in live property pools. This
        demo uses placeholder eligibility status.
      </div>

      <StepRow index={0} title="Connect wallet" state={stateFor(0)} icon={<Wallet className="h-4 w-4" />}>
        <ConnectWallet />
      </StepRow>

      <StepRow index={1} title="Switch to BNB Chain" state={stateFor(1)} icon={<Network className="h-4 w-4" />}>
        <Button size="sm" onClick={() => switchChain({ chainId: BNB_CHAIN_ID })} disabled={switching}>
          {switching ? "Switching…" : "Switch network"}
        </Button>
      </StepRow>

      <StepRow index={2} title="Complete eligibility (KYC/AML)" state={stateFor(2)} icon={<ShieldCheck className="h-4 w-4" />}>
        {!eligibilityStarted ? (
          <Button
            size="sm"
            onClick={() => {
              setEligibilityStarted(true);
              // Simulated async check; persists so it carries across pools.
              setTimeout(() => {
                setEligible(true);
                setEligibilityComplete(true);
              }, 1200);
            }}
          >
            Start eligibility check
          </Button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-muted">
            <Loader2 className="h-4 w-4 animate-spin text-gold" />
            Running placeholder eligibility check…
          </div>
        )}
      </StepRow>

      <StepRow index={3} title="Acknowledge risk disclosures" state={stateFor(3)} icon={<FileWarning className="h-4 w-4" />}>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            checked={riskAck}
            onChange={(e) => setRiskAck(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-[#E5B84B]"
          />
          <span>
            I have reviewed the pool documents and risk disclosures and understand there
            are no guaranteed returns.
          </span>
        </label>
      </StepRow>

      <StepRow index={4} title="Enter amount & confirm" state={stateFor(4)} icon={<Coins className="h-4 w-4" />}>
        <div className="space-y-3">
          <div>
            <div className="relative">
              <input
                type="number"
                inputMode="decimal"
                min={property.minParticipationBnb}
                step="0.1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder={`Min ${property.minParticipationBnb}`}
                className="h-11 w-full rounded-xl border border-gold bg-base px-3 pr-14 text-sm text-cream outline-none transition-colors focus:border-gold/50"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted">
                BNB
              </span>
            </div>
            {amount && !amountValid && (
              <p className="mt-1.5 text-xs text-rose-300">
                Minimum participation is {formatBnb(property.minParticipationBnb)}.
              </p>
            )}
          </div>
          <Button
            size="md"
            className="w-full"
            disabled={!amountValid}
            onClick={() => {
              addParticipation({
                slug: property.slug,
                name: property.name,
                location: property.location,
                amountBnb: amountNum,
              });
              setSubmitted(true);
            }}
          >
            Confirm participation
          </Button>
        </div>
      </StepRow>

      <div className="flex items-start gap-2 rounded-lg bg-white/[0.02] p-3 text-[11px] leading-relaxed text-muted/80">
        <Circle className="mt-0.5 h-3 w-3 shrink-0 text-gold/50" />
        Nothing on this screen constitutes investment advice. Participation may be subject
        to jurisdictional restrictions and pool-specific terms.
      </div>
    </div>
  );
}
