# Project TODO: Prioritized Backlog

## 🟥 Critical
- [x] **HTTPS Enforcement**: Enforced in `SecurityProvider.tsx` for production custom domains.
- [ ] **Dependency Audit**: Regularly run `npm audit` and update dependencies for vulnerabilities.
- [x] **External Links**: All external links sanitized with `rel="noopener noreferrer"` in `sanitizeHtml`.
- [~] **Sensitive Data Handling**: Partial—sessionStorage cleared on tab hide. **Action:** Audit all session/localStorage usage for sensitive data and ensure full cleanup on logout/tab close.

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

## 📝 2025 Content Strategy (Low Priority)
- [ ] May: Incident Response & Disaster Recovery
- [ ] June: Cloud Security (SaaS, IaaS, shared responsibility)
- [ ] July: Regulatory Compliance (GDPR, HIPAA, PCI DSS)
- [ ] August: Security Automation & AI in Cybersecurity
- [ ] September: Phishing & Social Engineering Defense
- [ ] October: Security Awareness Month (culture, training, leadership)
- [ ] November: Supply Chain & Third-Party Risk
- [ ] December: Year-in-Review & 2026 Predictions
- [ ] Publish how-to guides and checklists
- [ ] Create case studies and incident writeups
- [ ] Conduct interviews with security professionals
- [ ] Write tool reviews and walkthroughs
- [ ] Design infographics and explainer visuals
- [ ] Invite guest posts or interviews
- [ ] Run monthly polls or Q&A sessions
- [ ] Share downloadable resources (templates, checklists)
- [ ] Track topic engagement (views, shares, comments)
- [ ] Monitor growth in newsletter/blog subscribers
- [ ] Collect feedback from polls or Q&A
- [ ] Monitor SEO ranking for targeted keywords
- [ ] Adjust topics based on industry news, major breaches, or reader feedback

---

## ✅ Done
- [x] **Security Headers**: All recommended headers enforced in `vercel.json` and `security-headers.ts`.
- [x] **RSS Feed**: RSS feed is up-to-date and discoverable.
- [x] **Dark/Light Mode**: Theme support and user preference persistence implemented.
