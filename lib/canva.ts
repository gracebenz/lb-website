import { supabase, supabaseAdmin } from "./supabase";

export type CanvaProject = {
  id: string;
  title: string;
  href: string;
  order: number;
};

export async function getCanvaProjects(): Promise<CanvaProject[]> {
  const { data } = await supabase
    .from("lb_canva_projects")
    .select("*")
    .order("order", { ascending: true });
  return data ?? [];
}

export async function createCanvaProject(project: Omit<CanvaProject, "id" | "order">) {
  const { data: last } = await supabaseAdmin
    .from("lb_canva_projects")
    .select("order")
    .order("order", { ascending: false })
    .limit(1)
    .single();
  const order = last ? last.order + 1 : 0;
  return supabaseAdmin.from("lb_canva_projects").insert({ ...project, order });
}

export async function updateCanvaProject(id: string, project: Partial<Omit<CanvaProject, "id">>) {
  return supabaseAdmin.from("lb_canva_projects").update(project).eq("id", id);
}

export async function deleteCanvaProject(id: string) {
  return supabaseAdmin.from("lb_canva_projects").delete().eq("id", id);
}

export async function reorderCanvaProjects(ids: string[]) {
  const updates = ids.map((id, order) =>
    supabaseAdmin.from("lb_canva_projects").update({ order }).eq("id", id)
  );
  return Promise.all(updates);
}
