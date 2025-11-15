"use client";

import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from "recharts";
import type { OHLC } from "../../utils/data";

type AssetSeries = {
  id: string;
  name: string;
  series: OHLC[];
  color?: string;
};

export default function MultiAssetChart({ assets }: { assets: AssetSeries[] }) {
  
  const dates = assets.length ? assets[0].series.map((s) => s.date) : [];

  const data = dates.map((d, i) => {
    const item: any = { date: d };
    for (const a of assets) {
      const s = a.series[i];
      if (s) item[`${a.id}_close`] = Number(s.close.toFixed(4));
    }
    return item;
  });

  return (
    <div className="w-full h-[420px] rounded-lg border bg-white/70 p-3 shadow-sm">
      <ResponsiveContainer>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend wrapperStyle={{ paddingTop: 12 }} />

          {assets.map((a, idx) => (
            <Line
              key={a.id}
              type="monotone"
              dataKey={`${a.id}_close`}
              name={a.name}
              dot={false}
              stroke={
                a.color ??
                [
                  "#2563eb", 
                  "#16a34a", 
                  "#db2777", 
                  "#9333ea", 
                ][idx % 4]
              }
              strokeWidth={2}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
