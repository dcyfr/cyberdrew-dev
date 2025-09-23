import type { Project } from "@/components/project-card";

export const projects: Project[] = [
  {
    title: "Minimal Portfolio",
    description: "This site. Built with Next.js, TypeScript, Tailwind, and shadcn/ui.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    href: "https://cyberdrew.dev",
  },
  {
    title: "Dev Tools",
    description: "A collection of CLI and web tools for developers.",
    tags: ["Node.js", "CLI", "DX"],
  },
  {
    title: "Open Source Contributions",
    description: "Various PRs to popular OSS projects and libraries.",
    tags: ["OSS", "GitHub"],
  },
];
