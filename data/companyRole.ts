// /data/companyRole.ts

export interface CurrentRoleQA {
  id: number;
  topic: string;
  keywords: string[];
  answer: string;
}

export const CURRENT_ROLE_DATA: CurrentRoleQA[] = [
  /* ---------------------------------------------------
     YOUR CURRENT ROLE — GENERAL
  --------------------------------------------------- */
  {
    id: 500,
    topic: "current-role",
    keywords: [
      "where do you work",
      "your job",
      "your role",
      "what is your job",
      "current job",
      "current role",
      "what do you do at work",
      "job role",
      "working where",
      "current position",
      "job position"
    ],
    answer:
      "I currently work as a <b>UI/UX Designer & Frontend Developer</b>, focusing on creating clean, functional, and visually engaging digital experiences. My work spans mobile apps, web apps, dashboards, and modern frontend interfaces."
  },

  {
    id: 501,
    topic: "current-role",
    keywords: ["profession", "professional title"],
    answer:
      "My profession combines two fields: <b>UI/UX Design</b> and <b>Frontend Development</b>. I design user interfaces, plan user journeys, and also turn those designs into responsive, production-ready UI."
  },

  /* ---------------------------------------------------
     RESPONSIBILITIES AT WORK
  --------------------------------------------------- */
  {
    id: 502,
    topic: "work-responsibilities",
    keywords: [
      "what are your responsibilities",
      "what tasks do you do",
      "daily tasks",
      "day to day work"
    ],
    answer:
      "I handle the full design-to-dev, UI/UX design, wireframing, prototyping, design systems, and frontend development with React/Next.js. Basically everything from concept to code."
  },

  /* ---------------------------------------------------
     ROLE EMPHASIS
  --------------------------------------------------- */
  {
    id: 504,
    topic: "role-emphasis",
    keywords: ["ui designer", "ux designer", "frontend developer"],
    answer:
      "My role sits right in the middle. I'm both a <b>UI/UX Designer</b> and a <b>Frontend Developer</b>. That lets me design with a developer mindset and build with a designer's eye for detail."
  },

  {
    id: 505,
    topic: "team",
    keywords: ["what team are you in", "design team", "your team"],
    answer:
      "I collaborate closely with product managers, developers, and stakeholders to turn ideas into refined interfaces. I often bridge the gap between design and engineering."
  },

  /* ---------------------------------------------------
     PROFESSIONAL POSITIONING
  --------------------------------------------------- */
  {
    id: 506,
    topic: "freelance-status",
    keywords: ["are you a freelancer", "do you freelance", "do you work freelance", "freelance designer", "freelancer"],
    answer:
      "I take on selected freelance and collaborative projects when they align with my interests. especially UI/UX design, app concepts, and modern clean interface work."
  },

  {
    id: 507,
    topic: "availability",
    keywords: ["available for work", "are you available", "available for projects"],
    answer:
      "I'm open to design collaborations, freelance projects, and UI/UX-focused work. If you want to discuss a project, feel free to reach out!"
  }
];

export const COMPANY_ROLE = CURRENT_ROLE_DATA;
