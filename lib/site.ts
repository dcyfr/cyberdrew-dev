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
    "I'm Drew, a security architect. I build autonomous AI systems that take real actions in production, and the guardrails that make that a safe bet.",
  roles: [
    { role: "Founder", org: "DCYFR Labs", href: "https://www.dcyfr.ai" },
    { role: "Head of AI", org: "GameShark Labs", href: "https://gamesharklabs.com" },
    { role: "Principal Security Engineer", org: "Monks", href: "https://www.monks.com/" },
  ],
  primary: { label: "See my work", href: "#work" },
  secondary: { label: "Work with me", href: "#contact" },
} as const;

// ---------------------------------------------------------------------------
// Work.
// ---------------------------------------------------------------------------
export type WorkItem = {
  num: string;
  title: string;
  href: string;
  desc: string;
  tags: string[];
  status: string;
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
      status: "Open source",
    },
    {
      num: "02",
      title: "The agentic fleet",
      href: "https://www.dcyfr.ai/about",
      desc: "Thirty-odd daemons on a shared substrate, spanning research, code review, monitoring, and self-healing. Runs autonomously on a local-first model stack under a hard budget.",
      tags: ["Multi-agent", "Local-first", "Self-healing"],
      status: "Running",
    },
    {
      num: "03",
      title: "SharkVault",
      href: "https://sharkvault.gamesharklabs.com",
      desc: "Proof the fleet ships product and not just diffs: a backer-funded consumer app taken end to end, from auth to payments to content pipeline, largely by agents.",
      tags: ["Autonomous delivery", "Next.js", "Product"],
      status: "Live",
    },
  ] as WorkItem[],
};

// ---------------------------------------------------------------------------
// Writing. Canonical home is dcyfr.ai/blog.
// ---------------------------------------------------------------------------
export type Post = { num: string; title: string; kind: string; date: string; href: string };

export const writing = {
  eyebrow: "Writing", index: "02",
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
export const contact = {
  eyebrow: "Contact", index: "03",
  headline: "Ship autonomy you can defend",
  deck:
    "I work with teams putting agents into production: a first safe agent, a governed fleet, or a hard look at what you already run.",
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
