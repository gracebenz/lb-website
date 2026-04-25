import { getCanvaProjects } from "@/lib/canva";
import CanvaAdmin from "./CanvaAdmin";

export default async function CanvaPage() {
  const projects = await getCanvaProjects();
  return <CanvaAdmin initialProjects={projects} />;
}
