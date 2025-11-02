# Projects Showcase

Configure and display your GitHub projects on the site.

## Overview

The projects page automatically fetches and displays your GitHub repositories with:
- Repository metadata
- README rendering
- Star and fork counts
- Language detection
- Live previews
- Caching for performance

## Configuration File

Edit `src/data/projects.config.ts`

## Basic Configuration

```typescript
export const projects = [
  {
    id: 'project-name',
    owner: 'yourusername',
    repo: 'repository-name',
    category: 'Web Development',
    featured: true,
  }
]
```

## Adding Projects

### Simple Project

```typescript
{
  id: 'my-app',           // Unique ID (URL slug)
  owner: 'yourusername',  // GitHub username
  repo: 'my-app',         // Repository name
}
```

This creates a project page at `/projects/my-app`

### Full Configuration

```typescript
{
  id: 'astro-blog',
  owner: 'yourusername',
  repo: 'astro-blog-theme',
  
  // Category for filtering
  category: 'Web Development',
  
  // Show on homepage
  featured: true,
  
  // Override auto-fetched data
  title: 'Custom Title',
  description: 'Custom description',
  
  // Custom image
  image: '/images/projects/astro-blog.jpg',
  
  // External links
  demo: 'https://demo.example.com',
  
  // Tags (in addition to auto-detected)
  tags: ['featured', 'typescript'],
  
  // Sort order
  order: 1,
}
```

## Project Fields

### Required

- **id**: Unique identifier (becomes URL slug)
- **owner**: GitHub username or organization
- **repo**: Repository name

### Optional

- **category**: Group projects (e.g., "Web Development", "Tools")
- **featured**: Show on homepage (true/false)
- **title**: Override repository name
- **description**: Override repository description
- **image**: Custom preview image
- **demo**: Live demo URL
- **tags**: Additional tags beyond GitHub topics
- **order**: Sort order (lower numbers first)

## Categories

Organize projects into categories:

```typescript
export const categories = [
  'All',              // Special: shows all projects
  'Web Development',
  'Mobile Apps',
  'Tools',
  'Libraries',
  'Open Source',
]

export const projects = [
  {
    id: 'web-app',
    category: 'Web Development',
    // ...
  },
  {
    id: 'cli-tool',
    category: 'Tools',
    // ...
  }
]
```

**Note:** "All" category is automatic - don't assign it to projects.

## Featured Projects

Show projects on homepage:

```typescript
{
  id: 'best-project',
  featured: true,  // Appears on homepage
  order: 1,        // First in list
}
```

## Custom Images

Override auto-generated thumbnails:

```typescript
{
  id: 'my-project',
  image: '/images/projects/my-project.jpg',
}
```

**Image Guidelines:**
- Store in `public/images/projects/`
- Recommended size: 1200x630px
- Format: JPG, PNG, or WebP
- Optimize before adding

## Demo Links

Add live demo URLs:

```typescript
{
  id: 'my-app',
  demo: 'https://my-app.example.com',
}
```

Shows a "Live Demo" button on the project page.

## Sorting

Control project order:

```typescript
export const projects = [
  { id: 'first', order: 1 },
  { id: 'second', order: 2 },
  { id: 'third', order: 3 },
]
```

Projects without `order` are sorted by:
1. Stars (more stars first)
2. Last updated (recent first)

## GitHub Integration

### How It Works

1. Fetches repository data from GitHub API
2. Caches responses for 24 hours
3. Renders README.md on project page
4. Updates stars, forks, language info

### GitHub Token

For higher API rate limits:

1. **Create Token**
   - GitHub Settings → Developer settings → Personal access tokens
   - Generate new token (classic)
   - Scopes: `public_repo` (read-only)

2. **Add to Environment**
   ```env
   # .env
   GITHUB_TOKEN=ghp_your_token_here
   ```

3. **Configure**
   ```typescript
   // src/data/user.config.ts
   export const user = {
     github: {
       username: 'yourusername',
       token: import.meta.env.GITHUB_TOKEN,
     }
   }
   ```

### Rate Limits

- **Without token**: 60 requests/hour
- **With token**: 5,000 requests/hour

### Caching

- Repository data cached for 24 hours
- README cached for 24 hours
- Manual refresh: delete `.cache/` folder

## README Rendering

Project READMEs are automatically rendered on detail pages.

