import React from 'react';
import { ExternalLink, ArrowUpRight, Github, Linkedin, Mail, MapPin, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionProps {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}

interface StatItemProps {
  number: string;
  label: string;
}

interface SkillBadgeProps {
  skill: string;
  level?: 'expert' | 'advanced' | 'intermediate';
}

export const QuickAction: React.FC<QuickActionProps> = ({
  icon: Icon,
  label,
  href,
  onClick,
  variant = 'secondary',
  external = false
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (href) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer');
      } else {
        navigate(href);
      }
    }
  };

  const baseClasses = "group relative flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 hover-scale cursor-pointer";
  const variantClasses = variant === 'primary' 
    ? "bg-primary text-primary-foreground border-primary hover:shadow-lg hover:shadow-primary/25" 
    : "bg-card border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10";

  return (
    <div 
      className={`${baseClasses} ${variantClasses}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
        variant === 'primary' 
          ? 'bg-primary-foreground/20' 
          : 'bg-primary/10 group-hover:bg-primary/20'
      }`}>
        <Icon className={`w-5 h-5 ${
          variant === 'primary' ? 'text-primary-foreground' : 'text-primary'
        }`} />
      </div>
      <span className={`font-medium transition-colors ${
        variant === 'primary' 
          ? 'text-primary-foreground' 
          : 'text-foreground group-hover:text-primary'
      }`}>
        {label}
      </span>
      {external && (
        <ArrowUpRight className={`w-4 h-4 ml-auto transition-transform group-hover:scale-110 ${
          variant === 'primary' ? 'text-primary-foreground/70' : 'text-muted-foreground'
        }`} />
      )}
    </div>
  );
};

export const StatItem: React.FC<StatItemProps> = ({ number, label }) => (
  <div className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
    <div className="text-2xl font-bold text-foreground mb-1">{number}</div>
    <div className="text-sm text-muted-foreground">{label}</div>
  </div>
);

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill, level = 'advanced' }) => {
  const levelColors = {
    expert: 'bg-green-500/10 text-green-700 dark:text-green-300 border-green-500/20',
    advanced: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
    intermediate: 'bg-orange-500/10 text-orange-700 dark:text-orange-300 border-orange-500/20'
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors hover-scale ${levelColors[level]}`}>
      {skill}
    </span>
  );
};