// data/qa/experience.ts

export interface ExperienceQAItem {
  id: number;
  topic: string;
  keywords: string[];
  answer: string;
}

export const EXPERIENCE_QA_DATA: ExperienceQAItem[] = [
  /* ---------------------------------------------------
       YOUR EXPERIENCE SUMMARY
    --------------------------------------------------- */
  {
    id: 400,
    topic: "experience",
    keywords: ["your experience", "experience", "how long", "years of experience", "work history", "background", "professional background", "career history", "how experienced are you", "experience summary", "what have you done"],
    answer:
      "I specialize in UI/UX design and frontend development, with experience working on mobile apps, web platforms, dashboards, and interactive UI experiences. I focus heavily on usability, clean hierarchy, accessibility, and visual clarity.",
  },

  {
    id: 401,
    topic: "experience",
    keywords: ["what can you do", "your skills", "what do you do", "capabilities", "what are your skills", "skill set", "what you can do", "abilities", "competencies", "what you offer"],
    answer:
      "I design intuitive user interfaces, craft UX flows, build prototypes, and create frontend implementations using modern frameworks. I also work on branding, icon design, and design-system creation.",
  },

  /* ---------------------------------------------------
       WORKFLOW — GENERAL
    --------------------------------------------------- */
  {
    id: 402,
    topic: "workflow",
    keywords: ["your workflow", "work process", "how you work", "design process", "methodology", "working method", "how do you approach", "work method", "explain your workflow", "describe your process"],
    answer:
      "My workflow usually follows a structured approach:\n\n1️⃣ <b>Understand the problem</b> — goals, audience, use-cases\n2️⃣ <b>Research & insights</b> — competitor analysis, UX patterns\n3️⃣ <b>Ideation</b> — sketches, user flows, wireframes\n4️⃣ <b>High-fidelity UI</b> — layout, components, interactions\n5️⃣ <b>Prototyping</b> — testable click-through version\n6️⃣ <b>Refinement</b> — improvements from feedback or testing\n7️⃣ <b>Hand-off</b> — assets, guidelines, and developer-ready files\n\nI keep communication clear and transparent at every step.",
  },

  /* ---------------------------------------------------
       WORKFLOW — PROJECT TIMELINE
    --------------------------------------------------- */
  {
    id: 403,
    topic: "workflow",
    keywords: ["timeline", "how long it takes", "project duration", "time needed", "how much time", "duration", "timeframe", "how long does it take", "project time", "delivery time"],
    answer:
      "Project duration depends on scope. Simple UI screens may take 1–3 days, while full apps or websites can take 2–6 weeks depending on features, complexity, and revisions. I can give a precise timeline after reviewing the requirements.",
  },

  {
    id: 404,
    topic: "workflow",
    keywords: ["steps", "design steps", "process steps", "workflow steps", "phases", "stages", "step by step", "process phases", "what are the steps", "list the steps", "steps involved", "main steps"],
    answer:
      "The steps usually include: Discovery → Wireframes → UI Design → Prototype → Feedback → Final Delivery. Each stage builds on the previous one to keep everything aligned and efficient.",
  },

  /* ---------------------------------------------------
       DELIVERABLES
    --------------------------------------------------- */
  {
    id: 405,
    topic: "workflow",
    keywords: ["deliverables", "what you deliver", "what do i get", "what will i receive", "final product", "what's included", "project deliverables", "end result", "what files", "what assets"],
    answer:
      "Depending on the project, you’ll receive deliverables such as:\n- High-fidelity UI screens\n- UX flows & wireframes\n- Interactive prototypes\n- Component libraries / mini design systems\n- Exported assets (icons, images, etc.)\n- Developer handoff through Figma or documentation",
  },

  {
    id: 406,
    topic: "workflow",
    keywords: ["handoff", "developer handoff", "figma handoff", "design handoff", "dev handoff", "handover", "transfer to dev", "developer transfer"],
    answer:
      "I prepare a clean and structured developer handoff that includes spacing, styles, typography scales, components, and interaction notes — making development smooth and predictable.",
  },

  /* ---------------------------------------------------
       COLLABORATION / COMMUNICATION
    --------------------------------------------------- */
  {
    id: 407,
    topic: "workflow",
    keywords: ["communication", "how we communicate", "stay in touch", "updates", "how do we communicate", "contact method", "staying updated", "progress updates", "communication style"],
    answer:
      "I keep communication simple and consistent — sharing progress, asking clarifying questions, and sending small updates to ensure everything is aligned before final delivery.",
  },

  {
    id: 408,
    topic: "workflow",
    keywords: ["feedback", "revisions", "changes", "edits", "modifications", "adjustments", "iteration", "change requests", "revision process"],
    answer:
      "Feedback is a natural part of the process. I usually include revisions within the workflow to refine the design until it matches your goals and user expectations.",
  },

  /* ---------------------------------------------------
       TOOLS USED IN WORKFLOW
    --------------------------------------------------- */
  {
    id: 409,
    topic: "workflow",
    keywords: ["tools you use in workflow", "design tools workflow", "figma workflow", "what tools do you use", "which software", "which programs", "tech you use", "design software", "tools for design"],
    answer:
      "I primarily use Figma for wireframes, design systems, and UI designs. For visuals I use <b>Photoshop</b> and <b>Illustrator</b>. For development, I work with <b>Angular</b>, <b>Next.js</b>, <b>TypeScript</b>, and <b>Tailwind CSS</b>.",
  },

  /* ---------------------------------------------------
       DESIGN DECISION-MAKING
    --------------------------------------------------- */
  {
    id: 410,
    topic: "workflow",
    keywords: ["how you make decisions", "design decisions", "why you choose designs", "decision making", "how do you decide", "choice process", "design choices"],
    answer:
      "Every design decision is based on usability, clarity, function, and emotion. I aim to make interfaces both visually appealing and easy to interact with. Decisions come from combining UX best practices, user behavior patterns, and your project’s goals.",
  },

  /* ---------------------------------------------------
       FULL UX APPROACH
    --------------------------------------------------- */
  {
    id: 411,
    topic: "workflow",
    keywords: ["ux process", "your ux approach", "ux steps", "user experience process", "ux methodology", "ux workflow", "ux design process"],
    answer:
      "My UX approach focuses on:\n- Understanding users and their goals\n- Identifying friction points\n- Building flows that feel natural and predictable\n- Designing interactions that guide the user smoothly\n- Ensuring accessibility and responsiveness\n\nGood UX is invisible — it feels effortless.",
  },

  /* ---------------------------------------------------
       CASE-STUDY STYLE ANSWERS
    --------------------------------------------------- */
  {
    id: 412,
    topic: "workflow",
    keywords: ["how you solve problems", "problem solving", "design problem", "solving issues", "approach to problems", "problem resolution", "tackling challenges"],
    answer:
      "I solve design problems by breaking them down into smaller insights — understanding the user’s perspective, mapping the journey, identifying the bottlenecks, and designing solutions that reduce friction and increase clarity.",
  },

  {
    id: 413,
    topic: "workflow",
    keywords: ["your approach", "your method", "your style", "design approach", "working approach", "methodology", "how you approach work"],
    answer:
      "My approach blends clean visual style with structured UX thinking. I keep interfaces minimal, meaningful, and easy to understand at a glance.",
  },
];

export const EXPERIENCE = EXPERIENCE_QA_DATA;
