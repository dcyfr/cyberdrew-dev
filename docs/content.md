# Content & SEO

- Blog posts in `src/content/blog/` with clear frontmatter (title, date, tags, description)
- Use semantic headings, one H1 per page
- Provide alt text for images; prefer descriptive captions
- Rendering: `src/lib/blog.ts` parses frontmatter and HTML via `markdown-it` using `src/lib/blog-render.ts`
- Syntax highlighting: minimal `highlight.js/lib/core` languages registered; theme CSS lazy-loaded on demand
- `SEOHead` component for meta (title, description, og:*, twitter:*)
- RSS generation helpers in `src/lib/rss.ts`
