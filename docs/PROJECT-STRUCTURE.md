# Project Structure

本文描述当前 feature-first 架构。代码行为以仓库为准，所有新增功能应遵守这里的依赖方向。

## 目录总览

```text
Astro-Theme-Reay/
├── .github/workflows/       # CI 与 GitHub Pages 部署
├── public/                  # 不经构建处理的静态资源
├── scripts/                 # 构建期检查脚本
├── src/
│   ├── app/                 # 应用配置和布局
│   ├── content/             # Markdown/MDX 与相册图片
│   ├── design-system/       # 主题 token 和共享视觉基础
│   ├── features/            # 业务功能模块
│   ├── pages/               # 路由入口
│   ├── shared/              # 跨功能组件和客户端基础设施
│   └── types/               # 第三方类型补充
├── astro.config.mjs
├── uno.config.ts
└── package.json
```

## 依赖方向

```text
pages -> app/layouts -> features -> shared
                     -> design-system
features -> app/config
shared   -> app/config + design-system
```

- `pages` 只负责取路由参数、调用领域 API 和组合布局。
- `app/layouts` 提供 HTML 外壳、Header/Footer、SEO、主题和全局运行时。
- `features` 维护领域组件、数据转换、客户端交互和领域样式。
- `shared` 不依赖具体页面，避免放入仅供某个功能使用的代码。
- `app/config/site.config.ts` 是应用读取用户配置的统一门面。

## app

### `src/app/config`

用户可编辑配置与应用聚合层：

| 文件 | 职责 |
| --- | --- |
| `site.config.ts` | 聚合并导出类型稳定的 getter |
| `user.config.ts` | 个人资料、关于页与站点说明 |
| `features.config.ts` | 功能开关和首页滚动模式 |
| `navigation.config.ts` | Header/Footer 路由清单 |
| `theme.config.ts` | 主题、背景和动效 |
| `markdown.config.ts` | Unified、Shiki、Remark/Rehype |
| `comments.config.ts` | 评论 provider |
| `projects.config.ts` | GitHub 数据源 |

业务组件不应直接复制这些配置对象，应通过 `site.config.ts` 的 getter 读取。

### `src/app/layouts`

- `base/DefaultLayout.astro`：普通页面外壳和 Pagefind 内容边界。
- `home/FullscreenLayout.astro`：首页 flow/snap 外壳。
- `blog/BlogPostLayout.astro`：文章正文、目录和评论。
- 其余目录封装 about、archives、links、projects 的页面布局。

## design-system

- `theme/`：MD3 颜色生成、token、类型与 CSS 变量输出。
- `styles/cards.css`：共享卡片语义。
- `styles/immersive.css`：沉浸式布局公共规则。

领域专属样式放在相应 `features/<domain>/styles`，不要继续扩大共享样式。

## features

```text
features/<domain>/
├── components/             # Astro 展示组件
├── lib/                    # 服务端或同构领域逻辑
├── client/                 # 浏览器交互与 provider adapters
└── styles/                 # 领域样式，可选
```

当前领域包括 `about`、`archives`、`blog`、`comments`、`effects`、`gallery`、`home`、`i18n`、`links`、`media`、`projects`、`search`。

几个关键实现：

- `features/blog/lib/blog.ts`：文章查询、slug、归档和统计。
- `features/gallery/lib/plog.ts`：相册与图片聚合。
- `features/projects/lib/github.ts`：GitHub API、降级和缓存。
- `features/comments/client/providers.ts`：六种评论服务的适配器表。
- `features/search/client/search.ts`：Pagefind UI 生命周期。
- `features/i18n/components/I18nRuntime.astro`：首屏翻译和 Astro 导航同步。

## shared

- `components/`：Header、Footer、SEO、背景、通用容器和运行时挂载点。
- `components/layout/`：页面滚动容器等布局原语。
- `client/runtime/client-runtime.ts`：页面生命周期唯一编排入口。
- `client/animations`、`navigation`、`ui`：可销毁的浏览器行为实例。

新增客户端行为应提供初始化与清理边界，并接入 Astro 的 `astro:page-load` / `astro:before-swap` 生命周期，避免组件重复绑定全局监听。

## content

`src/content.config.ts` 使用 Astro Content Layer 的显式 `glob` loader：

- `src/content/blog/**/*.{md,mdx}` -> `blog`
- `src/content/plog/**/*.{md,mdx}` -> `plog`

Astro 7 的 entry URL 标识由 `entry.id` 派生，不使用已删除的 `entry.slug`。内容目录应提交到 Git；仅 `dist`、`.astro`、缓存和本地环境变量被忽略。

## pages 与输出

| 路由 | 实现 |
| --- | --- |
| `/` | `pages/index.astro` |
| `/blog/[...slug]` | 博客详情 |
| `/archives/*` | 标签、系列与时间线 |
| `/gallery/[...slug]` | 相册详情 |
| `/projects/[owner]/[repo]` | 项目详情 |
| `/search` | Pagefind 本地搜索 |
| `/rss.xml` | RSS endpoint |
| `/robots.txt` | robots endpoint |
| `/sitemap-index.xml` | Sitemap integration |

`npm run build` 先生成 Astro 静态页面、`theme.css`、`markdown.css`，再生成 `dist/pagefind`。`npm run test:routes` 校验关键路由和构建产物，`npm run test:performance` 校验公共页面体积与 inline 预算。

## 路径别名

| 别名 | 目录 |
| --- | --- |
| `@app/*` | `src/app/*` |
| `@design/*` | `src/design-system/*` |
| `@features/*` | `src/features/*` |
| `@shared/*` | `src/shared/*` |
| `@/*` | `src/*`，仅用于兼容，新增代码优先使用语义别名 |

## 新增功能的推荐步骤

1. 在 `features/<domain>` 创建领域模块。
2. 把用户可调值放入 `app/config`，并由 `site.config.ts` 暴露。
3. 在 `pages` 中仅组合组件与路由数据。
4. 跨域视觉基础才进入 `design-system`；跨域行为才进入 `shared`。
5. 添加 i18n key、关键路由 smoke test 和使用文档。
6. 执行 `npm run verify && npm run audit`。
