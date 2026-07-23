# External Integrations Architecture

## Purpose

区分本地静态能力、构建期外部数据和浏览器端第三方代码，并明确各自的信任边界。

## Integration Matrix

| 集成 | 阶段 | 失败/降级 | 信任边界 |
| --- | --- | --- | --- |
| GitHub REST/GraphQL | 构建期 | stale cache、匿名请求、近似活动或空数据 | token、远程元数据、README HTML |
| Pagefind | 构建后 + 浏览器本地 | 无索引则搜索不可用 | 本地生成文件，不发送查询 |
| Comments | 浏览器显式触发后懒加载 | 默认关闭；显示加载错误，可重试 | 外部脚本、cookies、隐私、provider 数据 |
| Microlink preview | 卡片接近 viewport 时加载的远程 screenshot | 默认 `microlink`；显式 screenshot 优先，失败回退 avatar；可改 `none` | 请求会暴露目标 URL/访客网络 |
| KaTeX CSS | 浏览器 CDN | 数学样式降级 | jsDelivr availability/SRI version |
| Remote link/avatar assets | 浏览器 | 图片降级 | 第三方资源与跟踪政策 |

## GitHub Build-time Flow

`src/features/projects/lib/github.ts` 获取用户仓库、README 和活动：

- REST/GraphQL 有覆盖响应 body 读取的 6.5 秒超时和 request deduplication，网络故障不会无限阻塞静态构建。
- token 无效的 REST 401 会匿名重试。
- `.cache/github` 保存数据/ETag；正常 TTL 外仍可在故障时读取 stale 数据。
- GraphQL 活动最准确；public events 和 repo push 时间只是近似回退。
- 当前 token 读取顺序是用户配置后环境变量表达式中的前者优先，因此用户配置必须保持空值。

远程 README 会先去除 frontmatter，经 `marked` 转换，再用 `rehype-sanitize` 白名单净化后通过 `set:html` 插入。安全合同用恶意 fixture 验证 script、事件属性和 `javascript:` URL 被移除；远程内容与链接本身仍属于外部信任边界。

## Comment Flow

Comments 先检查全局/模式/组件开关和 provider 必填配置，再把公开配置序列化到 HTML。运行时根据点击或 IntersectionObserver 调用 typed registry：Giscus、Utterances、Waline、Twikoo、Artalk、Disqus。

- provider ID、repo、endpoint 都是公开客户端配置，绝不能放 secret。
- 当前站点同时关闭 comments 全局配置和 provider 配置；启用后 `autoLoad: false` 要求访客点击按钮才加载第三方脚本。
- 外部版本、CSP、cookie、区域可用性、服务端维护和数据政策由部署者负责。
- loader 当前没有统一 destroy/theme/language update contract。

## Pagefind Flow

两个根布局用 `data-pagefind-body` 标记内容，搜索页用 `data-pagefind-ignore` 排除 UI。`npm run build` 的第二阶段输出 `dist/pagefind`；客户端加载根路径本地索引和中英文 UI 文案。

## Feature Flags

`featuresConfig` 使用与真实能力一致的窄命名：`search.showInNavigation`、`discovery.showRssLink/showSitemapLink` 和 `i18n.showLanguageSwitcher` 只控制入口；comments、music、seasonalEffects 与 githubProjects 控制各自的 mount、加载或构建期取数。Feed、Sitemap、搜索 route 和 i18n runtime 始终存在。

## Related Docs

- `llmdoc/guides/configure-integrations.md`
- `llmdoc/reference/environment-and-dependencies.md`
- `llmdoc/memory/doc-gaps.md`
