# Protopack Base Template

A minimal starting point for creating Protopack applications with Adobe services. This template provides the essential Adobe integrations while staying flexible about your framework and architecture choices.

## What's Included

This template comes pre-configured with:

### ✅ Adobe Essentials (Non-Negotiable)

- **Adobe IMS Authentication** - Ready-to-use authentication with token management
- **Adobe Spectrum S2** - Design system components for consistent Adobe UI
- **Adobe Services SDK** (`@adtech/protopack-services-all`) - Access to 20+ Adobe APIs
- **Playwright Auth Setup** - Automated authentication state management for testing
- **HTTPS Dev Server** - Required for IMS authentication

### 🎨 Framework Setup (Customizable)

- **React 19** - Default UI framework (easily adaptable to Vue/Svelte/vanilla)
- **Vite** - Build tool (fast, modern, HTTPS-enabled)
- **TypeScript** - Type safety
- **ESLint** - Code quality

## What's NOT Included

This is a **minimal base** - intentionally unopinionated about:

- ❌ Routing (add React Router, TanStack Router, etc.)
- ❌ State management (add Redux, Zustand, Jotai, etc.)
- ❌ UI patterns/layouts (build your own)
- ❌ Complex business logic (start clean)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server (HTTPS on port 5173)
pnpm dev

# Set up authentication (one-time)
pnpm playwright:auth
```

Visit `https://localhost:5173` and sign in with your Adobe credentials.

## Project Structure

```
├── src/
│   ├── main.tsx              # App entry point
│   ├── App.tsx               # Minimal app shell with IMS + Spectrum
│   ├── utils/
│   │   ├── IMS.ts           # Framework-agnostic IMS singleton
│   │   └── IMSConstants.ts  # IMS configuration
│   └── contexts/
│       ├── IMSContext.ts    # React context for IMS
│       ├── IMSProvider.tsx  # React provider component
│       └── useIMS.ts        # React hook for IMS access
├── .auth/                    # Playwright auth state (gitignored)
├── playwright.auth.setup.ts  # Auth setup script
└── vite.config.ts           # Vite config with HTTPS
```

## Adobe Essentials Checklist

When customizing this template, **keep these intact**:

- ✅ IMS authentication setup (`src/utils/IMS.ts`)
- ✅ Spectrum S2 Provider wrapping your app
- ✅ `@adtech/protopack-services-all` package
- ✅ HTTPS dev server configuration
- ✅ Playwright auth scripts

## Using Adobe Services

The template includes `@adtech/protopack-services-all` with 20+ Adobe APIs:

```tsx
import { apis } from '@adtech/protopack-services-all';
import { useIMS } from './contexts/useIMS';

function MyComponent() {
  const ims = useIMS();

  const handleGenerate = async () => {
    const result = await apis.firefly.generate({
      prompt: "a mountain landscape",
      token: ims.token,        // IMS token
      apiKey: ims.apiKey       // x-api-key
    });
    console.log(result);
  };

  return <Button onPress={handleGenerate}>Generate</Button>;
}
```

**Available services:**
- `firefly` - Image generation, upscaling, generative fill
- `ps` - Photoshop API
- `lightroom` - Lightroom API
- `digitalImaging` - Image processing
- `adobe3p` - Third-party integrations
- ...and more (explore the package for full list)

## Authentication

### IMS Setup

Authentication is handled by the `IMS` singleton in `src/utils/IMS.ts`. This is **framework-agnostic** - use it directly in any framework:

```ts
import { IMS } from './utils/IMS';

// Wait for IMS to be ready
await IMS.ready;

// Get token for API calls
const token = IMS.token;
const apiKey = IMS.apiKey;

// Check auth status
if (IMS.isAuthenticated) {
  // User is logged in
}

// Sign in/out
IMS.signIn();
IMS.logout();
```

### React Integration

For React, use the `useIMS()` hook:

