export const PROJECTS = [
  {
    id: 0,
    title: "Fintech Hub",
    year: "2026",
    tags: ["Product Design", "React", "Fintech"],
    desc: "Fintech Hub: End-to-end design & React.js implementation for a secure transactional fintech platform at Epic Lanka.",
    color: "#071828",
    accent: "#ff4b2b",
    img: "/images/project-arjuna.png",
    detailImg: "/images/detail-fintech.png",
    textureZoom: 1.45,
    role: "Lead Product Designer",
    timeline: "3 Months (2026)",
    industry: "Fintech / Banking",
    behanceUrl: "https://www.behance.net/gallery/198765432/Fintech-Hub-Case-Study",
    overview: "Fintech Hub is a secure transactional asset management platform re-designed for Epic Lanka. It resolves user friction in legacy transactional ledgers by streamlining user flows, resulting in faster and more secure transaction tracking.",
    challengeText: "The legacy fintech platform at Epic Lanka suffered from critical navigation pain points, leading to a high transaction drop-off rate of over 45% and overloaded client support channels.",
    solutionText: "Re-architected the user flow with clean navigation, interactive ledger filters, and dense financial graphs, improving speed-to-insight and transaction success.",
    caseStudy: {
      mission: {
        num: "01",
        type: "Fintech Dashboard",
        lead: "Secure, high-fidelity asset management & transaction ledger console.",
      },
      challenge: {
        problem:
          "Legacy financial dashboards at Epic Lanka suffered from high cognitive load, complex navigation, and delayed transaction status updates, leading to user drop-offs and support ticket backlogs.",
        metrics: [
          "45s Avg. Transaction Time",
          "High user drop-off",
          "Outdated legacy UI",
        ],
      },
      userFlow: [
        { label: "AUTH GATEWAY", status: "VERIFIED" },
        { label: "ASSET OVERVIEW", status: "SECURE" },
        { label: "TRANSACT LEDGER", status: "PENDING" },
        { label: "CONFIRM ENCRYPT", status: "SUCCESS" },
      ],
      wireframes: [
        {
          name: "Auth Panel",
          desc: "Minimal authentication gate with biometric token fields.",
        },
        {
          name: "Ledger Grid",
          desc: "Density-controlled transaction logs with filter panels.",
        },
        {
          name: "Transfer Modal",
          desc: "Dual-column confirmation overlay with rate estimates.",
        },
      ],
      designSystem: {
        colors: [
          { name: "Deep Navy (Primary)", hex: "#071828" },
          { name: "Neon Orange (Accent)", hex: "#ff4b2b" },
          { name: "Active Green (Success)", hex: "#10b981" },
        ],
        fonts: ["DM Sans (Headings)", "DM Mono (Data Grid)"],
      },
      results: [
        { label: "Task Completion Speedup", val: "32%" },
        { label: "UI Components Created", val: "40+" },
        { label: "Responsive Design Grid", val: "100%" },
      ],
      features: [
        {
          title: "Smart Search Ledger",
          desc: "Instantly filter millions of records with predictive autocomplete suggestions.",
        },
        {
          title: "Real-time Live Analytics",
          desc: "Dynamic financial metrics updated in real-time with WebSockets.",
        },
        {
          title: "Two-Factor Auth Lock",
          desc: "Biometric authentication gate protecting core transaction ledgers.",
        },
      ],
      before:
        "Cluttered multi-window legacy console with delayed transaction reporting.",
      after:
        "Unified dashboard with real-time data sync and intuitive transaction flow.",
    },
  },
  {
    id: 1,
    title: "EnvMonitor",
    year: "2025",
    tags: ["Interaction UX", "Figma", "Data Vis"],
    desc: "EnvMonitor: High-fidelity interactive environmental data visualization dashboard built in Figma.",
    color: "#021a0f",
    accent: "#34d399",
    img: "/images/project-bima.png",
    detailImg: "/images/detail-envmonitor.png",
    textureZoom: 1.0,
    role: "Interaction UX Designer",
    timeline: "2 Months (2025)",
    industry: "Environmental IoT / Data Vis",
    behanceUrl: "https://www.behance.net/gallery/198765433/EnvMonitor-Case-Study",
    overview: "EnvMonitor is a environmental tracking dashboard. It replaces spreadsheet-bound raw data entries with real-time interactive geospatial maps, letting environmental analysts identify ecological anomalies and peak carbon emissions instantly.",
    challengeText: "Traditional environmental tracking interfaces displayed raw sensor data in static text tables, making it extremely difficult for operators to coordinate real-time threat responses.",
    solutionText: "Designed an interactive geospatial map dashboard with live telemetry overlays, responsive trend projection graphs, and automated threshold alerts.",
    caseStudy: {
      mission: {
        num: "02",
        type: "Environmental Tracker",
        lead: "Interactive environmental data visualization dashboard for global ecological metrics.",
      },
      challenge: {
        problem:
          "Traditional environmental tracking interfaces displayed raw data in static text tables, making it difficult for stakeholders to identify critical ecological shifts and trend patterns quickly.",
        metrics: [
          "Static raw data",
          "No geographical visual mapping",
          "High latency reporting",
        ],
      },
      userFlow: [
        { label: "SENSOR SCAN", status: "ACTIVE" },
        { label: "DATA PARSE", status: "STREAMING" },
        { label: "MAP RENDER", status: "DYNAMIC" },
        { label: "ALERT BROADCAST", status: "RESOLVED" },
      ],
      wireframes: [
        {
          name: "Sensor Map",
          desc: "Geographic map layer with interactive coordinates.",
        },
        {
          name: "Metric Graph",
          desc: "Timeline chart tracking temperature and humidity shifts.",
        },
        {
          name: "Alert Panel",
          desc: "Neon notification sidebar showing critical environmental warnings.",
        },
      ],
      designSystem: {
        colors: [
          { name: "Forest Dark (Primary)", hex: "#021a0f" },
          { name: "Mint Green (Accent)", hex: "#34d399" },
          { name: "Forest Glow (Success)", hex: "#059669" },
        ],
        fonts: ["Outfit (Headings)", "Courier Prime (Metrics)"],
      },
      results: [
        { label: "Speed-to-Insight Boost", val: "48%" },
        { label: "Map Load Latency", val: "-35%" },
        { label: "Alert Response Velocity", val: "+24%" },
      ],
      features: [
        {
          title: "Geospatial Heatmap",
          desc: "Real-time geographical temperature overlays mapping ecological threats.",
        },
        {
          title: "Trend Line Projection",
          desc: "Predictive visual charts indicating monthly carbon shifts.",
        },
        {
          title: "Custom Alert Thresholds",
          desc: "Adjustable slider thresholds to broadcast emergency sensor alerts.",
        },
      ],
      before: "Static spreadsheet text logs with delayed reporting.",
      after: "Real-time interactive maps with customizable automated alerts.",
    },
  },
  {
    id: 2,
    title: "CRM Portal",
    year: "2025",
    tags: ["Mobile App UX", "Figma", "CRM"],
    desc: "CRM Portal: Re-architected CRM user flow and document tracking portal at Epic Lanka.",
    color: "#1a0c02",
    accent: "#d4a017",
    img: "/images/project-mandala.png",
    detailImg: "/images/detail-crm.png",
    textureZoom: 1.3,
    role: "Mobile UX Architect",
    timeline: "4 Months (2025)",
    industry: "Enterprise CRM / Mobile SaaS",
    behanceUrl: "https://www.behance.net/gallery/198765434/CRM-Portal-Case-Study",
    overview: "CRM Portal is a re-engineered sales pipeline and document tracking app. Built for Epic Lanka agents, it accelerates client onboarding and contract signatures by introducing drag-and-drop mechanics.",
    challengeText: "Sales agents struggled with fragmented client dashboards and slow, paper-based approval procedures, creating bottlenecks in deal processing.",
    solutionText: "Re-built the onboarding flow as a drag-and-drop mobile deal board integrated with e-signature validations and real-time status checklists.",
    caseStudy: {
      mission: {
        num: "03",
        type: "CRM Mobile Platform",
        lead: "Streamlined customer relationship management portal and document progress tracker.",
      },
      challenge: {
        problem:
          "Sales representatives struggled with convoluted navigation paths and slow client document approvals, which delayed closing deals and hurt pipeline throughput.",
        metrics: [
          "Convoluted navigation paths",
          "Slow paper-bound approvals",
          "Manual file tracking",
        ],
      },
      userFlow: [
        { label: "LEAD INGRESS", status: "INBOUND" },
        { label: "PROFILE LOCK", status: "COMPLETE" },
        { label: "DEAL PIPELINE", status: "NEGOTIATE" },
        { label: "CLOSE CONTRACT", status: "SIGNED" },
      ],
      wireframes: [
        {
          name: "Lead Board",
          desc: "Drag-and-drop pipeline board with deal status cards.",
        },
        {
          name: "Client Profile",
          desc: "Summary sheet displaying contact info, logs, and deals.",
        },
        {
          name: "Document Lock",
          desc: "Biometric document signature portal layout.",
        },
      ],
      designSystem: {
        colors: [
          { name: "Dark Amber (Primary)", hex: "#1a0c02" },
          { name: "Gold Leaf (Accent)", hex: "#d4a017" },
          { name: "Warm Glow (Success)", hex: "#fbbf24" },
        ],
        fonts: ["Playfair Display (Headers)", "Inter (Body)"],
      },
      results: [
        { label: "Deal Velocity Increase", val: "28%" },
        { label: "Client Onboarding Time", val: "-50%" },
        { label: "User Interface Retention", val: "95%" },
      ],
      features: [
        {
          title: "Drag-Drop Deal Pipeline",
          desc: "Intuitively slide clients through onboarding stages in a clean grid.",
        },
        {
          title: "E-Signature integration",
          desc: "Fast electronic document signing and automated contract handoff.",
        },
        {
          title: "Document Timeline",
          desc: "A linear progress tracker showing exact document approval status.",
        },
      ],
      before:
        "Fragmented spreadsheets and paper-bound file management folders.",
      after: "Unified mobile dashboard with instant pipelines and e-signatures.",
    },
  },
  {
    id: 3,
    title: "Epic Tokens",
    year: "2024",
    tags: ["Product Design", "Figma", "Design System"],
    desc: "Epic Systems: Reusable component libraries and style guides which reduced frontend coding speed by 20%.",
    color: "#0d0018",
    accent: "#a855f7",
    img: "/images/project-tokens.png",
    detailImg: "/images/detail-tokens.png",
    textureZoom: 1.0,
    role: "Systems Designer",
    timeline: "3 Months (2024)",
    industry: "Frontend Tooling / Design Ops",
    behanceUrl: "https://www.behance.net/gallery/198765435/Epic-Tokens-Design-System",
    overview: "Epic Tokens is a unified component library and design token architecture. It aligns style variables across siloed codebases, boosting developer velocity and maintaining pixel-perfect brand consistency.",
    challengeText: "Siloed engineering teams suffered from styled layout bugs and repetitive CSS setups due to inconsistent style rules across products.",
    solutionText: "Created a centralized token compiler and automated Figma variables exporter to feed components directly into Storybook sandboxes.",
    caseStudy: {
      mission: {
        num: "04",
        type: "Design System & Tokens",
        lead: "Unified reusable component library and centralized design token repository.",
      },
      challenge: {
        problem:
          "Frontend development teams at Epic Lanka faced significant UI inconsistencies and slow release cycles because of fragmented codebases and duplicate CSS files.",
        metrics: [
          "Fragmented UI styling",
          "Duplicate CSS overrides",
          "Slow codebase shipping",
        ],
      },
      userFlow: [
        { label: "TOKEN DEFINE", status: "STYLED" },
        { label: "COMP BIND", status: "CODED" },
        { label: "STORYBOOK TEST", status: "VERIFIED" },
        { label: "PUBLISH PKG", status: "SHIPPED" },
      ],
      wireframes: [
        {
          name: "Token Specs",
          desc: "Color, spacing, and typographic coordinate tables.",
        },
        {
          name: "Input Grid",
          desc: "Variants grid detailing disabled, hover, and active fields.",
        },
        {
          name: "Modal Spec",
          desc: "Layered layout blueprint showing border-radius and grid margins.",
        },
      ],
      designSystem: {
        colors: [
          { name: "Midnight Purple (Primary)", hex: "#0d0018" },
          { name: "Neon Violet (Accent)", hex: "#a855f7" },
          { name: "Lavender Glow (Success)", hex: "#8b5cf6" },
        ],
        fonts: ["Space Grotesk (Headers)", "DM Mono (Code)"],
      },
      results: [
        { label: "Frontend Coding Speed", val: "+20%" },
        { label: "Component UI Consistency", val: "98%" },
        { label: "Theme Rebuild Time", val: "0.2s" },
      ],
      features: [
        {
          title: "CSS variables compiler",
          desc: "Automated export of Figma variables straight to component CSS.",
        },
        {
          title: "Storybook Playground",
          desc: "Living library allowing real-time testing of custom components.",
        },
        {
          title: "Cross-platform assets",
          desc: "Unified exports providing resources for web, iOS, and Android.",
        },
      ],
      before: "Hardcoded Hex values and isolated styling files.",
      after:
        "Centralized Design Tokens library driving unified brand codebases.",
    },
  },
  {
    id: 4,
    title: "Civic Portal",
    year: "2024",
    tags: ["Visual Design", "UI Guidelines", "Web UX"],
    desc: "Civic Portal: Art direction and custom interaction guidelines for public sector applications.",
    color: "#0e0e18",
    accent: "#c4b5fd",
    img: "/images/project-civic.png",
    detailImg: "/images/detail-civic.png",
    textureZoom: 1.3,
    role: "Art Director",
    timeline: "3 Months (2024)",
    industry: "GovTech / Accessibility",
    behanceUrl: "https://www.behance.net/gallery/198765436/Civic-Portal-Accessibility-Case-Study",
    overview: "Civic Portal is an art-directed public sector services interface. It establishes accessibility guidelines, achieving WCAG compliance and allowing senior citizens to submit application forms without cognitive friction.",
    challengeText: "Legacy public service portals were visually sterile, difficult to navigate, and non-compliant with standard accessibility rules.",
    solutionText: "Designed spacious accessible portal cards, high contrast style toggles, voice-reader hooks, and simple step-by-step wizard forms.",
    caseStudy: {
      mission: {
        num: "05",
        type: "Public Sector Portal",
        lead: "Art direction and accessibility-focused custom interaction guidelines.",
      },
      challenge: {
        problem:
          "Government application systems felt sterile, confusing to navigate, and were completely inaccessible to elderly or visually-impaired citizens.",
        metrics: [
          " Sterile government UI",
          " WCAG non-compliance",
          " Confusing application steps",
        ],
      },
      userFlow: [
        { label: "CITIZEN LOGIN", status: "VERIFIED" },
        { label: "SERVICE SEARCH", status: "LOCATED" },
        { label: "APPLY DETAILS", status: "PROCESSING" },
        { label: "RECEIPT ISSUE", status: "COMPLETED" },
      ],
      wireframes: [
        {
          name: "Portal Home",
          desc: "Simplified dashboard with large widget categories.",
        },
        {
          name: "Step Forms",
          desc: "Linear stepwise page form indicating current progress.",
        },
        {
          name: "Accessibility Panel",
          desc: "Sidebar control panel adjusting text size and color themes.",
        },
      ],
      designSystem: {
        colors: [
          { name: "Dark Slate (Primary)", hex: "#0e0e18" },
          { name: "Lilac Accent (Accent)", hex: "#c4b5fd" },
          { name: "Sky Glow (Success)", hex: "#6366f1" },
        ],
        fonts: ["System UI (Accessibility)", "Inter (Portal Content)"],
      },
      results: [
        { label: "Citizen Self-Service Use", val: "+62%" },
        { label: "Accessibility Metric", val: "WCAG AA" },
        { label: "Submission Errors", val: "-45%" },
      ],
      features: [
        {
          title: "Screen-Reader Voice Opts",
          desc: "Descriptive labels and landmarks optimization for visual aid.",
        },
        {
          title: "Contrast Theme Adjuster",
          desc: "Instant visual filters swapping styles for high readability.",
        },
        {
          title: "Linear Step-wise Wizard",
          desc: "Prevents validation anxiety by breaking forms into digestible tasks.",
        },
      ],
      before: "Tiny links, confusing government terms, and slow page speeds.",
      after: "Spacious accessible portal cards with guided forms progress.",
    },
  },
  {
    id: 5,
    title: "Sprint Engine",
    year: "2025",
    tags: ["Interaction UX", "Agile UX", "Figma Handoff"],
    desc: "Sprint Engine: Rapid interactive Figma mockups designed and shipped across tight bi-weekly agile development cycles.",
    color: "#1a0404",
    accent: "#f87171",
    img: "/images/project-sprint.png",
    detailImg: "/images/detail-sprint.png",
    textureZoom: 1.45,
    role: "Agile Product Designer",
    timeline: "2 Months (2025)",
    industry: "DevTools / Product Management",
    behanceUrl: "https://www.behance.net/gallery/198765437/Sprint-Engine-Agile-UX",
    overview: "Sprint Engine is a prototyping workframe aligning product and engineering teams. It maps Figma prototype details directly to sprint tickets, ensuring pixel-perfect feature releases.",
    challengeText: "Engineers and product managers faced communication gaps during rapid bi-weekly sprints, causing visual alignment errors in releases.",
    solutionText: "Engineered high-fidelity interactive sandboxes, visual comment tags, and automated SVG/PNG design handoff code pipelines.",
    caseStudy: {
      mission: {
        num: "06",
        type: "Agile UX Workframe",
        lead: "Interactive prototypes designed and shipped across tight bi-weekly agile sprints.",
      },
      challenge: {
        problem:
          "Product managers and engineers lacked visual clarity on complex interactions during rapid sprint changes, leading to specs misalignment and delayed releases.",
        metrics: [
          "Alignment gaps",
          "Delayed feature rollouts",
          "Unclear visual specs",
        ],
      },
      userFlow: [
        { label: "SPEC INGRESS", status: "DEFINED" },
        { label: "DRAFT LAYOUTS", status: "ITERATED" },
        { label: "INTERACT PROT", status: "APPROVED" },
        { label: "ASSET EXPORT", status: "DELIVERED" },
      ],
      wireframes: [
        {
          name: "Sprint Board",
          desc: "Timeline panel tracking feature tickets and prototypes.",
        },
        {
          name: "Detail Drawer",
          desc: "Sidebar displaying visual mockups and dev code codes.",
        },
        {
          name: "Feedback Overlay",
          desc: "Collaborative comment bubbles and feedback tags.",
        },
      ],
      designSystem: {
        colors: [
          { name: "Crimson Charcoal (Primary)", hex: "#1a0404" },
          { name: "Neon Rose (Accent)", hex: "#f87171" },
          { name: "Scarlet Glow (Success)", hex: "#ef4444" },
        ],
        fonts: ["Satoshi (Modern UI)", "DM Mono (Metrics Log)"],
      },
      results: [
        { label: "Iteration Sprint Latency", val: "-30%" },
        { label: "Dev Handover Accuracy", val: "95%" },
        { label: "Misaligned Handoff Specs", val: "0" },
      ],
      features: [
        {
          title: "Dynamic Interactive Figma Handoff",
          desc: "Complete UI specifications directly linked to codebase modules.",
        },
        {
          title: "Figma Component Playground",
          desc: "Live prototype sandbox testing micro-interactions and transitions.",
        },
        {
          title: "Automated Asset Export",
          desc: "Instant SVG and PNG asset pipelines feeding local repositories.",
        },
      ],
      before: "Dry text feature specifications and loose static screenshots.",
      after:
        "Living interactive Figma prototype models aligning product and dev teams.",
    },
  },
];
