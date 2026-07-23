# Astro Theme Reay

<p align="center">
  <strong>内容优先、配置驱动、可渐进定制的 Astro 个人网站主题</strong>
</p>

<p align="center">
  <a href="https://astro.build/"><img alt="Astro" src="https://img.shields.io/badge/Astro-7.x-ff5d01?style=flat-square&logo=astro&logoColor=white"></a>
  <a href="https://www.typescriptlang.org/"><img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-ready-3178c6?style=flat-square&logo=typescript&logoColor=white"></a>
  <a href="https://unocss.dev/"><img alt="UnoCSS" src="https://img.shields.io/badge/UnoCSS-enabled-333333?style=flat-square"></a>
  <img alt="License" src="https://img.shields.io/badge/license-Apache--2.0-0f766e?style=flat-square">
</p>

Astro Theme Reay 面向个人博客、作品集、摄影记录和长期知识沉淀。项目采用静态优先架构，博客、相册、项目、友情链接、留言评论、音乐、主题和双语界面都由独立配置或内容文件驱动。

## 功能

| 能力 | 实现 |
| --- | --- |
| 内容系统 | Astro Content Collections、Markdown/MDX、标签、系列、归档、阅读时间 |
| 视觉系统 | Material Design 3 动态色板、十一套主题预设、浅色/深色主题、UnoCSS、组件级样式 |
| 首页 | 默认无障碍普通滚动，可切换为分屏滚动模式 |
| Plog 相册 | 合集、图片元数据、响应式图片、灯箱和原图下载 |
| 项目展示 | GitHub API、构建期缓存、README 渲染和贡献统计 |
| 搜索与订阅 | Pagefind 本地全文搜索、RSS、Sitemap、robots.txt |
| 评论 | Giscus、Utterances、Waline、Twikoo、Artalk、Disqus 适配器 |
| 国际化 | 中英文界面和个人简介即时切换，无页面刷新 |

## 环境要求

- Node.js `>=22.12.0`
- npm `>=9.6.5`

## 快速开始

```bash
git clone https://github.com/WOOREAY/Astro-Theme-Reay.git
cd Astro-Theme-Reay
npm install
npm run dev
```

开发服务默认运行在 `http://localhost:4321`。

首次使用时依次修改：

1. `src/app/config/user.config.ts`：个人资料、简介、教育与兴趣。
2. `src/app/config/theme.config.ts`：配色、字体、背景与动效。
3. `src/app/config/projects.config.ts`：GitHub 项目来源。
4. `src/app/config/comments.config.ts`：评论服务。
5. `SITE`：生产站点的完整 URL，避免 RSS 和 Sitemap 使用示例域名。

`theme.config.ts` 使用一个 `defineTheme({ ... })` 对象：修改 `preset` 即可在科技、米纸、墨水屏、护眼森林、编辑刊物、水墨江湖、春日动画、动画夜城、浮世绘、海岸晴空和复古终端之间切换，也能在同一对象直接设置主色、图片/渐变背景、字体、圆角和动效。预设说明见 [`presets/themes/`](./presets/themes/README.md)。

## 架构

```text
src/
├── app/
│   ├── config/             # 用户配置、功能开关、导航和配置聚合
│   └── layouts/            # 页面布局与应用外壳
├── content/                # blog 与 plog 内容集合
├── design-system/
│   ├── styles/             # 跨功能基础样式
│   └── theme/              # MD3 token、主题生成与 CSS 变量
├── features/               # 按业务域组织的组件、lib、client 和 styles
├── pages/                  # Astro 文件路由与 RSS/robots 端点
└── shared/                 # 跨域组件与全局客户端运行时
```

应用代码通过 `@app`、`@design`、`@features`、`@shared` 别名引用模块。完整说明见 [项目架构](./docs/PROJECT-STRUCTURE.md)，旧版迁移说明见 [架构迁移](./docs/ARCHITECTURE-MIGRATION.md)。

## 内容

