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

export const backgroundConfig: BackgroundConfig = {
  type: 'none',
  blur: true,
  blurIntensity: 'medium',
  
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
};

/**
 * Main theme configuration
 * Customize colors and typography to match your brand
 */
export const themeConfig: UserThemeOverrides = {
  /** Primary color - generates the complete MD3 color palette */
  primary: '#00aaffff',

  /** Typography settings */
  typography: {
    fontFamily: 'Inter, "Noto Sans SC", system-ui, sans-serif',
    lineHeight: 1.65,
  },
};