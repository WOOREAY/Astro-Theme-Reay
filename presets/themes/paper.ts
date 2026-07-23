import { createFontRoles, fontStacks } from './fonts';
import type { ThemePresetDefinition } from './types';

export const paperThemePreset = {
  name: 'Paper',
  nameZh: '暖纸手记',
  description: '参考纸张与个人手记的温润观感，使用茶褐配色、宋体正文和细微纸纤维。',
  config: {
    mode: 'system',
    primary: '#765B35',
    source: {
      primary: '#765B35',
      secondary: '#756B4E',
      tertiary: '#8A6047',
      neutral: '#746F65',
      neutralVariant: '#7C7162',
    },
    typography: {
      fontFamilies: createFontRoles(fontStacks.paper.global, {
        navigation: fontStacks.rounded.global,
        metadata: fontStacks.rounded.global,
      }),
      baseSize: 16,
      lineHeight: 1.78,
    },
    shape: {
      radiusXs: '2px',
      radiusSm: '5px',
      radiusMd: '9px',
      radiusLg: '14px',
      radiusXl: '18px',
      radiusPill: '999px',
      borderWidth: '1px',
      shadowSm: '0 1px 2px rgba(var(--md-sys-color-shadow-rgb), 0.05)',
      shadowMd: '0 10px 30px -26px rgba(var(--md-sys-color-shadow-rgb), 0.28)',
      shadowLg: '0 18px 44px -34px rgba(var(--md-sys-color-shadow-rgb), 0.34)',
    },
    background: {
      type: 'gradient',
      decoration: 'paper',
      blur: false,
      blurIntensity: 'light',
      imageStyle: { size: 'cover', position: 'center', repeat: 'no-repeat', opacity: 0.72 },
      gradient: { useMD3Colors: true, direction: '155deg' },
    },
    effects: {
      homeWave: { enabled: false, intensity: 'low' },
      seasonal: {
        enabled: false,
        season: 'autumn',
        density: 'low',
        showOnMobile: false,
        respectReducedMotion: true,
        seasons: { spring: false, summer: false, autumn: true, winter: false },
      },
    },
  },
} satisfies ThemePresetDefinition;
