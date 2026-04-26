"use client";

import { useState, useRef } from "react";
import type { Work } from "@/lib/works";

type Props = { initialWorks: Work[] };

const emptyForm = { title: "", subtitle: "", author: "", venue: "", date: "", description: "", href: "" };

export default function WorksAdmin({ initialWorks }: Props) {
  const [works, setWorks] = useState(initialWorks);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(emptyForm);
  const [editPdfFile, setEditPdfFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editFileInputRef = useRef<HTMLInputElement>(null);
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

  function handleFileSelect(file: File) {
    setPdfFile(file);
    if (!form.title) {
      const name = file.name.replace(/\.pdf$/i, "").replace(/[-_]/g, " ");
      setForm((f) => ({ ...f, title: name }));
    }
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
      setForm(emptyForm);
      setPdfFile(null);
      setAdding(false);
      const res = await fetch("/api/admin/works/list");
      setWorks(await res.json());
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
  const btnPrimary = "px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-70 disabled:opacity-40";
  const btnSecondary = "px-5 py-2.5 text-xs font-semibold uppercase tracking-widest border transition-opacity hover:opacity-70";

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold uppercase tracking-widest" style={{ fontFamily: "var(--font-display)" }}>
          Works
        </h1>
        {!adding && (
          <button
            onClick={() => setAdding(true)}
            className={btnPrimary}
            style={{ background: "var(--ink)", color: "var(--background)", fontFamily: "var(--font-body)" }}
          >
            + Add Work
          </button>
        )}
      </div>

      {/* Add form */}
      {adding && (
        <form onSubmit={handleAdd} className="flex flex-col gap-4 border p-6" style={{ borderColor: "var(--rule)" }}>
          <p className="text-xs tracking-widest uppercase font-semibold" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>
            New Work
          </p>

          {/* PDF upload — prominent */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className={btnSecondary + " flex items-center gap-2"}
              style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
            >
              <span>↑</span>
              {pdfFile ? pdfFile.name : "Upload PDF"}
            </button>
            {pdfFile && (
              <p className="text-xs mt-1" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>
                ✓ {pdfFile.name}
              </p>
            )}
          </div>

          <div className="h-px" style={{ background: "var(--rule)" }} />

          <input placeholder="Title" className={fieldClass} style={fieldStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input placeholder="Subtitle (optional)" className={fieldClass} style={fieldStyle} value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Author (optional)" className={fieldClass} style={fieldStyle} value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            <input placeholder="Venue (optional)" className={fieldClass} style={fieldStyle} value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
          </div>
          <input placeholder="Date (optional, e.g. May 2025)" className={fieldClass} style={fieldStyle} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          <textarea placeholder="Description (optional)" rows={3} className={fieldClass} style={fieldStyle} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input placeholder="Or paste a link instead of uploading PDF" className={fieldClass} style={fieldStyle} value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} />

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving || (!form.title && !pdfFile)}
              className={btnPrimary}
              style={{ background: "var(--ink)", color: "var(--background)", fontFamily: "var(--font-body)" }}
            >
              {saving ? "Saving..." : "Save Work"}
            </button>
            <button
              type="button"
              onClick={() => { setAdding(false); setForm(emptyForm); setPdfFile(null); }}
              className={btnSecondary}
              style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Works list */}
      <div className="flex flex-col gap-2">
        {works.length > 0 && (
          <p className="text-xs tracking-widest uppercase mb-1" style={{ color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}>
            Drag to reorder
          </p>
        )}
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
              <div className="flex flex-col gap-3">
                <div>
                  <input
                    ref={editFileInputRef}
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => setEditPdfFile(e.target.files?.[0] ?? null)}
                  />
                  <button
                    type="button"
                    onClick={() => editFileInputRef.current?.click()}
                    className={btnSecondary + " flex items-center gap-2 text-xs"}
                    style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
                  >
                    <span>↑</span>
                    {editPdfFile ? editPdfFile.name : "Replace PDF"}
                  </button>
                </div>
                <div className="h-px" style={{ background: "var(--rule)" }} />
                <input placeholder="Title" className={fieldClass} style={fieldStyle} value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} />
                <input placeholder="Subtitle" className={fieldClass} style={fieldStyle} value={editForm.subtitle} onChange={(e) => setEditForm({ ...editForm, subtitle: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <input placeholder="Author" className={fieldClass} style={fieldStyle} value={editForm.author} onChange={(e) => setEditForm({ ...editForm, author: e.target.value })} />
                  <input placeholder="Venue" className={fieldClass} style={fieldStyle} value={editForm.venue} onChange={(e) => setEditForm({ ...editForm, venue: e.target.value })} />
                </div>
                <input placeholder="Date" className={fieldClass} style={fieldStyle} value={editForm.date} onChange={(e) => setEditForm({ ...editForm, date: e.target.value })} />
                <textarea placeholder="Description" rows={3} className={fieldClass} style={fieldStyle} value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                <input placeholder="Link URL" className={fieldClass} style={fieldStyle} value={editForm.href} onChange={(e) => setEditForm({ ...editForm, href: e.target.value })} />
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(work.id)} disabled={saving} className={btnPrimary} style={{ background: "var(--ink)", color: "var(--background)", fontFamily: "var(--font-body)" }}>
                    {saving ? "Saving..." : "Save"}
                  </button>
                  <button onClick={() => { setEditId(null); setEditPdfFile(null); }} className={btnSecondary} style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-sm">{work.title || <span style={{ color: "var(--ink-mid)" }}>Untitled</span>}</p>
                  {work.subtitle && <p className="text-xs mt-0.5" style={{ color: "var(--ink-mid)" }}>{work.subtitle}</p>}
                  <p className="text-xs mt-1" style={{ color: "var(--ink-mid)" }}>{[work.venue, work.date].filter(Boolean).join(" · ")}</p>
                </div>
                <div className="flex gap-4 shrink-0">
                  <button
                    onClick={() => { setEditId(work.id); setEditForm({ title: work.title, subtitle: work.subtitle ?? "", author: work.author ?? "", venue: work.venue ?? "", date: work.date ?? "", description: work.description ?? "", href: work.href ?? "" }); }}
                    className="text-xs uppercase tracking-widest hover:opacity-70"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(work.id)}
                    className="text-xs uppercase tracking-widest hover:opacity-70"
                    style={{ color: "#e53e3e", fontFamily: "var(--font-body)" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
