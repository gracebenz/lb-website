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
      {/* Hero */}
      <div
        className="px-6 md:px-12 py-16 border-b overflow-hidden"
        style={{ borderColor: "var(--rule)" }}
      >
        <h1
          className="text-[18vw] leading-none font-black uppercase tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Lian Benz
        </h1>
      </div>

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
                className="text-[8vw] md:text-[6vw] leading-none font-black uppercase tracking-tight mb-1 transition-opacity group-hover:opacity-60"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {work.title}
              </h2>
              {work.subtitle && (
                <p
                  className="text-[4vw] md:text-[2.5vw] leading-none font-black uppercase tracking-tight mb-8 transition-opacity group-hover:opacity-60"
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
                  className="shrink-0 text-xs tracking-[0.25em] uppercase font-medium underline underline-offset-4 transition-opacity group-hover:opacity-60"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Read →
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