### Supported Markdown

- All standard Markdown
- GitHub Flavored Markdown (GFM)
- Code syntax highlighting
- Tables
- Task lists
- Footnotes

### Styling

READMEs use the same styles as blog posts.

Customize in `src/data/markdown-style.config.ts`

## Examples

### Portfolio Website

```typescript
export const projects = [
  {
    id: 'portfolio',
    owner: 'yourusername',
    repo: 'portfolio-2024',
    category: 'Web Development',
    featured: true,
    demo: 'https://yourname.com',
    order: 1,
  }
]
```

### Open Source Libraries

```typescript
{
  id: 'my-library',
  owner: 'yourusername',
  repo: 'awesome-library',
  category: 'Libraries',
  featured: true,
  tags: ['npm', 'typescript', 'open-source'],
}
```

### Multiple Categories

```typescript
export const categories = [
  'All',
  'Web Apps',
  'CLI Tools',
  'Experiments',
]

export const projects = [
  {
    id: 'web-app',
    category: 'Web Apps',
    // ...
  },
  {
    id: 'cli-tool',
    category: 'CLI Tools',
    // ...
  },
  {
    id: 'demo',
    category: 'Experiments',
    // ...
  }
]
```

## Display Options

### Grid Layout

Default 3-column grid (responsive):
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column

### Card Content

Each card shows:
- Repository name (or custom title)
- Description
- Language
- Stars and forks
- Last updated
- Topics/tags

### Detail Page

Project detail pages show:
- Full repository info
- README content
- Repository link
- Demo link (if provided)
- Statistics

## Customization

### Card Style

Edit `src/components/projects/ProjectCard.astro`

### Detail Page Layout

Edit `src/layouts/projects/ProjectDetailLayout.astro`

### README Styles

Edit `src/data/markdown-style.config.ts`

## Private Repositories

**Not supported** - only public repositories can be displayed.

Workaround:
1. Make repository public, or
2. Use custom fields (no auto-fetch):
   ```typescript
   {
     id: 'private-project',
     owner: 'yourusername',
     repo: '', // Leave empty
     title: 'Private Project',
     description: 'Manual description',
     image: '/images/projects/private.jpg',
     // No GitHub integration
   }
   ```

## Troubleshooting

### Repository not showing

**Check:**
- Repository is public
- Owner and repo names correct
- GitHub API accessible
- Check browser console for errors

### README not rendering

**Check:**
- README.md exists in repository
- README is not too large (>1MB)
- Markdown is valid
- Check network tab for API errors

### Images not loading

**Check:**
- Image paths in README
- Relative vs absolute URLs
- CORS headers
- GitHub CDN accessibility

### Rate limit exceeded

**Solutions:**
- Add GitHub token
- Reduce project count
- Wait for rate limit reset
- Use caching

### Data not updating

**Solutions:**
- Clear cache: delete `.cache/` folder
- Force rebuild: `npm run build`
- Check cache duration in code

## Advanced Features

### Language Colors

Automatically uses GitHub's language colors:
- JavaScript: Yellow
- TypeScript: Blue
- Python: Blue
- etc.

Customize in `src/utils/github.ts`

### Auto-Generated Thumbnails

If no custom image, uses:
1. Repository social preview image
2. Language icon
3. Default gradient

### Search and Filter

Built-in filtering by:
- Category tabs
- Language
- Tags

## Performance

### Build Time

Projects are fetched at build time:
- One API call per project
- Cached after first fetch
- Rebuilds use cache

### Loading Speed

- Pre-rendered HTML (no client-side fetch)
- Optimized images
- Lazy loading for READMEs

### Cache Management

Cache stored in `.cache/github/`

**Clear cache:**
```bash
rm -rf .cache
npm run build
```

## Best Practices

1. **Limit Projects**: Show 10-20 most important
2. **Use Categories**: Organize logically
3. **Feature Best**: Mark top projects as featured
4. **Add Demos**: Link to live examples
5. **Custom Images**: Better visual appeal
6. **Update Regularly**: Sync with GitHub changes
7. **Use Token**: Avoid rate limits

## Related Documentation

- [User Configuration](./USER-CONFIG.md)
- [Markdown Styles](./MARKDOWN-CUSTOM-GUIDE.md)
- [Deployment](./DEPLOYMENT.md)
