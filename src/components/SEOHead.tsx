import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SECURITY_META_TAGS } from "@/lib/security-headers";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export const SEOHead = ({
  title = "Drew's Lab - Cybersecurity Expert & Developer",
  description = "Cybersecurity expert specializing in security architecture, threat analysis, and secure development practices.",
  keywords = "cybersecurity, security architecture, threat analysis, zero trust, MFA, enterprise security",
  ogImage = "/og-image.jpg",
  canonicalUrl
}: SEOHeadProps) => {
  const location = useLocation();
  const baseUrl = "https://cyberdrew-dev.com";
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Update meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', keywords);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'keywords';
      newMeta.content = keywords;
      document.head.appendChild(newMeta);
    }

    // Apply security meta tags
    SECURITY_META_TAGS.forEach(tag => {
      const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[http-equiv="${tag['http-equiv']}"]`;
      const existingTag = document.querySelector(selector);
      
      if (!existingTag) {
        const metaTag = document.createElement('meta');
        Object.entries(tag).forEach(([key, value]) => {
          metaTag.setAttribute(key, value);
        });
        document.head.appendChild(metaTag);
      }
    });

    // Update Open Graph tags
    const updateMetaProperty = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:url', fullUrl);
    updateMetaProperty('og:type', 'website');
    updateMetaProperty('og:site_name', "Drew's Lab");

    // Update Twitter Card tags
    const updateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateTwitterMeta('twitter:card', 'summary_large_image');
    updateTwitterMeta('twitter:title', title);
    updateTwitterMeta('twitter:description', description);
    updateTwitterMeta('twitter:image', ogImage);

    // Update canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullUrl);

    // Add security-related links
    const securityLinks = [
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
    ];

    securityLinks.forEach(({ rel, href, crossorigin }) => {
      if (!document.querySelector(`link[rel="${rel}"][href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = rel;
        link.href = href;
        if (crossorigin) link.setAttribute('crossorigin', crossorigin);
        document.head.appendChild(link);
      }
    });

  }, [title, description, keywords, ogImage, fullUrl]);

  return null;
};