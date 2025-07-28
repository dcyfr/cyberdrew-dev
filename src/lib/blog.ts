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
}

interface Frontmatter {
  title?: string;
  date?: string;
  readTime?: string;
  excerpt?: string;
  tags?: string[];
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
      } else if (key === 'title' || key === 'date' || key === 'readTime' || key === 'excerpt') {
        (frontmatter as { [k: string]: string })[key] = value;
      }
    }
  });

  return { frontmatter, markdown };
}

// Enhanced markdown to HTML converter with better formatting
function markdownToHtml(markdown: string): string {
  let html = markdown;
  
  // Code blocks (before other formatting)
  html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, (match, language, code) => {
    const lang = language || 'text';
    return `<pre class="bg-muted rounded-lg p-4 mb-6 overflow-x-auto border"><code class="text-sm font-mono text-foreground whitespace-pre language-${lang}">${code.trim()}</code></pre>`;
  });
  
  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-muted px-2 py-1 rounded text-sm font-mono text-foreground">$1</code>');
  
  // Headers with better styling
  html = html.replace(/^#### (.*$)/gim, '<h4 class="text-lg font-semibold text-foreground mb-3 mt-6">$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold text-foreground mb-4 mt-8">$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold text-foreground mb-6 mt-10 pb-2 border-b border-border">$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold text-foreground mb-8 mt-12">$1</h1>');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Bold and italic
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');
  
  // Blockquotes
  html = html.replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-primary pl-4 py-2 my-6 bg-muted/50 rounded-r-lg italic text-muted-foreground">$1</blockquote>');
  
  // Lists - improved handling for both - and * formats
  html = html.replace(/^[*-] (.*$)/gim, '<li class="mb-2 text-foreground leading-[1.7]">$1</li>');
  html = html.replace(/^(\d+)\. (.*$)/gim, '<li class="mb-2 text-foreground leading-[1.7]">$2</li>');
  
  // Wrap consecutive list items in proper list tags
  html = html.replace(/(<li class="mb-2 text-foreground leading-\[1\.7\]">.*?<\/li>\s*)+/gs, (match) => {
    // Check if any of the original lines were numbered
    const listItems: string[] = match.match(/<li[^>]*>(.*?)<\/li>/gs) || [];
    const originalLines = markdown.split('\n').filter(line => {
      const trimmed = line.trim();
      const isListItem = trimmed.match(/^[*-+\d.]\s/);
      if (!isListItem) return false;
      
      const contentWithoutMarker = trimmed.replace(/^[*-+\d.]\s/, '').trim();
      return listItems.some((li: string) => li.includes(contentWithoutMarker));
    });
    const isNumbered = originalLines.some(line => line.trim().match(/^\d+\./));
    
    const listType = isNumbered ? 'ol' : 'ul';
    const listClass = isNumbered ? 'list-decimal ml-6 mb-6 space-y-2' : 'list-disc ml-6 mb-6 space-y-2';
    return `<${listType} class="${listClass}">${match}</${listType}>`;
  });
  
  // Horizontal rules
  html = html.replace(/^---$/gim, '<hr class="border-border my-8">');
  
  // Paragraphs - be more careful about what we wrap
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed || 
        trimmed.startsWith('<') || 
        trimmed.startsWith('```') ||
        /^#{1,6}\s/.test(trimmed) ||
        /^[*-+]\s/.test(trimmed) ||
        /^\d+\.\s/.test(trimmed) ||
        trimmed === '---') {
      return line;
    }
    return `<p class="text-foreground mb-6 leading-[1.7] text-[15px]">${trimmed}</p>`;
  });
  
  html = processedLines.join('\n');
  
  // Clean up empty paragraphs and fix spacing
  html = html.replace(/<p class="text-foreground mb-6 leading-\[1\.7\] text-\[15px\]"><\/p>/g, '');
  html = html.replace(/\n\s*\n/g, '\n');
  
  return html;
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
