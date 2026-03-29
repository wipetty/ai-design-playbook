import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for Adobe IMS authenticated testing
 *
 * This config supports:
 * - Local HTTPS development server (required for Adobe IMS)
 * - Saved authentication state for reusable sessions
 * - Appropriate timeouts for authentication flows
 * - Custom port via PORT or VITE_PORT environment variable
 */

const PORT = process.env.PORT || process.env.VITE_PORT || '5173';
const BASE_URL = `https://localhost:${PORT}`;

export default defineConfig({
  testDir: './tests',

  // Run tests in files in parallel
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,

  // Retry on CI only
  retries: process.env.CI ? 2 : 0,

  // Reporter to use
  reporter: 'html',

  // Shared settings for all the projects below
  use: {
    // Base URL for local development (supports custom port)
    baseURL: BASE_URL,

    // Collect trace when retrying the failed test
    trace: 'on-first-retry',

    // Ignore HTTPS errors for local development with self-signed certificates
    ignoreHTTPSErrors: true,

    // Storage state to reuse authentication
    storageState: '.auth/playwright-state.json',
  },

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Adobe IMS works best with Chromium
      },
    },
  ],

  // Run your local dev server before starting the tests
  webServer: {
    command: 'pnpm dev',
    url: BASE_URL,
    reuseExistingServer: !process.env.CI,
    ignoreHTTPSErrors: true,
    timeout: 120000, // 2 minutes for server startup
  },
});
