import { Calendar } from "lucide-react";
import { education } from "@/data/resume-data";

export const EducationSection = () => {
  return (
    <section className="mb-16 bg-accent-green/5 rounded-lg p-6 border border-accent-green/20">
      <h2 className="text-xl font-medium text-foreground mb-8">Education</h2>
      <div className="space-y-8">
        {education.map((edu, index) => (
          <div key={index} className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-foreground">{edu.degree}</h3>
              <p className="text-foreground">{edu.school}</p>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {edu.period}
              </div>
            </div>
            {edu.details.length > 0 && (
              <ul className="space-y-2 ml-6">
                {edu.details.map((detail, detIndex) => (
                  <li key={detIndex} className="text-muted-foreground leading-relaxed">
                    • {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};