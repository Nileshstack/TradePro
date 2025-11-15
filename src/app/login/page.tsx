"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

function getErrorMessage(err: any): string {
  if (err?.code === "auth/configuration-not-found") {
    return "Firebase is not properly configured. Check your .env.local file and restart the dev server.";
  }
  if (err?.code === "auth/user-not-found") {
    return "No account found with this email.";
  }
  if (err?.code === "auth/wrong-password") {
    return "Incorrect password.";
  }
  if (err?.code === "auth/email-already-in-use") {
    return "Email already in use.";
  }
  if (err?.code === "auth/invalid-email") {
    return "Invalid email address.";
  }
  return err?.message || "Unknown error occurred";
}

export default function LoginPage() {
  const router = useRouter();
  const { signup, login, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.replace("/");
    }
  }, [user, router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (mode === "login") {
        await login(email, password);
        router.push("/"); 
      } else {
        await signup(email, password);
        router.push("/setup");
      }
    } catch (err) {
      setError(getErrorMessage(err));
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto h-133 max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Sign in / Sign up</h1>
      <form onSubmit={submit} className="space-y-3">
        <input
          className="w-full border px-3 py-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          className="w-full border px-3 py-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        {error && (
          <div className="rounded bg-red-100 border border-red-400 text-red-700 px-3 py-2 text-sm">
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <button
            className="rounded bg-slate-800 px-4 py-2 text-white disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : mode === "login" ? "Sign in" : "Sign up"}
          </button>

          <button
            type="button"
            className="underline disabled:opacity-50"
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            disabled={loading}
          >
            {mode === "login"
              ? "Create an account"
              : "Have an account? Sign in"}
          </button>
        </div>
      </form>
    </main>
  );
}
