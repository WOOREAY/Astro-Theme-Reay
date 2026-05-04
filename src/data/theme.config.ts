/**
 * Theme Configuration
 * 
 * Customize the visual appearance of your site including colors,
 * background, typography, and Material Design 3 color palette.
 */

import type { UserThemeOverrides } from '../theme';

/**
 * Background configuration options
 */
export interface BackgroundConfig {
  /** Background type: 'gradient' | 'image' | 'none' */
  type: 'gradient' | 'image' | 'none';
  
  /** Enable background blur effect */
  blur: boolean;
  
  /** Blur intensity: 'light' | 'medium' | 'heavy' */
  blurIntensity: 'light' | 'medium' | 'heavy';
  
  /** Custom background image URL (when type='image') */
  imageUrl?: string;
  
  /** Background image style options */
  imageStyle?: {
    size?: 'cover' | 'contain' | 'auto';
    position?: string;
    repeat?: string;
    opacity?: number;
  };
  
  /** Gradient configuration (when type='gradient') */
  gradient?: {
    useMD3Colors?: boolean;
    colors?: string[];
    direction?: string;
  };
}

/**
 * Extended theme configuration with background settings
 */
export interface ThemeConfig extends UserThemeOverrides {
  background: BackgroundConfig;
}

/**
 * Main theme configuration
 * Customize colors, typography, and background to match your brand
 */
export const themeConfig: ThemeConfig = {
  /** Primary color - generates the complete MD3 color palette */
  primary: '#00aaffff',

  /** Typography settings */
  typography: {
    fontFamily: 'Inter, "Noto Sans SC", system-ui, sans-serif',
    lineHeight: 1.65,
  },

  /** Background configuration */
  background: {
    type: 'gradient',
    blur: true,
    blurIntensity: 'light',

    // Example custom background image (uncomment to use)
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
    },
  },
};

/**
 * Backward-compatible export for older user customizations.
 */
export const backgroundConfig: BackgroundConfig = themeConfig.background;
