# React Component Creation Workflow

## Objective
Systematically create new React components following project best practices and coding standards.

## Workflow Steps

1. Component Naming and Location
- Use PascalCase for component names
- Determine appropriate directory:
  * UI components → `src/components/ui/`
  * Page-specific components → `src/components/`
  * Specialized components → Create dedicated subdirectory

2. Initial Component Structure
```typescript
import React from 'react';
import { cn } from '@/lib/utils'; // Use project utility for class names

interface ${ComponentName}Props {
  // Define strong, specific prop types
  className?: string;
  // Add other prop definitions
}

export function ${ComponentName}({ 
  className, 
  // other props 
}: ${ComponentName}Props) {
  return (
    <div className={cn(
      // Base classes
      className
    )}>
      {/* Component content */}
    </div>
  );
}

// Add default export for easier importing
export default ${ComponentName};
```

3. Performance Optimization Checklist
- Use `React.memo()` for preventing unnecessary re-renders
- Implement `useCallback` for event handlers
- Use `useMemo` for expensive computations
- Consider lazy loading for complex components

4. Accessibility Considerations
- Use semantic HTML elements
- Add appropriate ARIA attributes
- Ensure keyboard navigability
- Provide alternative text for media
- Maintain proper color contrast

5. Testing Preparation
- Create corresponding test file: `${ComponentName}.test.tsx`
- Write unit tests covering:
  * Rendering
  * Prop handling
  * Event interactions
  * Edge cases

6. Documentation
- Add JSDoc comments explaining:
  * Component purpose
  * Prop types
  * Usage examples
- Update project documentation if component introduces new patterns

7. Code Review Readiness Checklist
- Follows TypeScript typing standards
- Adheres to naming conventions
- Optimized for performance
- Accessible
- Thoroughly tested
- Well-documented

## Workflow Execution
```xml
<ask_followup_question>
<question>Would you like me to generate the component with these specifications?</question>
<options>["Yes, generate component", "Customize further", "Cancel"]</options>
</ask_followup_question>
