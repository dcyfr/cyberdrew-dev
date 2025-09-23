# cyberdrew.dev — Minimal Developer Portfolio

A modern, minimal portfolio built with Next.js (App Router), TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech
- Next.js 15 (App Router) + React 19
- TypeScript, ESLint
- Tailwind CSS v4
- shadcn/ui (Radix + CVA)
- next-themes, sonner

## Development

```sh
npm install
npm run dev
```

Then open http://localhost:3000.

## Build & Start

```sh
npm run build
npm start
```

## Project Structure
- `src/app` — App Router pages and API routes
- `src/components` — UI components (shadcn/ui + custom)
- `src/data` — Static content/data
- `src/lib` — Utilities

## Customization
- Update site copy in `src/app/page.tsx`, `about`, `projects`, `contact`.
- Add/edit projects in `src/data/projects.ts`.
- Tweak theme tokens in `src/app/globals.css`.

## SEO
- Edit `metadata` in `src/app/layout.tsx`.
- `src/app/sitemap.ts` and `src/app/robots.ts` are generated routes.

## Domain & Deployment
- Point your domain (cyberdrew.dev) to your hosting provider (e.g., Vercel).
- On Vercel: import this repo, set production branch, add domain in Project Settings.
- DNS: add A/AAAA or CNAME as directed by your host.

## Contact Form
- The API route at `/api/contact` validates input and logs it on the server.
- Replace the placeholder with an email/SaaS integration (Resend, Sendgrid, etc.).

## License
MIT
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
