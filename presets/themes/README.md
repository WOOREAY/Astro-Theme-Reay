# Theme Presets

这里的预设只定义视觉语言，不包含姓名、邮箱、GitHub、导航、文章或第三方凭据。

| ID | 名称 | 适合场景 |
| --- | --- | --- |
| `technology` | 科技流光 | 默认科技感主页、开源项目与开发博客 |
| `paper` | 米纸手记 | 米黄色低彩度纸张、手记、散文和生活记录 |
| `eink` | 墨水屏 | 低干扰长文阅读与知识库 |
| `forest` | 青苔护眼 | 长时间浏览、日常记录和自然主题 |
| `editorial` | 朱砂刊物 | 独立杂志、作品集和编辑式博客 |

## 一个对象完成配置

编辑 `src/app/config/theme.config.ts`：

```ts
export const themeConfig = defineTheme({
  preset: 'paper',
  primary: '#5F7355',
  typography: {
    baseSize: 16,
  },
  shape: {
    radiusLg: '18px',
  },
  background: {
    decoration: 'paper',
  },
});
```

不写其他字段时只需修改 `preset`。填写 `primary` 会从新主色重新生成完整 MD3 配色；填写高级 `source` 时则只采用显式关键色。背景、字体、shape 和 effects 都在同一对象中按层级覆盖。

完整参数和图片背景示例见 [`docs/THEME-CONFIG.md`](../../docs/THEME-CONFIG.md)。若增加未自托管的字体，请同时在 `DocumentShell.astro` 引入字体资源。

## 创建自己的预设

复制一个 `.ts` 文件、修改元数据与 `config`，再将它加入 `index.ts` 的 `themePresets`。随后在 `theme.config.ts` 修改 `preset`。所有预设都会被 Astro/TypeScript 校验，即使当前没有启用。
