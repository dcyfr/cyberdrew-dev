import { Badge } from "@/components/ui/badge";
import { competencies } from "@/data/resume-data";

export const CompetenciesSection = () => {
  return (
    <section className="mb-16 bg-accent-red/5 rounded-lg p-6 border border-accent-red/20">
      <h2 className="text-xl font-medium text-foreground mb-8">Core Competencies</h2>
      <div className="space-y-8">
        {competencies.map((comp, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-medium text-foreground">{comp.category}</h3>
            <div className="flex flex-wrap gap-2">
              {comp.skills.map((skill, skillIndex) => (
                <Badge key={skillIndex} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};