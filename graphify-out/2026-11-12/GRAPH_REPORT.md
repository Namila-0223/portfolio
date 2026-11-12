# Graph Report - portfolio  (2026-11-11)

## Corpus Check
- 37 files · ~649,471 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 48 nodes · 61 edges · 8 communities (6 shown, 2 thin omitted)
- Extraction: 95% EXTRACTED · 5% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.5)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b7c40649`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useMotionPreference
- Portfolio canvas
- page.jsx
- CanvasPortfolio.jsx
- CanvasGraphics.jsx
- layout.jsx
- next.config.js

## God Nodes (most connected - your core abstractions)
1. `useMotionPreference()` - 8 edges
2. `Portfolio canvas` - 7 edges
3. `CanvasPortfolio()` - 4 edges
4. `WorkGallery()` - 3 edges
5. `SiteChrome()` - 2 edges
6. `CanvasCursor()` - 2 edges
7. `HeroGraphic()` - 2 edges
8. `CraftWidget()` - 2 edges
9. `ContactGraphic()` - 2 edges
10. `CraftMark()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `CanvasPortfolio()` --calls--> `useMotionPreference()`  [EXTRACTED]
  src/components/canvas-portfolio/CanvasPortfolio.jsx → src/components/canvas-portfolio/useMotionPreference.js
- `WorkGallery()` --calls--> `useMotionPreference()`  [EXTRACTED]
  src/components/canvas-portfolio/WorkGallery.jsx → src/components/canvas-portfolio/useMotionPreference.js

## Import Cycles
- None detected.

## Communities (8 total, 2 thin omitted)

### Community 0 - "useMotionPreference"
Cohesion: 0.27
Nodes (8): serverSnapshot(), snapshot(), subscribe(), useMotionPreference(), decisions, projectLayout, sceneSize, WorkGallery()

### Community 1 - "Portfolio canvas"
Cohesion: 0.25
Nodes (7): Content status, Current preview, Decisions recovered from the conversation, Frame scale and project composition, Interaction upgrade — November 10, 2026, Portfolio canvas, Visual and motion system — November 11, 2026

### Community 2 - "page.jsx"
Cohesion: 0.29
Nodes (5): body, display, metadata, CanvasPortfolio(), smooth()

### Community 3 - "CanvasPortfolio.jsx"
Cohesion: 0.33
Nodes (4): CanvasCursor(), demoProjects, labels, positions

### Community 4 - "CanvasGraphics.jsx"
Cohesion: 0.33
Nodes (5): ContactGraphic(), CopyEmail(), CraftMark(), CraftWidget(), HeroGraphic()

## Knowledge Gaps
- **17 isolated node(s):** `Current preview`, `Interaction upgrade — November 10, 2026`, `Frame scale and project composition`, `Visual and motion system — November 11, 2026`, `Decisions recovered from the conversation` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `useMotionPreference()` connect `useMotionPreference` to `page.jsx`, `CanvasPortfolio.jsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `CanvasPortfolio()` connect `page.jsx` to `useMotionPreference`, `CanvasPortfolio.jsx`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useMotionPreference()` (e.g. with `serverSnapshot()` and `snapshot()`) actually correct?**
  _`useMotionPreference()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Current preview`, `Interaction upgrade — November 10, 2026`, `Frame scale and project composition` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._