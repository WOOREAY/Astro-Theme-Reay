# Quick Start Guide

Get your blog up and running in 5 minutes!

## Step 1: Install (2 minutes)

```bash
# Clone or use template
git clone https://github.com/wooreay/Astro-Theme-Reay.git
cd Astro-Theme-Reay

# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit `http://localhost:4321` - Your site is running! 🎉

## Step 2: Configure Your Site (2 minutes)

Edit `src/data/user.config.ts`:

```typescript
export const user = {
  name: 'Your Name',              // Your name
  email: 'you@example.com',       // Your email
  avatar: '/images/avatar.jpg',   // Your avatar
  bio: 'Your bio here',           // Short bio
  
  social: {
    github: 'yourusername',       // GitHub username
    twitter: 'yourusername',      // Twitter handle
    // ... other social links
  }
}
```

Save and the site will auto-reload with your information!

## Step 3: Write Your First Post (1 minute)

Create `src/content/blog/my-first-post.md`:

```markdown
---
title: My First Post
description: This is my first blog post
publishDate: 2024-01-01
tags: ['hello', 'blog']
---

# Hello World!

This is my first post using Astro Theme Reay.

## Features I Love

- Material Design 3
- Dark mode
- Easy to use

Let's start blogging!
```

Save and check `http://localhost:4321/blog` - Your post is live!

## What's Next?

### Customize Theme Colors
Edit `src/data/theme.config.ts`:
```typescript
export const themeConfig = {
  primary: '#5B8CFF',  // Change primary color
}
```

### Add More Posts
Just create more `.md` files in `src/content/blog/`

### Add Projects
Configure GitHub projects in `src/data/projects.config.ts`

### Customize Styles
Modify Markdown styles in `src/data/markdown-style.config.ts`

## Essential Files to Know

```
src/data/
├── user.config.ts           ← Your personal info
├── theme.config.ts          ← Theme colors
├── markdown-style.config.ts ← Content styles
└── projects.config.ts       ← Projects showcase
```

## Common Tasks

### Add a new page
Create file in `src/pages/`:
```typescript
// src/pages/custom.astro
---
import DefaultLayout from '../layouts/base/DefaultLayout.astro';
---
<DefaultLayout title="Custom Page">
  <h1>My Custom Page</h1>
</DefaultLayout>
```

### Change homepage
Edit `src/pages/index.astro`

### Add navigation link
Edit `src/data/i18n.config.ts` navigation section

### Enable dark mode by default
Edit `src/data/theme.config.ts`:
```typescript
mode: 'dark'  // 'light', 'dark', or 'system'
```

## Build for Production

When ready to deploy:

```bash
# Build the site
npm run build

# Preview the build
npm run preview

# Output is in dist/ folder
```

## Deploy Quick Options

### Vercel (Recommended)
1. Push to GitHub
2. Import on Vercel
3. Deploy automatically

### Netlify
1. Drag `dist/` folder to Netlify
2. Done!

### GitHub Pages
```bash
npm run build
# Push dist/ to gh-pages branch
```

See [Deployment Guide](./DEPLOYMENT.md) for detailed instructions.

## Getting Help

- 📖 [Full Documentation](./README.md)
- 🎨 [Markdown Styling](./MARKDOWN-CUSTOM-GUIDE.md)
- 🎯 [Blog System](./BLOG-SYSTEM.md)
- ⚙️ [User Config](./USER-CONFIG.md)

## Tips for Success

1. **Start simple** - Don't customize everything at once
2. **Use dev mode** - Changes reload instantly
3. **Check examples** - Look at existing blog posts
4. **Read docs** - Each feature has detailed documentation
5. **Experiment** - It's hard to break anything in dev mode!

## Cheat Sheet

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build

# Maintenance
npm run check        # Check for issues
npm run format       # Format code

# Content
src/content/blog/    # Add blog posts here
src/data/            # Configure site here
```

## You're All Set! 🚀

Your blog is ready. Start writing and customizing!

**Next recommended reading:**
- [User Configuration](./USER-CONFIG.md) - Detailed setup
- [Blog System](./BLOG-SYSTEM.md) - Advanced blog features
- [Theme Configuration](./THEME-CONFIG.md) - Visual customization
