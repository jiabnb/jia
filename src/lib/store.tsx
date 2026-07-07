"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";

/**
 * Lightweight client-side store for the Jia prototype.
 *
 * Persists recorded pool participations and eligibility status to
 * localStorage so the platform behaves like a working product across reloads:
 * connect a wallet → complete eligibility → participate → see the position and
 * transaction reflected in the Portfolio. No real transaction is broadcast.
 *
 * Swap this for real on-chain reads / an indexer + backend later; the shapes
 * below are the integration contract.
 */

export interface Participation {
  /** Client-side id. */
  id: string;
  slug: string;
  name: string;
  location: string;
  amountBnb: number;
  /** ISO date string. */
  date: string;
  /** Short mock tx hash for the activity feed. */
  txHash: string;
}

interface JiaStore {
  participations: Participation[];
  eligibilityComplete: boolean;
  ready: boolean;
  addParticipation: (p: Omit<Participation, "id" | "date" | "txHash">) => Participation;
  setEligibilityComplete: (v: boolean) => void;
  reset: () => void;
}

const PARTICIPATIONS_KEY = "jia.participations.v1";
const ELIGIBILITY_KEY = "jia.eligibility.v1";

const JiaStoreContext = createContext<JiaStore | null>(null);

function randomHash(): string {
  const hex = "0123456789abcdef";
  let out = "0x";
  for (let i = 0; i < 6; i++) out += hex[Math.floor(Math.random() * 16)];
  out += "…";
  for (let i = 0; i < 4; i++) out += hex[Math.floor(Math.random() * 16)];
  return out;
}

export function JiaStoreProvider({ children }: { children: ReactNode }) {
  const [participations, setParticipations] = useState<Participation[]>([]);
  const [eligibilityComplete, setEligibility] = useState(false);
  const [ready, setReady] = useState(false);

  // Hydrate from localStorage on mount.
  useEffect(() => {
    try {
      const rawP = localStorage.getItem(PARTICIPATIONS_KEY);
      if (rawP) setParticipations(JSON.parse(rawP));
      const rawE = localStorage.getItem(ELIGIBILITY_KEY);
      if (rawE) setEligibility(rawE === "true");
    } catch {
      // ignore malformed storage
    }
    setReady(true);
  }, []);

  const persistParticipations = useCallback((next: Participation[]) => {
    setParticipations(next);
    try {
      localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addParticipation = useCallback<JiaStore["addParticipation"]>(
    (p) => {
      const entry: Participation = {
        ...p,
        id: `${p.slug}-${Date.now()}`,
        date: new Date().toISOString().slice(0, 10),
        txHash: randomHash(),
      };
      persistParticipations([entry, ...participations]);
      return entry;
    },
    [participations, persistParticipations]
  );

  const setEligibilityComplete = useCallback((v: boolean) => {
    setEligibility(v);
    try {
      localStorage.setItem(ELIGIBILITY_KEY, String(v));
    } catch {
      /* ignore */
    }
  }, []);

  const reset = useCallback(() => {
    persistParticipations([]);
    setEligibilityComplete(false);
  }, [persistParticipations, setEligibilityComplete]);

  return (
    <JiaStoreContext.Provider
      value={{
        participations,
        eligibilityComplete,
        ready,
        addParticipation,
        setEligibilityComplete,
        reset,
      }}
    >
      {children}
    </JiaStoreContext.Provider>
  );
}

export function useJiaStore(): JiaStore {
  const ctx = useContext(JiaStoreContext);
  if (!ctx) throw new Error("useJiaStore must be used within JiaStoreProvider");
  return ctx;
}
