// // /data/qa.ts
// export type QAItem = {
//     id: number;
//     topic: string;
//     keywords: string[];
//     answer: string; // supports simple HTML like <strong> and <br/>
//     metadata?: Record<string, any>;
//   };
  
//   export const QA_DATA: QAItem[] = [
//     {
//       id: 1,
//       topic: "projects",
//       keywords: ["project", "projects", "case study", "case studies", "work", "portfolio", "show me your work"],
//       answer:
//         "Here are a few featured case studies:<br/><br/>• <strong>Movie Trailer Booking App</strong> — trailer browsing & seat booking flow.<br/>• <strong>Design System</strong> — tokens, components, and docs for reuse.<br/>• <strong>Movie Trailer App UI</strong> — mobile UI for trailer browsing and booking.<br/><br/>Pick a project and I’ll show key screens and process.",
//     },
//     {
//       id: 2,
//       topic: "tools",
//       keywords: ["tool", "tools", "figma", "figjam", "notion", "illustrator", "photoshop", "framer", "tailwind", "nextjs", "react"],
//       answer:
//         "I use: <strong>Figma</strong> (UI & prototyping), <strong>FigJam</strong> (workshops), <strong>Adobe</strong> (Illustrator/Photoshop), <strong>Next.js + React</strong> (frontend), <strong>Tailwind/SCSS</strong> (styles), and <strong>Framer Motion</strong> for interactions.",
//     },
//     {
//       id: 3,
//       topic: "experience",
//       keywords: ["experience", "background", "work experience", "years", "role"],
//       answer:
//         "I’m a UI/UX Engineer focused on designing and shipping web & mobile interfaces. I build design systems, collaborate with engineers, and iterate based on user feedback.",
//     },
//     {
//       id: 4,
//       topic: "design-process",
//       keywords: ["process", "design process", "workflow", "how you design", "approach"],
//       answer:
//         "My process: <strong>Research → Define → Wireframe → Visual Design → Prototype → Test → Handoff</strong>. I iterate quickly and validate with lightweight testing.",
//     },
//     {
//       id: 5,
//       topic: "design-system",
//       keywords: ["design system", "tokens", "components", "component library", "design tokens"],
//       answer:
//         "I create design systems with tokens, component variants, spacing scales, and docs so teams can scale designs consistently.",
//     },
//     {
//       id: 6,
//       topic: "contact",
//       keywords: ["contact", "email", "hire", "reach", "work with you"],
//       answer: "You can email me at <strong>hello@namila.me</strong> or use the contact button on the site to send a message.",
//     },
//     {
//       id: 7,
//       topic: "cv",
//       keywords: ["cv", "resume", "download cv", "download resume"],
//       answer: "You can download my CV using the floating download button at the bottom-right of the site.",
//     },
//     {
//       id: 8,
//       topic: "behance",
//       keywords: ["behance", "behance link"],
//       answer: "Behance: https://www.behance.net/namilapreshan1",
//     },
//     {
//       id: 9,
//       topic: "linkedin",
//       keywords: ["linkedin", "profile", "linkedin link"],
//       answer: "LinkedIn: https://www.linkedin.com/in/namila-preshan",
//     },
//     {
//       id: 10,
//       topic: "availability",
//       keywords: ["availability", "freelance", "open to work", "available"],
//       answer: "I’m open to freelance and contract work — please share project details and timeline and I’ll respond via email.",
//     },
//   ];
  
// /data/qa.ts
export type QAItem = {
  id: number;
  topic: string;
  keywords: string[];
  answer: string; // supports simple HTML like <strong> and <br/>
  metadata?: Record<string, any>;
};

export const QA_DATA: QAItem[] = [
  {
    id: 1,
    topic: "projects",
    keywords: ["project", "projects", "case study", "case studies", "work", "portfolio", "show me your work"],
    answer:
      "Here are a few featured case studies:<br/><br/>• <strong>Movie Trailer Booking App</strong> — trailer browsing & seat booking flow.<br/>• <strong>Design System</strong> — tokens, components, and docs for reuse.<br/>• <strong>Movie Trailer App UI</strong> — mobile UI for trailer browsing and booking.<br/><br/>Pick a project and I’ll show key screens and process.",
  },
  {
    id: 2,
    topic: "tools",
    keywords: ["tool", "tools", "figma", "figjam", "notion", "illustrator", "photoshop", "framer", "tailwind", "nextjs", "react"],
    answer:
      "I use: <strong>Figma</strong> (UI & prototyping), <strong>FigJam</strong> (workshops), <strong>Adobe</strong> (Illustrator/Photoshop), <strong>Next.js + React</strong> (frontend), <strong>Tailwind/SCSS</strong> (styles), and <strong>Framer Motion</strong> for interactions.",
  },
  {
    id: 3,
    topic: "experience",
    keywords: ["experience", "background", "work experience", "years", "role"],
    answer:
      "I’m a UI/UX Engineer focused on designing and shipping web & mobile interfaces. I build design systems, collaborate with engineers, and iterate based on user feedback.",
  },
  {
    id: 4,
    topic: "design-process",
    keywords: ["process", "design process", "workflow", "how you design", "approach"],
    answer:
      "My process: <strong>Research → Define → Wireframe → Visual Design → Prototype → Test → Handoff</strong>. I iterate quickly and validate with lightweight testing.",
  },
  {
    id: 5,
    topic: "design-system",
    keywords: ["design system", "tokens", "components", "component library", "design tokens"],
    answer:
      "I create design systems with tokens, component variants, spacing scales, and docs so teams can scale designs consistently.",
  },
  {
    id: 6,
    topic: "contact",
    keywords: ["contact", "email", "hire", "reach", "work with you"],
    answer: "You can email me at <strong>hello@namila.me</strong> or use the contact button on the site to send a message.",
  },
  {
    id: 7,
    topic: "cv",
    keywords: ["cv", "resume", "download cv", "download resume"],
    answer: "You can download my CV using the floating download button at the bottom-right of the site.",
  },
  {
    id: 8,
    topic: "behance",
    keywords: ["behance", "behance link"],
    answer: "Behance: https://www.behance.net/namilapreshan1",
  },
  {
    id: 9,
    topic: "linkedin",
    keywords: ["linkedin", "profile", "linkedin link"],
    answer: "LinkedIn: https://www.linkedin.com/in/namila-preshan",
  },
  {
    id: 10,
    topic: "availability",
    keywords: ["availability", "freelance", "open to work", "available"],
    answer: "I’m open to freelance and contract work — please share project details and timeline and I’ll respond via email.",
  },
];
