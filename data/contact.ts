// types
export interface ContactItem {
  id: number;
  topic: string;
  keywords: string[];
  answer: string;
  triggerContactForm?: boolean;
}

// data
export const CONTACT_DATA: ContactItem[] = [
  /* ---------------------------------------------------
       GENERAL CONTACT
    --------------------------------------------------- */
  {
    id: 300,
    topic: "contact",
    keywords: ["contact you", "how to contact", "can we talk", "reach you", "your contact", "get in touch", "contact info", "how can i contact", "reach out", "contact details"],
    answer: "Sure! You can send me a message right here. Just fill out this quick form 😊",
    triggerContactForm: true,
  },


  {
    id: 301,
    topic: "contact",
    keywords: ["send message", "message you", "write to you", "send you message", "drop message", "leave message"],
    answer: "Absolutely! Drop your details below and I'll get back to you soon.",
    triggerContactForm: true,
  },

  {
    id: 302,
    topic: "contact",
    keywords: ["hire you", "work with you", "hire u", "work together", "want to hire", "hiring", "employ you", "work with"],
    answer: "I'd love to hear about your project! Share a few details using the form below 👇",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       PROJECT INQUIRY
    --------------------------------------------------- */
  {
    id: 303,
    topic: "contact",
    keywords: ["start project", "new project", "can you do a project", "i have a project", "project inquiry", "begin project", "project request"],
    answer: "Great! Tell me a bit about your project using the form and I'll get in touch.",
    triggerContactForm: true,
  },

  {
    id: 304,
    topic: "contact",
    keywords: ["ui ux project", "design project", "ui project", "ux project", "design work"],
    answer: "I’d be happy to help with your design project. Send me some details through the form below!",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       PRICING
    --------------------------------------------------- */
  {
    id: 305,
    topic: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "your rates", "what do you charge", "fees", "budget", "quote", "estimate"],
    answer:
      "My pricing depends on the project scope. Share the details through the form and I’ll send you a tailored estimate 😊",
    triggerContactForm: true,
  },

  {
    id: 306,
    topic: "pricing",
    keywords: ["ui ux cost", "website cost", "design cost", "how much ui", "design pricing", "ui pricing", "website price"],
    answer:
      "Cost varies depending on complexity, features, and timelines. Fill out the form so I can give you an accurate quote.",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       AVAILABILITY
    --------------------------------------------------- */
  {
    id: 307,
    topic: "availability",
    keywords: ["are you available", "your availability", "free now", "available now", "availability", "can you start", "when available"],
    answer:
      "I take on a limited number of projects each month, but feel free to send your details — I’ll confirm availability asap.",
    triggerContactForm: true,
  },

  {
    id: 308,
    topic: "availability",
    keywords: ["when can you start", "start date", "starting date", "when to start", "project start"],
    answer:
      "Start dates vary depending on ongoing work. Share your project details and I’ll get back with a timeline!",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       COLLABORATION
    --------------------------------------------------- */
  {
    id: 309,
    topic: "collab",
    keywords: ["collab", "collaboration", "partner", "join project", "collaborate", "work together", "partnership"],
    answer: "I’m open to collaborations! Tell me more about your idea through the form below.",
    triggerContactForm: true,
  },

  {
    id: 310,
    topic: "collab",
    keywords: ["team up", "work together on", "join forces", "collaborate on"],
    answer: "Sounds interesting! Share some details and I’ll get back to you soon.",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       BUSINESS INQUIRIES
    --------------------------------------------------- */
  {
    id: 311,
    topic: "business",
    keywords: ["business inquiry", "proposal", "offer", "partnership", "business proposal", "business offer"],
    answer: "Please share your inquiry through the contact form — I usually respond within 24 hours.",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       SUPPORT / HELP
    --------------------------------------------------- */
  {
    id: 312,
    topic: "support",
    keywords: ["help me", "support", "need assistance", "need help", "can you help", "assistance"],
    answer: "I’d be happy to help — let me know what you need using the form!",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       FREELANCE STATUS
    --------------------------------------------------- */
  {
    id: 313,
    topic: "freelance",
    keywords: ["are you freelance", "freelance designer", "freelancer", "freelance", "do you freelance"],
    answer: "Yes! I do freelance work. You can contact me using the form below 👇",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       FOLLOW-UP QUESTIONS
    --------------------------------------------------- */
  {
    id: 314,
    topic: "contact",
    keywords: ["email", "your email", "email address", "contact email", "email id"],
    answer: "You can reach me directly through this form — I respond quickly 😊",
    triggerContactForm: true,
  },

  {
    id: 315,
    topic: "contact",
    keywords: ["send details", "give details", "share details", "provide details"],
    answer: "Sure! Use this form to send me the project details.",
    triggerContactForm: true,
  },

  {
    id: 316,
    topic: "contact",
    keywords: ["book", "booking", "schedule", "book you", "schedule meeting", "appointment"],
    answer: "You can book a project by sharing your info in the contact form.",
    triggerContactForm: true,
  },

  /* ---------------------------------------------------
       100% CUSTOM ANSWERS (NO FORM TRIGGER)
    --------------------------------------------------- */
  {
    id: 317,
    topic: "contact",
    keywords: ["just saying hi", "hi", "hello", "hey", "greetings"],
    answer: "Hey! 😊 How can I help you today?",
    triggerContactForm: false,
  },

  {
    id: 318,
    topic: "contact",
    keywords: ["i don't want to fill", "no form", "skip form", "without form", "don't want form"],
    answer: "No problem! You can tell me here — but for project inquiries, I may still ask some details 😊",
    triggerContactForm: false,
  },
];

export const CONTACT = CONTACT_DATA;
