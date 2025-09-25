import { NextResponse } from "next/server";

// RFC 9116 allows security.txt at both /security.txt and /.well-known/security.txt
// We redirect from the root location to the canonical .well-known location
export function GET(request: Request) {
  const { origin } = new URL(request.url);
  const canonicalUrl = `${origin}/.well-known/security.txt`;

  return NextResponse.redirect(canonicalUrl, {
    status: 301, // Permanent redirect
    headers: {
      "Cache-Control": "public, max-age=31536000", // Cache for 1 year
    },
  });
}