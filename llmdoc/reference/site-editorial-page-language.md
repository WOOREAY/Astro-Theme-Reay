# Site Editorial Page Language

## Intent

Hero 之外的公开页面共享“紧凑编辑式内页”语言：先交代页面身份和真实统计，再尽快暴露内容。设计避免居中大标题、统计卡墙、重复胶囊导航与每条内容一个独立表面；Gallery 可为影像保留更强的视觉容器，但仍遵循相同字号、间距和主题所有权。

首页 Hero 与其编辑橱窗合同继续由 `home-editorial-design-language.md` 负责，本文件不改变 Hero。

## Shared Foundations

- `EditorialPageLayout.astro` 在 `DefaultLayout` 内提供统一纵向间距和页面标记。
- `EditorialPageHeader.astro` 提供左对齐 eyebrow、紧凑标题、说明和可选线性统计；统计通过分隔线组织，不创建统计卡。
- `EditorialSectionHeader.astro` 提供小型章节标题、说明和可选跳转动作。
- Blog、Archives、Projects、Gallery、About、Links、Guestbook 与 Search 的目录页必须使用共享 page layout/header；领域内容、筛选和交互继续留在各自 feature。
- Blog、Project 和 Gallery 详情页可使用领域专属头部，但必须沿用相同标题尺度、开放式元信息和内容宽度节奏。

## Layout and Surface Rules

- 桌面页首先左后右：左侧标题/说明，右侧线性统计；较窄视口自然叠放。
- 页首之后直接进入导航、筛选或首组真实内容；不得再插入一层重复 summary cards。
- Blog、归档、项目、友链和 About 工具列表使用开放式行、hairline 与轻微 hover tint。
- 每个功能区最多使用一个明显 tonal surface。搜索面板、评论 provider、GitHub 热度图和项目 shelf 属于可接受的功能表面。
- Gallery 以影像为主，可使用圆角 cover、overlay 和有限阴影；overlay 文字必须在 light/dark 下维持足够对比。
- 详情页不虚构阅读进度、完成度、访问量或其他统计；只展示内容、配置或外部 API 提供的数据。
- 页面背景、主色和字体仍只消费 theme config -> MD3/Reay token 链，不建立领域级 palette 或页面底色。

## Typography and Density

- 目录页标题在当前 15px 根字号下桌面不超过约 39px，390px 视口约 27.75px。
- Blog/Project 详情标题桌面约 40–42px，移动端约 28px；Gallery overlay 可略高，但移动端不超过约 39px。
- 普通 section 标题约 16–18px，列表标题约 14–16px，正文和元信息保持可读但紧凑。
- 1440×900 应看到页首、筛选/导航与首组真实内容；信息较短的 Guestbook、Search 和 404 应能在该视口内自然完成主要任务。

## Responsive and Accessibility

- 1440×900 与 390×844 是必测视口；所有代表路由的 `scrollWidth` 不得超过 `clientWidth`。
- 740px 左右把非对称/双栏内容降为单列；横向 tabs 可以自身滚动，但不得扩大页面宽度。
- 标题保持真实 `h1`，章节保持 `h2`；筛选和归档导航使用语义 nav，列表条目使用 article/list 语义。
- focus-visible、Pagefind、评论 provider、TOC、Gallery lightbox 和 Astro 页面交换生命周期不得因视觉重构退化。
- `data-editorial-page`、`data-editorial-page-header`、`data-blog-editorial-index`、`data-tag-index`、`data-series-entry` 与 `data-project-detail-header` 是自动化合同。

## Sources of Truth

- `src/app/layouts/base/EditorialPageLayout.astro`
- `src/shared/components/EditorialPageHeader.astro`
- `src/shared/components/EditorialSectionHeader.astro`
- `src/app/layouts/archives/ArchiveLayout.astro`
- `src/features/blog/components/BlogTimeline.astro`
- `src/features/archives/components/TagCloud.astro`
- `src/features/archives/components/SeriesCard.astro`
- `src/features/projects/components/ProjectDetailHeader.astro`
- `src/pages/`
- `tests/e2e/core.spec.ts`
