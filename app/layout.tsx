import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
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
        <footer className="border-t border-surface-highlight py-8 mt-12 bg-surface/50">
          <div className="container mx-auto px-4 text-center text-sm text-secondary">
            <p>A project by <a href="https://github.com/OSS-Globe" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-accent-blue">OSS Globe</a>. Maintained by the community.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
