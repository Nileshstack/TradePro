"use client";

import React, { useEffect } from "react";
import MultiAssetChart from "../../components/Chart/MultiAssetChart";
import TradeSimulator from "../../components/Simulator/TradeSimulator";
import { generateRandomOHLC } from "../../utils/data";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


export default function ChartPage() {
  const {  user } = useAuth();
     const router = useRouter();
    useEffect(() => {
        if (!user) {
          router.replace("/login");
        }
      }, [user, router]);
  const assetA = { id: "A", name: "Stock A", series: generateRandomOHLC(180, 120) };
  const assetB = { id: "B", name: "Crypto B", series: generateRandomOHLC(180, 20) };

  return (
    <main className="mx-auto max-w-7xl p-6 space-y-6">


      <div>
        <h1 className="text-3xl font-bold text-slate-800">Market Overview</h1>
        <p className="text-sm text-slate-500">Track multiple assets and run simulation trades.</p>
      </div>

      <section className="rounded-xl border bg-white/70 backdrop-blur-sm shadow-sm p-4">
        <h2 className="text-lg font-semibold text-slate-700 mb-3">Multi-Asset Performance</h2>
        <MultiAssetChart assets={[assetA, assetB]} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <TradeSimulator assets={[assetA, assetB]} />

        <div className="rounded-xl border bg-white/70 backdrop-blur-sm shadow-sm p-4">
          <h3 className="font-semibold mb-2">Analytics & Insights</h3>
          <p className="text-sm text-slate-600">
            More analytics, indicators, and portfolio insights will appear here.
          </p>
        </div>
      </section>

    </main>
  );
}
