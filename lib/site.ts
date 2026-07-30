// ---------------------------------------------------------------------------
// cyberdrew.dev — content model. Single source of truth for copy and links.
//
// Sourcing note: every figure below is drawn from the real workspace
// (scripts/rei-daemon/think.sh, cost-ledger.sh, the watchdog rules) or from
// nexus/context/user/about-me.md. Nothing here is invented flavour. If a
// number changes in the system, change it here.
// ---------------------------------------------------------------------------

export const person = {
  name: "Drew",
  callsign: "cyberdrew",
  domain: "cyberdrew.dev",
  email: "hello@cyberdrew.dev",
  cal: "https://cal.com/dcyfr/intro",
  // Sentence-case, no title-stacking — the roles read as one line of mono.
  roles: [
    { role: "Founding Architect", org: "DCYFR Labs", href: "https://www.dcyfr.ai" },
    { role: "Principal Security Engineer", org: "Monks", href: null },
    { role: "Head of AI", org: "GameShark Labs", href: "https://gamesharklabs.com" },
  ],
} as const;

// ---------------------------------------------------------------------------
// Hero — the statement. Silhouette test: this has to work as black on red.
// ---------------------------------------------------------------------------
export const hero = {
  status: "fleet running",
  headline: ["Agents that act.", "Rails that hold."],
  deck:
    "I'm Drew — a security architect who builds autonomous AI systems that take real actions in production, and the guardrails that make that a safe bet.",
  primary: { label: "Work with me", href: "#work-with-me" },
  secondary: { label: "See how it runs", href: "#loop" },
} as const;

// ---------------------------------------------------------------------------
// Ledger — the full-bleed proof band. Mono, tabular, accent on the value only.
// ---------------------------------------------------------------------------
export type Stat = { value: string; unit?: string; label: string };

export const ledger: Stat[] = [
  { value: "30", unit: "+", label: "agents on a 30-minute loop" },
  { value: "6", unit: "yrs", label: "security engineering" },
  { value: "$0", label: "default inference spend" },
  { value: "0", label: "secrets reaching a prompt" },
];

// ---------------------------------------------------------------------------
// The loop — sticky sequence centrepiece. This is the system acting on its
// own: five named states, each with the guardrail that governs it.
// ---------------------------------------------------------------------------
export type LoopStep = {
  id: string;
  num: string;
  name: string;
  tier: string;
  desc: string;
  guard: string;
};

export const loop = {
  eyebrow: "The loop",
  headline: "The fleet doesn't wait to be asked.",
  deck:
    "Every thirty minutes it wakes, reads its own state, picks work off the queue, and writes down what it learned. Five states, each with something that can stop it.",
  steps: [
    {
      id: "observe",
      num: "01",
      name: "Observe",
      tier: "no model",
      desc: "Reads the workspace as it actually is — services, queues, git state, what the last cycle left behind.",
      guard: "Restricted paths never enter context: message stores, journals, backups.",
    },
    {
      id: "triage",
      num: "02",
      name: "Triage",
      tier: "tier-0 · local",
      desc: "Sorts signal from noise on a local model. Most cycles end here, and that is the point.",
      guard: "Local-first routing. Frontier tiers cost money, so they have to be earned.",
    },
    {
      id: "think",
      num: "03",
      name: "Think",
      tier: "tier-3 · frontier",
      desc: "Only what survived triage gets a frontier model. It plans, decomposes, and commits to an action.",
      guard: "A metacognition breaker halts any agent spinning past six unproductive cycles.",
    },
    {
      id: "act",
      num: "04",
      name: "Act",
      tier: "sandboxed",
      desc: "Takes the action for real — opens the PR, restores the service, publishes the brief.",
      guard: "Allowlisted binaries only. No metacharacters, no pipe to rm, no private-IP fetches.",
    },
    {
      id: "record",
      num: "05",
      name: "Record",
      tier: "append-only",
      desc: "Writes the outcome to a ledger it will read next cycle. The log is the memory.",
      guard: "Writes confined to two directories. Everything else is read-only to the daemon.",
    },
  ] as LoopStep[],
};

// ---------------------------------------------------------------------------
// Envelope — the guardrails, as a log. Autonomy is only as good as the thing
// that can stop it. Rendered as hairline data rows, not marketing cards.
// ---------------------------------------------------------------------------
export type Guard = { name: string; value: string; desc: string };

