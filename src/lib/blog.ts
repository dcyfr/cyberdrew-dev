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
  slug:string;
  excerpt: string;
  tags: string[];
  content: string;
  draft?: boolean;
  featureImage?: string;
  sharedTags?: number;
  relevanceScore?: number;
}

interface Frontmatter {
  title?: string;
  date?: string;
  excerpt?: string;
  tags?: string[];
  draft?: boolean;
  featureImage?: string;
}

// Calculate reading time from markdown content
function calculateReadingTime(markdown: string): string {
  const wordsPerMinute = 225;
  const words = markdown.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
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
        frontmatter.draft = value === 'false' ? false : true;
      } else if (key === 'title' || key === 'date' || key === 'excerpt' || key === 'featureImage') {
        (frontmatter as { [k: string]: string })[key] = value;
      }
    }
  });

  return { frontmatter, markdown };
}

// --- MARKDOWN RENDERING WITH MARKDOWN-IT ---
import { formatDate } from "./utils";
import { sanitizeHtml } from "./security";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/devibeans.min.css";

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

function markdownToHtml(markdown: string): string {
  return md.render(markdown);
}

// Get blog post by slug
export function getBlogPost(slug: string): BlogPost | null {
  const markdownContent = blogPosts[slug];
  if (!markdownContent) return null;

  const { frontmatter, markdown } = parseFrontmatter(markdownContent);
  const content = sanitizeHtml(markdownToHtml(markdown));
  const readTime = calculateReadingTime(markdown);

  return {
    title: frontmatter.title || '',
    date: frontmatter.date ? formatDate(frontmatter.date) : '',
    readTime,
    slug, // always use the filename slug for routing
    excerpt: frontmatter.excerpt || '',
    tags: frontmatter.tags || [],
    content,
    draft: frontmatter.draft !== false, // Default to true if not specified
    featureImage: frontmatter.featureImage || ''
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

// Get related posts
export function getRelatedPosts(currentPost: BlogPost, maxPosts: number = 3): BlogPost[] {
  const allPosts = getAllBlogPosts();
  
  const relatedPosts = allPosts
    .filter(post => post.slug !== currentPost.slug)
    .map(post => {
      const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag)).length;
      const tagRelevanceScore = sharedTags / Math.max(currentPost.tags.length, post.tags.length);
      
      const exactTagMatches = post.tags.filter(tag => currentPost.tags.includes(tag));
      const hasHighValueTags = exactTagMatches.some(tag => 
        ['cybersecurity', 'security', 'zero trust', 'architecture'].includes(tag.toLowerCase())
      );
      
      const finalScore = tagRelevanceScore + (hasHighValueTags ? 0.2 : 0);
      
      return {
        ...post,
        sharedTags,
        relevanceScore: finalScore
      };
    })
    .filter(post => post.sharedTags > 0)
    .sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0))
    .slice(0, maxPosts);

  return relatedPosts;
}
