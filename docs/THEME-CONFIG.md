# Theme Configuration

Customize the visual appearance of your site using Material Design 3.

## Configuration File

Theme settings are in `src/data/theme.config.ts`

## Basic Theme Configuration

```typescript
export const themeConfig = {
  // Theme mode
  mode: 'system',  // 'light' | 'dark' | 'system'
  
  // Primary color (main brand color)
  primary: '#5B8CFF',
  
  // Enable smooth transitions
  enableTransitions: true,
  
  // Animation duration
  transitionDuration: '0.3s',
}
```

## Theme Modes

### Light Mode
```typescript
mode: 'light'
```
Always shows light theme, regardless of system preference.

### Dark Mode
```typescript
mode: 'dark'
```
Always shows dark theme, regardless of system preference.

### System Mode (Recommended)
```typescript
mode: 'system'
```
Automatically matches user's system preference.

**User can override** with the theme toggle button.

## Primary Color

The primary color is your brand color. All other colors are generated from it.

### Changing Primary Color

```typescript
primary: '#FF6B6B'  // Red
primary: '#4ECDC4'  // Teal
primary: '#95E1D3'  // Mint
primary: '#F38181'  // Pink
primary: '#5B8CFF'  // Blue (default)
```

### Material Design 3 Color System

From your primary color, the theme automatically generates:

**Light Mode Palette:**
- Primary (your chosen color)
- Primary Container (lighter variant)
- Secondary (harmonious complement)
- Secondary Container
- Tertiary (accent color)
- Tertiary Container
- Surface colors (backgrounds)
- Error colors

**Dark Mode Palette:**
- Automatically adjusted for dark backgrounds
- Proper contrast ratios
- WCAG AAA compliance

### Color Preview

To see your colors:

1. Change `primary` in `theme.config.ts`
2. Restart dev server
3. Check homepage and toggle dark mode
4. All components update automatically

## Advanced Color Customization

For complete control, edit `src/theme/config.ts`:

```typescript
export function createTheme(overrides?: UserThemeOverrides): ThemeConfig {
  return {
    mode: overrides?.mode || 'system',
    
    // Customize light mode palette
    paletteLight: {
      primary: '#5B8CFF',
      onPrimary: '#FFFFFF',
      primaryContainer: '#DBE6FF',
      onPrimaryContainer: '#123060',
      // ... more colors
    },
    
    // Customize dark mode palette
    paletteDark: {
      primary: '#B3C7FF',
      onPrimary: '#0A2948',
      primaryContainer: '#2B4B7F',
      onPrimaryContainer: '#DBE6FF',
      // ... more colors
    },
    
    // Typography
    typography: {
      fontFamily: 'Inter, sans-serif',
      baseSize: 16,
      lineHeight: 1.7,
    },
    
    // Shape
    shape: {
      radiusSm: '8px',
      radiusMd: '16px',
      radiusLg: '24px',
    }
  }
}
```

## Typography

### Font Families

**Default Stack:**
```css
-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif
```

**Customize:**
```typescript
typography: {
  fontFamily: '"Your Font", -apple-system, sans-serif',
  fontFamilyMono: '"Fira Code", "JetBrains Mono", monospace',
}
```

**Loading Custom Fonts:**

Add to `src/layouts/base/BaseLayout.astro`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Your+Font&display=swap" rel="stylesheet">
```

### Type Scale

```typescript
typography: {
  baseSize: 16,      // Base font size in px
  lineHeight: 1.7,   // Line height multiplier
  
  scale: {
    xs: 0.75,    // 12px
    sm: 0.875,   // 14px
    md: 1,       // 16px (base)
    lg: 1.125,   // 18px
    xl: 1.25,    // 20px
    '2xl': 1.5,  // 24px
    '3xl': 1.875 // 30px
  }
}
```

## Shape and Borders

### Border Radius

```typescript
shape: {
  radiusSm: '4px',   // Small components (buttons, inputs)
  radiusMd: '12px',  // Medium components (cards)
  radiusLg: '24px',  // Large components (dialogs)
}
```

**Sharp Corners:**
```typescript
radiusSm: '0px',
radiusMd: '0px',
radiusLg: '0px',
```

**Extra Rounded:**
```typescript
radiusSm: '12px',
radiusMd: '24px',
radiusLg: '32px',
```

### Border Width

```typescript
shape: {
  borderWidth: '1px',  // Standard border thickness
}
```

### Shadows

```typescript
shape: {
  shadowSm: '0 1px 2px rgba(0,0,0,.06)',
  shadowMd: '0 8px 30px rgba(0,0,0,.08)',
  shadowLg: '0 18px 40px rgba(0,0,0,.12)',
}
```

**No Shadows (Flat Design):**
```typescript
shadowSm: 'none',
shadowMd: 'none',
shadowLg: 'none',
```

## Transitions and Animations

### Global Transitions

```typescript
enableTransitions: true,          // Enable smooth transitions
transitionDuration: '0.3s',       // Transition speed
transitionTimingFunction: 'ease', // Easing function
```

**Faster Animations:**
```typescript
transitionDuration: '0.15s',
```

**Slower Animations:**
```typescript
transitionDuration: '0.5s',
```

**Disable Animations:**
```typescript
enableTransitions: false,
```

### Reduced Motion

Automatically respects user's `prefers-reduced-motion` setting.

## Component Customization

### Header

Edit `src/components/common/Header.astro`:

```typescript
// Height
const headerHeight = '64px'

