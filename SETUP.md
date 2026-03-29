# Protopack Template Setup

Welcome! This template needs to be configured for your use case.

## Setup Interview

When you see this file, Claude/Cursor will automatically start a conversational interview to configure this template for you. The process takes about 5 minutes.

### What the interview covers

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
   - Update CLAUDE.md with configuration details
   - Delete this SETUP.md file

## Reference Examples

The `examples/` folder contains reference implementations that the AI agent will adapt based on your choices:

- **Lit + Spectrum Web Components** - See `examples/lit-app-root.ts` and `examples/lit-main.ts`
- **React + Routing** - See `examples/react-with-router.tsx`
- **State Management** - See `examples/zustand-store.ts` for Zustand pattern

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
