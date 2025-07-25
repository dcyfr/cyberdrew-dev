import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, ExternalLink } from "lucide-react";

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
    <div className="min-h-screen bg-background dark">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-6 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Drew</h1>
            <p className="text-xl text-accent font-medium">Principal Cybersecurity Engineer</p>
            <p className="text-muted-foreground leading-relaxed">
              Skilled security professional with over 5 years of experience in developing security architecture, 
              zero-trust frameworks, and threat mitigation systems.
            </p>
          </div>
        </div>

        {/* Experience */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Experience</h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle className="text-card-foreground">{exp.title}</CardTitle>
                    <p className="text-accent font-medium">{exp.company}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {exp.period}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achIndex) => (
                      <li key={achIndex} className="text-muted-foreground">
                        • {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="space-y-2">
                    <CardTitle className="text-card-foreground">{edu.degree}</CardTitle>
                    <p className="text-accent font-medium">{edu.school}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4 mr-1" />
                      {edu.period}
                    </div>
                  </div>
                </CardHeader>
                {edu.details.length > 0 && (
                  <CardContent>
                    <ul className="space-y-2">
                      {edu.details.map((detail, detIndex) => (
                        <li key={detIndex} className="text-muted-foreground">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Certifications</h2>
          <div className="space-y-6">
            {certifications.map((org, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">{org.organization}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {org.certs.map((cert, certIndex) => (
                      <Badge key={certIndex} variant="secondary" className="bg-accent/10 text-accent">
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Core Competencies */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6">Core Competencies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {competencies.map((comp, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground text-lg">{comp.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {comp.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-muted-foreground text-sm">
                        • {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;