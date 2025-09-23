import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="mx-auto max-w-5xl px-6 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          cyberdrew.dev
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/projects" className="hover:underline underline-offset-4">
            Projects
          </Link>
          <Link href="/about" className="hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/contact" className="hover:underline underline-offset-4">
            Contact
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
