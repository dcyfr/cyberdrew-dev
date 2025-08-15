# ADR 0001: Architecture and Stack

Date: 2025-08-14

## Status
Accepted

## Context
We need a performant, accessible, and secure blog/UI platform with strong DX. The stack should enable fast iteration and static hosting.

## Decision
- Use Vite + React + TypeScript + Tailwind + shadcn/ui
- Deploy as a static SPA on Vercel
- Keep routing with React Router and code-splitting via lazy routes

## Consequences
- Fast builds and deployments
- Good tree-shaking and per-component imports
- SPA trade-offs (SSR/SSG out of scope for now); rely on caching and pre-rendered static assets
