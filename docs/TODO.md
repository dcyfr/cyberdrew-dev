# Project TODO: Prioritized Backlog

This document outlines the prioritized backlog of tasks for the project, categorized by urgency and importance. Each task is marked with its current status and any relevant actions required.

## 🟥 Critical

## 🟧 High
- [~] **Dependency Audit**: Non-breaking vulnerabilities fixed as of July 2025. Remaining moderate/low issues require breaking changes or have no fix available. Documented for future review.
- [ ] **Content Security Policy (CSP):** **Action:** Implement a strict CSP via meta tag or HTTP header to mitigate XSS (add to `SecurityProvider.tsx` and/or server config).
- [ ] **Accessibility**:  
    - [ ] Audit all custom UI components for ARIA labels, keyboard navigation, and semantic HTML (no direct interactive native elements found in codebase search; manual review required).
    - [ ] Ensure all interactive elements are accessible by keyboard (tab/arrow navigation, focus indicators).
    - [ ] Use semantic HTML elements (button, nav, main, etc.) for all interactive roles.
    - [ ] Add appropriate ARIA attributes (aria-label, aria-labelledby, aria-describedby, role, etc.) where needed.
    - [ ] Test with screen readers and keyboard-only navigation.
- [ ] **Testing**: Add or expand unit/integration tests for critical components and pages.
- [ ] **Performance**: Monitor Core Web Vitals (Lighthouse, Vercel Analytics). Optimize images, fonts, and static assets.

## 🟨 Medium
- [ ] **Bundle Size**: Keep all chunks < 300kB.
- [ ] **Component Reuse**: Audit for duplicate UI logic/components.
- [ ] **Analytics**: Integrate privacy-respecting analytics (e.g., Plausible, Vercel Analytics).

## 🟩 Low / Future
- [ ] **Search Improvements**: Add fuzzy matching, tag filtering, and suggestions to blog search.
- [ ] **Admin Panel**: Build a secure admin panel for content management.
- [ ] **API Security**: If adding backend APIs, implement rate limiting, input validation, and monitoring.
- [ ] **Internationalization (i18n)**: Add support for multiple languages if targeting a global audience.

## Documentation & Dev Experience
- [ ] **Update README**: Add architecture overview, contribution guidelines, and security contact.
- [ ] **Deployment Docs**: Keep `DEPLOYMENT.md` up-to-date with optimizations and troubleshooting.
- [ ] **Changelog**: Maintain a `CHANGELOG.md` for releases and major changes.
- [ ] **Issue Templates**: Add GitHub issue/PR templates for collaboration.
- [ ] **Cline Support Improvements**:
  * Create `clinerules-bank/` with modular, reusable rule sets
  * Develop specialized workflows for:
    - Dependency upgrades
    - Internationalization
    - Accessibility compliance
    - Documentation generation
  * Add `.cline/config.json` for project-wide Cline configuration
  * Create `.cline/docs/` for:
    - Architectural Decision Records (ADRs)
    - Workflow documentation
    - Custom Cline interaction guidelines
  * Implement intelligent rule activation system
- [ ] **Copilot Support Enhancements**:
  * Create `.github/copilot-config.yml` with:
    - Custom context and training guidelines
    - Project-specific code pattern definitions
    - Suggestion and inline hint preferences
  * Develop comprehensive context documentation:
    - `ARCHITECTURE.md` with detailed project overview
    - `DESIGN_PATTERNS.md` explaining coding conventions
    - `CONTRIBUTION_GUIDE.md` for AI-assisted development
  * Implement strategic code annotations and JSDoc comments
  * Create `copilot-training/` directory with:
    - High-quality code examples
    - Reference implementations
    - Pattern demonstration snippets
  * Set up GitHub Actions for:
    - Validating Copilot code suggestions
    - Checking adherence to project standards
    - Generating AI code quality reports

## Recurring Tasks
- [ ] **Dependency Updates**: Regularly update dependencies to keep up with security patches and performance improvements.
- [ ] **Security Audits**: Conduct periodic security audits to identify and address new vulnerabilities.
- [ ] **Performance Monitoring**: Continuously monitor performance metrics and optimize as needed.
- [ ] **Accessibility Reviews**: Regularly review and improve accessibility compliance as new features are added.

---

## ✅ Done
- [x] 🟥 Critical **Security Headers**: All recommended headers enforced in `vercel.json` and `security-headers.ts`.
- [x] 🟩 Low / Future **RSS Feed**: RSS feed is up-to-date and discoverable.
- [x] 🟧 High **Dark/Light Mode**: Theme support and user preference persistence implemented.
- [x] 🟥 Critical **External Links**: All external links sanitized with `rel="noopener noreferrer"` in `sanitizeHtml`.
- [x] 🟥 Critical **Sensitive Data Handling**: sessionStorage cleared on tab hide and tab close. No localStorage or logout logic found. All sensitive session data now cleaned up on tab close/hide.
- [x] 🟥 Critical **HTTPS Enforcement**: Enforced in `SecurityProvider.tsx` for production custom domains.
- [x] 🟧 High **CORS Policy**:  
    - CORS is configured in `vite-security.config.ts`:
        - **Development:** `origin: true` (all origins allowed), `credentials: true`
        - **Production:** `origin: ['https://cyberdrew.dev']`, `credentials: true`
    - **Action:** Periodically review allowed origins and credentials policy.  
    - **Note:** With `credentials: true`, never use `origin: '*'` in production. Only allow trusted origins.
- [x] 🟧 High **Security Monitoring:**  
    - Runtime monitoring is implemented in `SecurityProvider.tsx`:
        - Logs security-related errors (e.g., SecurityError events)
        - Clears sensitive session data on tab hide/close
    - No further action required at this time.
- [x] 🟨 Medium **Session/Local Storage Review:**  
    - Only `sessionStorage` is used in `SecurityProvider.tsx` for temporary data, and is cleared on tab hide/close.
    - No `localStorage` usage found.
    - No sensitive data is persisted longer than necessary.
- [x] 🟨 Medium **Admin Panel Security:**  
    - No admin panel implemented yet. Security requirements documented for future implementation.
- [x] 🟨 Medium **API Security:**  
    - No backend APIs implemented yet. Security requirements documented for future implementation.
