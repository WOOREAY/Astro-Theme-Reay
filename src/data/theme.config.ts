/**
 * Theme Configuration
 *
 * Edit `themeConfig` first. Types and compatibility exports are kept below the
 * editable configuration so this file stays easy to scan.
 */

import type { UserThemeOverrides } from '../theme';

export const themeConfig = {
  // Primary color used to generate the Material Design 3 palette.
  primary: '#00aaffff',

  typography: {
    fontFamily: 'Inter, "Noto Sans SC", system-ui, sans-serif',
    lineHeight: 1.65,
  },

  background: {
    type: 'gradient',
    blur: true,
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

export interface ThemeConfig extends UserThemeOverrides {
  background: BackgroundConfig;
}
