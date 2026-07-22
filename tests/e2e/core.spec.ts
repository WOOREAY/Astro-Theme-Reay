import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test('language, theme, and client navigation stay synchronized', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByRole('heading', { level: 1 })).toContainText('WOOREAY');
  await expect(page.getByText('about.hobbies.title')).toHaveCount(0);

  const languageButton = page.getByRole('button', { name: '切换语言' });
  await languageButton.click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
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
  await expect(page.getByRole('link', { name: 'Astro 3.0 新特性详解' })).toBeVisible();
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
  const menuButton = page.getByRole('button', { name: '打开菜单' });
  await menuButton.click();
  await expect(page.getByRole('button', { name: '关闭菜单' })).toHaveAttribute('aria-expanded', 'true');
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
