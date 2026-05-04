/**
 * Projects Configuration
 * 
 * Define GitHub repositories to showcase on your projects page.
 * Projects can be categorized and featured for better organization.
 */

import { user } from './user.config';

/**
 * Project category interface
 */
export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

/**
 * GitHub repository reference interface
 */
export interface ProjectRepo {
  owner: string;
  repo: string;
  category?: string;
  featured?: boolean;
  customDescription?: string;
  tags?: string[];
}

/**
 * GitHub configuration interface
 */
export interface GithubConfig {
  username: string;
  token?: string;
  excludeRepos?: string[];
  includeForked?: boolean;
}

/**
 * Project display settings interface
 */
export interface ProjectDisplaySettings {
  itemsPerPage: number;
  showLanguages: boolean;
  showStars: boolean;
  showForks: boolean;
  showLastUpdate: boolean;
  defaultSort: 'stars' | 'updated' | 'created' | 'name';
}

/**
 * Complete projects configuration interface
 */
export interface ProjectsConfig {
  categories: ProjectCategory[];
  githubUsername: string;
  githubConfig: GithubConfig;
  displaySettings: ProjectDisplaySettings;
  featuredRepos?: ProjectRepo[];
}

/**
 * Project categories
 * Customize these categories to match your project types
 */
export const projectCategories: ProjectCategory[] = [
  {
    id: 'all',
    name: 'All Projects',
    description: 'View all projects',
    icon: 'i-carbon:grid',
  },
  {
    id: 'featured',
    name: 'Featured',
    description: 'Highlighted projects',
    icon: 'i-carbon:star-filled',
  },
  {
    id: 'frontend',
    name: 'Frontend',
    description: 'Web frontend projects',
    icon: 'i-carbon:code',
  },
  {
    id: 'backend',
    name: 'Backend',
    description: 'Server-side projects',
    icon: 'i-carbon:server',
  },
  {
    id: 'learning',
    name: 'Learning',
    description: 'Study notes and practice',
    icon: 'i-carbon:book',
  },
  {
    id: 'tools',
    name: 'Tools',
    description: 'Utilities and scripts',
    icon: 'i-carbon:tool-box',
  },
];

/**
 * GitHub username (loaded from user.config)
 * Projects will be automatically fetched from your GitHub profile
 */
export const githubUsername: string = user.github.username;

/**
 * GitHub configuration
 * Controls how projects are fetched from GitHub
 */
export const githubConfig: GithubConfig = {
  username: user.github.username,
  token: user.github.token,
  excludeRepos: [],
  includeForked: false,
};

/**
 * Project display settings
 * Configure how projects are displayed on the page
 */
export const projectDisplaySettings: ProjectDisplaySettings = {
  itemsPerPage: 12,
  showLanguages: true,
  showStars: true,
  showForks: true,
  showLastUpdate: true,
  defaultSort: 'updated',
};

/**
 * Featured repositories (optional)
 * Manually specify repositories to feature
 */
export const featuredRepos: ProjectRepo[] = [
  // Example:
  // {
  //   owner: 'yourusername',
  //   repo: 'your-project',
  //   category: 'frontend',
  //   featured: true,
  //   customDescription: 'A modern project built with Astro',
  //   tags: ['astro', 'typescript', 'material-design'],
  // },
];

/**
 * Complete projects configuration export
 * Aggregates all project-related configurations in one place
 */
export const projectsConfig: ProjectsConfig = {
  categories: projectCategories,
  githubUsername,
  githubConfig,
  displaySettings: projectDisplaySettings,
  featuredRepos,
};
