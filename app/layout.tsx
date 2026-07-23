import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const SITE = "https://www.cyberdrew.dev";
const TITLE = "Drew — I build the systems that build";
const DESC =
  "Autonomy engineer at the agentic frontier. Founder @ DCYFR Labs, Head of AI @ GameShark Labs — building AI that reasons, acts, and runs itself: a governed fleet of agents that research, ship code, and self-heal 24/7.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: TITLE,
  description: DESC,
  applicationName: "cyberdrew.dev",
  authors: [{ name: "Drew", url: SITE }],
  keywords: [
    "autonomous agents",
    "agentic systems",
    "AI engineering",
    "local-first inference",
    "AI safety",
    "DCYFR",
    "GameShark",
    "Drew",
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
    description: "Autonomy engineer at the agentic frontier.",
    creator: "@dcyfr_",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#060911" },
    { media: "(prefers-color-scheme: light)", color: "#eef1f5" },
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
    "https://x.com/dcyfr_",
    "https://linkedin.com/in/dcyfr",
    "https://dev.to/dcyfr",
  ],
  worksFor: [
    { "@type": "Organization", name: "DCYFR Labs", url: "https://www.dcyfr.ai" },
    { "@type": "Organization", name: "GameShark Labs", url: "https://gamesharklabs.com" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