博客文件放在 `src/content/blog/<slug>/index.md`：

```yaml
---
title: 文章标题
description: 文章摘要
publishDate: 2026-07-21
tags: [Astro, TypeScript]
series: 站点构建
draft: false
---
```

相册放在 `src/content/plog/<category>/<slug>/`，入口为 `index.md`，图片放在同级 `images/`。内容目录已纳入 Git 跟踪；不要把个人文章仅保存在构建机上。

## 配置入口

| 文件 | 用途 |
| --- | --- |
| `src/app/config/site.config.ts` | 应用读取配置的统一入口，通常无需修改 |
| `src/app/config/user.config.ts` | 身份与联系方式的单一来源、双语简介、关于页和站点信息 |
| `src/app/config/features.config.ts` | 首页模式、搜索、Feed 和集成功能开关 |
| `src/app/config/navigation.config.ts` | Header 与 Footer 导航 |
| `src/app/config/theme.config.ts` | 单对象主题入口：预设、MD3 配色、字体、背景、shape 和动效 |
| `presets/themes/` | 十一套可复用视觉预设及其 MD3、字体、shape、背景和 effects 参数 |
| `src/app/config/media.config.ts` | 音乐播放列表 |
| `src/app/config/comments.config.ts` | 评论 provider 与凭据 |
| `src/app/config/projects.config.ts` | GitHub 项目 |
| `src/app/config/links.config.ts` | 友情链接与资源链接 |
| `src/app/config/i18n.config.ts` | 中英文界面文案 |

## 命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动开发服务器 |
| `npm run check` | 执行 Astro、TypeScript 和内容校验 |
| `npm run build` | 构建静态站点并生成 Pagefind 索引 |
| `npm run check:production` | 校验生产 `SITE`、根路径部署与模板占位值 |
| `npm run test:routes` | 校验关键生产路由与产物 |
| `npm run test:performance` | 校验 HTML/inline 预算与共享 CSS 合同 |
| `npm run test:config` | 校验个人信息单一来源与跨页面消费合同 |
| `npm run test:security` | 校验内容可见性与远程 README 净化合同 |
| `npm run test:e2e` | 构建后运行 Playwright/Axe 核心浏览器测试 |
| `npm run audit` | 检查高危依赖漏洞 |
| `npm run verify` | 执行检查、完整构建、静态门禁、安全合同和浏览器 E2E |
| `npm run preview` | 预览 `dist/`；应先执行构建 |

## 环境变量

复制 `.env.example` 后按需配置：

```env
SITE=https://example.com
BASE=/
GITHUB_TOKEN=
```

- `SITE` 必须是生产站点 origin，用于 canonical、RSS、Sitemap 和 robots。
- 当前只支持根路径部署，`BASE` 必须保持 `/`；GitHub Pages 项目子路径暂不受支持。
- `GITHUB_TOKEN` 可提高构建期 GitHub API 限额，禁止提交真实令牌。

## 部署

仓库提供 Node 22 的 GitHub Actions 检查和 GitHub Pages 部署工作流。Vercel、Netlify 等平台使用：

| 项目 | 值 |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `dist` |

部署前至少执行一次：

```bash
npm ci
SITE=https://wooreay.github.io npm run check:production
SITE=https://wooreay.github.io npm run verify
npm run audit
```

## 文档

- [快速开始](./docs/QUICK-START.md)
- [项目架构](./docs/PROJECT-STRUCTURE.md)
- [用户配置](./docs/USER-CONFIG.md)
- [主题配置](./docs/THEME-CONFIG.md)
- [博客系统](./docs/BLOG-SYSTEM.md)
- [媒体与相册](./docs/MEDIA.md)
- [项目展示](./docs/PROJECTS.md)
- [部署](./docs/DEPLOYMENT.md)

## License

本项目依据 [Apache License 2.0](./LICENSE) 开源。你可以学习、修改、分发和用于商业项目，但需遵守许可证中的版权、许可声明和变更说明要求。
