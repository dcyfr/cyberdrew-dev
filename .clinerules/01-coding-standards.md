# Coding Standards and Quality

## General Principles

- Write clean, readable, and maintainable code
- Follow SOLID principles and prioritize code readability over clever implementations
- Keep functions and components small and focused
- Use TypeScript for all new code with strong typing - avoid `any` type

## TypeScript and React Guidelines

- Prefer functional components with hooks over class components
- Follow React hooks rules - no conditional hooks
- Implement proper error handling in all components
- Use React.memo(), useCallback, and useMemo judiciously for performance
- Avoid inline function definitions in render methods

## Naming Conventions

Use consistent naming patterns:
- **PascalCase**: Component names, Interfaces, Type aliases, Class names
- **camelCase**: Variables, Functions, Methods, Hook names  
- **UPPER_SNAKE_CASE**: Constants
- **Prefix with underscore**: Private class members (`_privateMember`)

## Code Organization

- Keep component files small and focused on single responsibility
- Separate concerns: Components for UI, Hooks for logic, Utilities in separate files
- Use barrel exports (`index.ts`) for cleaner imports
- Organize files logically within the established project structure
