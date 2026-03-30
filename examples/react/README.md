# React Example - Protopack Template

This is a complete, standalone React + React Spectrum S2 example project.

## Features

- ✅ React 19 with TypeScript
- ✅ React Spectrum S2 (Adobe design system for React)
- ✅ Adobe IMS authentication with React Context
- ✅ Vite build system with HTTPS (required for IMS)
- ✅ ESLint + TypeScript checking
- ✅ Adobe services integration via @adtech/protopack-services-all

## Running This Example

This example can run standalone:

```bash
cd examples/react
pnpm install
pnpm dev
```

The dev server will start at `https://localhost:5173` (or the next available port).

## Project Structure

```
examples/react/
├── src/
│   ├── main.tsx              # Entry point
│   ├── App.tsx               # Root component
│   ├── index.css             # Global styles
│   ├── contexts/             # React Context for IMS
│   │   ├── IMSContext.ts
│   │   ├── IMSProvider.tsx
│   │   └── useIMS.ts
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

### React Spectrum S2

This example uses `@react-spectrum/s2` for UI components. React Spectrum S2 is Adobe's React component library that follows the Spectrum design system.

**Important:** React Spectrum S2 requires:
- `unplugin-parcel-macros` for CSS processing
- Special Vite configuration for CSS bundling (see `vite.config.ts`)

### IMS Authentication

Authentication is handled through:
1. **IMS Singleton** (`src/utils/IMS.ts`) - Framework-agnostic authentication logic
2. **React Context** (`src/contexts/`) - Provides IMS to React components via Context API
3. **useIMS Hook** - Access IMS in components

**Usage in components:**
```tsx
import { useIMS } from './contexts/useIMS';

function MyComponent() {
  const ims = useIMS();

  return (
    <div>
      {ims.isAuthenticated ? (
        <p>Token: {ims.token}</p>
      ) : (
        <button onClick={() => ims.signIn()}>Sign In</button>
      )}
    </div>
  );
}
```

## Using in the Main Template

When a user selects React during the setup interview, these files are copied to the project root:

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

## Notes

- HTTPS is required for Adobe IMS authentication
- The IMS configuration in `IMSConstants.ts` is set to staging environment (`stg1`)
- React Spectrum S2 components automatically handle accessibility and keyboard navigation
