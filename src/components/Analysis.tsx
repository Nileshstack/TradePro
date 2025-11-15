"use client";

import React, { useEffect } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Analysis() {
     const {  user } = useAuth();
         const router = useRouter();
        useEffect(() => {
            if (!user) {
              router.replace("/login");
            }
          }, [user, router]);
  const stats = [
    {
      label: "RSI (14)",
      value: "56.3",
      trend: "neutral",
      color: "text-blue-600",
      bg: "bg-blue-50 border-blue-200",
    },
    {
      label: "Volatility (30D)",
      value: "12.8%",
      trend: "down",
      color: "text-green-600",
      bg: "bg-green-50 border-green-200",
    },
    {
      label: "Moving Avg (50D)",
      value: "₹2,320",
      trend: "up",
      color: "text-yellow-600",
      bg: "bg-yellow-50 border-yellow-200",
    },
    {
      label: "MACD Signal",
      value: "+1.42",
      trend: "up",
      color: "text-purple-600",
      bg: "bg-purple-50 border-purple-200",
    },
    {
      label: "Bollinger Band Width",
      value: "5.8%",
      trend: "neutral",
      color: "text-indigo-600",
      bg: "bg-indigo-50 border-indigo-200",
    },
    {
      label: "Support / Resistance",
      value: "₹2,240 / ₹2,380",
      trend: "neutral",
      color: "text-red-600",
      bg: "bg-red-50 border-red-200",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-2xl font-bold mb-4 text-slate-800">Analytics Dashboard</h3>
      <p className="text-gray-600 mb-6">
        View your market indicators including RSI, MACD, Volatility,
        Moving Averages and more.
      </p>

      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className={`p-4 rounded-lg border ${item.bg} shadow-sm`}
          >
            <p className="text-sm text-gray-500">{item.label}</p>

            <div className="flex items-center gap-2 mt-1">
              <p className={`text-xl font-bold ${item.color}`}>{item.value}</p>

         
              {item.trend === "up" && (
                <ArrowUpRight className="text-green-600" size={18} />
              )}
              {item.trend === "down" && (
                <ArrowDownRight className="text-red-600" size={18} />
              )}
            </div>

            <div className="h-10 w-full mt-3 overflow-hidden">
              <svg viewBox="0 0 100 30" className="w-full h-full">
                <polyline
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`${item.color.replace("text", "stroke")}`}
                  points="0,20 20,10 40,15 60,5 80,18 100,10"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
