import { chromium, type Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

/**
 * Adobe IMS Authentication Setup Script
 *
 * This script:
 * 1. Checks if the dev server is running
 * 2. Opens a browser in headed mode
 * 3. Navigates to the local dev server
 * 4. Waits for the user to complete Adobe IMS authentication
 * 5. Saves the authenticated state (cookies + localStorage) for reuse
 *
 * Usage:
 *   pnpm playwright:auth
 *
 * IMPORTANT: The dev server must be running first!
 *   In one terminal: pnpm dev
 *   In another terminal: pnpm playwright:auth
 *
 * The saved state (.auth/playwright-state.json) can be loaded in:
 * - Playwright tests (configured in playwright.config.ts)
 * - playwright-cli sessions (playwright-cli state-load .auth/playwright-state.json)
 * - Playwright MCP server (via storageState configuration)
 */

interface WindowWithIMS extends Window {
  adobeIMSAuthToken?: string;
  adobeIMS?: {
    signIn: () => void;
  };
}

const AUTH_STATE_PATH = '.auth/playwright-state.json';

async function detectVitePort(): Promise<string> {
  // Try to auto-detect Vite port from running processes
  const { execSync } = await import('child_process');
  try {
    const output = execSync('lsof -ti:5173-5200 2>/dev/null', { encoding: 'utf-8' });
    const pids = output.trim().split('\n').filter(Boolean);

    for (const pid of pids) {
      const cmdOutput = execSync(`ps -p ${pid} -o command= 2>/dev/null`, { encoding: 'utf-8' });
      if (cmdOutput.includes('vite') && cmdOutput.includes('ppk-template-starter')) {
        const portOutput = execSync(`lsof -Pan -p ${pid} -i 2>/dev/null | grep LISTEN`, { encoding: 'utf-8' });
        const portMatch = portOutput.match(/:(\d+) \(LISTEN\)/);
        if (portMatch) {
          return portMatch[1];
        }
      }
    }
  } catch {
    // Fall through to default
  }
  return '5173';
}

// Support custom port via environment variable or command line argument
// Usage: PORT=3000 pnpm playwright:auth
//    or: pnpm playwright:auth 3000
const PORT = process.argv[2] || process.env.PORT || process.env.VITE_PORT || await detectVitePort();
const APP_URL = `https://localhost:${PORT}`;

async function checkServerRunning(port: string): Promise<boolean> {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: parseInt(port, 10),
      path: '/',
      method: 'GET',
      rejectUnauthorized: false, // Allow self-signed certificates
    };

    const req = https.request(options, (res) => {
      resolve(res.statusCode !== undefined && res.statusCode < 500);
    });

    req.on('error', () => {
      resolve(false);
    });

    req.setTimeout(2000, () => {
      req.destroy();
      resolve(false);
    });

    req.end();
  });
}

async function waitForAuthentication(page: Page): Promise<boolean> {
  console.log('\n⏳ Waiting for Adobe IMS authentication...');
  console.log('📝 Please log in with your Adobe credentials in the browser window');
  console.log('   This script will automatically detect when authentication completes\n');

  try {
    // Wait for the auth token to be set in window object
    // IMS sets window.adobeIMSAuthToken when authentication succeeds (see src/utils/IMS.ts:81)
    await page.waitForFunction(
      () => {
        return (
          typeof (window as WindowWithIMS).adobeIMSAuthToken === 'string' &&
          (window as WindowWithIMS).adobeIMSAuthToken.length > 0
        );
      },
      { timeout: 15 * 60 * 1000 } // 15 minutes for user to authenticate
    );

    // Verify token is also in localStorage (IMS uses useLocalStorage: true)
    const hasLocalStorageToken = await page.evaluate(() => {
      const keys = Object.keys(localStorage);
      return keys.some(key => key.includes('token') || key.includes('ims'));
    });

    if (!hasLocalStorageToken) {
      console.warn('⚠️  Token found in window but not in localStorage');
    }

    return true;
  } catch {
    console.error('❌ Authentication timeout or failed');
    return false;
  }
}

