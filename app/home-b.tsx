import { works, canvaProjects } from "./data";

export default function HomeB() {
  return (
    <div className="px-4 md:px-8 py-6 flex flex-col gap-4">

      {/* Papers */}
      {works.map((work, i) => (
        <a
          key={i}
          href={work.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-3xl p-8 md:p-12 flex flex-col gap-5 transition-transform duration-200 hover:scale-[1.01]"
          style={{ background: "var(--ink)", color: "var(--background)" }}
        >
          <div>
            <h2
              className="text-3xl md:text-5xl font-black leading-tight"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {work.title}
            </h2>
            {work.subtitle && (
              <p
                className="text-lg md:text-xl font-bold mt-1 opacity-75"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {work.subtitle}
              </p>
            )}
          </div>

          <div
            className="flex flex-wrap gap-x-6 gap-y-1 text-xs font-semibold uppercase tracking-widest opacity-60"
            style={{ fontFamily: "var(--font-body)" }}
          >
            <span>{work.author}</span>
            <span>{work.venue}</span>
            <span>{work.date}</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end gap-5 md:gap-12">
            <p
              className="max-w-2xl text-sm leading-relaxed opacity-80"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {work.description}
            </p>
            <span
              className="shrink-0 text-xs font-bold uppercase tracking-[0.2em] px-5 py-2.5 rounded-full border-2 self-start transition-opacity group-hover:opacity-70"
              style={{ borderColor: "var(--background)", color: "var(--background)" }}
            >
              Read →
            </span>
          </div>
        </a>
      ))}

      {/* Discrete Math */}
      <div
        className="rounded-3xl p-8 md:p-12"
        style={{ background: "var(--royal-gold)", color: "var(--coffee-bean)" }}
      >
        <p
          className="text-xs font-bold uppercase tracking-[0.25em] mb-8 opacity-60"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Visual Projects — Discrete Mathematics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {canvaProjects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-2xl p-6 flex flex-col justify-between gap-8 transition-transform duration-200 hover:scale-[1.02]"
              style={{ background: "rgba(0,0,0,0.08)" }}
            >
              <h3
                className="text-xl md:text-2xl font-black leading-tight"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {p.title}
              </h3>
              <span
                className="text-xs font-bold uppercase tracking-widest self-start opacity-60"
                style={{ fontFamily: "var(--font-body)" }}
              >
                View on Canva →
              </span>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
