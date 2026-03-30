# Lit Example - Protopack Template

This is a complete, standalone Lit + Spectrum Web Components example project.

## Features

- ✅ Lit 3 with TypeScript
- ✅ Spectrum Web Components (Adobe design system for web components)
- ✅ Adobe IMS authentication with direct singleton access
- ✅ Vite build system with HTTPS (required for IMS)
- ✅ ESLint + TypeScript checking
- ✅ Adobe services integration via @adtech/protopack-services-all

## Running This Example

This example can run standalone:

```bash
cd examples/lit
pnpm install
pnpm dev
```

The dev server will start at `https://localhost:5173` (or the next available port).

## Project Structure

```
examples/lit/
├── src/
│   ├── main.ts               # Entry point
│   ├── app-root.ts           # Root Lit component
│   ├── index.css             # Global styles
│   └── utils/                # Framework-agnostic IMS singleton
│       ├── IMS.ts
│       └── IMSConstants.ts
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.app.json         # TypeScript configuration
├── eslint.config.js          # ESLint configuration
└── package.json              # Dependencies
```

## Key Technologies

### Lit

Lit is a lightweight library for building web components. Key features:
- **Reactive properties**: Use `@state()` decorator for internal state
- **Declarative templates**: Use tagged template literals with `html`
- **Lifecycle methods**: `connectedCallback()`, `disconnectedCallback()`, `updated()`

### Spectrum Web Components

This example uses `@spectrum-web-components/*` packages for UI components. These are web components that follow Adobe's Spectrum design system.

**Usage example:**
```typescript
import '@spectrum-web-components/button/sp-button.js';
import '@spectrum-web-components/theme/sp-theme.js';

// In your template:
html`
  <sp-theme theme="spectrum" color="light" scale="medium">
    <sp-button variant="primary">Click me</sp-button>
  </sp-theme>
`
```

### IMS Authentication

Authentication is handled through the **IMS Singleton** (`src/utils/IMS.ts`). Unlike React, Lit components access IMS directly without Context/Provider patterns.

**Usage in Lit components:**
```typescript
import { IMS } from './utils/IMS';
import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  @state()
  private authenticated = false;

  async connectedCallback() {
    super.connectedCallback();
    await IMS.ready;
    this.authenticated = IMS.isAuthenticated;
  }

  render() {
    return html`
      ${this.authenticated ? (
        html`<p>Token: ${IMS.token}</p>`
      ) : (
        html`<button @click=${() => IMS.signIn()}>Sign In</button>`
      )}
    `;
  }
}
```

## Important: Decorator Syntax

**⚠️ Do NOT use the `accessor` keyword with decorators** - it's not supported by the build tools.

✅ **Correct:**
```typescript
@state()
private authenticated = false;
```

❌ **Wrong:**
```typescript
@state()
private accessor authenticated = false;
```

## TypeScript Configuration

Lit requires specific TypeScript settings:

- `useDefineForClassFields: false` - **Critical for decorators to work**
- `target: "ES2022"` - Modern JavaScript features
- No `jsx` configuration needed (Lit doesn't use JSX)

## Using in the Main Template

When a user selects Lit during the setup interview, these files are copied to the project root:

- `vite.config.ts` → root
- `tsconfig.app.json` → root
- `eslint.config.js` → root
- `index.html` → root
- `src/*` → root src/
- Dependencies from `package.json` → merged into root package.json

The setup process will then run `pnpm install` to install all dependencies.

## Scripts

- `pnpm dev` - Start development server (HTTPS on port 5173)
- `pnpm build` - Build for production
- `pnpm lint` - Run TypeScript and ESLint checks
- `pnpm preview` - Preview production build

## Key Differences from React

| Aspect | React | Lit |
|--------|-------|-----|
| **UI Library** | React Spectrum S2 | Spectrum Web Components |
| **IMS Access** | Context + useIMS hook | Direct singleton import |
| **State** | useState, useReducer | @state() decorator |
| **Templates** | JSX | Tagged template literals |
| **Styles** | CSS-in-JS, macros | Static `css` tagged template |
| **Build** | Requires unplugin-parcel-macros | Simpler Vite config |

## Notes

- HTTPS is required for Adobe IMS authentication
- The IMS configuration in `IMSConstants.ts` is set to staging environment (`stg1`)
- Spectrum Web Components automatically handle accessibility and keyboard navigation
- Lit components are native web components and can be used with any framework