// Background opacity
const bgOpacity = 0.95

// Blur effect
const backdropBlur = '10px'
```

### Footer

Edit `src/components/common/Footer.astro`:

```typescript
// Show powered by
const showPoweredBy = true

// Link style
const linkColor = 'primary'
```

### Cards

Global card styles in `src/styles/global.css`:

```css
.card {
  background: var(--md-sys-color-surface-container);
  border-radius: var(--md-sys-shape-corner-medium);
  padding: 1.5rem;
}
```

## Color Reference

### Using CSS Variables

All theme colors are available as CSS variables:

```css
/* Primary */
var(--md-sys-color-primary)
var(--md-sys-color-on-primary)
var(--md-sys-color-primary-container)
var(--md-sys-color-on-primary-container)

/* Secondary */
var(--md-sys-color-secondary)
var(--md-sys-color-on-secondary)

/* Surface */
var(--md-sys-color-surface)
var(--md-sys-color-on-surface)
var(--md-sys-color-surface-variant)

/* Background */
var(--md-sys-color-background)
var(--md-sys-color-on-background)

/* Error */
var(--md-sys-color-error)
var(--md-sys-color-on-error)
```

See [MD3 Color Guide](./MD3-COLOR-GUIDE.md) for complete reference.

## Preset Themes

### Minimal Blue (Default)
```typescript
primary: '#5B8CFF'
```

### Vibrant Purple
```typescript
primary: '#A78BFA'
```

### Nature Green
```typescript
primary: '#10B981'
```

### Warm Orange
```typescript
primary: '#F59E0B'
```

### Ocean Teal
```typescript
primary: '#14B8A6'
```

### Sunset Pink
```typescript
primary: '#EC4899'
```

## Dark Mode Customization

### Separate Dark Palette

For full control over dark mode:

```typescript
paletteDark: {
  primary: '#B3C7FF',           // Lighter for dark bg
  onPrimary: '#0A2948',         // Darker text
  surface: '#1A1C1E',           // Dark surface
  onSurface: '#E3E2E6',         // Light text
  background: '#131416',        // Darker background
  // ...
}
```

### Dark Mode Adjustments

Common tweaks for dark mode:

**Higher Contrast:**
```typescript
surface: '#000000',
onSurface: '#FFFFFF',
```

**Softer Contrast:**
```typescript
surface: '#242424',
onSurface: '#E0E0E0',
```

**True Black (OLED):**
```typescript
background: '#000000',
surface: '#000000',
```

## Testing Your Theme

### Checklist

- [ ] Check light mode on all pages
- [ ] Check dark mode on all pages
- [ ] Toggle theme switches properly
- [ ] All text is readable
- [ ] Links are distinguishable
- [ ] Focus states are visible
- [ ] Hover states work
- [ ] Cards have proper contrast
- [ ] Code blocks are readable
- [ ] Images look good in both modes

### Contrast Ratio

Ensure WCAG AAA compliance:
- **Normal text**: 7:1 contrast ratio
- **Large text**: 4.5:1 contrast ratio

Use browser dev tools or online checkers.

## Common Customizations

### Corporate Branding

```typescript
export const themeConfig = {
  primary: '#003DA5',  // Company blue
  typography: {
    fontFamily: '"Corporate Font", sans-serif',
  },
  shape: {
    radiusSm: '0px',
    radiusMd: '0px',
    radiusLg: '0px',
  }
}
```

### Personal Blog

```typescript
export const themeConfig = {
  primary: '#FF6B9D',  // Playful pink
  shape: {
    radiusSm: '12px',
    radiusMd: '20px',
    radiusLg: '28px',
  }
}
```

### Portfolio

```typescript
export const themeConfig = {
  mode: 'dark',        // Dark by default
  primary: '#00F5FF',  // Cyan accent
  enableTransitions: true,
}
```

## Troubleshooting

### Colors not updating

1. Restart dev server
2. Clear browser cache
3. Check browser console for errors

### Theme toggle not working

1. Verify JavaScript is enabled
2. Check console for errors
3. Test in different browser

### Fonts not loading

1. Check font file paths
2. Verify preconnect links
3. Check network tab in dev tools

### Contrast issues

1. Use contrast checker
2. Adjust color brightness
3. Test with actual users

## Related Documentation

- [MD3 Color Guide](./MD3-COLOR-GUIDE.md)
- [Markdown Styles](./MARKDOWN-CUSTOM-GUIDE.md)
- [User Configuration](./USER-CONFIG.md)
- [Customization](./CUSTOMIZATION.md)
