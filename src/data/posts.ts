export type Post = {
  title: string;
  slug: string; // unique URL segment
  date: string; // ISO string
  excerpt: string;
  tags: string[];
  body: string; // MDX content
};

export const posts: Post[] = [
  {
    title: "Shipping a tiny portfolio with Next.js",
    slug: "next-tiny-portfolio",
    date: "2025-09-10",
    excerpt:
      "How I built this minimal developer portfolio with the App Router, TypeScript, Tailwind v4, and shadcn/ui.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    body: `I wanted a small, focused site that is fast to load, easy to iterate on, and simple to host.\n\n## Why App Router?\n\nServer-first by default, with client components only where needed.\n\n## Stack\n\n- Next.js 15\n- TypeScript\n- Tailwind v4\n- shadcn/ui`,
  }
];
