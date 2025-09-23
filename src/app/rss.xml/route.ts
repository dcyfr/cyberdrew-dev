import { NextResponse } from "next/server";
import { posts } from "@/data/posts";

export const revalidate = 3600; // 1 hour

export async function GET() {
  const site = "https://cyberdrew.dev";
  const items = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>CyberDrew — Blog</title>
    <link>${site}/blog</link>
    <description>Articles and notes on web development, DX, and TypeScript.</description>
    <language>en-us</language>
    ${items
      .map(
        (p) => `
    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>${site}/blog/${p.slug}</link>
      <guid>${site}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
