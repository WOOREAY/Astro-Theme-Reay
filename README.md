# Astro Theme Reay# Astro Theme Reay



A modern, clean, and elegant blog theme built with Astro and Material Design 3.一个基于 Astro 的现代化博客主题，采用 Material Design 3 设计系统。



## ✨ Features## ✨ 特性



- 🎨 **Material Design 3** - Complete MD3 design system with light/dark mode- 🎨 **Material Design 3** - 完整的 MD3 设计系统集成，支持深色/浅色模式

- 🌐 **Bilingual Support** - Built-in English and Chinese i18n system- 📝 **博客系统** - 基于 Astro Content Collections 的博客功能

- 📝 **Blog System** - Powered by Astro Content Collections- 🚀 **项目展示** - GitHub 项目集成，自动拉取仓库信息和 README

- 🚀 **Project Showcase** - GitHub integration with auto-fetch repository data- 🎭 **统一的 Markdown 样式** - 所有 Markdown 渲染使用统一的可配置样式系统

- 🎭 **Unified Markdown Styles** - Consistent rendering across all content- 📱 **响应式设计** - 完美适配移动端、平板端、桌面端

- 📱 **Responsive Design** - Perfect on mobile, tablet, and desktop- ⚡ **性能优化** - 基于 Astro 的静态站点生成，极速加载

- ⚡ **Performance** - Static site generation for blazing-fast loading- 🔍 **SEO 友好** - 完善的 SEO 优化和元数据支持

- 🔍 **SEO Optimized** - Comprehensive SEO and metadata support

- 🎯 **Type-Safe** - Full TypeScript support## 🎯 Markdown 样式统一系统



## 🚀 Quick Start本主题实现了完善的 Markdown 样式统一系统，所有 Markdown 渲染（博客文章、项目 README 等）都使用同一套配置：



### Prerequisites### 配置文件



- Node.js 18+ ```

- npm or pnpmsrc/data/markdown-style.config.ts  ← 所有 Markdown 样式配置

```

### Installation

### 快速修改样式

```bash

# Clone or use this template编辑 `src/data/markdown-style.config.ts`：

git clone https://github.com/yourusername/astro-theme-reay.git

cd astro-theme-reay```typescript

export const currentMarkdownStyle = {

# Install dependencies  typography: {

npm install    fontSize: '16px',      // 改这里！

    lineHeight: '1.8',     // 改这里！

# Start development server  },

npm run dev  // ...

```};

```

Visit `http://localhost:4321` to see your site!

保存后，所有使用 Markdown 的地方都会自动更新！

## 📝 Configuration

### 详细文档

### 1. User Information (`src/data/user.config.ts`)

- � [Markdown 样式统一完整指南](./docs/MARKDOWN-STYLE-UNIFICATION.md)

Replace template values with your personal information:- ⚡ [快速参考](./docs/MARKDOWN-STYLE-QUICKREF.md)

- 🏗️ [架构图](./docs/MARKDOWN-STYLE-ARCHITECTURE.md)

```typescript

export const user = {## 🚀 项目结构

  name: 'Your Name',

  avatar: '/avatar.png',Inside of your Astro project, you'll see the following folders and files:

  location: 'Your Location',

  socials: [```text

    { icon: 'i-carbon:logo-github', label: 'GitHub', url: 'https://github.com/yourusername' },/

    // Add your social links├── public/

  ],│   └── favicon.svg

  github: {├── src

    username: 'yourusername',│   ├── assets

    token: '', // Optional: for higher API rate limits│   │   └── astro.svg

  },│   ├── components

};│   │   └── Welcome.astro

```│   ├── layouts

│   │   └── Layout.astro

### 2. Bilingual Content│   └── pages

│       └── index.astro

Update your bio and description in both languages:└── package.json

```

```typescript

export const userContent = {To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

  en: {

    description: 'Your Professional Title',## 🧞 Commands

    bio: 'Your bio here...',

  },All commands are run from the root of the project, from a terminal:

  zh: {

    description: '你的职业',| Command                   | Action                                           |

    bio: '你的简介...',| :------------------------ | :----------------------------------------------- |

  },| `npm install`             | Installs dependencies                            |

};| `npm run dev`             | Starts local dev server at `localhost:4321`      |

```| `npm run build`           | Build your production site to `./dist/`          |

| `npm run preview`         | Preview your build locally, before deploying     |

