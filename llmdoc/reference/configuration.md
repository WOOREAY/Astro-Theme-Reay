# Configuration Reference

## Scope

`src/app/config/site.config.ts` 聚合用户配置，并提供应用优先使用的 getter。用户通常编辑同目录的领域配置，不直接复制 `siteConfig`。

## Configuration Map

| 文件 | 稳定职责 |
| --- | --- |
| `user.config.ts` | 身份、统一公开联系方式、GitHub、双语个人文案、About 内容与站点事实的唯一编辑源 |
| `theme.config.ts` | MD3 source color、字体、shape、背景、波浪、季节效果 |
| `features.config.ts` | 首页模式、入口显示与 comments/GitHub/music/seasonal 集成 gate |
| `navigation.config.ts` | Header 主导航与 Footer resources |
| `i18n.config.ts` | 默认语言、中英文 UI 字典 |
| `projects.config.ts` | 项目过滤、分类、显示设置与 featured 仓库；不重复 GitHub 身份或 token |
| `comments.config.ts` | provider、lazy/autoLoad、article/guestbook 和公开 provider 参数 |
| `links.config.ts` | friend/resource links、分类、交换文案与可选远程预览 provider；不重复个人联系方式或站点卡片 |
| `media.config.ts` | 音乐播放列表、曲目和 player 选项 |
| `markdown.config.ts` | Unified、Remark/Rehype、Shiki |
| `markdown-style.config.ts` | Markdown 视觉样式合同 |

`user.config.ts` 把身份、联系方式、本地化叙事、站点事实和 About 专属集合分开：

- `user.name/avatar/location` 是个人身份源。
- `user.contact.email/website/additionalLinks` 是公开联系方式唯一来源，空值全站隐藏。
- `user.github.username/token` 是 GitHub 唯一来源；公开主页 URL 从 username 派生，token 应保持为空并优先使用环境变量。
- `userContent` 提供本地化 `role/status/focus/tagline/bio/greeting/description`；其中 `description` 同时作为本地化站点描述。
- `site` 只保存 `since/builtWith/visitors/techStack` 等不应从身份或内容统计重复推导的事实；站点名、头像、URL、描述分别从 user/contact/userContent 派生。
- `aboutConfig` 只保存 sections、education、experience、timeline，不再保存 socialNetworks 或第二份 site identity。

客户端 `data-user-content` 支持 `focus.0` 形式的点路径。

`user-contact.ts` 把 email、website、派生 GitHub URL 和 additionalLinks 规范化为同一联系人集合并按 URL 去重。Home、About、Links、Footer 都通过 getter 读取；Links 的个人 social cards 和站点交换卡也在页面层从同一数据生成。

`theme.config.ts` 的 `fontFamilies` 是全站字体唯一用户配置入口：`sans` 传递到普通界面与 Markdown，`mono` 传递到代码块、行内代码和键盘提示。`typography.baseSize` 设定根字号并缩放 rem 布局，`lineHeight` 设定正文基线；当前默认使用自托管 Nunito Variable 与本地中文回退。替换字体时应同时保留可靠的中文、系统和等宽回退。

## site.config.ts Getters

```text
getUserProfile
getUserContact
getUserContactLinks
getUserSocialLinks
getLocalizedUserContent
getSiteProfile
getAboutConfig
getThemeConfig
getBackgroundConfig
getEffectsConfig
getLinksConfig
getMediaConfig
getMusicConfig
getCommentsConfig
getProjectsConfig
getGitHubConfig
getFeaturesConfig
getNavigationConfig
```

`getGitHubConfig()` 合并 `user.github` 与 `projectsConfig.source` 的仓库过滤选项；Projects/Home/GitHub API 不读取第二份 username。`getSiteProfile(lang)` 派生统一站点视图，RSS、Home、About、Links 与 Footer 不维护 name/avatar/url/description 副本。

## Feature Flag Behavior

| 值 | 当前实际效果 |
| --- | --- |
| `home.layout` | 控制首页 flow/snap |
| `home.showcase.posts/projects/plogAlbums` | 控制首页内容橱窗中三类内容的最大展示数量；featured 优先，再按日期或更新时间回退 |
| `search.showInNavigation` | 控制 Header SearchButton；route/index 仍存在 |
| `discovery.showRssLink/showSitemapLink` | 控制 Footer 入口；生成端点始终存在 |
| `i18n.showLanguageSwitcher` | 控制 Header LanguageToggle；runtime 始终存在 |
| `integrations.music` | 控制 Header MusicDock mount；默认关闭，启用前提供真实音频 |
| `integrations.comments` | Comments 全局门禁，再与 comments config/props 合并 |
| `integrations.githubProjects` | 控制配置化 GitHub 项目目录与构建期取数 |
| `integrations.seasonalEffects` | SeasonalEffects mount 门禁，再与 theme effects config 合并；默认关闭 |

`comments.config.ts` 当前 `enabled: false`、`autoLoad: false`；`links.config.ts` 当前 preview provider 为 `none`。

## Navigation Contract

- primary item 使用存在于两种翻译字典中的 `NavigationKey`。
- `showInFooter` 决定 Footer quick links。
- resource entries 当前使用固定 label，而不是 i18n key。
- 项目链接使用 root-absolute URL；这是根路径部署合同的一部分。

## Sources of Truth

- `src/app/config/site.config.ts` (`siteConfig`)
- `src/shared/components/Header.astro`
- `src/shared/components/Footer.astro`
- `src/app/layouts/home/FullscreenLayout.astro`
- `src/pages/index.astro`
