import { lazy } from 'react';

// Pre-load critical route components
export const preloadRoutes = () => {
  // Preload home page (most likely to be visited first)
  const Home = lazy(() => import('../content/pages/Home'));
  
  // Preload blog page on hover or after initial load
  const Blog = lazy(() => import('../content/pages/Blog'));
  
  return { Home, Blog };
};

// Intersection Observer for lazy loading images and components
export const createIntersectionObserver = (
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  return new IntersectionObserver(callback, {
    root: null,
    rootMargin: '50px',
    threshold: 0.1,
    ...options
  });
};

// Performance monitoring utilities
export const measurePerformance = (name: string, fn: () => void) => {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`${name}-start`);
    fn();
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  } else {
    fn();
  }
};

// Resource hints for faster loading
export const addResourceHints = () => {
  const head = document.head;
  
  // DNS prefetch for external resources
  const dnsPrefetch = [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com'
  ];
  
  dnsPrefetch.forEach(href => {
    if (!document.querySelector(`link[rel="dns-prefetch"][href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = href;
      head.appendChild(link);
    }
  });
  
  // Preconnect to critical origins
  const preconnect = [
    { href: 'https://fonts.gstatic.com', crossorigin: true }
  ];
  
  preconnect.forEach(({ href, crossorigin }) => {
    if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = href;
      if (crossorigin) link.crossOrigin = 'anonymous';
      head.appendChild(link);
    }
  });
};
