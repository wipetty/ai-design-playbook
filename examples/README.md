# Reference Examples

These examples show common patterns for the setup agent to adapt based on user choices.

## Lit Framework Setup

When switching to Lit, you must:

1. **Update tsconfig.app.json** - Copy from `examples/lit-tsconfig.app.json`
   - Set `target: "ES2022"` (not ES2020)
   - Set `useDefineForClassFields: false` (critical for decorators)
   - Remove `jsx` configuration

2. **Update eslint.config.js** - Copy from `examples/lit-eslint.config.js`
   - Remove React plugins (`eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`)
   - Remove React-specific rules

3. **Use accessor syntax** - All `@state()` decorators need `accessor`:
   ```typescript
   @state()
   private accessor myProperty = initialValue;
   ```

4. **Lifecycle methods**:
   - `connectedCallback()` - Initial setup, component mounting
   - `updated(changedProperties)` - React to state/prop changes
   - Use `updated()` for auth-dependent initialization (not `connectedCallback()`)

5. **Update vite.config.ts** - Copy from `examples/lit-vite.config.ts`
   - Remove `@vitejs/plugin-react`
   - Remove `unplugin-parcel-macros`
   - Keep HTTPS and other Vite settings

6. **Update index.html** - Copy from `examples/lit-index.html`
   - Replace `<div id="root">` with `<app-root></app-root>`

## Files

### Lit + Spectrum Web Components

- **lit-app-root.ts** - Lit component with Spectrum Web Components and IMS integration
  - Uses `@customElement` decorator for component registration
  - Uses `accessor` keyword with `@state()` decorators
  - Integrates with IMS singleton for authentication
  - Shows Spectrum Web Components theme setup
  - Demonstrates `updated()` lifecycle for auth-dependent logic
  - Example: `<sp-button>`, `<sp-theme>`

- **lit-main.ts** - Lit entry point
  - Simple import pattern for web components
  - Self-registering components via decorators

- **lit-tsconfig.app.json** - TypeScript configuration for Lit
  - Correct decorator settings
  - ES2022 target
  - No JSX configuration

- **lit-eslint.config.js** - ESLint configuration for Lit
  - No React plugins
  - TypeScript-only linting

- **lit-vite.config.ts** - Vite configuration for Lit
  - No React plugin
  - HTTPS enabled for IMS
  - Simpler than React config

- **lit-index.html** - HTML entry for Lit
  - Uses custom element `<app-root></app-root>`

### React + Routing

- **react-with-router.tsx** - React Router integration
  - Shows BrowserRouter setup with IMSProvider and Spectrum Provider
  - Navigation component with auth state
  - Route definitions pattern
  - Proper provider nesting order

### State Management

- **zustand-store.ts** - Zustand store pattern
  - TypeScript interface for store state
  - Example actions (addImage, clearImages, etc.)
  - Usage example in comments
  - Pattern for Adobe services state (generated images, UI state, preferences)

## Usage

When the setup agent detects SETUP.md, it will:
1. Interview the user about their preferences
2. Read these example files
3. Adapt them to create the appropriate starter code
4. Install necessary dependencies
5. Update configuration files

## Notes

- All examples preserve IMS authentication (framework-agnostic)
- Spectrum component examples follow accessibility guidelines
- Examples use TypeScript with strict mode
- Patterns are production-ready but minimal
