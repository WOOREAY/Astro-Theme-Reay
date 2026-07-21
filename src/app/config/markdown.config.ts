/**
 * Markdown Rendering Configuration
 * 
 * Centralized configuration for all Markdown-related plugins and options.
 * This file manages syntax highlighting, math rendering, and content processing.
 */

import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import { unified } from '@astrojs/markdown-remark'
import { remarkReadingTime } from '../../features/blog/lib/remark-reading-time'
import type { AstroUserConfig } from 'astro'
import { 
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerNotationFocus,
  transformerNotationErrorLevel,
  transformerMetaHighlight,
  transformerMetaWordHighlight,
} from '@shikijs/transformers'

/**
 * Main Markdown configuration
 */
export const markdownConfig: AstroUserConfig['markdown'] = {
  processor: unified({
    // Remark plugins process Markdown syntax.
    remarkPlugins: [
      remarkGfm,
      remarkMath,
      remarkReadingTime,
    ],
    // Rehype plugins process the generated HTML tree.
    rehypePlugins: [
      rehypeSlug,
      rehypeKatex,
    ],
  }),

  // Code highlighting configuration (Shiki)
  shikiConfig: {
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
    langAlias: {
      gitignore: 'plaintext',
    },
    wrap: true,
    defaultColor: false,
    
    // Advanced code block transformers
    transformers: [
      transformerNotationDiff(),
      transformerNotationHighlight(),
      transformerNotationWordHighlight(),
      transformerNotationFocus(),
      transformerNotationErrorLevel(),
      transformerMetaHighlight(),
      transformerMetaWordHighlight(),
    ],
  },

  syntaxHighlight: 'shiki',
}

/**
 * Markdown configuration presets
 */
export const markdownPresets = {
  /** Minimal configuration - basic features only */
  minimal: {
    processor: unified({ remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
    syntaxHighlight: 'shiki' as const,
  },

  /** Full configuration - all features (currently in use) */
  full: markdownConfig,

  /** Blog configuration - optimized for blog posts */
  blog: markdownConfig,

  /** Documentation configuration - optimized for technical docs */
  docs: {
    processor: unified({
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeSlug, rehypeKatex],
    }),
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      wrap: true,
    },
    syntaxHighlight: 'shiki' as const,
  },
}

/**
 * Available Shiki themes
 * More themes: https://shiki.style/themes
 */
export const availableThemes = {
  light: [
    'github-light',
    'github-light-default',
    'light-plus',
    'material-theme-lighter',
    'min-light',
    'slack-ochin',
    'solarized-light',
  ],
  
  dark: [
    'github-dark',
    'github-dark-default',
    'github-dark-dimmed',
    'dark-plus',
    'dracula',
    'material-theme-darker',
    'monokai',
    'nord',
    'one-dark-pro',
    'slack-dark',
    'solarized-dark',
  ],
  
  highContrast: [
    'github-light-high-contrast',
    'github-dark-high-contrast',
  ],
} as const

export default markdownConfig
