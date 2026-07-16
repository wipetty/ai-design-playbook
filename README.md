# AI Design Playbook

A field guide to AI-assisted design for designers who ship — vibe coding, prompting, and everything in between.

## Stack

- React 19 + Vite
- React Router (`HashRouter`, so deep links work on static hosting)
- Plain CSS (`src/index.css`) — dark theme, sentence case, accent orange

## Project structure

```
├── src/
│   ├── main.tsx           # App entry point
│   ├── App.tsx             # Routes
│   ├── data/playbook.ts    # Content for every part and chapter
│   ├── pages/
│   │   ├── Home.tsx          # Homepage / table of contents
│   │   └── ChapterPage.tsx   # Individual chapter view
│   ├── components/
│   │   ├── Layout.tsx        # Shared header + footer
│   │   └── SectionBlocks.tsx # Renders the typed content blocks used in playbook.ts
│   └── index.css           # Site styles
└── public/images/          # Screenshots and figures referenced from playbook.ts
```

## Commands

```bash
pnpm install
pnpm dev      # start dev server
pnpm build    # production build to dist/
pnpm lint     # TypeScript + ESLint
pnpm preview  # preview the production build
```

## Content

All chapter content lives in `src/data/playbook.ts` as a typed tree of parts → chapters → sections → content blocks. `SectionBlocks.tsx` renders each block kind (paragraph, callout, cards, figure, table, etc.).
