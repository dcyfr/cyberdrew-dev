import {
  contact,
  credentials,
  getLedger,
  guardrails,
  hero,
  loop,
  person,
  socials,
  work,
  writing,
} from "@/lib/site";
import { getFeaturedPosts } from "@/lib/feed";
import type { Post } from "@/lib/site";

/**
 * The machine-readable face of the site, GENERATED from lib/site.ts.
 *
 * The previous hand-maintained public/llms.txt had silently drifted: it still
 * advertised a project that had been removed from the page, pointed the fleet
 * at an old URL, and described it as running "unsupervised" long after the
 * copy changed. A file whose whole audience is machines is the last place a
 * stale claim should survive, so it is derived rather than written.
 *
 * Keep this route as the only source. Do not reintroduce public/llms.txt:
 * a static file in public/ would win over this route and drift again.
 *
 * The writing list is read from the same dcyfr.ai feed the page renders, for
 * the same reason: deriving it from the checked-in fallback would reintroduce
 * exactly the drift this route exists to prevent.
 */
export const dynamic = "force-static";

// force-static still permits revalidation, so the generated file tracks the
// feed on the same hourly cadence as the page.
export const revalidate = 3600;

const SITE = "https://www.cyberdrew.dev";

function render(posts: readonly Post[]): string {
  const roles = hero.roles.map((r) => `${r.role} at ${r.org}`).join(", ");

  const lines: string[] = [
    `# ${person.domain}: ${person.name} (${person.handle})`,
    "",
    `> ${hero.eyebrowPrefix} ${hero.eyebrowCycle[0]}. ${hero.deck} ${roles}.`,
    "",
    "## Key pages",
    `- [${person.domain}](${SITE}): positioning, selected work, writing, and contact.`,
    ...hero.roles
      .filter((r) => r.href)
      .map((r) => `- [${r.org}](${r.href}): ${r.role}.`),
    "",
    "## By the numbers",
    // The page sets the unit off with a margin; plain text has to earn the
    // gap explicitly, and only for word units — "60+" must not become "60 +".
    ...getLedger().map((s) => {
      const unit = s.unit ? (/^[a-z]/i.test(s.unit) ? ` ${s.unit}` : s.unit) : "";
      return `- ${s.value}${unit}: ${s.label}`;
    }),
    "",
    `## ${work.headline}`,
    ...work.items.map((w) => `- ${w.title} (${w.status.label}): ${w.desc} ${w.href}`),
    "",
    `## ${loop.headline}`,
    `> ${loop.deck}`,
    ...loop.steps.map(
      (s) => `- ${s.num} ${s.name} (${s.tier}): ${s.desc} Stops on: ${s.guard}`
    ),
    `- ${loop.close}`,
    "",
    `## ${guardrails.headline}`,
    `> ${guardrails.deck}`,
    ...guardrails.items.map((g) => `- ${g.name} (${g.value}): ${g.desc}`),
    "",
    "## Certifications",
    ...credentials.items.map((c) => `- ${c.abbr}: ${c.name} (${c.issuer})`),
    `- ${credentials.more}: ${credentials.href}`,
    "",
    `## ${writing.headline}`,
    ...posts.map((p) => `- ${p.title} (${p.kind}, ${p.date}): ${p.href}`),
    `- All writing: ${writing.more.href}`,
    "",
    "## Contact",
    `- ${contact.deck}`,
    ...contact.engagements.map((e) => `- ${e.name}: ${e.desc} You get: ${e.outcome}.`),
    `- Email: ${person.email}`,
    `- Book a call: ${person.cal}`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
  ];

  return lines.join("\n");
}

export async function GET() {
  const posts = await getFeaturedPosts();
  return new Response(render(posts), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
