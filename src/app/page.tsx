import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { posts } from "@/data/posts";
import { resume } from "@/data/resume";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl py-14 md:py-20">
      {/* Introduction Section */}
      <section className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight italic font-serif">
          Hi, I&apos;m Drew <span className="ml-1 font-sans not-italic">&#10022;</span>
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          {resume.shortSummary}
        </p>
        <div className="flex gap-3 pt-2">
          <Button asChild>
            <Link href="/about">Learn more</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/blog">Read my blog</Link>
          </Button>
          <Button variant="outline" className="hidden sm:inline-block" asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      </section>

      {/* Blog Section */}
      <section className="mt-12 md:mt-16 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl md:text-2xl font-medium">Latest articles</h2>
          <Button variant="ghost" asChild>
            <Link href="/blog">View all</Link>
          </Button>
        </div>
        <div className="space-y-4">
          {[...posts]
            .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
            .slice(0, 3)
            .map((p) => (
              <article key={p.slug} className="group rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <time dateTime={p.publishedAt}>{new Date(p.publishedAt).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}</time>
                  <span>•</span>
                  <span className="hidden md:inline-block">{p.tags.join(" · ")}</span>
                  <span className="hidden md:inline-block">•</span>
                  <span>{p.readingTime.text}</span>
                </div>
                <h3 className="mt-1 text-lg font-medium">
                  <Link href={`/blog/${p.slug}`}>
                    {p.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
              </article>
            ))}
        </div>
      </section>

      {/* Projects Section */}
      <section className="mt-12 md:mt-16 space-y-4">
        <h2 className="text-xl md:text-2xl font-medium">Projects</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {featuredProjects.slice(0, 4).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
