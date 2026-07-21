# Architecture Migration

本次改造保留原有路由、内容格式和核心功能，把按文件类型堆叠的目录迁移为 feature-first 架构。

## 路径映射

| 旧路径 | 当前路径 |
| --- | --- |
| `src/data/*` | `src/app/config/*` |
| `src/layouts/*` | `src/app/layouts/*` |
| `src/theme/*` | `src/design-system/theme/*` |
| `src/styles/*` | `src/design-system/styles/*` |
| `src/components/<domain>/*` | `src/features/<domain>/components/*` |
| `src/components/common/*` | `src/shared/components/*` 或相应 feature |
| `src/utils/blog.ts` | `src/features/blog/lib/blog.ts` |
| `src/utils/plog.ts` | `src/features/gallery/lib/plog.ts` |
| `src/utils/github*.ts` | `src/features/projects/lib/*` |
| `src/scripts/*` | `src/shared/client/*` 或 `src/features/*/client/*` |

## 行为变化

- Node 最低版本提升为 `22.12.0`，框架升级到 Astro 7。
- Content Collections 改用显式 loader，slug 从 `entry.id` 推导。
- 首页默认 `flow` 普通滚动；在 `features.config.ts` 可切换 `snap`。
- i18n 由全局早期运行时统一处理，不再由每个组件重复初始化。
- 评论 provider 从单一巨型组件拆成 adapter registry。
- `npm run build` 同时生成 Pagefind 索引。
- 新增 `/search`、`/rss.xml`、`/robots.txt` 和 Sitemap。
- `src/content` 已纳入版本控制，避免部署时缺少文章和相册。

## 自定义站点升级检查

1. 将旧 `src/data/*.config.ts` 的个人值迁移到 `src/app/config/` 同名文件。
2. 保留 `src/content/blog` 与 `src/content/plog`，无需改写 frontmatter。
3. 更新自定义 import 为 `@app`、`@features`、`@shared` 或 `@design`。
4. 配置生产 `SITE`，否则 canonical、RSS 和 Sitemap 会使用 `example.com`。
5. 执行 `npm ci && npm run verify && npm run audit`。
