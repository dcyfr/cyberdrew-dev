import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content to prevent XSS attacks while preserving safe markdown-generated elements
 */
export function sanitizeHtml(html: string): string {
  // Configure DOMPurify to allow safe HTML elements commonly used in markdown
  const config = {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'hr', 'strong', 'em', 'u', 'del', 's',
      'a', 'img', 'ul', 'ol', 'li',
      'blockquote', 'pre', 'code',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'div', 'span'
    ],
    ALLOWED_ATTR: [
      'href', 'title', 'alt', 'src', 'width', 'height',
      'class', 'id', 'target', 'rel'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+. -]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'object', 'embed', 'iframe', 'form', 'input', 'textarea', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'onchange', 'onsubmit']
  };

  // Sanitize the HTML
  const sanitized = DOMPurify.sanitize(html, config);
  
  // Add security attributes to external links and ensure they open in new tabs
  return sanitized.replace(
    /<a\s+([^>]*href=["']https?:\/\/[^"']*["'][^>]*)>/gi,
    (match, attrs) => {
      let newAttrs = attrs;
      // Ensure rel attribute
      if (!/rel\s*=/.test(newAttrs)) {
        newAttrs += ' rel="noopener noreferrer"';
      }
      // Ensure target attribute
      if (!/target\s*=/.test(newAttrs)) {
        newAttrs += ' target="_blank"';
      }
      return `<a ${newAttrs}>`;
    }
  );
}

/**
 * Validates and sanitizes user input for search queries
 */
export function sanitizeSearchInput(input: string): string {
  return input.trim().replace(/[<>"'&]/g, '');
}
