# Playwright Authentication

Authentication guide for setting up and troubleshooting Adobe IMS authentication in Playwright.

## Quick Setup

```bash
pnpm playwright:auth
```

This single command handles everything:
1. Checks if authentication already exists
2. Tries to extract from Chrome browser (automatic)
3. Falls back to manual login if extraction fails
4. Verifies authentication works

## How It Works

### Two-Tier Authentication System

**Tier 1: Automatic Extraction (Preferred)**
- Reads Adobe cookies from your Chrome browser
- Creates Playwright auth from existing session
- **Time: ~2 seconds, zero manual interaction**
- Works if you're already logged into Adobe in Chrome

**Tier 2: Manual Login (Fallback)**
- Opens a browser window
- You log in with Adobe credentials once
- Script detects completion automatically
- Saves auth for 24 hours

### Success Scenarios

**Best case (extraction succeeds):**
```bash
$ pnpm playwright:auth

🔍 Checking Chrome for Adobe cookies...
   ✅ Found 15 Adobe cookies in Chrome
📦 Creating Playwright storage state...
   ✅ Storage state saved to .auth/playwright-state.json
🔐 Verifying authentication...
   ✅ Authentication verified - you are logged in!
✨ Authentication extraction successful!
```

**Fallback (manual login):**
```bash
$ pnpm playwright:auth

🔍 Checking Chrome for Adobe cookies...
   ⚠️  No Adobe cookies found in Chrome
⚠️  Extraction failed - falling back to manual login

🚀 Launching browser...
(user logs in manually)
✅ Authentication detected!
💾 Saving authentication state...
✨ Authentication setup complete!
```

## Checking Authentication Status

```bash
# Check if auth file exists
ls -la .auth/playwright-state.json

# Check age (macOS)
stat -f "%Sm" .auth/playwright-state.json

# Check age (Linux)
stat -c "%y" .auth/playwright-state.json
```

Authentication is valid for ~24 hours. After that, rerun `pnpm playwright:auth`.

## Troubleshooting

### "No Adobe cookies found in Chrome"

**Cause:** You're not logged into Adobe in Chrome

**Fix:**
1. Open Chrome
2. Visit https://adobe.com
3. Log in with your Adobe account
4. Run `pnpm playwright:auth` again

### "Authentication not detected in app"

**Cause:** Extracted cookies might be expired or invalid

**Fix:**
```bash
# Clean and try manual login
pnpm playwright:clean
pnpm playwright:auth-manual
```

### "Dev server is not running"

**Cause:** HTTPS dev server must be running for IMS authentication

**Fix:**
```bash
# Start dev server in another terminal
pnpm dev

# Then run auth setup
pnpm playwright:auth
```

### Authentication expired

**Symptoms:**
- Tests fail with "auth token not found"
- Authentication file is > 24 hours old

**Fix:**
```bash
# Clean and re-authenticate
pnpm playwright:clean && pnpm playwright:auth
```

### Authentication file corrupted

**Symptoms:**
- File exists but tests fail
- Verification fails even though file is recent

**Fix:**
```bash
# Remove corrupted file and recreate
rm .auth/playwright-state.json
pnpm playwright:auth
```

## Commands Reference

```bash
# Smart auth (recommended - tries extraction first)
pnpm playwright:auth

# Extract from Chrome only (skip manual fallback)
pnpm playwright:extract-auth

# Skip extraction, go straight to manual login
pnpm playwright:auth-manual

# Run tests with saved auth
pnpm playwright:test

# Clear saved authentication
pnpm playwright:clean

# Full reset
pnpm playwright:clean && pnpm playwright:auth
```

## Workflow in AI-Driven Context

When an AI agent needs authentication:

1. **Check if auth exists:**
   ```bash
   ls .auth/playwright-state.json
   ```

2. **Check age (if exists):**
   ```bash
   # macOS
   stat -f "%Sm" -t "%Y-%m-%d %H:%M" .auth/playwright-state.json

   # Linux
   stat -c "%y" .auth/playwright-state.json
   ```

3. **If missing or > 24h old, run setup:**
   ```bash
   pnpm playwright:auth
   ```

4. **Verify it worked:**
   ```bash
   # Check file exists
   ls .auth/playwright-state.json && echo "Auth ready"
   ```

## Authentication State Files

**Location:** `.auth/playwright-state.json` (gitignored)

**Contains:**
- Cookies from Adobe IMS (`auth.adobe.com`, `*.adobe.com`)
- Cookies from OKTA (`adobe.okta.com`)
- localStorage data (IMS tokens)
- Session information

**Valid for:** ~24 hours (IMS token lifetime)

**Size:** Typically 5-15KB

## For Designers/Non-Technical Users

If you're a designer using AI agents:

1. **First time:** Run `pnpm playwright:auth` once
   - If you're logged into Adobe in Chrome → Done in 2 seconds!
   - If not → Browser opens, log in once → Done!

2. **Running tests:** Just run `pnpm playwright:test`
   - Authentication is automatic after first setup

3. **If tests fail with auth error:** Run `pnpm playwright:auth` again
   - This refreshes your authentication

That's it! The AI agent will guide you through any issues.
