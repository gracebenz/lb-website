import { reorderCanvaProjects } from "@/lib/canva";

export async function PUT(request: Request) {
  const { ids } = await request.json();
  await reorderCanvaProjects(ids);
  return Response.json({ ok: true });
}
