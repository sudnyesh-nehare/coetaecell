import { test, expect, type Page } from '@playwright/test';
const eventPath = '/events/cybersecurity-masterclass';
const registerPath = `${eventPath}/register`;
async function fillDetails(page: Page) {
  await page.getByLabel('Full Name *', { exact: true }).fill('Demo Student');
  await page.getByLabel('Email *', { exact: true }).fill('student@example.com');
  await page.getByLabel('Mobile Number *', { exact: true }).fill('9876543210');
  await page.getByLabel('College *', { exact: true }).fill('Demo College of Engineering');
  await page.getByLabel('Department *', { exact: true }).fill('Computer Science');
  await page.getByLabel('Year *', { exact: true }).selectOption('Third year');
}
async function capture(page: Page, name: string, width: number) {
  if (width !== 390 && width !== 1440) return;
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({
    path: test.info().outputPath(`${name}-${width}.png`),
    fullPage: true,
    animations: 'disabled',
  });
}
async function fits(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () =>
          Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) <= innerWidth,
      ),
    )
    .toBe(true);
  expect(
    await page
      .locator('main h1, main h2, main h3')
      .evaluateAll((headings) =>
        headings.filter((el) => el.scrollWidth > el.clientWidth + 1).map((el) => el.textContent),
      ),
  ).toEqual([]);
}
for (const width of [320, 360, 390, 430, 768, 1024, 1280, 1440, 1920]) {
  test(`Registration stops at review and fits ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    const errors: string[] = [];
    const writes: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => {
      if (request.method() !== 'GET' && request.method() !== 'HEAD') writes.push(request.url());
    });
    await page.goto('/events');
    await page
      .getByRole('heading', { name: 'Cybersecurity Masterclass' })
      .getByRole('link')
      .click();
    await expect(page).toHaveURL(eventPath);
    await expect(page.locator('#registration')).toContainText('₹100 per student');
    await fits(page);
    await capture(page, 'event', width);
    await page.getByRole('link', { name: 'Register Now' }).first().click();
    await expect(page).toHaveURL(registerPath);
    await fits(page);
    expect(
      await page
        .locator('input, select, textarea')
        .evaluateAll((fields) =>
          fields.every(
            (el) =>
              parseFloat(getComputedStyle(el).fontSize) >= 16 &&
              el.getBoundingClientRect().height >= 44,
          ),
        ),
    ).toBe(true);
    await capture(page, 'form', width);
    await fillDetails(page);
    await page.getByRole('button', { name: 'Review Registration' }).click();
    await expect(page.getByRole('heading', { name: 'Review Registration' })).toBeFocused();
    await expect(page.locator('.participant-summary')).toContainText('Demo Student');
    await expect(page.getByRole('complementary', { name: 'Event summary' })).toContainText('₹100');
    await fits(page);
    await capture(page, 'review', width);
    await page.getByRole('button', { name: 'Edit Details' }).click();
    await expect(page.getByLabel('Full Name *', { exact: true })).toHaveValue('Demo Student');
    await page.getByLabel('Full Name *', { exact: true }).fill('Demo Student Updated');
    await page.getByRole('button', { name: 'Review Registration' }).click();
    await expect(page.locator('.participant-summary')).toContainText('Demo Student Updated');
    await expect(page.getByRole('button', { name: 'Proceed to Payment' })).toBeDisabled();
    await expect(
      page.getByText('Online payment integration will be enabled shortly.', { exact: true }),
    ).toBeVisible();
    await expect(page.locator('.checkout-total dd')).toHaveText('₹100');
    await expect(page.locator('.checkout-progress li')).toHaveCount(2);
    await expect(page.locator('main')).not.toContainText(
      /Simulate|Registration ID|Registration Confirmed|receipt|Demo Payment/i,
    );
    await page.keyboard.press('Tab');
    await fits(page);
    expect(errors).toEqual([]);
    expect(writes).toEqual([]);
  });
}

test('Validation explains required fields, invalid contact details', async ({ page }) => {
  await page.goto(registerPath);
  await page.getByRole('button', { name: 'Review Registration' }).click();
  await expect(page.locator('form').getByRole('alert')).toContainText('highlighted fields');
  await expect(page.getByLabel('Full Name *', { exact: true })).toBeFocused();
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(6);
  await fillDetails(page);
  await page.getByLabel('Full Name *', { exact: true }).fill('   ');
  await page.getByLabel('Email *', { exact: true }).fill('not-an-email');
  await page.getByLabel('Mobile Number *', { exact: true }).fill('123');
  await page.getByRole('button', { name: 'Review Registration' }).click();
  await expect(page.locator('#email-error')).toContainText('valid email');
  await expect(page.locator('#mobile-error')).toContainText('10-digit');
  await fillDetails(page);
  await page.getByLabel('Mobile Number *', { exact: true }).fill('+91 98765 43210');
  await page.getByRole('button', { name: 'Review Registration' }).click();
  await expect(page.getByRole('heading', { name: 'Review Registration' })).toBeVisible();
});

test('Review survives Back to Event, and refresh clears participant data', async ({ page }) => {
  await page.goto(registerPath);
  await fillDetails(page);
  await page.getByRole('button', { name: 'Review Registration' }).click();
  await page.getByRole('link', { name: 'Back to Event' }).click();
  await page.getByRole('link', { name: 'Register Now' }).first().click();
  await expect(page.getByRole('heading', { name: 'Review Registration' })).toBeVisible();
  await expect(page.locator('.participant-summary')).toContainText('student@example.com');
  await page.reload();
  await expect(page.getByLabel('Full Name *', { exact: true })).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Review Registration' })).toBeVisible();
});

test('Empty filters and removed events do not publish fictional content', async ({ page }) => {
  await page.goto('/events');
  await page.getByRole('button', { name: 'Past', exact: true }).click();
  await expect(page.locator('.event-card')).toHaveCount(0);
  await expect(page.locator('.event-empty')).toBeVisible();
  await page.getByRole('button', { name: 'Upcoming', exact: true }).click();
  await page.getByRole('button', { name: 'Workshop / Masterclass', exact: true }).click();
  await expect(page.locator('.event-card')).toHaveCount(1);
  for (const slug of [
    'innoventure-2026',
    'the-starting-point',
    'the-first-pitch',
    'missing-event',
  ]) {
    const response = await page.goto(`/events/${slug}/register`);
    expect(response?.status()).toBe(404);
    await expect(page.locator('form')).toHaveCount(0);
  }
});

test('Reduced-motion checkout stays static through review', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(registerPath);
  await fillDetails(page);
  for (const name of ['Review Registration']) {
    await page.getByRole('button', { name }).click();
    expect(
      await page.evaluate(
        () =>
          document
            .getAnimations()
            .filter(
              (animation) =>
                animation.playState === 'running' &&
                Number(animation.effect?.getComputedTiming().duration) > 1,
            ).length,
      ),
    ).toBe(0);
  }
});

test('Without JavaScript registration gives a clear explanation and does not submit a form', async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto(registerPath);
  await expect(page.locator('noscript .registration-notice')).toBeVisible();
  await expect(page.locator('noscript .registration-notice')).toContainText(
    'Enable JavaScript to enter and review registration details.',
  );
  await expect(page.locator('form')).not.toBeVisible();
  await context.close();
});
