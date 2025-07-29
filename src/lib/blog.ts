// Import blog post markdown files
const blogPostModules = import.meta.glob('/src/content/blog/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
});

// Create blogPosts object from imported modules
const blogPosts: Record<string, string> = {};
Object.entries(blogPostModules).forEach(([path, content]) => {
  const slug = path.split('/').pop()?.replace('.md', '') || '';
  blogPosts[slug] = content as string;
});

// Blog post interface
export interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  slug: string;
  excerpt: string;
  tags: string[];
  content: string;
  draft?: boolean;
}

interface Frontmatter {
  title?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: Frontmatter; markdown: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, markdown: content };
  }

  const frontmatterText = match[1];
  const markdown = content.replace(frontmatterRegex, '');
  
  // Simple YAML parser for frontmatter
  const frontmatter: Frontmatter = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      if (key === 'tags') {
        if (value.startsWith('[') && value.endsWith(']')) {
          frontmatter.tags = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
        } else {
          frontmatter.tags = [value]; // Assume single tag if not array format
        }
      } else if (key === 'draft') {
        frontmatter.draft = value === 'true';
      } else if (key === 'title' || key === 'date' || key === 'readTime' || key === 'excerpt') {
        (frontmatter as { [k: string]: string })[key] = value;
      }
    }
  });

  return { frontmatter, markdown };
}

// --- MARKDOWN RENDERING WITH MARKDOWN-IT ---
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css"; // You can change the theme

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
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

function markdownToHtml(markdown: string): string {
  return md.render(markdown);
}

// Get blog post by slug
export function getBlogPost(slug: string): BlogPost | null {
  const markdownContent = blogPosts[slug];
  if (!markdownContent) return null;

  const { frontmatter, markdown } = parseFrontmatter(markdownContent);
  const content = markdownToHtml(markdown);

  return {
    title: frontmatter.title || '',
    date: frontmatter.date || '',
    readTime: frontmatter.readTime || '',
    slug, // always use the filename slug for routing
    excerpt: frontmatter.excerpt || '',
    tags: frontmatter.tags || [],
    content,
    draft: frontmatter.draft || false
  };
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  const isDev = import.meta.env?.MODE === 'development' || process.env.NODE_ENV === 'development';
  return Object.keys(blogPosts)
    .map(slug => getBlogPost(slug))
    .filter((post): post is BlogPost => !!post && (isDev || !post.draft));
}

// Get all unique tags
export function getAllTags(): string[] {
  const allTags = getAllBlogPosts().flatMap(post => post.tags);
  return [...new Set(allTags)];
}
