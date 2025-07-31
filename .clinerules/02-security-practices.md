# Security and Safety Guidelines

## Input Validation and Sanitization

- Sanitize and validate all user inputs before processing
- Use TypeScript's type system to enforce input constraints
- Implement proper error boundaries to catch and handle errors gracefully
- Never expose sensitive information or secrets in client-side code

## Security Practices

- Enforce secure HTTP headers and rate limiting (see `src/lib/security.ts`)
- Use environment variables for all configuration values
- Never commit secrets, API keys, or sensitive data to version control
- Implement authentication and authorization patterns as needed
- All code must be secure by default and follow modern web security best practices

## Error Handling

- Use try/catch blocks for all async operations
- Implement global error handling where appropriate
- Log errors with sufficient contextual information for debugging
- Provide user-friendly error messages that don't expose system details
- Use TypeScript's exhaustive checking for error types
