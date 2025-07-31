import React, { useMemo } from 'react';
import { SEOHead } from "@/components/SEOHead";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { PageTransition } from "@/components/PageTransition";
import { PageLayout } from "@/components/PageLayout";
import { Section, SkillCategory, CertificationGroup, ExperienceItem } from "@/components/ContentBlocks";
import { 
  certifications, 
  competencies, 
  education, 
  experiences,
  validateResumeData 
} from "./resume-data";

const Resume: React.FC = React.memo(() => {
  // Validate resume data on component mount
  useMemo(() => {
    if (!validateResumeData()) {
      console.warn('Resume data validation failed. Some content may be incorrect.');
    }
  }, []);

  return (
    <>
      <SEOHead
        title="Drew - Cybersecurity Professional Resume"
        description="Comprehensive resume of Drew, a cybersecurity professional specializing in security architecture, incident response, and enterprise security solutions."
        keywords="cybersecurity, resume, security architect, zero trust, threat modeling, incident response, SIEM, SOAR, cloud security, professional experience"
      />
      <PageLayout>
        <PageTransition>
          <div className="space-y-4 mb-8 sm:mb-12" aria-labelledby="resume-title">
            <BlogBreadcrumb currentPage="Resume" />
            <h1 
              id="resume-title" 
              className="vercel-heading-1"
              aria-label="Drew - Cybersecurity Professional"
            >
              Drew
            </h1>
            <p 
              className="vercel-text font-medium" 
              aria-label="Professional Title"
            >
              Security Architect
            </p>
            <p 
              className="vercel-text-muted max-w-2xl" 
              aria-describedby="resume-summary"
            >
              Cybersecurity professional with over 5 years of experience in designing and implementing secure architectures, specializing in zero trust, threat modeling, and enterprise security solutions. Proven track record in reducing security incidents and enhancing organizational resilience.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            <Section 
              title="Education" 
              aria-label="Educational Background"
            >
              <div className="space-y-4 sm:space-y-8">
                {education.map((edu, index) => (
                  <ExperienceItem
                    key={`education-${index}`}
                    title={edu.degree}
                    company={edu.school}
                    period={edu.period}
                    achievements={edu.details || []}
                    aria-label={`Education Entry ${index + 1}`}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title="Experience" 
              aria-label="Professional Work History"
            >
              <div className="space-y-4 sm:space-y-8">
                {experiences.map((exp, index) => (
                  <ExperienceItem
                    key={`experience-${index}`}
                    title={exp.title}
                    company={exp.company}
                    period={exp.period}
                    achievements={exp.achievements}
                    aria-label={`Work Experience Entry ${index + 1}`}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title="Certifications" 
              aria-label="Professional Certifications"
            >
              <div className="space-y-4 sm:space-y-8">
                {certifications.map((org, index) => (
                  <CertificationGroup
                    key={`certification-${index}`}
                    organization={org.organization}
                    certs={org.certs}
                    aria-label={`${org.organization} Certifications`}
                  />
                ))}
              </div>
            </Section>

            <Section 
              title="Core Competencies" 
              aria-label="Professional Skills and Competencies"
            >
              <div className="space-y-4 sm:space-y-8">
                {competencies.map((comp, index) => (
                  <SkillCategory
                    key={`competency-${index}`}
                    category={comp.category}
                    skills={comp.skills}
                    aria-label={`${comp.category} Skills`}
                  />
                ))}
              </div>
            </Section>
          </div>
        </PageTransition>
      </PageLayout>
    </>
  );
});

Resume.displayName = 'Resume';
export default Resume;
