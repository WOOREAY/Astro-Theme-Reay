# Project Structure

Understanding the codebase organization and file architecture.

## Directory Overview

```
Astro-Theme-Reay/
├── src/                    # Source code
│   ├── components/         # Reusable UI components
│   ├── content/           # Content collections (blog posts)
│   ├── data/              # Configuration files
│   ├── layouts/           # Page layout templates
│   ├── pages/             # Route pages (file-based routing)
│   ├── scripts/           # Client-side JavaScript
│   ├── styles/            # Global styles
│   ├── theme/             # Theme system
│   └── utils/             # Utility functions
├── public/                # Static assets (served as-is)
├── docs/                  # Documentation
├── astro.config.mjs       # Astro configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── uno.config.ts          # UnoCSS configuration
```

## Source Directory (`src/`)

### Components (`src/components/`)

Organized by feature/page:

```
components/
├── about/              # About page components
│   ├── AboutHeader.astro
│   ├── AboutIntro.astro
│   ├── EducationTimeline.astro
│   ├── ExperienceTimeline.astro
│   ├── InfoCard.astro
│   ├── SiteInfo.astro
│   └── SocialNetworks.astro
├── archives/           # Archive page components
│   ├── ArchiveStats.astro
│   ├── SeriesCard.astro
│   ├── TagCloud.astro
│   └── TimelineArchive.astro
├── blog/               # Blog components
│   ├── BlogListHeader.astro
│   ├── BlogTimeline.astro
│   ├── PostFooter.astro
│   ├── PostHeader.astro
│   ├── PostMeta.astro
│   └── TableOfContents.astro
├── common/             # Shared components
│   ├── Background.astro
│   ├── Container.astro
│   ├── Footer.astro
│   ├── Header.astro
│   ├── HeadMeta.astro
│   └── ThemeToggle.astro
├── home/               # Homepage components
│   ├── AboutSection.astro
│   ├── HeroSection.astro
│   ├── PostsSection.astro
│   └── ProjectsSection.astro
├── layout/             # Layout utilities
│   ├── FullPageSection.astro
│   └── PageScrollContainer.astro
├── links/              # Friend links components
│   ├── LinkCard.astro
│   ├── LinksCategoryTabs.astro
│   └── LinksHeader.astro
└── projects/           # Projects showcase
    ├── CategoryTabs.astro
    ├── ProjectCard.astro
    ├── ProjectDetailHeader.astro
    └── ReadmeContent.astro
```

**Component Naming Convention:**
- Feature-based organization (easier to find related components)
- PascalCase for all component files
- Descriptive names indicating purpose

### Content (`src/content/`)

Content Collections for type-safe content:

```
content/
├── config.ts           # Content collections schema
└── blog/              # Blog posts
    ├── example-post.md
    ├── another-post.md
    └── ...
```

**Blog Post Structure:**
```markdown
---
title: Post Title
description: Post description
publishDate: 2024-01-01
tags: ['tag1', 'tag2']
draft: false
---

Post content here...
```

See [Blog Frontmatter](./BLOG-FRONTMATTER.md) for complete reference.

### Data (`src/data/`)

Configuration files for the entire site:

```
data/
├── user.config.ts              # Personal information
├── theme.config.ts             # Theme colors and settings
├── markdown-style.config.ts    # Markdown rendering styles
├── markdown.config.ts          # Markdown plugins
├── projects.config.ts          # Projects showcase
├── links.config.ts             # Friend links
└── i18n.config.ts              # Internationalization
```

**Key Files:**
- **user.config.ts**: Your personal info, social links, bio
- **theme.config.ts**: Color scheme, primary colors
- **markdown-style.config.ts**: How all Markdown content renders
- **projects.config.ts**: GitHub projects to showcase
- **i18n.config.ts**: Translations for UI text

### Layouts (`src/layouts/`)

Page layout templates:

```
layouts/
├── base/
│   ├── BaseLayout.astro        # Minimal base layout
│   └── DefaultLayout.astro     # Standard layout with header/footer
├── home/
│   └── FullscreenLayout.astro  # Homepage fullscreen layout
├── blog/
│   ├── BlogListLayout.astro    # Blog list page
│   └── BlogPostLayout.astro    # Individual post
├── projects/
│   ├── ProjectsLayout.astro    # Projects list
│   └── ProjectDetailLayout.astro
├── about/
│   └── AboutLayout.astro
├── archives/
│   └── ArchivesLayout.astro
└── links/
    └── LinksLayout.astro
```

**Layout Hierarchy:**
```
BaseLayout (HTML structure)
  └── DefaultLayout (Header + Footer + Main)
      └── Specific layouts (Blog, Projects, etc.)
          └── Page content
```

### Pages (`src/pages/`)

File-based routing (file name = URL):

```
pages/
├── index.astro                 # Homepage (/)
├── blog/
│   ├── index.astro            # Blog list (/blog)
│   ├── [slug].astro           # Blog post (/blog/post-title)
│   └── tag/
│       └── [tag].astro        # Tag page (/blog/tag/javascript)
├── projects/
│   ├── index.astro            # Projects list (/projects)
│   └── [id].astro             # Project detail (/projects/project-name)
├── about/
│   └── index.astro            # About page (/about)
├── archives/
│   └── index.astro            # Archives (/archives)
├── links/
│   └── index.astro            # Links (/links)
└── rss.xml.ts                 # RSS feed (/rss.xml)
```

