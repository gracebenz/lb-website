import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <nav
        className="px-6 py-4 border-b flex items-center gap-6"
        style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
      >
        <span className="text-xs tracking-widest uppercase font-medium" style={{ color: "var(--ink-mid)" }}>
          Admin
        </span>
        <Link href="/admin/works" className="text-xs tracking-widest uppercase hover:opacity-70">Works</Link>
        <Link href="/admin/canva" className="text-xs tracking-widest uppercase hover:opacity-70">Canva Projects</Link>
        <form action="/api/admin/logout" method="POST" className="ml-auto">
          <button
            type="submit"
            className="text-xs tracking-widest uppercase hover:opacity-70"
            style={{ color: "var(--ink-mid)" }}
          >
            Log out
          </button>
        </form>
      </nav>
      <div className="px-6 py-10">{children}</div>
    </div>
  );
}
