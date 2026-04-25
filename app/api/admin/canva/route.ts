import { createCanvaProject } from "@/lib/canva";

export async function POST(request: Request) {
  const body = await request.json();
  const { error } = await createCanvaProject(body);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
