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

import { test, expect } from '@playwright/test';

test.describe('S1 — Hero section', () => {

  // -------------------------------------------------------------------------
  // TC20 — page-renders-hero-section
  // -------------------------------------------------------------------------
  test('name-is-present — "Andrew Dellaringa" visible on root route', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Andrew Dellaringa')).toBeVisible();
  });

  test('job-title-is-present — job title visible on root route', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Software Engineer @ IBM')).toBeVisible();
  });

  test('degree-is-present — degree text visible on root route', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('B.S. Computer Science, UC Santa Cruz')).toBeVisible();
  });

  test('experience-level-is-present — experience level visible on root route', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Junior — 2+ years')).toBeVisible();
  });

  // -------------------------------------------------------------------------
  // TC5 + TC6 — tech-ticker-above-exists + tech-ticker-below-exists
  // -------------------------------------------------------------------------
  test('tech-ticker-above-exists — at least one tech ticker present', async ({ page }) => {
    await page.goto('/');
    const tickers = page.locator('[data-testid="tech-ticker"]');
    await expect(tickers.first()).toBeVisible();
  });

  test('tech-ticker-below-exists — two tech tickers present (above and below)', async ({ page }) => {
    await page.goto('/');
    const tickers = page.locator('[data-testid="tech-ticker"]');
    await expect(tickers).toHaveCount(2);
  });

  // -------------------------------------------------------------------------
  // TC7 — tech-icons-have-aria-labels
  // -------------------------------------------------------------------------
  test('tech-icons-have-aria-labels — every tech icon has an aria-label', async ({ page }) => {
    await page.goto('/');
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
    await page.goto('/');
    const columns = page.locator('[data-testid="photo-column"]');
    await expect(columns).toHaveCount(3);
  });

  // -------------------------------------------------------------------------
  // TC9 — photos-have-alt-text
  // -------------------------------------------------------------------------
  test('photos-have-alt-text — all images in photo strip have alt text', async ({ page }) => {
    await page.goto('/');
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
      await page.goto('/');
      await expect(page.getByText('Andrew Dellaringa')).toBeVisible();
    });
  }

});
