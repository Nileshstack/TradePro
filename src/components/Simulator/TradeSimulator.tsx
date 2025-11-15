"use client";

import React, { useMemo, useState } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import type { OHLC } from "../../utils/data";

export default function TradeSimulator({
  assets,
}: {
  assets: { id: string; name: string; series: OHLC[] }[];
}) {
  const { portfolio, buy, sell } = usePortfolio();
  const [selected, setSelected] = useState(assets[0]?.id ?? "");
  const [qty, setQty] = useState(1);

  const latestPrice = useMemo(() => {
    const a = assets.find((x) => x.id === selected);
    return a ? a.series[a.series.length - 1].close : 0;
  }, [selected, assets]);

  return (
    <div className="rounded-xl border bg-white/70 p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-700 mb-4">Trade Simulator</h3>


      <div className="flex flex-col gap-3 mb-4">

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border px-3 py-2 rounded-md bg-white text-sm"
        >
          {assets.map((a) => (
            <option value={a.id} key={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          className="border px-3 py-2 rounded-md bg-white text-sm w-32"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />

        <div className="text-sm text-slate-600">
          Price:{" "}
          <span className="font-semibold text-slate-800">
            ₹{latestPrice.toFixed(2)}
          </span>
        </div>
      </div>

   
      <div className="flex gap-3 mb-4">
        <button
          className="rounded-md bg-green-600 px-4 py-2 text-white text-sm hover:bg-green-700 transition"
          onClick={() => buy(selected, qty, latestPrice)}
        >
          Buy
        </button>

        <button
          className="rounded-md bg-red-600 px-4 py-2 text-white text-sm hover:bg-red-700 transition"
          onClick={() => sell(selected, qty, latestPrice)}
        >
          Sell
        </button>
      </div>

 
      <div className="text-sm space-y-1">
        <div>Cash: ₹{portfolio.cash.toFixed(2)}</div>
        <div>Positions: {portfolio.positions.length}</div>
      </div>
    </div>
  );
}
