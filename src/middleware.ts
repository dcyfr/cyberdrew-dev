import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Content Security Policy (CSP) Middleware
 * 
 * Generates a unique nonce for each request to allow inline scripts and styles
 * while maintaining strong CSP protection against XSS attacks.
 * 
 * This middleware adds CSP headers with nonce support for:
 * - JSON-LD structured data scripts
 * - Inline styles from Tailwind and component libraries
 * - Vercel Analytics and Speed Insights
 */

export function middleware(request: NextRequest) {
  // Generate a unique nonce for this request
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  
  // Build CSP directives
  const cspDirectives = [
    // Default: only allow same-origin resources
    "default-src 'self'",
    
    // Scripts: self, Vercel analytics, and nonce for inline scripts (JSON-LD)
    `script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-insights.com 'nonce-${nonce}'`,
    
    // Styles: self, unsafe-inline for Tailwind/Sonner, Google Fonts
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    
    // Images: self, data URIs, and Vercel domains
    "img-src 'self' data: https://*.vercel.com https://vercel.com",
    
    // Fonts: self and Google Fonts CDN
    "font-src 'self' https://fonts.gstatic.com",
    
    // Connect: self and Vercel analytics endpoints
    "connect-src 'self' https://va.vercel-scripts.com https://*.vercel-insights.com https://vercel-insights.com",
    
    // Frame: deny all frames (clickjacking protection)
    "frame-src 'none'",
    
    // Objects: no plugins
    "object-src 'none'",
    
    // Base URI: restrict to self
    "base-uri 'self'",
    
    // Form actions: only to self
    "form-action 'self'",
    
    // Upgrade insecure requests
    "upgrade-insecure-requests",
    
    // Block all mixed content
    "block-all-mixed-content",
  ];

  const cspHeader = cspDirectives.join("; ");

  // Clone response headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set CSP header
  response.headers.set("Content-Security-Policy", cspHeader);

  return response;
}

// Apply middleware to all routes except static assets
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Public files with extensions (images, fonts, etc.)
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
