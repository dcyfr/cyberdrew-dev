import { Calendar } from "lucide-react";
import { experiences } from "@/data/resume-data";

export const ExperienceSection = () => {
  return (
    <section className="mb-16 bg-accent-blue/5 rounded-lg p-6 border border-accent-blue/20">
      <h2 className="text-xl font-medium text-foreground mb-8">Experience</h2>
      <div className="space-y-12">
        {experiences.map((exp, index) => (
          <div key={index} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">{exp.title}</h3>
              <p className="text-foreground">{exp.company}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {exp.period}
              </div>
            </div>
            <ul className="space-y-2 ml-6">
              {exp.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="text-muted-foreground leading-relaxed">
                  • {achievement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};