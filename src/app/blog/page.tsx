import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles and notes on web development, DX, and TypeScript.",
};

export default function BlogPage({ searchParams }: { searchParams?: { tag?: string } }) {
  const tag = searchParams?.tag ?? "";
  const all = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
  const tags = all
    .flatMap((p) => p.tags)
    .reduce<Record<string, number>>((acc, t) => {
      acc[t] = (acc[t] ?? 0) + 1;
      return acc;
    }, {});
  const tagList = Object.entries(tags)
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
  const filtered = tag ? all.filter((p) => p.tags.includes(tag)) : all;
  return (
    <div className="mx-auto max-w-5xl py-14 md:py-20">
      <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Blog</h1>
      <p className="text-muted-foreground mt-2 max-w-2xl">
        Articles and notes on web development, DX, and TypeScript.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        <Badge asChild variant={tag ? "outline" : "secondary"}>
          <Link href="/blog">All</Link>
        </Badge>
        {tagList.map((t) => (
          <Badge key={t} asChild variant={tag === t ? "secondary" : "outline"}>
            <Link href={`/blog?tag=${encodeURIComponent(t)}`}>{t}</Link>
          </Badge>
        ))}
      </div>

      <div className="mt-8 space-y-6">
        {filtered.map((p) => (
          <article key={p.slug} className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <time dateTime={p.date}>{new Date(p.date).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</time>
              <span>•</span>
              <span>{p.tags.join(" · ")}</span>
            </div>
            <h2 className="mt-1 text-lg md:text-xl font-medium">
              <Link href={`/blog/${p.slug}`} className="hover:underline underline-offset-4">
                {p.title}
              </Link>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">{p.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
