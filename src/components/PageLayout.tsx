import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showThemeToggle?: boolean;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl' | '6xl' | 'full';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md', 
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '4xl': 'max-w-4xl',
  '6xl': 'max-w-6xl',
  full: 'max-w-full'
};

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  showHomeButton = true,
  showThemeToggle = true,
  className,
  maxWidth = '4xl'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  return (
    <main id="main-content" className={cn("min-h-screen", className)}>
      <div className={cn("container mx-auto px-4 sm:px-6 py-8 sm:py-16", maxWidthClasses[maxWidth])}>
        {/* Navigation Header */}
        {(showHomeButton || showThemeToggle) && !isHomePage && (
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-2">
              {showHomeButton && (
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="text-sm"
                  aria-label="Go home"
                >
                  <Home className="w-4 h-4 mr-1" />
                </Button>
              )}
            </div>
            {showThemeToggle && <ThemeToggle />}
          </div>
        )}
        
        {/* Page Content */}
        {children}
      </div>
    </main>
  );
};
