import React, { useEffect } from 'react';
import { SECURITY_META_TAGS } from '@/lib/security-headers';

interface SecurityProviderProps {
  children: React.ReactNode;
}

/**
 * Security Provider component - Lovable-compatible version
 */
export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  useEffect(() => {
    // Apply security meta tags that don't interfere with Lovable
    const safeMetaTags = SECURITY_META_TAGS.filter(tag => 
      // Only apply safe meta tags
      tag.name === 'format-detection' || 
      tag.name === 'robots'
    );

    safeMetaTags.forEach(tag => {
      const existingTag = document.querySelector(`meta[name="${tag.name}"], meta[http-equiv="${tag['http-equiv']}"]`);
      
      if (!existingTag) {
        const metaTag = document.createElement('meta');
        Object.entries(tag).forEach(([key, value]) => {
          metaTag.setAttribute(key, value);
        });
        document.head.appendChild(metaTag);
      }
    });

    // Only enforce HTTPS for production custom domains, not Lovable subdomains
    const isCustomDomain = !location.hostname.includes('lovableproject.com') && 
                          !location.hostname.includes('localhost') &&
                          !location.hostname.includes('127.0.0.1');
    
    if (process.env.NODE_ENV === 'production' && 
        location.protocol !== 'https:' && 
        isCustomDomain) {
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
