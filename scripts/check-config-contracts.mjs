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
    twitter: 'https://x.com/example_owner',
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
    { id: 'twitter', href: 'https://x.com/example_owner' },
    { id: 'website', href: 'https://example.com' },
    { id: 'github', href: 'https://github.com/example-owner' },
    { id: 'mastodon', href: 'https://social.example/@owner' },
  ],
  'contact values should normalize once and duplicate URLs should be removed',
);

const consumerContracts = new Map([
  ['src/features/home/components/ActivityStreamSection.astro', 'getUserContactLinks'],
  ['src/features/home/components/HeroSection.astro', 'getUserContactLinks'],
  ['src/pages/about/index.astro', 'getUserContactLinks'],
  ['src/pages/links/index.astro', 'getUserContactLinks'],
  ['src/pages/guestbook/index.astro', 'getUserContactLinks'],
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

const [themeConfig, presetIndex, backgroundComponent] = await Promise.all([
  readSource('src/app/config/theme.config.ts'),
  readSource('presets/themes/index.ts'),
  readSource('src/shared/components/Background.astro'),
]);

assert.match(themeConfig, /defineTheme\(\{[\s\S]*?preset:\s*'technology'/, 'technology should remain the default theme preset');
assert.doesNotMatch(themeConfig, /export const themeOverrides/, 'theme settings should use one user-facing configuration object');
assert.match(themeConfig, /background:\s*\{[\s\S]*?type:\s*'image'/, 'theme config should expose a discoverable background example');
assert.match(presetIndex, /export function defineTheme/, 'the preset registry must expose the unified theme builder');

for (const preset of ['technology', 'paper', 'eink', 'forest', 'editorial']) {
  const source = await readSource(`presets/themes/${preset}.ts`);
  assert.match(presetIndex, new RegExp(`\\b${preset}:`), `${preset} must be exported by the theme preset registry`);
  assert.match(source, /satisfies ThemePresetDefinition/, `${preset} must satisfy the shared preset contract`);
  assert.match(source, /decoration:\s*'(?:aurora|paper|eink|plain)'/, `${preset} must choose an explicit background decoration`);
}

const [paperPreset, einkPreset] = await Promise.all([
  readSource('presets/themes/paper.ts'),
  readSource('presets/themes/eink.ts'),
]);
assert.match(paperPreset, /variant:\s*'neutral'/, 'paper should use the low-chroma MD3 Neutral variant');
assert.match(einkPreset, /variant:\s*'monochrome'/, 'eink should keep the MD3 Monochrome variant');

for (const decoration of ['paper', 'eink', 'plain']) {
  assert.match(backgroundComponent, new RegExp(`decoration-${decoration}`), `Background must implement the ${decoration} decoration`);
}

console.log('Configuration single-source contracts passed.');
