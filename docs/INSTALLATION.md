# Installation Guide

Complete guide to installing and setting up Astro Theme Reay.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** 7.0.0+ or **pnpm** 6.0.0+
- **Git** (for cloning the repository)

Check your versions:

```bash
node --version  # Should be v18.0.0 or higher
npm --version   # Should be 7.0.0 or higher
```

## Method 1: Use as Template (Recommended)

1. **Click "Use this template"** on GitHub

   - Go to the repository page
   - Click the green "Use this template" button
   - Name your new repository
   - Choose public or private
2. **Clone your new repository**

   ```bash
   git clone https://github.com/WOOREWY/Astro-Theme-Reay.git
   cd YOUR-REPO-NAME
   ```
3. **Install dependencies**

   ```bash
   npm install
   # or
   pnpm install
   ```
4. **Start the development server**

   ```bash
   npm run dev
   # or
   pnpm dev
   ```
5. **Open your browser**

   - Navigate to `http://localhost:4321`
   - You should see the theme running!

## Method 2: Clone Directly

1. **Clone the repository**

   ```bash
   git clone https://github.com/wooreay/Astro-Theme-Reay.git
   cd Astro-Theme-Reay
   ```
2. **Remove existing Git history** (optional)

   ```bash
   rm -rf .git
   git init
   ```
3. **Install dependencies**

   ```bash
   npm install
   ```
4. **Start development**

   ```bash
   npm run dev
   ```

## Verifying Installation

After starting the dev server, you should see:

```
🚀 astro v4.x.x started in Xms

  ┃ Local    http://localhost:4321/
  ┃ Network  use --host to expose
```

Visit `http://localhost:4321` to see:

- ✅ Homepage with hero section
- ✅ Blog posts list
- ✅ Projects showcase
- ✅ About page
- ✅ Theme switching works

## Common Issues

### Node Version Error

```
Error: Node.js version not supported
```

**Solution**: Upgrade to Node.js 18 or higher

```bash
# Using nvm
nvm install 18
nvm use 18
```

### Port Already in Use

```
Error: Port 4321 is already in use
```

**Solution**: Use a different port

```bash
npm run dev -- --port 3000
```

### Dependencies Installation Failed

```
Error: EACCES permission denied
```

**Solution**: Fix npm permissions or use pnpm

```bash
pnpm install
```

### Module Not Found

```
Error: Cannot find module 'X'
```

**Solution**: Clear cache and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

## Project Structure After Installation

```
Astro-Theme-Reay/
├── src/
│   ├── components/      # UI components
│   ├── content/         # Blog posts and content
│   ├── data/           # Configuration files
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── styles/         # Global styles
├── public/             # Static assets
├── docs/               # Documentation
├── astro.config.mjs    # Astro configuration
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

## Next Steps

After successful installation:

1. **Configure your site**: See [User Configuration](./USER-CONFIG.md)
2. **Customize theme**: Check [Theme Configuration](./THEME-CONFIG.md)
3. **Write your first post**: Follow [Blog System](./BLOG-SYSTEM.md)
4. **Deploy**: Read [Deployment Guide](./DEPLOYMENT.md)

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for issues
npm run check

# Format code
npm run format
```

## Environment Setup (Optional)

Create a `.env` file for optional features:

```env
# GitHub API token (for higher rate limits)
GITHUB_TOKEN=your_github_token_here

# Site URL (for production)
SITE_URL=https://yourdomain.com
```

## Editor Setup (Recommended)

### VS Code

Install recommended extensions:

- Astro
- ESLint
- Prettier
- Tailwind CSS IntelliSense

### Settings

The project includes `.vscode/settings.json` with optimal configuration.

## Troubleshooting

If you encounter issues:

1. Check [Common Issues](#common-issues) above
2. Search [GitHub Issues](https://github.com/wooreay/Astro-Theme-Reay/issues)
3. Create a new issue with:
   - Node.js version
   - npm/pnpm version
   - Operating system
   - Error messages
   - Steps to reproduce

## Support

- 📖 Read the [documentation](./README.md)
- 🐛 Report bugs on [GitHub Issues](https://github.com/wooreay/Astro-Theme-Reay/issues)
- 💬 Ask questions in [Discussions](https://github.com/wooreay/Astro-Theme-Reay/discussions)
