# Frontend Composition Architecture

## Purpose

说明路由、布局、feature、shared 和 design-system 的真实所有权与组合关系。

## Ownership Map

- `src/pages/`: URL 入口和静态参数生成。
- `src/app/layouts/`: 全文档根布局与领域布局包装。
- `src/features/<domain>/`: 业务域的 components/lib/client/styles。
- `src/shared/`: 跨路由组件、布局原语和浏览器基础设施。
- `src/design-system/`: MD3 palette、token、CSS 变量和全局视觉基础。
- `src/app/config/`: 用户配置源与 `site.config.ts` 读取门面。

## Actual Dependency Shape

```text
pages -> app/layouts + features + shared + app/config
app/layouts -> shared + features + design-system + app/config
features -> app/config + selected features + occasional shared component
shared -> app/config + i18n/media features
design-system -> external Material color utility
```

这是一种 feature-first 组织，而不是严格分层。`shared` Header/Footer 使用 i18n/media feature，首页 SiteInfo 使用 shared Footer，archives/home/projects 也复用其他领域逻辑。路径别名只表达意图，目前没有 lint 规则阻止越界或循环。

## Root Layouts

`src/app/layouts/base/DefaultLayout.astro` 与 `home/FullscreenLayout.astro` 是两个独立全文档根。它们共同负责：

1. 首屏前解析 light/dark。
2. 安装早期 i18n runtime。
3. 输出 HeadMeta 和 Astro `ClientRouter`。
4. 输出持久化主题 CSS 变量。
5. 安装页面 transition 和统一 ClientRuntime。
6. 挂载背景、季节效果、Header 和 Pagefind 内容边界。

差异：

- DefaultLayout 使用 Container、普通文档流、固定 Footer。
- FullscreenLayout 提供 flow/snap 首页外壳，Footer 由首页 SiteInfo 区块渲染。

修改主题/i18n/SEO/router/runtime/Pagefind 根合同必须同步两个根布局，除非先抽出共享 shell。

## Domain Layouts

- Blog detail 组合文章头、正文、TOC、Markdown 样式、增强脚本和评论。
- Archives 添加归档 tabs。
- Projects/Project detail 约束列表和文章宽度。
- Links 提供页面容器。
- AboutLayout 当前存在但 about 路由直接使用 DefaultLayout。

## Homepage Composition

`src/pages/index.astro` 组合五个 section：Hero、Posts、Projects、About、SiteInfo。`PageScrollContainer` 和 `FullPageSection` 提供 flow/snap 共用 DOM/data-attribute 合同。

## Invariants

- `flow` 是默认且无需 fullpage JavaScript 的可用模式。
- `snap` 才能把 section 绝对堆叠并捕获 wheel/touch/keyboard。
- 配置中动态 icon 类必须通过 UnoCSS extraction/safelist，否则不会生成 CSS。
- 领域样式留在 feature；只有稳定跨域语义才进入 design-system。

## Related Docs

- `llmdoc/architecture/client-runtime.md`
- `llmdoc/reference/design-system-contract.md`
- `llmdoc/reference/configuration.md`
- `llmdoc/memory/doc-gaps.md`
