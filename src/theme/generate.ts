import type { Palette } from './types';
import { themeFromSourceColor, argbFromHex, hexFromArgb } from '@material/material-color-utilities';

function schemeToPalette(scheme: any): Palette {
  const pick = (k: string) => {
    if (!(k in scheme) || scheme[k] === undefined || scheme[k] === 0) {
      console.warn(`Missing scheme property: ${k}, using fallback`);
      return '#000000';
    }
    return hexFromArgb(scheme[k]);
  };
  
  const surface = pick('surface');
  const surfaceVariant = pick('surfaceVariant');
  
  return {
    primary: pick('primary'), onPrimary: pick('onPrimary'),
    primaryContainer: pick('primaryContainer'), onPrimaryContainer: pick('onPrimaryContainer'),

    secondary: pick('secondary'), onSecondary: pick('onSecondary'),
    secondaryContainer: pick('secondaryContainer'), onSecondaryContainer: pick('onSecondaryContainer'),

    tertiary: pick('tertiary'), onTertiary: pick('onTertiary'),
    tertiaryContainer: pick('tertiaryContainer'), onTertiaryContainer: pick('onTertiaryContainer'),

    background: pick('background'), onBackground: pick('onBackground'),
    surface: surface, onSurface: pick('onSurface'),
    surfaceVariant: surfaceVariant, onSurfaceVariant: pick('onSurfaceVariant'),
    
    surfaceDim: 'surfaceDim' in scheme && scheme.surfaceDim ? pick('surfaceDim') : surface,
    surfaceBright: 'surfaceBright' in scheme && scheme.surfaceBright ? pick('surfaceBright') : surface,
    surfaceContainerLowest: 'surfaceContainerLowest' in scheme && scheme.surfaceContainerLowest ? pick('surfaceContainerLowest') : surface,
    surfaceContainerLow: 'surfaceContainerLow' in scheme && scheme.surfaceContainerLow ? pick('surfaceContainerLow') : surfaceVariant,
    surfaceContainer: 'surfaceContainer' in scheme && scheme.surfaceContainer ? pick('surfaceContainer') : surfaceVariant,
    surfaceContainerHigh: 'surfaceContainerHigh' in scheme && scheme.surfaceContainerHigh ? pick('surfaceContainerHigh') : surfaceVariant,
    surfaceContainerHighest: 'surfaceContainerHighest' in scheme && scheme.surfaceContainerHighest ? pick('surfaceContainerHighest') : surfaceVariant,
    
    outline: pick('outline'),
    outlineVariant: pick('outlineVariant'),

    error: pick('error'), onError: pick('onError'),
    success: '#10B981', warning: '#F59E0B', info: '#3B82F6',
  };
}

export function generateMaterialPalettes(primaryHex: string): { light: Palette; dark: Palette } {
  const seed = argbFromHex(primaryHex);
  const theme = themeFromSourceColor(seed);
  const light = schemeToPalette((theme as any).schemes.light);
  const dark  = schemeToPalette((theme as any).schemes.dark);
  return { light, dark };
}