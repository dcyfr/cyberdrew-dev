import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl py-14 md:py-20">
      <section className="space-y-4">
        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
          Hey, I&apos;m Drew.
        </h1>
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
          I build minimal, fast, and delightful developer experiences with
          TypeScript, React, and Node.js.
        </p>
        <div className="flex gap-3 pt-2">
          <Button asChild>
            <Link href="/projects">View Projects</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </section>

      <section className="mt-12 md:mt-16 space-y-4">
        <h2 className="text-xl md:text-2xl font-medium">Featured work</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.slice(0, 4).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
