# Design System Contract

## Theme Pipeline

`src/app/config/theme.config.ts` 提供 source colors、typography、shape 和 effects。`createTheme()` 调用 Material utilities 生成 light/dark palette，`themeToCSSVars()` 由 `src/pages/theme.css.ts` 输出可缓存 `/theme.css`。

## Variable Layers

- `--md-ref-*`: reference/tonal palette。
- `--md-sys-color-*`: Material system colors。
- typography/shape variables。
- `--reay-*`: 组件语义、glass、surface、shadow、motion aliases。

组件优先使用 system/Reay token，不硬编码主题颜色。新增跨功能 token 同时检查 light/dark 和 RGB companion variables。

## Style Ownership

- `src/design-system/styles/cards.css`: 跨功能 card/glass compatibility API。
- `immersive.css`: 页面布局、motion、沉浸式视觉和 legacy selectors。
- `src/features/<domain>/styles`: 领域专属样式。
- Astro component `<style>`: 组件局部规则。
- UnoCSS: utility/shortcut/icon 生成，不是 palette source。

当前 cards/immersive 存在 legacy selector 和职责重叠；删除前需要搜索所有 consumers 并有视觉回归证据。

## Performance Contract

- 默认关闭季节粒子和首页波浪；重新启用时尊重 reduced-motion，并单独测试移动端。
- flow 首页离屏 section 暂停动画；不把 infinite animation 当作跨 section 默认行为。
- layout-default 与 layout-home 的重复 card surface 不使用 backdrop-filter。
- 不在大量卡片上常驻 `translateZ(0)`/`will-change`；只在短时 transform 动画阶段声明合成意图。
- 页面切换不使用大面积 blur/filter。

## Icon Contract

UnoCSS 静态扫描无法发现配置对象中的动态 icon classes。`uno.config.ts` 的 `extractIcons()` 从 user/media config 收集 icon，并结合 core safelist。

新增配置 icon 来源时：

1. 确认 extractIcons 覆盖该配置。
2. 或显式加入 safelist。
3. 运行生产 build 检查 CSS/icon。

## Runtime Theme Contract

- `data-theme` 始终是 resolved `light`/`dark`。
- localStorage `theme` 可为 `light`、`dark`、`system`。
- 两个根布局必须输出同一主题变量和首屏解析逻辑。
- reduced-motion 和 fallback glass behavior 需要保留。

## Sources of Truth

- `src/design-system/theme/`
- `src/app/config/theme.config.ts`
- `src/design-system/styles/`
- `uno.config.ts`
- `src/shared/client/runtime/theme-sync.ts`
