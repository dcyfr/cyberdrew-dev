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

// Blog posts data
const blogPosts: Record<string, string> = {
  "implementing-mfa-security-best-practices": `---
title: "Implementing Multi-Factor Authentication: Security Best Practices"
date: "April 16, 2025"
readTime: "3 min read"
slug: "implementing-mfa-security-best-practices"
excerpt: "Learn how to implement MFA properly to protect your organization from credential-based attacks."
tags: ["Security", "Authentication", "Best Practices"]
---

Multi-Factor Authentication (MFA) has become a critical security control in today's threat landscape. With credential-based attacks accounting for over 80% of data breaches, implementing MFA properly can be the difference between a secure organization and a compromised one.

## Understanding MFA Fundamentals

MFA works on three fundamental authentication factors:

- **Something you know** (passwords, PINs)
- **Something you have** (phones, tokens, smart cards)
- **Something you are** (biometrics, behavioral patterns)

The key to effective MFA is combining at least two of these factors to create a security barrier that's exponentially harder to breach than single-factor authentication.

## Choosing the Right MFA Methods

### Hardware Security Keys

Hardware tokens like YubiKeys provide the highest security level. They're resistant to phishing attacks and don't rely on network connectivity. Consider these for:

- Administrative accounts
- High-privilege users
- Remote workers in high-risk environments

### Authenticator Apps

Time-based One-Time Passwords (TOTP) through apps like Google Authenticator or Authy offer a good balance of security and usability. They work offline and are less susceptible to SIM swapping attacks than SMS.

## Implementation Strategy

### Phase 1: Risk Assessment

Start by identifying your most critical assets and users. Prioritize MFA deployment for:

- Administrative accounts
- Financial systems access
- Customer data repositories
- Remote access solutions

### Phase 2: Pilot Program

Begin with a small group of tech-savvy users to test the chosen MFA solution and develop support procedures.

### Phase 3: Gradual Rollout

Deploy MFA in waves, starting with the highest-risk accounts and gradually expanding to all users.`,

  "securing-remote-work-enterprise-guide": `---
title: "Securing Remote Work: An Enterprise Security Guide"
date: "March 21, 2025"
readTime: "6 min read"
slug: "securing-remote-work-enterprise-guide"
excerpt: "Essential strategies for protecting distributed workforces while maintaining productivity."
tags: ["Remote Work", "Enterprise Security", "Zero Trust"]
---

The shift to remote work has fundamentally changed the security landscape. Organizations must now protect distributed workforces while maintaining productivity and user experience.

## Zero Trust for Remote Work

Implementing Zero Trust principles is essential for remote work security:

- Never trust, always verify
- Least privilege access
- Continuous monitoring

## Endpoint Security

Securing remote endpoints requires:

- Endpoint Detection and Response (EDR)
- Device encryption
- Regular security updates
- VPN solutions

## Best Practices

Key strategies for remote work security include comprehensive training, regular security assessments, and implementing proper access controls.`,

  "zero-trust-architecture-fundamentals": `---
title: "Zero Trust Architecture: Fundamentals and Implementation"
date: "February 11, 2025"
readTime: "3 min read"
slug: "zero-trust-architecture-fundamentals"
excerpt: "Understanding the fundamental shift from perimeter-based security to Zero Trust architecture."
tags: ["Zero Trust", "Architecture", "Security"]
---

Zero Trust architecture represents a fundamental shift from traditional perimeter-based security to a model where trust is never assumed and verification is required from everyone trying to access resources.

## Core Principles

Zero Trust is built on several key principles:

- **Never trust, always verify** - Every user and device must be authenticated and authorized
- **Least privilege access** - Users get only the minimum access needed
- **Assume breach** - Design systems assuming attackers are already inside

## Implementation Components

A successful Zero Trust implementation includes:

- Identity and Access Management (IAM)
- Multi-Factor Authentication (MFA)
- Network segmentation
- Continuous monitoring

## Getting Started

Begin your Zero Trust journey by inventorying your assets, mapping data flows, and implementing strong identity controls.`,

  "getting-started-with-cybersecurity": `---
title: "Getting Started with Cybersecurity: A Beginner's Guide"
date: "January 6, 2025"
readTime: "2 min read"
slug: "getting-started-with-cybersecurity"
excerpt: "Your guide to understanding cybersecurity fundamentals and starting your career journey."
tags: ["Beginner", "Career", "Fundamentals"]
---

Cybersecurity is one of the fastest-growing fields in technology, offering diverse career paths and excellent job security. This guide will help you understand the fundamentals and start your journey.

## What is Cybersecurity?

Cybersecurity involves protecting digital systems, networks, and data from cyber threats. It encompasses:

- Information security
- Network security
- Application security
- Operational security

## Common Threats

Understanding common cyber threats is essential:

- **Malware** - Viruses, ransomware, trojans
- **Phishing** - Fraudulent emails and websites
- **Social engineering** - Manipulating people to reveal information
- **Data breaches** - Unauthorized access to sensitive data

## Getting Started

To begin your cybersecurity journey:

1. Learn the fundamentals
2. Get hands-on experience
3. Pursue relevant certifications
4. Network with professionals

## Career Paths

Cybersecurity offers diverse career opportunities including security analyst, penetration tester, security architect, and incident response specialist.`
};

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