# User Configuration Guide

`src/app/config/user.config.ts` is the single editable source for personal identity, public contact details, GitHub identity, localized introduction copy, and site facts. Application code reads normalized values through `src/app/config/site.config.ts`.

## Ownership

| Value | Edit here | Reused by |
| --- | --- | --- |
| Name and avatar | `user.name`, `user.avatar` | Header, Hero, About, Links site card, Footer, RSS |
| Location | `user.location` | Home profile |
| Email | `user.contact.email` | Home, About contacts, Links application, Footer |
| Website | `user.contact.website` | Home, About contacts, Links application/site card, Footer |
| GitHub username | `user.github.username` | Hero, Home, About, Links, Footer, Projects, comment defaults |
| Other public profiles | `user.contact.additionalLinks` | Hero, Home, About, Links, Footer |
| Site name | derived from `user.name` | Home, About, Links, RSS |
| Site description | `userContent.<lang>.description` | Home, About, Links, RSS |

Do not copy these values into `links.config.ts`, `projects.config.ts`, About data, or page components.

## Identity and Contact

```ts
export const user = {
  name: 'Your Name',
  avatar: '/images/profile/avatar.png',
  location: '',

  contact: {
    email: 'you@example.com',
    website: 'https://example.com',
    additionalLinks: [
      {
        id: 'mastodon',
        label: 'Mastodon',
        url: 'https://social.example/@you',
        displayValue: '@you',
        icon: 'i-simple-icons:mastodon',
      },
    ],
  },

  github: {
    username: 'yourusername',
    token: '',
  },
}
```

Empty optional values are hidden everywhere. GitHub is not repeated in `additionalLinks`: its public URL is derived automatically from `github.username`. `additionalLinks[].id` must be stable and each icon must be an UnoCSS/Iconify class.

Keep `github.token` empty in committed code. Use `GITHUB_TOKEN` in `.env` or CI secrets when a higher API limit is needed.

## Localized Personal Content

```ts
export const userContent = {
  en: {
    role: 'Software developer and technical writer',
    tagline: 'Open Source · Technical Notes · Project Practice',
    bio: 'A short introduction.',
    status: 'What you are working on now.',
    focus: ['Open Source', 'Web Engineering'],
    greeting: 'Hello, I am',
    description: 'A personal site for notes, projects, and long-term learning.',
  },
  zh: {
    role: '软件开发者与技术写作者',
    tagline: '开源实践 · 技术笔记 · 项目复盘',
    bio: '一段简短的个人介绍。',
    status: '当前正在做的事情。',
    focus: ['开源实践', 'Web 工程'],
    greeting: '你好，我是',
    description: '一个记录技术笔记、项目实践与长期学习的个人站点。',
  },
}
```

`description` is also the localized site description. Do not add another site-description field.

## Site Facts

```ts
export const site = {
  builtWith: 'Built with Astro, UnoCSS, and TypeScript',
  since: '2025',
  stats: {
    visitors: 0,
  },
  techStack: [
    {
      name: 'Astro',
      description: 'Modern static site generator',
      url: 'https://astro.build/',
      icon: 'i-carbon:rocket',
    },
  ],
}
```

Article and word counts are calculated from real content at build time. Only an externally measured visitor count remains configurable.

## About Content

`aboutConfig` owns only About-specific collections:

```ts
export const aboutConfig = {
  sections: [],
  education: [],
  experience: [],
  timeline: [],
}
```

Contacts and site identity are intentionally absent. About receives them from the same normalized getters as the other pages.

## App-facing Getters

Components should import from `@app/config/site.config`:

```ts
const user = getUserProfile();
const contact = getUserContact();
const contactLinks = getUserContactLinks();
const socialLinks = getUserSocialLinks();
const content = getLocalizedUserContent(currentLang);
const site = getSiteProfile(currentLang);
const github = getGitHubConfig();
```

- `getUserContactLinks()` normalizes email, website, GitHub, and additional profiles and removes duplicate URLs.
- `getUserSocialLinks()` returns GitHub and additional public profiles for social-only UI.
- `getSiteProfile()` derives name, avatar, URL, and localized description instead of storing copies.
- `getGitHubConfig()` combines the one GitHub identity with project filtering options.

## Verification

```bash
npm run test:config
npm run check
npm run verify
```

`test:config` proves the normalizer handles a fixture email/website/GitHub profile once and asserts that Home, About, Links, and Footer consume the central getter.

## Common Failures

- Adding GitHub to `additionalLinks`: this duplicates the URL derived from `github.username`.
- Adding contact buttons to `links.config.ts`: the Links page already reads `getUserContactLinks()`.
- Adding `githubUsername` to `projects.config.ts`: Projects already reads `getGitHubConfig()`.
- Adding name or description to About site data: both are derived from `user` and `userContent`.
- Committing a GitHub token: use `.env` or CI secrets.
