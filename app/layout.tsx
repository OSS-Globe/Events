import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OSS Events - Discover the open-source world",
  description: "A community-maintained platform for discovering open-source conferences, summits, and meetups around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} antialiased bg-base text-primary min-h-screen flex flex-col`}
      >
        <Navigation />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <footer className="mt-16 border-t border-surface-highlight/75">
          <div className="site-container flex flex-col gap-4 py-7 text-sm text-secondary sm:flex-row sm:items-center sm:justify-between">
            <p>OSS Events is a community-maintained project by <a href="https://github.com/OSS-Globe" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary transition-colors hover:text-accent-blue">OSS Globe</a>.</p>
            <a href="https://github.com/OSS-Globe/events" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-secondary transition-colors hover:text-accent-green">
              Source on GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
