import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://www.cyberdrew.dev",
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://www.cyberdrew.dev/privacy",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
