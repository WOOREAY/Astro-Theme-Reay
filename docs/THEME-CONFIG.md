# 主题与预设配置

Astro Theme Reay 使用 Material Design 3（MD3）从少量关键色生成完整浅色、深色调色板。主题入口是 `src/app/config/theme.config.ts`，可复用预设位于 `presets/themes/`。

## 快速选择预设

只需修改一行：

```ts
export const activeThemePreset = 'paper' satisfies ThemePresetName;
```

内置预设：

| ID | 中文名 | 视觉特点 |
| --- | --- | --- |
| `technology` | 科技流光 | 默认青蓝配色、圆体、柔和光晕与轻网格 |
| `paper` | 暖纸手记 | 茶褐色、宋体正文、纸纤维与克制阴影 |
| `eink` | 墨水屏 | 低彩度、近直角、无抬升阴影与电子纸颗粒 |
| `forest` | 青苔护眼 | 鼠尾草绿、柔和圆角和低刺激纸面纹理 |
| `editorial` | 朱砂刊物 | 朱砂红、衬线标题和独立杂志式边界 |

预设只包含视觉参数，不会覆盖姓名、联系方式、导航、文章、项目或第三方凭据。

## 在预设上局部修改

`themeOverrides` 会深度合并常用嵌套配置：

```ts
export const themeOverrides = {
  primary: '#5F7355',
  typography: {
    baseSize: 16,
    lineHeight: 1.72,
  },
  shape: {
    radiusLg: '18px',
  },
  background: {
    decoration: 'paper',
  },
} satisfies ThemePresetOverrides;
```

未填写的值继续继承当前预设。修改 `primary` 时，合并器也会同步 MD3 `source.primary`，确保新主色真正进入调色板。

## MD3 关键色

只设置 `primary` 即可生成完整配色。需要更细控制时覆盖 `source`：

```ts
export const themeOverrides = {
  source: {
    primary: '#765B35',
    variant: 'tonal-spot', // 墨水屏可使用 'monochrome'
    secondary: '#756B4E',
    tertiary: '#8A6047',
    neutral: '#746F65',
    neutralVariant: '#7C7162',
  },
} satisfies ThemePresetOverrides;
```

生成结果包含 `primary`、`secondary`、`tertiary`、surface/container、outline、error 及对应 on-color，组件只消费这些语义角色。

## 字体角色

字体按用途拆分，空缺时由预设提供完整回退栈：

| 角色 | 使用位置 |
| --- | --- |
| `global` | 全站基础回退 |
| `brand` | 品牌名和 Hero 姓名 |
| `navigation` | Header、Footer 和按钮 |
| `heading` | 页面与章节标题 |
| `body` | 普通界面正文 |
| `metadata` | 日期、统计和标签 |
| `prose` | Blog/Plog Markdown 正文 |
| `proseHeading` | Markdown 内部标题 |
| `mono` | 代码和键盘输入 |

示例：保留纸张预设，只把界面改回圆体：

```ts
export const themeOverrides = {
  typography: {
    fontFamilies: {
      global: fontStacks.rounded.global,
      navigation: fontStacks.rounded.global,
      body: fontStacks.rounded.global,
    },
  },
} satisfies ThemePresetOverrides;
```

当前仓库自托管 Nunito Variable、寒蝉全圆体和 Noto Sans SC Variable。纸张/刊物预设使用系统衬线字体回退，不增加网络字体请求。引入新字体时需同时在 `DocumentShell.astro` 加载相应资源。

## 背景与纹理

```ts
background: {
  type: 'gradient',       // 'gradient' | 'image' | 'none'
  decoration: 'paper',   // 'aurora' | 'paper' | 'eink' | 'plain'
  blur: false,
  blurIntensity: 'light',
  gradient: {
    useMD3Colors: true,
    direction: '155deg',
  },
}
```

- `aurora`：光晕和轻量网格，适合科技风。
- `paper`：细微纤维和颗粒，适合暖纸或护眼主题。
- `eink`：低对比点阵与扫描纹理，适合墨水屏主题。
- `plain`：不叠加装饰，只保留背景色或渐变。

图片背景可填写 `imageUrl` 与 `imageStyle`。`blur` 会增加合成成本，默认关闭；移动端和长页面优先使用无模糊方案。

## 圆角与阴影

```ts
shape: {
  radiusXs: '2px',
  radiusSm: '5px',
  radiusMd: '9px',
  radiusLg: '14px',
  radiusXl: '18px',
  radiusPill: '999px',
  borderWidth: '1px',
  shadowSm: 'none',
  shadowMd: 'none',
  shadowLg: 'none',
}
```

这些值会输出为共享 CSS 变量，并由 Reay 卡片、按钮和功能表面消费。墨水屏预设使用近直角和无阴影；科技与护眼预设使用更圆润的层级。

## 动效

```ts
effects: {
  homeWave: {
    enabled: false,
    intensity: 'low',
  },
  seasonal: {
    enabled: false,
    season: 'auto',
    density: 'low',
    showOnMobile: false,
    respectReducedMotion: true,
    seasons: {
      spring: true,
      summer: true,
      autumn: true,
      winter: true,
    },
  },
}
```

预设默认关闭持续动效。重新启用时保留 `respectReducedMotion: true`，并单独检查移动端性能。

## 创建自己的预设

1. 复制 `presets/themes/` 中最接近的一套 `.ts` 文件。
2. 修改名称、说明和 `config`。
3. 在 `presets/themes/index.ts` 的 `themePresets` 注册新 ID。
4. 在 `theme.config.ts` 选择它。
5. 运行验证。

所有已注册预设都会被 TypeScript 校验，即使当前没有启用。预设目录的简表见 [`presets/themes/README.md`](../presets/themes/README.md)。

## 验证

```bash
npm run check
npm run test:config
npm run build
npm run test:e2e:dist
```

至少检查首页、Blog 详情、归档和相册，并分别验证浅色、深色、1440×900 与 390×844。确认 `scrollWidth <= clientWidth`、字体资源正常加载，背景纹理不会遮挡文字。
