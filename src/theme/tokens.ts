/**
 * Theme Tokens
 * Default color palette, typography, and shape definitions for the theme system
 * 
 * @module theme/tokens
 */
import type { Palette, Typography, Shape } from './types';

/**
 * Default primary color - Bright blue representing a sunny and tech-forward aesthetic
 */
export const DEFAULT_PRIMARY = '#5B8CFF';

/**
 * Default Material Design 3 color palette
 * This is a manually crafted palette that can be overridden by generateMaterialPalette
 * 
 * @remarks
 * Colors follow Material Design 3 color roles:
 * - Primary: Main brand color
 * - Secondary: Supporting color for less prominent components
 * - Tertiary: Accent color for additional visual interest
 * - Container colors: Filled backgrounds with corresponding "on" colors
 * - Surface colors: Background surfaces with variants
 * - Semantic colors: Error, success, warning, info
 */
export const defaultPalette: Palette = {
  primary: DEFAULT_PRIMARY, onPrimary: '#ffffff',
  primaryContainer: '#dbe6ff', onPrimaryContainer: '#123060',

  secondary: '#5ED0FA', onSecondary: '#06222D',
  secondaryContainer: '#CBF1FF', onSecondaryContainer: '#073A4A',

  tertiary: '#A78BFA', onTertiary: '#24124A',
  tertiaryContainer: '#E9D8FD', onTertiaryContainer: '#2B1B52',

  background: '#F6F7FB', onBackground: '#111827',
  surface: '#FFFFFF', onSurface: '#111827',
  surfaceVariant: '#F1F3F5', onSurfaceVariant: '#374151',
  outline: 'rgba(0,0,0,0.12)',

  error: '#EF4444', onError: '#ffffff',
  success: '#10B981', warning: '#F59E0B', info: '#3B82F6',
};

/**
 * Default typography system
 * 
 * @remarks
 * Defines font families, base size, line height, and a type scale for responsive design
 * - fontFamily: System fonts for optimal readability across platforms
 * - fontFamilyMono: Monospace fonts for code display
 * - baseSize: 16px baseline for all text sizing
 * - lineHeight: 1.7 for comfortable reading
 * - scale: Responsive type scale from xs (0.75) to 3xl (1.875)
 */
export const defaultTypography: Typography = {
  fontFamily:
    `Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  fontFamilyMono:
    `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`,
  baseSize: 16,
  lineHeight: 1.7,
  scale: { xs: .75, sm: .875, md: 1, lg: 1.125, xl: 1.25, '2xl': 1.5, '3xl': 1.875 },
};

/**
 * Default shape tokens
 * 
 * @remarks
 * Defines border radius, widths, and shadows for consistent component shapes
 * - radiusSm/Md/Lg: Progressive border radius from subtle to prominent
 * - borderWidth: Standard border thickness
 * - shadowSm/Md/Lg: Elevation shadows for depth hierarchy
 */
export const defaultShape: Shape = {
  radiusSm: '8px',
  radiusMd: '16px',
  radiusLg: '24px',
  borderWidth: '1px',
  shadowSm: '0 1px 2px rgba(0,0,0,.06)',
  shadowMd: '0 8px 30px rgba(0,0,0,.08)',
  shadowLg: '0 18px 40px rgba(0,0,0,.12)',
};