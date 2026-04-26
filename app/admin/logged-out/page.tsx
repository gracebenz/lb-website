import Link from "next/link";

export default function LoggedOutPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6"
      style={{ background: "var(--background)" }}
    >
      <div className="flex flex-col items-center gap-3">
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
        >
          You&apos;ve been logged out
        </p>
        <h1
          className="text-4xl md:text-6xl font-bold uppercase tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          See you later
        </h1>
      </div>

      <div className="flex items-center gap-6" style={{ fontFamily: "var(--font-body)" }}>
        <Link
          href="/"
          className="text-xs tracking-widest uppercase hover:opacity-70 transition-opacity"
          style={{ color: "var(--ink-mid)" }}
        >
          ← Back to site
        </Link>
        <Link
          href="/admin/login"
          className="text-xs tracking-widest uppercase font-semibold px-5 py-2.5 transition-opacity hover:opacity-70"
          style={{ background: "var(--ink)", color: "var(--background)" }}
        >
          Log back in
        </Link>
      </div>
    </div>
  );
}
