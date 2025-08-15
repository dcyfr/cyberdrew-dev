import { z } from 'zod';

// Zod schemas for type validation and runtime checking
export const CertificationSchema = z.object({
  organization: z.string(),
  certs: z.array(z.string())
});

export const CompetencySchema = z.object({
  category: z.string(),
  skills: z.array(z.string())
});

export const EducationSchema = z.object({
  degree: z.string(),
  school: z.string(),
  period: z.string(),
  details: z.array(z.string()).optional()
});

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  period: z.string(),
  achievements: z.array(z.string())
});

export const certifications: z.infer<typeof CertificationSchema>[] = [
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
      "Information Security Officer (CISSO)",
      "Penetration Testing Engineer (CPTE)",
      "Digital Forensics Examiner (CDFE)",
      "Disaster Recovery Expert (CDRE)"
    ]
  }
];

export const competencies: z.infer<typeof CompetencySchema>[] = [
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

export const education: z.infer<typeof EducationSchema>[] = [
  {
    degree: "M.S. Cybersecurity Engineering",
    school: "SANS Technology Institute",
    period: "2024 - Present",
    details: [
      "Defensible Security Architecture and Engineering",
      "IT Security Planning Policy & Leadership",
      "Hacking Techniques and Incident Response",
      "Security Essentials",
    ]
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

export const experiences: z.infer<typeof ExperienceSchema>[] = [
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

// Validation function to ensure data integrity
export function validateResumeData() {
  try {
    certifications.forEach(cert => CertificationSchema.parse(cert));
    competencies.forEach(comp => CompetencySchema.parse(comp));
    education.forEach(edu => EducationSchema.parse(edu));
    experiences.forEach(exp => ExperienceSchema.parse(exp));
    return true;
  } catch (error) {
    console.error('Resume data validation failed:', error);
    return false;
  }
}

// Validate data on import
validateResumeData();
