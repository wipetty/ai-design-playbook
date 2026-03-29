import { test, expect } from '@playwright/test';

/**
 * Example Playwright Test with Adobe IMS Authentication
 *
 * This test demonstrates how to write tests that use saved authentication state.
 * The authentication state is automatically loaded from .auth/playwright-state.json
 * (configured in playwright.config.ts).
 *
 * Before running:
 * 1. Ensure dev server is running: pnpm dev
 * 2. Ensure auth state exists: pnpm playwright:auth
 * 3. Run tests: pnpm playwright:test
 */

test.describe('Adobe IMS Authentication', () => {
  test('should load app with authenticated user', async ({ page }) => {
    // Navigate to the app
    await page.goto('/');

    // Wait for IMS to initialize
    await page.waitForFunction(
      () => typeof (window as any).adobeIMSAuthToken !== 'undefined',
      { timeout: 10000 }
    );

    // Verify auth token is present in window
    const token = await page.evaluate(() => (window as any).adobeIMSAuthToken);
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    console.log('✅ Auth token found:', token.substring(0, 20) + '...');
  });

  test('should have IMS data in localStorage', async ({ page }) => {
    await page.goto('/');

    // Check that IMS stored data in localStorage
    const imsKeys = await page.evaluate(() => {
      const keys = Object.keys(localStorage);
      return keys.filter(key =>
        key.includes('ims') || key.includes('token') || key.includes('adobe')
      );
    });

    expect(imsKeys.length).toBeGreaterThan(0);
    console.log('✅ Found IMS keys in localStorage:', imsKeys);
  });

  test('should have user profile data available', async ({ page }) => {
    await page.goto('/');

    // Wait for IMS to be ready and profile to load
    await page.waitForFunction(
      () => {
        const ims = (window as any).IMS;
        return ims && ims.profileData && ims.profileData.email;
      },
      { timeout: 15000 }
    );

    // Get profile data
    const profileEmail = await page.evaluate(() => {
      const ims = (window as any).IMS;
      return ims?.profileData?.email;
    });

    expect(profileEmail).toBeTruthy();
    console.log('✅ User authenticated as:', profileEmail);
  });

  test('should show authenticated UI state', async ({ page }) => {
    await page.goto('/');

    // Wait for the app to render
    await page.waitForLoadState('networkidle');

    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/authenticated-state.png' });

    // You can add more specific UI checks here based on your app
    // For example, checking for user profile elements, etc.
    console.log('✅ Screenshot saved to test-results/authenticated-state.png');
  });
});

test.describe('Authentication State Persistence', () => {
  test('auth state persists across page reloads', async ({ page }) => {
    // First load
    await page.goto('/');
    await page.waitForFunction(() => (window as any).adobeIMSAuthToken);
    const token1 = await page.evaluate(() => (window as any).adobeIMSAuthToken);

    // Reload the page
    await page.reload();
    await page.waitForFunction(() => (window as any).adobeIMSAuthToken);
    const token2 = await page.evaluate(() => (window as any).adobeIMSAuthToken);

    // Token should be the same (loaded from saved state)
    expect(token1).toBe(token2);
    console.log('✅ Auth persists across reloads');
  });
});
