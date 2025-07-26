import React, { useEffect } from 'react';
import { SECURITY_META_TAGS } from '@/lib/security-headers';

interface SecurityProviderProps {
  children: React.ReactNode;
}

/**
 * Security Provider component that applies security measures to the application
 */
export const SecurityProvider: React.FC<SecurityProviderProps> = ({ children }) => {
  useEffect(() => {
    // Apply security meta tags
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

    // Enforce HTTPS in production
    if (process.env.NODE_ENV === 'production' && location.protocol !== 'https:') {
      location.replace(`https:${location.href.substring(location.protocol.length)}`);
    }

    // Disable right-click context menu in production (optional security measure)
    const handleContextMenu = (e: MouseEvent) => {
      if (process.env.NODE_ENV === 'production') {
        e.preventDefault();
      }
    };

    // Disable F12 and other developer shortcuts in production
    const handleKeyDown = (e: KeyboardEvent) => {
      if (process.env.NODE_ENV === 'production') {
        // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
        if (
          e.key === 'F12' ||
          (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
          (e.ctrlKey && e.key === 'U')
        ) {
          e.preventDefault();
        }
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return <>{children}</>;
};