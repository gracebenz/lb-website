import { getWorks } from "@/lib/works";
import { getCanvaProjects } from "@/lib/canva";
import HomeE from "./home-e";

export default async function Page() {
  const [works, canvaProjects] = await Promise.all([getWorks(), getCanvaProjects()]);
  return <HomeE works={works} canvaProjects={canvaProjects} />;
}
