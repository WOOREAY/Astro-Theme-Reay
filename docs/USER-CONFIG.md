# User Configuration Guide

Complete reference for configuring your personal information and site settings.

## Configuration File

All user settings are in `src/data/user.config.ts`

## Basic Information

```typescript
export const user = {
  // Personal Information
  name: 'Your Name',
  email: 'your.email@example.com',
  avatar: '/images/avatar.jpg',
  bio: 'Your short bio or tagline',
  
  // Location (optional)
  location: 'City, Country',
  timezone: 'Asia/Shanghai',
}
```

### Fields

- **name**: Your display name (shown in header, about page)
- **email**: Contact email (shown in about page)
- **avatar**: Path to avatar image (store in `public/images/`)
- **bio**: Short description (1-2 sentences)
- **location**: Where you're based (optional)
- **timezone**: Your timezone for date formatting

## Social Links

```typescript
export const user = {
  social: {
    github: 'yourusername',
    twitter: 'yourusername',
    linkedin: 'yourusername',
    email: 'your.email@example.com',
    
    // Optional platforms
    mastodon: '@you@mastodon.social',
    youtube: 'yourchannel',
    bilibili: 'your-uid',
    zhihu: 'yourusername',
    weibo: 'yourusername',
  }
}
```

### Supported Platforms

| Platform | Field | Format | Example |
|----------|-------|--------|---------|
| GitHub | `github` | Username | `'octocat'` |
| Twitter/X | `twitter` | Handle (no @) | `'jack'` |
| LinkedIn | `linkedin` | Username | `'yourname'` |
| Email | `email` | Email address | `'you@example.com'` |
| Mastodon | `mastodon` | Full handle | `'@you@mastodon.social'` |
| YouTube | `youtube` | Channel ID | `'UCxxxxxx'` |
| Bilibili | `bilibili` | UID | `'12345678'` |
| 知乎 | `zhihu` | Username | `'yourname'` |
| Weibo | `weibo` | Username | `'yourname'` |

**Note**: Only configured platforms will be displayed. Leave empty to hide.

## GitHub Configuration

```typescript
export const user = {
  github: {
    username: 'yourusername',
    token: import.meta.env.GITHUB_TOKEN, // Optional, for higher rate limits
  }
}
```

### Why GitHub Token?

- **Without token**: 60 API requests/hour
- **With token**: 5,000 requests/hour

### Creating a Token

1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic)
3. Select scopes: `public_repo` (read-only)
4. Copy the token
5. Create `.env` file:
   ```env
   GITHUB_TOKEN=ghp_your_token_here
   ```

## Site Information

```typescript
export const site = {
  title: 'Your Blog Name',
  description: 'Your blog description for SEO',
  url: 'https://yourdomain.com',
  
  // Blog settings
  postsPerPage: 10,
  showReadingTime: true,
  showTableOfContents: true,
  
  // Social preview
  ogImage: '/images/og-image.jpg',
  
  // Analytics (optional)
  analytics: {
    google: 'G-XXXXXXXXXX',
    baidu: 'xxxxxx',
  }
}
```

### Fields

- **title**: Site name (browser title, SEO)
- **description**: Site description (meta description for SEO)
- **url**: Your production URL (important for SEO and RSS)
- **postsPerPage**: Number of posts per page in blog list
- **showReadingTime**: Display estimated reading time
- **showTableOfContents**: Show TOC in blog posts
- **ogImage**: Social media preview image (1200x630px recommended)

## About Page Configuration

```typescript
export const about = {
  // Education
  education: [
    {
      degree: 'Bachelor of Computer Science',
      school: 'University Name',
      period: '2016 - 2020',
      description: 'Major in Computer Science',
    }
  ],
  
  // Work Experience
  experience: [
    {
      title: 'Software Engineer',
      company: 'Company Name',
      period: '2020 - Present',
      description: 'Working on web applications',
    }
  ],
  
  // Skills
  skills: {
    languages: ['JavaScript', 'TypeScript', 'Python'],
    frameworks: ['React', 'Vue', 'Astro'],
    tools: ['Git', 'Docker', 'VS Code'],
  },
  
  // Interests
  interests: ['Photography', 'Travel', 'Reading'],
}
```

## Statistics Configuration