```tsx
import { useIMS } from './contexts/useIMS';

function MyComponent() {
  const ims = useIMS();

  return (
    <>
      {ims.isAuthenticated ? (
        <p>Signed in as: {ims.profileData?.email}</p>
      ) : (
        <Button onPress={() => ims.signIn()}>Sign In</Button>
      )}
    </>
  );
}
```

### Playwright Authentication

For testing and browser automation, set up auth state once:

```bash
# Start dev server first
pnpm dev

# In another terminal, set up auth
pnpm playwright:auth
```

This saves authentication state to `.auth/playwright-state.json`. Tests and `playwright-cli` will automatically use this state.

**Using playwright-cli:**

```bash
# Load auth state
playwright-cli state-load .auth/playwright-state.json

# Open authenticated browser
playwright-cli open https://localhost:5173
```

See AGENTS.md for full Playwright integration details.

## Using Spectrum Components

**CRITICAL:** Always use Spectrum S2 components for interactive UI. Never use plain HTML elements for interactive components.

```tsx
import { Provider, Button, TextField, Text, Heading } from '@react-spectrum/s2';

function App() {
  return (
    <Provider>  {/* Required wrapper */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Heading>Hello World</Heading>
        <Text>Welcome to the app</Text>
        <TextField label="Name" />
        <Button variant="primary">Submit</Button>
      </div>
    </Provider>
  );
}
```

**Required component mapping:**

| Don't Use | Use Instead |
|-----------|-------------|
| `<button>` | `<Button>` from `@react-spectrum/s2` |
| `<input>` | `<TextField>` from `@react-spectrum/s2` |
| `<select>` | `<Picker>` from `@react-spectrum/s2` |
| `<h1>`, `<h2>`, etc. | `<Heading>` from `@react-spectrum/s2` |
| `<p>`, text content | `<Text>` from `@react-spectrum/s2` |

**Layout:** Spectrum S2 doesn't include layout components (`Flex`, `Grid`, `View`). Use plain HTML `<div>` with CSS or inline styles for layout.

**Exceptions:** Use plain HTML for semantic elements (`<main>`, `<article>`, `<section>`), layout containers (`<div>`), and SVG graphics.

## Adapting to Other Frameworks

### Vue 3

1. Replace React with Vue:
```bash
pnpm remove react react-dom @types/react @types/react-dom
pnpm add vue @vitejs/plugin-vue
```

2. Create IMS composable:
```ts
// composables/useIMS.ts
import { reactive } from 'vue';
import { IMS } from '../utils/IMS';

export function useIMS() {
  return reactive(IMS);
}
```

3. Use Spectrum Web Components instead of React Spectrum

### Svelte

1. Replace React with Svelte:
```bash
pnpm remove react react-dom @types/react @types/react-dom
pnpm add svelte @sveltejs/vite-plugin-svelte
```

2. Create IMS store:
```ts
// stores/ims.ts
import { writable } from 'svelte/store';
import { IMS } from '../utils/IMS';

export const ims = writable(IMS);
```

3. Use Spectrum Web Components

### Vanilla JavaScript

The IMS singleton works directly without any framework:

```js
import { IMS } from './utils/IMS';

// Wait for ready
await IMS.ready;

// Use directly
document.getElementById('login-btn').onclick = () => IMS.signIn();
document.getElementById('logout-btn').onclick = () => IMS.logout();

// Update UI when token changes
setInterval(() => {
  if (IMS.isAuthenticated) {
    document.getElementById('status').textContent =
      `Logged in as ${IMS.profileData?.email}`;
  }
}, 1000);
```

## Copy Prompt: Converting to React + Vite Project

If you're using this template and want to explicitly convert it to React + Vite with full Spectrum S2 integration, use this prompt with your AI coding assistant:

