# Protopack Template Setup

Welcome! This template needs to be configured for your use case.

## Quick Setup (Recommended)

For the fastest setup, just run:

```bash
./scripts/setup.sh
```

This installs React with all Adobe essentials (IMS, Spectrum S2, Services SDK). You can add routing, state management, and other features later as needed.

**Want Lit instead?** Run `./scripts/setup.sh lit`

---

## Custom Setup (AI Interview)

When you see this file, Claude/Cursor will automatically start a conversational interview to configure this template for you.

The AI will ask if you want to use recommended defaults:
- **Yes** - Quick start with React (add routing, state, services later as needed)
- **No** - Custom interview (~5 minutes) to choose framework (React/Lit), routing, state management, and Adobe services

### What the custom interview covers (if you choose "No")

1. **Determine intent**
   - Are you creating a reusable template or building a specific project?

2. **Framework choice**
   - React (default) → Uses @react-spectrum/s2 (React components)
   - Lit → Uses @spectrum-web-components/* (Web Components)

3. **For PROJECTS only:**
   - Project name and description
   - Routing needs (React Router, TanStack Router, none)
   - State management (Zustand, Redux, Jotai, React state only)
   - Which Adobe services you'll use (Firefly, Photoshop, Lightroom, etc.)
   - Any other requirements

4. **Installation & finalization**
   - Install chosen dependencies
   - Create starter files based on your choices
   - Validate configuration (lint + build)
   - Update AGENTS.md with configuration details
   - Delete this SETUP.md file

## Reference Examples

The `examples/` folder contains complete example projects that the AI agent will use based on your framework choice:

- **React Example** - `examples/react/` - Complete React + React Spectrum S2 project
  - Full project structure with all configuration files
  - React Context pattern for IMS authentication
  - Can be tested standalone: `cd examples/react && pnpm install && pnpm dev`

- **Lit Example** - `examples/lit/` - Complete Lit + Spectrum Web Components project
  - Full project structure with all configuration files
  - Direct IMS singleton access (no Context needed)
  - Can be tested standalone: `cd examples/lit && pnpm install && pnpm dev`

See `examples/README.md` for detailed documentation of the example structure.

## What's Already Configured

This template already includes:
- ✅ Adobe IMS authentication (framework-agnostic)
- ✅ HTTPS dev server (required for IMS)
- ✅ Adobe Services SDK (@adtech/protopack-services-all)
- ✅ TypeScript with strict mode
- ✅ ESLint + Prettier
- ✅ Playwright for E2E testing

The setup interview will build on top of these essentials.

## Getting Started

Simply open a Claude Code or Cursor session in this project. The interview will start automatically when this file is detected.

**Ready?** The AI agent will begin the interview now.
