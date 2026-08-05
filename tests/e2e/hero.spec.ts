/**
 * Hero E2E tests — S1
 *
 * Playwright spec covering page-level assertions:
 * TC5  — tech-ticker-above-exists
 * TC6  — tech-ticker-below-exists
 * TC8  — photo-strip-renders-three-columns
 * TC9  — photos-have-alt-text
 * TC20 — page-renders-hero-section (name visible on root route)
 *
 * Also covers AC9 (viewport responsiveness) at 375px, 768px, 1440px.
 *
 * RED: All tests fail until Hero is wired into src/app/page.tsx and
 * the dev server is running.
 */

import { test, expect, type Page } from '@playwright/test';

/** Locate the name heading by its stable aria-label (ScrambleText sets this on mount). */
function nameLocator(page: Page) {
  return page.locator('[data-testid="scramble-text"][aria-label="Andrew Dell\'Aringa"]');
}

/**
 * Navigate to root and wait until:
 *   1. The loading screen has exited (<main> loses aria-hidden), AND
 *   2. The scramble-text element is present in the DOM with its aria-label
 *      (confirms full client-side hydration has completed).
 */
async function waitForHero(page: Page) {
  await page.goto('/');
  await page.locator('main:not([aria-hidden])').waitFor({ state: 'attached', timeout: 10000 });
  await nameLocator(page).waitFor({ state: 'attached', timeout: 10000 });
}

test.describe('S1 — Hero section', () => {

  // -------------------------------------------------------------------------
  // TC20 — page-renders-hero-section
  // -------------------------------------------------------------------------
  test("name-is-present — \"Andrew Dell'Aringa\" visible on root route", async ({ page }) => {
    await waitForHero(page);
    await expect(nameLocator(page)).toBeVisible();
  });

  test('job-title-is-present — job title visible on root route', async ({ page }) => {
    await waitForHero(page);
    await expect(page.getByText('SWE @ IBM').first()).toBeVisible();
  });

  test('degree-is-present — degree text visible on root route', async ({ page }) => {
    await waitForHero(page);
    await expect(page.getByText('B.A. Computer Science, UC Santa Cruz').first()).toBeVisible();
  });

  test('experience-level-is-present — experience level visible on root route', async ({ page }) => {
    await waitForHero(page);
    await expect(page.getByText('Junior Developer — 2 years').first()).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // TC5 + TC6 — tech-ticker-above-exists + tech-ticker-below-exists
  // -------------------------------------------------------------------------
  test('tech-ticker-above-exists — at least one tech ticker present', async ({ page }) => {
    await waitForHero(page);
    const tickers = page.locator('[data-testid="tech-ticker"]');
    await expect(tickers.first()).toBeVisible();
  });

  test('tech-ticker-below-exists — two tech tickers present (above and below)', async ({ page }) => {
    await waitForHero(page);
    const tickers = page.locator('[data-testid="tech-ticker"]');
    await expect(tickers).toHaveCount(2);
  });

  // -------------------------------------------------------------------------
  // TC7 — tech-icons-have-aria-labels
  // -------------------------------------------------------------------------
  test('tech-icons-have-aria-labels — every tech icon has an aria-label', async ({ page }) => {
    await waitForHero(page);
    const icons = page.locator('[data-testid="tech-icon"]');
    const count = await icons.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const label = await icons.nth(i).getAttribute('aria-label');
      expect(label).toBeTruthy();
    }
  });

  // -------------------------------------------------------------------------
  // TC8 — photo-strip-renders-three-columns
  // -------------------------------------------------------------------------
  test('photo-strip-renders-three-columns — 3 photo columns present', async ({ page }) => {
    await waitForHero(page);
    const columns = page.locator('[data-testid="photo-column"]');
    await expect(columns).toHaveCount(3);
  });

  // -------------------------------------------------------------------------
  // TC9 — photos-have-alt-text
  // -------------------------------------------------------------------------
  test('photos-have-alt-text — all images in photo strip have alt text', async ({ page }) => {
    await waitForHero(page);
    const columns = page.locator('[data-testid="photo-column"]');
    const colCount = await columns.count();
    for (let c = 0; c < colCount; c++) {
      const imgs = columns.nth(c).locator('img');
      const imgCount = await imgs.count();
      for (let i = 0; i < imgCount; i++) {
        const alt = await imgs.nth(i).getAttribute('alt');
        expect(alt).toBeTruthy();
      }
    }
  });

  // -------------------------------------------------------------------------
  // AC9 — viewport responsiveness
  // -------------------------------------------------------------------------
  for (const viewport of [
    { name: 'mobile 375px',  width: 375,  height: 812  },
    { name: 'tablet 768px',  width: 768,  height: 1024 },
    { name: 'desktop 1440px',width: 1440, height: 900  },
  ]) {
    test(`responsive-${viewport.name} — name visible at ${viewport.width}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await waitForHero(page);
      await expect(nameLocator(page)).toBeVisible({ timeout: 10000 });
    });
  }

});
