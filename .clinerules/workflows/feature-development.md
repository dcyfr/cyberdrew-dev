# Feature Development Workflow

## Objective
Systematically develop new features while maintaining high code quality, security, and performance standards.

## Workflow Stages

### 1. Feature Planning
- Define clear feature requirements
- Identify potential architectural impacts
- Assess performance and security implications
- Create initial architectural design document

### 2. Branch Management
```bash
# Create feature branch
git checkout -b feature/${FEATURE_NAME}
```

### 3. Implementation Guidelines

#### Code Structure
- Follow modular design principles
- Separate concerns
- Use composition over inheritance
- Minimize component complexity

#### TypeScript Best Practices
- Use strong typing
- Avoid `any` type
- Implement comprehensive type guards
- Use discriminated unions for complex state

#### Performance Optimization
- Implement lazy loading
- Use memoization techniques
- Minimize re-renders
- Profile and optimize bundle

### 4. Security Considerations
- Validate all input data
- Implement proper error handling
- Use environment variables for configuration
- Follow security patterns in `src/lib/security.ts`

### 5. Testing Strategy
- Write comprehensive unit tests
- Create integration tests
- Implement end-to-end tests for critical flows
- Aim for high test coverage

### 6. Documentation
- Update README.md if feature adds new capabilities
- Add JSDoc comments for complex logic
- Create or update architectural decision records (ADRs)

### 7. Code Review Preparation
- Ensure all CI checks pass
- Run performance and security audits
- Prepare detailed PR description

### 8. Deployment Readiness
- Update deployment configurations if needed
- Verify compatibility with existing systems
- Prepare rollback strategy

## Workflow Execution
```xml
<ask_followup_question>
<question>Would you like to proceed with feature development?</question>
<options>["Begin Feature Development", "Refine Requirements", "Cancel"]</options>
</ask_followup_question>
```

### Checklist Before Merging
- [ ] All tests passing
- [ ] Code review completed
- [ ] Performance benchmarks met
- [ ] Security vulnerabilities checked
- [ ] Documentation updated
- [ ] Accessibility standards met
