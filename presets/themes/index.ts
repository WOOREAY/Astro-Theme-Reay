import type { ThemeConfig } from '../../src/app/config/theme.types';
import { editorialThemePreset } from './editorial';
import { einkThemePreset } from './eink';
import { forestThemePreset } from './forest';
import { paperThemePreset } from './paper';
import { technologyThemePreset } from './technology';
import type { ThemePresetOverrides } from './types';

export { fontStacks } from './fonts';
export type { ThemePresetDefinition, ThemePresetOverrides } from './types';

export const themePresets = {
  technology: technologyThemePreset,
  paper: paperThemePreset,
  eink: einkThemePreset,
  forest: forestThemePreset,
  editorial: editorialThemePreset,
} as const;

export type ThemePresetName = keyof typeof themePresets;
export const themePresetNames = Object.keys(themePresets) as ThemePresetName[];

export function createThemePreset(
  name: ThemePresetName,
  overrides: ThemePresetOverrides = {},
): ThemeConfig {
  const base: ThemeConfig = themePresets[name].config;
  const primary = overrides.source?.primary ?? overrides.primary ?? base.source?.primary ?? base.primary;

  return {
    ...base,
    ...overrides,
    primary,
    source: { ...base.source, ...overrides.source, primary },
    typography: {
      ...base.typography,
      ...overrides.typography,
      fontFamilies: {
        ...base.typography.fontFamilies,
        ...overrides.typography?.fontFamilies,
      },
      scale: {
        ...base.typography.scale,
        ...overrides.typography?.scale,
      },
    },
    shape: { ...base.shape, ...overrides.shape },
    background: {
      ...base.background,
      ...overrides.background,
      imageStyle: {
        ...base.background.imageStyle,
        ...overrides.background?.imageStyle,
      },
      gradient: {
        ...base.background.gradient,
        ...overrides.background?.gradient,
      },
    },
    effects: {
      homeWave: {
        ...base.effects.homeWave,
        ...overrides.effects?.homeWave,
      },
      seasonal: {
        ...base.effects.seasonal,
        ...overrides.effects?.seasonal,
        seasons: {
          ...base.effects.seasonal.seasons,
          ...overrides.effects?.seasonal?.seasons,
        },
      },
    },
  };
}
