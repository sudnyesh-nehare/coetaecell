import { test, expect } from '@playwright/test';

declare global {
  interface Window {
    __coetaTestLayoutShift: number;
  }
}

const widths = [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920];
for (const width of widths) {
  test(`Faculty introduction fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const faculty = page.locator('.faculty-section');
    await faculty.scrollIntoViewIfNeeded();
    await expect(faculty.getByRole('heading', { name: 'Prof. Rutuja Deshmukh' })).toBeVisible();
    await expect(faculty.getByRole('img', { name: 'Portrait not yet available' })).toBeVisible();
    await expect(faculty.locator('button')).toHaveCount(0);
    for (let frame = 0; frame < 5; frame++) {
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
      await page.waitForTimeout(90);
    }
    if (width === 390 || width === 1440) {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await faculty.screenshot({ path: test.info().outputPath(`faculty-${width}.png`) });
      await page.screenshot({ path: test.info().outputPath(`home-${width}.png`), fullPage: true });
    }
    await page.goto('/team');
    await expect(page.locator('.faculty-profile')).toHaveCount(1);
  });
}

test('Reduced motion is immediate, static, and responds to preference changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const movingAnimations = () =>
    page.evaluate(
      () =>
        document
          .getAnimations()
          .filter(
            (animation) =>
              animation.playState === 'running' &&
              Number(animation.effect?.getComputedTiming().duration) > 1,
          ).length,
    );
  expect(await movingAnimations()).toBe(0);
  await page.locator('.statement-wall').scrollIntoViewIfNeeded();
  expect(await movingAnimations()).toBe(0);
  await expect(page.locator('.statement-toggle').first()).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Prof. Rutuja Deshmukh' })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.locator('.statement-wall').scrollIntoViewIfNeeded();
  await expect.poll(movingAnimations).toBeGreaterThan(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(movingAnimations).toBe(0);
});

test('Statements can be paused and do not duplicate accessible copy', async ({ page }) => {
  await page.goto('/');
  const statement = page.locator('.statement-ribbon');
  await statement.scrollIntoViewIfNeeded();
  await statement.getByRole('button', { name: 'Pause moving statement' }).click();
  await expect(statement).toHaveAttribute('data-paused', 'true');
  expect(
    await statement
      .locator('.statement-track')
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe('paused');
  await statement.getByRole('button', { name: 'Play moving statement' }).click();
  await expect(statement).toHaveAttribute('data-paused', 'false');
});

test('Mobile menu respects live reduced motion and releases scroll on desktop', async ({
  page,
}) => {
  await page.setViewportSize({ width: 667, height: 375 });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open navigation' });
  await trigger.click();
  const dialog = page.getByRole('dialog');
  await dialog.getByRole('link', { name: 'Contact' }).scrollIntoViewIfNeeded();
  await expect(dialog.getByRole('link', { name: 'Contact' })).toBeInViewport();
  await page.keyboard.press('Escape');
  // Hold the close animation so the preference change, rather than elapsed time, finishes it.
  await dialog.evaluate((el) => {
    for (const animation of el.getAnimations()) {
      if (!(animation instanceof CSSAnimation)) animation.pause();
    }
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(dialog).not.toBeVisible();
  await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden');
});

test('No-JavaScript content and complete people stories remain available', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Prof. Rutuja Deshmukh' })).toBeVisible();
  await expect(page.locator('.opening-scene')).not.toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/events/cybersecurity-masterclass');
  await expect(page.locator('#registration')).toContainText('Registration Open');
  await context.close();
});

test('Initial render and faculty reveal do not shift layout', async ({ page }) => {
  await page.addInitScript(() => {
    window.__coetaTestLayoutShift = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
        if (!shift.hadRecentInput) window.__coetaTestLayoutShift += shift.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.people-section').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  expect(await page.evaluate(() => window.__coetaTestLayoutShift)).toBeLessThan(0.1);
});

for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`Refined hero and section motion fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('.hero h1')).toHaveAccessibleName('where ideas become impact');
    await expect(
      page.locator('.hero').getByRole('link', { name: 'Explore Events' }),
    ).toBeInViewport();
    await expect(
      page.locator('.hero').getByRole('link', { name: 'About E-Cell' }),
    ).toBeInViewport();
    await page.waitForTimeout(1200);
    for (const section of await page.locator('.home-page > section').all()) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
        true,
      );
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.locator('.hero').scrollIntoViewIfNeeded();
    for (const motif of await page.locator('.hero-motif').all()) {
      await expect(motif).toHaveCSS('transform', 'none');
    }
    if (width === 320 || width === 390 || width === 1440) {
      await page.screenshot({ path: test.info().outputPath(`hero-${width}.png`) });
    }
    await page.locator('.hero').getByRole('link', { name: 'Explore Events' }).click();
    await expect(page).toHaveURL('/events');
    await page.getByRole('link', { name: 'E-CELL COET AKOLA home' }).click();
    await expect(page.locator('.hero h1')).toBeVisible();
    await expect(page.locator('.hero-motif').first()).toHaveCSS('transform', 'none');
  });
}

test('Hero drift can be paused and reduced motion removes its control', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Pause hero motion' });
  await toggle.click();
  await expect(page.getByRole('button', { name: 'Play hero motion' })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const shape = page.locator('.hero-motif').first();
  const transform = await shape.evaluate((element) => getComputedStyle(element).transform);
  await page.waitForTimeout(300);
  await expect(shape).toHaveCSS('transform', transform);
  await page.getByRole('button', { name: 'Play hero motion' }).click();
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(toggle).not.toBeVisible();
  await expect(shape).toHaveCSS('transform', 'none');
});

test('Droplet opening completes, skips on input, and respects reduced motion', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.opening-scene')).toBeVisible();
  await expect(page.locator('.opening-scene')).toHaveCSS('visibility', 'hidden', { timeout: 3500 });
  await expect(page.locator('.hero').getByRole('link', { name: 'Explore Events' })).toBeVisible();
  await page.evaluate(() => sessionStorage.removeItem('coeta-opening-seen'));
  await page.reload();
  await expect(page.locator('.opening-scene')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator('.opening-scene')).not.toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.evaluate(() => sessionStorage.removeItem('coeta-opening-seen'));
  await page.reload();
  await expect(page.locator('.opening-scene')).not.toBeVisible();
});
