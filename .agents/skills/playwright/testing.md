# Writing Playwright Tests

Guide for writing and running Playwright tests in this Adobe IMS authenticated project.

## Quick Start

```bash
# Run all tests
pnpm playwright:test

# Run in UI mode (debug visually)
pnpm playwright:test:ui

# Run in headed mode (see browser)
pnpm playwright:test:headed
```

## Test Structure

Tests automatically use saved authentication from `.auth/playwright-state.json` (configured in `playwright.config.ts`).

### Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test('app loads with authentication', async ({ page }) => {
  await page.goto('/');

  // Verify page loaded
  await expect(page).toHaveTitle(/Protopack/);

  // Verify authentication token exists
  const hasToken = await page.evaluate(() => {
    return typeof (window as any).adobeIMSAuthToken === 'string';
  });

  expect(hasToken).toBeTruthy();
});
```

## Adobe IMS Authentication Patterns

### Checking Authentication

```typescript
test('user is authenticated', async ({ page }) => {
  await page.goto('/');

  // Wait for IMS to initialize
  await page.waitForFunction(
    () => typeof (window as any).adobeIMSAuthToken !== 'undefined',
    { timeout: 10000 }
  );

  // Get auth token
  const token = await page.evaluate(() => (window as any).adobeIMSAuthToken);
  expect(token).toBeTruthy();
  expect(typeof token).toBe('string');
});
```

### Getting User Profile

```typescript
test('user profile is loaded', async ({ page }) => {
  await page.goto('/');

  // Wait for IMS and profile to load
  await page.waitForFunction(
    () => {
      const ims = (window as any).IMS;
      return ims && ims.profileData && ims.profileData.email;
    },
    { timeout: 15000 }
  );

  // Get profile data
  const email = await page.evaluate(() => {
    const ims = (window as any).IMS;
    return ims?.profileData?.email;
  });

  expect(email).toBeTruthy();
  console.log('Authenticated as:', email);
});
```

### Checking IMS Data in localStorage

```typescript
test('IMS data persists in localStorage', async ({ page }) => {
  await page.goto('/');

  // Check that IMS stored data in localStorage
  const imsKeys = await page.evaluate(() => {
    const keys = Object.keys(localStorage);
    return keys.filter(key =>
      key.includes('ims') || key.includes('token') || key.includes('adobe')
    );
  });

  expect(imsKeys.length).toBeGreaterThan(0);
  console.log('Found IMS keys:', imsKeys);
});
```

## Testing Adobe Services

### Testing Firefly API

```typescript
test('Firefly API call works', async ({ page }) => {
  await page.goto('/');

  // Wait for auth
  await page.waitForFunction(() => (window as any).adobeIMSAuthToken);

  // Call Firefly API
  const result = await page.evaluate(async () => {
    const { generateV4 } = await import('@adtech/protopack-services-firefly');
    const ims = (window as any).IMS;

    const response = await generateV4(
      'a mountain landscape',
      ims.token,
      ims.apiKey
    );

    return response.outputs[0].image.presignedUrl;
  });

  expect(result).toBeTruthy();
  expect(result).toContain('https://');
});
```

### Testing LLM via Adobe3P

```typescript
test('LLM API call works', async ({ page }) => {
  await page.goto('/');

  // Wait for auth
  await page.waitForFunction(() => (window as any).adobeIMSAuthToken);

  // Call LLM API
  const result = await page.evaluate(async () => {
    const { generateLLM, createTextMessage } =
      await import('@adtech/protopack-services-adobe3p');
    const ims = (window as any).IMS;

    const messages = [createTextMessage("user", "Say hello")];
    const response = await generateLLM(messages, ims.token, ims.apiKey, {
      modelId: 'gpt',
      modelVersion: 'gpt-4o'
    });

    return response.choices[0].message.content[0].text;
  });

  expect(result).toBeTruthy();
  expect(typeof result).toBe('string');
});
```

## Common Test Patterns

### Taking Screenshots

```typescript
test('capture authenticated state', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Take screenshot
  await page.screenshot({
    path: 'test-results/authenticated-state.png',
    fullPage: true
  });
});
```

### Testing Persistence

```typescript
test('auth persists across page reloads', async ({ page }) => {
  // First load
  await page.goto('/');
  await page.waitForFunction(() => (window as any).adobeIMSAuthToken);
  const token1 = await page.evaluate(() => (window as any).adobeIMSAuthToken);

  // Reload page
  await page.reload();
  await page.waitForFunction(() => (window as any).adobeIMSAuthToken);
  const token2 = await page.evaluate(() => (window as any).adobeIMSAuthToken);

  // Token should be the same
  expect(token1).toBe(token2);
});
```

### Testing UI Interactions

```typescript
import { Button } from '@react-spectrum/s2';

