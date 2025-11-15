"use client";

import React, { useEffect } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface Position {
  id: string;
  quantity: number;
  avgPrice: number;
}

export default function DashboardPage(): JSX.Element {
  const {  user } = useAuth();
     const router = useRouter();
    useEffect(() => {
        if (!user) {
          router.replace("/login");
        }
      }, [user, router]);
  const { portfolio } = usePortfolio();

  const positionsValue: number = portfolio.positions.reduce(
    (s, p) => s + p.quantity * p.avgPrice,
    0
  );

  const equity: number = portfolio.cash + positionsValue;

  const invested: number = Math.max(positionsValue, 0);
  const dailyPL: number = Number((Math.random() * 200 - 100).toFixed(2));
  const returns: number = Number((equity - 1000000).toFixed(2));
  const winRate: string = "62%";

  return (
    <main
      className="mx-auto max-w-6xl p-6 space-y-8"
      style={{ minHeight: "93vh" }}
    >

      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Analytics Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          View your portfolio summary, indicators and performance metrics.
        </p>
      </div>


      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

        <div className="rounded-xl border bg-white/70 p-4 shadow-sm">
          <div className="text-xs text-slate-500">Daily P&L</div>
          <div
            className={`text-lg font-semibold ${
              dailyPL >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{dailyPL}
          </div>
        </div>

        <div className="rounded-xl border bg-white/70 p-4 shadow-sm">
          <div className="text-xs text-slate-500">Total Investment</div>
          <div className="text-lg font-semibold text-slate-700">
            ₹{invested.toFixed(2)}
          </div>
        </div>

        <div className="rounded-xl border bg-white/70 p-4 shadow-sm">
          <div className="text-xs text-slate-500">Total Returns</div>
          <div
            className={`text-lg font-semibold ${
              returns >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{returns}
          </div>
        </div>

        <div className="rounded-xl border bg-white/70 p-4 shadow-sm">
          <div className="text-xs text-slate-500">Win Rate (demo)</div>
          <div className="text-lg font-semibold text-blue-600">{winRate}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">
            Portfolio Summary
          </h2>

          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <div>
              <span className="font-medium">Cash:</span>{" "}
              <span className="font-semibold text-slate-900">
                ₹{portfolio.cash.toFixed(2)}
              </span>
            </div>

            <div>
              <span className="font-medium">Positions Value:</span>{" "}
              <span className="font-semibold text-slate-900">
                ₹{positionsValue.toFixed(2)}
              </span>
            </div>

            <div className="pt-3 border-t font-bold text-slate-800 text-lg">
              Total Equity:{" "}
              <span className="text-blue-600">₹{equity.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700">Indicators</h2>

          <p className="text-sm mt-3 text-slate-600">
            SMA, RSI and other technical indicators are calculated using the
            chart data. These values are placeholders until integrated.
          </p>

          <div className="mt-5 grid grid-cols-2 gap-4 text-sm text-slate-800">
            <div className="rounded-lg border bg-slate-50 p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">SMA (20)</div>
              <div className="font-semibold">—</div>
            </div>

            <div className="rounded-lg border bg-slate-50 p-4 text-center shadow-sm">
              <div className="text-xs text-slate-500">RSI (14)</div>
              <div className="font-semibold">—</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Holdings Overview
        </h2>

        {portfolio.positions.length === 0 ? (
          <p className="text-sm text-slate-500">No positions yet.</p>
        ) : (
          <table className="w-full text-sm text-left">
            <thead className="text-slate-600 border-b">
              <tr>
                <th className="py-2">Asset</th>
                <th>Qty</th>
                <th>Avg Price</th>
                <th>Value</th>
              </tr>
            </thead>

            <tbody>
              {portfolio.positions.map((pos: Position) => (
                <tr key={pos.id} className="border-b last:border-none">
                  <td className="py-2">{pos.id}</td>
                  <td>{pos.quantity}</td>
                  <td>₹{pos.avgPrice.toFixed(2)}</td>
                  <td>₹{(pos.avgPrice * pos.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>


      <div className="rounded-xl border bg-white/70 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700 mb-2">
          Performance Insights (Demo)
        </h2>
        <p className="text-sm text-slate-600">
          Your portfolio is currently stable with moderate exposure and balanced
          allocation. Consider diversifying into low-volatility assets to reduce
          drawdown risks.
        </p>
      </div>
    </main>
  );
}
