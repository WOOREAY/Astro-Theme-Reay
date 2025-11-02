# Deployment Guide

How to deploy your Astro Theme Reay site to production.

## Build Process

### Local Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

Build output goes to `dist/` folder.

### Build Configuration

In `astro.config.mjs`:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',  // Your production URL
  base: '/',                        // Base path (keep as '/' for root)
})
```

## Deployment Platforms

### Vercel (Recommended)

**Why Vercel:**
- Zero configuration
- Automatic deployments
- Preview deployments
- Edge network
- Free tier

**Steps:**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready to deploy"
   git push
   ```

2. **Import on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Astro

3. **Configure (if needed)**
   - Framework: Astro
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Wait ~1 minute
   - Your site is live!

**Environment Variables:**

Add in Vercel dashboard:
```
GITHUB_TOKEN=your_token_here
```

**Custom Domain:**

1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Wait for SSL cert (~5 minutes)

### Netlify

**Steps:**

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Deploy Options**

   **Option A: Git Integration**
   - Connect GitHub repository
   - Auto-deploy on push

   **Option B: Drag and Drop**
   - Run `npm run build`
   - Drag `dist/` folder to Netlify

3. **Environment Variables**
   - Site Settings → Environment
   - Add `GITHUB_TOKEN`

4. **Custom Domain**
   - Domain Settings → Add custom domain
   - Update DNS records

### GitHub Pages

**Steps:**

1. **Install adapter**
   ```bash
   npm install -D @astrojs/gh-pages
   ```

2. **Update astro.config.mjs**
   ```javascript
   export default defineConfig({
     site: 'https://username.github.io',
     base: '/repository-name',  // If not using custom domain
   })
   ```

3. **Add workflow file**

   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 18
         - run: npm ci
         - run: npm run build
         - uses: actions/upload-pages-artifact@v2
           with:
             path: dist

     deploy:
       needs: build
       runs-on: ubuntu-latest
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       steps:
         - uses: actions/deploy-pages@v2
           id: deployment
   ```

4. **Enable Pages**
   - Repository Settings → Pages
   - Source: GitHub Actions

5. **Push to deploy**
   ```bash
   git push
   ```

### Cloudflare Pages

**Steps:**

1. **Connect Repository**
   - Go to Cloudflare Pages
   - Connect GitHub account
   - Select repository

2. **Build Settings**
   - Framework: Astro
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy**
   - Click "Save and Deploy"
   - Auto-deploys on git push

4. **Environment Variables**
   - Settings → Environment variables
   - Add `GITHUB_TOKEN`

### Railway

**Steps:**

1. **Connect Repository**
   - Go to Railway.app
   - New Project → Deploy from GitHub

2. **Configure**
   - Build command: `npm run build`
   - Start command: `npx http-server dist`

3. **Environment Variables**
   - Add `GITHUB_TOKEN` in Variables tab

### DigitalOcean App Platform

**Steps:**

1. **Create App**
   - Apps → Create App
   - Connect GitHub

2. **Configure**
   - Type: Static Site
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy**
   - Click "Create Resources"

## Static Hosting

### AWS S3 + CloudFront

1. **Build site**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   - Enable static website hosting

3. **Upload files**
   ```bash
   aws s3 sync dist/ s3://your-bucket-name
   ```

4. **Set up CloudFront**
   - Create distribution
   - Point to S3 bucket

5. **Configure DNS**
   - Add CNAME to CloudFront

### Google Cloud Storage

1. **Build site**
   ```bash
   npm run build
   ```

2. **Create bucket**
   ```bash
   gsutil mb gs://your-bucket-name
   ```

3. **Upload**
   ```bash
   gsutil -m rsync -r dist/ gs://your-bucket-name
   ```

4. **Enable website config**
   ```bash
   gsutil web set -m index.html -e 404.html gs://your-bucket-name
   ```

## Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

**Build and run:**

```bash
docker build -t my-blog .
docker run -p 80:80 my-blog
```

## Environment Variables

### Required Variables

```env
# Production URL
SITE_URL=https://yourdomain.com

