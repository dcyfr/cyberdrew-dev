import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cyberdrew.dev"),
  title: {
    default: "CyberDrew — Developer Portfolio",
    template: "%s — CyberDrew",
  },
  description:
    "Modern, minimalistic developer portfolio of Drew. Full‑stack engineering, TypeScript, React, Node.js, cloud-native.",
  openGraph: {
    title: "CyberDrew — Developer Portfolio",
    description:
      "Modern, minimalistic developer portfolio of Drew. Full‑stack engineering, TypeScript, React, Node.js, cloud-native.",
    url: "https://cyberdrew.dev",
    siteName: "CyberDrew",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.svg",
        width: 1200,
        height: 630,
        alt: "cyberdrew.dev — Developer Portfolio",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SiteHeader />
          <main className="min-h-[calc(100dvh-128px)] px-6 md:px-8">{children}</main>
          <SiteFooter />
          <Toaster richColors position="top-center" />
          {/* Vercel Analytics & Speed Insights */}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
