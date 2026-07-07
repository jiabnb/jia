"use client";

import { useState, useRef, useEffect } from "react";
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { AnimatePresence, motion } from "framer-motion";
import {
  Wallet,
  ChevronDown,
  LogOut,
  AlertTriangle,
  Check,
  Copy,
  X,
  Chrome,
  FlaskConical,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { BNB_CHAIN_ID, SUPPORTED_CHAIN_IDS } from "@/lib/wagmi";
import { DEMO_FLAG } from "./AutoReconnect";
import { shortenAddress, cn } from "@/lib/utils";

function setDemoFlag(on: boolean) {
  try {
    if (on) localStorage.setItem(DEMO_FLAG, "1");
    else localStorage.removeItem(DEMO_FLAG);
  } catch {
    /* ignore */
  }
}

export function ConnectWallet({ className }: { className?: string }) {
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending, error } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();

  const [modalOpen, setModalOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // Close the modal automatically once a connection is established.
  useEffect(() => {
    if (isConnected) setModalOpen(false);
  }, [isConnected]);

  const wrongNetwork =
    isConnected && chainId != null && !SUPPORTED_CHAIN_IDS.includes(chainId);

  const injectedConnector = connectors.find((c) => c.id === "injected");
  const mockConnector = connectors.find((c) => c.id === "mock");
  const hasInjectedProvider =
    typeof window !== "undefined" && Boolean((window as { ethereum?: unknown }).ethereum);

  async function handleCopy() {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  // ---- Disconnected: open the connector picker ----
  if (!isConnected) {
    return (
      <>
        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className={cn("min-w-[9.5rem]", className)}
        >
          <Wallet className="h-4 w-4" />
          Connect Wallet
        </Button>

        <AnimatePresence>
          {modalOpen && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={() => setModalOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 12 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-gold bg-elevated shadow-card-lift"
              >
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                  <h3 className="font-display text-base font-semibold text-cream">
                    Connect a wallet
                  </h3>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="text-muted transition-colors hover:text-cream"
                    aria-label="Close"
                  >
                    <X className="h-4.5 w-4.5" />
                  </button>
                </div>

                <div className="flex flex-col gap-2 p-4">
                  {/* Real browser wallet */}
                  {injectedConnector && (
                    <button
                      disabled={isPending}
                      onClick={() => {
                        setPendingId("injected");
                        setDemoFlag(false);
                        connect({ connector: injectedConnector, chainId: BNB_CHAIN_ID });
                      }}
                      className="group flex items-center gap-3 rounded-xl border border-gold bg-card px-4 py-3.5 text-left transition-colors hover:border-gold/40 hover:bg-card-hover disabled:opacity-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/20 bg-gold/10 text-gold">
                        <Chrome className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-cream">
                          Browser Wallet
                        </span>
                        <span className="block text-xs text-muted">
                          {hasInjectedProvider
                            ? "MetaMask, Trust, or other injected wallet"
                            : "No extension detected — install one, or use Demo"}
                        </span>
                      </span>
                      {pendingId === "injected" && isPending && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                      )}
                    </button>
                  )}

                  {/* Prototype demo wallet */}
                  {mockConnector && (
                    <button
                      disabled={isPending}
                      onClick={() => {
                        setPendingId("mock");
                        setDemoFlag(true);
                        connect({ connector: mockConnector, chainId: BNB_CHAIN_ID });
                      }}
                      className="group flex items-center gap-3 rounded-xl border border-gold/40 bg-gold-soft px-4 py-3.5 text-left transition-colors hover:border-gold/60 disabled:opacity-50"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-gold/30 bg-gold/15 text-gold">
                        <FlaskConical className="h-5 w-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-sm font-medium text-cream">
                          Demo Wallet
                        </span>
                        <span className="block text-xs text-muted">
                          Explore the full flow on BNB Chain — no extension needed
                        </span>
                      </span>
                      {pendingId === "mock" && isPending && (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-gold border-t-transparent" />
                      )}
                    </button>
                  )}

                  {error && (
                    <p className="px-1 pt-1 text-xs text-rose-300">
                      {error.message.includes("not found") || error.message.includes("provider")
                        ? "No browser wallet found. Try the Demo Wallet to explore the platform."
                        : error.message}
                    </p>
                  )}
                </div>

                <div className="border-t border-white/5 px-5 py-3">
                  <p className="text-[11px] leading-relaxed text-muted">
                    Prototype: no real transaction is broadcast. Participation is subject to
                    eligibility, KYC/AML, and pool-specific terms.
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </>
    );
  }

  // ---- Connected, wrong network ----
  if (wrongNetwork) {
    return (
      <Button
        onClick={() => switchChain({ chainId: BNB_CHAIN_ID })}
        disabled={switching}
        variant="secondary"
        size="sm"
        className={cn("border-amber-400/40 text-amber-300", className)}
      >
        <AlertTriangle className="h-4 w-4" />
        {switching ? "Switching…" : "Switch to BNB Chain"}
      </Button>
    );
  }

  // ---- Connected, correct network ----
  return (
    <div ref={menuRef} className={cn("relative", className)}>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => setMenuOpen((o) => !o)}
        className="min-w-[9.5rem]"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
        {shortenAddress(address)}
        <ChevronDown className={cn("h-4 w-4 transition-transform", menuOpen && "rotate-180")} />
      </Button>

      {menuOpen && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-gold bg-elevated shadow-card-lift">
          <div className="border-b border-white/5 p-4">
            <div className="text-xs font-medium text-muted">Connected wallet</div>
            <div className="mt-1 font-mono text-sm text-cream">{shortenAddress(address, 6)}</div>
            <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-2 py-0.5 text-[11px] text-emerald-300">
              <Check className="h-3 w-3" /> BNB Chain
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="flex w-full items-center gap-2.5 px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-cream"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            {copied ? "Address copied" : "Copy address"}
          </button>
          <button
            onClick={() => {
              setDemoFlag(false);
              disconnect();
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2.5 border-t border-white/5 px-4 py-3 text-sm text-rose-300 transition-colors hover:bg-rose-400/5"
          >
            <LogOut className="h-4 w-4" />
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}
