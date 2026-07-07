import { http, createConfig } from "wagmi";
import { bsc, bscTestnet } from "wagmi/chains";
import { injected, mock } from "wagmi/connectors";

/**
 * wagmi configuration for Jia.
 *
 * BNB Chain (mainnet id 56) is the primary settlement network, with BNB
 * testnet available for demos. Two connectors are registered:
 *
 *  - `injected`  — any real browser-extension wallet (MetaMask, Trust, …).
 *  - `mock`      — a built-in "Demo Wallet" so the connect flow, network
 *                  detection, and participation journey are fully functional
 *                  even on machines without a wallet extension installed.
 *
 * This is a prototype: no real transaction is ever broadcast. The mock
 * connector simulates a connected account on BNB Chain end-to-end.
 */
export const BNB_CHAIN_ID = bsc.id;

/** Deterministic demo account used by the prototype Demo Wallet. */
export const DEMO_ADDRESS = "0x1A2b3C4d5E6f7A8b9C0d1E2f3A4b5C6d7E8f9A0b" as const;

export const config = createConfig({
  chains: [bsc, bscTestnet],
  connectors: [
    injected({ shimDisconnect: true }),
    mock({
      accounts: [DEMO_ADDRESS],
      features: { reconnect: true },
    }),
  ],
  transports: {
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
  ssr: true,
});

export const SUPPORTED_CHAIN_IDS: number[] = [bsc.id, bscTestnet.id];

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
