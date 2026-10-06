import { test, expect } from '@playwright/test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { FeaturedEvent } from '../src/components/featured-event';
import { EventList } from '../src/components/event-list';
import { events, eventSections } from '../src/content/events';
import { teamMembers } from '../src/content/team';

test('Roster has 25 students including leaders, plus one faculty coordinator', async ({ page }) => {
  expect(teamMembers.filter((person) => person.level !== 'faculty')).toHaveLength(25);
  expect(teamMembers.filter((person) => person.level === 'faculty')).toHaveLength(1);
  expect(new Set(teamMembers.map((person) => person.id)).size).toBe(26);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/team');
  await expect(page.locator('[data-member]')).toHaveCount(26);
  await expect(page.locator('[data-level="leadership"]')).toHaveCount(2);
  await expect(page.locator('[data-level="head"]')).toHaveCount(4);
  await expect(page.locator('[data-level="member"]')).toHaveCount(19);
  await expect(page.locator('[data-member]').first()).toContainText('Prof. Rutuja Deshmukh');
  await expect(page.locator('[data-member]').nth(1)).toContainText('President');
  await expect(page.locator('[data-member]').nth(2)).toContainText('Vice President');
  await expect(page.locator('[data-temporary="true"]')).toHaveCount(25);
  await expect(page.locator('[data-member] [role="img"]')).toHaveCount(26);
  await expect(page.locator('.sample-roster-note')).toBeVisible();
  await expect(page.locator('main')).not.toContainText(/details will be shared once confirmed/i);
  await page.goto('/');
  await expect(page.locator('[data-member]')).toHaveCount(3);
  await expect(page.locator('[data-level="head"], [data-level="member"]')).toHaveCount(0);
});

test('Portrait scales and grid balance follow hierarchy', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/team');
  const widths = [];
  for (const level of ['faculty', 'leadership', 'head', 'member']) {
    widths.push(
      await page
        .locator(`[data-level="${level}"] .person-portrait`)
        .first()
        .evaluate((el) => el.getBoundingClientRect().width),
    );
  }
  expect(widths[0]).toBeLessThanOrEqual(420);
  for (let i = 1; i < widths.length; i++) expect(widths[i]).toBeLessThan(widths[i - 1]);
  await page.screenshot({ path: test.info().outputPath('team-desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 768, height: 900 });
  const facultyWidth = await page
    .locator('.person-faculty .person-portrait')
    .evaluate((el) => el.getBoundingClientRect().width);
  const leaderWidth = await page
    .locator('.person-leadership .person-portrait')
    .first()
    .evaluate((el) => el.getBoundingClientRect().width);
  expect(facultyWidth).toBeGreaterThan(leaderWidth);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: test.info().outputPath('team-mobile.png'), fullPage: true });
});

test('Event-specific sections and chronological listing', async ({ page }) => {
  await page.goto('/events');
  await expect(page.locator('.event-card h3')).toHaveText([
    'Idea Pitching Competition',
    'Cybersecurity Masterclass',
  ]);
  await expect(page.locator('.event-empty')).toHaveCount(0);
  await page.goto('/events/cybersecurity-masterclass');
  await expect(page.getByRole('heading', { name: 'Prerequisites', exact: true })).toBeVisible();
  await expect(page.getByText('No advanced security experience required')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Judging criteria', exact: true })).toHaveCount(0);
  await page.goto('/events/idea-pitching-competition');
  await expect(page.getByRole('heading', { name: 'Prerequisites', exact: true })).toHaveCount(0);
  for (const name of ['About', 'Theme', 'Judging criteria', 'Submission', 'Eligibility']) {
    await expect(page.getByRole('heading', { name, exact: true })).toBeVisible();
  }
  await expect(page.getByText('Indicative examples only.', { exact: false })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Rounds', exact: true })).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Rules', exact: true })).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText('₹100');
  await expect(page.getByRole('link', { name: 'Register Now', exact: true })).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({
    path: test.info().outputPath('competition-desktop.png'),
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: test.info().outputPath('competition-mobile.png'), fullPage: true });
  await page.goto('/events/idea-pitching-competition/register');
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: 'Registration unavailable.' })).toBeVisible();
});

