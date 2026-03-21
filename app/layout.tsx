import type { Metadata } from "next";
import { Barlow_Condensed, Inter } from "next/font/google";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Lian Benz",
  description: "Essays and published works by Lian Benz.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--ink)" }}>
        <header
          className="px-6 md:px-12 py-5 flex items-center justify-between border-b"
          style={{ borderColor: "var(--rule)", fontFamily: "var(--font-body)" }}
        >
          <a href="/" className="text-sm tracking-[0.2em] uppercase font-medium">
            Lian Benz
          </a>
        </header>
        <main className="flex-1">{children}</main>
        <footer
          className="px-6 md:px-12 py-6 text-xs tracking-widest uppercase border-t"
          style={{ borderColor: "var(--rule)", color: "var(--ink-mid)", fontFamily: "var(--font-body)" }}
        >
          © {new Date().getFullYear()} Lian Benz
        </footer>
      </body>
    </html>
  );
}