async function getAuthInfo(page: Page): Promise<{ token: string; email?: string }> {
  return await page.evaluate(() => {
    const token = (window as WindowWithIMS).adobeIMSAuthToken || '';
    const localStorageData: Record<string, unknown> = {};

    // Collect IMS-related data from localStorage
    Object.keys(localStorage).forEach(key => {
      try {
        const value = localStorage.getItem(key);
        if (value && (key.includes('ims') || key.includes('token') || key.includes('profile'))) {
          localStorageData[key] = JSON.parse(value);
        }
      } catch {
        localStorageData[key] = localStorage.getItem(key);
      }
    });

    // Try to extract email from profile data
    let email: string | undefined;
    for (const value of Object.values(localStorageData)) {
      if (value && typeof value === 'object' && 'email' in value) {
        const obj = value as Record<string, unknown>;
        if (typeof obj.email === 'string') {
          email = obj.email;
          break;
        }
      }
    }

    return { token, email };
  });
}

async function setup() {
  console.log('🎭 Playwright Adobe IMS Authentication Setup\n');
  console.log(`🌐 Target URL: ${APP_URL}\n`);

  // Check if dev server is running
  console.log('🔍 Checking if dev server is running...');
  const serverRunning = await checkServerRunning(PORT);

  if (!serverRunning) {
    console.error(`❌ Dev server is not running on port ${PORT}!\n`);
    console.log('📝 Please start the dev server first:');
    console.log('   1. Open a new terminal');
    console.log('   2. Run: pnpm dev');
    console.log(`   3. Wait for "Local: https://localhost:${PORT}"`);
    console.log('   4. Then run this script again: pnpm playwright:auth\n');
    if (PORT !== '5173') {
      console.log(`💡 Custom port detected: ${PORT}`);
      console.log('   Make sure your dev server is running on this port\n');
    }
    process.exit(1);
  }

  console.log('✅ Dev server is running\n');

  // Ensure .auth directory exists
  const authDir = path.dirname(AUTH_STATE_PATH);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    console.log(`📁 Created ${authDir} directory`);
  }

  // Launch browser in headed mode so user can see the login flow
  console.log('🚀 Launching browser...\n');
  const browser = await chromium.launch({
    headless: false, // Must be headed for user to log in
    args: ['--ignore-certificate-errors'], // For local HTTPS with self-signed cert
  });

  const context = await browser.newContext({
    ignoreHTTPSErrors: true,
  });

  const page = await context.newPage();

  try {
    // Navigate to the app
    console.log(`🌐 Navigating to ${APP_URL}...`);
    await page.goto(APP_URL, { waitUntil: 'load', timeout: 60000 });

    // Wait for the app to render (check for root div content)
    console.log('⏳ Waiting for app to render...');
    await page.waitForSelector('body', { timeout: 30000 });

    // Try to trigger Adobe IMS sign-in via the global adobeIMS object
    console.log('🔐 Attempting to trigger Adobe IMS sign-in...\n');
    const signInTriggered = await page.evaluate(() => {
      // Check if adobeIMS is available globally
      const adobeIMS = (window as WindowWithIMS).adobeIMS;
      if (adobeIMS && typeof adobeIMS.signIn === 'function') {
        adobeIMS.signIn();
        return true;
      }
      return false;
    });

    if (!signInTriggered) {
      console.log('⚠️  Could not auto-trigger sign-in. Please manually log in when the IMS popup appears.');
    }

    // Wait for authentication to complete
    const authenticated = await waitForAuthentication(page);

    if (!authenticated) {
      console.error('\n❌ Authentication failed or timed out');
      process.exit(1);
    }

    console.log('✅ Authentication detected!\n');

    // Get auth info for confirmation
    const { token, email } = await getAuthInfo(page);

    // Save the authentication state
    console.log(`💾 Saving authentication state to ${AUTH_STATE_PATH}...`);
    await context.storageState({ path: AUTH_STATE_PATH });

    console.log('\n✨ Authentication setup complete!\n');
    console.log('📋 Authentication details:');
    if (email) {
      console.log(`   Email: ${email}`);
    }
    if (token) {
      console.log(`   Token: [redacted] (length: ${token.length} characters)`);
    } else {
      console.log('   Token: (not available)');
    }
    console.log(`   State saved to: ${AUTH_STATE_PATH}`);

    console.log('\n💡 Usage:');
    console.log('   playwright-cli:');
    console.log(`     playwright-cli state-load ${AUTH_STATE_PATH}`);
    console.log(`     playwright-cli open ${APP_URL}`);
    console.log('\n   Playwright tests:');
    console.log('     pnpm playwright:test');
    console.log('\n   AI assistants:');
    console.log('     /playwright-auth');
    console.log('\n🔄 To refresh authentication, run: pnpm playwright:auth\n');

  } catch (error) {
    console.error('\n❌ Error during authentication setup:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

setup();
