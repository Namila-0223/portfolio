# Namila Preshan — Portfolio

A personal portfolio for a UI/UX Engineer, built as a single scroll-driven canvas. Six fixed frames share one world: the camera pulls back, glides, and settles as you scroll, with a page-view fallback for small screens and reduced-motion preferences.

## Tech stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18
- **Motion:** Framer Motion
- **Styling:** CSS Modules, with Tailwind used only for its base reset
- **Type:** Syne (display), Space Grotesk (body), Kaushan Script (brush lettering), served locally through `next/font/local`
- **Icons:** lucide-react

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # ESLint (next/core-web-vitals)
npm run format   # Prettier for JS, JSX, JSON, and Markdown
```

## Project structure

```text
src/
├─ app/
│  ├─ layout.jsx                 Root shell: fonts, metadata, global stylesheet
│  └─ page.jsx                   Homepage (server component)
├─ features/
│  └─ canvas-portfolio/
│     ├─ CanvasPortfolio.jsx     Scroll/camera controller and six sections
│     ├─ CollageHero.jsx         Intro frame
│     ├─ WorkGallery.jsx         Draggable project board and dialog
│     ├─ CanvasGraphics.jsx      SVG artwork and interactive demos
│     ├─ CanvasCursor.jsx        Custom desktop cursor
│     ├─ hooks/                  useMotionPreference
│     └─ styles/                 Component-scoped CSS Modules
├─ assets/fonts/                 Local font files and OFL licenses
└─ styles/globals.css            Reset, page background, selection, scrollbar
```

Public assets are limited to the favicon and the portrait used by the intro frame (`public/images/namila1.png`).

## Design and behavior notes

- Section order: Intro → Selected Work → About → Capabilities → Experience → Contact.
- Scroll controls a shared camera; direct navigation and Page view preserve the selected section.
- Narrow screens, short viewports, and reduced motion use a stacked page instead of the canvas.
- Selected Work is an illustrative project board, clearly labeled as concept work rather than client work.
- A pause/play control stops decorative motion, and OS reduced-motion changes are observed live.

See [`docs/PORTFOLIO_CANVAS.md`](docs/PORTFOLIO_CANVAS.md) for the design history, interaction decisions, and iteration notes.

## Branch scope

This branch is the canvas portfolio only. The earlier Tailwind site (`/about`, `/contact`, `/blog`, `/works`, `/works/[id]`), the Three.js project carousel, the case-study data, and the old `portfolio-canvas` prototype were removed. They remain available in the repository history and on `main`.
