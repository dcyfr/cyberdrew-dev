# Project TODO & Issue Tracker

This document tracks bugs, feature requests, improvements, and technical debt for the cyberdrew.dev portfolio site.

**Last Updated:** October 3, 2025

---

## 🐛 Bugs

### Active
- None currently tracked

### Resolved
- ✅ **Turbopack build claim** - Fixed misleading claim in blog post about Turbopack being used for production builds (2025-10-03)

---

## 🚀 Feature Requests

### High Priority
- [ ] **Blog search functionality** - Add search across blog posts by title, content, and tags
- [ ] **Tag filtering** - Allow filtering blog posts by tags on `/blog` page
- [ ] **View counts** - Track and display view counts for blog posts

### Medium Priority
- [ ] **RSS feed improvements** - Enhance RSS/Atom feeds with full content and better formatting
- [ ] **Reading progress indicator** - Show reading progress bar for blog posts
- [ ] **Table of contents** - Generate TOC for long blog posts from headings
- [ ] **Related posts** - Show related posts at the end of each blog post based on tags
- [ ] **Code syntax highlighting themes** - Add syntax highlighting with theme support for code blocks

### Low Priority
- [ ] **Share buttons** - Add social sharing buttons to blog posts
- [ ] **Comments system** - Consider adding comments (Giscus or similar)
- [ ] **Newsletter signup** - Add email newsletter subscription
- [ ] **Print stylesheet improvements** - Enhance print.css for better blog post printing

---

## 🔧 Technical Debt & Improvements

### Code Quality
- [ ] **Error boundaries** - Add error boundaries for better error handling in client components
- [ ] **Loading states** - Add skeleton loaders for async content
- [ ] **E2E tests** - Set up Playwright or Cypress for critical user flows
- [ ] **Unit tests** - Add tests for utility functions and components

### Performance
- [ ] **Image optimization** - Add next/image for all images in blog posts
- [ ] **Bundle analysis** - Set up bundle analyzer to monitor bundle size
- [ ] **Font optimization** - Review font loading strategy for better performance
- [ ] **Incremental Static Regeneration** - Consider ISR for blog posts if content updates frequently

### SEO & Accessibility
- [ ] **Structured data** - Add JSON-LD structured data for blog posts
- [ ] **Accessibility audit** - Run full a11y audit with axe or Lighthouse
- [ ] **Meta descriptions** - Ensure all pages have unique, optimized meta descriptions
- [ ] **Alt text review** - Audit all images for proper alt text

### Documentation
- [ ] **API documentation** - Document API routes and their expected payloads
- [ ] **Component documentation** - Add JSDoc comments to complex components
- [ ] **Contributing guide** - Create CONTRIBUTING.md for potential contributors
- [ ] **Deployment guide** - Document deployment process and environment variables

---

## 📝 Content Tasks

### Blog Posts
- [ ] Write about implementing GitHub contributions heatmap
- [ ] Write about security best practices for Next.js apps
- [ ] Write about MDX setup and customization
- [ ] Document Tailwind v4 migration experience

### Pages
- [ ] Expand About page with more personal background
- [ ] Add speaking/presentations section if applicable
- [ ] Consider adding a /uses page (tools, software, setup)

---

## 🎨 Design & UX

### UI Improvements
- [ ] **Dark mode refinements** - Review color contrast in dark mode
- [ ] **Mobile navigation** - Improve mobile menu if navigation grows
- [ ] **Micro-interactions** - Add subtle animations and transitions
- [ ] **Focus states** - Audit and improve keyboard focus indicators

### Layout
- [ ] **Grid layout for projects** - Consider card grid instead of list
- [ ] **Blog post formatting** - Review typography and spacing in blog posts
- [ ] **Footer enhancements** - Add more useful links/info to footer

---

## 🔐 Security

### Active
- [ ] **Rate limiting** - Add rate limiting to contact form API
- [ ] **CAPTCHA consideration** - Evaluate need for spam prevention on contact form
- [ ] **Environment variable audit** - Ensure all sensitive data uses env vars

### Completed
- ✅ Security headers configured in vercel.json
- ✅ API route input validation implemented
- ✅ Safe MDX rendering with next-mdx-remote/rsc

---

## 📊 Analytics & Monitoring

- [ ] **Error tracking** - Consider Sentry or similar for error monitoring
- [ ] **Custom analytics events** - Track specific user interactions (blog views, contact form submissions)
- [ ] **Performance monitoring** - Set up performance budgets and alerts
- [ ] **Uptime monitoring** - Configure uptime monitoring service

---

## 🔄 Dependencies

### Maintenance
- [ ] Set up Dependabot or Renovate for automated dependency updates
- [ ] Review and update dependencies quarterly
- [ ] Monitor for security advisories

### Future Upgrades
- [ ] Monitor Turbopack production build support for future migration
- [ ] Stay updated on Next.js 16 features and migration path

---

## 💡 Ideas & Experiments

### Exploration
- [ ] **Interactive demos** - Add interactive code examples to blog posts
- [ ] **MDX components library** - Build custom MDX components for richer content
- [ ] **WebAssembly integration** - Experiment with WASM for performance-critical features
- [ ] **Edge functions** - Explore edge runtime for certain API routes

### Long-term
- [ ] Multi-language support (i18n)
- [ ] Portfolio case studies with detailed project breakdowns
- [ ] Video content integration
- [ ] Podcast/audio content

---

## 📋 Notes

### Project Conventions
- Store documentation in `/docs` directory
- Use `@/*` import alias consistently
- Server components by default; mark client components with `"use client"`
- Tailwind utilities for styling (no additional CSS frameworks)
- Type everything with TypeScript strict mode

### Release Process
- Update `updatedAt` in blog post frontmatter when making content changes
- Run `npm run lint` before committing
- Test locally with `npm run build` before deploying
- Review lighthouse scores after major UI changes

---

## Archive

Completed tasks are moved here with completion date for reference.

### 2025-10-03
- ✅ Fixed Turbopack build claim in shipping blog post
- ✅ Created centralized TODO tracker
