import type { Metadata } from "next";
import { Barlow_Condensed, Cormorant_Garamond, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./theme-provider";
import { ThemeToggle } from "./theme-toggle";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Lian Benz",
  description: "Essays and published works by Lian Benz.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${inter.variable} ${poppins.variable} ${cormorantGaramond.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('lb-theme');if(t==='b'||t==='c'||t==='d'||t==='e')document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--ink)" }}>
        <ThemeProvider>
          <header
            className="px-6 md:px-12 py-5 flex items-center justify-between border-b"
            style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
          >
            <div className="flex items-center gap-4">
              <a href="/" className="text-sm tracking-[0.2em] uppercase font-medium">
                Lian Benz
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase font-medium px-4 py-1.5 rounded-full border transition-colors hover:opacity-70"
                style={{ borderColor: "var(--rule)", color: "var(--ink-mid)" }}
              >
                Resume
              </a>
            </div>
            <ThemeToggle />
          </header>
          <main className="flex-1">{children}</main>
          <footer
            className="px-6 md:px-12 py-6 text-xs tracking-widest uppercase border-t"
            style={{ borderColor: "var(--rule)", color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}
          >
            © {new Date().getFullYear()} Lian Benz
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
