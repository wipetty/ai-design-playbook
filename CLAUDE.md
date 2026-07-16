# AI Design Playbook

A static React + Vite site presenting a field guide to AI-assisted design. See README.md for stack and structure.

## Key facts

- Content for all parts/chapters lives in `src/data/playbook.ts` as a typed tree; `src/components/SectionBlocks.tsx` renders each content block kind (paragraph, callout, cards, figure, table, stats, etc.).
- Routing is `HashRouter` (see `src/App.tsx`) so deep links work under static hosting without server-side rewrites.
- Text style: sentence case throughout, not Title Case.
- No backend, no auth, no external services — this is a content site.

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — TypeScript + ESLint
