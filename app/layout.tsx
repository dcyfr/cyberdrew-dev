import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE = "https://www.cyberdrew.dev";
const TITLE = "Drew · Agents that act. Rails that hold.";
const DESC =
  "Security architect building autonomous AI systems that take real actions in production, and the guardrails that make that a safe bet. Founding Architect at DCYFR Labs, Head of AI at GameShark Labs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  applicationName: "cyberdrew.dev",
  authors: [{ name: "Drew", url: SITE }],
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
  name: "Drew",
  alternateName: "cyberdrew",
  url: SITE,
  jobTitle: "Security Architect & AI Engineer",
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

// Runs before first paint so a stored theme never flashes the other ground.
const THEME_BOOT = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  );
}
