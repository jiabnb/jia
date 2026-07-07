"use client";

import { useEffect, useRef } from "react";
import { useAccount, useConnect } from "wagmi";
import { BNB_CHAIN_ID } from "@/lib/wagmi";

export const DEMO_FLAG = "jia.demoWallet.v1";

/**
 * Restores the prototype Demo Wallet connection after a hard refresh.
 *
 * wagmi does not persist the mock connector's session, so on reload the demo
 * connection is lost. If the user previously chose the Demo Wallet (flagged in
 * localStorage), we reconnect it silently on mount. Real injected wallets are
 * never auto-connected here — that must stay a user gesture.
 */
export function AutoReconnect() {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const attempted = useRef(false);

  useEffect(() => {
    if (attempted.current) return;
    attempted.current = true;

    let flagged = false;
    try {
      flagged = localStorage.getItem(DEMO_FLAG) === "1";
    } catch {
      /* ignore */
    }

    if (!flagged || isConnected) return;
    const mock = connectors.find((c) => c.id === "mock");
    if (mock) connect({ connector: mock, chainId: BNB_CHAIN_ID });
  }, [connectors, connect, isConnected]);

  return null;
}
