/**
 * User Configuration
 * 
 * This file contains all user-specific information and content.
 * Replace the template values with your own personal information.
 */

import type { Language } from './i18n.config';

/**
 * Basic user information (language-independent)
 */
export const user = {
  name: 'Your Name',
  avatar: '/avatar.png', // Replace with your avatar image path
  location: 'Your Location',
  socials: [
    { icon: 'i-carbon:logo-github', label: 'GitHub', url: 'https://github.com/yourusername' },
    { icon: 'i-carbon:logo-twitter', label: 'Twitter', url: 'https://twitter.com/yourusername' },
    { icon: 'i-carbon:email', label: 'Email', url: 'mailto:your.email@example.com' },
  ],
  
  // GitHub configuration for fetching repository stats
  github: {
    username: 'yourusername',
    token: '',
    // ⚠️ NEVER put your token here! Use environment variables instead.
    // The token will be automatically loaded from process.env.GITHUB_TOKEN
  },
};

/**
 * Multilingual user content
 * Add your bio and description in multiple languages
 * This is the SINGLE SOURCE OF TRUTH for all personal content across the site
 */
export const userContent = {
  en: {
    // Short tagline (used in home page subtitle and about page)
    tagline: 'Your Professional Title · Your Interests',
    // Brief bio (used in home page and about intro)
    bio: 'Your bio here. Describe yourself, your skills, interests, and what you\'re passionate about.',
    // About page greeting
    greeting: 'Hello, I am',
  },
  zh: {
    tagline: '你的职业 · 你的兴趣',
    bio: '在这里写下你的个人介绍。描述你自己、你的技能、兴趣和热情所在。',
    greeting: '你好,我是',
  },
} as const;

/**
 * Get user content for the current language
 * @param lang - Language code (default: 'en')
 * @returns Combined user object with language-specific content
 */
export function getUserContent(lang: Language = 'en') {
  return {
    ...user,
    ...userContent[lang],
  };
}

/**
 * About page configuration
 * Customize the sections to showcase your skills, tools, and interests
 * Personal info (name, bio, avatar) comes from userContent and user config
 */
export const aboutConfig = {

  /**
   * Custom content sections
   * Each section supports: title, description, columns, compact mode, icon, color theme
   */
  sections: [
    {
      id: 'dev-tools',
      title: 'about.dev-tools.title',
      description: 'about.dev-tools.subtitle',
      icon: 'i-carbon:development',
      columns: 3 as const,
      compact: false,
      colorTheme: 'primary' as const,
      items: [
        { name: 'VS Code', description: 'Code editor', url: 'https://code.visualstudio.com/', icon: 'i-carbon:code' },
        { name: 'Terminal', description: 'Command line interface', url: '#', icon: 'i-carbon:terminal' },
        { name: 'GitHub', description: 'Code hosting platform', url: 'https://github.com/', icon: 'i-carbon:logo-github' },
        { name: 'Figma', description: 'Design collaboration', url: 'https://www.figma.com/', icon: 'i-carbon:pen' },
      ],
    },
    {
      id: 'productivity',
      title: 'about.productivity.title',
      description: 'about.productivity.subtitle',
      icon: 'i-carbon:rocket',
      columns: 4 as const,
      compact: true,
      colorTheme: 'secondary' as const,
      items: [
        { name: 'Browser', description: 'Modern web browser', url: '#', icon: 'i-carbon:cloud' },
        { name: 'Launcher', description: 'Quick access tool', url: '#', icon: 'i-carbon:rocket' },
        { name: 'Notes', description: 'Knowledge management', url: '#', icon: 'i-carbon:notebook' },
        { name: 'Editor', description: 'Markdown editing', url: '#', icon: 'i-carbon:edit' },
      ],
    },
    {
      id: 'hobbies',
      title: 'about.interests.title',
      description: 'about.interests.subtitle',
      icon: 'i-carbon:favorite',
      columns: 4 as const,
      compact: true,
      colorTheme: 'accent' as const,
      items: [
        { name: 'Photography', description: 'Capturing moments', icon: 'i-carbon:camera' },
        { name: 'Reading', description: 'Books and articles', icon: 'i-carbon:book' },
        { name: 'Music', description: 'Various genres', icon: 'i-carbon:music' },
        { name: 'Sports', description: 'Staying active', icon: 'i-carbon:bicycle' },
      ],
    },
  ],

  /**
   * Social networks with follower count
   */
  socialNetworks: [
    { 
      platform: 'GitHub', 
      username: 'yourusername', 
      url: 'https://github.com/yourusername', 
      icon: 'i-carbon:logo-github',
      followers: 0,
    },
    { 
      platform: 'Twitter', 
      username: '@yourusername', 
      url: 'https://twitter.com/yourusername', 
      icon: 'i-carbon:logo-twitter',
      followers: 0,
    },
  ],

  /**
   * Education history
   */
  education: [
    {
      school: 'Your University',
      major: 'Your Major',
      degree: 'Bachelor / Master / PhD',
      startDate: '2020-09',
      endDate: '2024-06',
      logo: '/images/school-logo.png',
      url: 'https://www.example.edu/',
      description: 'Brief description of your studies',
    },
  ],

  /**
   * Work experience
   */
  experience: [
    // Uncomment and customize as needed
    // {
    //   company: 'Company Name',
    //   position: 'Your Position',
    //   startDate: '2024-07',
    //   endDate: 'present',
    //   logo: '/images/company-logo.png',
    //   url: 'https://www.company.com/',
    //   description: 'Brief description of your role',
    // },
  ],

  /**
   * About this site
   */
  site: {
    name: 'Your Site Name',
    description: 'A modern, clean, and elegant Astro blog theme',
    builtWith: 'Built with Astro + UnoCSS + TypeScript',
    since: '2024',
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

  /**
   * Timeline
   */
  timeline: [
    { year: '2024', event: 'Started blogging', description: 'Sharing knowledge and experiences' },
    { year: '2023', event: 'Learning web development', description: 'Deep dive into frontend stack' },
  ],
};