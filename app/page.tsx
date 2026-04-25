import { getWorks } from "@/lib/works";
import { getCanvaProjects } from "@/lib/canva";
import HomeClient from "./home-client";

export default async function Page() {
  const [works, canvaProjects] = await Promise.all([getWorks(), getCanvaProjects()]);
  return <HomeClient works={works} canvaProjects={canvaProjects} />;
}
