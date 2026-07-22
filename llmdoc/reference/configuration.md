# Configuration Reference

## Scope

`src/app/config/site.config.ts` 聚合用户配置，并提供应用优先使用的 getter。用户通常编辑同目录的领域配置，不直接复制 `siteConfig`。

## Configuration Map

| 文件 | 稳定职责 |
| --- | --- |
| `user.config.ts` | 身份、社交、GitHub、双语个人文案、关于页、站点信息 |
| `theme.config.ts` | MD3 source color、字体、shape、背景、波浪、季节效果 |
| `features.config.ts` | 首页模式、入口显示与 comments/GitHub/music/seasonal 集成 gate |
| `navigation.config.ts` | Header 主导航与 Footer resources |
| `i18n.config.ts` | 默认语言、中英文 UI 字典 |
| `projects.config.ts` | GitHub 用户和项目展示配置；部分字段当前未消费 |
| `comments.config.ts` | provider、lazy/autoLoad、article/guestbook 和公开 provider 参数 |
| `links.config.ts` | friend/resource/social links、分类、交换信息与可选远程预览 provider |
| `media.config.ts` | 音乐播放列表、曲目和 player 选项 |
| `markdown.config.ts` | Unified、Remark/Rehype、Shiki |
| `markdown-style.config.ts` | Markdown 视觉样式合同 |

## site.config.ts Getters

```text
getUserProfile
getLocalizedUserContent
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

## Feature Flag Behavior

| 值 | 当前实际效果 |
| --- | --- |
| `home.layout` | 控制首页 flow/snap |
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
