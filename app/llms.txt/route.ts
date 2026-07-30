import { contact, hero, person, socials, work, writing } from "@/lib/site";

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
 */
export const dynamic = "force-static";

const SITE = "https://www.cyberdrew.dev";

function render(): string {
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
    `## ${work.headline}`,
    ...work.items.map((w) => `- ${w.title} (${w.status.label}): ${w.desc} ${w.href}`),
    "",
    `## ${writing.headline}`,
    ...writing.posts.map((p) => `- ${p.title} (${p.kind}, ${p.date}): ${p.href}`),
    `- All writing: ${writing.more.href}`,
    "",
    "## Contact",
    `- ${contact.deck}`,
    `- Email: ${person.email}`,
    `- Book a call: ${person.cal}`,
    ...socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
  ];

  return lines.join("\n");
}

export function GET() {
  return new Response(render(), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=0, must-revalidate",
    },
  });
}
