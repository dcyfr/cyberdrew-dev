import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { resume } from "@/data/resume";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl py-12 md:py-16 space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">About</h1>
        <p className="text-muted-foreground leading-7 text-base md:text-lg">
          {resume.summary}
        </p>
        <p className="text-muted-foreground leading-7">
          If you&apos;d like to get in touch, feel free to reach out on{" "}
          <a
            href="https://www.linkedin.com/in/dcyfr"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-primary transition"
          >
            LinkedIn
          </a>
          {" "}or{" "}
          <a
            href="/contact"
            className="underline hover:text-primary transition"
          >send me a message
          </a>.
        </p>
      </div>

      {/* Experience Section */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-medium">Experience</h2>
        <div className="space-y-4">
          {resume.experience.slice(0, 4).map((exp, index) => (
            <Card key={index} className="p-6">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <h3 className="font-medium text-lg">{exp.title}</h3>
                  <Badge variant="secondary">{exp.duration}</Badge>
                </div>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 h-1 w-1 rounded-full bg-current flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-medium">Skills & Expertise</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {resume.skills.slice(0, 2).map((skillCategory, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-medium mb-3">{skillCategory.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillCategory.skills.slice(0, 8).map((skill, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
                {skillCategory.skills.length > 8 && (
                  <Badge variant="outline" className="text-xs">
                    +{skillCategory.skills.length - 8} more
                  </Badge>
                )}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Education & Certifications */}
      <section className="space-y-4">
        <h2 className="text-xl md:text-2xl font-medium">Education & Certifications</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="font-medium mb-3">Education</h3>
            <div className="space-y-3">
              {resume.education.map((edu, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-medium text-sm">{edu.degree}</p>
                  <p className="text-muted-foreground text-sm">{edu.institution}</p>
                  {edu.duration && (
                    <Badge variant="outline" className="text-xs">{edu.duration}</Badge>
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="font-medium mb-3">Certifications</h3>
            <div className="space-y-3">
              {resume.certifications.map((certCategory, index) => (
                <div key={index} className="space-y-1">
                  <p className="font-medium text-sm">{certCategory.provider}</p>
                  <div className="flex flex-wrap gap-1">
                    {certCategory.certifications.map((cert, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
