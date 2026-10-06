import { test, expect } from '@playwright/test';
import { getTeamMembers, teamGroups } from '../src/content/team';

for (const route of ['/', '/team']) {
  test(`Team hierarchy and content on ${route}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(route);
    const groups = page.locator('[data-team-group]');
    expect(
      await groups.evaluateAll((nodes) =>
        nodes.map((node) => node.getAttribute('data-team-group')),
      ),
    ).toEqual(route === '/' ? teamGroups.slice(0, 2) : [...teamGroups]);
    const expected = getTeamMembers(route === '/').map((member) => member.id);
    expect(
      await page
        .locator('[data-member]')
        .evaluateAll((nodes) => nodes.map((node) => node.getAttribute('data-member'))),
    ).toEqual(expected);
    await expect(groups.first()).toContainText('Prof. Rutuja Deshmukh');
    await expect(groups.first().locator('.faculty-role')).toHaveText('Faculty Coordinator');
    await expect(page.locator('img[src*="demo-"]')).toHaveCount(0);
    if (route === '/') {
      await expect(page.getByRole('link', { name: 'View Full Team' })).toHaveAttribute(
        'href',
        '/team',
      );
      await page.getByRole('link', { name: 'View Full Team' }).click();
      await expect(page).toHaveURL('/team');
    }
  });
}
for (const width of [320, 390, 768, 1280, 1440, 1920]) {
  test(`Brand and NEC align at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await expect(page.locator('.wordmark')).toHaveText('E-CELLCOET AKOLA');
    if (width >= 1100) {
      const boxes = await page.locator('.desktop-nav a').evaluateAll((links) =>
        links.map((link) => {
          const range = document.createRange();
          range.selectNodeContents(link);
          const rect = range.getBoundingClientRect();
          return { y: rect.y, height: rect.height, lines: range.getClientRects().length };
        }),
      );
      expect(
        Math.max(...boxes.map((box) => box.y)) - Math.min(...boxes.map((box) => box.y)),
      ).toBeLessThanOrEqual(1);
      expect(boxes.every((box) => box.lines === 1)).toBe(true);
    } else {
      await page.getByRole('button', { name: 'Open navigation' }).click();
      const nec = page.getByRole('dialog').getByRole('link', { name: /NEC/ });
      await expect(nec).toBeVisible();
      expect(await nec.evaluate((el) => el.scrollWidth <= el.clientWidth)).toBe(true);
    }
  });
}
