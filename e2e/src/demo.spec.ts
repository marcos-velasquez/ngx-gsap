import { expect, Page, test } from '@playwright/test';

const tabOpacities = (page: Page): Promise<number[]> =>
  page.evaluate(() =>
    Array.from(document.querySelectorAll('header ~ div button')).map((el) => Number(getComputedStyle(el).opacity))
  );

test.describe('demo', () => {
  test('loads without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
    page.on('pageerror', (error) => errors.push(error.message));

    await page.goto('/');

    await expect(page.locator('h1')).toContainText('ngx-gsap');
    expect(errors).toEqual([]);
  });

  test('plays a preset when a card is clicked', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('app-default > div').first();
    await card.scrollIntoViewIfNeeded();

    await card.click();

    await expect.poll(() => card.evaluate((el) => el.getAttribute('style') ?? '')).not.toBe('');
  });

  test('animates the tabs in on load', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();

    expect(Math.min(...(await tabOpacities(page)))).toBeLessThan(1);
  });

  test('rests load animations at their end when the user asks for reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();

    expect(await tabOpacities(page)).toEqual([1, 1, 1]);
  });
});
