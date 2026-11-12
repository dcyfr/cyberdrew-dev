import type { MetadataRoute } from "next";

/**
 * AI crawlers, named and allowed.
 *
 * The wildcard rule below already lets them in, so this group changes no
 * crawler's access. It is here because the policy should be written down and
 * not inferred: the site publishes /llms.txt for exactly these readers, and a
 * robots file that never mentions them leaves the question open.
 *
 * Three kinds are listed: crawlers that collect training data, crawlers that
 * build an AI search index, and agents that fetch a page because a person
 * asked. To refuse one, move it to its own group with `disallow: "/"`.
 */
const AI_AGENTS = [
  // OpenAI
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  // Perplexity
  "PerplexityBot",
  "Perplexity-User",
  // Opt-out tokens for model training, read by Google's and Apple's crawlers
  "Google-Extended",
  "Applebot-Extended",
  // Others
  "Amazonbot",
  "meta-externalagent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: AI_AGENTS, allow: "/" },
    ],
    sitemap: "https://www.cyberdrew.dev/sitemap.xml",
    host: "https://www.cyberdrew.dev",
  };
}
