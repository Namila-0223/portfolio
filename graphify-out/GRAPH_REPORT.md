# Graph Report - portfolio  (2026-11-09)

## Corpus Check
- 25 files · ~645,594 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 83 nodes · 87 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c52c7782`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- package.json
- page.jsx
- page.jsx
- page.jsx
- layout.jsx
- scripts
- next.config.js

## God Nodes (most connected - your core abstractions)
1. `scripts` - 6 edges
2. `buildScene()` - 6 edges
3. `PROJECTS` - 5 edges
4. `About()` - 4 edges
5. `PageTransition()` - 3 edges
6. `cn()` - 3 edges
7. `renderIcon()` - 2 edges
8. `renderStackIcon()` - 2 edges
9. `renderSkillIcon()` - 2 edges
10. `Footer()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `ProjectDetails()` --references--> `PROJECTS`  [EXTRACTED]
  src/app/works/[id]/page.jsx → src/data/projects.js
- `buildScene()` --references--> `PROJECTS`  [EXTRACTED]
  src/app/works/page.jsx → src/data/projects.js
- `PageTransition()` --calls--> `cn()`  [EXTRACTED]
  src/components/PageTransition.jsx → src/utils/cn.js

## Import Cycles
- None detected.

## Communities (15 total, 2 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.13
Nodes (15): dependencies, class-variance-authority, clsx, framer-motion, gsap, lucide-react, next, @radix-ui/react-slot (+7 more)

### Community 1 - "package.json"
Cohesion: 0.18
Nodes (10): devDependencies, autoprefixer, postcss, tailwindcss, @types/react, @types/react-dom, name, private (+2 more)

### Community 3 - "page.jsx"
Cohesion: 0.38
Nodes (7): ProjectDetails(), buildScene(), createTextTexture(), GHOSTS, ROWS, Works(), PROJECTS

### Community 4 - "page.jsx"
Cohesion: 0.48
Nodes (5): About(), renderIcon(), renderSkillIcon(), renderStackIcon(), Timeline()

### Community 6 - "layout.jsx"
Cohesion: 0.27
Nodes (5): metadata, Footer(), Header(), PageTransition(), cn()

### Community 7 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build, dev, lint, preview, start

## Knowledge Gaps
- **31 isolated node(s):** `ABOUT_ICONS`, `nextConfig`, `name`, `private`, `version` (+26 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.099) - this node is a cross-community bridge._
- **Why does `scripts` connect `scripts` to `package.json`?**
  _High betweenness centrality (0.042) - this node is a cross-community bridge._
- **What connects `ABOUT_ICONS`, `nextConfig`, `name` to the rest of the system?**
  _31 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._