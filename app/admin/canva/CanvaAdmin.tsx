"use client";

import { useState, useRef } from "react";
import type { CanvaProject } from "@/lib/canva";

type Props = { initialProjects: CanvaProject[] };

export default function CanvaAdmin({ initialProjects }: Props) {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState({ title: "", href: "" });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({ title: "", href: "" });
  const [saving, setSaving] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/canva", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", href: "" });
    const res = await fetch("/api/admin/canva/list");
    const updated = await res.json();
    setProjects(updated);
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await fetch(`/api/admin/canva/${id}`, { method: "DELETE" });
    setProjects((p) => p.filter((x) => x.id !== id));
  }

  async function handleEdit(id: string) {
    setSaving(true);
    await fetch(`/api/admin/canva/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });
    setProjects((p) => p.map((x) => (x.id === id ? { ...x, ...editForm } : x)));
    setEditId(null);
    setSaving(false);
  }

  async function handleDrop() {
    if (dragItem.current === null || dragOver.current === null) return;
    const reordered = [...projects];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOver.current, 0, moved);
    setProjects(reordered);
    dragItem.current = null;
    dragOver.current = null;
    await fetch("/api/admin/canva/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((p) => p.id) }),
    });
  }

  const fieldClass = "border px-3 py-2 text-sm outline-none w-full";
  const fieldStyle = { borderColor: "var(--rule)", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-body)" };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10">
      <h1 className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
        Canva Projects
      </h1>

      <form onSubmit={handleAdd} className="flex flex-col gap-3 border p-6" style={{ borderColor: "var(--rule)" }}>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>Add Project</p>
        <input required placeholder="Title" className={fieldClass} style={fieldStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input required placeholder="Canva URL" className={fieldClass} style={fieldStyle} value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} />
        <button type="submit" disabled={saving} className="self-start px-5 py-2 text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-70 disabled:opacity-40" style={{ background: "var(--d-gold)", color: "var(--coffee-bean)", fontFamily: "var(--font-body)" }}>
          {saving ? "Saving..." : "Add"}
        </button>
      </form>

      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>Drag to reorder</p>
        {projects.map((project, i) => (
          <div
            key={project.id}
            draggable
            onDragStart={() => { dragItem.current = i; }}
            onDragEnter={() => { dragOver.current = i; }}
            onDragEnd={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border p-4 cursor-grab active:cursor-grabbing"
            style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
          >
            {editId === project.id ? (
              <div className="flex flex-col gap-2">
                <input placeholder="Title" className={fieldClass} style={fieldStyle} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                <input placeholder="Canva URL" className={fieldClass} style={fieldStyle} value={editForm.href} onChange={(e) => setEditForm({ ...editForm, href: e.target.value })} />
                <div className="flex gap-3 mt-1">
                  <button onClick={() => handleEdit(project.id)} disabled={saving} className="text-xs uppercase tracking-widest px-4 py-1.5 hover:opacity-70 disabled:opacity-40" style={{ background: "var(--d-gold)", color: "var(--coffee-bean)" }}>Save</button>
                  <button onClick={() => setEditId(null)} className="text-xs uppercase tracking-widest px-4 py-1.5 hover:opacity-70" style={{ border: "1px solid var(--rule)" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <p className="font-semibold text-sm">{project.title}</p>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => { setEditId(project.id); setEditForm({ title: project.title, href: project.href }); }} className="text-xs uppercase tracking-widest hover:opacity-70">Edit</button>
                  <button onClick={() => handleDelete(project.id)} className="text-xs uppercase tracking-widest hover:opacity-70" style={{ color: "#e53e3e" }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
