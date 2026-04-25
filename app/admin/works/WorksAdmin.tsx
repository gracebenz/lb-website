"use client";

import { useState, useRef } from "react";
import type { Work } from "@/lib/works";

type Props = { initialWorks: Work[] };

const empty = { title: "", subtitle: "", author: "", venue: "", date: "", description: "", href: "" };

export default function WorksAdmin({ initialWorks }: Props) {
  const [works, setWorks] = useState(initialWorks);
  const [form, setForm] = useState(empty);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(empty);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [editPdfFile, setEditPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  async function uploadPdf(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/pdfs/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    return data.url;
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      let href = form.href;
      if (pdfFile) href = await uploadPdf(pdfFile);
      await fetch("/api/admin/works", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, href }),
      });
      setForm(empty);
      setPdfFile(null);
      const res = await fetch("/api/admin/works/list");
      const updated = await res.json();
      setWorks(updated);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this work?")) return;
    await fetch(`/api/admin/works/${id}`, { method: "DELETE" });
    setWorks((w) => w.filter((x) => x.id !== id));
  }

  async function handleEdit(id: string) {
    setSaving(true);
    try {
      let href = editForm.href;
      if (editPdfFile) href = await uploadPdf(editPdfFile);
      await fetch(`/api/admin/works/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...editForm, href }),
      });
      setWorks((w) => w.map((x) => (x.id === id ? { ...x, ...editForm, href } : x)));
      setEditId(null);
      setEditPdfFile(null);
    } finally {
      setSaving(false);
    }
  }

  async function handleDrop() {
    if (dragItem.current === null || dragOver.current === null) return;
    const reordered = [...works];
    const [moved] = reordered.splice(dragItem.current, 1);
    reordered.splice(dragOver.current, 0, moved);
    setWorks(reordered);
    dragItem.current = null;
    dragOver.current = null;
    await fetch("/api/admin/works/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: reordered.map((w) => w.id) }),
    });
  }

  const fieldClass = "border px-3 py-2 text-sm outline-none w-full";
  const fieldStyle = { borderColor: "var(--rule)", background: "transparent", color: "var(--ink)", fontFamily: "var(--font-body)" };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-10">
      <h1 className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
        Works
      </h1>

      {/* Add form */}
      <form onSubmit={handleAdd} className="flex flex-col gap-3 border p-6" style={{ borderColor: "var(--rule)" }}>
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>Add Work</p>
        <input required placeholder="Title" className={fieldClass} style={fieldStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input placeholder="Subtitle" className={fieldClass} style={fieldStyle} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
        <input placeholder="Author" className={fieldClass} style={fieldStyle} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <input placeholder="Venue / Publication" className={fieldClass} style={fieldStyle} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
        <input placeholder="Date (e.g. May 2025)" className={fieldClass} style={fieldStyle} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <textarea placeholder="Description" rows={3} className={fieldClass} style={fieldStyle} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        <div className="flex flex-col gap-1">
          <input placeholder="Link URL (or upload PDF below)" className={fieldClass} style={fieldStyle} value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} />
          <label className="text-xs mt-1 cursor-pointer" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>
            Upload PDF:
            <input type="file" accept="application/pdf" className="ml-2 text-xs" onChange={(e) => setPdfFile(e.target.files?.[0] ?? null)} />
          </label>
          {pdfFile && <p className="text-xs" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>Selected: {pdfFile.name}</p>}
        </div>
        <button type="submit" disabled={saving} className="self-start px-5 py-2 text-xs font-medium uppercase tracking-widest transition-opacity hover:opacity-70 disabled:opacity-40" style={{ background: "var(--ink)", color: "var(--background)", fontFamily: "var(--font-body)" }}>
          {saving ? "Saving..." : "Add"}
        </button>
      </form>

      {/* Works list */}
      <div className="flex flex-col gap-2">
        <p className="text-xs tracking-widest uppercase mb-2" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>
          Drag to reorder
        </p>
        {works.map((work, i) => (
          <div
            key={work.id}
            draggable
            onDragStart={() => { dragItem.current = i; }}
            onDragEnter={() => { dragOver.current = i; }}
            onDragEnd={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border p-4 cursor-grab active:cursor-grabbing"
            style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
          >
            {editId === work.id ? (
              <div className="flex flex-col gap-2">
                <input placeholder="Title" className={fieldClass} style={fieldStyle} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                <input placeholder="Subtitle" className={fieldClass} style={fieldStyle} value={editForm.subtitle} onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })} />
                <input placeholder="Author" className={fieldClass} style={fieldStyle} value={editForm.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} />
                <input placeholder="Venue" className={fieldClass} style={fieldStyle} value={editForm.venue} onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })} />
                <input placeholder="Date" className={fieldClass} style={fieldStyle} value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                <textarea placeholder="Description" rows={3} className={fieldClass} style={fieldStyle} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <input placeholder="Link URL" className={fieldClass} style={fieldStyle} value={editForm.href} onChange={(e) => setEditForm({ ...editForm, href: e.target.value })} />
                <label className="text-xs cursor-pointer" style={{ color: "var(--ink-mid)" }}>
                  Replace PDF:
                  <input type="file" accept="application/pdf" className="ml-2 text-xs" onChange={(e) => setEditPdfFile(e.target.files?.[0] ?? null)} />
                </label>
                <div className="flex gap-3 mt-1">
                  <button onClick={() => handleEdit(work.id)} disabled={saving} className="text-xs uppercase tracking-widest px-4 py-1.5 hover:opacity-70 disabled:opacity-40" style={{ background: "var(--ink)", color: "var(--background)" }}>Save</button>
                  <button onClick={() => setEditId(null)} className="text-xs uppercase tracking-widest px-4 py-1.5 hover:opacity-70" style={{ border: "1px solid var(--rule)" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">{work.title}</p>
                  {work.subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--ink-mid)" }}>{work.subtitle}</p>}
                  <p className="text-xs mt-1" style={{ color: "var(--ink-mid)" }}>{[work.venue, work.date].filter(Boolean).join(" · ")}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button onClick={() => { setEditId(work.id); setEditForm({ title: work.title, subtitle: work.subtitle ?? "", author: work.author ?? "", venue: work.venue ?? "", date: work.date ?? "", description: work.description ?? "", href: work.href ?? "" }); }} className="text-xs uppercase tracking-widest hover:opacity-70">Edit</button>
                  <button onClick={() => handleDelete(work.id)} className="text-xs uppercase tracking-widest hover:opacity-70" style={{ color: "#e53e3e" }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
