import { BookOpen, FileText, Award, Github, Linkedin } from "lucide-react";

export const connectCards = [
  {
    title: "Blog",
    description: "Musings on technology, cybersecurity, and life",
    link: "/blog",
    internal: true,
    icon: BookOpen,
  },
  {
    title: "Resume",
    description: "Security architecture and cyber threat mitigation",
    link: "/resume",
    internal: true,
    icon: FileText,
  },
  {
    title: "Publications",
    description: "Research contributions and academic publications",
    link: "https://orcid.org/0009-0008-7570-6768",
    internal: false,
    icon: Award,
  },
  {
    title: "Credentials",
    description: "Digital badges and professional certifications",
    link: "https://www.credly.com/users/dcyfr",
    internal: false,
    icon: Award,
  },
  {
    title: "GitHub",
    description: "Projects, tools, and open source contributions",
    link: "https://github.com/dcyfr",
    internal: false,
    icon: Github,
  },
  {
    title: "LinkedIn",
    description: "Professional insights and industry connections",
    link: "https://www.linkedin.com/in/dcyfr",
    internal: false,
    icon: Linkedin,
  },
];