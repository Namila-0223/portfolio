import { ABOUT_YOU } from "./aboutYou";
import { COMPANY_ROLE } from "./companyRole";
import { CONTACT } from "./contact";
import { EDUCATION } from "./education";
import { EXPERIENCE } from "./experience";
import { FUN } from "./fun";
import { PROJECTS } from "./projects";
import { TOOLS } from "./tools";
import { UIUX_THEORY } from "./uiuxTheory";

export type QAItem = {
  id: number;
  topic: string;
  keywords: string[];
  answer: string; // supports simple HTML like <strong> and <br/>
  metadata?: Record<string, any>;
  hasImage?: boolean; // Optional property for image support
  imageSrc?: string;
  imageAlt?: string;
  projectId?: string;
  hasLottie?: boolean;
  lottieData?: any;
  externalUrl?: string;
  hasProfileImage?: boolean;
  profileImageSrc?: string;
  tools?: { name: string; icon: string }[];
  contentType?: string;
  forceAI?: boolean;
};

export const QA_DATA: QAItem[] = [
  // --- 0. GREETINGS & SMALL TALK ---
  {
    id: 100,
    topic: "greeting",
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "yo", "namaste", "ayubowan"],
    answer: "Hi there! 👋 How can I help you today?",
  },
  {
    id: 101,
    topic: "appreciation",
    keywords: ["thanks", "thank you", "thx", "good job", "great", "cool", "awesome", "wow", "nice"],
    answer: "You're welcome! 😊 Glad you liked it.",
  },
  {
    id: 102,
    topic: "bye",
    keywords: ["bye", "goodbye", "see you", "later", "cya"],
    answer: "Bye! Thanks for stopping by. Feel free to reach out anytime.",
  },
  {
    id: 103,
    topic: "how-are-you",
    keywords: ["how are you", "how are you doing", "what's up"],
    answer: "I'm just a portfolio bot, but I'm doing great! 🚀 How about you?",
  },

  // --- MERGED DATA SOURCES ---
  ...ABOUT_YOU,
  ...COMPANY_ROLE,
  ...CONTACT,
  ...EDUCATION,
  ...EXPERIENCE,
  ...FUN,
  ...PROJECTS,
  ...TOOLS,
  ...UIUX_THEORY
];
