import { supabaseAdmin } from "@/lib/supabase";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file") as File;

  if (!file) {
    return Response.json({ ok: false, error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const { error } = await supabaseAdmin.storage
    .from("lian-pdfs")
    .upload(filename, buffer, { contentType: "application/pdf", upsert: false });

  if (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }

  const { data } = supabaseAdmin.storage.from("lian-pdfs").getPublicUrl(filename);
  return Response.json({ ok: true, url: data.publicUrl });
}
