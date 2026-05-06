import { execSync } from 'child_process';
import * as fs from 'fs';

/**
 * Smart Authentication Setup
 *
 * This script implements a two-tier authentication strategy:
 * 1. Try to extract auth from existing browser (Chrome/Safari/Firefox)
 * 2. If that fails, fall back to manual login
 *
 * Usage:
 *   pnpm playwright:auth
 */

const AUTH_STATE_PATH = '.auth/playwright-state.json';

async function smartAuth() {
  console.log('🎭 Adobe IMS Smart Authentication\n');

  // Check if auth already exists and is recent (< 24h)
  if (fs.existsSync(AUTH_STATE_PATH)) {
    const stats = fs.statSync(AUTH_STATE_PATH);
    const ageHours = (Date.now() - stats.mtimeMs) / (1000 * 60 * 60);

    if (ageHours < 24) {
      console.log(`✅ Valid authentication found (${Math.round(ageHours)}h old)`);
      console.log('   Skipping setup - you can run tests now\n');
      console.log('💡 To force re-authentication:');
      console.log('   pnpm playwright:clean && pnpm playwright:auth\n');
      process.exit(0);
    } else {
      console.log(`⏰ Authentication expired (${Math.round(ageHours)}h old)\n`);
    }
  }

  // Step 1: Try extraction
  console.log('📋 Step 1: Trying to extract authentication from existing browser...\n');

  try {
    execSync('tsx playwright.extract-auth.ts', {
      stdio: 'inherit',
    });

    // If we get here, extraction succeeded
    console.log('\n✨ Authentication extraction successful!\n');
    process.exit(0);
  } catch {
    console.log('\n⚠️  Extraction failed - falling back to manual login\n');
  }

  // Step 2: Fall back to manual login
  console.log('📋 Step 2: Manual authentication setup...\n');
  console.log('💡 A browser will open - please log in with your Adobe credentials\n');

  try {
    execSync('tsx playwright.auth.setup.ts', {
      stdio: 'inherit',
    });
  } catch {
    console.error('\n❌ Manual authentication failed\n');
    process.exit(1);
  }
}

smartAuth();
