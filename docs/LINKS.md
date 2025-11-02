# Friend Links Management

Configure and display friend links on your site.

## Overview

The links page displays a curated collection of friend links organized by categories.

Features:
- Category organization
- Custom link cards
- Avatars and descriptions
- RSS feed integration
- Responsive grid layout

## Configuration File

Edit `src/data/links.config.ts`

## Basic Structure

```typescript
export const linksConfig = {
  categories: [
    {
      name: 'Friends',
      links: [
        {
          name: 'Site Name',
          url: 'https://example.com',
          avatar: 'https://example.com/avatar.jpg',
          description: 'Site description'
        }
      ]
    }
  ]
}
```

## Adding Links

### Single Link

```typescript
{
  name: 'Friend Blog',
  url: 'https://friend.blog',
  avatar: 'https://friend.blog/avatar.jpg',
  description: 'My friend\'s awesome blog'
}
```

### Complete Link Configuration

```typescript
{
  // Required
  name: 'Site Name',           // Display name
  url: 'https://example.com',  // Site URL
  
  // Recommended
  avatar: 'https://example.com/avatar.jpg',  // Avatar image
  description: 'Brief description',          // Site description
  
  // Optional
  rss: 'https://example.com/feed.xml',       // RSS feed URL
  tags: ['tech', 'blog'],                    // Tags for filtering
  color: '#4285f4',                          // Custom card color
}
```

## Categories

Organize links into categories:

```typescript
export const linksConfig = {
  categories: [
    {
      name: 'Friends',
      links: [
        { name: 'Alice', url: 'https://alice.blog', /* ... */ },
        { name: 'Bob', url: 'https://bob.dev', /* ... */ }
      ]
    },
    {
      name: 'Resources',
      links: [
        { name: 'MDN', url: 'https://developer.mozilla.org', /* ... */ }
      ]
    },
    {
      name: 'Tools',
      links: [
        { name: 'VS Code', url: 'https://code.visualstudio.com', /* ... */ }
      ]
    }
  ]
}
```

## Link Fields

### Required Fields

- **name**: Display name (shown on card)
- **url**: Site URL (link destination)

### Recommended Fields

- **avatar**: Avatar/logo image URL
- **description**: Brief description (1-2 sentences)

### Optional Fields

- **rss**: RSS/Atom feed URL
- **tags**: Array of tags (for future filtering)
- **color**: Custom accent color (hex code)

## Examples

### Personal Blog Link

```typescript
{
  name: 'Alice\'s Blog',
  url: 'https://alice.dev',
  avatar: 'https://alice.dev/avatar.jpg',
  description: 'Full-stack developer sharing web dev tips',
  rss: 'https://alice.dev/rss.xml',
  tags: ['web-dev', 'javascript'],
  color: '#FF6B6B'
}
```

### Community Resource

```typescript
{
  name: 'Astro Docs',
  url: 'https://docs.astro.build',
  avatar: 'https://astro.build/favicon.svg',
  description: 'Official Astro documentation and guides',
  tags: ['docs', 'astro']
}
```

### Personal Friend

```typescript
{
  name: 'Bob Chen',
  url: 'https://bobchen.com',
  avatar: 'https://github.com/bobchen.png',  // GitHub avatar
  description: '好朋友，设计师和摄影爱好者',
  rss: 'https://bobchen.com/feed.xml'
}
```

## Avatars

### Avatar Sources

**Option 1: External URL**
```typescript
avatar: 'https://example.com/avatar.jpg'
```

**Option 2: GitHub Avatar**
```typescript
avatar: 'https://github.com/username.png'
```

**Option 3: Gravatar**
```typescript
avatar: 'https://gravatar.com/avatar/hash?s=200'
```

**Option 4: Local Image**
```typescript
avatar: '/images/avatars/friend.jpg'
```

### Avatar Guidelines

- **Size**: 200x200px minimum
- **Format**: JPG, PNG, or WebP
- **Shape**: Square (automatically rounded)
- **Quality**: Optimize for web

## RSS Feeds

### Adding RSS

```typescript
{
  name: 'Friend Blog',
  url: 'https://friend.blog',
  rss: 'https://friend.blog/rss.xml',  // RSS feed
  // ...
}
```

### Finding RSS Feeds

Common patterns:
- `/rss.xml`
- `/feed.xml`
- `/atom.xml`
- `/feed/`

**Tools to find feeds:**
- View page source
- Browser RSS detector extensions
- Check site footer

### RSS Display

If RSS is provided:
- Shows RSS icon on card
- Links to feed URL
- Future: Latest posts preview

## Categories

### Default Categories

```typescript
categories: [
  { name: 'Friends', links: [...] },
  { name: 'Resources', links: [...] },
  { name: 'Inspiration', links: [...] }
]
```

### Category Best Practices

**Good categories:**
- Friends (personal connections)
- Colleagues (work relationships)
- Resources (learning materials)
- Tools (useful services)
- Inspiration (favorite sites)

**Tips:**
- 3-6 categories ideal
- 5-15 links per category
- Keep names short
- Order by importance

## Custom Colors

Add brand colors to cards:

```typescript
{
  name: 'GitHub',
  url: 'https://github.com',
  color: '#181717',  // GitHub brand color
  // ...
}
```

**Popular brand colors:**
- GitHub: `#181717`
- Twitter/X: `#1DA1F2`
- YouTube: `#FF0000`
- Reddit: `#FF4500`
- Dev.to: `#0A0A0A`

## Tags

For future filtering functionality:

