// ---------------------------------------------------------------------------
// Site content — single source of truth for copy, links, and data.
// Edit here; components read from these exports.
// NOTE: several values below are INFERRED and should be confirmed before launch
// (github/dev.to handles, the fleet.stream sample telemetry + "30+ agents"
// figures, and post titles). See README "Before launch".
// ---------------------------------------------------------------------------

export const person = {
  name: "Drew",
  handle: "@dcyfr",
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
  { ch: "guard", before: "spend check — ", ok: "within budget" },
];

// ---------------------------------------------------------------------------
// Console — the hero product surface. A dispatch palette for the fleet: the
// launcher metaphor pointed at agents instead of apps.
// ---------------------------------------------------------------------------
export type Command = {
  ico: string;
  name: string;
  desc: string;
  keys: string[];
};

export const commands: Command[] = [
  { ico: "◇", name: "research", desc: "sweep sources, synthesize a brief", keys: ["⌘", "R"] },
  { ico: "◆", name: "review", desc: "gate a PR on the security checklist", keys: ["⌘", "G"] },
  { ico: "◈", name: "monitor", desc: "watch the fleet, escalate anomalies", keys: ["⌘", "M"] },
  { ico: "◉", name: "heal", desc: "restore a downed service, unattended", keys: ["⌘", "H"] },
  { ico: "▨", name: "ship", desc: "decompose a mission, run it to green", keys: ["⌘", "S"] },
];

// Typed into the console's search line, one after another.
export const dispatchQueries = [
  "dispatch an agent",
  "audit my agent permissions",
  "route this to a local model",
  "decompose and ship it",
] as const;

// ---------------------------------------------------------------------------
// Constraints — the marquee strip. These are the guarantees, not features.
// ---------------------------------------------------------------------------
export const constraints = [
  "local-first inference",
  "hard spend ceiling",
  "sandboxed tool-use",
  "kill-switchable senders",
  "per-process credentials",
  "metacognition circuit-breaker",
  "no secret ever in context",
  "self-healing watchdog",
] as const;

// ---------------------------------------------------------------------------
// Capabilities — the bento grid. What the fleet actually does all day.
// ---------------------------------------------------------------------------
export type Capability = {
  num: string;
  title: string;
  desc: string;
  state: string;
  span: "w3" | "w2";
};

export const capabilities: Capability[] = [
  {
    num: "30+",
    title: "Agents on a 30-minute loop",
    desc:
      "Observe, triage, think, act, record. The fleet wakes on a cycle, picks its own work off the queue, and writes down what it learned.",
    state: "running",
    span: "w3",
  },
  {
    num: "24/7",
    title: "Autonomy without a babysitter",
    desc:
      "Sandboxes, kill-switches and enforced spend gates mean it runs unsupervised — and stops itself before it costs you.",
    state: "governed",
    span: "w3",
  },
  {
    num: "$0",
    title: "Tier-0 by default",
    desc: "Local models first, frontier only when the task earns it.",
    state: "cost-gated",
    span: "w2",
  },
  {
    num: "6",
    title: "Cycles to give up",
    desc: "A metacognition breaker halts an agent that's spinning instead of shipping.",
    state: "self-aware",
    span: "w2",
  },
  {
    num: "0",
    title: "Secrets in context",
    desc: "Credentials resolve per-process at exec time. Nothing sensitive reaches a prompt.",
    state: "enforced",
    span: "w2",
  },
];

// ---------------------------------------------------------------------------
// Footer navigation.
// ---------------------------------------------------------------------------
export const footerNav = [
  {
    heading: "Work",
    items: [
      { label: "Selected work", href: "#work" },
      { label: "Work with me", href: "#work-with-me" },
      { label: "Writing", href: "#writing" },
    ],
  },
  {
    heading: "Elsewhere",
    items: [
      { label: "GitHub", href: "https://github.com/dcyfr", external: true },
      { label: "X", href: "https://x.com/dcyfr_", external: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/dcyfr", external: true },
    ],
  },
];

// ---------------------------------------------------------------------------
// Offer — the buyable "work with me" (confirm the exact services/wording).
// ---------------------------------------------------------------------------
export type OfferModel = { title: string; desc: string };

export const offer = {
  eyebrow: "Work with me",
  headline: "Ship autonomous AI you can trust.",
  pitch:
    "I build and secure autonomous AI systems for teams shipping to production — from your first safe agent to a governed fleet.",
  models: [
    {
      title: "Fractional builds",
      desc: "I embed and build your agentic systems end-to-end — the runtime, the agents, and the guardrails — then hand you something you can actually run.",
    },
    {
      title: "Safe-autonomy audits",
      desc: "You've got agents that can take actions. I pressure-test the sandboxing, permissions, and spend controls before they cost you — the OWASP-for-agents review, done right.",
    },
    {
      title: "Advisory",
      desc: "Ongoing help pointing your team at the agentic frontier without the footguns — architecture, model routing, safety, and what's actually worth automating.",
    },
  ] as OfferModel[],
};

