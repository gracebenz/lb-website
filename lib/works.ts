import { supabase, supabaseAdmin } from "./supabase";

export type Work = {
  id: string;
  title: string;
  subtitle: string | null;
  author: string | null;
  venue: string | null;
  date: string | null;
  description: string | null;
  href: string | null;
  order: number;
};

export async function getWorks(): Promise<Work[]> {
  const { data } = await supabase
    .from("lb_works")
    .select("*")
    .order("order", { ascending: true });
  return data ?? [];
}

export async function createWork(work: Omit<Work, "id" | "order">) {
  const { data: last } = await supabaseAdmin
    .from("lb_works")
    .select("order")
    .order("order", { ascending: false })
    .limit(1)
    .single();
  const order = last ? last.order + 1 : 0;
  return supabaseAdmin.from("lb_works").insert({ ...work, order });
}

export async function updateWork(id: string, work: Partial<Omit<Work, "id">>) {
  return supabaseAdmin.from("lb_works").update(work).eq("id", id);
}

export async function deleteWork(id: string) {
  return supabaseAdmin.from("lb_works").delete().eq("id", id);
}

export async function reorderWorks(ids: string[]) {
  const updates = ids.map((id, order) =>
    supabaseAdmin.from("lb_works").update({ order }).eq("id", id)
  );
  return Promise.all(updates);
}
