/**
 * Theme Configuration
 *
 * Choose one visual preset, then add only the overrides that belong to this
 * site. Presets never contain identity, navigation, content, or credentials.
 */

import {
  createThemePreset,
  fontStacks,
  themePresets,
  type ThemePresetName,
  type ThemePresetOverrides,
} from '../../../presets/themes';

/** Change this one value to switch the complete visual language. */
export const activeThemePreset = 'technology' satisfies ThemePresetName;

/**
 * Optional site-specific changes layered over the selected preset.
 * Nested color, typography, shape, background, and effect values are merged.
 */
export const themeOverrides = {
  // primary: '#5B8CFF',
  // typography: { baseSize: 16 },
  // background: { decoration: 'plain' },
} satisfies ThemePresetOverrides;

export const themeConfig = createThemePreset(activeThemePreset, themeOverrides);

/** Discoverable metadata for a future settings UI or documentation tooling. */
export const availableThemePresets = themePresets;

/** Backward-compatible exports for existing user customizations. */
export { fontStacks };
export const fontFamilies = themeConfig.typography.fontFamilies;
export const backgroundConfig = themeConfig.background;

export type {
  BackgroundConfig,
  BackgroundDecoration,
  EffectsConfig,
  HomeWaveIntensity,
  SeasonalEffectSeason,
  ThemeConfig,
  VisualEffectDensity,
} from './theme.types';
