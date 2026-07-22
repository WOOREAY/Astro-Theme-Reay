import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('language, theme, and client navigation stay synchronized', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('WOOREAY');
  await expect(page.getByText('about.hobbies.title')).toHaveCount(0);

  const languageButton = page.getByRole('button', { name: '切换语言' });
  await languageButton.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('[data-user-content="role"]')).toHaveText('Open-source maker and technical writer');
  await expect(page.locator('[data-user-content="focus.0"]')).toHaveText('Open Source');
  await expect(
    page.locator('header').getByRole('link', { name: 'Search', exact: true }),
  ).toBeVisible();

  const themeButton = page.getByRole('button', { name: 'Switch theme (current: system)' });
  await themeButton.click();
  await expect(page.getByRole('button', { name: 'Switch theme (current: light)' })).toBeVisible();

  await page.locator('header').getByRole('link', { name: 'Blog', exact: true }).click();
  await expect(page).toHaveURL(/\/blog\/?$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.getByText('Posts', { exact: true })).toBeVisible();
  await expect(page.getByText('Latest', { exact: true })).toBeVisible();
});

test('Pagefind returns local results', async ({ page }) => {
  await page.goto('/search');
  await page.getByRole('textbox').fill('Astro');
  await expect(page.getByRole('link', { name: 'Astro 3.0 新特性详解' })).toBeVisible({ timeout: 15_000 });
});

test('custom 404 title follows the selected language', async ({ page }) => {
  const response = await page.goto('/definitely-missing-page');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('这个页面暂时走丢了');

  await page.getByRole('button', { name: '切换语言' }).click();
  await expect(page).toHaveTitle('This page wandered away');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('This page wandered away');
});

test('gallery lightbox renders an image or an explicit fallback', async ({ page }) => {
  await page.goto('/gallery/daily/morning-window/');
  const trigger = page.getByRole('button', { name: /查看照片/ });
  await expect(page.locator('#gallery-lightbox')).toHaveAttribute('data-initialized', 'true');
  await trigger.click();

  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(page.getByRole('button', { name: '关闭' })).toBeFocused();

  const image = dialog.locator('[data-lightbox-image]');
  const source = await image.getAttribute('src');
  if (source) {
    await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  } else {
    await expect(image).toBeHidden();
    await expect(dialog.locator('[data-lightbox-fallback]')).toBeVisible();
  }

  await page.getByRole('button', { name: '关闭' }).click();
  await expect(trigger).toBeFocused();
});

test('mobile navigation has no horizontal overflow and exposes its state', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');

  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await expect(page.locator('[data-home-now]')).toHaveCount(1);
  await page.locator('[data-home-heatmap]').scrollIntoViewIfNeeded();
  await expect(page.locator('[data-home-heatmap]')).toBeVisible();
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const menuButton = page.getByRole('button', { name: '打开菜单' });
  await menuButton.click();
  await expect(page.getByRole('button', { name: '关闭菜单' })).toHaveAttribute('aria-expanded', 'true');
});

test('homepage exposes the unchanged Hero and asymmetric editorial showcase', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('#fullpage-container[data-home-layout="flow"]')).toHaveCount(1);
  await expect(page.locator('[data-section="hero"]')).toHaveCount(1);
  await expect(page.locator('[data-section="activity"]')).toHaveCount(1);
  await expect(page.locator('[data-section="posts"], [data-section="projects"], [data-section="explore"]')).toHaveCount(0);
  await expect(page.locator('[data-home-stream]')).toHaveCount(1);
  await expect(page.locator('[data-home-editorial]')).toHaveCount(1);
  await expect(page.locator('[data-home-now]')).toHaveCount(1);
  await expect(page.locator('[data-home-showcase]')).toHaveCount(1);
  await expect(page.locator('[data-home-site]')).toHaveCount(1);
  await expect(page.locator('[data-home-wayfinder]')).toHaveCount(0);
  await expect(page.locator('[data-home-heatmap]')).toHaveCount(1);
  await expect(page.locator('[data-home-showcase-post]')).toHaveCount(4);
  await expect(page.locator('[data-home-showcase-project]')).toHaveCount(2);
  await expect(page.locator('[data-home-showcase-plog]')).toHaveCount(2);
  expect(await page.locator('.home-heatmap-grid .home-heatmap-day').count()).toBeGreaterThanOrEqual(365);
});

