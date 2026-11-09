"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Timeline } from "../../components/Timeline";
import ShinyText from "../../components/reactbits/ShinyText";
import SpotlightCard from "../../components/reactbits/SpotlightCard";

const renderIcon = (type) => {
  switch (type) {
    case "engineering":
      return (
        <svg
          className="w-6 h-6 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M16 18l6-6-6-6M8 6l-6 6 6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 2v20" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "credentials":
      return (
        <svg
          className="w-6 h-6 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 11l2 2 4-4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "leadership":
      return (
        <svg
          className="w-6 h-6 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon
            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

const renderStackIcon = (type) => {
  switch (type) {
    case "figma":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
          <path d="M12 9h3.5a3.5 3.5 0 0 1 0 7H12V9z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        </svg>
      );
    case "react":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <ellipse cx="12" cy="12" rx="11" ry="4.2" />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.2"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="11"
            ry="4.2"
            transform="rotate(120 12 12)"
          />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );
    case "angular":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <polygon points="12 2 22 5.75 19.8 17.5 12 22 4.2 17.5 2 5.75 12 2" />
          <polygon
            points="12 4.5 17.5 15.5 15 15.5 12 8.5 9 15.5 6.5 15.5 12 4.5"
            fill="currentColor"
            fillOpacity="0.1"
          />
        </svg>
      );
    case "next":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M8 16V8l8 8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 8v8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "tailwind":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M12 3c-1.2 0-2.4.6-3.3 1.6-1.5 1.7-1.5 3.9 0 5.4.3.3.7.5 1.1.6-.2.4-.3.9-.3 1.4 0 1.2.6 2.4 1.6 3.3 1.7 1.5 3.9 1.5 5.4 0 .3-.3.5-.7.6-1.1.4.2.9.3 1.4.3 1.2 0 2.4-.6 3.3-1.6 1.5-1.7 1.5-3.9 0-5.4-.3-.3-.7-.5-1.1-.6.2-.4.3-.9.3-1.4 0-1.2-.6-2.4-1.6-3.3-1.7-1.5-3.9-1.5-5.4 0-.3.3-.5.7-.6 1.1-.4-.2-.9-.3-1.4-.3z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "typescript":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path
            d="M8 8h6M11 8v10M17 12c0-1.5-1-2-2-2s-2 .5-2 2 1 2 2 2 2 .5 2 2-1 2-2 2-2-.5-2-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "javascript":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path
            d="M8 15c0 1.5 1 2 2 2s2-.5 2-2v-4M15 15c0 1.5 1 2 2 2s2-.5 2-2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "scss":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10-4.5 10-10 10z" />
          <path
            d="M16.5 9.5c-.8-1.2-2.2-2-3.8-2-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5c1.6 0 3-.8 3.8-2M13.5 12h-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "git":
      return (
        <svg
          className="w-8 h-8 text-accent shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="12" cy="12" r="3" />
          <path d="M6 9v3a3 3 0 0 0 3 3h3" />
          <path d="M18 15V9" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return null;
  }
};

const renderSkillIcon = (type) => {
  switch (type) {
    case "research":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <circle
            cx="11"
            cy="11"
            r="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m21 21-4.3-4.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="11"
            cy="11"
            r="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "design":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case "figma":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
          <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
          <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
          <path d="M12 9h3.5a3.5 3.5 0 0 1 0 7H12V9z" />
          <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
        </svg>
      );
    case "systems":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M12 2L2 7l10 5 10-5-10-5Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 17l10 5 10-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12l10 5 10-5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "react":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <ellipse cx="12" cy="12" rx="10" ry="3.8" />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="3.8"
            transform="rotate(60 12 12)"
          />
          <ellipse
            cx="12"
            cy="12"
            rx="10"
            ry="3.8"
            transform="rotate(120 12 12)"
          />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "code":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M16 18l6-6-6-6M8 6l-6 6 6 6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "typescript":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="M8 3H7a2 2 0 0 0-2 2v3a4 4 0 0 1-4 4 4 4 0 0 1 4 4v3a2 2 0 0 0 2 2h1M16 3h1a2 2 0 0 1 2 2v3a4 4 0 0 0 4 4 4 4 0 0 0-4 4v3a2 2 0 0 1-2 2h-1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "handoff":
      return (
        <svg
          className="w-5 h-5 text-accent"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            d="m17 21 4-4-4-4M3 14h7a5 5 0 0 0 5-5V3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m7 3-4 4 4 4M21 10h-7a5 5 0 0 0-5 5v5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default function About() {
  const aboutHeroRef = useRef(null);
  const educationVideoRef = useRef(null);
  const experienceVideoRef = useRef(null);
  const experienceSectionRef = useRef(null);

  const handleEducationEnded = () => {
    experienceSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    if (educationVideoRef.current) {
      educationVideoRef.current.loop = true;
      educationVideoRef.current.play().catch((err) => console.log(err));
    }
  };

  const handleExperienceEnded = () => {
    if (experienceVideoRef.current) {
      experienceVideoRef.current.loop = true;
      experienceVideoRef.current.play().catch((err) => console.log(err));
    }
  };

  const { scrollYProgress: aboutHeroScrollProgress } = useScroll({
    target: aboutHeroRef,
    offset: ["start start", "end start"],
  });

  const aboutHeroBgY = useTransform(
    aboutHeroScrollProgress,
    [0, 1],
    ["0%", "20%"],
  );
  const aboutHeroTextY = useTransform(
    aboutHeroScrollProgress,
    [0, 1],
    [0, -100],
  );

  const scrollContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start center", "end center"],
  });
  const pathLength = useTransform(scrollYProgress, [0.02, 0.98], [0, 1]);

  const experienceData = [
    {
      year: "2026",
      duration: "JAN 2026 – PRESENT",
      company: "Epic Lanka Technologies",
      role: "UI/UX Engineer",
      points: [
        "Drive end-to-end UI/UX design and React.js front-end development for a high-stakes confidential fintech platform.",
        "Set design direction and interaction frameworks for CRM and Document Management Systems.",
        "Scale product impact by taking full ownership of stakeholder alignment, advanced design systems, and frontend delivery.",
      ],
    },
    {
      year: "2025",
      duration: "JAN 2025 – DEC 2025",
      company: "Epic Lanka Technologies",
      role: "Associate UI/UX Engineer",
      points: [
        "Took full ownership of UI/UX design and front-end delivery for core fintech transactional systems.",
        "Designed CRM and Document Management tools, translating complex user tasks into frictionless user journeys.",
        "Led user flow audits and optimized steps to improve system usability and task completion rates.",
      ],
    },
    {
      year: "2023",
      duration: "DEC 2023 – DEC 2024",
      company: "Epic Lanka Technologies",
      role: "Intern UI/UX Engineer",
      points: [
        "Architected a unified Figma design system from scratch, reducing UI development speeds by ~20%.",
        "Coded responsive, production-ready front-end layouts using Angular, SCSS, and HTML5 components.",
        "Executed design quality reviews and interactive usability testing for iterative interface tuning.",
      ],
    },
  ];

  const timelineData = experienceData.map((exp) => ({
    title: exp.year,
    content: (
      <SpotlightCard
        className="flex flex-col gap-3 hover:border-accent/30 transition-colors cursor-pointer"
        spotlightColor="rgba(255, 75, 43, 0.12)"
      >
        <div className="relative z-10 flex flex-col gap-3">
          <span className="text-accent text-xs font-semibold tracking-widest uppercase font-geist">
            {exp.duration}
          </span>
          <h3 className="font-geist font-black text-xl md:text-2xl text-white">
            {exp.company}
          </h3>
          <span className="text-white/60 text-xs md:text-sm font-semibold uppercase tracking-wider block">
            {exp.role}
          </span>
          <ul className="flex flex-col gap-2.5 text-muted text-xs md:text-sm mt-3 leading-relaxed">
            {exp.points.map((point, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <span className="text-accent font-bold mt-1 text-[10px] shrink-0">
                  +
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    ),
  }));

  const educationData = [
    {
      id: "eng",
      date: "June 2020 – June 2024",
      title: "BSc (Hons) in Information Technology",
      institution: "Sri Lanka Institute of Information Technology (SLIIT)",
      description:
        "Gained a strong foundation in software engineering, application development, and human-computer interaction, focusing on building high-performance digital experiences.",
      type: "engineering",
    },
    {
      id: "cred",
      date: "Licenses & Credentials",
      title: "Professional Certifications",
      institution: "Google, Sololearn, LinkedIn & Udemy",
      description:
        "Google Foundations of UX Design, Sololearn Angular Certification, LinkedIn Figma for UX Design, and Udemy HTML, CSS & Bootstrap responsive web development.",
      type: "credentials",
    },
    {
      id: "leader",
      date: "Feb 2026 – Present",
      title: "President",
      institution: "Epic Sports & Recreation Club",
      description:
        "Leading and executing strategic initiatives to drive employee engagement and build a vibrant company culture at Epic. Collaborating closely with internal management, cross-functional teams, and external vendors to deliver high-impact corporate events, while managing resource allocation and mentoring the executive committee.",
      type: "leadership",
      badge: "PRESIDENT",
    },
  ];

  const stacksData = [
    { name: "Figma", type: "figma" },
    { name: "React.js", type: "react" },
    { name: "Angular", type: "angular" },
    { name: "Next.js", type: "next" },
    { name: "Tailwind CSS", type: "tailwind" },
    { name: "TypeScript", type: "typescript" },
    { name: "JavaScript", type: "javascript" },
    { name: "SCSS / SASS", type: "scss" },
    { name: "Git Versioning", type: "git" },
  ];

  const skillsData = [
    { name: "User Research & Usability Testing", icon: "research" },
    { name: "Visual Design & Interaction Design", icon: "design" },
    { name: "Figma Prototyping & Journey Mapping", icon: "figma" },
    { name: "Design Systems Architecture", icon: "systems" },
    { name: "React.js & Next.js Frameworks", icon: "react" },
    { name: "HTML5, CSS/SCSS & Tailwind CSS", icon: "code" },
    { name: "JavaScript, ES6 & TypeScript", icon: "typescript" },
    { name: "Zeplin & Developer Handoff", icon: "handoff" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <div className="bg-[#0a0a0a] overflow-hidden">
      {/* Hero Wrapper with Background Image */}
      <div
        ref={aboutHeroRef}
        className="relative w-full h-[100vh] overflow-hidden "
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-[120%] pointer-events-none z-0">
          <motion.img
            src="/images/about-bg.png"
            alt="About Background"
            style={{ y: aboutHeroBgY }}
            className="w-full h-full object-cover opacity-80 absolute top-0 left-0"
          />
          {/* Gradients to blend into background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
          {/* Extra bottom scrim so the body text stays legible over the photo on narrow screens, where the text block covers more of the image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent z-10 md:hidden" />
        </div>

        {/* Hero */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 pt-8 pb-16 relative z-20 min-h-[100vh] flex items-end">
          <motion.div
            style={{ y: aboutHeroTextY }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end w-full"
          >
            {/* Left Text */}
            <div className="lg:col-span-8">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-[10px] font-semibold text-accent uppercase tracking-widest"
              >
                (ABOUT ME)
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.3,
                }}
                className="font-anton text-4xl md:text-7xl uppercase tracking-tight text-white leading-[0.95] mt-4 max-w-4xl"
              >
                Crafting the
                <br />
                <ShinyText text="Invisible Architecture" speed={4} />
              </motion.h1>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-muted text-base md:text-base leading-relaxed max-w-3xl mt-8 flex flex-col gap-6"
              >
                <p>
                  My approach to digital products is rooted in a simple belief:
                  code should never fight design, and design should never ignore
                  technical reality. Holding an engineering background allows me
                  to translate complex wireframes into modular, scalable
                  architectures without losing an ounce of visual intent.
                </p>
                <p>
                  I look past static layouts to prioritize motion design,
                  states, and architectural patterns. Whether architecting
                  scalable design systems or optimizing front-end performance, I
                  focus on building intuitive, cohesive experiences that drive
                  engagement and feel completely seamless to the end user.
                </p>
              </motion.div>
            </div>

            {/* Right Image */}
            {/* <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="lg:col-span-4 flex justify-center"
            >
              <FollowerPointerCard title="Namila Preshan">
              <div className="relative aspect-[3/4] w-[320px] md:w-[360px] rounded-2xl overflow-hidden border border-[#333] shadow-[0_20px_50px_rgba(0,0,0,0.6)] group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
                <img
                  src="/images/namila1.png"
                  alt="Namila Preshan Rupasinghe"
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 relative z-0"
                />
              </div>
              </FollowerPointerCard>
            </motion.div> */}
          </motion.div>
        </section>
      </div>

      {/* Scroll-linked background glowing path container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-visible"
      >
        {/* Winding glowing scroll line */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Multi-layered high-intensity neon glow filter */}
            <filter
              id="scroll-line-glow"
              x="-100%"
              y="-100%"
              width="300%"
              height="300%"
            >
              <feGaussianBlur stdDeviation="1.2" result="blur1" />
              <feGaussianBlur stdDeviation="3.0" result="blur2" />
              <feGaussianBlur stdDeviation="6.0" result="blur3" />
              <feMerge>
                <feMergeNode in="blur3" />
                <feMergeNode in="blur2" />
                <feMergeNode in="blur1" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Vertical linear gradient linking sections together with seamless color progression */}
            <linearGradient
              id="line-gradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ff4925" />{" "}
              {/* Vibrant Red-Orange at Education */}
              <stop offset="50%" stopColor="#ff7b25" />{" "}
              {/* Bright Orange at Experience */}
              <stop offset="100%" stopColor="#ffbe25" />{" "}
              {/* Golden Yellow at Skills & Stack */}
            </linearGradient>
          </defs>

          {/* Static background connected guide lines (3 solid tracks - always visible, 22% & 12% opacity) */}
          <path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="rgba(255, 73, 37, 0.22)"
            strokeWidth="0.8"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="rgba(255, 73, 37, 0.12)"
            strokeWidth="0.5"
            transform="translate(0.8, 0)"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="rgba(255, 73, 37, 0.12)"
            strokeWidth="0.5"
            transform="translate(-0.8, 0)"
            vectorEffect="non-scaling-stroke"
          />

          {/* Animated glowing main highlight (draws dynamically on scroll) */}
          <motion.path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="2.2"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
            filter="url(#scroll-line-glow)"
          />

          {/* Inner companion highlights (Right & Left) */}
          <motion.path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="0.8"
            opacity="0.6"
            transform="translate(0.8, 0)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />
          <motion.path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="0.8"
            opacity="0.6"
            transform="translate(-0.8, 0)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />

          {/* Outer companion highlights (Right & Left) */}
          <motion.path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="0.5"
            opacity="0.25"
            transform="translate(1.6, 0)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />
          <motion.path
            d="M 80,0 C 80,4 25,6 35,12 C 45,18 80,18 75,25 C 70,32 15,35 30,42 C 45,49 95,50 95,58 C 95,65 5,62 10,70 C 15,78 95,76 80,84 C 65,92 10,90 20,95 C 30,100 80,98 80,100"
            fill="none"
            stroke="url(#line-gradient)"
            strokeWidth="0.5"
            opacity="0.25"
            transform="translate(-1.6, 0)"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength }}
          />
        </svg>

        {/* Education */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-24 relative z-10">
          {/* Background Video parent div with gradient border and backlight glow */}
          <div className="absolute top-36 right-0 w-[480px] sm:w-[580px] md:w-[680px] lg:w-[780px] aspect-video pointer-events-none z-0 opacity-50 select-none p-[1px]">
            {/* Ambient backlight glow behind the parent */}
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,#0a0a0a),transparent_50%)] z-[-1] blur-xl" />

            <div className="relative w-full h-full overflow-hidden">
              <video
                ref={educationVideoRef}
                src="/videos/education.mp4"
                autoPlay
                muted
                playsInline
                onEnded={handleEducationEnded}
                className="w-full h-full object-cover"
              />
              {/* Soft gradients to blend the video smoothly into the dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full mb-16 relative z-10"
          >
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest block mb-4">
              (EDUCATION & LEADERSHIP)
            </span>
            <h2 className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] select-none">
              Academic
              <br />
              Foundation
            </h2>
            <p className="text-muted text-base leading-relaxed mt-6 max-w-2xl">
              Bridging engineering rigor with design empathy. My academic
              background and leadership roles anchor my interaction frameworks,
              organization logic, and collaborative approach.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-10"
          >
            {educationData.map((item) => (
              <motion.div
                key={item.id}
                variants={revealVariants}
                className={`h-full ${item.type === "leadership" ? "md:col-span-2 lg:col-span-1" : ""}`}
              >
                <SpotlightCard
                  className="flex flex-col gap-5 hover:border-accent/30 transition-colors cursor-pointer h-full"
                  spotlightColor="rgba(255, 75, 43, 0.12)"
                >
                  <div className="flex justify-between items-start w-full relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-[#181818] border border-[#333] flex items-center justify-center text-accent shrink-0">
                      {renderIcon(item.type)}
                    </div>
                    {item.badge && (
                      <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-accent/20 border border-accent text-accent rounded-full leading-none mt-1">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  <div className="relative z-10 flex-1">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-wider block mb-1">
                      {item.date}
                    </span>
                    <h3 className="font-geist font-bold text-xl text-white mb-1">
                      {item.title}
                    </h3>
                    <span className="text-white/60 text-sm font-semibold uppercase tracking-wider block mb-3">
                      {item.institution}
                    </span>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Experience & Timeline */}
        <section
          ref={experienceSectionRef}
          className="max-w-[1400px] mx-auto px-6 md:px-8 py-24 relative z-10"
        >
          {/* Background Video parent div with gradient border and backlight glow (Placed on the left) */}
          <div className="absolute top-20 left-0 w-[480px] sm:w-[580px] md:w-[680px] lg:w-[780px] aspect-video pointer-events-none z-0 opacity-50 select-none p-[1px]">
            {/* Ambient backlight glow behind the parent */}
            <div className="absolute -inset-10 bg-[radial-gradient(circle_at_center,#0a0a0a),transparent_50%)] z-[-1] blur-xl" />

            <div className="relative w-full h-full overflow-hidden">
              <video
                ref={experienceVideoRef}
                src="/videos/experiance.mp4"
                autoPlay
                muted
                playsInline
                onEnded={handleExperienceEnded}
                className="w-full h-full object-cover"
              />
              {/* Soft gradients to blend the video smoothly into the dark background */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-[#0a0a0a] z-10" />
            </div>
          </div>

          <div className="w-full flex flex-col items-end text-right mb-16 relative z-10">
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest block mb-4">
              (CAREER JOURNEY)
            </span>
            <h2 className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] select-none">
              Experience
            </h2>
          </div>

          <div className="relative z-10">
            <Timeline data={timelineData} />
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-24 flex flex-col gap-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-widest block mb-4">
                (CORE EXPERTISE)
              </span>
              <h2 className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] select-none">
                Skills &
                <br />
                Stack
              </h2>
              <p className="text-muted text-sm leading-relaxed mt-6">
                Translating complex workflow architecture and visual design
                systems into highly optimized, responsive UI code.
              </p>
            </div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
            >
              {skillsData.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={revealVariants}
                  className="h-full"
                >
                  <SpotlightCard
                    className="hover:border-accent/30 transition-colors h-full flex items-center gap-4 py-5 px-6"
                    spotlightColor="rgba(255, 75, 43, 0.12)"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#181818] border border-[#333] flex items-center justify-center text-accent shrink-0 relative z-10">
                      {renderSkillIcon(skill.icon)}
                    </div>
                    <div className="relative z-10 flex-1">
                      <h3 className="font-geist font-bold text-white text-sm md:text-base leading-snug">
                        {skill.name}
                      </h3>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Moving Linear Icons Marquee */}
          <div className="w-full overflow-hidden border-t border-b border-[#333]/30 py-8 relative bg-[#0d0d0d]/30 flex">
            {/* Edge gradient masks for smooth fade-in/fade-out */}
            <div className="absolute inset-y-0 left-0 w-40 md:w-64 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-40 md:w-64 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

            {/* Marquee Group 1 */}
            <div className="flex gap-16 shrink-0 animate-marquee pr-16">
              {stacksData.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0"
                >
                  {renderStackIcon(s.type)}
                  <span className="font-geist font-black text-sm tracking-widest uppercase">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Marquee Group 2 (Duplicate for infinite loop) */}
            <div
              className="flex gap-16 shrink-0 animate-marquee pr-16"
              aria-hidden="true"
            >
              {stacksData.map((s, idx) => (
                <div
                  key={`dup-${idx}`}
                  className="flex items-center gap-4 text-white/50 hover:text-white transition-colors duration-300 select-none shrink-0"
                >
                  {renderStackIcon(s.type)}
                  <span className="font-geist font-black text-sm tracking-widest uppercase">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
