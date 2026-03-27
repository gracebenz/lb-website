"use client";

import { useTheme, type Theme } from "./theme-provider";

const themes: Theme[] = ["a", "b"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className="flex items-center gap-0.5 rounded-full p-0.5 border"
      style={{ borderColor: "var(--rule)" }}
    >
      {themes.map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className="w-7 h-7 rounded-full text-[10px] font-semibold uppercase tracking-wider transition-all duration-200"
          style={{
            fontFamily: "var(--font-body)",
            background: theme === t ? "var(--ink)" : "transparent",
            color: theme === t ? "var(--background)" : "var(--ink-mid)",
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
