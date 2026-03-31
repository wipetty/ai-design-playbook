# Framework Examples

This directory contains complete, working example projects for each supported framework.

## Structure

- `react/` - Complete React + React Spectrum S2 project
- `lit/` - Complete Lit + Spectrum Web Components project

Each example is a **fully functional project** that can be run standalone:

```bash
cd examples/react  # or examples/lit
pnpm install
pnpm dev
```

The dev server will start at `https://localhost:5173` (or the next available port).

## What's Included in Examples

Each example project contains:

- ✅ Application source files (`src/`)
- ✅ Build configuration (`vite.config.ts`, `tsconfig.app.json`)
- ✅ Linting configuration (`eslint.config.js`)
- ✅ Dependencies (`package.json`)
- ✅ Entry HTML (`index.html`)
- ✅ Framework-specific README
- ✅ IMS authentication utilities (`src/utils/IMS.ts`, `src/utils/IMSConstants.ts`)

## What's NOT Included (Stays in Root)

These files are framework-agnostic and live in the project root (not duplicated in examples):

- ❌ AI agent configuration (`.agents/`, `AGENTS.md`)
- ❌ Setup files (`SETUP.md`)
- ❌ Playwright auth (`.auth/`, auth scripts, `playwright.auth.setup.ts`)
- ❌ Git configuration (`.git/`, `.gitignore`)
- ❌ Package manager files (`pnpm-lock.yaml`)

## Setup Process

When a user runs the setup interview and selects a framework:

1. **Read the chosen example's package.json** to get the dependency list
2. **Copy files from the example to root:**
   - `examples/<framework>/vite.config.ts` → `vite.config.ts`
   - `examples/<framework>/tsconfig.app.json` → `tsconfig.app.json`
   - `examples/<framework>/eslint.config.js` → `eslint.config.js`
   - `examples/<framework>/index.html` → `index.html`
   - `examples/<framework>/src/*` → `src/*` (overwrites existing files)
3. **Update root package.json** with dependencies from example's package.json
4. **Run** `pnpm install`
5. **Validate configuration:**
   - Run `pnpm run lint` - Verify TypeScript config and type checking
   - Run `pnpm run build` - Verify build succeeds
   - **If either fails, STOP** - Do NOT delete SETUP.md until fixed
6. **Update AGENTS.md** "Project Configuration" section with choices
7. **Delete** SETUP.md (only after successful validation)

## Important Notes

### React Example

- Uses `@react-spectrum/s2` for UI components
- Requires `unplugin-parcel-macros` for CSS bundling
- Uses React Context for IMS state (`IMSProvider`, `useIMS` hook)
- TypeScript: `useDefineForClassFields: true`, `jsx: "react-jsx"`

### Lit Example

- Uses `@spectrum-web-components/*` for UI components
- **Does NOT use `accessor` keyword** with decorators (build tools don't support it)
- Imports IMS singleton directly (no Context needed)
- TypeScript: `useDefineForClassFields: false` (**critical for decorators**)
- No JSX configuration needed

## Testing Examples Standalone

Both examples can be tested independently:

**React:**
```bash
cd examples/react
pnpm install
pnpm dev
# Visit https://localhost:5173
pnpm build  # Should build without errors
```

**Lit:**
```bash
cd examples/lit
pnpm install
pnpm dev
# Visit https://localhost:5173
pnpm build  # Should build without errors
```

## Key Differences

| Aspect | React | Lit |
|--------|-------|-----|
| **UI Library** | React Spectrum S2 | Spectrum Web Components |
| **IMS Access** | Context + useIMS hook | Direct singleton import |
| **State** | useState, useReducer | @state() decorator |
| **Templates** | JSX | Tagged template literals |
| **File Extension** | `.tsx`, `.ts` | `.ts` only |
| **Build Complexity** | More (macros, CSS bundling) | Simpler |

## Troubleshooting

### React Build Errors

If you see errors about React Spectrum S2 styles:
- Ensure `unplugin-parcel-macros` is installed
- Check that `macros.vite()` is first in the Vite plugins array

### Lit Decorator Errors

If you see errors about decorators:
- Check `useDefineForClassFields: false` in tsconfig.app.json
- Ensure you're NOT using `accessor` keyword with decorators
- Verify `experimentalDecorators: true` if using legacy decorators

### IMS Authentication

If IMS authentication doesn't work:
- Ensure the dev server is running with HTTPS
- Check browser console for IMS errors
- Verify `IMSConstants.ts` has the correct client ID and environment

## Architecture Notes

Both examples use the same **IMS singleton pattern** (`src/utils/IMS.ts`) for authentication. This singleton is framework-agnostic and works the same way in both React and Lit:

- **React**: Wraps singleton in Context for React-style consumption
- **Lit**: Imports singleton directly and uses `@state()` for reactivity

This pattern makes it easy to migrate between frameworks since the core authentication logic is shared.
