import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import * as os from 'os';

/**
 * Extract Adobe IMS Authentication from Existing Browser
 *
 * This script tries to extract Adobe authentication from your existing browser
 * (Chrome, Safari, Firefox) where you're already logged in.
 *
 * Flow:
 * 1. Detect which browsers are available
 * 2. Try to find Adobe cookies in each browser's storage
 * 3. Create Playwright storage state from extracted cookies
 * 4. Verify authentication works
 *
 * If successful, you never need to manually authenticate in Playwright!
 */

const AUTH_STATE_PATH = '.auth/playwright-state.json';
const APP_URL = 'https://localhost:5173';

interface Cookie {
  name: string;
  value: string;
  domain: string;
  path: string;
  expires: number;
  httpOnly: boolean;
  secure: boolean;
  sameSite: 'Strict' | 'Lax' | 'None';
}

// Get Chrome cookie database path
function getChromeCookiePath(): string | null {
  const platform = os.platform();
  const homeDir = os.homedir();

  const paths = {
    darwin: path.join(homeDir, 'Library/Application Support/Google/Chrome/Default/Cookies'),
    linux: path.join(homeDir, '.config/google-chrome/Default/Cookies'),
    win32: path.join(process.env.LOCALAPPDATA || '', 'Google/Chrome/User Data/Default/Cookies'),
  };

  const cookiePath = paths[platform as keyof typeof paths];
  return cookiePath && fs.existsSync(cookiePath) ? cookiePath : null;
}

// Extract cookies from Chrome using sqlite3
async function extractChromeAdobeCookies(): Promise<Cookie[]> {
  console.log('🔍 Checking Chrome for Adobe cookies...');

  const cookiePath = getChromeCookiePath();
  if (!cookiePath) {
    console.log('   ⚠️  Chrome cookies not found');
    return [];
  }

  try {
    // Copy database to avoid locking issues
    const tempDb = '/tmp/chrome-cookies-temp.db';
    fs.copyFileSync(cookiePath, tempDb);

    // Query for Adobe-related cookies
    const query = `
      SELECT name, value, host_key, path, expires_utc, is_httponly, is_secure, samesite
      FROM cookies
      WHERE host_key LIKE '%adobe%' OR host_key LIKE '%okta%'
    `;

    const result = execSync(`sqlite3 "${tempDb}" "${query}"`, {
      encoding: 'utf-8',
    });

    fs.unlinkSync(tempDb);

    if (!result.trim()) {
      console.log('   ⚠️  No Adobe cookies found in Chrome');
      return [];
    }

    const cookies: Cookie[] = [];
    const lines = result.trim().split('\n');

    for (const line of lines) {
      const [name, value, domain, path, expires, httpOnly, secure, sameSite] = line.split('|');

      cookies.push({
        name,
        value,
        domain: domain.startsWith('.') ? domain : '.' + domain,
        path: path || '/',
        expires: parseInt(expires) / 1000000 - 11644473600, // Chrome epoch to Unix
        httpOnly: httpOnly === '1',
        secure: secure === '1',
        sameSite: sameSite === '0' ? 'None' : sameSite === '1' ? 'Lax' : 'Strict',
      });
    }

    console.log(`   ✅ Found ${cookies.length} Adobe cookies in Chrome`);
    return cookies;
  } catch (error) {
    console.log(`   ⚠️  Failed to extract Chrome cookies: ${error}`);
    return [];
  }
}

// Create Playwright storage state from cookies
async function createStorageState(cookies: Cookie[]): Promise<boolean> {
  if (cookies.length === 0) {
    return false;
  }

  console.log('\n📦 Creating Playwright storage state...');

  // Ensure .auth directory exists
  const authDir = path.dirname(AUTH_STATE_PATH);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const storageState = {
    cookies: cookies.map((c) => ({
      name: c.name,
      value: c.value,
      domain: c.domain,
      path: c.path,
      expires: c.expires,
      httpOnly: c.httpOnly,
      secure: c.secure,
      sameSite: c.sameSite,
    })),
    origins: [],
  };

  fs.writeFileSync(AUTH_STATE_PATH, JSON.stringify(storageState, null, 2));
  console.log(`   ✅ Storage state saved to ${AUTH_STATE_PATH}`);

  return true;
}

// Verify that extracted auth actually works
async function verifyAuthentication(): Promise<boolean> {
  console.log('\n🔐 Verifying authentication...');

  try {
    const browser = await chromium.launch({
      headless: true,
      args: ['--ignore-certificate-errors'],
    });

    const context = await browser.newContext({
      storageState: AUTH_STATE_PATH,
      ignoreHTTPSErrors: true,
    });

    const page = await context.newPage();

    // Navigate to app
    await page.goto(APP_URL, { waitUntil: 'load', timeout: 30000 });

    // Check if we have an auth token
    const hasAuth = await page.evaluate(() => {
      return typeof (window as unknown as { adobeIMSAuthToken?: unknown }).adobeIMSAuthToken === 'string';
    });

    await browser.close();

    if (hasAuth) {
      console.log('   ✅ Authentication verified - you are logged in!');
      return true;
    } else {
      console.log('   ⚠️  Authentication not detected in app');
      return false;
    }
  } catch (error) {
    console.log(`   ⚠️  Verification failed: ${error}`);
    return false;
  }
}

async function extract() {
  console.log('🎭 Adobe IMS Authentication Extractor\n');
  console.log('Attempting to extract authentication from your existing browser...\n');

  // Try Chrome first (most common)
  const cookies = await extractChromeAdobeCookies();

  // TODO: Add Safari and Firefox extraction if Chrome fails
  // Safari: ~/Library/Cookies/Cookies.binarycookies
  // Firefox: ~/Library/Application Support/Firefox/Profiles/*/cookies.sqlite

  if (cookies.length === 0) {
    console.log('\n❌ Could not extract Adobe authentication from any browser\n');
    console.log('💡 Make sure you are logged into Adobe in Chrome, then try again');
    console.log('   Or run: pnpm playwright:auth (manual login)\n');
    process.exit(1);
  }

  // Create storage state
  const created = await createStorageState(cookies);
  if (!created) {
    console.log('\n❌ Failed to create storage state\n');
    process.exit(1);
  }

  // Verify it works
  const verified = await verifyAuthentication();

  if (verified) {
    console.log('\n✨ Success! Authentication extracted from browser\n');
    console.log('💡 You can now run tests:');
    console.log('   pnpm playwright:test\n');
    process.exit(0);
  } else {
    console.log('\n⚠️  Extracted cookies but authentication failed\n');
    console.log('💡 Your browser session may be expired. Try:');
    console.log('   1. Log into Adobe in Chrome');
    console.log('   2. Run: pnpm playwright:extract-auth\n');
    console.log('   OR run manual setup: pnpm playwright:auth\n');
    process.exit(1);
  }
}

extract();
