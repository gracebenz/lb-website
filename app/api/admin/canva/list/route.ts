import { getCanvaProjects } from "@/lib/canva";

export async function GET() {
  const projects = await getCanvaProjects();
  return Response.json(projects);
}