```
Convert this base template to a full React + Vite project with Spectrum S2:

1. SPECTRUM COMPONENTS: Ensure ALL interactive UI uses Spectrum S2 components from @react-spectrum/s2:
   - Never use plain HTML for interactive elements: <button>, <input>, <select>, <textarea>
   - Always use Spectrum components: <Button>, <TextField>, <Picker>, <TextArea>, <Heading>, <Text>
   - IMPORTANT: Spectrum S2 does NOT include layout components (Flex/Grid/View)
   - Use plain <div> with CSS/inline styles for layouts
   - Wrap entire app in <Provider> from @react-spectrum/s2

2. REACT PATTERNS:
   - Use React hooks (useState, useEffect, etc.)
   - Use useIMS() hook for authentication (already provided)
   - Create components in src/components/
   - Add routing if needed (React Router recommended)
   - Use React Spectrum S2 for styling

3. KEEP ADOBE ESSENTIALS:
   - Don't modify src/utils/IMS.ts or IMSConstants.ts
   - Don't modify authentication setup
   - Keep @adtech/protopack-services-all integration
   - Maintain HTTPS dev server config

4. VITE OPTIMIZATIONS:
   - Enable CSS modules if needed
   - Add any Vite plugins for your use case
   - Keep lightningcss for fast CSS processing

The app should be production-ready with Adobe IMS auth, Spectrum design system, and access to Adobe services.
```

## Customization Guide

### Adding Routing

```bash
# React Router
pnpm add react-router-dom

# TanStack Router
pnpm add @tanstack/react-router
```

### Adding State Management

```bash
# Zustand (recommended for simplicity)
pnpm add zustand

# Redux Toolkit
pnpm add @reduxjs/toolkit react-redux

# Jotai
pnpm add jotai
```

### Adding UI Components

Keep using Spectrum for Adobe-consistent UI. For custom components, build on top of Spectrum primitives.

### Changing Build Tool

While Vite is recommended, you can adapt to:
- **Webpack** - Replace Vite config with webpack.config.js
- **Parcel** - Minimal config needed
- **esbuild** - Fast builds, less features

**Keep HTTPS enabled** - required for IMS authentication.

## Deployment

This template is configured for Adobe's "Awesome" internal hosting:

1. Push to your deployment branch (usually `main`)
2. CI/CD automatically deploys to `https://your-project.awesome.adobe.net`

**Build command:** `pnpm build`
**Output directory:** `dist/`

## Scripts

```bash
pnpm dev              # Start dev server (HTTPS, port 5173)
pnpm build           # Production build
pnpm lint            # TypeScript + ESLint checks
pnpm preview         # Preview production build
pnpm duplicate       # Duplicate template to new directory for testing
pnpm playwright:auth # Set up Playwright authentication
pnpm playwright:test # Run Playwright tests
pnpm playwright:clean # Clear auth state
```

## AI Coding Platform Support

This template works with Claude Code, Cursor, and Codex:

**File Discovery:**
- **Claude Code**: Reads `CLAUDE.md` (symlink → `AGENTS.md`) + loads `.claude/rules/*.mdc` files
- **Cursor**: Loads `.cursor/rules/*.mdc` files directly (especially `setup-check.mdc`)
- **Codex**: Reads `AGENTS.md` only, does NOT automatically load `.mdc` files

**Setup Interview:**
The setup interview is triggered by `SETUP.md` presence and works across all platforms:
- **Claude Code/Codex**: Read setup instructions from `AGENTS.md` (which references `setup-check.mdc`)
- **Cursor**: Load setup instructions directly from `.cursor/rules/setup-check.mdc`

This multi-platform approach ensures the template works consistently across different AI coding assistants.

## Resources

- [Spectrum S2 Documentation](https://react-spectrum.adobe.com/react-spectrum/)
- [Adobe Services Package](https://github.com/Adobe-DesignTechnology/protopack-services) (internal)
- [IMS Library](https://git.corp.adobe.com/pages/IMS/imslib2.js/) (internal)
- [Protopack Documentation](https://wiki.corp.adobe.com/spaces/AdobeDesign/pages/3650101698/AD+AI+Prototyping+Quick+Start) (internal)

## Support

For questions and support, join the [#adp-protopack](https://adobe.enterprise.slack.com/archives/C08QHHYC5SR) Slack channel.

## License

Internal Adobe use only.
