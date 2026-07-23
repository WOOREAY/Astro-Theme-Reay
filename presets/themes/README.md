# Theme Presets

这里的预设只定义视觉语言，不包含姓名、邮箱、GitHub、导航、文章或第三方凭据。

| ID | 名称 | 适合场景 |
| --- | --- | --- |
| `technology` | 科技流光 | 默认科技感主页、开源项目与开发博客 |
| `paper` | 暖纸手记 | 纸张、手记、散文和生活记录 |
| `eink` | 墨水屏 | 低干扰长文阅读与知识库 |
| `forest` | 青苔护眼 | 长时间浏览、日常记录和自然主题 |
| `editorial` | 朱砂刊物 | 独立杂志、作品集和编辑式博客 |

## 一行切换

编辑 `src/app/config/theme.config.ts`：

```ts
export const activeThemePreset = 'paper' satisfies ThemePresetName;
```

## 在预设上局部修改

同一文件中的 `themeOverrides` 会深度合并常用嵌套字段：

```ts
export const themeOverrides = {
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
} satisfies ThemePresetOverrides;
```

主色和 `source` 会继续通过 MD3 生成完整浅色、深色调色板。若增加未自托管的字体，请同时在 `DocumentShell.astro` 引入字体资源；否则保留预设提供的系统字体回退。

## 创建自己的预设

复制一个 `.ts` 文件、修改元数据与 `config`，再将它加入 `index.ts` 的 `themePresets`。所有预设会被 Astro/TypeScript 一起校验，即使当前没有启用。
