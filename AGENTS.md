# Protopack Base Template

## First-Time Setup

**⚠️ IMPORTANT: If SETUP.md exists in this project, setup is incomplete.**

When SETUP.md is present, your AI assistant will automatically start a setup interview to configure this template. The interview takes ~5 minutes and covers:

1. Template vs Project choice
2. Framework selection (React/Lit)
3. Project requirements (routing, state, services)
4. Dependency installation and file generation

After setup completes:
- SETUP.md is deleted
- Your choices are documented in "Project Configuration" below
- The template is ready to use

---

## Project Configuration

_This section is populated after the setup interview completes._

**Project Type:** [Not yet configured]
**Framework:** React (default - will be updated after setup)
**Status:** ⚠️ Setup required - run the interview to configure

---

## About This Template

This is a **minimal base template** for creating Protopack applications with Adobe services. It provides essential Adobe integrations (IMS authentication, Spectrum S2, Adobe Services) while remaining unopinionated about architecture, routing, and state management.

**Target audience:** Designers, PMs, and developers who want a clean starting point with Adobe essentials pre-configured.

**Framework:** React + Vite by default, but the core IMS authentication is framework-agnostic and can be adapted to Vue, Svelte, or vanilla JavaScript.

**Deployment:** Adobe's "Awesome" hosting service (internal CI/CD).

## Plugin

The user should have @adtech/protopack-template plugin for Claude Code. This includes skills, agents and other useful tools for the project.

## Philosophy

This template is intentionally minimal:
- ✅ **Includes:** Adobe IMS (login), Spectrum S2 (design system), Services SDK (Adobe APIs), HTTPS dev server
- ❌ **Doesn't include:** Routing, state management, complex UI patterns, business logic

**When to use this:** Starting a new Protopack template or project. Add routing, state management, and other features as needed (see Customization Guide below).

## Getting Started with Claude Code

When you open this project in Claude Code, it automatically sets everything up for you:

1. **Installs dependencies** - If `node_modules` doesn't exist, it runs `pnpm install`
2. **Starts dev server** - Launches `pnpm dev` in the background on port 5173 (HTTPS)

**The dev server runs automatically in the background** so your app is always ready to view at `https://localhost:5173`. (port may vary based on available ports)

**Dev server logs:** If you need to check what's happening with the dev server, view the logs:
```bash
tail -f /tmp/claude-dev-server.log
```

**Authentication:** If you see a warning about Playwright authentication, run `/playwright-auth` to set it up once. This is needed for testing and browser automation.

## Commands

- `pnpm dev` - Start dev server (HTTPS)
- `pnpm build` - Production build
- `pnpm lint` - TypeScript + ESLint

## Architecture

- **Client-only application** - No backend/server code; hosted on Awesome Hosting, Adobe's internal deployment platform
- **Entry point:** src/main.tsx → src/App.tsx
- **Authentication:** Framework-agnostic IMS singleton (src/utils/IMS.ts)
  - React: Use `useIMS()` hook from src/contexts/useIMS.ts
  - Other frameworks: Import IMS directly and wrap in your framework's reactive system
- **UI:** Adobe React Spectrum S2 design system (pre-installed)
- **Build:** Vite with HTTPS (required for IMS)

## UI Components (CRITICAL)

**⛔ MANDATORY: Use Adobe React Spectrum S2 components for ALL interactive UI**

- **NEVER use plain HTML elements** for interactive components (`<button>`, `<input>`, `<select>`, `<textarea>`)
- **ALWAYS import from** `@react-spectrum/s2`
- **Provider is required** - Wrap app in `<Provider>` from `@react-spectrum/s2`
- **IMPORTANT:** Spectrum S2 does NOT include layout components (`Flex`, `Grid`, `View`) - use plain `<div>` with CSS for layouts

### Required component mapping:

| HTML Element | Spectrum Component | Import |
|--------------|-------------------|--------|
| `<button>` | `<Button>` | `@react-spectrum/s2` |
| `<input type="text">` | `<TextField>` | `@react-spectrum/s2` |
| `<select>` | `<Picker>` | `@react-spectrum/s2` |
| `<textarea>` | `<TextArea>` | `@react-spectrum/s2` |
| `<h1>`, `<h2>`, etc. | `<Heading>` | `@react-spectrum/s2` |
| `<p>`, text content | `<Text>` | `@react-spectrum/s2` |
| Layout containers | **Use plain `<div>` with CSS** | N/A |

### Example (CORRECT):
```tsx
import { Provider, Button, TextField, Heading, Text } from '@react-spectrum/s2';

function App() {
  return (
    <Provider>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Heading>Welcome</Heading>
        <Text>Enter your information below</Text>
        <TextField label="Name" />
        <Button variant="primary">Submit</Button>
      </div>
    </Provider>
  );
}
```

### Anti-pattern (WRONG):
```tsx
// ❌ NEVER DO THIS - Don't use plain HTML for interactive elements
<div className="container">
  <input type="text" placeholder="Name" />
  <button className="btn-primary">Submit</button>
</div>
```

