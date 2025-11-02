// src/theme/css-vars.ts
import type { ThemeConfig, Palette } from './types';

/**
 * 将 hex 颜色转换为 RGB 值 (不含 rgb() 包装)
 */
function hexToRGB(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}

function paletteToVars(prefix: string, p: Palette) {
  return `
${prefix}{
  /* MD3 Primary */
  --md-sys-color-primary:${p.primary};
  --md-sys-color-primary-rgb:${hexToRGB(p.primary)};
  --md-sys-color-on-primary:${p.onPrimary};
  --md-sys-color-on-primary-rgb:${hexToRGB(p.onPrimary)};
  --md-sys-color-primary-container:${p.primaryContainer};
  --md-sys-color-primary-container-rgb:${hexToRGB(p.primaryContainer)};
  --md-sys-color-on-primary-container:${p.onPrimaryContainer};
  --md-sys-color-on-primary-container-rgb:${hexToRGB(p.onPrimaryContainer)};
  
  /* MD3 Secondary */
  --md-sys-color-secondary:${p.secondary};
  --md-sys-color-secondary-rgb:${hexToRGB(p.secondary)};
  --md-sys-color-on-secondary:${p.onSecondary};
  --md-sys-color-on-secondary-rgb:${hexToRGB(p.onSecondary)};
  --md-sys-color-secondary-container:${p.secondaryContainer};
  --md-sys-color-secondary-container-rgb:${hexToRGB(p.secondaryContainer)};
  --md-sys-color-on-secondary-container:${p.onSecondaryContainer};
  --md-sys-color-on-secondary-container-rgb:${hexToRGB(p.onSecondaryContainer)};
  
  /* MD3 Tertiary */
  --md-sys-color-tertiary:${p.tertiary};
  --md-sys-color-tertiary-rgb:${hexToRGB(p.tertiary)};
  --md-sys-color-on-tertiary:${p.onTertiary};
  --md-sys-color-on-tertiary-rgb:${hexToRGB(p.onTertiary)};
  --md-sys-color-tertiary-container:${p.tertiaryContainer};
  --md-sys-color-tertiary-container-rgb:${hexToRGB(p.tertiaryContainer)};
  --md-sys-color-on-tertiary-container:${p.onTertiaryContainer};
  --md-sys-color-on-tertiary-container-rgb:${hexToRGB(p.onTertiaryContainer)};
  
  /* MD3 Surface & Background */
  --md-sys-color-background:${p.background};
  --md-sys-color-background-rgb:${hexToRGB(p.background)};
  --md-sys-color-on-background:${p.onBackground};
  --md-sys-color-on-background-rgb:${hexToRGB(p.onBackground)};
  --md-sys-color-surface:${p.surface};
  --md-sys-color-surface-rgb:${hexToRGB(p.surface)};
  --md-sys-color-on-surface:${p.onSurface};
  --md-sys-color-on-surface-rgb:${hexToRGB(p.onSurface)};
  --md-sys-color-surface-variant:${p.surfaceVariant};
  --md-sys-color-surface-variant-rgb:${hexToRGB(p.surfaceVariant)};
  --md-sys-color-on-surface-variant:${p.onSurfaceVariant};
  --md-sys-color-on-surface-variant-rgb:${hexToRGB(p.onSurfaceVariant)};
  
  /* MD3 Extended Surface Levels */
  --md-sys-color-surface-dim:${p.surfaceDim || p.surface};
  --md-sys-color-surface-dim-rgb:${hexToRGB(p.surfaceDim || p.surface)};
  --md-sys-color-surface-bright:${p.surfaceBright || p.surface};
  --md-sys-color-surface-bright-rgb:${hexToRGB(p.surfaceBright || p.surface)};
  --md-sys-color-surface-container-lowest:${p.surfaceContainerLowest || p.surface};
  --md-sys-color-surface-container-lowest-rgb:${hexToRGB(p.surfaceContainerLowest || p.surface)};
  --md-sys-color-surface-container-low:${p.surfaceContainerLow || p.surfaceVariant};
  --md-sys-color-surface-container-low-rgb:${hexToRGB(p.surfaceContainerLow || p.surfaceVariant)};
  --md-sys-color-surface-container:${p.surfaceContainer || p.surfaceVariant};
  --md-sys-color-surface-container-rgb:${hexToRGB(p.surfaceContainer || p.surfaceVariant)};
  --md-sys-color-surface-container-high:${p.surfaceContainerHigh || p.surfaceVariant};
  --md-sys-color-surface-container-high-rgb:${hexToRGB(p.surfaceContainerHigh || p.surfaceVariant)};
  --md-sys-color-surface-container-highest:${p.surfaceContainerHighest || p.surfaceVariant};
  --md-sys-color-surface-container-highest-rgb:${hexToRGB(p.surfaceContainerHighest || p.surfaceVariant)};
  
  /* MD3 Outline */
  --md-sys-color-outline:${p.outline};
  --md-sys-color-outline-rgb:${hexToRGB(p.outline)};
  --md-sys-color-outline-variant:${p.outlineVariant || p.outline};
  --md-sys-color-outline-variant-rgb:${hexToRGB(p.outlineVariant || p.outline)};
  
  /* MD3 Error */
  --md-sys-color-error:${p.error};
  --md-sys-color-error-rgb:${hexToRGB(p.error)};
  --md-sys-color-on-error:${p.onError};
  --md-sys-color-on-error-rgb:${hexToRGB(p.onError)};
  
  /* Custom utility colors (non-MD3 standard) */
  --md-ref-palette-success:${p.success};
  --md-ref-palette-success-rgb:${hexToRGB(p.success)};
  --md-ref-palette-warning:${p.warning};
  --md-ref-palette-warning-rgb:${hexToRGB(p.warning)};
  --md-ref-palette-info:${p.info};
  --md-ref-palette-info-rgb:${hexToRGB(p.info)};
}
`.trim();
}

export function themeToCSSVars(theme: ThemeConfig) {
  const { paletteLight: L, paletteDark: D, typography: t, shape: s } = theme;

  const baseTokens = `
:root{
  /* typography */
  --font-sans:${t.fontFamily};
  --font-mono:${t.fontFamilyMono};
  --text-base:${t.baseSize}px;
  --leading:${t.lineHeight};
  --fs-xs:${t.scale.xs}rem; --fs-sm:${t.scale.sm}rem; --fs-md:${t.scale.md}rem;
  --fs-lg:${t.scale.lg}rem; --fs-xl:${t.scale.xl}rem; --fs-2xl:${t.scale['2xl']}rem; --fs-3xl:${t.scale['3xl']}rem;

  /* shape */
  --radius-sm:${s.radiusSm}; --radius-md:${s.radiusMd}; --radius-lg:${s.radiusLg};
  --border-w:${s.borderWidth};
  --shadow-sm:${s.shadowSm}; --shadow-md:${s.shadowMd}; --shadow-lg:${s.shadowLg};
}
`.trim();

  // 默认用亮色；系统暗色时自动覆盖；用户手动切换再用 data-theme 强制覆盖
  return [
    baseTokens,
    paletteToVars(':root', L),
    `@media (prefers-color-scheme: dark){ ${paletteToVars(':root', D)} }`,
    paletteToVars(':root[data-theme="light"]', L),
    paletteToVars(':root[data-theme="dark"]', D),
  ].join('\n');
}