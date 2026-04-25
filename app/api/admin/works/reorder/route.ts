import { reorderWorks } from "@/lib/works";

export async function PUT(request: Request) {
  const { ids } = await request.json();
  await reorderWorks(ids);
  return Response.json({ ok: true });
}
