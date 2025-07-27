# Pull Request Review Workflow

## Objective
Conduct a comprehensive review of pull requests using the project's established coding standards and best practices.

## Review Checklist

### 1. Code Quality Assessment
- Verify adherence to coding standards in `.clinerules/01-coding-standards.md`
  * Check TypeScript typing
  * Ensure no `any` types used
  * Validate naming conventions
  * Confirm component and function sizes are appropriate

### 2. Security Evaluation
- Cross-reference with `.clinerules/02-security-practices.md`
  * Validate input sanitization
  * Check for potential security vulnerabilities
  * Ensure no sensitive information exposure
  * Verify error handling practices

### 3. Performance Analysis
- Review against `.clinerules/03-performance-optimization.md`
  * Check for unnecessary re-renders
  * Validate use of memoization techniques
  * Assess bundle size implications
  * Evaluate lazy loading implementations

### 4. Testing Verification
- Inspect based on `.clinerules/04-testing-documentation.md`
  * Confirm test coverage
  * Validate unit and integration tests
  * Check documentation updates
  * Review code comments and JSDoc

### 5. Accessibility and Git Practices
- Evaluate using `.clinerules/05-accessibility-git.md`
  * Check web accessibility standards
  * Review commit message quality
  * Validate semantic HTML usage
  * Ensure proper ARIA attributes

## Workflow Steps

1. Fetch PR Details
```bash
gh pr view $PR_NUMBER --json title,body,files
```

2. Analyze Changed Files
```bash
gh pr diff $PR_NUMBER
```

3. Comprehensive Review Process
- Use Cline's tools to:
  * `read_file` for detailed code examination
  * `search_files` for pattern matching
  * Validate against project rules

4. Decision Making
```xml
<ask_followup_question>
<question>Based on the comprehensive review, I recommend:
- Approval
- Request Changes
- Needs Further Discussion

Detailed findings:
[Comprehensive review summary]</question>
<options>["Approve PR", "Request Changes", "Discuss Further"]</options>
</ask_followup_question>
```

5. Follow-up Actions
- Draft review comment
- Approve or request changes via GitHub CLI
- Provide constructive feedback aligned with project standards
