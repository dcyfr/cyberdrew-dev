import { ResumeHeader } from "@/components/resume-header";
import { ExperienceSection } from "@/components/experience-section";
import { EducationSection } from "@/components/education-section";
import { CertificationsSection } from "@/components/certifications-section";
import { CompetenciesSection } from "@/components/competencies-section";

const Resume = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-16 max-w-2xl">
        <ResumeHeader />
        <ExperienceSection />
        <EducationSection />
        <CertificationsSection />
        <CompetenciesSection />
      </div>
    </div>
  );
};

export default Resume;