**Routing Examples:**
- `pages/blog/index.astro` → `/blog`
- `pages/blog/[slug].astro` → `/blog/my-post`
- `pages/projects/[id].astro` → `/projects/my-project`
- `pages/about/index.astro` → `/about`

### Scripts (`src/scripts/`)

Client-side JavaScript:

```
scripts/
├── animations/             # Animation effects
│   ├── typewriter-effect.ts
│   └── links-animation.ts
├── interactions/           # User interactions
│   ├── mobile-menu.ts
│   └── navigation-i18n.ts
├── navigation/             # Navigation handling
│   └── fullpage-scroll.ts
└── ui/                     # UI enhancements
    ├── theme-toggle.ts
    └── i18n-content-updater.ts
```

### Styles (`src/styles/`)

Global CSS and style utilities:

```
styles/
├── global.css              # Global styles
├── markdown.css            # Markdown content styles
└── themes/                 # Theme-specific styles
```

### Theme (`src/theme/`)

Material Design 3 theme system:

```
theme/
├── index.ts                # Main export
├── types.ts                # Type definitions
├── tokens.ts               # Design tokens
├── config.ts               # Theme configuration
├── generate.ts             # Color generation
└── css-vars.ts             # CSS variables
```

### Utils (`src/utils/`)

Helper functions and utilities:

```
utils/
├── blog.ts                     # Blog utilities
├── github.ts                   # GitHub API
├── github-cache.ts             # GitHub caching
├── markdown-style-generator.ts # Style generation
└── remark-reading-time.ts      # Reading time plugin
```

## Public Directory (`public/`)

Static files served directly:

```
public/
├── favicon/                # Favicon files
│   └── site.webmanifest
├── images/                 # Static images
│   ├── avatar.jpg
│   └── og-image.jpg
└── robots.txt              # SEO robots file
```

**Important:**
- Files in `public/` are served at root path
- `public/images/logo.png` → `/images/logo.png`
- Don't process or optimize - served as-is

## Configuration Files

### `astro.config.mjs`

Main Astro configuration:
```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  integrations: [
    mdx(),
    sitemap(),
    // ...
  ],
  markdown: {
    // Markdown settings
  }
})
```

### `package.json`

Project dependencies and scripts:
```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

### `tsconfig.json`

TypeScript configuration:
```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### `uno.config.ts`

UnoCSS (Tailwind-compatible) configuration:
```typescript
export default defineConfig({
  shortcuts: {
    // Custom shortcuts
  },
  theme: {
    // Theme customization
  }
})
```

## File Naming Conventions

### Components
- **Astro Components**: `PascalCase.astro`
- **TypeScript**: `kebab-case.ts`
- **Styles**: `kebab-case.css`

### Content
- **Blog Posts**: `kebab-case-title.md`
- **Collections**: lowercase folder names

### Configurations
- **All configs**: `kebab-case.config.ts`
- **Data files**: `kebab-case.ts`

## Import Paths

TypeScript path aliases configured in `tsconfig.json`:

```typescript
// Instead of:
import Header from '../../../components/common/Header.astro'

// You can use:
import Header from '@/components/common/Header.astro'
```

**Available aliases:**
- `@/components` → `src/components`
- `@/layouts` → `src/layouts`
- `@/utils` → `src/utils`
- `@/data` → `src/data`
- `@/styles` → `src/styles`

## Build Output (`dist/`)

Production build output (git-ignored):

```
dist/
├── index.html              # Pre-rendered pages
├── blog/
│   └── post-title/
│       └── index.html
├── _astro/                 # Optimized assets
│   ├── *.css
│   └── *.js
└── images/                 # Optimized images
```

## Key Directories Summary

| Directory | Purpose | Edit Frequency |
|-----------|---------|----------------|
| `src/components/` | UI components | Medium |
| `src/content/blog/` | Blog posts | High |
| `src/data/` | Configuration | Medium |
| `src/layouts/` | Page layouts | Low |
| `src/pages/` | Routes | Low |
| `src/scripts/` | Client JS | Low |
| `src/styles/` | Global styles | Low |
| `src/utils/` | Utilities | Low |
| `public/` | Static assets | Medium |
| `docs/` | Documentation | Low |

## Common Workflows

### Adding a new page
1. Create file in `src/pages/`
2. Create layout if needed
3. Create components in `src/components/`
4. Add navigation link in i18n config

### Adding a feature
1. Create components in `src/components/feature/`
2. Add utilities in `src/utils/` if needed
3. Update configuration in `src/data/`
4. Add page route in `src/pages/`

### Customizing styles
1. Edit theme in `src/data/theme.config.ts`
2. Modify Markdown styles in `src/data/markdown-style.config.ts`
3. Update global styles in `src/styles/global.css`

## Related Documentation

- [User Configuration](./USER-CONFIG.md)
- [Blog System](./BLOG-SYSTEM.md)
- [Theme Configuration](./THEME-CONFIG.md)
- [Customization Guide](./CUSTOMIZATION.md)
