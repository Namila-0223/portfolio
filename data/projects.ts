// data/projects.ts

import behanceData from "@/public/animations/behance.json";

export type ProjectPreview = {
  hasImage?: boolean;
  hasLottie?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  projectId?: string;
  externalUrl?: string;
  lottieData?: any;
};

export type ProjectQA = {
  id: number;
  topic: string;
  keywords: string[];
  answer: string;
  triggerProject?: boolean;
  preview?: ProjectPreview;
};

export const PROJECTS_QA: ProjectQA[] = [
  {
    id: 100,
    topic: "projects",
    keywords: ["project", "your projects", "portfolio", "show me your projects", "work samples", "projects", "show projects", "view projects", "see your projects", "what projects", "project examples", "work examples", "case studies"],
    answer: "Sure! Here's one of my featured projects 👇",
    triggerProject: true
  },
  {
    id: 101,
    topic: "projects",
    keywords: ["movie app", "trailer app", "mobile app ui", "app design", "mobile ui", "app ui", "mobile design", "movie trailer"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-1.png",
      imageAlt: "Movie Trailer App UI Design",
      projectId: "mobile-app-ui"
    },
    answer: "This is a mobile app I designed for discovering and watching movie trailers. Clean layout, rich visuals, and smooth interactions."
  },
  {
    id: 102,
    topic: "projects",
    keywords: ["behance", "show me behance", "your behance", "behance profile", "behance link", "view behance", "behance portfolio"],
    preview: {
      hasLottie: true,
      externalUrl: "https://www.behance.net/namilapreshan1",
      lottieData: behanceData
    },
    answer: "Here's my Behance — you’ll find animations, UI explorations, and full layouts."
  },
  {
    id: 103,
    topic: "projects",
    keywords: ["ui design samples", "ui examples", "show ui", "ui work", "interface design", "user interface", "ui designs"],
    answer: "Here’s a UI design from my portfolio 👇",
    triggerProject: true
  },
  {
    id: 104,
    topic: "projects",
    keywords: ["dashboard", "admin ui", "analytics ui", "admin panel", "dashboard design", "admin dashboard", "analytics dashboard"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-2.png",
      imageAlt: "Admin Dashboard UI",
      projectId: "admin-dashboard"
    },
    answer: "A modern admin dashboard focusing on clarity, charts, and business insights."
  },
  {
    id: 105,
    topic: "projects",
    keywords: ["ecommerce ui", "shopping app", "ecommerce design", "online store", "shop ui", "ecommerce", "shopping ui", "store design"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-3.png",
      imageAlt: "Ecommerce Mobile UI",
      projectId: "ecommerce-ui"
    },
    answer: "A clean and minimal ecommerce mobile UI focusing on product visibility and easy checkout."
  },
  {
    id: 106,
    topic: "projects",
    keywords: ["travel app", "booking ui", "travel design", "hotel booking", "travel ui", "booking app", "trip planner"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-4.png",
      imageAlt: "Travel Booking App UI",
      projectId: "travel-app-ui"
    },
    answer: "A travel and hotel booking app with strong emphasis on visuals and smooth filtering."
  },
  {
    id: 107,
    topic: "projects",
    keywords: ["finance app", "banking ui", "wallet ui", "fintech", "banking app", "finance ui", "payment app", "money app"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-5.png",
      imageAlt: "Finance App UI",
      projectId: "finance-ui"
    },
    answer: "A fintech concept focusing on transactions, budgeting, and a clean financial overview."
  },
  {
    id: 108,
    topic: "projects",
    keywords: ["landing page", "web design", "website ui", "landing", "web page", "website design", "landing page design"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-6.png",
      imageAlt: "Landing Page UI",
      projectId: "landing-page"
    },
    answer: "A minimal landing page designed with strong visual hierarchy and clean storytelling."
  },
  {
    id: 109,
    topic: "projects",
    keywords: ["food app", "restaurant app", "food delivery ui", "food delivery", "restaurant ui", "food ordering", "delivery app"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-7.png",
      imageAlt: "Food Delivery App UI",
      projectId: "food-app-ui"
    },
    answer: "A food delivery mobile UI focusing on browsing, customizing, and tracking orders."
  },
  {
    id: 110,
    topic: "projects",
    keywords: ["prototype project", "show prototype", "prototype example", "interactive prototype example", "clickable prototype example"],
    answer: "Here is a prototype-focused project 👇",
    triggerProject: true
  },
  {
    id: 111,
    topic: "projects",
    keywords: ["dark mode design", "dark ui", "dark theme", "dark mode", "night mode", "dark interface"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-8.png",
      imageAlt: "Dark UI Concept",
      projectId: "dark-mode-ui"
    },
    answer: "A sleek dark-mode UI created with focus on contrast & clarity."
  },
  {
    id: 112,
    topic: "projects",
    keywords: ["design system project", "design system example", "show design system", "design system case study", "ui kit project", "component library project"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-9.png",
      imageAlt: "UI Design System",
      projectId: "design-system"
    },
    answer: "A custom design system with typography, spacing, grids, components, and interaction states."
  },
  {
    id: 113,
    topic: "projects",
    keywords: ["3d ui", "3d elements", "visual concept", "3d design", "3d interface", "dimensional ui"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-10.png",
      imageAlt: "3D UI Concept",
      projectId: "3d-ui"
    },
    answer: "A fun 3D-inspired UI focused on depth, lighting, and playful interactions."
  },
  {
    id: 114,
    topic: "projects",
    keywords: ["animations", "motion design", "ui animation", "micro animations", "motion", "animated ui", "transitions"],
    answer: "Here’s one of my motion/animation showcases 👇",
    triggerProject: true
  },
  {
    id: 115,
    topic: "projects",
    keywords: ["figma prototype", "figma animation", "figma motion", "figma interactions", "figma design"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-11.png",
      imageAlt: "Figma Motion Exploration",
      projectId: "figma-motion"
    },
    answer: "An advanced motion exploration built using interactive Figma prototyping."
  },
  {
    id: 116,
    topic: "projects",
    keywords: ["portfolio website", "your website", "web ui", "this website", "this portfolio", "your site", "portfolio site"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-12.png",
      imageAlt: "Portfolio Website",
      projectId: "portfolio-v1"
    },
    answer: "A clean and modern portfolio website with smooth animations."
  },
  {
    id: 117,
    topic: "projects",
    keywords: ["product page", "product landing", "product ui", "product design", "product showcase"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-13.png",
      imageAlt: "Product Page UI",
      projectId: "product-page"
    },
    answer: "A product landing page focused on storytelling, visuals, and smooth interactions."
  },
  {
    id: 118,
    topic: "projects",
    keywords: ["saas", "saas ui", "subscription ui", "saas dashboard", "saas design", "software as service"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-14.png",
      imageAlt: "SaaS UI Design",
      projectId: "saas-dashboard"
    },
    answer: "A full SaaS dashboard design with user management, analytics, and real-time data UI."
  },
  {
    id: 119,
    topic: "projects",
    keywords: ["card ui", "component ui", "card design", "ui cards", "card components"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-15.png",
      imageAlt: "Component Library UI",
      projectId: "component-ui"
    },
    answer: "A collection of reusable, clean UI components."
  },
  {
    id: 120,
    topic: "projects",
    keywords: ["login design", "auth ui", "authentication", "login ui", "sign in", "login page", "auth design"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-16.png",
      imageAlt: "Login UI Design",
      projectId: "auth-ui"
    },
    answer: "A minimal authentication UI with modern gradients & clean structure."
  },
  {
    id: 121,
    topic: "projects",
    keywords: ["profile ui", "user profile page", "profile design", "user profile", "profile page", "account page"],
    preview: {
      hasImage: true,
      imageSrc: "/project/project-17.png",
      imageAlt: "Profile Page UI",
      projectId: "profile-ui"
    },
    answer: "A fresh profile UI layout with cover image, stats, and smooth grouping."
  },
  {
    id: 122,
    topic: "projects",
    keywords: ["more projects", "show more", "show all", "more designs", "see more", "additional projects", "other projects", "all projects"],
    preview: {
      hasLottie: true,
      lottieData: behanceData,
      externalUrl: "https://www.behance.net/namilapreshan1"
    },
    answer: "Explore the full collection on Behance 👇"
  },
  {
    id: 123,
    topic: "projects",
    keywords: ["best project", "favorite project", "top project", "best work", "favorite work", "top work", "proudest project"],
    answer: "My top project is this one 👇",
    triggerProject: true
  },
  {
    id: 124,
    topic: "projects",
    keywords: ["recent project", "latest work", "latest project", "recent work", "newest project", "new work", "current project"],
    answer: "Here's one of my latest explorations 👇",
    triggerProject: true
  },
  {
    id: 125,
    topic: "projects",
    keywords: ["ui case study", "case study", "design case study", "project case study", "detailed project", "project breakdown"],
    answer: "Here’s a UI case study from my portfolio 👇",
    triggerProject: true
  }
  // ... (content remains the same)
];

export const PROJECTS = PROJECTS_QA;
