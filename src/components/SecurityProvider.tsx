import React, { useEffect } from 'react';
import { SECURITY_META_TAGS } from '@/lib/security-headers';

interface SecurityProviderProps {
  children: React.ReactNode;
}

/**
 * Security Provider component for Vercel deployment
 */
export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  useEffect(() => {
  // Apply all configured security meta tags (Vercel-friendly)
  SECURITY_META_TAGS.forEach(tag => {
      const existingTag = document.querySelector(`meta[name="${tag.name}"], meta[http-equiv="${tag['http-equiv']}"]`);
      
      if (!existingTag) {
        const metaTag = document.createElement('meta');
        Object.entries(tag).forEach(([key, value]) => {
          metaTag.setAttribute(key, value);
        });
        document.head.appendChild(metaTag);
      }
    });

  // Enforce HTTPS for any non-local environment (Vercel uses HTTPS on all domains)
  const isNonLocal = !location.hostname.includes('localhost') &&
             !location.hostname.includes('127.0.0.1');
    
  if (process.env.NODE_ENV === 'production' && 
    location.protocol !== 'https:' && 
    isNonLocal) {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }

    // Add subtle security monitoring (non-intrusive)
    const clearSensitiveSessionData = () => {
      sessionStorage.removeItem('temp-data');
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear sensitive data when tab becomes hidden (optional)
        clearSensitiveSessionData();
      }
    };

    const handleBeforeUnload = () => {
      // Clear sensitive data when tab or window is closed
      clearSensitiveSessionData();
    };

    // Monitor for potential security issues
    const handleError = (event: ErrorEvent) => {
      // Log security-related errors for monitoring
      if (event.error && event.error.name === 'SecurityError') {
        console.warn('Security error detected:', event.error.message);
      }
    };

    // Add non-intrusive event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('error', handleError);

    // Cleanup
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return <>{children}</>;
};
