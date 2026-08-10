/**
 * WorkGallery E2E tests — S3
 *
 * Covers the horizontal scroll-pinned terminal gallery section.
 *
 * TC1  — section is present in the DOM
 * TC2  — correct number of terminal panels (one per work entry)
 * TC3  — each panel has the company logo
 * TC4  — each panel has a terminal window chrome (traffic-light dots)
 * TC5  — each panel shows the company name
 * TC6  — each panel shows the role title
 * TC7  — progress bar element is present
 * TC8  — section has accessible label
 */

import { test, expect, type Page } from '@playwright/test';

async function waitForPage(page: Page) {
  await page.goto('/');
  await page.locator('main:not([aria-hidden])').waitFor({ state: 'attached', timeout: 10000 });
}

test.describe('S3 — WorkGallery terminal section', () => {

  // -------------------------------------------------------------------------
  // TC1 — section is present in the DOM
  // -------------------------------------------------------------------------
  test('section-present — work-gallery section renders on root route', async ({ page }) => {
    await waitForPage(page);
    await expect(page.locator('[data-testid="work-gallery-section"]')).toBeAttached();
  });

  // -------------------------------------------------------------------------
  // TC2 — correct number of terminal panels
  // -------------------------------------------------------------------------
  test('panel-count — one terminal panel per work entry (3 panels)', async ({ page }) => {
    await waitForPage(page);
    const panels = page.locator('[data-testid="terminal-panel"]');
    await expect(panels).toHaveCount(3);
  });

  // -------------------------------------------------------------------------
  // TC3 — each panel has the company logo
  // -------------------------------------------------------------------------
  test('panel-logos — each terminal panel contains a company logo image', async ({ page }) => {
    await waitForPage(page);
    const logos = page.locator('[data-testid="terminal-panel"] [data-testid="company-logo"]');
    await expect(logos).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      const alt = await logos.nth(i).getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  // -------------------------------------------------------------------------
  // TC4 — terminal chrome (traffic-light dots) present in each panel
  // -------------------------------------------------------------------------
  test('terminal-chrome — each panel has terminal window chrome dots', async ({ page }) => {
    await waitForPage(page);
    const chromes = page.locator('[data-testid="terminal-chrome"]');
    await expect(chromes).toHaveCount(3);
  });

  // -------------------------------------------------------------------------
  // TC5 — each panel shows the company name
  // -------------------------------------------------------------------------
  test('company-names — IBM, What\'s The Move, and Lighthouse are visible', async ({ page }) => {
    await waitForPage(page);
    await expect(page.locator('[data-testid="work-gallery-section"]').getByText('IBM').first()).toBeAttached();
    await expect(page.locator('[data-testid="work-gallery-section"]').getByText("What's The Move").first()).toBeAttached();
    await expect(page.locator('[data-testid="work-gallery-section"]').getByText('Lighthouse IT Consulting').first()).toBeAttached();
  });

  // -------------------------------------------------------------------------
  // TC6 — each panel shows the role title
  // -------------------------------------------------------------------------
  test('role-titles — role titles are present in terminal panels', async ({ page }) => {
    await waitForPage(page);
    const section = page.locator('[data-testid="work-gallery-section"]');
    await expect(section.getByText('Software Engineer').first()).toBeAttached();
    await expect(section.getByText('Founding iOS Developer').first()).toBeAttached();
    await expect(section.getByText('Founder & Lead IT Consultant').first()).toBeAttached();
  });

  // -------------------------------------------------------------------------
  // TC7 — progress bar present
  // -------------------------------------------------------------------------
  test('progress-bar — scroll progress bar element is present', async ({ page }) => {
    await waitForPage(page);
    await expect(page.locator('[data-testid="gallery-progress-bar"]')).toBeAttached();
  });

  // -------------------------------------------------------------------------
  // TC8 — accessible label on section
  // -------------------------------------------------------------------------
  test('accessible-label — section has aria-label for screen readers', async ({ page }) => {
    await waitForPage(page);
    const section = page.locator('[data-testid="work-gallery-section"]');
    const label = await section.getAttribute('aria-label');
    expect(label).toBeTruthy();
  });

});
