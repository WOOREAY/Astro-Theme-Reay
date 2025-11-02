/**
 * Links Configuration
 * 
 * Manage friend links, resource links, and social connections.
 * Replace the example links with your own connections.
 */

export interface FriendLink {
  name: string;
  url: string;
  avatar: string;
  description: string;
  category?: string;
  type: 'friend' | 'site' | 'social';
  featured?: boolean;
}

/**
 * Friend links collection
 * Customize with your own friends, resources, and social profiles
 */
export const friendLinks: FriendLink[] = [
  // Friend links
  {
    name: 'Astro',
    url: 'https://astro.build',
    avatar: 'https://astro.build/assets/press/astro-icon-light-gradient.svg',
    description: 'Modern static site generator',
    category: 'framework',
    type: 'friend',
    featured: true,
  },
  {
    name: 'Vue.js',
    url: 'https://vuejs.org',
    avatar: 'https://vuejs.org/images/logo.png',
    description: 'Progressive JavaScript framework',
    category: 'framework',
    type: 'friend',
    featured: true,
  },
  
  // Resource websites
  {
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    avatar: 'https://developer.mozilla.org/favicon-48x48.png',
    description: 'Web developer documentation',
    category: 'resource',
    type: 'site',
  },
  {
    name: 'GitHub',
    url: 'https://github.com',
    avatar: 'https://github.githubassets.com/favicons/favicon.png',
    description: 'Code hosting platform',
    category: 'tool',
    type: 'site',
  },
  {
    name: 'Stack Overflow',
    url: 'https://stackoverflow.com',
    avatar: 'https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png',
    description: 'Developer Q&A community',
    category: 'community',
    type: 'site',
  },
  
  // Social profiles - Replace with your own
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    avatar: 'https://github.githubassets.com/favicons/favicon.png',
    description: 'View my open source projects',
    category: 'social',
    type: 'social',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    avatar: 'https://abs.twimg.com/favicons/twitter.ico',
    description: 'Follow my updates',
    category: 'social',
    type: 'social',
  },
];

/**
 * Link categories (grouped by type)
 */
export const linkCategories = {
  friend: [
    { id: 'all', label: 'All', icon: 'i-carbon:apps' },
    { id: 'featured', label: 'Featured', icon: 'i-carbon:star-filled' },
    { id: 'framework', label: 'Framework', icon: 'i-carbon:code' },
    { id: 'tool', label: 'Tool', icon: 'i-carbon:tool-box' },
  ],
  site: [
    { id: 'all', label: 'All', icon: 'i-carbon:apps' },
    { id: 'resource', label: 'Resource', icon: 'i-carbon:book' },
    { id: 'tool', label: 'Tool', icon: 'i-carbon:tool-box' },
    { id: 'community', label: 'Community', icon: 'i-carbon:user-multiple' },
  ],
  social: [
    { id: 'all', label: 'All', icon: 'i-carbon:apps' },
  ],
};

/**
 * Link exchange application information
 * Replace with your contact details
 */
export const linkApplicationInfo = {
  title: 'Apply for Link Exchange',
  description: '',
  contacts: [
    { label: 'Email', value: 'your.email@example.com', icon: 'i-carbon:email' },
    { label: 'GitHub', value: 'github.com/yourusername', icon: 'i-carbon:logo-github' },
    { label: 'Twitter', value: '@yourusername', icon: 'i-carbon:logo-twitter' },
  ],
};

/**
 * Your site information (displayed in link exchange section)
 * Update with your actual site details
 */
export const mySiteInfo = {
  name: 'Your Site Name',
  url: 'https://your-site.example.com',
  avatar: '/avatar.png',
  description: 'Your site tagline or description',
};
