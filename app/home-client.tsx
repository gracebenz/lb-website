"use client";

import { useTheme } from "./theme-provider";
import HomeA from "./home-a";
import HomeB from "./home-b";
import HomeC from "./home-c";
import HomeD from "./home-d";
import HomeE from "./home-e";
import type { Work } from "@/lib/works";
import type { CanvaProject } from "@/lib/canva";

type Props = { works: Work[]; canvaProjects: CanvaProject[] };

export default function HomeClient({ works, canvaProjects }: Props) {
  const { theme } = useTheme();
  if (theme === "b") return <HomeB works={works} canvaProjects={canvaProjects} />;
  if (theme === "c") return <HomeC works={works} canvaProjects={canvaProjects} />;
  if (theme === "d") return <HomeD works={works} canvaProjects={canvaProjects} />;
  if (theme === "e") return <HomeE works={works} canvaProjects={canvaProjects} />;
  return <HomeA works={works} canvaProjects={canvaProjects} />;
}
