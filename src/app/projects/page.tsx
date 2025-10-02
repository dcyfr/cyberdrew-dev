import type { Metadata } from "next";
import { visibleProjects } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { GitHubHeatmap } from "@/components/github-heatmap";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of my active, in-progress, and archived projects in cybersecurity and software development.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl py-12 md:py-16">
      {/* GitHub activity heatmap */}
      <section className="mb-8">
        <GitHubHeatmap username="dcyfr" />
      </section>

      {/* Projects Section */}
      <section className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Projects</h1>
        <div className="grid gap-4 sm:grid-cols-2">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
