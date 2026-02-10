// data/experience.ts

export interface ExperienceQAItem {
  id: number;
  topic: string;
  keywords: string[];
  answer: string;
  forceAI?: boolean;
}

export const EXPERIENCE_QA_DATA: ExperienceQAItem[] = [
  /* ---------------------------------------------------
       YOUR EXPERIENCE SUMMARY
    --------------------------------------------------- */
  {
    id: 400,
    topic: "experience",
    keywords: ["your experience", "experience", "work history", "professional background", "career history", "experience summary", "what have you done"],
    answer:
      "I specialize in UI/UX design and frontend development, with experience working on mobile apps, web platforms, dashboards, and interactive UI experiences. I focus heavily on usability, clean hierarchy, accessibility, and visual clarity.",
  },

  {
    id: 401,
    topic: "capabilities",
    keywords: ["what can you do", "capabilities", "what are your skills", "skill set", "what you can do", "abilities", "competencies", "what you offer"],
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
    answer: "AI_ANSWER_PLACEHOLDER",
    forceAI: true,
  },

  /* ---------------------------------------------------
       WORKFLOW — PROJECT TIMELINE
    --------------------------------------------------- */
  {
    id: 403,
    topic: "timeline",
    keywords: ["timeline", "how long it takes", "project duration", "time needed", "how much time", "duration", "timeframe", "how long does it take", "project time", "delivery time"],
    answer:
      "Project duration depends on scope. Simple UI screens may take 1–3 days, while full apps or websites can take 2–6 weeks depending on features, complexity, and revisions. I can give a precise timeline after reviewing the requirements.",
  },

  {
    id: 404,
    topic: "process-steps",
    keywords: ["design steps", "process steps", "workflow steps", "phases", "stages", "step by step", "process phases", "steps involved", "main steps"],
    answer:
      "The steps usually include: Discovery → Wireframes → UI Design → Prototype → Feedback → Final Delivery. Each stage builds on the previous one to keep everything aligned and efficient.",
  },

  /* ---------------------------------------------------
       DELIVERABLES
    --------------------------------------------------- */
  {
    id: 405,
    topic: "deliverables",
    keywords: ["deliverables", "what you deliver", "what do i get", "what will i receive", "final product", "what's included", "project deliverables", "end result", "what files", "what assets"],
    answer:
      "Depending on the project, you'll receive:<br/>• High-fidelity UI screens<br/>• UX flows & wireframes<br/>• Interactive prototypes<br/>• Component libraries / mini design systems<br/>• Exported assets (icons, images, etc.)<br/>• Developer handoff through Figma or documentation",
  },

  {
    id: 406,
    topic: "handoff",
    keywords: ["handoff", "developer handoff", "figma handoff", "design handoff", "dev handoff", "handover", "transfer to dev", "developer transfer"],
    answer:
      "I prepare a clean and structured developer handoff that includes spacing, styles, typography scales, components, and interaction notes - making development smooth and predictable.",
  },

  /* ---------------------------------------------------
       COLLABORATION / COMMUNICATION
    --------------------------------------------------- */
  {
    id: 407,
    topic: "communication",
    keywords: ["communication", "how we communicate", "stay in touch", "updates", "how do we communicate", "contact method", "staying updated", "progress updates", "communication style"],
    answer:
      "I keep communication simple and consistent. Sharing progress, asking clarifying questions, and sending small updates to ensure everything is aligned before final delivery.",
  },

  {
    id: 408,
    topic: "revisions",
    keywords: ["feedback", "revisions", "changes", "edits", "modifications", "adjustments", "iteration", "change requests", "revision process"],
    answer:
      "Feedback is a natural part of the process. I usually include revisions within the workflow to refine the design until it matches your goals and user expectations.",
  },

  /* ---------------------------------------------------
       TOOLS USED IN WORKFLOW
    --------------------------------------------------- */
  {
    id: 409,
    topic: "workflow-tools",
    keywords: ["tools you use in workflow", "design tools workflow", "figma workflow", "what tools do you use", "which software", "which programs", "tech you use", "design software", "tools for design"],
    answer:
      "I primarily use Figma for wireframes, design systems, and UI designs. For visuals I use <b>Photoshop</b> and <b>Illustrator</b>. For development, I work with <b>Angular</b>, <b>Next.js</b>, <b>TypeScript</b>, and <b>Tailwind CSS</b>.",
  },

  /* ---------------------------------------------------
       DESIGN DECISION-MAKING
    --------------------------------------------------- */
  {
    id: 410,
    topic: "design-decisions",
    keywords: ["how you make decisions", "design decisions", "why you choose designs", "decision making", "how do you decide", "choice process", "design choices"],
    answer: "AI_ANSWER_PLACEHOLDER",
    forceAI: true,
  },

  /* ---------------------------------------------------
       FULL UX APPROACH
    --------------------------------------------------- */
  {
    id: 411,
    topic: "ux-approach",
    keywords: ["ux process", "your ux approach", "ux steps", "user experience process", "ux methodology", "ux workflow", "ux design process"],
    answer: "AI_ANSWER_PLACEHOLDER",
    forceAI: true,
  },

  /* ---------------------------------------------------
       PROBLEM SOLVING
    --------------------------------------------------- */
  {
    id: 412,
    topic: "problem-solving",
    keywords: ["how you solve problems", "problem solving", "design problem", "solving issues", "approach to problems", "problem resolution", "tackling challenges"],
    answer: "AI_ANSWER_PLACEHOLDER",
    forceAI: true,
  },

  {
    id: 413,
    topic: "working-approach",
    keywords: ["your approach", "your method", "working approach", "how you approach work"],
    answer: "AI_ANSWER_PLACEHOLDER",
    forceAI: true,
  },
];

export const EXPERIENCE = EXPERIENCE_QA_DATA;
