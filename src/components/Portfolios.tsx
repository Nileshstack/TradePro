"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

type Position = {
  symbol: string;
  qty: number;
  avgPrice: number;
  currentPrice: number;
};

export default function Portfolios() {
   const {  user } = useAuth();
       const router = useRouter();
      useEffect(() => {
          if (!user) {
            router.replace("/login");
          }
        }, [user, router]);
  const [cash, setCash] = useState(100000); 
  const [positions, setPositions] = useState<Position[]>([
    { symbol: "AAPL", qty: 10, avgPrice: 150, currentPrice: 175 },
    { symbol: "TSLA", qty: 5, avgPrice: 230, currentPrice: 260 },
    { symbol: "BTC", qty: 0.02, avgPrice: 30000, currentPrice: 42000 },
  ]);

  const [symbol, setSymbol] = useState("");
  const [qty, setQty] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  function buyAsset() {
    if (!symbol || qty <= 0 || price <= 0) return alert("Invalid input");

    const cost = qty * price;
    if (cost > cash) return alert("Insufficient funds");

    setCash(cash - cost);

    setPositions((prev) => {
      const existing = prev.find((p) => p.symbol === symbol);
      if (existing) {
        const newQty = existing.qty + qty;
        const newAvgPrice =
          (existing.qty * existing.avgPrice + qty * price) / newQty;

        return prev.map((p) =>
          p.symbol === symbol
            ? { ...p, qty: newQty, avgPrice: newAvgPrice }
            : p
        );
      }
      return [
        ...prev,
        { symbol, qty, avgPrice: price, currentPrice: price },
      ];
    });

    setSymbol("");
    setQty(0);
    setPrice(0);
  }

  function sellAsset() {
    const pos = positions.find((p) => p.symbol === symbol);
    if (!pos) return alert("You don’t own this asset");
    if (qty <= 0 || price <= 0) return alert("Invalid input");
    if (qty > pos.qty) return alert("Not enough quantity");

    const proceeds = qty * price;
    setCash(cash + proceeds);

    if (qty === pos.qty) {
      setPositions((prev) => prev.filter((p) => p.symbol !== symbol));
    } else {
      setPositions((prev) =>
        prev.map((p) =>
          p.symbol === symbol ? { ...p, qty: p.qty - qty } : p
        )
      );
    }

    setSymbol("");
    setQty(0);
    setPrice(0);
  }

  const portfolioValue =
    cash +
    positions.reduce(
      (sum, p) => sum + p.qty * p.currentPrice,
      0
    );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
     
      <h3 className="text-2xl font-bold mb-4 text-slate-800">Portfolio Simulation</h3>
      <p className="text-gray-600 mb-6">
        Manage your simulated investments, test trades, and analyze performance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-600">Portfolio Value</div>
          <div className="text-2xl font-bold text-blue-700">
            ${portfolioValue.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="text-sm text-green-600">Cash Available</div>
          <div className="text-2xl font-bold text-green-700">
            ${cash.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="text-sm text-purple-600">Total Positions</div>
          <div className="text-2xl font-bold text-purple-700">
            {positions.length}
          </div>
        </div>
      </div>

      <h4 className="text-lg font-semibold mb-3 text-slate-700">Your Positions</h4>
      <div className="overflow-x-auto mb-8">
        <table className="w-full text-sm border-collapse rounded-lg overflow-hidden">
          <thead className="bg-slate-100 text-slate-700">
            <tr>
              <th className="p-3 text-left">Asset</th>
              <th className="p-3">Qty</th>
              <th className="p-3">Avg Price</th>
              <th className="p-3">Current Price</th>
              <th className="p-3">P/L</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => {
              const profit = p.qty * (p.currentPrice - p.avgPrice);
              return (
                <tr key={p.symbol} className="border-b">
                  <td className="p-3 font-semibold">{p.symbol}</td>
                  <td className="p-3 text-center">{p.qty}</td>
                  <td className="p-3 text-center">${p.avgPrice}</td>
                  <td className="p-3 text-center">${p.currentPrice}</td>
                  <td
                    className={`p-3 text-center font-semibold ${
                      profit >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {profit >= 0 ? "+" : ""}
                    {profit.toFixed(2)}
                  </td>
                </tr>
              );
            })}
            {positions.length === 0 && (
              <tr>
                <td className="p-4 text-center text-slate-500" colSpan={5}>
                  No positions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h4 className="text-lg font-semibold mb-3 text-slate-700">Trade Simulation</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Symbol</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="AAPL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Quantity</label>
          <input
            type="number"
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={buyAsset}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
        >
          Buy
        </button>
        <button
          onClick={sellAsset}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Sell
        </button>
      </div>
    </div>
  );
}
