"use client";

import { useTheme } from "./theme-provider";
import HomeA from "./home-a";
import HomeB from "./home-b";

export default function Home() {
  const { theme } = useTheme();
  return theme === "b" ? <HomeB /> : <HomeA />;
}
