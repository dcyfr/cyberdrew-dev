/**
 * Security headers and CSP configuration for enhanced protection
 */

export const SECURITY_HEADERS = {
  // Content Security Policy - prevents XSS and other injection attacks
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Allow inline scripts for React
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Allow inline styles and Google Fonts
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https:",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; '),

  // Prevent clickjacking attacks
  'X-Frame-Options': 'DENY',
  
  // Prevent MIME type sniffing
  'X-Content-Type-Options': 'nosniff',
  
  // Enable XSS protection
  'X-XSS-Protection': '1; mode=block',
  
  // Referrer policy for privacy
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  
  // Permissions policy (formerly Feature Policy)
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'accelerometer=()',
    'gyroscope=()'
  ].join(', ')
};

/**
 * Security meta tags for HTML head
 */
export const SECURITY_META_TAGS = [
  // Prevent automatic phone number detection
  { name: 'format-detection', content: 'telephone=no' },
  
  // DNS prefetch control
  { 'http-equiv': 'x-dns-prefetch-control', content: 'on' },
  
  // IE compatibility
  { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
  
  // Robots meta for SEO security
  { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' }
];

/**
 * Apply security headers to response (for deployment configuration)
 */
export function getSecurityHeadersConfig() {
  return {
    headers: Object.entries(SECURITY_HEADERS).map(([key, value]) => ({
      key,
      value
    }))
  };
}

/**
 * Validate URL for safe redirects and external links
 */
export function isSecureUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(parsedUrl.protocol);
  } catch {
    return false;
  }
}

/**
 * Secure external link attributes
 */
export function getSecureLinkAttributes(href: string) {
  const isExternal = href.startsWith('http') && !href.includes(window.location.hostname);
  
  return {
    href,
    ...(isExternal && {
      target: '_blank',
      rel: 'noopener noreferrer nofollow',
      'aria-label': `External link to ${href} (opens in new tab)`
    })
  };
}