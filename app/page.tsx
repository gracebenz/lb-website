"use client";

import { useTheme } from "./theme-provider";
import HomeA from "./home-a";
import HomeB from "./home-b";
import HomeC from "./home-c";

export default function Home() {
  const { theme } = useTheme();
  if (theme === "b") return <HomeB />;
  if (theme === "c") return <HomeC />;
  return <HomeA />;
}
