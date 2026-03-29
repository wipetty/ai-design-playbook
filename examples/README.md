# Reference Examples

These examples show common patterns for the setup agent to adapt based on user choices.

## Files

### Lit + Spectrum Web Components

- **lit-app-root.ts** - Lit component with Spectrum Web Components and IMS integration
  - Uses `@customElement` decorator for component registration
  - Integrates with IMS singleton for authentication
  - Shows Spectrum Web Components theme setup
  - Example: `<sp-button>`, `<sp-theme>`

- **lit-main.ts** - Lit entry point
  - Simple import pattern for web components
  - Self-registering components via decorators

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