# GitHub token (optional, for higher API limits)
GITHUB_TOKEN=ghp_your_token_here
```

### Platform-Specific Setup

**Vercel:**
- Project Settings → Environment Variables

**Netlify:**
- Site Settings → Environment → Environment variables

**GitHub Actions:**
- Repository Settings → Secrets → Actions

**Cloudflare:**
- Pages → Settings → Environment variables

## Custom Domain

### DNS Configuration

**A Records** (for apex domain):
```
@ → Points to platform's IP
```

**CNAME Record** (for www):
```
www → Points to platform's domain
```

### SSL/HTTPS

Most platforms provide free SSL:
- Vercel: Automatic
- Netlify: Automatic
- Cloudflare: Automatic
- GitHub Pages: Automatic for custom domains

## Performance Optimization

### Before Deployment

1. **Optimize Images**
   ```bash
   # Use WebP format
   # Compress images
   # Use appropriate sizes
   ```

2. **Enable Compression**
   - Automatic on most platforms
   - Or configure in `astro.config.mjs`

3. **Minify Assets**
   ```javascript
   export default defineConfig({
     vite: {
       build: {
         minify: 'terser',
       }
     }
   })
   ```

4. **Check Bundle Size**
   ```bash
   npm run build
   # Check dist/ folder size
   ```

### After Deployment

1. **Enable CDN**
   - Automatic on Vercel, Netlify, Cloudflare

2. **Set Cache Headers**
   - Configure in platform settings

3. **Use Compression**
   - Gzip or Brotli

4. **Monitor Performance**
   - Google PageSpeed Insights
   - Lighthouse
   - Web Vitals

## SEO Configuration

### Before Deployment

1. **Update site URL**
   ```javascript
   // astro.config.mjs
   site: 'https://yourdomain.com'
   ```

2. **Add robots.txt**
   ```txt
   # public/robots.txt
   User-agent: *
   Allow: /
   Sitemap: https://yourdomain.com/sitemap-index.xml
   ```

3. **Verify Sitemap**
   - Built automatically
   - Check `/sitemap-index.xml`

4. **Meta Tags**
   - Verify in `src/data/user.config.ts`

### After Deployment

1. **Google Search Console**
   - Add property
   - Submit sitemap
   - Verify ownership

2. **Google Analytics** (optional)
   ```typescript
   // src/data/user.config.ts
   analytics: {
     google: 'G-XXXXXXXXXX'
   }
   ```

3. **Bing Webmaster Tools**
   - Add site
   - Submit sitemap

## Monitoring

### Uptime Monitoring

Free services:
- UptimeRobot
- StatusCake
- Pingdom

### Analytics

Options:
- Google Analytics
- Plausible (privacy-friendly)
- Umami (self-hosted)

### Error Tracking

Options:
- Sentry
- LogRocket
- Rollbar

## Continuous Deployment

### GitHub Actions (any host)

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      # Upload to your hosting provider
```

### Automatic Deployments

Most platforms auto-deploy on:
- Git push to main branch
- Pull request merge
- Manual trigger

### Preview Deployments

Platforms with PR previews:
- Vercel ✅
- Netlify ✅
- Cloudflare Pages ✅

## Troubleshooting

### Build Fails

**Check:**
- Node version (18+)
- Dependencies installed
- Build command correct
- Environment variables set

**Debug:**
```bash
# Local build
npm run build

# Check logs
# Fix errors shown
```

### 404 Errors

**Solutions:**
- Verify `base` in config matches deployment path
- Check routing configuration
- Ensure build output is complete

### Images Not Loading

**Solutions:**
- Check image paths start with `/`
- Verify files in `public/` directory
- Check case sensitivity
- Use absolute URLs as fallback

### Slow Performance

**Solutions:**
- Enable CDN
- Optimize images
- Check bundle size
- Enable compression

### Environment Variables Not Working

**Solutions:**
- Prefix with `PUBLIC_` if needed client-side
- Rebuild after adding variables
- Check platform-specific syntax

## Rollback

### Vercel

- Deployments tab
- Click "..." on previous deployment
- "Promote to Production"

### Netlify

- Deploys tab
- Find previous deploy
- "Publish deploy"

### GitHub Pages

- Revert git commit
- Push to trigger new deployment

## Checklist

Before deploying:

- [ ] Build succeeds locally
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Links work (internal and external)
- [ ] Dark mode works
- [ ] Mobile responsive
- [ ] SEO tags present
- [ ] Sitemap generated
- [ ] robots.txt configured
- [ ] Custom domain configured (if applicable)
- [ ] SSL enabled
- [ ] Environment variables set
- [ ] Analytics configured (if desired)

## Related Documentation

- [User Configuration](./USER-CONFIG.md)
- [Performance Guide](./PERFORMANCE.md)
- [Project Structure](./PROJECT-STRUCTURE.md)
