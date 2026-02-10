export interface ToolItem {
  name: string;
  icon: string;
}

export interface ToolsQA {
  id: number;
  topic: string;
  keywords: string[];
  answer: string;
  tools?: ToolItem[];
}

export const toolsData: ToolsQA[] = [
  /* ---------------------------------------------------
     GENERAL TOOLSET — BROAD TRIGGER
  --------------------------------------------------- */
  {
    id: 200,
    topic: "tools",
    keywords: ["tools you use", "your tools", "what tools", "design tools", "ui tools"],
    answer: "🛠 Here are some of the main tools I use:",
    tools: [
      { name: "Figma", icon: "/icons/Figma.svg" },
      { name: "Photoshop", icon: "/icons/Photoshop.svg" },
      { name: "Illustrator", icon: "/icons/Illustrator.svg" }
    ]
  },

  /* ---------------------------------------------------
     SPECIFIC DESIGN TOOLS
  --------------------------------------------------- */
  {
    id: 201,
    topic: "tools",
    keywords: ["figma", "use figma", "do you use figma", "can you use figma", "know figma", "figma skills", "good at figma", "figma expert", "rate yourself figma", "figma rating", "how good figma", "figma proficiency"],
    answer: "Yes, 🎨 Figma is my main design tool - I use it daily for UI, prototyping, and design systems.",
    tools: [{ name: "Figma", icon: "/icons/Figma.svg" }]
  },
  {
    id: 202,
    topic: "tools",
    keywords: ["photoshop", "ps", "adobe photoshop", "use photoshop", "do you use photoshop", "can you use photoshop", "know photoshop"],
    answer: "Yes, 🖌 I use Photoshop for advanced image manipulation, mockups, and UI enhancements.",
    tools: [{ name: "Photoshop", icon: "/icons/Photoshop.svg" }]
  },
  {
    id: 203,
    topic: "tools",
    keywords: ["illustrator", "ai illustrator", "adobe illustrator", "use illustrator", "do you use illustrator", "can you use illustrator", "vector tool"],
    answer: "Yes, ✒️ Illustrator is my tool for vector graphics, icons, and logo design.",
    tools: [{ name: "Illustrator", icon: "/icons/Illustrator.svg" }]
  },

  /* ---------------------------------------------------
     UI/UX DESIGN SKILLS
  --------------------------------------------------- */
  {
    id: 204,
    topic: "ux",
    keywords: ["ux phases"],
    answer: "Here are the key UX phases I usually follow:",
    tools: [
      { name: "Wireframes", icon: "/icons/wireframe.svg" },
      { name: "User Flows", icon: "/icons/flow.svg" },
      { name: "High-fidelity UI", icon: "/icons/ui.svg" }
    ]
  },

  {
    id: 205,
    topic: "ux",
    keywords: ["building design systems", "creating design systems", "design system creation", "design system workflow", "how to build design system"],
    answer: "I also build full design systems for scalable UI work:",
    tools: [
      { name: "Components", icon: "/icons/component.svg" },
      { name: "Typography", icon: "/icons/typography.svg" },
      { name: "Grids", icon: "/icons/grid.svg" }
    ]
  },

  /* ---------------------------------------------------
     DEVELOPMENT SKILLS
  --------------------------------------------------- */
  {
    id: 206,
    topic: "tech",
    keywords: ["frontend skills", "coding skills", "dev stack", "development tools"],
    answer: "💻 Here are the technologies I commonly work with:",
    tools: [
      { name: "HTML", icon: "/icons/HTML5.svg" },
      { name: "SCSS", icon: "/icons/Sass.svg" },
      { name: "JavaScript", icon: "/icons/JS.svg" },
      { name: "TypeScript", icon: "/icons/TypeScript.svg" }
    ]
  },

  {
    id: 207,
    topic: "tech",
    keywords: ["frameworks", "js frameworks", "framework you use"],
    answer: "✨ Here are some of the frameworks I work with:",
    tools: [
      { name: "Angular", icon: "/icons/Angular.svg" },
      { name: "Next.js", icon: "/icons/nextjs.png" }
    ]
  },

  {
    id: 208,
    topic: "tech",
    keywords: ["css frameworks", "tailwind", "ui css"],
    answer: "🎨 For styling, I mainly use these:",
    tools: [
      { name: "Tailwind CSS", icon: "/icons/TailwindCSS.svg" },
      { name: "SCSS", icon: "/icons/Sass.svg" }
    ]
  },

  /* ---------------------------------------------------
     SOFTWARE DEVELOPMENT TOOLS
  --------------------------------------------------- */
  {
    id: 209,
    topic: "tech",
    keywords: ["git", "version control", "code tools"],
    answer: "🧩 For version control, I use:",
    tools: [{ name: "Git", icon: "/icons/Git.svg" }]
  },
  {
    id: 210,
    topic: "tech",
    keywords: ["vs code", "editor", "code editor"],
    answer: "📝 My primary code editor:",
    tools: [{ name: "VS Code", icon: "/icons/vscode.svg" }]
  },

  /* ---------------------------------------------------
     SPECIFIC COMBINED TECHNOLOGY ANSWERS
  --------------------------------------------------- */
  {
    id: 211,
    topic: "tech",
    keywords: ["web tech stack", "your tech stack", "stack"],
    answer: "⚡ My core web tech stack:",
    tools: [
      { name: "Next.js", icon: "/icons/nextjs.png" },
      { name: "TypeScript", icon: "/icons/TypeScript.svg" },
      { name: "Tailwind CSS", icon: "/icons/TailwindCSS.svg" }
    ]
  },

  {
    id: 212,
    topic: "tools",
    keywords: ["prototyping tools", "tools for prototyping", "prototype software", "prototyping software"],
    answer: "🔁 I create interactive prototypes using:",
    tools: [
      { name: "Figma", icon: "/icons/Figma.svg" },
      { name: "Prototyping", icon: "/icons/prototype.svg" }
    ]
  },

  /* ---------------------------------------------------
     ANIMATION / MOTION
  --------------------------------------------------- */
  {
    id: 213,
    topic: "animation",
    keywords: ["animation tools", "motion", "micro interactions"],
    answer: "✨ For motion and UI animations:",
    tools: [
      { name: "Figma Smart Animate", icon: "/icons/Figma.svg" },
      { name: "Lottie", icon: "/icons/Lottie.svg" }
    ]
  },

  /* ---------------------------------------------------
     MIXED TOOL ANSWERS
  --------------------------------------------------- */
  {
    id: 214,
    topic: "tools",
    keywords: ["workflow tools", "tools for workflow", "design to dev tools", "handoff tools"],
    answer: "📦 My design-to-development workflow:",
    tools: [
      { name: "Figma Inspect", icon: "/icons/Figma.svg" },
      { name: "GitHub", icon: "/icons/GitHub.svg" },
      { name: "VS Code", icon: "/icons/vscode.svg" }
    ]
  },

  /* ---------------------------------------------------
     ADVANCED TECHNOLOGIES
  --------------------------------------------------- */
  {
    id: 215,
    topic: "tech",
    keywords: ["responsive design", "responsive workflow"],
    answer: "📱 For responsive designs I use:",
    tools: [
      { name: "Figma Constraints", icon: "/icons/Figma.svg" },
      { name: "CSS Flex/Grid", icon: "/icons/CSS.svg" }
    ]
  },

  {
    id: 216,
    topic: "tech",
    keywords: ["accessibility", "a11y", "accessible design"],
    answer: "♿ I follow these accessibility guidelines:",
    tools: [
      { name: "WCAG", icon: "/icons/accessibility.svg" },
      { name: "Color Contrast Check", icon: "/icons/color.svg" }
    ]
  },

  /* ---------------------------------------------------
     EDUCATIONAL CERTIFICATE SKILLS
  --------------------------------------------------- */
  {
    id: 217,
    topic: "education",
    keywords: ["design certificates", "skill certificates"],
    answer: "📜 I’ve completed these certificates:",
    tools: [
      { name: "Google UX Design", icon: "/icons/google.svg" },
      { name: "Figma for UX", icon: "/icons/Figma.svg" },
      { name: "Angular Certification", icon: "/icons/Angular.svg" }
    ]
  },

  /* ---------------------------------------------------
     SUPER-SPECIFIC TOOL QUESTIONS
  --------------------------------------------------- */
  {
    id: 218,
    topic: "tools",
    keywords: ["best tool", "favorite tool", "most used tool"],
    answer: "🎯 My most-used tool is definitely Figma:",
    tools: [{ name: "Figma", icon: "/icons/Figma.svg" }]
  },

  {
    id: 219,
    topic: "tech",
    keywords: ["coding languages", "programming languages", "what languages you code", "languages you know"],
    answer: "Yes, I do code 👇 Here are the languages I use:",
    tools: [
      { name: "JavaScript", icon: "/icons/JS.svg" },
      { name: "TypeScript", icon: "/icons/TypeScript.svg" },
      { name: "Angular", icon: "/icons/Angular.svg" },
      { name: "Next.js", icon: "/icons/nextjs.png" }
    ]
  },

  {
    id: 220,
    topic: "tech",
    keywords: ["frontend stack", "frontend"],
    answer: "My frontend stack includes:",
    tools: [
      { name: "HTML", icon: "/icons/HTML5.svg" },
      { name: "CSS / SCSS", icon: "/icons/Sass.svg" },
      { name: "JavaScript", icon: "/icons/JS.svg" },
      { name: "Angular", icon: "/icons/Angular.svg" }]
  },

  /* ---------------------------------------------------
     SPECIFIC LANGUAGES & FRAMEWORKS
  --------------------------------------------------- */
  {
    id: 221,
    topic: "tech",
    keywords: ["react", "use react", "do you use react", "know react", "react skills", "reactjs"],
    answer: "Yes, I use React! I work with React.js and Next.js for building modern web applications.",
    tools: [
      { name: "React", icon: "/icons/nextjs.png" },
      { name: "Next.js", icon: "/icons/nextjs.png" }
    ]
  },
  {
    id: 222,
    topic: "tech",
    keywords: ["angular", "use angular", "do you use angular", "know angular", "angular skills"],
    answer: "Yes! I have strong experience with Angular for building enterprise-level applications.",
    tools: [{ name: "Angular", icon: "/icons/Angular.svg" }]
  },
  {
    id: 223,
    topic: "tech",
    keywords: ["typescript", "use typescript", "do you use typescript", "know typescript", "typescript skills"],
    answer: "Absolutely! I use TypeScript for type-safe, scalable frontend development.",
    tools: [{ name: "TypeScript", icon: "/icons/TypeScript.svg" }]
  },
  {
    id: 224,
    topic: "tech",
    keywords: ["javascript", "use javascript", "do you use javascript", "know javascript", "js skills"],
    answer: "Yes, JavaScript is my core language for frontend development and interactive UIs.",
    tools: [{ name: "JavaScript", icon: "/icons/JS.svg" }]
  },
  {
    id: 225,
    topic: "tech",
    keywords: ["nextjs", "next.js", "use nextjs", "do you use nextjs", "know nextjs"],
    answer: "Yes! I use Next.js for building fast, SEO-friendly React applications.",
    tools: [{ name: "Next.js", icon: "/icons/nextjs.png" }]
  },
  {
    id: 226,
    topic: "tech",
    keywords: ["tailwind", "tailwind css", "use tailwind", "do you use tailwind", "know tailwind"],
    answer: "Yes, I use Tailwind CSS for rapid, utility-first styling.",
    tools: [{ name: "Tailwind CSS", icon: "/icons/Tailwind.svg" }]
  },
  {
    id: 227,
    topic: "tech",
    keywords: ["html", "html5", "use html", "do you use html", "know html"],
    answer: "Of course! HTML5 is the foundation of all my web development work.",
    tools: [{ name: "HTML5", icon: "/icons/HTML5.svg" }]
  },
  {
    id: 228,
    topic: "tech",
    keywords: ["css", "scss", "sass", "use css", "do you use css", "know css"],
    answer: "Yes, I use CSS/SCSS for styling and creating responsive, beautiful interfaces.",
    tools: [{ name: "CSS/SCSS", icon: "/icons/Sass.svg" }]
  },

  /* ---------------------------------------------------
     SKILL RATINGS
  --------------------------------------------------- */
  {
    id: 229,
    topic: "skills",
    keywords: ["rate yourself", "skill level", "how good are you", "proficiency", "expertise level", "rate your skills", "skill rating", "how proficient"],
    answer: "I'd rate myself highly in UI/UX design and frontend development. I'm particularly strong with Figma, React/Next.js, and TypeScript. I focus on delivering clean, functional, and user-centered solutions."
  }
];

export const TOOLS = toolsData;
