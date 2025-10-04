import { NextResponse } from "next/server";

// RFC 9116: security.txt metadata at /.well-known/security.txt
export function GET(request: Request) {
  const { origin } = new URL(request.url);

  // Expires must be within 1 year. We'll set ~180 days ahead.
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString();

  // Primary contact is the contact form, fallback to email
  const contactEmail = `security@cyberdrew.dev`;
  const contactPage = `${origin}/contact`;

  const body = [
    `Contact: ${contactPage}`,
    `Contact: ${contactEmail}`,
    `Expires: ${expires}`,
    `Preferred-Languages: en`,
    `Canonical: ${origin}/.well-known/security.txt`,
  ].join("\n");

  return new NextResponse(body + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Cache for an hour; clients must still respect Expires directive content.
      "Cache-Control": "public, max-age=3600",
    },
  });
}
