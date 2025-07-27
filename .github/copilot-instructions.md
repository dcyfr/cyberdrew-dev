---
applyTo: "**"
description: Comprehensive coding guidelines for project development
---

# Project Coding Standards and Guidelines

## 1. General Coding Principles

### Code Quality
- Write clean, readable, and maintainable code
- Follow SOLID principles
- Prioritize code readability over clever implementations
- Keep functions and components small and focused

### TypeScript and React Guidelines
- Use TypeScript for all new code
- Prefer functional components with hooks
- Use strong typing and avoid `any` type
- Implement proper error handling
- Follow React hooks rules (no conditional hooks)

## 2. Naming Conventions

### General Naming
- Use PascalCase for:
  * Component names
  * Interfaces
  * Type aliases
  * Class names
- Use camelCase for:
  * Variables
  * Functions
  * Methods
  * Hook names
- Prefix private class members with underscore (`_`)
- Use UPPER_SNAKE_CASE for constants

## 3. Project Structure

### File Organization
- Keep component files small and focused
- Separate concerns: 
  * Components for UI
  * Hooks for logic
  * Utility functions in separate files
- Use barrel exports (`index.ts`) for cleaner imports

## 4. Performance Considerations

### React Performance
- Memoize components and callbacks when appropriate
- Use `React.memo()` for preventing unnecessary re-renders
- Avoid inline function definitions in render methods
- Use `useCallback` and `useMemo` judiciously

## 5. Security Practices

### Code Security
- Sanitize and validate all user inputs
- Use TypeScript to enforce type safety
- Implement proper error boundaries
- Avoid exposing sensitive information
- Use environment variables for configuration

## 6. Testing and Documentation

### Testing Guidelines
- Write unit tests for critical functions
- Use React Testing Library for component tests
- Aim for high test coverage
- Test edge cases and error scenarios

### Documentation
- Add JSDoc comments for complex functions
- Document component props and return types
- Keep comments concise and meaningful
- Update documentation alongside code changes

## 7. Error Handling

### Error Management
- Use try/catch for async operations
- Implement global error handling
- Log errors with contextual information
- Provide user-friendly error messages
- Use TypeScript's exhaustive checking for error types

## 8. Performance Monitoring

### Code Optimization
- Use performance profiling tools
- Minimize unnecessary re-renders
- Optimize bundle size
- Implement lazy loading for components
- Use code splitting techniques

## 9. Accessibility

### Web Accessibility
- Follow WCAG guidelines
- Use semantic HTML
- Implement proper ARIA attributes
- Ensure keyboard navigation
- Test with screen readers

## 10. Version Control

### Git Best Practices
- Write clear, descriptive commit messages
- Keep commits small and focused
- Use feature branches
- Squash commits before merging
- Include context in pull request descriptions

## Conclusion

These guidelines are living documentation. They should evolve with the project and team's understanding. Always prioritize pragmatism and team collaboration over strict adherence to rules.
