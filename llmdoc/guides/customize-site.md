# Customize the Site

## Preconditions

- Node.js `>=22.12.0`，已完成 `npm ci`。
- 先读 `must/project-basics.md`、`reference/configuration.md` 和 `memory/doc-gaps.md`。

## Steps

1. 编辑 `src/app/config/user.config.ts`：在 `user` 设置姓名、头像、可选地点、`contact.email/website/additionalLinks` 与 GitHub；在 `userContent` 设置双语 role/tagline/bio/status/focus/description；在 `site` 与 `aboutConfig` 设置站点事实和完整档案。空的可选公开字段会在 Home、About、Links、Footer 同时隐藏；不要在其他配置复制联系人、GitHub URL、头像或站点名。
2. 编辑 `theme.config.ts`：先在 `fontStacks.latin/cjk/fallback` 更换全站多语言字体，或让 latin/cjk 指向同一个覆盖两种文字的字体；`fontFamilies.brand/navigation/heading/body/metadata/prose/proseHeading` 留空时自动继承组合后的 global，需要差异化时再填写完整字体栈。`fontStacks.mono` 只控制代码与键盘提示。内置 Nunito、寒蝉全圆体和 Noto Sans SC fallback 已在 DocumentShell 自托管；圆体只加载 Unicode 分片的 Regular，较高 CSS 字重由浏览器合成，避免再下载一套中文 Bold 分片。新增其他 WebFont 时还需安装并导入对应字体资源。`typography.baseSize/lineHeight` 调整全站排版尺度，主色、背景、首页波浪和季节效果继续由同一文件管理。
3. 选择 `features.config.ts` 的首页 `flow` 或 `snap`，并按需调整 `home.showcase` 的 Blog/项目/Plog 数量；区分只控制入口的 `show*` 与控制集成加载的 `integrations.*`。
4. 编辑 `navigation.config.ts`；若新增 translation key，同时更新 `i18n.config.ts` 两种字典。
5. 按需编辑 projects、comments、links、media 配置；projects 只设置过滤/分类/featured，links 只设置外部链接/分类/交换文案，GitHub 身份与个人联系仍只改 user config。
6. 替换 `public/` 中头像、favicon、音频和其他占位资产；核对配置引用的文件真实存在。
7. 设置生产 `SITE`；项目只支持根路径部署，保持 `BASE=/`。
8. 运行 `SITE=<origin> npm run check:production`、`SITE=<origin> npm run verify` 和 `npm run audit`。

## Verification

- 搜索代码和产物中是否仍有 `Your Name`、`yourusername`、`example.com` 等占位值。
- 检查 Header/Footer 导航、主题/语言切换、首页 flow/snap、外部链接和媒体降级。
- 用生产 preview 检查 canonical、RSS、robots、Sitemap 和 Pagefind。

## Common Failures

- 只改 `site.config.ts`：该文件是聚合门面，不是主要用户编辑入口。
- 在 `links.config.ts` 添加 contacts/mySiteInfo，或在 `projects.config.ts` 添加 githubUsername：这些值已经从 user config 派生，会重新制造配置分叉。
- 只在一个语言字典添加 key：TypeScript 或运行时会出现缺失文案。
- 开启 music 但没有真实音频文件。
- 配置 GitHub/评论后仍期待完全离线构建或浏览器运行。
- 把 `BASE` 设置为非根路径；production check 会按当前支持合同直接拒绝。

## Related Docs

- `llmdoc/reference/configuration.md`
- `llmdoc/reference/environment-and-dependencies.md`
- `llmdoc/guides/configure-integrations.md`
