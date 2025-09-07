import React from 'react';
import { Badge } from '@/components/ui/badge';

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleLevel?: 'h1' | 'h2' | 'h3' | 'h4';
}

interface SkillCategoryProps {
  category: string;
  skills: string[];
}

interface CertificationGroupProps {
  organization: string;
  certs: string[];
}

interface ExperienceItemProps {
  title: string;
  company?: string;
  location?: string;
  period: string;
  description?: string;
  achievements?: string[];
}

export const Section: React.FC<SectionProps> = ({ 
  title, 
  children, 
  className = "",
  titleLevel = 'h2'
}) => {
  const TitleComponent = titleLevel;
  const titleClass = titleLevel === 'h1' ? 'text-4xl font-bold font-sans tracking-tight mb-8' : 
                    titleLevel === 'h2' ? 'text-3xl font-semibold font-sans tracking-tight mb-6' : 
                    titleLevel === 'h3' ? 'text-2xl font-medium font-sans tracking-tight mb-4' : 
                    'text-xl font-medium font-sans mb-3';
  
  return (
    <section className={`mb-12 ${className}`}>
      <TitleComponent className={titleClass}>
        {title}
      </TitleComponent>
      {children}
    </section>
  );
};

export const SkillCategory: React.FC<SkillCategoryProps> = ({ category, skills }) => (
  <div className="mb-6">
    <h4 className="text-base font-semibold mb-3 text-foreground">{category}</h4>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, index) => (
        <Badge 
          key={index} 
          variant="secondary" 
          className="text-xs font-medium px-3 py-1 rounded-full bg-secondary/60"
        >
          {skill}
        </Badge>
      ))}
    </div>
  </div>
);

export const CertificationGroup: React.FC<CertificationGroupProps> = ({ organization, certs }) => (
  <div className="mb-6">
    <h4 className="text-base font-semibold mb-3 text-foreground">{organization}</h4>
    <div className="flex flex-wrap gap-2">
      {certs.map((cert, index) => (
        <Badge 
          key={index} 
          variant="outline" 
          className="text-xs font-medium px-3 py-1 rounded-full border-primary/20 text-primary"
        >
          {cert}
        </Badge>
      ))}
    </div>
  </div>
);

export const ExperienceItem: React.FC<ExperienceItemProps> = ({ 
  title, 
  company, 
  location, 
  period, 
  description,
  achievements = []
}) => (
  <div className="mb-8 last:mb-0">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
      <div>
        <h4 className="text-base font-semibold text-foreground">{title}</h4>
        {company && <p className="text-sm text-muted-foreground">{company}{location && ` • ${location}`}</p>}
      </div>
      <p className="text-sm text-muted-foreground mt-1 sm:mt-0 flex-shrink-0">{period}</p>
    </div>
    {description && (
      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{description}</p>
    )}
    {achievements.length > 0 && (
      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
        {achievements.map((achievement, index) => (
          <li key={index}>{achievement}</li>
        ))}
      </ul>
    )}
  </div>
);