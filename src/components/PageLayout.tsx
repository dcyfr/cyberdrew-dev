import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
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
  showBackButton = true,
  showHomeButton = false,
  showThemeToggle = true,
  className,
  maxWidth = '4xl'
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  return (
    <main id="main-content" className={cn("min-h-screen", className)}>
      <div className={cn("container mx-auto px-6 py-16", maxWidthClasses[maxWidth])}>
        {/* Navigation Header */}
        {(showBackButton || showHomeButton || showThemeToggle) && !isHomePage && (
          <div className="flex justify-between items-start mb-8">
            <div className="flex gap-2">
              {showBackButton && (
                <Button 
                  variant="vercel-ghost" 
                  onClick={() => navigate(-1)}
                  className="text-sm"
                  aria-label="Go back to previous page"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back
                </Button>
              )}
              {showHomeButton && (
                <Button 
                  variant="vercel-ghost" 
                  onClick={() => navigate('/')}
                  className="text-sm"
                  aria-label="Go to home page"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
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