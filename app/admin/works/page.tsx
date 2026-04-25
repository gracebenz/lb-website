import { getWorks } from "@/lib/works";
import WorksAdmin from "./WorksAdmin";

export default async function WorksPage() {
  const works = await getWorks();
  return <WorksAdmin initialWorks={works} />;
}
