import { works, canvaProjects } from "./data";
import { AnimatedCard } from "./animated-card";

export default function HomeE() {
  return (
    <div>
      {/* Works list */}
      <div>
        {works.map((work, i) => (
          <AnimatedCard key={i} delay={i * 80}>
            <a
              href={work.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b group"
              style={{ borderColor: "var(--rule)" }}
            >
              <div className="px-6 md:px-12 py-10 md:py-14">
                {/* Title — gold */}
                <h2
                  className="text-[8vw] md:text-[6vw] leading-none font-bold uppercase tracking-tight mb-1 transition-transform duration-200 origin-left group-hover:scale-[1.02]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {work.title}
                </h2>
                {/* Subtitle — steel blue-gray */}
                {work.subtitle && (
                  <p
                    className="text-[4vw] md:text-[2.5vw] leading-none font-semibold uppercase tracking-tight mb-8 transition-transform duration-200 origin-left group-hover:scale-[1.02]"
                    style={{ fontFamily: "var(--font-display)", color: "var(--ink-mid)" }}
                  >
                    {work.subtitle}
                  </p>
                )}

                {/* Metadata — steel blue-gray */}
                <div
                  className="flex flex-wrap gap-x-8 gap-y-1 text-xs tracking-widest uppercase mb-6"
                  style={{ fontFamily: "var(--font-body)", color: "var(--d-orange)" }}
                >
                  <span>{work.author}</span>
                  <span>{work.venue}</span>
                  <span>{work.date}</span>
                </div>

                <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
                  {/* Description — soft linen */}
                  <p
                    className="max-w-2xl text-sm leading-relaxed font-light"
                    style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
                  >
                    {work.description}
                  </p>
                  {/* CTA — gold bg, prussian blue text */}
                  <span
                    className="shrink-0 text-xs tracking-[0.25em] uppercase font-medium px-4 py-2 rounded-full transition-colors"
                    style={{ fontFamily: "var(--font-body)", background: "var(--d-gold)", color: "var(--coffee-bean)" }}
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
      <div className="px-6 md:px-12 py-14 border-t" style={{ borderColor: "var(--rule)" }}>
        {/* Section label — steel blue-gray */}
        <p
          className="text-xs tracking-[0.25em] uppercase mb-8"
          style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
        >
          Visual Projects — Discrete Mathematics
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {canvaProjects.map((p, i) => (
            <AnimatedCard key={p.title} delay={i * 80}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between gap-6 border rounded-sm p-6 transition-all duration-200 hover:border-[var(--ink)] hover:scale-[1.02]"
                style={{ borderColor: "var(--rule)" }}
              >
                {/* Canva title — soft linen */}
                <h3
                  className="text-2xl md:text-3xl font-bold uppercase leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink)" }}
                >
                  {p.title}
                </h3>
                {/* CTA — orange, right-aligned */}
                <span
                  className="text-xs tracking-[0.25em] uppercase self-end transition-opacity group-hover:opacity-60"
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
