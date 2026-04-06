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

When a user runs setup (via script or AI interview):

1. **Choose framework:** React (default/quick) or Lit (custom interview)
2. **Run script:** `./scripts/setup.sh [react|lit]`
3. **Script copies files** from `examples/<framework>/` to root using rsync
   - Copies all files including: vite.config.ts, tsconfig.app.json, eslint.config.js, index.html, src/*, package.json
   - Preserves root-only files: .git/, .gitignore, pnpm-lock.yaml, .auth/, .worktrees/
4. **Script updates CLAUDE.md** with chosen framework using sed
5. **Script runs** `pnpm install`
6. **Script validates:**
   - Run `pnpm run lint` - Verify TypeScript config and type checking
   - Run `pnpm run build` - Verify build succeeds
7. **On success:** Delete SETUP.md
8. **On failure:** Keep SETUP.md, show error, user can fix and retry

**Key difference:** All file operations are deterministic and handled by the shell script, eliminating potential AI errors in copying/merging files.

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
