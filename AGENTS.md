# PPK Template Starter

React + Vite prototype template with Adobe services. See CLAUDE.md for full documentation.

## Commands

- `pnpm dev` - Start dev server (HTTPS)
- `pnpm build` - Production build
- `pnpm lint` - TypeScript + ESLint
- `pnpm playwright:auth` - Set up Adobe IMS authentication for testing

## Architecture

- **Client-only application** - No backend/server code; hosted on Awesome Hosting
- Entry: src/main.tsx → src/App.tsx
- Auth: Framework-agnostic IMS singleton (src/utils/IMS.ts), React hook via `useIMS()`
- UI: **Adobe React Spectrum S2** (mandatory for all interactive components)

## UI Components (CRITICAL)

**⛔ Use Adobe React Spectrum S2 for ALL interactive UI:**

- Import from `@react-spectrum/s2`: `Button`, `TextField`, `Picker`, `TextArea`, `Heading`, `Text`
- **NEVER use plain HTML** for `<button>`, `<input>`, `<select>`, `<textarea>`
- Use plain `<div>` for layouts (Spectrum S2 doesn't include layout components)
- Wrap app in `<Provider>` from `@react-spectrum/s2`

## Adobe Services (IMPORTANT)

**Always explore `@adtech/protopack-services-all` first for Adobe API requests.**

Available: `firefly`, `ps`, `lightroom`, `digitalImaging`, `adobe3p`, and more (inspect package for full list)

Usage:

```typescript
import { apis } from '@adtech/protopack-services-all';
import { useIMS } from './contexts/useIMS';

function MyComponent() {
  const ims = useIMS();

  const handleGenerate = async () => {
    const result = await apis.firefly.generate({
      prompt: "a mountain landscape",
      token: ims.token,        // Bearer token
      apiKey: ims.apiKey       // x-api-key
    });
  };
}
```

If a service doesn't exist in @adtech packages, check the Services MCP server.

## Authentication

**Get credentials from IMS singleton:**

```typescript
import { useIMS } from './contexts/useIMS';

const ims = useIMS();
const token = ims.token;        // Bearer token
const apiKey = ims.apiKey;      // x-api-key

// Check auth status
if (ims.isAuthenticated) {
  // User is logged in
}

// Sign in/out
ims.signIn();
ims.logout();
```

**Framework-agnostic usage:**

```typescript
import { IMS } from './utils/IMS';

await IMS.ready;
const token = IMS.token;
const apiKey = IMS.apiKey;
```

**NEVER use separate API key environment variables.**

## Key Rules

- Spectrum S2 components mandatory for interactive UI
- Get all credentials from IMS (never env vars)
- Use sentence case for all text (not Title Case)
- HTTPS required for IMS (Vite configured)
- See CLAUDE.md for complete guidelines