export const envelope = {
  eyebrow: "The envelope",
  headline: "Anything that can act can be stopped.",
  deck:
    "Autonomy is a claim about what happens when nobody is watching. These are the controls that make the claim checkable.",
  guards: [
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
// Selected work.
// ---------------------------------------------------------------------------
export type WorkItem = {
  num: string;
  title: string;
  href: string;
  desc: string;
  tags: string[];
  status: { label: string; kind: "live" | "open" };
};

export const work = {
  eyebrow: "Selected work",
  headline: "Four things worth showing.",
  items: [
    {
      num: "01",
      title: "@dcyfr/ai",
      href: "https://www.dcyfr.ai/ai",
      desc: "The portable TypeScript runtime the fleet thinks in — model routing across local and frontier tiers, tool-use, and MCP wiring you drop into an existing project.",
      tags: ["Agent runtime", "TypeScript", "MCP"],
      status: { label: "Open source", kind: "open" },
    },
    {
      num: "02",
      title: "Governance & safety rails",
      href: "https://www.dcyfr.ai/about",
      desc: "The controls above, as a reusable layer: sandboxes, kill switches, per-process credentials, enforced spend gates. The part most agent stacks skip.",
      tags: ["AI safety", "Sandboxing", "Policy"],
      status: { label: "In production", kind: "live" },
    },
    {
      num: "03",
      title: "The agent fleet",
      href: "https://github.com/dcyfr-labs",
      desc: "Thirty-odd daemons on a shared substrate — research, code review, monitoring, self-healing — running unsupervised on a local-first model stack under a hard budget.",
      tags: ["Multi-agent", "Local-first", "Self-healing"],
      status: { label: "Running", kind: "live" },
    },
    {
      num: "04",
      title: "SharkVault",
      href: "https://sharkvault.gamesharklabs.com",
      desc: "Proof the fleet ships product and not just diffs: a backer-funded consumer app taken end to end — auth, payments, content pipeline — largely by agents.",
      tags: ["Autonomous delivery", "Next.js", "Product"],
      status: { label: "Live", kind: "live" },
    },
  ] as WorkItem[],
};

// ---------------------------------------------------------------------------
// Offer.
// ---------------------------------------------------------------------------
export type OfferModel = { num: string; title: string; desc: string; fit: string };

export const offer = {
  eyebrow: "Work with me",
  headline: "Ship autonomy you can defend.",
  deck:
    "I work with teams putting agents into production — from a first safe agent to a governed fleet. Security architecture is the through-line, not an afterthought.",
  models: [
    {
      num: "01",
      title: "Fractional builds",
      desc: "I embed and build the system end to end — runtime, agents, guardrails — then hand over something your team can actually operate.",
      fit: "Best when you have the mandate but not the pattern.",
    },
    {
      num: "02",
      title: "Safe-autonomy audits",
      desc: "You already have agents that can take actions. I pressure-test the sandboxing, permissions, credential paths, and spend controls before they cost you.",
      fit: "Best before a launch, a funding round, or an assessment.",
    },
    {
      num: "03",
      title: "Advisory",
      desc: "Standing help pointing the team at the frontier without the footguns — architecture, model routing, safety posture, and what is genuinely worth automating.",
      fit: "Best when the strategy is the bottleneck.",
    },
  ] as OfferModel[],
  cta: { label: "Book an intro call", href: person.cal },
  alt: { label: `Or email ${person.email}`, href: `mailto:${person.email}` },
};

// ---------------------------------------------------------------------------
// Writing. Canonical home is dcyfr.ai/blog.
// ---------------------------------------------------------------------------
export type Post = { num: string; title: string; kind: string; date: string; href: string };

export const writing = {
  eyebrow: "Writing",
  headline: "Notes from the build.",
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
// Footer.
// ---------------------------------------------------------------------------
export type Social = { label: string; href: string };

export const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/dcyfr" },
  { label: "X", href: "https://x.com/dcyfr_" },
  { label: "LinkedIn", href: "https://linkedin.com/in/dcyfr" },
  { label: "dev.to", href: "https://dev.to/dcyfr" },
];

export const footer = {
  signoff: "Think freely, build securely, ship boldly.",
  nav: [
    { label: "The loop", href: "#loop" },
    { label: "The envelope", href: "#envelope" },
    { label: "Work", href: "#work" },
    { label: "Work with me", href: "#work-with-me" },
    { label: "Writing", href: "#writing" },
  ],
};
