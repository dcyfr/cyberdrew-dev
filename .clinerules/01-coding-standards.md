# Coding Standards and Quality

## General Principles

- Write clean, readable, and maintainable code
- Prioritize code readability and SOLID principles over cleverness
- Keep functions and components small, focused, and single-responsibility
- Use TypeScript everywhere with strict typing—never use `any`
- Ensure all code is accessible, secure, and performant

## TypeScript and React Guidelines

- Use functional components with hooks (no class components)
- Follow React hooks rules—never call hooks conditionally
- Explicitly type all React components, props, and state (avoid `any`)
- Use precise prop types (e.g., `as const` for literals)
- Implement proper error handling in all components
- Use React.memo, useCallback, and useMemo for performance where appropriate
- Avoid inline function definitions in render methods
- Ensure all UI components are accessible and follow WCAG guidelines

## Naming Conventions

- **PascalCase**: Component names, Interfaces, Type aliases, Class names
- **camelCase**: Variables, Functions, Methods, Hook names
- **UPPER_SNAKE_CASE**: Constants
- **_underscorePrefix**: Private class members

## Code Organization

- Organize files by feature: UI components (`src/components/ui/`), hooks (`src/hooks/`), utilities (`src/lib/`), content (`src/content/`)
- Keep files small and focused on a single responsibility
- Use barrel exports (`index.ts`) for cleaner imports
- UI component files (`src/components/ui/`) must only export React components—move constants, hooks, and utilities to `src/lib/` or `src/hooks/`
- Follow Fast Refresh compatibility best practices

## Tooling and Standards

- Use ESLint and Prettier for linting and formatting
- Write unit and integration tests for all critical logic and components
- Document complex logic with JSDoc comments
- Follow project structure and standards as described in README.md

## File Modification Best Practices

- For targeted changes, use `replace_in_file` with exact `SEARCH` blocks
- For extensive changes, use `write_to_file` with only the file's content (no extra info)
