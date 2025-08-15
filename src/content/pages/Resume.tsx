import React, { useEffect } from 'react';
import { SEOHead } from "@/components/SEOHead";
import { PageTransition } from "@/components/PageTransition";
import { PageLayout } from "@/components/PageLayout";
import { FadeSlideIn } from "@/components/anim/FadeSlideIn";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  certifications, 
  competencies, 
  education, 
  experiences,
  validateResumeData 
} from "./resume-data";

const Resume: React.FC = React.memo(() => {
  // Validate resume data on component mount
  useEffect(() => {
    if (!validateResumeData()) {
      console.warn('Resume data validation failed. Some content may be incorrect.');
    }
  }, []);

  const ResumeSection: React.FC<{ 
    title: string, 
    count?: number 
  }> = ({ title, count }) => (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        {count !== undefined && (
          <Badge variant="secondary" className="ml-4">{count}</Badge>
        )}
      </div>
    </div>
  );

  const ExperienceCard: React.FC<{ 
    title: string, 
    company: string, 
    period: string, 
    achievements: string[] 
  }> = ({ title, company, period, achievements }) => (
    <Card className="hover:bg-accent/30 transition-colors">
      <CardHeader>
        <div className="flex flex-col">
          <Badge variant="outline" className="mb-4 mr-auto">{period}</Badge>
          <CardTitle className="flex items-center justify-between gap-2">
            <span>{title}</span>
          </CardTitle>
          <CardDescription>{company}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ul className="list-disc list-inside space-y-1 text-sm">
          {achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );

  const SkillCategory: React.FC<{ category: string, skills: string[] }> = ({ category, skills }) => (
    <Card>
      <CardHeader>
        <CardTitle>{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <Badge key={index} variant="outline">{skill}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      <SEOHead
        title="Drew - Cybersecurity Professional Resume"
        description="Comprehensive resume of Drew, a cybersecurity professional specializing in security architecture, incident response, and enterprise security solutions."
        keywords="cybersecurity, resume, security architect, zero trust, threat modeling, incident response, SIEM, SOAR, cloud security, professional experience"
      />
      <PageLayout>
        <PageTransition animated={false}>
          {/* Page Header */}
          <FadeSlideIn intensity={2} durationMs={360}>
            <div className="space-y-4 mb-8 sm:mb-12">
              <h1 className="theme-heading-1">Resume</h1>
              <p className="theme-text-muted text-lg">
                Cybersecurity professional with over 5 years of experience in designing and implementing secure architectures, specializing in zero trust, threat modeling, and enterprise security solutions. Proven track record in reducing security incidents and enhancing organizational resilience.
              </p>
            </div>
          </FadeSlideIn>
          {/* Page Content */}
          <div className="space-y-4 mb-8 sm:mb-12">
            <FadeSlideIn delayMs={80}>
              <ResumeSection title="Education" />
            </FadeSlideIn>
            <div className="space-y-4 mt-4">
              {education.map((edu, index) => (
                <FadeSlideIn key={`${edu.school}-${edu.degree}-${edu.period}`} delayMs={140 + index * 90} durationMs={300}>
                  <ExperienceCard
                    title={edu.degree}
                    company={edu.school}
                    period={edu.period}
                    achievements={edu.details || []}
                  />
                </FadeSlideIn>
              ))}
            </div>

            <div>
              <FadeSlideIn delayMs={80}>
                <ResumeSection title="Experience" />
              </FadeSlideIn>
              <div className="space-y-4 mt-4">
                {experiences.map((exp, index) => (
                  <FadeSlideIn key={`${exp.company}-${exp.title}-${exp.period}`} delayMs={140 + index * 90} durationMs={300}>
                    <ExperienceCard
                      title={exp.title}
                      company={exp.company}
                      period={exp.period}
                      achievements={exp.achievements}
                    />
                  </FadeSlideIn>
                ))}
              </div>
            </div>

            <div>
              <FadeSlideIn delayMs={80}>
                <ResumeSection title="Certifications" />
              </FadeSlideIn>
              <div className="space-y-4 mt-4">
                {certifications.map((org, index) => (
                  <FadeSlideIn key={`${org.organization}-${index}`} delayMs={140 + index * 90} durationMs={280}>
                    <Card>
                      <CardHeader>
                        <CardTitle>{org.organization}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap gap-2">
                          {org.certs.map((cert) => (
                            <Badge key={`${org.organization}-${cert}`} variant="secondary">{cert}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </FadeSlideIn>
                ))}
              </div>
            </div>

            <div>
              <FadeSlideIn delayMs={80}>
                <ResumeSection title="Core Competencies" />
              </FadeSlideIn>
              <div className="space-y-4 mt-4">
                {competencies.map((comp, index) => (
                  <FadeSlideIn key={`${comp.category}-${index}`} delayMs={140 + index * 90} durationMs={280}>
                    <SkillCategory
                      category={comp.category}
                      skills={comp.skills}
                    />
                  </FadeSlideIn>
                ))}
              </div>
            </div>
          </div>
        </PageTransition>
      </PageLayout>
    </>
  );
});

Resume.displayName = 'Resume';
export default Resume;
