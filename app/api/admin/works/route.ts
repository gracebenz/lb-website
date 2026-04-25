import { createWork } from "@/lib/works";

export async function POST(request: Request) {
  const body = await request.json();
  const { error } = await createWork(body);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
  return Response.json({ ok: true });
}
