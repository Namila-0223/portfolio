# Graph Report - portfolio  (2026-11-12)

## Corpus Check
- 38 files · ~650,526 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 53 nodes · 54 edges · 9 communities (7 shown, 2 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `746192ae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useMotionPreference
- Portfolio canvas
- page.jsx
- CanvasPortfolio.jsx
- layout.jsx
- next.config.js

## God Nodes (most connected - your core abstractions)
1. `Portfolio canvas` - 8 edges
2. `useMotionPreference()` - 6 edges
3. `CanvasPortfolio()` - 3 edges
4. `smooth()` - 2 edges
5. `CollageHero()` - 2 edges
6. `SiteChrome()` - 2 edges
7. `WorkGallery()` - 2 edges
8. `subscribe()` - 2 edges
9. `snapshot()` - 2 edges
10. `serverSnapshot()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `WorkGallery()` --calls--> `useMotionPreference()`  [EXTRACTED]
  src/components/canvas-portfolio/WorkGallery.jsx → src/components/canvas-portfolio/useMotionPreference.js

## Import Cycles
- None detected.

## Communities (9 total, 2 thin omitted)

### Community 0 - "useMotionPreference"
Cohesion: 0.27
Nodes (8): serverSnapshot(), snapshot(), subscribe(), useMotionPreference(), decisions, projectLayout, sceneSize, WorkGallery()

### Community 1 - "Portfolio canvas"
Cohesion: 0.22
Nodes (8): Collage hero iteration, Content status, Current preview, Decisions recovered from the conversation, Frame scale and project composition, Interaction upgrade — November 10, 2026, Portfolio canvas, Visual and motion system — November 11, 2026

### Community 2 - "page.jsx"
Cohesion: 0.33
Nodes (4): body, brush, display, metadata

### Community 3 - "CanvasPortfolio.jsx"
Cohesion: 0.24
Nodes (6): CanvasPortfolio(), demoProjects, labels, positions, smooth(), CollageHero()

## Knowledge Gaps
- **19 isolated node(s):** `Current preview`, `Interaction upgrade — November 10, 2026`, `Frame scale and project composition`, `Visual and motion system — November 11, 2026`, `Decisions recovered from the conversation` (+14 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `CanvasPortfolio()` connect `CanvasPortfolio.jsx` to `page.jsx`?**
  _High betweenness centrality (0.002) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useMotionPreference()` (e.g. with `serverSnapshot()` and `snapshot()`) actually correct?**
  _`useMotionPreference()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Current preview`, `Interaction upgrade — November 10, 2026`, `Frame scale and project composition` to the rest of the system?**
  _19 weakly-connected nodes found - possible documentation gaps or missing edges._