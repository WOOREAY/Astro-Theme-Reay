/**
 * Projects Configuration
 * 
 * Define GitHub repositories to showcase on your projects page.
 * Projects can be categorized and featured for better organization.
 */

import { user } from './user.config';

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
export const githubUsername = user.github.username;
