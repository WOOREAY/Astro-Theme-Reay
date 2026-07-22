import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createUserContactLinks } from '../src/app/config/user-contact.ts';

const root = fileURLToPath(new URL('..', import.meta.url));
const readSource = (path) => readFile(`${root}/${path}`, 'utf8');

const fixtureUser = {
  name: 'Example Owner',
  avatar: '/avatar.png',
  location: '',
  contact: {
    email: 'owner@example.com',
    website: 'https://example.com',
    additionalLinks: [
      {
        id: 'mastodon',
        label: 'Mastodon',
        url: 'https://social.example/@owner',
        displayValue: '@owner',
        icon: 'i-simple-icons:mastodon',
      },
      {
        id: 'duplicate-website',
        label: 'Duplicate website',
        url: 'https://example.com',
        icon: 'i-carbon:earth',
      },
    ],
  },
  github: {
    username: 'example-owner',
    token: '',
  },
};

const contacts = createUserContactLinks(fixtureUser);
assert.deepEqual(
  contacts.map(({ id, href }) => ({ id, href })),
  [
    { id: 'email', href: 'mailto:owner@example.com' },
    { id: 'website', href: 'https://example.com' },
    { id: 'github', href: 'https://github.com/example-owner' },
    { id: 'mastodon', href: 'https://social.example/@owner' },
  ],
  'contact values should normalize once and duplicate URLs should be removed',
);

const consumerContracts = new Map([
  ['src/features/home/components/ActivityStreamSection.astro', 'getUserContactLinks'],
  ['src/pages/about/index.astro', 'getUserContactLinks'],
  ['src/pages/links/index.astro', 'getUserContactLinks'],
  ['src/shared/components/Footer.astro', 'getUserContactLinks'],
]);

for (const [path, getter] of consumerContracts) {
  const source = await readSource(path);
  assert.ok(source.includes(getter), `${path} must consume ${getter}`);
}

const [linksConfig, projectsConfig, userConfig, header] = await Promise.all([
  readSource('src/app/config/links.config.ts'),
  readSource('src/app/config/projects.config.ts'),
  readSource('src/app/config/user.config.ts'),
  readSource('src/shared/components/Header.astro'),
]);

assert.doesNotMatch(linksConfig, /^\s*(contacts|mySiteInfo):/m, 'Links config must not redefine personal contact or site identity');
assert.doesNotMatch(projectsConfig, /^\s*(githubUsername|githubConfig):/m, 'Projects config must not redefine GitHub identity');
assert.doesNotMatch(userConfig, /^\s*socialNetworks:/m, 'About config must not redefine social contacts');
assert.match(header, /src=\{user\.avatar\}/, 'Header avatar must come from the user profile');

console.log('Configuration single-source contracts passed.');