```typescript
export const stats = {
  // Blog statistics
  posts: 0,        // Auto-calculated if 0
  words: 0,        // Auto-calculated if 0
  visitors: 1000,  // Manual count or analytics integration
  
  // Start date
  startDate: '2024-01-01',
  
  // Tech stack
  techStack: [
    { name: 'Astro', icon: 'astro', url: 'https://astro.build' },
    { name: 'TypeScript', icon: 'typescript', url: 'https://www.typescriptlang.org' },
  ]
}
```

## Navigation Menu

Configure site navigation in `src/data/i18n.config.ts`:

```typescript
export const i18nConfig = {
  en: {
    nav: {
      home: 'Home',
      blog: 'Blog',
      projects: 'Projects',
      about: 'About',
      archives: 'Archives',
    }
  },
  zh: {
    nav: {
      home: '首页',
      blog: '博客',
      projects: '项目',
      about: '关于',
      archives: '归档',
    }
  }
}
```

## Footer Configuration

```typescript
export const footer = {
  // Copyright
  copyright: '© 2024 Your Name. All rights reserved.',
  
  // Links
  links: [
    { text: 'Privacy', url: '/privacy' },
    { text: 'Terms', url: '/terms' },
    { text: 'RSS', url: '/rss.xml' },
  ],
  
  // Show powered by
  showPoweredBy: true,
}
```

## RSS Feed Configuration

```typescript
export const rss = {
  enabled: true,
  title: 'Your Blog RSS Feed',
  description: 'Latest posts from your blog',
  limit: 20,  // Number of posts in feed
}
```

## SEO Configuration

```typescript
export const seo = {
  // Default meta tags
  defaultTitle: 'Your Blog',
  titleTemplate: '%s | Your Blog',
  
  // Twitter card
  twitter: {
    card: 'summary_large_image',
    site: '@yourusername',
    creator: '@yourusername',
  },
  
  // Verification
  verification: {
    google: 'your-google-verification-code',
    bing: 'your-bing-verification-code',
  }
}
```

## Language Configuration

```typescript
export const i18n = {
  defaultLang: 'en',     // Default language
  supportedLangs: ['en', 'zh'],  // Available languages
  
  // Language names
  langNames: {
    en: 'English',
    zh: '中文',
  }
}
```

## Examples

### Personal Blog
```typescript
export const user = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  avatar: '/images/jane.jpg',
  bio: 'Full-stack developer and tech writer',
  
  social: {
    github: 'janedoe',
    twitter: 'janedoe',
    linkedin: 'janedoe',
  }
}
```

### Developer Portfolio
```typescript
export const user = {
  name: 'John Smith',
  bio: 'Open source contributor | React enthusiast',
  
  social: {
    github: 'johnsmith',
    twitter: 'johnsmith',
    email: 'john@example.com',
  },
  
  github: {
    username: 'johnsmith',
    token: import.meta.env.GITHUB_TOKEN,
  }
}
```

### Chinese Blog
```typescript
export const user = {
  name: '张三',
  email: 'zhangsan@example.com',
  bio: '前端开发者，技术博客作者',
  location: '北京，中国',
  
  social: {
    github: 'zhangsan',
    zhihu: 'zhangsan',
    weibo: 'zhangsan',
  }
}

export const i18n = {
  defaultLang: 'zh',
  supportedLangs: ['zh', 'en'],
}
```

## Best Practices

1. **Avatar Image**: Use square image, at least 400x400px
2. **Bio**: Keep it under 200 characters
3. **Social Links**: Only add platforms you actively use
4. **Site URL**: Use production URL, not localhost
5. **GitHub Token**: Keep it secret, never commit to Git
6. **SEO**: Fill all meta fields for better search visibility

## Testing Your Configuration

After making changes:

1. Restart dev server: `npm run dev`
2. Check homepage for updated info
3. Visit About page to verify details
4. Test social links work correctly
5. Check browser tab title
6. Verify dark/light mode displays correctly

## Troubleshooting

### Avatar not showing
- Check file exists in `public/images/`
- Verify path starts with `/`
- Try absolute URL as fallback

### Social links not appearing
- Ensure field name matches supported platforms
- Check value is not empty string
- Verify icon name is correct

### GitHub API rate limit
- Add GitHub token to `.env`
- Check token has correct permissions
- Verify token is not expired

## Related Documentation

- [Theme Configuration](./THEME-CONFIG.md)
- [Blog System](./BLOG-SYSTEM.md)
- [Projects Configuration](./PROJECTS.md)
- [Deployment](./DEPLOYMENT.md)
