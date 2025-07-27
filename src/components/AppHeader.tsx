import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface AppHeaderProps {
  showBackButton?: boolean;
  showHomeButton?: boolean;
  showThemeToggle?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  showBackButton = true,
  showHomeButton = false,
  showThemeToggle = true,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';
  
  // Don't show header on home page
  if (isHomePage) return null;
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex gap-2">
          {showBackButton && (
            <Button 
              variant="outline" 
              size="sm"
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
              variant="outline" 
              size="sm"
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
    </div>
  );
};