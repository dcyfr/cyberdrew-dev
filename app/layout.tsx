import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

/**
 * The display face, self-hosted. On the system stack the hero measured 448px
 * on macOS, 412px on Windows/Android and 462px on the Arial fallback: a 13%
 * swing on the most important line of the site, in three different
 * letterforms. One variable Latin subset (36KB) locks the identity.
 *
 * next/font/local self-hosts, preloads, and generates a size-adjusted
 * fallback so the swap does not shift layout.
 */
const archivo = localFont({
  src: "./fonts/archivo-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-archivo",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const SITE = "https://www.cyberdrew.dev";
const TITLE = "Drew Gowan, Cyber Architect";
// Tracks the hero deck in lib/site.ts — this is the same claim, written for a
// SERP snippet rather than a page. Change both or neither.
const DESC =
  "Cyber architect building autonomous systems that take real actions in production and the guardrails that make that a safe bet. Founder at DCYFR Labs, Head of AI at GameShark Labs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  applicationName: "cyberdrew.dev",
  authors: [{ name: "Drew Gowan", url: SITE }],
  keywords: [
    "autonomous agents",
    "agentic AI security",
    "AI safety",
    "agent governance",
    "local-first inference",
    "security architecture",
    "DCYFR",
    "GameShark",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE,
    siteName: "cyberdrew.dev",
    title: TITLE,
    description: DESC,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "Agents that act. Rails that hold.",
    creator: "@dcyfr_",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
    { media: "(prefers-color-scheme: light)", color: "#f4f3f0" },
  ],
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Drew Gowan",
  alternateName: ["cyberdrew", "dcyfr"],
  url: SITE,
  jobTitle: "Cyber Architect",
  description: DESC,
  email: "mailto:hello@cyberdrew.dev",
  knowsAbout: [
    "Autonomous AI agents",
    "Agentic AI security",
    "AI safety",
    "Multi-agent systems",
    "Local-first inference",
    "Model Context Protocol",
    "Security architecture",
    "TypeScript",
  ],
  sameAs: [
    "https://www.dcyfr.ai",
    "https://github.com/dcyfr",
    "https://linkedin.com/in/dcyfr",
    "https://x.com/dcyfr_",
  ],
  worksFor: [
    { "@type": "Organization", name: "DCYFR Labs", url: "https://www.dcyfr.ai" },
    { "@type": "Organization", name: "GameShark Labs", url: "https://gamesharklabs.com" },
  ],
};

// Runs before first paint: a stored theme never flashes the other ground, and
// .js-reveal gates the reveal's hidden state so the page can only be hidden
// when the script that reveals it has actually run.
const BOOT = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){d.setAttribute("data-theme",t)}}catch(e){}d.classList.add("js-reveal")})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={archivo.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
        {/* Both are first-party: the scripts and their beacons are proxied
            under /_vercel/*, so no third-party origin enters the page and the
            CSP stays at 'self'. Analytics needs its dashboard toggle flipped
            on before it records anything. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
