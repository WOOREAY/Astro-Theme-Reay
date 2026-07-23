# Site Editorial Page Language

## Intent

Hero 之外的公开页面共享“紧凑编辑式内页”语言：先交代页面身份和真实统计，再尽快暴露内容。设计避免居中大标题、统计卡墙和重复胶囊导航；具体表面必须服从领域内容，Gallery 可保留影像容器，Links 可使用头像虚化视觉卡片，其余开放列表仍遵循相同字号、间距和主题所有权。

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
- Blog、归档、项目和 About 工具列表使用开放式行、hairline 与轻微 hover tint；Links 使用有界自动换行的 16:9 卡片，默认以放大头像轻虚化背景与独立头像表达站点身份，只在鼠标悬停或键盘聚焦后加载并显示站点截图，离开或加载失败时恢复头像背景，不再受旧 `.link-card` 兼容选择器影响。
- 每个功能区最多使用一个明显 tonal surface。搜索面板、评论 provider、GitHub 热度图和项目 shelf 属于可接受的功能表面。
- Gallery 以影像为主，可使用圆角 cover、overlay 和有限阴影；overlay 文字必须在 light/dark 下维持足够对比。
- Archives 是 Blog/Plog 统一检索面：顶部 MD3 tonal 筛选必须是 `全部 / Blog / Plog`，主体按年份混排紧凑条目；全部与 Blog 模式在结果前展示最多 4 个有序系列预览和完整目录入口，Plog 模式提供合集筛选，右栏不复制完整系列列表。热门主题每种内容最多 12 个，完整主题进入可搜索/排序且在桌面与移动视口内水平、垂直居中的 dialog。筛选状态写入 URL，主题选择和清除都必须把焦点与视口带回结果；旧 Timeline/Tags/Series URL 兼容但不作为同级主导航。
- 完整 Tags/Series 目录使用居中的有界内容宽度；Tag map 的字号/字重差异保持克制，序号和计数消费 metadata 字体而不是 mono。
- Plog 目录把共享 `album.id` 的 entries 组织成 collection，并把每个 entry 视作 moment；详情页渲染 entry Markdown 叙事并让正文/照片说明消费 prose 字体角色；无真实图片时必须显式使用配置 gradient fallback。
- About 可从 `userContent.story` 展示完整叙事，但教育、经历和公开联系仍只渲染配置中的真实字段；站点统计只使用内容集合可计算的数据。
- Guestbook 使用最多 52rem 的居中内容流、三条线性留言准则和单一 MD3 tonal 对话表面。关闭状态面向访客说明“尚未开放”，并显示从统一用户配置派生的可用联系方式；不得暴露 provider、thread、源码配置路径或重复统计卡。启用状态仍要求显式点击后连接第三方，并提供本地化加载、错误、重试与焦点反馈。
- Blog 系列文章可展示由 `seriesOrder` 排序后计算出的结构位置、系列目录和上一篇/下一篇，但不得把它描述为用户阅读进度；其他详情页也不虚构完成度、访问量或统计，只展示内容、配置或外部 API 提供的数据。
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
- `data-editorial-page`、`data-editorial-page-header`、`data-blog-editorial-index`、`data-archive-explorer`、`data-archive-results`、`data-archive-series-shelf`、`data-post-series-context`、`data-post-series-navigation`、`data-tag-index`、`data-series-entry`、`data-project-detail-header`、`data-guestbook-flow`、`data-comment-section` 与 `data-comment-unavailable` 是自动化合同。

## Sources of Truth

- `src/app/layouts/base/EditorialPageLayout.astro`
- `src/shared/components/EditorialPageHeader.astro`
- `src/shared/components/EditorialSectionHeader.astro`
- `src/app/layouts/archives/ArchiveLayout.astro`
- `src/features/archives/components/ArchiveExplorer.astro`
- `src/features/archives/client/archive-explorer.ts`
- `src/features/blog/components/BlogTimeline.astro`
- `src/features/blog/components/PostSeriesNavigation.astro`
- `src/features/archives/components/TagCloud.astro`
- `src/features/archives/components/SeriesCard.astro`
- `src/features/about/components/AboutNarrative.astro`
- `src/features/gallery/lib/plog.ts`
- `src/features/projects/components/ProjectDetailHeader.astro`
- `src/pages/`
- `tests/e2e/core.spec.ts`
