# Content System Architecture

## Purpose

说明 Blog/Plog 从源文件到静态路由、聚合页面、搜索和 Feed 的数据流与不变量。

## Collections

`src/content.config.ts` 使用 Astro Content Layer 的显式 `glob` loader：

```text
src/content/blog/**/*.{md,mdx} -> blog
src/content/plog/**/*.{md,mdx} -> plog
```

schema 负责构建期校验和默认值。内容目录属于 Git 跟踪源，不是部署机私有状态。

## Blog Flow

```text
Markdown/MDX
  -> blog collection
  -> features/blog/lib/blog.ts queries and URL helpers
  -> /blog, /archives/*, homepage posts
  -> /blog/[...slug] render()
  -> Pagefind + RSS + Sitemap
```

- 目录型条目 `<slug>/index.md` 的 ID 会去掉扩展名和末尾 `/index`。
- `getPostUrl()` 负责链接编码；动态 `getStaticPaths()` 参数保持未编码。
- `getAllPosts()` 在生产排除 `draft` 和 `published:false`，开发环境显示全部以便预览。
- 标签和系列都从已发布集合聚合；系列内部按 `seriesOrder` 排序，缺失顺序放在后面。
- `remarkReadingTime` 在 Markdown processor 中写入渲染 frontmatter。

已知不一致：文章详情的静态路径当前只排除 `draft`，未排除 `published:false`。稳定行为以 `memory/doc-gaps.md` 的关闭结果为准。

## Plog Flow

```text
Plog index.md + sibling images/
  -> plog collection + eager import.meta.glob
  -> createPlogAlbum() per entry
  -> createPlogCollections() by album.id
  -> gallery collection list / moment detail
  -> Astro getImage() WebP derivatives
  -> Pagefind + Sitemap
```

- 嵌套目录路径成为相册 slug。
- 同级 `images/` 文件按自然文件名排序。
- 每个 Markdown/MDX entry 是一个可独立访问的 photographic moment；共享 `album.id` 的 entries 在 `/gallery` 聚合成一个 collection，`album.title/description` 提供合集身份。
- `photos[].file` 只覆盖匹配图片的元数据，不是图片发现清单。
- 图片缺失时退化到条目封面或视觉占位，不应让构建崩溃。
- 生产同样排除 `draft` 和 `published:false`，开发显示全部。

## Markdown Rendering

`src/app/config/markdown.config.ts` 统一 GFM、数学、heading slug、KaTeX、阅读时间与 Shiki transformers。`markdown-style.config.ts` 和生成器管理文章视觉样式，项目 README 也复用该视觉层。

## Publishing Invariants

- 改 schema 后同时更新内容 reference、写作 guide 和示例。
- 改 slug/URL helper 后同时检查动态路由、归档、RSS、Pagefind 与 Sitemap。
- 草稿和未发布内容不得意外进入生产发现入口。
- 不把内容数量写入稳定 docs。

## Related Docs

- `llmdoc/reference/content-schema.md`
- `llmdoc/guides/add-blog-post.md`
- `llmdoc/guides/add-plog-album.md`
- `llmdoc/reference/routes.md`