test('Talk and workshop sections omit irrelevant and empty fields', () => {
  const base = events.find((event) => event.type === 'masterclass')!;
  const talk = eventSections({
    ...base,
    type: 'talk',
    speaker: 'Sample speaker',
    topics: ['Sample topic'],
  });
  expect(talk.map((section) => section.title)).toContain('Speaker');
  expect(talk.map((section) => section.title)).not.toContain('Prerequisites');
  const workshop = eventSections({ ...base, type: 'workshop' });
  expect(workshop.map((section) => section.title)).toContain('Prerequisites');
  expect(workshop.map((section) => section.title)).not.toContain('Instructor');
});

test('Empty event data renders the reusable no-upcoming-events state', async ({ page }) => {
  await page.setContent(renderToStaticMarkup(createElement(EventList, { items: [] })));
  await expect(page.getByRole('heading', { name: 'No upcoming events' })).toBeVisible();
  await expect(page.getByText('New events are being planned. Check back soon.')).toBeVisible();
  await expect(page.locator('.event-card')).toHaveCount(0);
  await page.setContent(renderToStaticMarkup(createElement(FeaturedEvent, { items: [] })));
  await expect(page.getByRole('heading', { name: 'No upcoming events' })).toBeVisible();
});

test('NEC journey is internal with a secondary official link', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.locator('.desktop-nav').getByRole('link', { name: 'NEC', exact: true }),
  ).toHaveAttribute('href', '/nec');
  await page.getByRole('link', { name: 'Explore Our NEC Journey' }).click();
  await expect(page).toHaveURL('/nec');
  for (const text of [
    'NEC 2024 Basic Track',
    '25-member student team',
    'E-Summit 2025',
    '2nd Prize in Pitch Perfect 2025',
  ]) {
    await expect(page.locator('main')).toContainText(text);
  }
  const official = page.locator('main').getByRole('link', { name: 'Official NEC' });
  await expect(official).toHaveAttribute('href', 'https://www.ecell.in/nec/');
  await expect(official).not.toHaveClass(/button/);
  await expect(page.locator('main')).not.toContainText('Participating in NEC 2026');
});

test('Motion instructions are absent from visible copy; accessible icon controls remain', async ({
  page,
}) => {
  await page.goto('/');
  const text = await page.locator('body').innerText();
  expect(text).not.toMatch(/\b(?:Pause|Resume|Hold|Stop here|Motion on\/off)\b/i);
  const controls = page.locator('.hero-motion-toggle, .statement-toggle');
  for (const control of await controls.all()) {
    await expect(control).toHaveText('');
    await expect(control).toHaveAttribute('aria-label', /Pause/);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  for (const control of await controls.all()) await expect(control).not.toBeVisible();
});

test('New roster, NEC journey and competition remain readable without JavaScript', async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/team');
  await expect(page.locator('[data-member]')).toHaveCount(26);
  await expect(page.getByRole('heading', { name: 'Aarav Sharma' })).toBeVisible();
  await page.goto('/nec');
  await expect(page.getByRole('heading', { name: 'Our NEC Journey.' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Official NEC' })).toHaveAttribute(
    'href',
    'https://www.ecell.in/nec/',
  );
  await page.screenshot({
    path: test.info().outputPath('nec-mobile.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.screenshot({
    path: test.info().outputPath('nec-desktop.png'),
    fullPage: true,
    animations: 'disabled',
  });
  await page.goto('/events/idea-pitching-competition');
  await expect(page.getByRole('heading', { name: 'Judging criteria' })).toBeVisible();
  await page.locator('summary').filter({ hasText: 'Is this a confirmed programme?' }).click();
  await expect(
    page.getByText('This is a sample competition preview.', { exact: false }),
  ).toBeVisible();
  await context.close();
});
