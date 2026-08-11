/**
 * Projects E2E tests — S3
 *
 * TC1 — section is present in the DOM
 * TC2 — correct number of project cards (6)
 * TC3 — each card has a project name visible in the code editor
 * TC4 — each card has at least one tech import line (tech-pill)
 * TC5 — each card body (card-back) has content (description rendered as JSDoc)
 * TC6 — each card has a clickable viewProject link
 * TC7 — section has accessible label
 * TC8 — each card titlebar has macOS window dots
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

  // TC2 — correct card count (one viewProject link per card)
  test('card-count — six project cards rendered', async ({ page }) => {
    await waitForPage(page);
    await expect(page.locator('[data-testid="project-card"]')).toHaveCount(6);
  });

  // TC3 — project names present in the code editor body
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

  // TC4 — tech import lines present on each card
  test('tech-pills — each card has at least one tech pill', async ({ page }) => {
    await waitForPage(page);
    const containers = page.locator('[data-testid="project-card-container"]');
    const count = await containers.count();
    for (let i = 0; i < count; i++) {
      const pills = containers.nth(i).locator('[data-testid="tech-pill"]');
      await expect(pills.first()).toBeAttached();
    }
  });

  // TC5 — card-back (code body) has non-empty content
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

  // TC6 — each card links to a URL via the viewProject anchor
  test('card-links — each card links to a URL', async ({ page }) => {
    await waitForPage(page);
    const cards = page.locator('[data-testid="project-card"]');
    const count = await cards.count();
    for (let i = 0; i < count; i++) {
      const href = await cards.nth(i).getAttribute('href');
      expect(href).toBeTruthy();
    }
  });

  // TC7 — accessible label on section
  test('accessible-label — section has aria-label', async ({ page }) => {
    await waitForPage(page);
    const label = await page.locator('[data-testid="projects-section"]').getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

  // TC8 — macOS window dots present in each card titlebar
  test('titlebar-dots — each card has macOS window dots', async ({ page }) => {
    await waitForPage(page);
    const dots = page.locator('[data-testid="titlebar-dots"]');
    await expect(dots).toHaveCount(6);
  });

});
