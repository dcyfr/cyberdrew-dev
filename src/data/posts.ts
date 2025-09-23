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
    title: "Shipping a tiny portfolio with Next.js 15",
    slug: "next15-tiny-portfolio",
    date: "2025-09-10",
    excerpt:
      "How I built this minimal developer portfolio with the App Router, TypeScript, Tailwind v4, and shadcn/ui.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui"],
    body: `I wanted a small, focused site that is fast to load, easy to iterate on, and simple to host.\n\n## Why App Router?\n\nServer-first by default, with client components only where needed.\n\n## Stack\n\n- Next.js 15\n- TypeScript\n- Tailwind v4\n- shadcn/ui`,
  },
  {
    title: "Thoughts on delightful DX",
    slug: "delightful-dx",
    date: "2025-08-22",
    excerpt: "A few principles I use to ship products developers enjoy using.",
    tags: ["DX", "Product", "Frontend"],
    body: `Delight often comes from small details: clear errors, fast feedback loops, and predictable APIs.\n\n> Invest in docs like you invest in tests.\n\n### Principles\n\n- Fast feedback loops\n- Predictable APIs\n- Clear, actionable errors`,
  },
  {
    title: "TypeScript tips I reuse",
    slug: "typescript-tips",
    date: "2025-07-05",
    excerpt: "Narrowing, utility types, and patterns that save me time across projects.",
    tags: ["TypeScript"],
    body: `Use discriminated unions to model state. It gives you exhaustive checks for free.\n\n\`satisfies\` is your friend when keeping types close to data.\n\n\n\n`,
  },
];
