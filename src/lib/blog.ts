// Blog post interface
export interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  slug: string;
  excerpt: string;
  tags: string[];
  content: string;
}

// Parse frontmatter from markdown content
function parseFrontmatter(content: string): { frontmatter: any; markdown: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, markdown: content };
  }

  const frontmatterText = match[1];
  const markdown = content.replace(frontmatterRegex, '');
  
  // Simple YAML parser for frontmatter
  const frontmatter: any = {};
  frontmatterText.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim();
      let value = line.substring(colonIndex + 1).trim();
      
      // Remove quotes if present
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.slice(1, -1);
      }
      
      // Handle arrays (tags)
      if (value.startsWith('[') && value.endsWith(']')) {
        frontmatter[key] = value.slice(1, -1).split(',').map(item => item.trim().replace(/"/g, ''));
      } else {
        frontmatter[key] = value;
      }
    }
  });

  return { frontmatter, markdown };
}

// Convert markdown to HTML (basic implementation)
function markdownToHtml(markdown: string): string {
  return markdown
    // Headers
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    // Paragraphs
    .replace(/^\s*(.+)$/gim, '<p>$1</p>')
    // Lists
    .replace(/^\s*- (.+)$/gim, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)/gims, '<ul>$1</ul>')
    .replace(/^\s*\d+\. (.+)$/gim, '<li>$1</li>')
    // Clean up multiple tags
    .replace(/<\/ul>\s*<ul>/gim, '')
    .replace(/<\/p>\s*<p>/gim, '</p><p>')
    // Remove empty paragraphs
    .replace(/<p><\/p>/gim, '')
    .replace(/<p><h/gim, '<h')
    .replace(/<\/h([1-6])><\/p>/gim, '</h$1>');
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
    slug: frontmatter.slug || slug,
    excerpt: frontmatter.excerpt || '',
    tags: frontmatter.tags || [],
    content
  };
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  return Object.keys(blogPosts).map(slug => getBlogPost(slug)).filter(Boolean) as BlogPost[];
}

// Get all unique tags
export function getAllTags(): string[] {
  const allTags = getAllBlogPosts().flatMap(post => post.tags);
  return [...new Set(allTags)];
}