# Project Basics

## 项目身份

Astro Theme Reay 是内容优先、配置驱动的静态个人网站主题，面向个人博客、作品集、摄影记录和长期知识沉淀。它是可二次定制的主题仓库，不是带 CMS、数据库、账户或服务端持久化的 SaaS。

## 技术基线

- Astro 7 静态输出，Node.js `>=22.12.0`。
- TypeScript、UnoCSS、Material Design 3 动态色板。
- Astro Content Collections 管理 blog 与 Plog。
- Pagefind 在生产构建后生成本地搜索索引。
- GitHub 数据在构建期获取；评论 provider 在浏览器端按需加载。

## 主要区域

- `src/app/`: 用户配置门面和页面布局。
- `src/design-system/`: MD3 主题生成和跨功能视觉基础。
- `src/features/`: 按业务域组织的组件、领域逻辑、客户端代码和样式。
- `src/shared/`: 跨路由组件与客户端基础设施。
- `src/pages/`: Astro 路由、Feed 和 robots 端点。
- `src/content/`: 仓库跟踪的文章、相册元数据和内容资产。

## 双方角色

- 站点所有者通过 TypeScript 配置、Markdown/MDX 和静态资源维护站点。
- 访客通过首页、博客、归档、项目、相册、搜索、友链和留言消费内容。

## 当前站点状态

当前仓库已使用 `WOOREAY`、`https://wooreay.github.io` 和公开 GitHub 主页完成基础个性化；未知邮箱、位置、教育和社交字段保持为空，不用虚构值填充。视觉默认使用 `defineTheme({ preset: 'technology' })`；`presets/themes/` 另提供 paper/eink/forest/editorial/inkwash/monochrome-ink/anime-spring/anime-night/ukiyo/ocean/retro-terminal，主色、字体、shape、背景和 effects 都在同一个 `theme.config.ts` 对象中按层级覆盖。七套扩展场景使用 MD3 token 与原创 CSS，不依赖外部背景图片；monochrome-ink 使用系统楷体回退栈并固定中性黑白与朱砂身份。评论、音乐和季节效果默认关闭。Links 默认用放大头像轻虚化作为卡片背景，仅在鼠标悬停或键盘聚焦时通过 Microlink 请求并显示远程截图，失败后继续保留头像兜底。`npm run check:production` 会阻止缺失生产 `SITE`、非根部署和已知模板占位值进入发布流程；派生主题仍需替换为自己的真实信息。

## Sources of Truth

- `README.md`: 使用入口和公开能力摘要。
- `package.json`: 运行时、依赖和命令合同。
- `src/app/config/site.config.ts` (`siteConfig`): 应用配置读取门面。
- `src/content.config.ts`: 内容 schema 与 loader。
- `src/pages/`: 实际公共路由。
