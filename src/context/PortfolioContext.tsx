"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext";
import { firestore } from "../lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

type Position = {
  asset: string;
  quantity: number;
  avgPrice: number;
};

type Portfolio = {
  cash: number;
  positions: Position[];
};

type PortfolioContextValue = {
  portfolio: Portfolio;
  buy: (asset: string, qty: number, price: number) => void;
  sell: (asset: string, qty: number, price: number) => void;
  setCash: (c: number) => void;
  syncNow: () => Promise<void>;
};

const PortfolioContext = createContext<PortfolioContextValue | undefined>(
  undefined
);

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error("usePortfolio must be used within PortfolioProvider");
  return ctx;
};

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const { user, userData } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio>({ cash: 100000, positions: [] });

  useEffect(() => {
   
    (async () => {
      if (user && userData) {
        try {
          const ref = doc(firestore, "users", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            const data = snap.data() as any;
            if (data.portfolio) setPortfolio(data.portfolio);
          }
        } catch (e) {
          console.error("Failed to fetch portfolio:", e);
        }
      }
    })();
  }, [user, userData]);

  async function syncNow() {
    if (!user) return;
    const ref = doc(firestore, "users", user.uid);
    await setDoc(ref, { ...(userData ?? {}), portfolio }, { merge: true });
  }

  function buy(asset: string, qty: number, price: number) {
    setPortfolio((p) => {
      const cost = qty * price;
      const existing = p.positions.find((x) => x.asset === asset);
      let positions = p.positions.slice();
      if (existing) {
        const newQty = existing.quantity + qty;
        const newAvg = (existing.avgPrice * existing.quantity + cost) / newQty;
        positions = positions.map((pos) =>
          pos.asset === asset ? { ...pos, quantity: newQty, avgPrice: newAvg } : pos
        );
      } else {
        positions.push({ asset, quantity: qty, avgPrice: price });
      }
      const updated = { ...p, cash: p.cash - cost, positions };
      
      if (user) setDoc(doc(firestore, "users", user.uid), { portfolio: updated }, { merge: true }).catch(() => {});
      return updated;
    });
  }

  function sell(asset: string, qty: number, price: number) {
    setPortfolio((p) => {
      const existing = p.positions.find((x) => x.asset === asset);
      if (!existing) return p;
      const sellQty = Math.min(qty, existing.quantity);
      const proceeds = sellQty * price;
      let positions = p.positions.map((pos) => ({ ...pos }));
      const remaining = existing.quantity - sellQty;
      if (remaining <= 0) {
        positions = positions.filter((pos) => pos.asset !== asset);
      } else {
        positions = positions.map((pos) => (pos.asset === asset ? { ...pos, quantity: remaining } : pos));
      }
      const updated = { ...p, cash: p.cash + proceeds, positions };
      if (user) setDoc(doc(firestore, "users", user.uid), { portfolio: updated }, { merge: true }).catch(() => {});
      return updated;
    });
  }

  const value = useMemo(
    () => ({ portfolio, buy, sell, setCash: (c: number) => setPortfolio((p) => ({ ...p, cash: c })), syncNow }),
    [portfolio]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}
