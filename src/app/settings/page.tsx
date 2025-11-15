"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AVAILABLE_ASSETS = [
  { id: "AAPL", name: "Apple Inc.", category: "Tech" },
  { id: "GOOGL", name: "Alphabet Inc.", category: "Tech" },
  { id: "MSFT", name: "Microsoft Corp.", category: "Tech" },
  { id: "TSLA", name: "Tesla Inc.", category: "Auto" },
  { id: "AMZN", name: "Amazon.com", category: "Tech" },
  { id: "META", name: "Meta Platforms", category: "Tech" },
  { id: "BTC", name: "Bitcoin", category: "Crypto" },
  { id: "ETH", name: "Ethereum", category: "Crypto" },
  { id: "SPY", name: "S&P 500 ETF", category: "Index" },
  { id: "GLD", name: "Gold ETF", category: "Commodity" },
];

export default function SettingsPage() {
  const {  user } = useAuth();
     const router = useRouter();
    useEffect(() => {
        if (!user) {
          router.replace("/login");
        }
      }, [user, router]);
  const { userData, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [tab, setTab] = useState("preferences");

 
  const [theme, setTheme] = useState(userData?.preferences?.theme || "light");
  const [currency, setCurrency] = useState(
    userData?.preferences?.currency || "USD"
  );
  const [notifications, setNotifications] = useState(
    userData?.preferences?.notifications !== false
  );

  const [watchlist, setWatchlist] = useState(userData?.watchlist || []);

  const [riskTolerance, setRiskTolerance] = useState(
    userData?.preferences?.riskTolerance || "moderate"
  );

  async function savePreferences() {
    setLoading(true);
    setSaved(false);
    try {
      await updateUserData({
        preferences: {
          theme,
          currency,
          notifications,
          riskTolerance,
        },
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save preferences");
    } finally {
      setLoading(false);
    }
  }

  async function saveWatchlist() {
    setLoading(true);
    setSaved(false);
    try {
      await updateUserData({ watchlist });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save watchlist");
    } finally {
      setLoading(false);
    }
  }

  function toggleAsset(id: string) {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-slate-600">Manage your preferences and portfolio</p>
      </div>

      {saved && (
        <div className="mb-4 rounded bg-green-100 border border-green-400 text-green-700 px-4 py-2">
          ✓ Changes saved successfully
        </div>
      )}

    
      <div className="flex gap-4 mb-6 border-b">
        {["preferences", "watchlist", "portfolio"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              tab === t
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {tab === "preferences" && (
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="notifications"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="notifications" className="text-sm">
              Enable notifications for price alerts
            </label>
          </div>

          <button
            onClick={savePreferences}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      )}

      {tab === "watchlist" && (
        <div className="bg-white rounded-lg border p-6">
          <div className="mb-4">
            <p className="text-slate-600 mb-4">
              Select assets to track in your portfolio
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AVAILABLE_ASSETS.map((asset) => (
                <button
                  key={asset.id}
                  onClick={() => toggleAsset(asset.id)}
                  className={`p-3 rounded-lg border-2 text-left transition ${
                    watchlist.includes(asset.id)
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div className="font-semibold">{asset.id}</div>
                  <div className="text-xs text-slate-600">{asset.name}</div>
                  <div className="text-xs text-slate-500">{asset.category}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 text-sm text-slate-600">
            Selected: {watchlist.length} assets
          </div>

          <button
            onClick={saveWatchlist}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Watchlist"}
          </button>
        </div>
      )}

      {tab === "portfolio" && (
        <div className="bg-white rounded-lg border p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              Risk Tolerance
            </label>
            <div className="space-y-2">
              {[
                {
                  id: "conservative",
                  label: "Conservative",
                  desc: "Low risk, focus on bonds and stable assets",
                },
                {
                  id: "moderate",
                  label: "Moderate",
                  desc: "Balanced portfolio with stocks and ETFs",
                },
                {
                  id: "aggressive",
                  label: "Aggressive",
                  desc: "High risk, focus on growth and crypto",
                },
              ].map((option) => (
                <label
                  key={option.id}
                  className="flex items-start gap-3 p-2 rounded hover:bg-slate-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="risk"
                    value={option.id}
                    checked={riskTolerance === option.id}
                    onChange={(e) => setRiskTolerance(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">{option.label}</div>
                    <div className="text-sm text-slate-600">
                      {option.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-slate-50 border rounded-lg p-4">
            <h3 className="font-semibold mb-2">Portfolio Info</h3>
            <div className="text-sm space-y-1 text-slate-600">
              <div>
                <span>Current Capital:</span>{" "}
                <strong>${userData?.portfolio?.cash?.toLocaleString() || "0"}</strong>
              </div>
              <div>
                <span>Positions:</span>{" "}
                <strong>{userData?.portfolio?.positions?.length || 0}</strong>
              </div>
              <div>
                <span>Risk Profile:</span>{" "}
                <strong className="capitalize">
                  {userData?.preferences?.riskTolerance || "moderate"}
                </strong>
              </div>
            </div>
          </div>

          <button
            onClick={savePreferences}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Portfolio Settings"}
          </button>
        </div>
      )}
      <div className="mt-8 pt-6 border-t">
        <p className="text-sm text-slate-600">
          Logged in as: <strong>{user.email}</strong>
        </p>
      </div>
    </main>
  );
}
