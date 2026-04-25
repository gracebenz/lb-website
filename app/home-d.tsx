"use client";

import { AnimatedCard } from "./animated-card";
import type { Work } from "@/lib/works";
import type { CanvaProject } from "@/lib/canva";

type Props = { works: Work[]; canvaProjects: CanvaProject[] };

export default function HomeD({ works, canvaProjects }: Props) {
  return (
    <div className="px-6 md:px-12 py-14 flex flex-col gap-16">

      {/* Papers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {works.map((work, i) => (
          <AnimatedCard key={i} delay={i * 80}>
            <a
              href={work.href ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col h-full rounded-lg overflow-hidden border transition-shadow duration-300 hover:shadow-lg"
              style={{ borderColor: "var(--rule)", background: "var(--d-card)" }}
            >
              {/* Accent bar */}
              <div className="h-1 w-full" style={{ background: "var(--ink-mid)" }} />

              <div className="flex flex-col flex-1 gap-5 px-8 pt-8 pb-0">
                {/* Venue + date — metadata, steel blue-gray */}
                <p
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
                >
                  {work.venue} · {work.date}
                </p>

                {/* Title — gold, reserved only for piece titles */}
                <div className="flex-1">
                  <h2
                    className="text-3xl leading-snug font-medium"
                    style={{ fontFamily: "var(--font-cormorant)", color: "var(--d-gold)" }}
                  >
                    {work.title}
                  </h2>
                  {/* Subtitle — metadata, steel blue-gray */}
                  {work.subtitle && (
                    <p
                      className="text-base mt-1 italic"
                      style={{ fontFamily: "var(--font-cormorant)", color: "var(--ink-mid)" }}
                    >
                      {work.subtitle}
                    </p>
                  )}
                </div>

                {/* Description — primary readable content, soft linen */}
                <p
                  className="text-sm leading-relaxed line-clamp-4"
                  style={{ fontFamily: "var(--font-body)", color: "var(--ink)" }}
                >
                  {work.description}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between py-3 border-t" style={{ borderColor: "var(--rule)" }}>
                  {/* Author — metadata, steel blue-gray */}
                  <span
                    className="text-[10px] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
                  >
                    {work.author?.split("&")[0]?.trim()}
                  </span>
                  {/* CTA — orange */}
                  <span
                    className="text-[10px] font-medium tracking-wider uppercase transition-opacity group-hover:opacity-60"
                    style={{ fontFamily: "var(--font-body)", color: "var(--d-orange)" }}
                  >
                    Read →
                  </span>
                </div>
              </div>
            </a>
          </AnimatedCard>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-6" style={{ borderColor: "var(--rule)" }}>
        <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
        <span
          className="text-[10px] tracking-[0.3em] uppercase shrink-0"
          style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
        >
          Visual Projects
        </span>
        <div className="flex-1 h-px" style={{ background: "var(--rule)" }} />
      </div>

      {/* Discrete Math section */}
      <div className="-mt-8">
        <AnimatedCard>
          <p
            className="text-[10px] tracking-[0.25em] uppercase mb-6"
            style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
          >
            Discrete Mathematics
          </p>
        </AnimatedCard>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {canvaProjects.map((p, i) => (
            <AnimatedCard key={p.title} delay={i * 80}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-4 rounded-lg border px-6 pt-6 pb-4 transition-shadow duration-300 hover:shadow-lg"
                style={{ borderColor: "var(--rule)", background: "var(--d-card)" }}
              >
                <div className="h-1 w-8 rounded-full" style={{ background: "var(--ink-mid)" }} />
                {/* Canva title — primary readable content, soft linen */}
                <h3
                  className="text-lg font-medium leading-snug"
                  style={{ fontFamily: "var(--font-cormorant)", color: "var(--ink)" }}
                >
                  {p.title}
                </h3>
                {/* CTA — orange */}
                <span
                  className="text-[10px] uppercase tracking-widest self-end transition-opacity group-hover:opacity-60"
                  style={{ fontFamily: "var(--font-body)", color: "var(--d-orange)" }}
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
