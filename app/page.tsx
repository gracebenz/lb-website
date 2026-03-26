const canvaProjects = [
  {
    title: "Euler Trails & Euler Circuits",
    href: "https://www.canva.com/design/DAG4Tk74Skw/tmP7nu6uSwCTuSMtCbB9_Q/edit?utm_content=DAG4Tk74Skw&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    title: "Structure of Logical Statements",
    href: "https://www.canva.com/design/DAG7iVbL9m8/vY6BdlL-jt4F0ww_mSNQ5A/edit?utm_content=DAG7iVbL9m8&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
  {
    title: "Cryptography & Number Theory",
    href: "https://www.canva.com/design/DAHDkAQUmhI/gfUUdSbleSYWXsp8d4DRxA/edit?utm_content=DAHDkAQUmhI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton",
  },
];

const works = [
  {
    title: "Ghost Daughters and Bar Girls",
    subtitle: "Negotiating Marginal Womanhood in Taiwan",
    author: "Lian Benz",
    venue: "The Schola",
    date: "September 2025",
    description:
      "An exploration of how Buddhist nuns and sex workers in Taiwan challenge prevailing definitions of Taiwanese womanhood by existing outside the expected familial and gendered life trajectory rooted in Confucian ideals.",
    href: "/ghost-daughters.pdf",
  },
  {
    title: "The Demographics Behind SAT Performance",
    subtitle: "An Analysis of New York City Public Schools",
    author: "Lian Benz & Zoe Tzaivragos",
    venue: "Data Science for Social Impact",
    date: "May 2025",
    description:
      "A data-driven investigation into the socioeconomic and demographic factors that drive SAT score disparities across New York City public schools.",
    href: "/sat-demographics.pdf",
  },
  {
    title: "Universal Basic Income",
    subtitle: "How America Could Finally Become the True Land of Opportunity",
    author: "Lian Benz",
    venue: "Avenues: The World School",
    date: "January 2025",
    description:
      "An argument for UBI as a structural remedy to entrenched inequality in the United States, examining its economic viability and social implications.",
    href: "/ubi-america.pdf",
  },
  {
    title: "Pathways to Opportunity",
    subtitle: "A Moving to Opportunity Program for Harlem, NY",
    author: "Lian Benz, Zoe Tziavragos & Sophie Raglan",
    venue: "Housing Policy",
    date: "December 2024",
    description:
      "A policy proposal adapting the Moving to Opportunity framework to address concentrated poverty and limited mobility in Harlem, with concrete implementation recommendations.",
    href: "/moving-to-opportunity.pdf",
  },
];

export default function Home() {
  return (
    <div>
      {/* Works list */}
      <div>
        {works.map((work, i) => (
          <a
            key={i}
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            className="block border-b group"
            style={{ borderColor: "var(--rule)" }}
          >
            <div className="px-6 md:px-12 py-10 md:py-14">
              {/* Big title */}
              <h2
                className="text-[8vw] md:text-[6vw] leading-none font-bold uppercase tracking-tight mb-1 transition-transform duration-200 origin-left group-hover:scale-[1.02]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {work.title}
              </h2>
              {work.subtitle && (
                <p
                  className="text-[4vw] md:text-[2.5vw] leading-none font-semibold uppercase tracking-tight mb-8 transition-transform duration-200 origin-left group-hover:scale-[1.02]"
                  style={{ fontFamily: "var(--font-display)", color: "var(--ink-mid)" }}
                >
                  {work.subtitle}
                </p>
              )}

              {/* Meta row */}
              <div
                className="flex flex-wrap gap-x-8 gap-y-1 text-xs tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
              >
                <span>{work.author}</span>
                <span>{work.venue}</span>
                <span>{work.date}</span>
              </div>

              {/* Description + read link */}
              <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
                <p
                  className="max-w-2xl text-sm leading-relaxed font-light"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {work.description}
                </p>
                <span
                  className="shrink-0 text-xs tracking-[0.25em] uppercase font-medium px-4 py-2 rounded-full transition-colors"
                  style={{ fontFamily: "var(--font-body)", background: "var(--royal-gold)", color: "var(--coffee-bean)" }}
                >
                  Read →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Discrete Math section */}
      <div className="px-6 md:px-12 py-14 border-t" style={{ borderColor: "var(--rule)" }}>
        <p
          className="text-xs tracking-[0.25em] uppercase mb-8"
          style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
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
              className="group flex flex-col justify-between gap-6 border rounded-sm p-6 transition-all duration-200 hover:border-[var(--ink)] hover:scale-[1.02]"
              style={{ borderColor: "var(--rule)" }}
            >
              <h3
                className="text-2xl md:text-3xl font-bold uppercase leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {p.title}
              </h3>
              <span
                className="text-xs tracking-[0.25em] uppercase self-start"
                style={{ fontFamily: "var(--font-body)", color: "var(--ink-mid)" }}
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
