import MarkdownIt from "markdown-it";
// Use highlight.js core with a minimal language set
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import markdownLang from "highlight.js/lib/languages/markdown";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("markdown", markdownLang);
hljs.registerLanguage("yaml", yaml);

// Lazily load the highlight.js CSS theme only when needed
let highlightCssPromise: Promise<unknown> | null = null;
function ensureHighlightCssLoaded() {
  if (!highlightCssPromise && typeof window !== 'undefined') {
    highlightCssPromise = import("highlight.js/styles/devibeans.min.css");
  }
}

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</code></pre>';
      } catch (error) {
        console.error("Error highlighting code:", error);
      }
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

export function renderMarkdownToHtml(markdown: string): string {
  // If markdown likely contains code fences, lazy-load the highlight theme CSS
  if (markdown.includes("```") || /\n\s{4,}\S/.test(markdown)) {
    ensureHighlightCssLoaded();
  }
  return md.render(markdown);
}
