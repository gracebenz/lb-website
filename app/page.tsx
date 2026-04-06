"use client";

import { useTheme } from "./theme-provider";
import HomeA from "./home-a";
import HomeB from "./home-b";
import HomeC from "./home-c";
import HomeD from "./home-d";
import HomeE from "./home-e";

export default function Home() {
  const { theme } = useTheme();
  if (theme === "b") return <HomeB />;
  if (theme === "c") return <HomeC />;
  if (theme === "d") return <HomeD />;
  if (theme === "e") return <HomeE />;
  return <HomeA />;
}
