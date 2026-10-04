import { test, expect } from '@playwright/test';
const routes = [
  '/',
  '/events',
  '/events/the-first-pitch',
  '/events/zero-to-one',
  '/events/beyond-the-blueprint',
  '/about',
  '/initiatives',
  '/nec',
  '/team',
  '/gallery',
  '/contact',
];
for (const width of [360, 390, 430, 768, 1024, 1440]) {
  test(`All routes fit the viewport at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const route of routes) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(200);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator('h1')).toBeVisible();
      const overflow = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
        body: document.body.scrollWidth,
      }));
      expect(overflow.document, route).toBeLessThanOrEqual(overflow.viewport);
      expect(overflow.body, route).toBeLessThanOrEqual(overflow.viewport);
      const clipped = await page
        .locator('h1, h2, h3')
        .evaluateAll((headings) =>
          headings.filter((h) => h.scrollWidth > h.clientWidth + 1).map((h) => h.textContent),
        );
      expect(clipped, `Clipped headings at ${route}`).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}
test('Event filtering preserves accessible results and links', async ({ page }) => {
  await page.goto('/events');
  await page.getByRole('button', { name: 'Workshop', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('1 demo event');
  await expect(page.locator('.event-card')).toHaveCount(1);
  await page.getByRole('heading', { name: 'Zero to One' }).getByRole('link').click();
  await expect(page).toHaveURL(/events\/zero-to-one/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Zero to One');
});
test('Mobile navigation traps focus, closes with Escape, and follows links', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => !!document.activeElement?.closest('dialog'))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole('navigation', { name: 'Mobile navigation' })
    .getByRole('link', { name: 'Events' })
    .click();
  await expect(page).toHaveURL('/events');
  await expect(page.getByRole('dialog')).not.toBeVisible();
});
test('Direct mobile event visits expose registration status and functional FAQ', async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/events/the-first-pitch');
  await page.locator('.mobile-registration').getByRole('link').click();
  await expect(page.locator('#registration')).toBeInViewport();
  await expect(page.locator('#registration')).toContainText('Registration not open');
  await page.locator('summary').filter({ hasText: 'Can I register now?' }).click();
  await expect(
    page.getByText('Not yet. This is a frontend preview', { exact: false }),
  ).toBeVisible();
});
test('Unknown event and route render a useful 404', async ({ page }) => {
  for (const path of ['/events/missing-event', '/missing-page', '/toString']) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
    await expect(page.getByRole('link', { name: 'Back to home' })).toBeVisible();
  }
});