test('button click works', async ({ page }) => {
  await page.goto('/');

  // Find and click button (using Spectrum S2 components)
  await page.click('button:has-text("Generate")');

  // Wait for result
  await page.waitForSelector('.result-container', { timeout: 10000 });

  // Verify result
  const resultText = await page.textContent('.result-container');
  expect(resultText).toBeTruthy();
});
```

## Running Tests

```bash
# Run all tests
pnpm playwright:test

# Run specific test file
pnpm playwright:test tests/example.spec.ts

# Run tests in UI mode (interactive)
pnpm playwright:test:ui

# Run in headed mode (see browser)
pnpm playwright:test:headed

# Run with debugging
PWDEBUG=1 pnpm playwright:test

# Generate test report
pnpm playwright:test --reporter=html
```

## Debugging Tests

### Using Playwright Inspector

```bash
# Run with inspector
PWDEBUG=1 pnpm playwright:test
```

This opens Playwright Inspector where you can:
- Step through test
- Inspect elements
- See console logs
- Record actions

### Using console.log

```typescript
test('debug test', async ({ page }) => {
  await page.goto('/');

  // Log page title
  console.log('Page title:', await page.title());

  // Log element text
  const text = await page.textContent('h1');
  console.log('Heading:', text);

  // Log evaluated result
  const token = await page.evaluate(() => (window as any).adobeIMSAuthToken);
  console.log('Token length:', token?.length);
});
```

### Using page.pause()

```typescript
test('pause for debugging', async ({ page }) => {
  await page.goto('/');

  // Pause here - browser stays open
  await page.pause();

  // Continue test after manual inspection
  await page.click('button');
});
```

## Test Configuration

Tests are configured in `playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'https://localhost:5173',
    storageState: '.auth/playwright-state.json',
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: 'pnpm dev',
    url: 'https://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Best Practices

### 1. Wait for Authentication

Always wait for IMS to initialize before testing auth-dependent features:

```typescript
await page.waitForFunction(() => (window as any).adobeIMSAuthToken);
```

### 2. Use Appropriate Timeouts

Adobe IMS can take a few seconds to initialize:

```typescript
await page.waitForFunction(
  () => (window as any).adobeIMSAuthToken,
  { timeout: 10000 } // 10 seconds
);
```

### 3. Clean Up After Tests

```typescript
test.afterEach(async ({ page }) => {
  // Close any dialogs
  await page.close();
});
```

### 4. Use Fixtures for Common Setup

```typescript
import { test as base } from '@playwright/test';

const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/');
    await page.waitForFunction(() => (window as any).adobeIMSAuthToken);
    await use(page);
  },
});

// Use in tests
test('my test', async ({ authenticatedPage }) => {
  // Page is already authenticated
  const token = await authenticatedPage.evaluate(() =>
    (window as any).adobeIMSAuthToken
  );
  expect(token).toBeTruthy();
});
```

## Common Issues

### Test fails with "auth token not found"

**Cause:** Authentication state is missing or expired

**Fix:**
```bash
pnpm playwright:auth
pnpm playwright:test
```

### Test times out waiting for auth

**Cause:** Dev server might not be running or IMS failed to load

**Fix:**
- Ensure `pnpm dev` is running
- Check browser console for IMS errors
- Verify `.auth/playwright-state.json` exists

### Tests pass locally but fail in CI

**Cause:** CI doesn't have authentication state

**Fix:** Set up authentication in CI or use a test account without MFA
