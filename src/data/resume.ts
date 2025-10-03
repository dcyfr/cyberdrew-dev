export type Experience = {
  title: string;
  company: string;
  duration: string;
  responsibilities: string[];
};

export type Education = {
  degree: string;
  institution: string;
  duration?: string;
  highlights?: string[];
};

export type CertificationCategory = {
  provider: string;
  certifications: string[];
};

export type SkillCategory = {
  category: string;
  skills: string[];
};

export type Resume = {
  summary: string;
  shortSummary: string;
  experience: Experience[];
  education: Education[];
  certifications: CertificationCategory[];
  skills: SkillCategory[];
};

export const resume: Resume = {
  summary: "I am a security architect with hands-on experience designing and implementing enterprise security solutions to scale. I successfully led teams towards reducing risk, improving incident response time, and meet standards like ISO 27001 and SOC 2. I am adept in creating comprehensive security strategies and promoting continuous improvement.",
  shortSummary: "I'm a security architect and tinkerer. I build secure systems, lead teams, and share knowledge about cybersecurity and technology.",
  experience: [
    {
      title: "Global Principal Security Engineer",
      company: "Monks",
      duration: "Jul 2023 → Present",
      responsibilities: [
        "Led technical audits to certify multiple sites for ISO 27001, SOC2, TISAX, and TPN",
        "Implemented technical controls that reduced global vulnerabilities by 23%",
        "Established enterprise-wide security operations and incident response programs"
      ]
    },
    {
      title: "Security Engineering Lead",
      company: "Monks (Media.Monks)",
      duration: "Jul 2022 → Jul 2023",
      responsibilities: [
        "Created policies, procedures, and integration strategies for mergers and acquisitions",
        "Led threat hunting, security testing, and vulnerability management initiatives",
        "Established global security operations and incident response programs"
      ]
    },
    {
      title: "Information Security Engineer",
      company: "Monks (MightyHive, Inc.)",
      duration: "Jul 2021 → Jul 2022",
      responsibilities: [
        "Conducted audits and delivered findings, prioritizing future security initiatives",
        "Developed foundational global security operations and engineering programs",
        "Acted as a Subject Matter Expert reporting directly to the CISO"
      ]
    },
    {
      title: "Co-founder & Vice President",
      company: "Information Security Network, Inc.",
      duration: "Sep 2019 → Sep 2021",
      responsibilities: [
        "Promoted security awareness and education through collaborations with DC850",
        "Led virtual seminars, training, and events such as BSides and Hack Pensacola",
        "Aligned IT and security objectives with nonprofit strategies"
      ]
    },
    {
      title: "Security Operations Analyst II",
      company: "Creative Breakthroughs, Inc.",
      duration: "Dec 2020 → Jul 2021",
      responsibilities: [
        "Assisted engineering teams with issue resolution and procedural enhancements",
        "Created playbooks and documentation tailored to client environments",
        "Placed 1st in the Corporate Boss of the SOC Capture the Flag event"
      ]
    },
    {
      title: "IT Security Specialist",
      company: "Escambia County Board of County Commissioners",
      duration: "Mar 2020 → Dec 2020",
      responsibilities: [
        "Implemented a security awareness program, improving phishing detection rates by 40%",
        "Triaged alerts, incidents, and remote forensics across 1k CJIS-certified systems",
        "Implemented controls from CIS and NIST for public and emergency systems"
      ]
    }
  ],

  education: [
    {
      degree: "Master of Science in Information Security Engineering",
      institution: "SANS Technology Institute",
      duration: "Jan 2024 → Present",
      highlights: [
        "Defensible Security Architecture and Engineering",
        "Hacking Techniques and Incident Response",
        "IT Security Planning, Policy, and Leadership",
        "Security Essentials"
      ]
    },
    {
      degree: "Bachelor of Applied Science in Cybersecurity",
      institution: "Pensacola State College",
      duration: "Dec 2020",
      highlights: [
        "Three-time Gold Bracket Finalist in the National Cyber League",
        "Training Officer and CTF Lead for the Cyber Defense Club",
        "Member of the National Technical Honor Society",
        "2020 Computer Science Academic Scholar"
      ]
    }
  ],

  certifications: [
    {
      provider: "CompTIA",
      certifications: ["Security+", "PenTest+", "CySA+", "Network+", "A+"]
    },
    {
      provider: "Mile2",
      certifications: ["C)ISSO", "C)PTE", "C)DRE", "C)DFE"]
    },
    {
      provider: "GIAC",
      certifications: ["GDSA", "GSTRT", "GCIH", "GSEC"]
    }
  ],

  skills: [
    {
      category: "Critical Skills",
      skills: [
        "Team leadership",
        "Project management",
        "Incident response",
        "Communication",
        "Risk assessment",
        "Strategic planning",
        "Collaboration",
        "Problem solving",
        "Analytical thinking",
        "Decision making",
        "Adaptability",
        "Time management",
        "Technical writing",
        "Mentoring",
        "Conflict resolution",
        "Process improvement",
        "Stakeholder engagement",
        "Change management",
        "Resource allocation",
        "Continuous learning",
        "Research and development"
      ]
    },
    {
      category: "Security Domains",
      skills: [
        "Cybersecurity operations",
        "Threat intelligence",
        "Risk management",
        "Compliance",
        "Identity management",
        "Cloud security",
        "Vulnerability assessment",
        "Penetration testing",
        "Data privacy",
        "Network security"
      ]
    },
    {
      category: "Technologies",
      skills: [
        "SIEM",
        "SOAR",
        "AWS",
        "Azure",
        "GCP",
        "EDR/XDR",
        "IDS/IPS",
        "ZTNA",
        "IAM",
        "PKI",
        "MFA",
        "DLP",
        "MDM",
        "AI",
        "Machine learning",
        "Encryption",
        "Firewall/VPN solutions",
        "Vulnerability management tools"
      ]
    }
  ]
};

export default resume;
