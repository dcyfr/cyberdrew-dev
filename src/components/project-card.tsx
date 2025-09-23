import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export type Project = {
  title: string;
  description: string;
  href?: string;
  tags?: string[];
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-base md:text-lg">{project.title}</CardTitle>
        {project.tags && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {project.tags.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm md:text-[0.95rem]">
          {project.description}
        </CardDescription>
      </CardContent>
      {project.href && (
        <CardFooter>
          <a className="text-sm hover:underline underline-offset-4" href={project.href} target="_blank" rel="noreferrer">
            Visit project →
          </a>
        </CardFooter>
      )}
    </Card>
  );
}
