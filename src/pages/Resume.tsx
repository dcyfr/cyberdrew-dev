import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { PageTransition } from "@/components/PageTransition";
import { PageLayout } from "@/components/PageLayout";
import { Section, SkillCategory, CertificationGroup, ExperienceItem } from "@/components/ContentBlocks";

const Resume = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      organization: "SANS Institute",
      certs: [
        "GIAC Security Essentials (GSEC)",
        "GIAC Certified Incident Handler (GCIH)",
        "GIAC Security Threat Responder (GSTRT)",
        "GIAC Cloud Security Essentials (GDSA)"
      ]
    },
    {
      organization: "CompTIA",
      certs: [
        "CompTIA IT Fundamentals (ITF+)",
        "CompTIA A+",
        "CompTIA Network+",
        "CompTIA Security+",
        "CompTIA CySA+",
        "CompTIA Pentest+",
        "CompTIA SecurityX"
      ]
    },
    {
      organization: "Mile2",
      certs: [
        "Certified Information Security Officer (CISSO)",
        "Certified Penetration Testing Engineer (CPTE)",
        "Certified Digital Forensics Examiner (CDFE)",
        "Certified Disaster Recovery Expert (CDRE)"
      ]
    }
  ];

  const competencies = [
    {
      category: "Security Architecture",
      skills: [
        "Zero Trust Design",
        "Threat Modeling",
        "Enterprise Security Solutions",
        "Cloud Security (Azure, AWS, GCP)"
      ]
    },
    {
      category: "Incident Response",
      skills: [
        "Threat Hunting",
        "SIEM/SOAR Implementation",
        "Vulnerability Management"
      ]
    },
    {
      category: "Network Security",
      skills: [
        "Firewall Configuration",
        "Intrusion Detection Systems (IDS)",
        "Network Segmentation"
      ]
    },
    {
      category: "Compliance & Governance",
      skills: [
        "NIST Frameworks",
        "ISO 27001/27002",
        "GDPR, HIPAA Compliance"
      ]
    }
  ];

  const education = [
    {
      degree: "M.S. Cybersecurity Engineering",
      school: "SANS Technology Institute",
      period: "2024 - Present"
    },
    {
      degree: "B.A.S. Cybersecurity",
      school: "Pensacola State College",
      period: "2016 - 2020",
      details: [
        "Mathematics & Computer Science Academic Scholar",
        "Cyber Defense Club Training Officer & CTF Lead",
        "3x National Cyber League Gold Bracket Finalist"
      ]
    }
  ];

  const experiences = [
    {
      title: "Principal Cybersecurity Engineer",
      company: "Monks (Formerly Media.Monks)",
      period: "2023 - Present",
      achievements: [
        "Architected cloud security strategy for Azure, AWS, and GCP",
        "Reduced security incidents by over 85% through advanced SIEM/SOAR redesign and implementation",
        "Led threat modeling sessions to identify and mitigate security risks",
        "Collaborated with cross-functional teams to integrate security into development processes"
      ]
    },
    {
      title: "Security Engineering & Operations Lead",
      company: "Monks (Formerly Media.Monks)",
      period: "2022 - 2023",
      achievements: [
        "Led security operations center (SOC) activities, ensuring 24/7 monitoring and response",
        "Developed and maintained incident response plans, improving response time by over 70%",
        "Implemented vulnerability management program, reducing critical vulnerabilities by over 65%",
        "Conducted regular security assessments and audits, ensuring compliance with industry standards",
      ]
    },
    {
      title: "Information Security Engineer",
      company: "Media.Monks (Formerly MightyHive)",
      period: "2021 - 2022",
      achievements: [
        "Developed and maintained security policies and procedures",
        "Implemented vulnerability management program, reducing critical vulnerabilities by over 70%",
        "Led incident response for security breaches, improving response time by over 85%",
        "Developed threat detection capabilities, reducing false positives by over 90%"
      ]
    },
    {
      title: "Security Operations Analyst II",
      company: "CBI Cybersecurity Solutions",
      period: "2020 - 2021",
      achievements: [
        "Conducted validation and triage for escalated security detections",
        "Developed SOC runbooks and standard operating procedures",
        "Contributed to SIEM implementation and tuning activities",
        "Participated in change management processes"
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Resume - Cyber Drew's Lab"
        description="Drew's professional resume, showcasing expertise in cybersecurity architecture, incident response, and security operations."
        keywords="cybersecurity, resume, security architect, zero trust, threat modeling, incident response, SIEM, SOAR, cloud security"
      />
      <PageLayout>
        <PageTransition>
          {/* Page Title */}
          <div className="space-y-4 mb-8 sm:mb-12">
            <BlogBreadcrumb currentPage="Resume" />
            <h1 className="vercel-heading-1 mt-4">Drew</h1>
            <p className="vercel-text font-medium">Security Architect</p>
            <p className="vercel-text-muted max-w-2xl">
              Cybersecurity professional with over 5 years of experience in designing and implementing secure architectures, specializing in zero trust, threat modeling, and enterprise security solutions. Proven track record in reducing security incidents and enhancing organizational resilience.
            </p>
          </div>
          
          {/* Page Content */}
          <div className="space-y-8 sm:space-y-12">
            {/* Education Section */}
            <Section title="Education">
                <div className="space-y-4 sm:space-y-8">
                  {education.map((edu, index) => (
                    <ExperienceItem
                      key={index}
                      title={edu.degree}
                      company={edu.school}
                      period={edu.period}
                      achievements={edu.details}
                    />
                  ))}
                </div>
              </Section>

              {/* Experience Section */}
              <Section title="Experience">
                <div className="space-y-4 sm:space-y-8">
                  {experiences.map((exp, index) => (
                    <ExperienceItem
                      key={index}
                      title={exp.title}
                      company={exp.company}
                      period={exp.period}
                      achievements={exp.achievements}
                    />
                  ))}
                </div>
              </Section>

              {/* Certifications */}
              <Section title="Certifications">
                <div className="space-y-4 sm:space-y-6">
                  {certifications.map((org, index) => (
                    <CertificationGroup
                      key={index}
                      organization={org.organization}
                      certs={org.certs}
                    />
                  ))}
                </div>
              </Section>

              {/* Core Competencies */}
              <Section title="Core Competencies">
                <div className="space-y-4 sm:space-y-6">
                  {competencies.map((comp, index) => (
                    <SkillCategory
                      key={index}
                      category={comp.category}
                      skills={comp.skills}
                    />
                  ))}
                </div>
              </Section>
            </div>
        </PageTransition>
      </PageLayout>
    </>
  );
};

export default Resume;
