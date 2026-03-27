"use client";

import { works, canvaProjects } from "./data";
import { AnimatedCard } from "./animated-card";

export default function HomeC() {
  return (
    <div className="px-6 md:px-12 py-14 flex flex-col gap-16">

      {/* Papers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((work, i) => (
          <AnimatedCard key={i} delay={i * 80}>
            <a
              href={work.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full rounded-lg overflow-hidden border transition-shadow duration-300 hover:shadow-lg"
              style={{ borderColor: "var(--rule)", background: "var(--c-card)" }}
            >
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ background: "var(--c-sage)" }} />

              <div className="flex flex-col flex-1 gap-5 p-8">
                {/* Venue + date */}
                <p
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-body)", color: "var(--c-sage)" }}
                >
                  {work.venue} · {work.date}
                </p>

                {/* Title */}
                <div className="flex-1">
                  <h2
                    className="text-3xl leading-snug font-medium"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--ink)" }}
                  >
                    {work.title}
                  </h2>
                  {work.subtitle && (
                    <p
                      className="text-base mt-1 italic"
                      style={{ fontFamily: "var(--font-cormorant)", color: "var(--ink-mid)" }}
                    >
                      {work.subtitle}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed line-clamp-4"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
                >
                  {work.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: "var(--rule)" }}>
                  <span
                    className="text-[10px] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
                  >
                    {work.author.split("&")[0].trim()}
                  </span>
                  <span
                    className="text-[10px] font-medium tracking-wider uppercase transition-colors group-hover:opacity-60"
                    style={{ fontFamily: "var(--font-body)", color: "var(--c-sage)" }}
                  >
                    Read →
                  </span>
                </div>
              </div>
            </a>
          </AnimatedCard>
        ))}
      </div>

      {/* Discrete Math section */}
      <div>
        <AnimatedCard>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
          >
            Visual Projects — Discrete Mathematics
          </p>
        </AnimatedCard>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {canvaProjects.map((p, i) => (
            <AnimatedCard key={p.title} delay={i * 80}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-lg border p-6 transition-shadow duration-300 hover:shadow-lg"
                style={{ borderColor: "var(--rule)", background: "var(--c-card)" }}
              >
                <div className="h-1 w-8 rounded-full" style={{ background: "var(--c-sage)" }} />
                <h3
                  className="text-lg font-medium leading-snug"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--ink)" }}
                >
                  {p.title}
                </h3>
                <span
                  className="text-[10px] uppercase tracking-widest mt-auto transition-opacity group-hover:opacity-60"
                  style={{ fontFamily: "var(--font-body)", color: "var(--c-sage)" }}
                >
                  View on Canva →
                </span>
              </a>
            </AnimatedCard>
          ))}
        </div>
      </div>

    </div>
  );
}
