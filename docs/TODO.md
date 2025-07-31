# Project TODO: Prioritized Backlog

This document outlines the prioritized backlog of tasks for the project, categorized by urgency and importance. Each task is marked with its current status and any relevant actions required.

## 🟥 Critical
- [~] **Dependency Audit**: Non-breaking vulnerabilities fixed as of July 2025. Remaining moderate/low issues require breaking changes or have no fix available. Documented for future review.


## 🟧 High
- [ ] **Accessibility**: Add ARIA labels, keyboard navigation, and semantic HTML for all interactive elements.
- [ ] **Testing**: Add or expand unit/integration tests for critical components and pages.
- [ ] **Performance**: Monitor Core Web Vitals (Lighthouse, Vercel Analytics). Optimize images, fonts, and static assets.
- [ ] **CORS Policy**: CORS restricted in `vite-security.config.ts`. **Action:** Periodically review allowed origins and credentials policy.
- [ ] **Content Security Policy (CSP):** **Action:** Implement a strict CSP via meta tag or HTTP header to mitigate XSS (add to `SecurityProvider.tsx` and/or server config).
- [ ] **Security Monitoring:** **Action:** Expand runtime monitoring to detect suspicious activity (e.g., repeated errors, tampering).

## 🟨 Medium
- [ ] **Bundle Size**: Keep all chunks < 300kB. Review `BUNDLE_OPTIMIZATION.md` for improvements.
- [ ] **Component Reuse**: Audit for duplicate UI logic/components. Modularize as needed (`REFACTORING_SUMMARY.md`).
- [ ] **Analytics**: Integrate privacy-respecting analytics (e.g., Plausible, Vercel Analytics).
- [ ] **Session/Local Storage Review:** **Action:** Document all uses of browser storage, ensure no sensitive data is persisted longer than necessary, and encrypt if possible.
- [ ] **Admin Panel Security:** If/when implemented, enforce RBAC, audit logging, and strong authentication.
- [ ] **API Security:** If backend APIs are added, implement rate limiting, input validation, and monitoring (reference `src/lib/rate-limiter.ts`).

## 🟩 Low / Future
- [ ] **Search Improvements**: Add fuzzy matching, tag filtering, and suggestions to blog search.
- [ ] **Blog Features**: Add comments (with moderation), post sharing, and author profiles.
- [ ] **Admin Panel**: Build a secure admin dashboard for content management (if needed).
- [ ] **User Accounts**: Add user registration, profiles, and role-based access control (optional).
- [ ] **Security Blog Series**: Publish advanced security guides (Zero Trust, DLP, remote work, etc.).
- [ ] **API Security**: If adding backend APIs, implement rate limiting, input validation, and monitoring.
- [ ] **Internationalization (i18n)**: Add support for multiple languages if targeting a global audience.

## 📋 Documentation & Dev Experience
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

---

## ✅ Done
- [x] 🟥 Critical **Security Headers**: All recommended headers enforced in `vercel.json` and `security-headers.ts`.
- [x] 🟩 Low / Future **RSS Feed**: RSS feed is up-to-date and discoverable.
- [x] 🟧 High **Dark/Light Mode**: Theme support and user preference persistence implemented.
- [x] 🟥 Critical **External Links**: All external links sanitized with `rel="noopener noreferrer"` in `sanitizeHtml`.
- [x] 🟥 Critical **Sensitive Data Handling**: sessionStorage cleared on tab hide and tab close. No localStorage or logout logic found. All sensitive session data now cleaned up on tab close/hide.
- [x] 🟥 Critical **HTTPS Enforcement**: Enforced in `SecurityProvider.tsx` for production custom domains.