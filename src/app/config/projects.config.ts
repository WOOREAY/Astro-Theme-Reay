/**
 * Projects Configuration
 *
 * GitHub username and token are inherited from `user.config.ts` by default.
 * Most users only need to edit categories, display settings, or featured repos.
 */

import { user } from './user.config';

const defaultGitHubUsername = user.github.username;

export const projectsConfig = {
  githubUsername: defaultGitHubUsername,
  githubConfig: {
    username: defaultGitHubUsername,
    token: user.github.token,
    excludeRepos: [],
    includeForked: false,
  },

  displaySettings: {
    itemsPerPage: 12,
    showLanguages: true,
    showStars: true,
    showForks: true,
    showLastUpdate: true,
    defaultSort: 'updated',
  },

  categories: [
    {
      id: 'all',
      name: 'All Projects',
      description: 'Browse all repositories',
      icon: 'i-carbon:grid',
    },
    {
      id: 'featured',
      name: 'Featured',
      description: 'Highlighted work and experiments',
      icon: 'i-carbon:star-filled',
    },
    {
      id: 'frontend',
      name: 'Frontend',
      description: 'Interfaces, interactions, and web experiences',
      icon: 'i-carbon:code',
    },
    {
      id: 'backend',
      name: 'Backend',
      description: 'APIs, services, and data workflows',
      icon: 'i-carbon:server',
    },
    {
      id: 'learning',
      name: 'Learning',
      description: 'Study notes, labs, and practice projects',
      icon: 'i-carbon:book',
    },
    {
      id: 'tools',
      name: 'Tools',
      description: 'Utilities, scripts, and productivity tools',
      icon: 'i-carbon:tool-box',
    },
  ],

  featuredRepos: [
    // Example:
    // {
    //   owner: 'yourusername',
    //   repo: 'your-project',
    //   category: 'frontend',
    //   featured: true,
    //   customDescription: 'A modern project built with Astro',
    //   tags: ['astro', 'typescript', 'material-design'],
    // },
  ],
} satisfies ProjectsConfig;

// Backward-compatible exports for older custom code.
export const projectCategories = projectsConfig.categories;
export const githubUsername = projectsConfig.githubUsername;
export const githubConfig = projectsConfig.githubConfig;
export const projectDisplaySettings = projectsConfig.displaySettings;
export const featuredRepos = projectsConfig.featuredRepos;

export interface ProjectCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ProjectRepo {
  owner: string;
  repo: string;
  category?: string;
  featured?: boolean;
  customDescription?: string;
  tags?: string[];
}

export interface GithubConfig {
  username: string;
  token?: string;
  excludeRepos?: string[];
  includeForked?: boolean;
}

export interface ProjectDisplaySettings {
  itemsPerPage: number;
  showLanguages: boolean;
  showStars: boolean;
  showForks: boolean;
  showLastUpdate: boolean;
  defaultSort: 'stars' | 'updated' | 'created' | 'name';
}

export interface ProjectsConfig {
  categories: ProjectCategory[];
  githubUsername: string;
  githubConfig: GithubConfig;
  displaySettings: ProjectDisplaySettings;
  featuredRepos: ProjectRepo[];
}