### 3. Theme Colors (`src/data/theme.config.ts`)| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

| `npm run astro -- --help` | Get help using the Astro CLI                     |

Customize your brand colors:

## 👀 Want to learn more?

```typescript

export const themeConfig = {Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

  primary: '#00aaffff', // Your brand color
  typography: {
    fontFamily: 'Inter, system-ui, sans-serif',
    lineHeight: 1.65,
  },
};
```

### 4. Links & Friends (`src/data/links.config.ts`)

Add your friend links and resources:

```typescript
export const friendLinks = [
  {
    name: 'Friend Name',
    url: 'https://example.com',
    avatar: 'https://example.com/avatar.png',
    description: 'Description',
    type: 'friend',
    featured: true,
  },
  // Add more links
];
```

### 5. Projects (`src/data/projects.config.ts`)

Projects are automatically fetched from your GitHub profile. Customize categories:

```typescript
export const projectCategories = [
  { id: 'featured', name: 'Featured', description: '...', icon: '...' },
  // Add your categories
];
```

## 📁 Project Structure

```
/
├── public/
│   ├── avatar.png          # Your avatar image
│   └── favicon/            # Favicon files
├── src/
│   ├── components/         # Reusable components
│   │   ├── common/         # Header, Footer, etc.
│   │   ├── home/           # Homepage sections
│   │   ├── blog/           # Blog components
│   │   └── ...
│   ├── content/
│   │   └── blog/           # Your blog posts (.md or .mdx)
│   ├── data/               # Configuration files
│   │   ├── user.config.ts  # ⭐ User information
│   │   ├── theme.config.ts # ⭐ Theme settings
│   │   ├── links.config.ts # ⭐ Links and friends
│   │   ├── i18n.config.ts  # Translations
│   │   └── ...
│   ├── layouts/            # Page layouts
│   ├── pages/              # Site pages
│   ├── scripts/            # Client-side scripts
│   ├── styles/             # Global styles
│   └── utils/              # Utility functions
└── package.json
```

## 🎨 Markdown Styling

All Markdown content uses a unified styling system. Configure it in:

```
src/data/markdown-style.config.ts
```

For detailed documentation, see:
- 📚 [Complete Markdown Style Guide](./docs/MARKDOWN-CUSTOM-GUIDE.md)
- 🎨 [MD3 Color System Guide](./docs/MD3-COLOR-GUIDE.md)

## 🌐 Internationalization (i18n)

The theme supports bilingual content (English/Chinese by default):

1. **UI Translations** - Edit `src/data/i18n.config.ts`
2. **User Content** - Edit `src/data/user.config.ts` (userContent section)
3. **Adding Languages** - Extend the translation objects in both files

## 📝 Writing Blog Posts

Create new posts in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "Post description"
pubDate: 2024-01-01
tags: ["tag1", "tag2"]
---

Your content here...
```

### Frontmatter Options

See [BLOG-FRONTMATTER.md](./docs/BLOG-FRONTMATTER.md) for all available options.

## 🧞 Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |

## 🎯 Customization Tips

### Changing Colors

All colors are generated from the primary color using Material Design 3's color system. Simply change the primary color in `theme.config.ts` and the entire palette updates automatically.

### Adding Custom Fonts

Update `typography.fontFamily` in `theme.config.ts` and ensure the font is loaded in your layout.

### Modifying Layouts

Page layouts are in `src/layouts/`. Each page type has its own layout for easy customization.

## 📦 Deployment

### Vercel (Recommended)

```bash
npm run build
# Deploy ./dist/ folder
```

### Netlify

Build command: `npm run build`
Publish directory: `dist`

### GitHub Pages

See [Astro's deployment guide](https://docs.astro.build/en/guides/deploy/) for GitHub Pages setup.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this theme for your personal or commercial projects.

## 🙏 Credits

- Built with [Astro](https://astro.build/)
- Styled with [UnoCSS](https://unocss.dev/)
- Icons from [Carbon Design System](https://carbondesignsystem.com/guidelines/icons/library)
- Color system from [Material Design 3](https://m3.material.io/)

## 💬 Support

- 📖 [Astro Documentation](https://docs.astro.build)
- 💬 [Astro Discord](https://astro.build/chat)
- 🐛 [Issue Tracker](https://github.com/yourusername/astro-theme-reay/issues)

---

⭐ If you like this theme, please give it a star on GitHub!