### Exceptions:
Plain HTML is acceptable for:
- Semantic elements (`<main>`, `<article>`, `<section>`)
- **Layout containers (`<div>`)** - Spectrum S2 doesn't provide layout components
- SVG graphics
- Non-interactive content where Spectrum doesn't provide an equivalent

## Adobe Services (IMPORTANT)

**Always explore `@adtech/protopack-services-all` first for Adobe service requests.**

This package includes 20+ Adobe APIs:

- `firefly` - Image generation, upscaling, generative fill
- `ps` - Photoshop API
- `lightroom` - Lightroom API
- `digitalImaging` - Image processing services
- `adobe3p` - Third-party Adobe integrations
- ...and more (inspect the package for full listing)

**Usage pattern:**

```typescript
import { generateV4 } from '@adtech/protopack-services-firefly';
import { useIMS } from './contexts/useIMS';

function MyComponent() {
  const ims = useIMS();

  const handleGenerate = async () => {
    const result = await generateV4(
      "a mountain landscape",
      ims.token,        // Bearer token from IMS
      ims.apiKey        // x-api-key from IMS
    );
    const imageUrl = result.outputs[0].image.presignedUrl;
    console.log('Generated image:', imageUrl);
  };

  return <Button onPress={handleGenerate}>Generate</Button>;
}
```

**Framework-agnostic usage:**

```typescript
import { IMS } from './utils/IMS';
import { generateV4 } from '@adtech/protopack-services-firefly';

// Wait for IMS to be ready
await IMS.ready;

// Make API call
const result = await generateV4(
  "a mountain landscape",
  IMS.token,
  IMS.apiKey
);
const imageUrl = result.outputs[0].image.presignedUrl;
```

**Adobe3P (LLM) example:**

```typescript
import { generateLLM, createTextMessage } from '@adtech/protopack-services-adobe3p';
import { useIMS } from './contexts/useIMS';

function ChatComponent() {
  const ims = useIMS();

  const handleChat = async () => {
    const messages = [createTextMessage("user", "Tell me about Adobe Firefly")];
    const result = await generateLLM(messages, ims.token, ims.apiKey);
    const text = result.choices[0].message.content[0].text;
    console.log('Response:', text);
  };

  return <Button onPress={handleChat}>Ask Question</Button>;
}
```

If a service doesn't exist in @adtech packages, check the Services MCP server, then inform the user.

## Authentication

### IMS Setup

Authentication is handled by a **framework-agnostic singleton** in `src/utils/IMS.ts`. This works with any framework.

**React integration (already provided):**

```typescript
import { useIMS } from './contexts/useIMS';

function MyComponent() {
  const ims = useIMS();

  // Access token
  const token = ims.token;
  const apiKey = ims.apiKey;

  // Check auth status
  if (ims.isAuthenticated) {
    // User is logged in
  }

  // Sign in/out
  return (
    <>
      <Button onPress={() => ims.signIn()}>Sign In</Button>
      <Button onPress={() => ims.logout()}>Sign Out</Button>
    </>
  );
}
```

**Framework-agnostic usage:**

```typescript
import { IMS } from './utils/IMS';

// Wait for IMS to be ready
await IMS.ready;

// Get credentials for API calls
const token = IMS.token;        // Bearer token
const apiKey = IMS.apiKey;      // x-api-key

// Check auth status
if (IMS.isAuthenticated) {
  // User is logged in
}

// Sign in/out
IMS.signIn();
IMS.logout();
```

**IMPORTANT:** Do NOT use separate API key environment variables. Always get credentials from IMS.

## Key Rules

- **Spectrum S2:** Use Spectrum components for ALL interactive UI (see section above)
- **IMS Authentication:** Always get tokens from IMS singleton, never hardcode or use env vars
- **Adobe Services:** Use `@adtech/protopack-services-all` first before building custom integrations
- **Text style:** Use sentence case for all text (not Title Case)
- **Build tool:** Vite recommended (HTTPS required for IMS)
- **Framework flexibility:** Core IMS is framework-agnostic, adapt as needed

## Customization Guide

This is a **base template** - you're expected to customize it. Here's what to keep vs. what to change:

### ✅ Keep These (Adobe Essentials)

- `src/utils/IMS.ts` - IMS authentication singleton
- `src/utils/IMSConstants.ts` - IMS configuration
- `@adtech/protopack-services-all` package
- HTTPS dev server configuration (required for IMS)
- Playwright auth setup scripts
- Spectrum S2 Provider wrapper

### 🎨 Customize These

- **Routing:** Add React Router, TanStack Router, or your preferred solution
- **State management:** Add Redux, Zustand, Jotai, or your preferred solution
- **UI patterns:** Build your own layouts and components (using Spectrum primitives)
- **Business logic:** Add your application-specific logic
- **Framework:** Adapt to Vue/Svelte/vanilla (IMS singleton works with any framework)

### Adding Routing (React)

```bash
# React Router
pnpm add react-router-dom

# TanStack Router
pnpm add @tanstack/react-router
```

### Adding State Management (React)