test('configured contact and site identity propagate across public surfaces', async ({ page }) => {
  const website = 'https://wooreay.github.io';

  await page.goto('/');
  await expect(page.locator('[data-home-now] [data-contact-kind="website"]')).toHaveAttribute('href', website);
  await expect(page.locator('footer [data-contact-kind="website"]')).toHaveAttribute('href', website);

  await page.goto('/about');
  await expect(page.locator('.socials-section [data-contact-kind="website"]')).toHaveAttribute('href', website);
  await expect(page.locator('.intro-name')).toHaveText('WOOREAY');

  await page.goto('/links');
  await expect(page.locator('.contact-buttons [data-contact-kind="website"]')).toHaveAttribute('href', website);
  await expect(page.locator('.site-info-card [data-copy="WOOREAY"]')).toHaveCount(1);
  await expect(page.locator(`.site-info-card [data-copy="${website}"]`)).toHaveCount(1);
});

test('homepage applies the compact config-driven typography scale', async ({ page }) => {
  await page.goto('/');

  await expect.poll(() => page.evaluate(() => document.fonts.check('15px "Nunito Variable"'))).toBe(true);
  const typography = await page.evaluate(() => ({
    configuredFamily: getComputedStyle(document.documentElement).getPropertyValue('--reay-font-sans'),
    family: getComputedStyle(document.body).fontFamily,
    root: Number.parseFloat(getComputedStyle(document.documentElement).fontSize),
    hero: Number.parseFloat(getComputedStyle(document.querySelector('h1')!).fontSize),
    section: Number.parseFloat(getComputedStyle(document.querySelector('.home-showcase-header h2')!).fontSize),
    feature: Number.parseFloat(getComputedStyle(document.querySelector('.home-writing-lead h3')!).fontSize),
  }));

  expect(typography.configuredFamily).toContain('Nunito Variable');
  expect(typography.family).toContain('Nunito Variable');
  expect(typography.root).toBe(15);
  expect(typography.hero).toBeLessThanOrEqual(36);
  expect(typography.section).toBeLessThanOrEqual(24.3);
  expect(typography.feature).toBeLessThanOrEqual(22.2);
});

test('Markdown and code inherit the configured global font stacks', async ({ page }) => {
  await page.goto('/blog/test-markdown');

  const typography = await page.evaluate(() => ({
    sans: getComputedStyle(document.documentElement).getPropertyValue('--reay-font-sans'),
    mono: getComputedStyle(document.documentElement).getPropertyValue('--reay-font-mono'),
    body: getComputedStyle(document.body).fontFamily,
    prose: getComputedStyle(document.querySelector('.prose')!).fontFamily,
    code: getComputedStyle(document.querySelector('.prose pre')!).fontFamily,
  }));

  expect(typography.sans).toContain('Nunito Variable');
  expect(typography.mono).toContain('SFMono-Regular');
  expect(typography.body).toContain('Nunito Variable');
  expect(typography.prose).toContain('Nunito Variable');
  expect(typography.code).toContain('SFMono-Regular');
});

test('desktop homepage keeps only the Hero viewport-sized', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const layout = await page.evaluate(() => {
    const hero = document.querySelector<HTMLElement>('[data-section="hero"]')!;
    const content = Array.from(document.querySelectorAll<HTMLElement>('[data-section="activity"]'));
    const contentTop = content[0].offsetTop;
    const contentBottom = content.at(-1)!.offsetTop + content.at(-1)!.offsetHeight;
    return {
      heroHeight: Math.round(hero.getBoundingClientRect().height),
      contentHeight: Math.round(contentBottom - contentTop),
      content: content.map((element) => ({
        id: element.dataset.section,
        position: getComputedStyle(element).position,
        minHeight: getComputedStyle(element).minHeight,
      })),
    };
  });

  expect(layout.heroHeight).toBeGreaterThanOrEqual(800);
  expect(layout.heroHeight).toBeLessThanOrEqual(845);
  expect(layout.contentHeight).toBeLessThanOrEqual(2300);
  for (const section of layout.content) {
    expect(section.position, `${section.id} should stay in normal flow`).toBe('relative');
    expect(section.minHeight, `${section.id} should use content height`).toBe('0px');
  }
});

for (const path of ['/', '/search', '/404']) {
  test(`has no automated WCAG A/AA violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });
}
