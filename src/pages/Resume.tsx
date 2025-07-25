import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { SEOHead } from "@/components/SEOHead";
import { BlogBreadcrumb } from "@/components/BlogBreadcrumb";
import { PageTransition } from "@/components/PageTransition";

const Resume = () => {
  const navigate = useNavigate();

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

  return (
    <>
      <SEOHead
        title="Resume - Drew's Lab"
        description="Cybersecurity expert with extensive experience in security architecture, threat analysis, and secure development practices."
        keywords="cybersecurity resume, security architect, threat analyst, security consultant"
      />
      <PageTransition>
        <main id="main-content" className="min-h-screen">
          <div className="container mx-auto px-6 py-16 max-w-2xl">
            {/* Header */}
            <div className="mb-16">
              <div className="flex justify-between items-start mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => navigate("/")}
                  className="-ml-3 hover:scale-105 transition-transform duration-200"
                  aria-label="Go back to home page"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <ThemeToggle />
              </div>
            
            <BlogBreadcrumb currentPage="Resume" />
            
            <div className="space-y-4">
              <h1 className="text-3xl font-semibold text-foreground">Drew</h1>
              <p className="text-lg text-foreground">Principal Cybersecurity Engineer</p>
              <p className="text-muted-foreground leading-relaxed">
                Skilled security professional with over 5 years of experience in developing security architecture, 
                zero-trust frameworks, and threat mitigation systems.
              </p>
            </div>
          </div>

          {/* Experience */}
          <section className="mb-16">
            <h2 className="text-xl font-medium text-foreground mb-8">Experience</h2>
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div key={index} className="space-y-4 hover-lift">
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

          {/* Education */}
          <section className="mb-16">
            <h2 className="text-xl font-medium text-foreground mb-8">Education</h2>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <div key={index} className="space-y-4 hover-lift">
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

          {/* Certifications */}
          <section className="mb-16">
            <h2 className="text-xl font-medium text-foreground mb-8">Certifications</h2>
            <div className="space-y-6">
              {certifications.map((org, index) => (
                <div key={index} className="space-y-3 hover-lift">
                  <h3 className="text-lg font-medium text-foreground">{org.organization}</h3>
                  <div className="flex flex-wrap gap-2">
                    {org.certs.map((cert, certIndex) => (
                      <Badge 
                        key={certIndex} 
                        variant="outline" 
                        className="text-xs hover-scale"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Core Competencies */}
          <section className="mb-16">
            <h2 className="text-xl font-medium text-foreground mb-8">Core Competencies</h2>
            <div className="space-y-8">
              {competencies.map((comp, index) => (
                <div key={index} className="space-y-3 hover-lift">
                  <h3 className="text-lg font-medium text-foreground">{comp.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {comp.skills.map((skill, skillIndex) => (
                      <Badge 
                        key={skillIndex} 
                        variant="outline" 
                        className="text-xs hover-scale hover-glow"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          </div>
        </main>
      </PageTransition>
    </>
  );
};

export default Resume;