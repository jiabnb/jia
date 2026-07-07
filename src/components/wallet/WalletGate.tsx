"use client";

import { ReactNode } from "react";
import { useAccount } from "wagmi";
import { Wallet, WifiOff } from "lucide-react";
import { SUPPORTED_CHAIN_IDS } from "@/lib/wagmi";
import { ConnectWallet } from "./ConnectWallet";

interface WalletGateProps {
  /** Rendered when connected on a supported network. */
  children: ReactNode;
  /** Optional custom message for the disconnected state. */
  disconnectedMessage?: string;
}

/**
 * Renders children only when a wallet is connected on a supported network.
 * Otherwise shows a clean, non-alarming prompt with the appropriate CTA.
 */
export function WalletGate({ children, disconnectedMessage }: WalletGateProps) {
  const { isConnected, chainId } = useAccount();
  const wrongNetwork =
    isConnected && chainId != null && !SUPPORTED_CHAIN_IDS.includes(chainId);

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-gold bg-card px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/20 bg-gold/10 text-gold">
          <Wallet className="h-6 w-6" />
        </div>
        <p className="max-w-sm text-sm text-muted">
          {disconnectedMessage ??
            "Connect your wallet to view Jia pool positions associated with your address."}
        </p>
        <ConnectWallet />
      </div>
    );
  }

  if (wrongNetwork) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-amber-400/25 bg-amber-400/[0.04] px-6 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
          <WifiOff className="h-6 w-6" />
        </div>
        <p className="max-w-sm text-sm text-muted">
          You&rsquo;re connected to an unsupported network. Switch to BNB Chain to
          continue.
        </p>
        <ConnectWallet />
      </div>
    );
  }

  return <>{children}</>;
}