```bash
# Zustand (simple)
pnpm add zustand

# Redux Toolkit
pnpm add @reduxjs/toolkit react-redux

# Jotai (atomic)
pnpm add jotai
```

### Adapting to Other Frameworks

**Vue 3:**
1. Remove React packages, add Vue
2. Create composable: `export function useIMS() { return reactive(IMS); }`
3. Use Spectrum Web Components

**Svelte:**
1. Remove React packages, add Svelte
2. Create store: `export const ims = writable(IMS);`
3. Use Spectrum Web Components

**Vanilla JS:**
- IMS singleton works directly, no wrapper needed
- Use Spectrum Web Components

See README.md for detailed framework adaptation guides.

## Playwright Authentication

This project uses Adobe IMS for authentication, which requires special handling in Playwright for testing and browser automation.

### Auth State Management

Authentication state is saved to `.auth/playwright-state.json` (gitignored). This file contains:
- Cookies from the Adobe IMS login flow
- localStorage data (including IMS tokens)
- Session information

**Check if auth exists:**
```bash
ls -la .auth/playwright-state.json
```

### Setting Up Authentication

**One-time setup (or when tokens expire):**

1. Start the dev server (HTTPS required for IMS):
   ```bash
   pnpm dev
   ```

2. Run the auth setup script:
   ```bash
   pnpm playwright:auth
   ```

   This opens a browser where you log in with Adobe credentials. The script automatically detects when authentication completes and saves the state.

**Using a custom port:**

If your dev server runs on a different port, specify it:

```bash
# Method 1: Pass port as argument
pnpm playwright:auth 3000

# Method 2: Use environment variable
PORT=3000 pnpm playwright:auth

# Method 3: Use VITE_PORT
VITE_PORT=3000 pnpm playwright:auth
```

The script will automatically check that the server is running on the specified port.

### Using playwright-cli

Always use session isolation to prevent conflicts:

```bash
# Set session (use PILOT_SESSION_ID in /spec workflows)
PW_SESSION="${PILOT_SESSION_ID:-default}"

# Load saved auth state
playwright-cli -s="$PW_SESSION" state-load .auth/playwright-state.json

# Open the app (should be authenticated)
playwright-cli -s="$PW_SESSION" open https://localhost:5173

# Verify authentication
playwright-cli -s="$PW_SESSION" eval "window.adobeIMSAuthToken"
# Should return a token string

# Take snapshot to interact
playwright-cli -s="$PW_SESSION" snapshot

# Clean up when done
playwright-cli -s="$PW_SESSION" close
```

### Using the /playwright-auth Skill

For automated workflows:
```
/playwright-auth
```

This skill:
- Checks if auth state exists
- Guides through setup if needed
- Loads state into playwright-cli
- Verifies authentication works

### Using Playwright MCP Server

The Playwright MCP server is configured in `.mcp.json` to automatically use the saved authentication state:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {
        "PLAYWRIGHT_STORAGE_STATE": ".auth/playwright-state.json",
        "PLAYWRIGHT_IGNORE_HTTPS_ERRORS": "true"
      }
    }
  }
}
```

Once authentication is set up with `pnpm playwright:auth`, the Playwright MCP server will automatically use it.

### VS Code Tasks

When you open the project in VS Code, it automatically:
1. Installs dependencies if needed
2. Checks if Playwright authentication is set up
3. Starts the dev server

If authentication isn't set up, you'll see a message in the terminal output.

**Manual tasks available:**

Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux), then "Tasks: Run Task":
- **playwright:auth** - Set up authentication (opens browser)
- **playwright:test** - Run tests with authentication
- **playwright:clean** - Remove saved authentication

**Automated workflow on project open:**
1. Install dependencies → 2. Check auth status → 3. Start dev server

If auth is missing, the check task will notify you to run `playwright:auth`.

### Writing Tests

Tests automatically use the saved auth state (configured in `playwright.config.ts`):

```typescript
import { test, expect } from '@playwright/test';

test('app is authenticated', async ({ page }) => {
  await page.goto('/');

  // Check for auth token
  const token = await page.evaluate(() => (window as any).adobeIMSAuthToken);
  expect(token).toBeTruthy();

  // Verify user is logged in
  // ... your test code
});
```

Run tests:
```bash
pnpm playwright:test
```

### Token Expiration

IMS tokens typically expire after ~24 hours. When tokens expire:

```bash
# Clean old state
pnpm playwright:clean

# Re-authenticate
pnpm playwright:auth
```

### Troubleshooting

**Auth not working:**
- Ensure dev server is running: `pnpm dev`
- Check state file exists: `ls .auth/playwright-state.json`
- Verify HTTPS works: `curl -k https://localhost:5173`

**Token expired:**
- Run `pnpm playwright:clean && pnpm playwright:auth`

**State corrupted:**
- Delete and recreate: `rm .auth/playwright-state.json && pnpm playwright:auth`

### Helper Scripts

```bash
pnpm playwright:auth   # Set up/refresh authentication
pnpm playwright:test   # Run tests with saved auth
pnpm playwright:clean  # Remove auth state
```
