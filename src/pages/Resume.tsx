import { useNavigate } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { PageTransition } from "@/components/PageTransition";
import { AppHeader } from "@/components/AppHeader";
import { Section, SkillCategory, CertificationGroup, ExperienceItem } from "@/components/ContentBlocks";

const Resume = () => {
  const navigate = useNavigate();

  const certifications = [
    {
      organization: "GIAC",
      certs: ["GSEC", "GCIH", "GSTRT", "GDSA"]
    },
    {
      organization: "CompTIA",
      certs: ["Network+", "Security+", "CySA+", "Pentest+", "SecurityX"]
    },
    {
      organization: "Mile2",
      certs: ["C)ISSO", "C)PTE", "C)DFE", "C)DRE"]
    },
    {
      organization: "ISC2",
      certs: ["ISC2 Candidate"]
    }
  ];

  const competencies = [
    {
      category: "Architecture & Design",
      skills: ["Security Program Design", "Zero Trust Architecture", "Threat Modeling", "Risk Analysis"]
    },
    {
      category: "Technical Skills",
      skills: ["Enterprise Solutions", "Penetration Testing", "Incident Response", "Cloud Security"]
    },
    {
      category: "Compliance & Governance",
      skills: ["CIS Controls", "ISO 27001", "NIST CSF", "SOC 2"]
    }
  ];

  const education = [
    {
      degree: "M.S. Cybersecurity Engineering",
      school: "SANS Technology Institute",
      period: "2024 - Present",
      details: []
    },
    {
      degree: "B.A.S. Cybersecurity",
      school: "Pensacola State College",
      period: "2016 - 2020",
      details: [
        "Computer Science Academic Scholar",
        "3x National Cyber League Gold Bracket Finalist",
        "Cyber Defense Club Training Officer & CTF Lead"
      ]
    }
  ];

  const experiences = [
    {
      title: "Principal Cybersecurity Engineer",
      company: "Monks (Formerly Media.Monks)",
      period: "2022 - Present",
      achievements: [
        "Designed and implemented zero-trust architecture for a 10,000+ employee organization",
        "Reduced security incidents by 75% through advanced SIEM/SOAR implementation",
        "Architected cloud security strategy for Azure, AWS, and GCP"
      ]
    },
    {
      title: "Information Security Engineer",
      company: "Media.Monks (Formerly MightyHive)",
      period: "2021 - 2022",
      achievements: [
        "Led incident response team for critical security breaches and threat hunting",
        "Developed threat detection capabilities, reducing false positives by 60%",
        "Managed vulnerability assessment program for critical infrastructure"
      ]
    },
    {
      title: "Security Operations Analyst II",
      company: "CBI Cybersecurity Solutions",
      period: "2020 - 2021",
      achievements: [
        "Monitored security events and performed initial incident triage",
        "Developed SOC runbooks and standard operating procedures",
        "Assisted in change management and SIEM tuning"
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title="Resume - Drew's Lab"
        description="Drew's professional resume showcasing skills, experience, and education."
        keywords="cybersecurity, resume, skills, experience, education"
      />
      <PageTransition>
        <AppHeader />
        <div className="min-h-screen pt-20">
          <div className="container mx-auto px-6 py-16 max-w-6xl">
            {/* Page Breadcrumbs */}
            <BlogBreadcrumb currentPage="Resume" />
            
            {/* Page Title */}
            <div className="space-y-4 mb-12">
              <h1 className="vercel-heading-2 mt-0">Drew</h1>
              <p className="vercel-text font-medium">Cybersecurity Architect</p>
              <p className="vercel-text-muted max-w-2xl">
                Cybersecurity expert with extensive experience in security architecture, threat analysis, and secure development practices. Proven track record in designing and implementing robust security solutions for large-scale enterprises.
              </p>
            </div>
            
            {/* Page Content */}
            <div className="space-y-12">
              {/* Education Section */}
              <Section title="Education">
                <div className="space-y-8">
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
                <div className="space-y-8">
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
                <div className="space-y-6">
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
                <div className="space-y-6">
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
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Resume;