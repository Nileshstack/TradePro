"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; 
import React, { useEffect } from "react";


interface StatCard {
  label: string;
  value: string | number;
  positive?: boolean;
}

export default function AnalyticsPage() {
  const {  user } = useAuth();
   const router = useRouter();
  useEffect(() => {
      if (!user) {
        router.replace("/login");
      }
    }, [user, router]);
  const marketStats: StatCard[] = [
    { label: "Market Sentiment", value: "Bullish", positive: true },
    { label: "Volatility Index", value: "18.6" },
    { label: "Top Gainer (Demo)", value: "Stock A (+4.2%)", positive: true },
    { label: "Top Loser (Demo)", value: "Crypto B (-2.1%)", positive: false },
  ];

  const assetPerformance = [
    { asset: "Stock A", change: "+3.56%", positive: true },
    { asset: "Crypto B", change: "-1.12%", positive: false },
    { asset: "Gold", change: "+0.82%", positive: true },
    { asset: "NIFTY 50", change: "+0.45%", positive: true },
  ];

  return (
    <main
      className="mx-auto max-w-6xl p-6 space-y-8"
      style={{ minHeight: "93vh" }}
    >

      <div>
        <h1 className="text-3xl font-bold text-slate-800">Analytics</h1>
        <p className="text-sm text-slate-500">
          View market insights, performance trends and trading indicators.
        </p>
      </div>

 
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {marketStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border bg-white/70 p-4 shadow-sm"
          >
            <div className="text-xs text-slate-500">{stat.label}</div>
            <div
              className={`text-lg font-semibold ${
                stat.positive === true
                  ? "text-green-600"
                  : stat.positive === false
                  ? "text-red-600"
                  : "text-slate-700"
              }`}
            >
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">
            Technical Indicators
          </h2>

          <p className="text-sm mt-3 text-slate-600">
            These indicators are demo values. Integrate with real OHLC data for
            live analytics.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-800">
            <div className="rounded-lg border bg-slate-50 p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">MACD</div>
              <div className="font-semibold">—</div>
            </div>

            <div className="rounded-lg border bg-slate-50 p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">EMA (50)</div>
              <div className="font-semibold">—</div>
            </div>

            <div className="rounded-lg border bg-slate-50 p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">EMA (200)</div>
              <div className="font-semibold">—</div>
            </div>

            <div className="rounded-lg border bg-slate-50 p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">VWAP</div>
              <div className="font-semibold">—</div>
            </div>
          </div>
        </div>

  
        <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">
            Asset Performance (Demo)
          </h2>

          <ul className="mt-4 space-y-3 text-sm">
            {assetPerformance.map((item) => (
              <li
                key={item.asset}
                className="flex justify-between border-b last:border-none pb-2"
              >
                <span className="text-slate-700">{item.asset}</span>
                <span
                  className={`font-semibold ${
                    item.positive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.change}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700 mb-2">
          Market Overview (Demo)
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          The market is currently showing moderate volatility with bullish
          signals in major indices. Commodity markets remain stable while
          cryptocurrency markets show slight correction. Keep an eye on economic
          indicators for trend confirmation.
        </p>
      </div>
    </main>
  );
}
