import { getWorks } from "@/lib/works";

export async function GET() {
  const works = await getWorks();
  return Response.json(works);
}
