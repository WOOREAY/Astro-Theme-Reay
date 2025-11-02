// src/theme/config.ts
import type { ThemeConfig, UserThemeOverrides } from './types';
import { defaultTypography, defaultShape, DEFAULT_PRIMARY } from './tokens';
import { generateMaterialPalettes } from './generate';

export function createTheme(overrides?: UserThemeOverrides): ThemeConfig {
  const primary = overrides?.primary ?? DEFAULT_PRIMARY;
  const { light, dark } = generateMaterialPalettes(primary);

  const typography = {
    ...defaultTypography,
    ...overrides?.typography,
    scale: { ...defaultTypography.scale, ...(overrides?.typography?.scale ?? {}) },
  };
  const shape = { ...defaultShape, ...(overrides?.shape ?? {}) };

  return {
    mode: overrides?.mode ?? 'system',
    paletteLight: light,
    paletteDark: dark,
    typography,
    shape,
  };
}