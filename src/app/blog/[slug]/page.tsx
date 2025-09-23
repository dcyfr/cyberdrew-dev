import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts } from "@/data/posts";
import { MDX } from "@/components/mdx";
import { Badge } from "@/components/ui/badge";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `https://cyberdrew.dev/blog/${post.slug}`,
      siteName: "CyberDrew",
    },
  };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl py-14 md:py-20">
      <header>
        <div className="text-xs text-muted-foreground">
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</time>
        </div>
        <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight">{post.title}</h1>
        <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <Badge key={t} variant="secondary">{t}</Badge>
          ))}
        </div>
      </header>
      <div className="mt-8">
        <MDX source={post.body} />
      </div>
    </article>
  );
}
