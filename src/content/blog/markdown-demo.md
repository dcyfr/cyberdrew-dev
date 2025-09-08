---
date: "January 1, 2020"
title: "Markdown Demo"
slug: "markdown-demo"
excerpt: "A demonstration of supported markdown and formatting features such as code blocks, lists, etc."
tags: ["markdown", "guides", "reference"]
featureImage: "/placeholder_light.webp"
[//]: # (draft: "true")
---

## Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Paragraphs and line breaks

End a line with two spaces to create a line break:

````markdown
First line with two spaces at the end··
Second line starts here.
````

First line with two spaces at the end  
Second line starts here.

## Emphasis

```markdown
Bold with **asterisks** or __underscores__
Italic with *asterisks* or _underscores_
Bold and italic with ***three asterisks***
Inline code with `backticks`
```

Bold with **asterisks** or __underscores__

Italic with *asterisks* or _underscores_

Bold and italic with ***three asterisks***

Inline code with `backticks`

## Blockquotes

```markdown
> Dorothy followed her through many of the beautiful rooms in her castle.
```

> Dorothy followed her through many of the beautiful rooms in her castle.

## Lists

### Unordered lists

You can use dashes (-), asterisks (*), or plus signs (+):

```markdown
- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

* Item A
* Item B

+ Item X
+ Item Y
```

- Item 1
- Item 2
  - Subitem 2.1
  - Subitem 2.2

* Item A
* Item B

+ Item X
+ Item Y

### Ordered lists

```markdown
1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
```

1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2

## Code

Inline code uses backticks: `console.log("Hello")`.

Fenced code blocks use triple backticks:

````markdown
```
This is a code block without syntax highlighting.
```
````

```
This is a code block without syntax highlighting.
```

Add a language identifier for highlighting:

````markdown
```javascript
function greet(name) {
  console.log(`Hello, ${name}!`)
}
greet('World')
```
````

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`)
}
greet('World')
```

## Horizontal rules

Use three or more hyphens, asterisks, or underscores:

```markdown
---
***
___
```

---
***
___

## Links

```markdown
[Homepage](/)
[Markdown Guide](https://www.markdownguide.org/basic-syntax/ "Basic Syntax")
```

[Homepage](/)
[Markdown Guide](https://www.markdownguide.org/basic-syntax/ "Basic Syntax")

## Images

```markdown
![Site Logo](/dcyfr.webp)
```

![Site Logo](/dcyfr.webp)

## Escaping characters

Use a backslash to show literal Markdown characters:

````markdown
\*This asterisk is literal, not italic.\*
````

\*This asterisk is literal, not italic.\*