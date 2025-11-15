"use client";

import Link from "next/link";
import React from "react";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        
     
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-2xl font-bold mr-90 text-blue-600 tracking-wide hover:opacity-80 transition"
          >
            TradePro
          </Link>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/chart" className="hover:text-blue-600 transition">
              Charts
            </Link>
            <Link href="/dashboard" className="hover:text-blue-600 transition">
              Dashboard
            </Link>
            <Link href="/analytics" className="hover:text-blue-600 transition">
              Analytics
            </Link>
            <Link href="/settings" className="hover:text-blue-600 transition">
              Settings
            </Link>
          </nav>
        </div>

     
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-sm text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                {user.email}
              </span>

              <button
                className="rounded-lg bg-slate-800 px-4 py-1.5 text-white text-sm hover:bg-slate-900 transition"
                onClick={logout}
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg border px-4 py-1.5 text-sm hover:bg-slate-100 transition"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
