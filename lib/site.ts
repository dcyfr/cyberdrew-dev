// ---------------------------------------------------------------------------
// cyberdrew.dev — content model. Single source of truth for copy and links.
//
// Skeleton scope: header · hero · work · writing · contact · footer.
// The earlier loop/envelope/ledger sections are recoverable from git at
// 59f959e if they come back.
// ---------------------------------------------------------------------------

export const person = {
  name: "Drew",
  callsign: "cyberdrew",
  handle: "dcyfr",
  domain: "cyberdrew.dev",
  email: "hello@cyberdrew.dev",
  cal: "https://cal.com/dcyfr/intro",
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Guardrails", href: "#guardrails" },
  { label: "Writing", href: "#writing" },
  { label: "Contact", href: "#contact" },
];

// ---------------------------------------------------------------------------
// Hero. Silhouette test: this has to work as one shape on one ground.
// ---------------------------------------------------------------------------
export const hero = {
  // The eyebrow's tail cycles; the first entry is the resting state and the
  // one the static surfaces (meta description, OG card) use.
  eyebrowPrefix: "Secure architecture for",
  eyebrowCycle: ["autonomous systems", "artificial intelligence", "agentic design"],
  headline: ["Agents that act", "Rails that hold"],
  deck:
    "I'm Drew, a cyber architect. I build autonomous systems that take real actions in production and the guardrails that make that a safe bet.",
  roles: [
    { role: "Founder", org: "DCYFR Labs", href: "https://www.dcyfr.ai" },
    { role: "Head of AI", org: "GameShark Labs", href: "https://gamesharklabs.com" },
    { role: "Principal Security Engineer", org: "Monks", href: "https://www.monks.com/" },
  ],
  primary: { label: "See my work", href: "#work" },
  secondary: { label: "Work with me", href: "#contact" },
} as const;

// ---------------------------------------------------------------------------
// Ledger. Four figures beside the hero, so the claim above has something
// standing next to it before the reader has scrolled anywhere.
//
// SOURCING — every figure is drawn from the live workspace, and re-checked on
// 2026-07-31. If one changes in the system, change it here. A stale number on
// a page whose whole argument is "these claims are checkable" costs more than
// the number is worth.
//   60+     69 ai.rei.* jobs loaded in launchd; 66 enabled plists, 81 daemon
//           contracts under usr/daemons/. "60+" is the durable floor.
//   30 min  the daemon think-loop, StartInterval=1800.
//   $0      the default model tier is local (Tier 0/1). Frontier tiers exist
//           and cost money — they are escalation, not the default.
//   6+ yrs  nexus/context/user/about-me.md.
// ---------------------------------------------------------------------------
export type Stat = { value: string; unit?: string; label: string };

export const ledger: Stat[] = [
  { value: "60", unit: "+", label: "agents on one substrate" },
  { value: "30", unit: "min", label: "autonomous cycle" },
  { value: "$0", label: "default model tier, local" },
  { value: "6", unit: "+ yrs", label: "security engineering" },
];

// ---------------------------------------------------------------------------
// Work.
// ---------------------------------------------------------------------------
export type WorkItem = {
  num: string;
  title: string;
  href: string;
  desc: string;
  tags: string[];
  status: { label: string; kind: "open" | "running" | "live" };
};

export const work = {
  eyebrow: "Work", index: "01",
  headline: "Projects and initiatives",
  items: [
    {
      num: "01",
      title: "@dcyfr/ai",
      href: "https://www.dcyfr.ai/ai",
      desc: "The portable TypeScript runtime the fleet thinks in: model routing across local and frontier tiers, tool-use, and MCP wiring you drop into an existing project.",
      tags: ["Agent runtime", "TypeScript", "MCP"],
      status: { label: "Open source", kind: "open" },
    },
    {
      num: "02",
      title: "The agentic fleet",
      href: "https://www.dcyfr.ai/about",
      // Count tracks the ledger above — 69 ai.rei.* jobs loaded at the last
      // check. Two different numbers for the same fleet on one page is the
      // drift this file exists to prevent.
      desc: "Sixty-odd daemons on a shared substrate, spanning research, code review, monitoring, and self-healing. Runs autonomously on a local-first model stack under a hard budget.",
      tags: ["Multi-agent", "Local-first", "Self-healing"],
      status: { label: "Running", kind: "running" },
    },
    {
      num: "03",
      title: "SharkVault",
      href: "https://sharkvault.gamesharklabs.com",
      desc: "Proof the fleet ships product and not just diffs: a backer-funded consumer app taken end to end, from auth to payments to content pipeline, largely by agents.",
      tags: ["Autonomous delivery", "Next.js", "Product"],
      status: { label: "Live", kind: "live" },
    },
  ] as WorkItem[],
};

// ---------------------------------------------------------------------------
// Guardrails. The hero promises "the guardrails that make that a safe bet",
// and before this section the page never showed one — the differentiator was
// asserted in the deck and then dropped.
//
// Restored from 59f959e, where it was cut as collateral of the obsidian/bone
// theme rewrite rather than for anything editorial. Named "Guardrails" instead
// of the original "The envelope": flight-envelope is a good metaphor and bad
// wayfinding, and this label echoes the hero's own promise.
//
// SOURCING — all six re-verified against the workspace on 2026-07-31. Rendered
// as hairline data rows, not marketing cards: the point is that each one is a
// number somebody could check.
// ---------------------------------------------------------------------------
export type Guard = { name: string; value: string; desc: string };

