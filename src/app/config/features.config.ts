export const featuresConfig = {
  home: {
    /** `flow` uses normal document scrolling; `snap` enables section-by-section navigation. */
    layout: 'flow' as 'flow' | 'snap',
  },
  search: {
    enabled: true,
  },
  feeds: {
    rss: true,
    sitemap: true,
  },
  i18n: {
    enabled: true,
    strategy: 'client' as 'client' | 'routes',
  },
  integrations: {
    comments: true,
    githubProjects: true,
    music: true,
    seasonalEffects: true,
  },
} as const

export type FeaturesConfig = typeof featuresConfig
