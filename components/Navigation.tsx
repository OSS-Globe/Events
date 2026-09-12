import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "/events", label: "Events" },
  { href: "/countries", label: "Countries" },
  { href: "/categories", label: "Topics" },
  { href: "/about", label: "About" },
];

function GitHubMark() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-surface-highlight/80 bg-base/95 backdrop-blur-md">
      <nav className="site-container flex h-16 items-center justify-between gap-4" aria-label="Main navigation">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5 text-primary transition-colors hover:text-accent-blue">
          <Image src="/logo.png" alt="OSS Globe" width={34} height={34} className="h-[34px] w-[34px] rounded-md border border-surface-highlight/85" priority />
          <span className="font-display text-lg font-bold tracking-[-0.025em]">OSS Events</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex" aria-label="Primary links">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="relative py-1 text-sm font-semibold text-secondary transition-colors hover:text-primary after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-accent-green after:transition-[width] hover:after:w-full">
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link href="/contribute" className="hidden items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-accent-green sm:inline-flex">
            Contribute <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          <a href="https://github.com/OSS-Globe/events" target="_blank" rel="noopener noreferrer" className="grid h-9 w-9 place-items-center border border-surface-highlight text-secondary transition-colors hover:border-accent-blue hover:text-primary" aria-label="GitHub repository">
            <GitHubMark />
          </a>
        </div>
      </nav>

      <nav className="border-t border-surface-highlight/55 md:hidden" aria-label="Mobile navigation">
        <div className="site-container flex gap-5 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="shrink-0 text-sm font-semibold text-secondary transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
          <Link href="/contribute" className="shrink-0 text-sm font-semibold text-accent-green">Contribute</Link>
        </div>
      </nav>
    </header>
  );
}