```typescript
{
  name: 'Site Name',
  tags: ['tech', 'blog', 'tutorial'],
  // ...
}
```

**Common tags:**
- tech, design, photography
- blog, portfolio, docs
- tutorial, resource, tool
- personal, company, community

## Layout Options

### Grid Layout

Default responsive grid:
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

### Card Variants

**Standard Card** (default):
- Avatar
- Name
- Description
- RSS icon

**Simple Card** (alternative):
- Name only
- Smaller size
- Compact layout

## Submission Guidelines

If you allow friend link applications:

### Create Submission Page

Add instructions in `src/pages/links/submit.md`:

```markdown
# Apply for Friend Link

## Requirements

- Original content
- Active updates (at least monthly)
- HTTPS enabled
- No illegal content

## Your Site Info

Please provide:
- Site name
- Site URL
- Avatar URL
- Description (50 characters max)
- RSS feed (optional)

## My Site Info

Add my link to your site first:

- Name: Your Site Name
- URL: https://yoursite.com
- Avatar: https://yoursite.com/avatar.jpg
- Description: Your site description
```

### Automated Submission

Create a form:

```typescript
// src/pages/links/submit.astro
---
// Form to submit link applications
---
```

Or use:
- GitHub Issues
- Google Forms
- Email

## Management

### Adding New Links

1. Open `src/data/links.config.ts`
2. Find appropriate category
3. Add link object
4. Save and rebuild

### Removing Links

1. Find link in `links.config.ts`
2. Delete link object
3. Save and rebuild

### Updating Links

1. Find link in `links.config.ts`
2. Update fields
3. Save and rebuild

### Reordering

Links display in config file order.

To reorder:
1. Cut link object
2. Paste in new position
3. Save and rebuild

## Reciprocal Links

### Your Link Info

Provide this to friends:

```markdown
# Add My Link

- Name: Your Site Name
- URL: https://yoursite.com
- Avatar: https://yoursite.com/avatar.jpg
- Description: Your tagline or description
- RSS: https://yoursite.com/rss.xml
```

### Verification

Check if your link is added:
1. Visit their links page
2. Search for your site name
3. Verify link works
4. Verify avatar displays

## Customization

### Card Style

Edit `src/components/links/LinkCard.astro`

**Customize:**
- Card background
- Hover effects
- Typography
- Spacing
- Shadows

### Layout

Edit `src/pages/links/index.astro`

**Options:**
- Grid columns
- Card size
- Category spacing
- Page header

### Category Tabs

Edit `src/components/links/LinksCategoryTabs.astro`

**Features:**
- Tab navigation
- Category filtering
- Active states

## Best Practices

### Content

1. **Quality over quantity**: 10 great links > 50 random links
2. **Active sites only**: Remove inactive or dead links
3. **Mutual respect**: Add reciprocal links
4. **Clear descriptions**: Help visitors understand each site
5. **Update regularly**: Check links every few months

### Technical

1. **Use HTTPS**: Only link to secure sites
2. **Test links**: Verify all URLs work
3. **Optimize avatars**: Compress images
4. **Validate RSS**: Test RSS feed URLs
5. **Responsive design**: Test on mobile

### Organization

1. **Logical categories**: Group related links
2. **Consistent naming**: Use parallel structure
3. **Alphabetical order**: Within categories
4. **Featured links**: Highlight important ones
5. **Archive old links**: Move inactive to archive

## Troubleshooting

### Avatar not showing

**Check:**
- URL is valid and accessible
- Image is not blocked by CORS
- File format is supported (JPG/PNG/WebP)
- URL uses HTTPS

**Fix:**
- Use GitHub avatars: `https://github.com/username.png`
- Use Gravatar
- Host locally in `public/images/`

### Link not clickable

**Check:**
- URL includes `https://` or `http://`
- No typos in URL
- Site is online

### Category not displaying

**Check:**
- Category has at least one link
- Syntax is correct (commas, brackets)
- File saved and rebuilt

### RSS icon not showing

**Check:**
- `rss` field is provided
- RSS URL is valid
- Icon component is enabled

## Related Documentation

- [User Configuration](./USER-CONFIG.md)
- [Markdown Guide](./MARKDOWN-CUSTOM-GUIDE.md)
- [Theme Configuration](./THEME-CONFIG.md)

## Examples from the Wild

### Tech Blog Collection

```typescript
{
  name: 'Tech Blogs',
  links: [
    {
      name: 'Overreacted',
      url: 'https://overreacted.io',
      avatar: 'https://overreacted.io/profile-pic.jpg',
      description: 'Dan Abramov\'s blog on React and JavaScript',
      rss: 'https://overreacted.io/rss.xml',
      tags: ['react', 'javascript']
    },
    {
      name: 'CSS-Tricks',
      url: 'https://css-tricks.com',
      avatar: 'https://css-tricks.com/favicon.png',
      description: 'Daily articles about CSS, HTML, JavaScript',
      rss: 'https://css-tricks.com/feed/',
      tags: ['css', 'frontend']
    }
  ]
}
```

### Design Resources

```typescript
{
  name: 'Design',
  links: [
    {
      name: 'Dribbble',
      url: 'https://dribbble.com',
      avatar: 'https://cdn.dribbble.com/assets/favicon.png',
      description: 'Design inspiration and community',
      color: '#EA4C89'
    },
    {
      name: 'Behance',
      url: 'https://behance.net',
      avatar: 'https://www.behance.net/favicon.ico',
      description: 'Showcase and discover creative work',
      color: '#1769FF'
    }
  ]
}
```
