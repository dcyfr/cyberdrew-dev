# Security

- Security headers via Vercel headers and `src/lib/security-headers.ts`
- Input validation with `zod` and sanitization via `dompurify`
- Rate limiter outline in `src/lib/rate-limiter.ts`
- Use `SecureLink` for external anchors (noopener, noreferrer)
- Avoid exposing secrets; use env vars where applicable
- Audit with `npm run audit` and Dependabot (enable in repo settings)
