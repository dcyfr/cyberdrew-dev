import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";
import { readdirSync, statSync } from "fs";
import { join } from "path";

// Define static page configurations
const pageConfig = {
  "/": { changeFrequency: "weekly" as const, priority: 1.0 },
  "/about": { changeFrequency: "yearly" as const, priority: 0.5 },
  "/blog": { changeFrequency: "weekly" as const, priority: 0.8 },
  "/projects": { changeFrequency: "monthly" as const, priority: 0.7 },
} as const;

function getStaticPages(): string[] {
  const appDir = join(process.cwd(), "src/app");
  const pages: string[] = [];

  function scanDirectory(dir: string, route: string = ""): void {
    try {
      const items = readdirSync(dir);
      
      for (const item of items) {
        const fullPath = join(dir, item);
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Skip certain directories
          if (item.startsWith(".") || item === "api" || item.startsWith("[")) {
            continue;
          }
          
          // Check if this directory has a page.tsx
          const pagePath = join(fullPath, "page.tsx");
          try {
            statSync(pagePath);
            // This directory has a page
            const routePath = route + "/" + item;
            pages.push(routePath);
          } catch {
            // No page.tsx in this directory
          }
          
          // Recursively scan subdirectories
          scanDirectory(fullPath, route + "/" + item);
        }
      }
    } catch {
      // Directory doesn't exist or can't be read
    }
  }

  // Add home page
  pages.push("/");
  
  // Scan for other pages
  scanDirectory(appDir);
  
  return pages;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://cyberdrew.dev";
  const now = new Date();
  
  // Get all static pages dynamically
  const staticPages = getStaticPages();
  
  // Generate sitemap entries for static pages
  const pageEntries = staticPages.map((page) => {
    const config = pageConfig[page as keyof typeof pageConfig] || {
      changeFrequency: "monthly" as const,
      priority: 0.5,
    };
    
    return {
      url: `${base}${page === "/" ? "" : page}`,
      lastModified: now,
      ...config,
    };
  });
  
  // Generate sitemap entries for blog posts
  const blogPostEntries = posts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  
  return [...pageEntries, ...blogPostEntries];
}
