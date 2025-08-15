# Security Policy

## Supported Versions

We support the `main` branch. Security fixes are released via patch versions.

## Reporting a Vulnerability

If you discover a vulnerability:

- Do not open a public issue.
- Report privately via GitHub Security Advisories or email the maintainer (see GitHub profile).
- Include: affected version/commit, impact, PoC/repro steps, and suggested mitigation if known.

We acknowledge reports within 72 hours and will work toward a fix promptly. After resolution, we will publish a security note and, if requested, credit the reporter.

## Scope

- Client code only; no server-side infrastructure is part of this repo.
- No secrets should exist in this repository. If you find one, please report immediately so it can be revoked.

## Hardening Practices

- Security headers (see `src/lib/security-headers.ts` and `vercel.json`).
- Sanitization of user-controlled HTML (see `sanitizeHtml` in `src/lib/security.ts`).
- No direct eval/dynamic code execution; CSP-compatible patterns preferred.
- Dependencies monitored via Dependabot and `npm audit`.