export const guardrails = {
  eyebrow: "Guardrails", index: "02",
  headline: "Anything that can act can be stopped",
  deck:
    "Autonomy is a claim about what happens when nobody is watching. These are the controls that make the claim checkable.",
  items: [
    {
      name: "Spend ceiling",
      value: "$100 / mo",
      desc: "A hard monthly gate on model spend. Trip it and the kill switch fires — the fleet stops, it does not degrade quietly.",
    },
    {
      name: "Sender kill switch",
      value: "< 1 s",
      desc: "Every outbound path — mail, chat, webhooks — honours one pause flag. No sends within a second of it being set.",
    },
    {
      name: "Credential isolation",
      value: "per-process",
      desc: "Secrets resolve at exec time from the OS keychain. Nothing lands in an environment dump, a plist, or a prompt.",
    },
    {
      name: "Tool sandbox",
      value: "allowlist",
      desc: "The shell an agent gets is not your shell: fixed binaries, no metacharacters, no SSRF to localhost or private ranges.",
    },
    {
      name: "Metacognition breaker",
      value: "6 cycles",
      desc: "An agent that keeps picking the same task without shipping is quarantined. Persistence is a failure mode too.",
    },
    {
      name: "Self-heal watchdog",
      value: "3 / hr",
      desc: "Downed services restart on graduated trust — dry-run first, and never more than three times an hour before escalation.",
    },
  ] as Guard[],
};

// ---------------------------------------------------------------------------
// Writing. Canonical home is dcyfr.ai/blog.
//
// The live list is fetched from that blog's JSON feed, filtered to posts
// flagged `featured` — see lib/feed.ts. The `posts` array below is the
// fallback the section renders when the feed is unreachable at build time,
// so it is a snapshot rather than the source of truth. It only needs to be
// touched if the feed is going to be down long enough for a stale entry to
// matter.
// ---------------------------------------------------------------------------
export type Post = { num: string; title: string; kind: string; date: string; href: string };

export const writing = {
  eyebrow: "Writing", index: "03",
  headline: "Notes from the build",
  posts: [
    {
      num: "01",
      title: "What's new in @dcyfr/ai: the v3 line",
      kind: "Release notes",
      date: "Jun 2026",
      href: "https://www.dcyfr.ai/blog/whats-new-in-dcyfr-ai-v3",
    },
    {
      num: "02",
      title: "AI assistants as development partners",
      kind: "AI workflows",
      date: "Mar 2026",
      href: "https://www.dcyfr.ai/blog/ai-assistants-as-development-partners",
    },
    {
      num: "03",
      title: "OWASP Top 10 for agentic AI",
      kind: "AI security",
      date: "Dec 2025",
      href: "https://www.dcyfr.ai/blog/owasp-top-10-agentic-ai",
    },
    {
      num: "04",
      title: "Building with AI",
      kind: "Essay",
      date: "Nov 2025",
      href: "https://www.dcyfr.ai/blog/building-with-ai",
    },
  ] as Post[],
  more: { label: "All writing at dcyfr.ai/blog", href: "https://www.dcyfr.ai/blog" },
};

// ---------------------------------------------------------------------------
// Contact.
// ---------------------------------------------------------------------------
// The deck used to name three engagement shapes in one sentence. As prose it
// reads as a list of adjectives; as three rows it is a thing a visitor can
// point at and say "that one". Same three shapes, same order.
export type Engagement = { num: string; name: string; desc: string; outcome: string };

export const contact = {
  eyebrow: "Contact", index: "04",
  headline: "Ship autonomy you can defend",
  deck: "I work with teams putting agents into production. That usually looks like one of three things.",
  engagements: [
    {
      num: "01",
      name: "Your first secure agent",
      desc: "You have a use case and nothing in production yet. We scope the smallest agent that earns its keep and ship it with the controls already in place.",
      outcome: "A running agent, and the envelope it runs inside",
    },
    {
      num: "02",
      name: "A governed fleet",
      desc: "Agents already run. The open question is what stops them — spend, sends, credentials, the blast radius of a bad tool call.",
      outcome: "Kill switches, ceilings, and an audit trail that holds up",
    },
    {
      num: "03",
      name: "A hard look at what you run",
      desc: "An audit of the system you already have: where an agent can act, what it can reach, and what happens on the day one goes wrong.",
      outcome: "Findings, ranked, with the order to fix them in",
    },
  ] as Engagement[],
  primary: { label: "Book an intro call", href: person.cal },
  secondary: { label: person.email, href: `mailto:${person.email}` },
};

// ---------------------------------------------------------------------------
// Footer.
// ---------------------------------------------------------------------------
export type Social = { id: "github" | "linkedin" | "x"; label: string; href: string };

export const socials: Social[] = [
  { id: "github", label: "GitHub", href: "https://github.com/dcyfr" },
  { id: "linkedin", label: "LinkedIn", href: "https://linkedin.com/in/dcyfr" },
  { id: "x", label: "X", href: "https://x.com/dcyfr_" },
];

export const footer = {
  signoff: "Think freely, build securely, ship boldly",
};
