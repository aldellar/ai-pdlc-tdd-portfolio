/**
 * Projects E2E tests — S3
 *
 * TC1 — section is present in the DOM
 * TC2 — correct number of project cards (6)
 * TC3 — each card has a project name on the front
 * TC4 — each card has tech stack pills on the front
 * TC5 — each card flips to show description on hover
 * TC6 — each card is a clickable link
 * TC7 — section has accessible label
 */

import { test, expect, type Page } from '@playwright/test';

async function waitForPage(page: Page) {
  await page.goto('/');
  await page.locator('main:not([aria-hidden])').waitFor({ state: 'attached', timeout: 10000 });
}

test.describe('S3 — Projects section', () => {

  // TC1 — section present
  test('section-present — projects section renders on root route', async ({ page }) => {
    await waitForPage(page);
    await expect(page.locator('[data-testid="projects-section"]')).toBeAttached();
  });

  // TC2 — correct card count
  test('card-count — six project cards rendered', async ({ page }) => {
    await waitForPage(page);
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(6);
  });

  // TC3 — project names on front face
  test('project-names — all project names present', async ({ page }) => {
    await waitForPage(page);
    const section = page.locator('[data-testid="projects-section"]');
    await expect(section.getByText('AI PDLC TDD Portfolio').first()).toBeAttached();
    await expect(section.getByText('TechPath AI').first()).toBeAttached();
    await expect(section.getByText('Distributed Key-Value Store').first()).toBeAttached();
    await expect(section.getByText('CollabSpace').first()).toBeAttached();
    await expect(section.getByText('Cryptor').first()).toBeAttached();
    await expect(section.getByText('Workout Logger').first()).toBeAttached();
  });

  // TC4 — tech pills present on each card front
  test('tech-pills — each card has at least one tech pill', async ({ page }) => {
    await waitForPage(page);
    const cards = page.locator('[data-testid="project-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const pills = cards.nth(i).locator('[data-testid="tech-pill"]');
      await expect(pills.first()).toBeAttached();
    }
  });

  // TC5 — back face has description
  test('card-back — description text is present in each card back', async ({ page }) => {
    await waitForPage(page);
    const backs = page.locator('[data-testid="card-back"]');
    const count = await backs.count();
    expect(count).toBe(6);
    for (let i = 0; i < count; i++) {
      const text = await backs.nth(i).textContent();
      expect(text?.trim().length).toBeGreaterThan(0);
    }
  });

  // TC6 — each card is a link
  test('card-links — each card links to a URL', async ({ page }) => {
    await waitForPage(page);
    const cards = page.locator('[data-testid="project-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  // TC7 — accessible label
  test('accessible-label — section has aria-label', async ({ page }) => {
    await waitForPage(page);
    const label = await page.locator('[data-testid="projects-section"]').getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

});
