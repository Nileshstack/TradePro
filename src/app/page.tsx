"use client";
import { useState } from "react";

import {
  Home,
  PieChart,
  LineChart,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ChartPage from "./chart/page";
import Portfolios from "@/components/Portfolios";
import Analysis from "@/components/Analysis";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const menu = [
    { name: "Overview", icon: Home, id: "overview" },
    { name: "Portfolio", icon: PieChart, id: "portfolio" },
    { name: "Charts", icon: LineChart, id: "charts" },
    { name: "Analytics", icon: BarChart3, id: "analytics" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-900">

      <aside className="w-64 bg-white border-r border-gray-200 p-5 hidden md:flex flex-col justify-between">
        <div>
          <nav className="space-y-3">
            {menu.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === item.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-6">

        <header className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold capitalize">{activeTab}</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Welcome to TradePro</span>
            <Image
              src="/avatar1.png"
              width={36}
              height={36}
              alt="User Avatar"
              className="rounded-full border"
            />
          </div>
        </header>


        <section className="grid gap-6">
          {activeTab === "overview" && <Overview />}
          {activeTab === "portfolio" && <Portfolios/>}
          {activeTab === "charts" && <Charts />}
          {activeTab === "analytics" && <Analysis/>}
        </section>
      </main>
    </div>
  );
}


function Overview() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-3">Welcome to TradePro</h2>

      <p className="text-gray-600 leading-relaxed">
        TradePro is your all-in-one trading simulator designed to help you learn,
        practice, and master the markets—without risking real money. Whether
        you're exploring stocks, crypto, commodities, or indices, TradePro gives
        you the tools you need to build confidence and sharpen your strategy.
      </p>

      <p className="mt-4 text-gray-600 leading-relaxed">
        Track virtual portfolios, analyze market indicators, test buy/sell strategies,
        and understand how real-world price movements affect your positions.
        TradePro is built for beginners, intermediate traders, and anyone who
        wants to practice smarter before entering live markets.
      </p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
        <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
          <h4 className="font-semibold text-blue-700">Real-Market Simulation</h4>
          <p className="text-blue-600 mt-1">Practice trading with real price movements.</p>
        </div>

        <div className="p-4 rounded-lg bg-green-50 border border-green-200">
          <h4 className="font-semibold text-green-700">Smart Analytics</h4>
          <p className="text-green-600 mt-1">Track RSI, MACD, trends, and volatility.</p>
        </div>

        <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
          <h4 className="font-semibold text-purple-700">Risk-Free Learning</h4>
          <p className="text-purple-600 mt-1">Experiment without losing real money.</p>
        </div>
      </div>
    </div>
  );
}





function Charts() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Charts & Visualizations</h3>
      <p className="text-gray-600">
        Compare multiple assets, overlay indicators, and visualize market
        trends dynamically.
      </p>
      <ChartPage/>
    </div>
  );
}




