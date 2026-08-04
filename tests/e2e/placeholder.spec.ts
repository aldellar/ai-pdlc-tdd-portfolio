import { test, expect } from '@playwright/test';

// Placeholder — E2E tests will be added in S1 (Hero section).
// This file exists so `pnpm test:e2e` exits cleanly with no test-not-found error.
test('placeholder — app is reachable', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL('/');
});
