# Performance Guidelines

## React Performance Optimization

- Memoize components and callbacks when appropriate using React.memo()
- Use useCallback and useMemo judiciously to prevent unnecessary re-renders
- Avoid inline function definitions in render methods
- Implement lazy loading for components using React.lazy()
- Use code splitting techniques to optimize bundle size
- Leverage Vite, Tailwind CSS, and shadcn-ui for fast builds and efficient styling

## Bundle Optimization

- Minimize unnecessary re-renders through proper component design
- Optimize bundle size by removing unused dependencies
- Use performance profiling tools to identify bottlenecks
- Implement tree shaking to eliminate dead code

## Loading Performance

- Implement lazy loading for non-critical components
- Use React.Suspense for handling loading states
- Optimize images and assets for web delivery
- Consider implementing virtual scrolling for large lists

## General Principles

- Prioritize user experience: fast load times, smooth interactions
- Never sacrifice accessibility or security for performance
