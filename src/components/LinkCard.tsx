import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LinkCardProps {
  title: string;
  description: string;
  link: string;
  internal?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
}

export const LinkCard: React.FC<LinkCardProps> = ({
  title,
  description,
  link,
  internal = false,
  icon: IconComponent,
  className = ""
}) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (internal) {
      navigate(link);
    } else {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };
  
  return (
    <div 
      className={`modern-card group cursor-pointer ${className}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`${internal ? 'Navigate to' : 'Open external link to'} ${title}: ${description}`}
    >
      <div className="flex items-start gap-4">
        <div className="rounded-lg bg-muted/50 p-2 group-hover:bg-primary/10 transition-colors">
          <IconComponent className="w-5 h-5 text-foreground group-hover:text-primary transition-colors" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {title}
            </h3>
            {!internal && (
              <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};