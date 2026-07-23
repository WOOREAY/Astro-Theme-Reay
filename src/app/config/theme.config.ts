/**
 * Theme Configuration
 *
 * Edit `themeConfig` first. Types and compatibility exports are kept below the
 * editable configuration so this file stays easy to scan.
 */

import type { FontFamilyRoles, UserThemeOverrides } from '@design/theme';

/**
 * Role-based font stacks.
 *
 * `global` is the site-wide fallback. Leave any semantic role empty to inherit
 * `global`; `mono` keeps its own code-oriented fallback. This lets a site owner
 * change one font once, while still allowing deliberate exceptions for brand,
 * navigation, headings, metadata, and Markdown/Plog prose.
 */
export const fontFamilies = {
  global: '"Nunito Variable", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", ui-rounded, system-ui, sans-serif',
  brand: '',
  navigation: '',
  heading: '',
  body: '',
  metadata: '',
  prose: '',
  proseHeading: '',
  mono: 'ui-monospace, "SFMono-Regular", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
} satisfies FontFamilyRoles;

export const themeConfig = {
  // Primary color used to generate the Material Design 3 palette.
  primary: '#00eeff',
  // Optional advanced key colors. Leave commented to derive the full palette from primary.
  // source: {
  //   primary: '#00eeff',
  //   secondary: '#6fd4d8',
  //   tertiary: '#b8c6ff',
  // },

  typography: {
    fontFamilies,
    // The root size scales rem-based typography and spacing across the site.
    baseSize: 15,
    lineHeight: 1.6,
  },

  background: {
    type: 'gradient',
    blur: false,
    blurIntensity: 'light',

    // Uncomment and set `type: 'image'` to use a custom background image.
    // imageUrl: '/images/background.jpg',
    imageStyle: {
      size: 'cover',
      position: 'center',
      repeat: 'no-repeat',
      opacity: 0.6,
    },

    gradient: {
      useMD3Colors: true,
      direction: '135deg',
      // colors: ['#5B8CFF', '#00D4AA'],
    },
  },

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
  },
} satisfies ThemeConfig;

/**
 * Backward-compatible export for older user customizations.
 */
export const backgroundConfig: BackgroundConfig = themeConfig.background;

export interface BackgroundConfig {
  type: 'gradient' | 'image' | 'none';
  blur: boolean;
  blurIntensity: 'light' | 'medium' | 'heavy';
  imageUrl?: string;
  imageStyle?: {
    size?: 'cover' | 'contain' | 'auto';
    position?: string;
    repeat?: string;
    opacity?: number;
  };
  gradient?: {
    useMD3Colors?: boolean;
    colors?: string[];
    direction?: string;
  };
}

export type SeasonalEffectSeason = 'auto' | 'spring' | 'summer' | 'autumn' | 'winter';
export type VisualEffectDensity = 'low' | 'medium' | 'high';
export type HomeWaveIntensity = 'low' | 'medium' | 'high';

export interface EffectsConfig {
  homeWave: {
    enabled: boolean;
    intensity: HomeWaveIntensity;
  };
  seasonal: {
    enabled: boolean;
    /**
     * auto follows the visitor's current month:
     * Mar-May spring, Jun-Aug summer, Sep-Nov autumn, Dec-Feb winter.
     */
    season: SeasonalEffectSeason;
    density: VisualEffectDensity;
    showOnMobile: boolean;
    respectReducedMotion: boolean;
    seasons: {
      spring: boolean;
      summer: boolean;
      autumn: boolean;
      winter: boolean;
    };
  };
}

export interface ThemeConfig extends UserThemeOverrides {
  background: BackgroundConfig;
  effects: EffectsConfig;
}
