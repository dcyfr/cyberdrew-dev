import React, { Suspense, lazy } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';

// Lazy load pages for better performance
const Home = lazy(() => import('../content/pages/Home'));
const Blog = lazy(() => import('../content/pages/Blog'));
const BlogPost = lazy(() => import('../content/pages/BlogPost'));
const Resume = lazy(() => import('../content/pages/Resume'));
const About = lazy(() => import('../content/pages/About'));
const NotFound = lazy(() => import('../content/pages/NotFound'));

interface LazyPageProps {
  component: React.LazyExoticComponent<React.ComponentType<Record<string, unknown>>>;
}

export const LazyPage: React.FC<LazyPageProps> = ({ component: Component }) => (
  <Suspense fallback={
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  }>
    <Component />
  </Suspense>
);

export { Home, Blog, BlogPost, Resume, About, NotFound };
