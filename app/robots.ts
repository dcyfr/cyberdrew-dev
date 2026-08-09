import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    // /lab/* is the hero-variant comparison surface — a working scratch route,
    // not a page. It also carries robots: noindex in its own metadata; this is
    // the belt to that pair of braces, and both go when the route does.
    rules: { userAgent: "*", allow: "/", disallow: "/lab/" },
    sitemap: "https://www.cyberdrew.dev/sitemap.xml",
    host: "https://www.cyberdrew.dev",
  };
}
