"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "a" | "b" | "c" | "d";

const ThemeContext = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "a",
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("a");

  useEffect(() => {
    // Read whatever the blocking script already set
    const current = document.documentElement.getAttribute("data-theme") as Theme | null;
    if (current === "b" || current === "c" || current === "d") setThemeState(current);
  }, []);

  function setTheme(t: Theme) {
    setThemeState(t);
    localStorage.setItem("lb-theme", t);
    document.documentElement.setAttribute("data-theme", t);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
