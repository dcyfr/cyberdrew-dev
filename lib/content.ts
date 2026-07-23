// ---------------------------------------------------------------------------
// Site content — single source of truth for copy, links, and data.
// Edit here; components read from these exports.
// NOTE: several values below are INFERRED and should be confirmed before launch
// (github/dev.to handles, the fleet.stream sample telemetry + "30+ agents"
// figures, and post titles). See README "Before launch".
// ---------------------------------------------------------------------------

export const person = {
  name: "Drew",
  handle: "@cyberdrew",
  domain: "cyberdrew.dev",
  email: "hello@cyberdrew.dev",
  cal: "https://cal.com/dcyfr/intro",
  roles: "Founder @ DCYFR Labs · Head of AI @ GameShark Labs · remote",
  eyebrow: "Security architect · autonomous AI you can trust",
} as const;

export type StatusKind = "live" | "open";
export type Status = { label: string; kind: StatusKind };
export type Tag = { label: string; hot?: boolean };

export type WorkItem = {
  num: string;
  title: string;
  href: string;
  external?: boolean;
  desc: string;
  tags: Tag[];
  status: Status;
};

export const work: WorkItem[] = [
  {
    num: "01",
    title: "DCYFR AI",
    href: "https://www.dcyfr.ai/ai",
    external: true,
    desc:
      "The portable TypeScript runtime my agents think in — model routing across local and frontier tiers, tool-use, and MCP wiring you drop into any project.",
    tags: [
      { label: "Agent runtime", hot: true },
      { label: "Tool-use" },
      { label: "MCP" },
      { label: "TypeScript" },
    ],
    status: { label: "Open", kind: "open" },
  },
  {
    num: "02",
    title: "Agent Governance & Safety",
    href: "https://www.dcyfr.ai/about",
    external: true,
    desc:
      "The rails that let agents take real actions without going off the rails — sandboxes, kill-switches, per-process credential isolation, and enforced spend limits. Autonomy you can trust.",
    tags: [
      { label: "AI safety", hot: true },
      { label: "Sandboxing" },
      { label: "Kill-switches" },
    ],
    status: { label: "Live", kind: "live" },
  },
  {
    num: "03",
    title: "Autonomous Agent Fleet",
    href: "https://github.com/dcyfr-labs",
    external: true,
    desc:
      "A governed swarm of AI daemons — research, code review, monitoring, self-healing — running a 30-minute cognitive loop on a local-first model stack, under a hard spend gate with metacognition to stop it spinning.",
    tags: [
      { label: "Multi-agent", hot: true },
      { label: "Local-first inference", hot: true },
      { label: "Self-healing" },
      { label: "Metacognition" },
    ],
    status: { label: "Running", kind: "live" },
  },
  {
    num: "04",
    title: "SharkVault",
    href: "https://sharkvault.gamesharklabs.com",
    external: true,
    desc:
      "Proof the fleet ships real product: a backer-funded consumer app taken end-to-end — auth, payments, content pipeline — largely by agents.",
    tags: [
      { label: "Autonomous delivery", hot: true },
      { label: "Product" },
      { label: "Next.js" },
    ],
    status: { label: "Live", kind: "live" },
  },
];

export type Venture = {
  kicker: string;
  title: string;
  href: string;
  desc: string;
  tags: string[];
};

export const ventures: Venture[] = [
  {
    kicker: "Founder",
    title: "DCYFR Labs",
    href: "https://dcyfr.ai",
    desc:
      "An AI-native studio building agentic infrastructure and security-first autonomy. Think freely, build securely, ship boldly.",
    tags: ["Agentic infra", "AI safety", "Autonomy"],
  },
  {
    kicker: "Head of AI",
    title: "GameShark Labs",
    href: "https://gamesharklabs.com",
    desc:
      "Putting frontier AI in front of players — generative tooling and agent-built products, shipped for real audiences.",
    tags: ["Applied AI", "Gaming", "Product"],
  },
];

export type Post = { num: string; title: string; meta: string; href: string };

export const writing: Post[] = [
  {
    num: "01",
    title: "What's New in @dcyfr/ai: The v3 Line",
    meta: "Release notes · Jun 2026",
    href: "https://www.dcyfr.ai/blog/whats-new-in-dcyfr-ai-v3",
  },
  {
    num: "02",
    title: "AI Assistants as Development Partners",
    meta: "AI workflows · Mar 2026",
    href: "https://www.dcyfr.ai/blog/ai-assistants-as-development-partners",
  },
  {
    num: "03",
    title: "OWASP Top 10 for Agentic AI",
    meta: "AI security · Dec 2025",
    href: "https://www.dcyfr.ai/blog/owasp-top-10-agentic-ai",
  },
  {
    num: "04",
    title: "Building with AI",
    meta: "Essay · Nov 2025",
    href: "https://www.dcyfr.ai/blog/building-with-ai",
  },
];

export type SocialLink = { label: string; href: string; external?: boolean };

export const socialLinks: SocialLink[] = [
  { label: "Book a 1:1", href: person.cal, external: true },
  { label: "Email", href: `mailto:${person.email}` },
  { label: "GitHub", href: "https://github.com/dcyfr", external: true },
  { label: "X", href: "https://x.com/dcyfr_", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/dcyfr", external: true },
  { label: "dev.to", href: "https://dev.to/dcyfr", external: true },
];

// Illustrative fleet telemetry — grounded in the real daemon architecture
// (cost-gated loop, self-heal, local-first stack, metacognition) but the
// specifics are sample data. Wire to a real feed or keep as designed flavor.
export type StreamEvent = { ch: string; before: string; ok?: string; after?: string };

export const streamEvents: StreamEvent[] = [
  { ch: "research", before: "sweep complete — ", ok: "4 sources", after: " synthesized" },
  { ch: "review", before: "PR approved — ", ok: "security gate passed" },
  { ch: "monitor", before: "anomaly cleared — ", ok: "all services nominal" },
  { ch: "plan", before: "mission decomposed — 6 subtasks queued" },
  { ch: "route", before: "tier-0 local model — ", ok: "$0.00", after: " spend" },
  { ch: "heal", before: "service restored — watchdog quiet" },
  { ch: "intel", before: "4-hour brief published to the garden" },
  { ch: "scan", before: "dependency CVE sweep — ", ok: "0 criticals" },
  { ch: "build", before: "daemon cycle complete — 3 tasks shipped" },
  { ch: "grade", before: "self-review passed — output accepted" },
  { ch: "ingest", before: "corpus updated — 218 new documents" },
  { ch: "guard", before: "spend check — ", ok: "under $100/mo gate" },
];
