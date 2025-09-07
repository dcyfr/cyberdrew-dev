---
date: "January 1, 2020"
title: "Markdown Demo"
slug: "markdown-demo"
excerpt: "A demonstration of supported markdown and formatting features such as code blocks, lists, etc."
tags: ["markdown", "guides", "reference"]
featureImage: "/placeholder_light.webp"
[//]: # (draft: "true")
---

## Frontmatter Options

```markdown
date: "2020-01-01" # Required
title: "Post Title" # Required
excerpt: "A brief summary of the article." # Required
slug: "post-slug" # Required
[//]: # (tags: ["tag1", "tag2", "tag3"]) # Optional, adds filtering
[//]: # (draft: "true") # Optional, defaults to true (draft mode)
[//]: # (featureImage: "/path/to/image.webp") # Optional, adds featured image elements
```

## Paragraphs

These are paragraphs. They can contain **bold text**, *italic text*, ~~strikethrough text~~, and `inline code`.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Links

Links can be created using square brackets and parentheses:

```markdown
[Homepage](/)
[Articles](/blog)
```

[Homepage](/)
[Articles](/blog)

## Lists

Lists can be unordered or ordered.

### Unordered List

Unordered lists can be created using dashes, asterisks, or plus signs:

```markdown
* Item 1
- Item 2
  + Subitem 2.1
  + Subitem 2.2
```

* Item 1
- Item 2
  + Subitem 2.1
  + Subitem 2.2

### Ordered List

Ordered lists are created using numbers:

```markdown
1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2
```

1. Item 1
2. Item 2
   1. Subitem 2.1
   2. Subitem 2.2

## Blockquotes

Blockquotes can be used to highlight important information or quotes:

```markdown
> This is a blockquote.
>
> It can span multiple lines.
```

> This is a blockquote.
>
> It can span multiple lines.

## Images

Images can be embedded using the same syntax as links, but with an exclamation mark at the beginning:

```markdown
![Site Logo](/dcyfr.webp)
```

![Site Logo](/dcyfr.webp)