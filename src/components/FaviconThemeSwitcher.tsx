import { useEffect } from "react";
import { useTheme } from "next-themes";

// Simple helper to create or update a <link> tag
function upsertLink(rel: string, attrs: Record<string, string>) {
  const selectorParts = [`link[rel="${rel}"]`];
  if (attrs.sizes) selectorParts.push(`[sizes="${attrs.sizes}"]`);
  if (attrs.type) selectorParts.push(`[type="${attrs.type}"]`);
  const selector = selectorParts.join("");
  let link = document.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (attrs.sizes) link.sizes = attrs.sizes as any;
    if (attrs.type) link.type = attrs.type;
    document.head.appendChild(link);
  }
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "sizes" || k === "type") return; // already applied as properties
    link!.setAttribute(k, v);
  });
}

export function FaviconThemeSwitcher() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Determine folder based on current theme; default to light to be safe
    const theme = (resolvedTheme === "dark" ? "dark" : "light");
  const base = `/favicons/${theme}`;
  // Simple cache-busting param to force favicon refresh when assets change
  const v = '20250814';

    // PNG favicons
  upsertLink("icon", { type: "image/png", sizes: "32x32", href: `${base}/favicon-32x32.png?v=${v}` });
  upsertLink("icon", { type: "image/png", sizes: "16x16", href: `${base}/favicon-16x16.png?v=${v}` });
    // Apple touch icon
  upsertLink("apple-touch-icon", { sizes: "180x180", href: `${base}/apple-touch-icon.png?v=${v}` });

    // Android/Chrome manifest (optional but nice)
    let manifest = document.querySelector<HTMLLinkElement>('link[rel="manifest"]');
    if (!manifest) {
      manifest = document.createElement('link');
      manifest.rel = 'manifest';
      document.head.appendChild(manifest);
    }
  manifest.setAttribute('href', `${base}/site.webmanifest?v=${v}`);

    // Also keep a generic ICO fallback (placed at /public/favicon.ico)
    let ico = document.querySelector<HTMLLinkElement>('link[rel="icon"][sizes="any"]');
    if (!ico) {
      ico = document.createElement('link');
      ico.rel = 'icon';
      ico.setAttribute('sizes', 'any');
      ico.href = `/favicon.ico?v=${v}`;
      document.head.appendChild(ico);
    }
    // If it exists, ensure it's updated to current version to bust caches
    else {
      ico.href = `/favicon.ico?v=${v}`;
    }

    // Update theme-color to match active theme for better UI integration
    const themeColor = theme === 'dark' ? '#0b0b0c' : '#ffffff';
    let meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', themeColor);
  }, [resolvedTheme]);

  return null;
}

export default FaviconThemeSwitcher;
