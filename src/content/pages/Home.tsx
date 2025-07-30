import { motion } from 'framer-motion';
import { FileBadge, FileText, Github, LibraryBig, Linkedin, Rss, HeartHandshake } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { PageLayout } from "@/components/PageLayout";
import { LinkCard } from "@/components/LinkCard";
import DisplayPicture from "@/assets/logo.webp";

const Home = () => {
  const connectCards = [
    {
      title: "Blog",
      description: "Insights on cybersecurity, tech, and more",
      link: "/blog",
      internal: true,
      icon: Rss
    },
    {
      title: "Resume",
      description: "Professional experience and skills",
      link: "/resume",
      internal: true,
      icon: FileText
    },
    {
      title: "Credentials",
      description: "Certifications and achievements",
      link: "https://www.credly.com/users/dcyfr",
      internal: false,
      icon: FileBadge
    },
    {
      title: "Publications",
      description: "Research papers and articles",
      link: "https://orcid.org/0009-0008-7570-6768",
      internal: false,
      icon: LibraryBig
    },
    {
      title: "Sponsorship",
      description: "Support my work on GitHub",
      link: "https://github.com/sponsors/dcyfr",
      internal: false,
      icon: HeartHandshake
    },
    {
      title: "GitHub",
      description: "Explore my projects and contributions",
      link: "https://github.com/dcyfr",
      internal: false,
      icon: Github
    },
    {
      title: "LinkedIn",
      description: "Connect with me on LinkedIn",
      link: "https://www.linkedin.com/in/dcyfr",
      internal: false,
      icon: Linkedin
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        type: 'spring' as any,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <SEOHead 
        title="Cyber Drew's Lab"
        description="Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices."
        keywords="cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security, security consultant"
      />
      <PageLayout showBackButton={false} maxWidth="2xl">
        <div className="flex flex-col items-center">
          {/* Avatar / Logo */}
          <motion.img 
            src={DisplayPicture}
            alt="Drew's Display Picture"
            className="rounded-full border-2 border-border w-32 h-32 mb-6 shadow-lg"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            whileHover={{ scale: 1.1, rotate: 3 }}
          />
          
          {/* Profile Name and Title */}
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl font-bold text-primary mb-2 text-center">
              It's Drew &#10022;
            </h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Cyber Architect, Developer, and Researcher
            </p>
          </motion.div>

          {/* Links Section */}
          <motion.div 
            className="w-full max-w-md space-y-4 mt-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {connectCards.map((card) => (
              <motion.div key={card.title} variants={itemVariants}>
                <LinkCard
                  title={card.title}
                  description={card.description}
                  link={card.link}
                  internal={card.internal}
                  icon={card.icon}
                  className="hover:bg-accent/50 hover:scale-105 transition-all duration-200 ease-in-out"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </PageLayout>
    </>
  );
};

export default Home;
