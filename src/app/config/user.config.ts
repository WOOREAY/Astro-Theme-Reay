/**
 * User Configuration
 *
 * Edit the three sections below first:
 * 1. Basic profile
 * 2. Multilingual intro copy
 * 3. About page content
 */

import { defaultLang, type Language } from './i18n.config';

// ---------------------------------------------------------------------------
// 1. Basic profile
// ---------------------------------------------------------------------------

export const user = {
  name: 'WOOREAY',
  avatar: '/images/profile/avatar.png',
  /** Optional public profile details. Leave empty to hide them everywhere. */
  location: '',
  email: '',
  website: 'https://wooreay.github.io',
  socials: [
    { icon: 'i-carbon:logo-github', label: 'GitHub', url: 'https://github.com/WOOREAY' },
  ],

  github: {
    username: 'WOOREAY',
    token: '',
  },
} satisfies User;

// ---------------------------------------------------------------------------
// 2. Multilingual intro copy
// ---------------------------------------------------------------------------

export const userContent = {
  en: {
    role: 'Open-source maker and technical writer',
    tagline: 'Open Source · Technical Notes · Project Practice',
    bio: 'Building Astro Theme Reay and documenting reusable engineering ideas, project decisions, and long-term learning.',
    status: 'Currently refining Astro Theme Reay into a clearer, faster, and more reusable personal-site system.',
    focus: ['Open Source', 'Web Engineering', 'Technical Writing', 'Design Systems'],
    greeting: 'Hello, I am',
    description: 'A personal site for open-source work, technical notes, and long-term learning.',
  },
  zh: {
    role: '开源实践者与技术写作者',
    tagline: '开源实践 · 技术笔记 · 项目复盘',
    bio: '持续打磨 Astro Theme Reay，并记录可复用的工程经验、项目决策与长期学习成果。',
    status: '目前正在把 Astro Theme Reay 打磨成更清晰、更快速，也更容易复用的个人网站系统。',
    focus: ['开源实践', 'Web 工程', '技术写作', '设计系统'],
    greeting: '你好,我是',
    description: '一个记录开源实践、技术笔记与长期学习的个人站点。',
  },
} satisfies UserContent;

// ---------------------------------------------------------------------------
// 3. About page content
// ---------------------------------------------------------------------------

