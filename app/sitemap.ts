import type { MetadataRoute } from "next";
import { legal } from "@/lib/site";

/**
 * lastmod is only worth sending if it is true: a crawler that catches it
 * moving with no change behind it stops trusting it.
 *
 * The home page is prerendered from lib/site.ts, so it changes when the site
 * is deployed and its date is the build stamp the footer prints. The privacy
 * page changes only when the notice is edited, so it reports the date printed
 * on the notice rather than the deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const builtAt = process.env.NEXT_PUBLIC_BUILT_AT;

  return [
    {
      url: "https://www.cyberdrew.dev",
      ...(builtAt ? { lastModified: builtAt } : {}),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.cyberdrew.dev/privacy",
      lastModified: legal.privacyUpdated,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
