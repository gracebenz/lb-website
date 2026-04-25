"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      window.location.href = "/admin/works";
    } else {
      setError("Incorrect password.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--background)" }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-sm px-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
          Admin
        </h1>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-3 text-sm outline-none"
          style={{ borderColor: "var(--rule)", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-body)" }}
          autoFocus
        />
        {error && <p className="text-sm" style={{ color: "#e53e3e", fontFamily: "var(--font-body)" }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-3 text-sm font-medium uppercase tracking-widest transition-opacity hover:opacity-70 disabled:opacity-40"
          style={{ background: "var(--ink)", color: "var(--background)", fontFamily: "var(--font-body)" }}
        >
          {loading ? "..." : "Enter"}
        </button>
      </form>
    </div>
  );
}