export const aboutConfig = {
  sections: [
    {
      id: 'dev-tools',
      title: 'about.dev-tools.title',
      description: 'about.dev-tools.subtitle',
      icon: 'i-carbon:development',
      columns: 3,
      compact: false,
      colorTheme: 'primary',
      items: [
        { name: 'Astro', description: 'Static-first web framework', url: 'https://astro.build/', icon: 'i-carbon:rocket' },
        { name: 'TypeScript', description: 'Type-safe application code', url: 'https://www.typescriptlang.org/', icon: 'i-carbon:code' },
        { name: 'UnoCSS', description: 'On-demand atomic CSS', url: 'https://unocss.dev/', icon: 'i-carbon:color-palette' },
        { name: 'GitHub', description: 'Open-source collaboration', url: 'https://github.com/WOOREAY', icon: 'i-carbon:logo-github' },
      ],
    },
    {
      id: 'productivity',
      title: 'about.productivity.title',
      description: 'about.productivity.subtitle',
      icon: 'i-carbon:rocket',
      columns: 4,
      compact: true,
      colorTheme: 'secondary',
      items: [
        { name: 'Git', description: 'Version control', url: 'https://git-scm.com/', icon: 'i-carbon:branch' },
        { name: 'Markdown', description: 'Portable technical writing', url: 'https://commonmark.org/', icon: 'i-carbon:document' },
        { name: 'Pagefind', description: 'Static local search', url: 'https://pagefind.app/', icon: 'i-carbon:search' },
        { name: 'Playwright', description: 'Browser verification', url: 'https://playwright.dev/', icon: 'i-carbon:test-tool' },
      ],
    },
    {
      id: 'interests',
      title: 'about.interests.title',
      description: 'about.interests.subtitle',
      icon: 'i-carbon:favorite',
      columns: 4,
      compact: true,
      colorTheme: 'accent',
      items: [
        { name: 'Open Source', description: 'Reusable public work', icon: 'i-carbon:logo-github' },
        { name: 'Technical Writing', description: 'Durable engineering notes', icon: 'i-carbon:book' },
        { name: 'Web Design', description: 'Clear and expressive interfaces', icon: 'i-carbon:color-palette' },
        { name: 'Performance', description: 'Fast, resilient experiences', icon: 'i-carbon:chart-line' },
      ],
    },
  ],

  socialNetworks: [
    {
      platform: 'GitHub',
      username: 'WOOREAY',
      url: 'https://github.com/WOOREAY',
      icon: 'i-carbon:logo-github',
      followers: 0,
    },
  ],

  education: [] as Education[],

  experience: [] as Experience[],

  site: {
    name: 'WOOREAY',
    description: 'Open-source projects, technical notes, and long-term learning.',
    builtWith: 'Built with Astro, UnoCSS, and TypeScript',
    since: '2025',
    stats: {
      posts: 0,
      words: 0,
      visitors: 0,
    },
    techStack: [
      { name: 'Astro', description: 'Modern static site generator', url: 'https://astro.build/', icon: 'i-carbon:rocket' },
      { name: 'UnoCSS', description: 'Atomic CSS engine', url: 'https://unocss.dev/', icon: 'i-carbon:color-palette' },
      { name: 'TypeScript', description: 'Type-safe JavaScript', url: 'https://www.typescriptlang.org/', icon: 'i-carbon:code' },
    ],
  },

  timeline: [
    { year: '2026', event: 'Evolving Astro Theme Reay', description: 'Improving architecture, accessibility, and release confidence' },
    { year: '2025', event: 'Started Astro Theme Reay', description: 'Built a configuration-driven personal site theme with Astro' },
  ],
} satisfies AboutConfig;

// ---------------------------------------------------------------------------
// Helper exports
// ---------------------------------------------------------------------------

export function getUserContent(lang: Language = defaultLang) {
  return {
    ...user,
    ...userContent[lang],
  };
}

export const userConfig = {
  user,
  userContent,
  aboutConfig,
} satisfies UserConfig;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

export interface GithubUserConfig {
  username: string;
  token?: string;
}

export interface User {
  name: string;
  avatar: string;
  location?: string;
  email?: string;
  website?: string;
  socials: SocialLink[];
  github: GithubUserConfig;
}

export interface UserContentLanguage {
  role?: string;
  tagline: string;
  bio: string;
  status?: string;
  focus?: string[];
  greeting: string;
  description: string;
}

export interface UserContent {
  en: UserContentLanguage;
  zh: UserContentLanguage;
}

export interface AboutSectionItem {
  name: string;
  description?: string;
  url?: string;
  icon?: string;
}

export interface AboutSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  columns: 2 | 3 | 4 | 5;
  compact: boolean;
  colorTheme: 'primary' | 'secondary' | 'tertiary' | 'accent';
  items: AboutSectionItem[];
}

export interface SocialNetwork {
  platform: string;
  username: string;
  url: string;
  icon: string;
  followers: number;
}

export interface Education {
  school: string;
  major?: string;
  degree: string;
  startDate: string;
  endDate: string;
  logo?: string;
  url?: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  logo?: string;
  url?: string;
  description?: string;
}

export interface TechStackItem {
  name: string;
  description: string;
  url: string;
  icon: string;
}

export interface SiteInfo {
  name: string;
  description: string;
  builtWith: string;
  since: string;
  stats: {
    posts: number;
    words: number;
    visitors: number;
  };
  techStack: TechStackItem[];
}

export interface TimelineEvent {
  year: string;
  event: string;
  description?: string;
}

export interface AboutConfig {
  sections: AboutSection[];
  socialNetworks: SocialNetwork[];
  education: Education[];
  experience: Experience[];
  site: SiteInfo;
  timeline: TimelineEvent[];
}

export interface UserConfig {
  user: User;
  userContent: UserContent;
  aboutConfig: AboutConfig;
}
