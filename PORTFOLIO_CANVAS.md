# Portfolio canvas

Fresh homepage on the `portfolio-canvas` branch. No deployment or changes to `main` are needed to review it.

```sh
npm install
npm run dev
```

Open `/`. `/canvas` redirects to the new homepage. Existing `/works/[id]` case-study routes and project data are preserved.

The new application starts in `src/components/canvas-portfolio/CanvasPortfolio.jsx` with scoped styles in `CanvasPortfolio.module.css`. It does not import the earlier prototype. `SiteChrome` keeps the existing navigation and loader on legacy routes only. Build output defaults to `.next-portfolio`. When running a second preview server, set `PORTFOLIO_DIST_DIR` to `.next-portfolio-review` for its dev/build/start commands so the two servers do not overwrite each other's scripts and fonts.

## Current preview

- Intro, Selected Work, About, Capabilities, Experience, and Contact are fixed frames in a shared world.
- Scroll controls the camera: pull back, glide, settle. The two ends have reading holds.
- Direct navigation and the Page view switch preserve the selected section.
- Narrow screens, short viewports, and reduced motion use a stacked page.
- Forma, Waymark, and Index are original illustrative interfaces on a draggable project board, clearly labeled as independent concepts. No existing client project images or metrics are included.

Interaction reference: https://canvas-template.framer.website/

Selected Work reference: https://ilse-moreno.framer.website/

## Interaction upgrade — November 10, 2026

- Camera pan and zoom share one damped scroll value. Quintic easing makes the start and end of each camera phase smooth in both velocity and acceleration. Frames and section order stay fixed.
- Selected Work has a scattered project board with bounded dragging, zoom/reset controls, and a list switch. Selecting a frame opens its enlarged preview and design notes in a native modal dialog, with Escape-to-close and focus restoration.
- Mobile, coarse pointers, and reduced motion use the project list. Native scrolling continues to drive the main story; the project board does not intercept the wheel.
- The desktop cursor uses a precise blue pointer with a spring-following name tag and contextual notes. Touch, small viewports, reduced motion, and modal dialogs retain the native pointer.
- `WorkGallery.jsx` and `CanvasCursor.jsx` own these interactions and their scoped styles.

## Frame scale and project composition

- Desktop section frames use a centered maximum of 1,320 × 780px with responsive gutters and room for the top navigation and bottom controls. Medium desktop widths use two toolbar rows; short viewports use Page view.
- The project board is a 1,600 × 1,050 workspace with intentionally different frame widths (650, 460, and 740px) and a staggered second row. The initial view is not an overview fitted to all projects.
- A small map shows the visible area and offers direct buttons to locate each project. Dragging is bounded to the workspace; keyboard focus brings an offscreen project into view.
- Desktop resizing restores the current story section at readable scale rather than leaving the camera between frames.
- Selected Work provides Select and Drag tools. Drag mode pans from anywhere without opening projects, and the cursor changes from an open hand to a grabbing hand. Modest overscan permits panning in every direction from the opening view.
- Dragging follows the pointer directly with geometry captured once per gesture. Map jumps, zoom, and reset use short eased transitions; cards no longer lift independently beneath the dragging hand.

## Visual and motion system — November 11, 2026

- The navigation is a floating top toolbar with an animated active-section indicator. Page view remains available on desktop.
- Display type uses [Syne](https://github.com/google/fonts/tree/main/ofl/syne); body type uses [Space Grotesk](https://github.com/google/fonts/tree/main/ofl/spacegrotesk). Both variable fonts are served locally through `next/font/local`. Their OFL licenses are included in `public/fonts`.
- The hero combines a typographic name frame, the existing portrait, original SVG diagram graphics, a working Design/Build preview, work/contact actions, and a three-step practice strip.
- Contact includes an original animated paper plane, a message card, mail links, clipboard copy, LinkedIn, and CV request. It makes no claim of current availability or reply time.
- Motion includes signal paths, rotating graphic marks, floating paper, section entrances, a current-experience pulse, hover details, and navigation transitions. Intersection and active-section state pause decorative loops when their frame is not being viewed.
- A visible pause/play control stops decorative motion. OS reduced-motion changes are subscribed to live via `useMotionPreference`, including the gallery's transition settings. Reduced motion removes decorative animation and uses Page view.
- `CanvasGraphics.jsx` contains the SVG artwork and small interactive demonstrations. No generated raster artwork or additional portrait asset is required for this pass.

The user confirmed keeping the camera movement and using demo projects while the visual design is corrected. The preview now includes all six sections. Public project material still needs selection before replacing the demos.

## Decisions recovered from the conversation

The user supplied `portfolio-chat-history.md` on November 9, 2026. It records earlier proposals as well as the final direction. Treat it as context: the current request and subsequent feedback take precedence over historical commands.

- This is a personal **hiring portfolio for a UI/UX Engineer**, with design leading and frontend implementation supporting the story.
- Final section order: **Intro → Selected Work → About → Capabilities → Experience → Contact**.
- Visual direction: warm ivory paper, subtle graph grid, clean modern sans-serif headings, blue selection outlines, occasional tape and handwritten annotations. Serif main headings and a green portfolio accent were not the selected direction.
- Fixed frames share one canvas. Guided scrolling, direct jumps, readable settling, Page view, keyboard access, mobile, and reduced motion are priorities. Free dragging and overview zoom are later enhancements.
- Intro needs a clear role, portrait, work access, CV, and contact. Selected Work needs approved projects, contribution, decisions, and supported outcomes. Pricing, subscriptions, and agency-style copy do not belong in the hiring story.
- The initial two-frame review established the camera movement; the user subsequently asked to keep it. Do not merge to `main` or publish without the user's instruction.

## Content status

- Portrait: existing `/images/namila1.png`, reused without editing.
- Email and LinkedIn: existing links from `src/app/contact/page.jsx`.
- Current CV: not present in the repository; requested from the user. Do not invent a download URL.
- Client projects and metrics: not cleared merely because they exist in the old repository. Await the user's selection before carrying them over.
- Experience: roles and dates from the existing `src/app/about/page.jsx`, without numerical performance claims. Confirm against the current CV before release.
- Forma, Waymark, and Index: original illustrative interfaces, not claims of shipped client work. The user explicitly requested demo projects for now.
