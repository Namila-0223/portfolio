"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import Link from "next/link";
import ShinyText from "../components/reactbits/ShinyText";
import { cn } from "../utils/cn";
import {
  Figma,
  Atom,
  Shield,
  Code,
  Wind,
  Component,
  PenTool,
  GitBranch,
  Monitor,
  Layers,
} from "lucide-react";

// Spring-based count-up stat counter
function Counter({ value, suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 25, stiffness: 45 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest);
      }
    });
  }, [springValue]);

  return (
    <span className="inline-flex items-baseline">
      <span ref={ref}>0</span>
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  );
}

// Word-reveal sub-component to comply with React Rules of Hooks
function ScrollRevealWord({ word, start, end, scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-white">
      {word}
    </motion.span>
  );
}

// Scroll-reveal text component for the About section
function ScrollRevealText({ text, sectionRef }) {
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const words = text.split(" ");
  const rangeStart = 0.1;
  const rangeEnd = 0.85;
  const rangeLength = rangeEnd - rangeStart;

  return (
    <p className="font-geist font-bold text-3xl md:text-[48px] leading-[1.25] text-white flex flex-wrap justify-center gap-x-3 gap-y-2">
      {words.map((word, i) => {
        const start = rangeStart + (i / words.length) * rangeLength;
        const end = rangeStart + ((i + 1) / words.length) * rangeLength;
        return (
          <ScrollRevealWord
            key={i}
            word={word}
            start={start}
            end={end}
            scrollYProgress={scrollYProgress}
          />
        );
      })}
    </p>
  );
}

// 3D Split-flap Flip clock component for the active project index
function FlipNumber({ number }) {
  return (
    <div
      className="h-[120px] md:h-[160px] overflow-hidden relative flex items-center select-none animate-perspective w-full"
      style={{ perspective: 400 }}
    >
      <AnimatePresence>
        <motion.div
          key={number}
          initial={{ rotateX: -85, y: 60, opacity: 0 }}
          animate={{ rotateX: 0, y: 0, opacity: 1 }}
          exit={{ rotateX: 85, y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            transformOrigin: "center center -40px",
            backfaceVisibility: "hidden",
          }}
          className="font-anton text-[120px] md:text-[160px] leading-none text-[#181818] tracking-tight absolute inset-0 flex items-center"
        >
          {number}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Individual scrolling card for the Latest Work section
function LatestWorkCard({ index, work, setActiveWork }) {
  const ref = useRef(null);

  // Detect when this card is in the center of the viewport to update left sidebar state
  const isInView = useInView(ref, {
    margin: "-40% 0px -40% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveWork(index);
    }
  }, [isInView, index, setActiveWork]);

  // Scroll progress for this specific card to animate its image zoom
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Zooms in as the card comes up from the bottom of the viewport
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.92, 1.06]);

  return (
    <div ref={ref} className="relative w-full flex flex-col gap-6 select-none">
      {/* Mockup Card image */}
      <div className="w-full aspect-[16/9] max-h-[660px] relative origin-bottom-right">
        <motion.div
          style={{
            scale: cardScale,
            transformOrigin: "bottom right",
          }}
          className="w-full h-full max-h-[660px] rounded-2xl overflow-hidden bg-[#111] border border-[#333] relative origin-bottom-right shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
        >
          <img
            src={work.image}
            alt={work.title}
            className="w-full h-full object-cover scale-[1.01]"
          />
          <div className="absolute top-5 left-5 z-20">
            <span className="bg-[#0a0a0acc] backdrop-blur border border-[#333] px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase text-accent">
              {work.cat}
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// List of icons to float in the background of the About section mapped directly to Namila's professional stack
const ABOUT_ICONS = [
  {
    id: 1,
    icon: Figma,
    className: "top-[15%] left-[8%] md:left-[12%]",
    color: "#F24E1E",
  }, // Figma Red-Orange (UI/UX)
  {
    id: 2,
    icon: Atom,
    className: "top-[18%] right-[8%] md:right-[12%]",
    color: "#61DAFB",
  }, // React.js Blue (Front-End)
  {
    id: 3,
    icon: Shield,
    className: "bottom-[18%] left-[10%] md:left-[15%]",
    color: "#DD0031",
  }, // Angular Shield Red (Front-End)
  {
    id: 4,
    icon: Code,
    className: "bottom-[20%] right-[10%] md:right-[15%]",
    color: "#F7DF1E",
  }, // JS/ES6 Yellow (Front-End)
  {
    id: 5,
    icon: Wind,
    className: "top-[8%] left-[45%] md:left-[35%]",
    color: "#38BDF8",
  }, // Tailwind CSS Cyan (Styling)
  {
    id: 6,
    icon: Component,
    className: "bottom-[8%] left-[45%] md:left-[42%]",
    color: "#10B981",
  }, // Design System Components Green
  {
    id: 7,
    icon: PenTool,
    className: "top-[48%] left-[6%] md:left-[10%]",
    color: "#FF9A00",
  }, // Illustrator Pen Amber (Vectors)
  {
    id: 8,
    icon: GitBranch,
    className: "top-[50%] right-[6%] md:right-[10%]",
    color: "#F1502F",
  }, // Git/GitHub Red (Version Control)
  {
    id: 9,
    icon: Monitor,
    className: "bottom-[45%] left-[12%] md:left-[22%] hidden md:block",
    color: "#A855F7",
  }, // Responsive Desktop Workspace Purple
  {
    id: 10,
    icon: Layers,
    className: "bottom-[42%] right-[12%] md:right-[22%] hidden md:block",
    color: "#3B82F6",
  }, // Design Layout Layers Blue
];

// Individual floating icon component with cursor repulsion physics
const FloatingIcon = ({ mouseX, mouseY, iconData, index }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  useEffect(() => {
    const handleMouseMove = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX.current - (rect.left + rect.width / 2), 2) +
            Math.pow(mouseY.current - (rect.top + rect.height / 2), 2),
        );

        if (distance < 150) {
          const angle = Math.atan2(
            mouseY.current - (rect.top + rect.height / 2),
            mouseX.current - (rect.left + rect.width / 2),
          );
          const force = (1 - distance / 150) * 50;
          x.set(-Math.cos(angle) * force);
          y.set(-Math.sin(angle) * force);
        } else {
          x.set(0);
          y.set(0);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  const IconComponent = iconData.icon;

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("absolute pointer-events-none", iconData.className)}
    >
      <motion.div
        className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 p-3 rounded-2xl shadow-xl bg-surface/85 backdrop-blur-md border transition-all duration-300"
        style={{
          borderColor: `${iconData.color}35`,
          boxShadow: `0 8px 30px -10px ${iconData.color}25, inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`,
        }}
        animate={{
          y: [0, -6, 0, 6, 0],
          x: [0, 4, 0, -4, 0],
          rotate: [0, 3, 0, -3, 0],
        }}
        transition={{
          duration: 5 + Math.random() * 5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      >
        <IconComponent
          className="w-6 h-6 md:w-8 md:h-8 filter drop-shadow-[0_2px_8px_rgba(255,255,255,0.05)]"
          style={{ color: iconData.color }}
        />
      </motion.div>
    </motion.div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const aboutMouseX = useRef(0);
  const aboutMouseY = useRef(0);
  const handleAboutMouseMove = (event) => {
    aboutMouseX.current = event.clientX;
    aboutMouseY.current = event.clientY;
  };
  const aboutRef = useRef(null);
  const latestWorkRef = useRef(null);
  const [activeWork, setActiveWork] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Fail-safe to ensure video background fades in even if loadeddata event is cached/blocked
    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const heroRef = useRef(null);
  const processRef = useRef(null);
  const processCardsRef = useRef(null);
  const [processScrollDist, setProcessScrollDist] = useState(900);

  useEffect(() => {
    const measure = () => {
      if (processCardsRef.current) {
        const el = processCardsRef.current;
        setProcessScrollDist(Math.max(0, el.scrollWidth - el.clientWidth));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll parallax linking
  const { scrollY, scrollYProgress } = useScroll();

  // Track scroll position of the Hero section (0 to 1)
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero section scroll parallax transforms
  const heroVideoY = useTransform(heroScrollProgress, [0, 1], ["0%", "12%"]);
  const heroTextY = useTransform(heroScrollProgress, [0, 1], [0, -150]);
  const heroTextOpacity = useTransform(heroScrollProgress, [0, 0.8], [1, 0]);
  const heroBottomY = useTransform(heroScrollProgress, [0, 1], [0, -100]);
  const heroBottomOpacity = useTransform(heroScrollProgress, [0, 0.7], [1, 0]);

  // Track scroll position of the entire Latest Work section
  const { scrollYProgress: sectionProgress } = useScroll({
    target: latestWorkRef,
    offset: ["start start", "end start"],
  });

  // Process section: scroll-driven horizontal translation
  const { scrollYProgress: processScrollProgress } = useScroll({
    target: processRef,
    offset: ["start start", "end end"],
  });
  const processCardsX = useTransform(
    processScrollProgress,
    [0, 1],
    [0, -processScrollDist],
  );

  // Other transform values
  const pricingX = useTransform(scrollYProgress, [0.4, 0.8], [180, -120]);
  const faqX = useTransform(scrollYProgress, [0.6, 1], [-120, 180]);

  const works = [
    {
      title: "Fintech Hub",
      desc: "End-to-end design & React.js implementation for a high-stakes secure transactional platform",
      image: "/images/project-arjuna.png",
      cat: "Product Design",
    },
    {
      title: "EnvMonitor",
      desc: "High-fidelity interactive environmental data visualization dashboard built in Figma",
      image: "/images/project-bima.png",
      cat: "Interaction UX",
    },
    {
      title: "CRM Portal",
      desc: "Re-architected multi-step user flow & document tracking portal reducing cognitive load",
      image: "/images/project-mandala.png",
      cat: "Mobile App UX",
    },
  ];

  const services = [
    {
      num: "01",
      title: "Product Design (UI/UX)",
      desc: "Crafting highly functional, beautiful, and intuitive interfaces for web & mobile platforms.",
      tags: ["Figma UI", "Mobile Apps", "Web Platforms", "SaaS Interfaces"],
    },
    {
      num: "02",
      title: "Interaction Design",
      desc: "Thoughtful micro-interactions, custom animations, and responsive visual systems that make products feel alive.",
      tags: [
        "Micro-interactions",
        "Scroll Effects",
        "Framer Motion",
        "Interaction Easing",
      ],
    },
    {
      num: "03",
      title: "User Research & UX Flow",
      desc: "Mapping user behaviors, defining user journeys, and wireframing research-backed layouts.",
      tags: [
        "User Journeys",
        "Wireframing",
        "Information Architecture",
        "UX Research",
      ],
    },
    {
      num: "04",
      title: "Prototyping & Handoff",
      desc: "Supplying developers with organized Figma files, design tokens, and production-ready visual systems.",
      tags: [
        "Figma Tokens",
        "Design Systems",
        "Handoff Files",
        "Production Assets",
      ],
    },
  ];

  const stats = [
    { val: 12, sym: "+", label: "Shipped Modules" },
    { val: 2, sym: "Y+", label: "Years Experience" },
    { val: 20, sym: "%", label: "Reduced Dev Time" },
    { val: 100, sym: "%", label: "Pixel-Perfect Delivery" },
  ];

  const process = [
    {
      num: "01",
      title: "Research & Discovery",
      text: "Understanding user behaviors, mapping pain points, defining product goals, and creating comprehensive research briefs.",
    },
    {
      num: "02",
      title: "UX Flow & Wireframes",
      text: "Structuring high-performance layouts, wireframing interaction paths, and establishing robust, testable user patterns.",
    },
    {
      num: "03",
      title: "UI & Design Systems",
      text: "Crafting pristine visual layouts, styling tokens, typography scale, and unified reusable component libraries.",
    },
    {
      num: "04",
      title: "Prototyping & Handoff",
      text: "Building interactive high-fidelity models and handing over robust Figma files directly to engineering teams.",
    },
  ];

  const testimonials = [
    {
      name: "Mario Baskoro",
      role: "CTO of Arjuna",
      quote:
        "Namila helped us rethink our entire product design system. Our web portal now feels cohesive, modern, and extremely performant.",
    },
    {
      name: "Evelyn Widjaja",
      role: "Product Lead at Bima",
      quote:
        "Working with Namila was like having a dedicated design partner. From initial wireframes to the final Figma handoff, the care and execution was incredible.",
    },
    {
      name: "Karina Wulandari",
      role: "Founder at Batavia",
      quote:
        "His attention to custom micro-interactions and visual hierarchy completely elevated our mobile application conversion.",
    },
  ];

  const packages = [
    {
      name: "Freelance UI/UX",
      desc: "Perfect for dedicated, milestone-based product designs.",
      price: 4999,
      features: [
        "Direct 1-on-1 collaboration",
        "Interactive prototypes",
        "Figma source files",
        "Developer-ready design tokens",
        "Up to 40 hours direct support",
        "Async communication channels",
      ],
    },
    {
      name: "Product Retainer",
      desc: "Perfect for ongoing, scale-ready design support.",
      price: 7999,
      popular: true,
      features: [
        "Dedicated UI/UX design support",
        "Unlimited design requests",
        "Advanced motion interactions",
        "Weekly progress review calls",
        "Up to 70 hours monthly support",
        "Slack & Async collaboration",
      ],
    },
  ];

  const faqs = [
    {
      q: "What tools do you use for design?",
      a: "I primarily design in Figma for UI/UX design, design systems, and wireframing, alongside Adobe Creative Suite for visual assets, and Framer or React for custom web prototypes.",
    },
    {
      q: "How do you collaborate with engineering teams?",
      a: "I supply engineering teams with highly organized Figma source files, tokens-based responsive design systems, interactive prototypes, and precise interaction specifications to make handoff completely seamless.",
    },
    {
      q: "Are you open to full-time remote roles?",
      a: "Yes! I am open to freelance UI/UX contracts, ongoing retainer agreements, as well as full-time remote Product Designer opportunities globally.",
    },
    {
      q: "What is your typical UI/UX design process?",
      a: "My process is user-centered: spanning Research & Discovery, UX Wireframing, custom High-Fidelity UI Design, and Interactive Prototyping/Testing before engineering handoff.",
    },
  ];

  // Viewport stagger animation configs
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 40 },
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
    <div ref={containerRef} className="bg-[#0a0a0a] relative overflow-x-clip">
      {/* ===== HERO ===== */}
      <section
        ref={heroRef}
        className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden pt-16"
      >
        {/* Immersive Video Background with Parallax Scroll */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onLoadedData={() => setVideoLoaded(true)}
            onCanPlay={() => setVideoLoaded(true)}
            onCanPlayThrough={() => setVideoLoaded(true)}
            initial={{ opacity: 0 }}
            animate={{ opacity: videoLoaded ? 0.55 : 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ y: heroVideoY }}
            className="w-full h-[115%] object-cover object-center absolute top-0 left-0"
          >
            <source src="/videos/hero-bg.mp4" type="video/mp4" />
            <source
              src="https://player.vimeo.com/external/435674703.sd.mp4?s=7fdf7054f0a202d0cf3b63b28b7e2898dbf5b61f&profile_id=139&oauth2_token_id=57447761"
              type="video/mp4"
            />
          </motion.video>
          {/* Dark premium gradient overlays (reduced top overlay to maximize video clarity) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/10 to-[#0a0a0a] z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(10,10,10,0.65)_100%)] z-10" />
        </div>

        {/* Slanted text left side slogan with page-load fade/slide skew reveal & scroll parallax */}
        <motion.div
          style={{ y: heroTextY, opacity: heroTextOpacity }}
          className="absolute top-[10%] right-6 md:right-8 z-30 text-left select-none pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, x: -50, skewY: -3 }}
            animate={{ opacity: 1, x: 0, skewY: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          >
            <h2 className="font-inter font-black text-[5vw] md:text-[3.5vw] italic leading-[1.1] text-white/90">
              <ShinyText text="Beyond" speed={4} />
              <br />
              <ShinyText text="Visuals." speed={4} />
              <br />
              <ShinyText text="Built with" speed={4} />
              <br />
              <ShinyText text="Vision." speed={4} />
            </h2>
          </motion.div>
        </motion.div>

        {/* Bottom content with page load reveal & parallax scroll */}
        <motion.div
          style={{ y: heroBottomY, opacity: heroBottomOpacity }}
          className="mt-auto w-full z-30 relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
            className="px-6 md:px-8 pb-6 w-full"
          >
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 relative w-full">
              {/* Separate Left-Bottom Text */}
              <div className="text-left">
                <p className="text-[24px] md:text-[24px] leading-relaxed">
                  <span className="font-semibold text-white">
                    I build digital products, interfaces,
                    <br />
                    and refined experiences{" "}
                    <span className="text-muted">
                      with intention, clarity, and care.
                    </span>
                  </span>
                </p>
              </div>

              {/* Act Button: perfectly centered horizontally under the avatar */}
              <div className="md:absolute md:right-[2%] shrink-0">
                <Link
                  href="/contact"
                  className="border-2 border-accent text-accent hover:bg-accent hover:text-white px-12 py-4 rounded-full font-geist font-bold text-sm md:text-base tracking-wide transition-all duration-300 uppercase flex items-center gap-3 group shrink-0"
                >
                  START A PROJECT
                  <svg
                    className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Logos bar with page load reveal & parallax scroll */}
        {/* Don't Uncomment This */}
        {/* <motion.div
          style={{ y: heroBottomY, opacity: heroBottomOpacity }}
          className="relative z-30 border-t border-[#333] w-full"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ duration: 1, delay: 1 }}
            className="py-5 px-6 md:px-8 flex items-center justify-between gap-8 max-w-[1400px] mx-auto"
          >
            {["LOGOIPSUM", "Logoipsum", "Logoipsum", "Logoipsum"].map(
              (l, i) => (
                <span
                  key={i}
                  className="font-geist font-semibold text-xs md:text-sm tracking-widest text-white uppercase"
                >
                  {l}
                </span>
              ),
            )}
          </motion.div>
        </motion.div> */}
      </section>

      {/* ===== ABOUT SECTION (SCROLL PINNED STICKY CENTRAL) ===== */}
      <div ref={aboutRef} className="relative h-[300vh]">
        <div
          onMouseMove={handleAboutMouseMove}
          className="sticky top-0 h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden px-6 md:px-8"
        >
          {/* Background floating icons */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {ABOUT_ICONS.map((iconData, index) => (
              <FloatingIcon
                key={iconData.id}
                mouseX={aboutMouseX}
                mouseY={aboutMouseY}
                iconData={iconData}
                index={index}
              />
            ))}
          </div>

          {/* Foreground content */}
          <div className="max-w-4xl w-full text-center flex flex-col items-center gap-6 relative z-10">
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest block">
              (ABOUT)
            </span>
            <ScrollRevealText
              sectionRef={aboutRef}
              text="I combine deep UI/UX expertise and interaction design to craft highly functional, story-driven digital products."
            />
          </div>
        </div>
      </div>

      {/* ===== LATEST WORK (SPLIT SCROLL INTERACTIVE) ===== */}
      <section
        ref={latestWorkRef}
        className="relative w-full bg-[#0a0a0a] py-24 md:py-32"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] inline-block relative"
          >
            LATEST WORK
          </motion.h2>
        </div>

        {/* Split Screen Layout */}
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          {/* Left Column: STICKY PANEL */}
          <div className="lg:col-span-4 lg:sticky lg:top-[20vh] lg:h-[70vh] relative h-auto self-start z-20 flex flex-col justify-between py-6">
            <div>
              <FlipNumber number={`0${activeWork + 1}.`} />
              <div className="flex flex-col gap-3 mt-4">
                {works.map((w, i) => (
                  <div
                    key={i}
                    className={`font-geist font-semibold text-lg md:text-xl flex items-center gap-3 transition-colors duration-300 ${
                      activeWork === i ? "text-white" : "text-[#333]"
                    }`}
                  >
                    <span
                      className={`w-4 h-[1px] bg-current inline-block transition-all duration-300 ${
                        activeWork === i
                          ? "scale-x-150 text-accent"
                          : "scale-x-100"
                      }`}
                    />
                    <span>{w.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description at the bottom of the sticky sidebar */}
            <div className="mt-12 h-36 overflow-hidden pr-4 relative w-full">
              <AnimatePresence>
                <motion.div
                  key={activeWork}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 bottom-0 flex flex-col justify-end"
                >
                  <h3 className="font-geist font-black text-4xl md:text-5xl text-white mb-3 tracking-tight">
                    {works[activeWork].title}
                  </h3>
                  <p className="text-muted text-[15px] leading-relaxed max-w-xs">
                    {works[activeWork].desc}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: SCROLLING CARDS */}
          <div className="lg:col-span-8 flex flex-col gap-[35vh]">
            {works.map((w, i) => {
              return (
                <LatestWorkCard
                  key={i}
                  index={i}
                  work={w}
                  setActiveWork={setActiveWork}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8 text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] inline-block relative"
          >
            HOW I CAN HELP
            <span className="text-[10px] font-geist font-medium text-muted absolute -top-3 -right-20 tracking-widest uppercase">
              (SERVICES)
            </span>
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="border-t border-[#333]"
        >
          {services.map((s, i) => {
            const open = activeService === i;
            return (
              <motion.div
                key={i}
                variants={revealVariants}
                className="border-b border-[#333]"
              >
                <button
                  onClick={() => setActiveService(open ? null : i)}
                  className="w-full max-w-[1400px] mx-auto px-6 md:px-8 py-8 flex items-center justify-between group text-left"
                >
                  <div className="flex items-center gap-8 md:gap-20">
                    <span className="font-geist text-2xl md:text-3xl text-[#555] group-hover:text-accent transition-colors font-medium">
                      {s.num}
                      <span className="text-accent">.</span>
                    </span>
                    <span className="font-geist font-semibold text-lg md:text-2xl text-white group-hover:text-[#cacaca] transition-colors">
                      {s.title}
                    </span>
                  </div>
                  <svg
                    className={`w-5 h-5 text-muted transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[1400px] mx-auto px-6 md:px-8 pb-8 pl-16 md:pl-32 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <p className="text-muted text-sm leading-relaxed">
                          {s.desc}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {s.tags.map((t, ti) => (
                            <span
                              key={ti}
                              className="bg-[#181818] border border-[#333] px-4 py-2 rounded-full text-[11px] font-medium text-[#cacaca] tracking-wide"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ===== NUMBERS (WHY US) ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image sweep */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img
            src="/images/why-us-bg.png"
            alt="Why Us Background"
            className="w-full h-full object-cover object-center opacity-60 mix-blend-screen"
          />
          {/* Top gradient fade */}
          <div className="absolute top-0 inset-x-0 h-60 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 relative z-10">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
            {/* Left Title */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="text-[10px] font-semibold text-accent uppercase tracking-widest block mb-4">
                (WHY US)
              </span>
              <h2 className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] select-none">
                NUMBERS
                <br />
                DON'T LIE
              </h2>
            </div>

            {/* Right Subtitle */}
            <div className="lg:col-span-5 lg:self-end">
              <p className="text-[#888] text-sm md:text-base font-geist leading-relaxed max-w-md lg:ml-auto">
                I craft high-performance interactive interfaces, robust design
                systems, and visual layouts that deliver results.
              </p>
            </div>
          </div>

          {/* Horizontal Ruler/Tick-Mark Line */}
          <div className="w-full relative border-t border-[#222]">
            <div
              className="h-2 w-full opacity-40"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #333, #333 1px, transparent 1px, transparent 16px)",
              }}
            />
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full mt-2">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 * (i + 1) }}
                className="border-l border-[#222] pl-6 md:pl-8 py-10 flex flex-col gap-3"
              >
                <h3 className="font-anton text-[12vw] sm:text-[8vw] lg:text-[5vw] text-white leading-none tracking-tight">
                  <Counter value={s.val} />
                  <span className="text-accent">{s.sym}</span>
                </h3>
                <p className="text-muted text-xs md:text-sm leading-relaxed max-w-[200px]">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS ===== */}
      {/* Outer tall wrapper drives the horizontal scroll via vertical scroll progress */}
      <div
        ref={processRef}
        className="relative py-24 md:py-32"
        style={{ height: `${(process.length + 1.5) * 100}vh` }}
      >
        <div className="sticky top-[10vh] md:top-[calc(50vh-275px)] h-[480px] md:h-[550px] overflow-hidden flex">
          {/* Right: motion-translated cards row — driven by scroll progress */}
          <div ref={processCardsRef} className="w-full h-full overflow-hidden">
            <motion.div style={{ x: processCardsX }} className="flex h-full">
              {/* Left heading panel — aligned to top, now scrolls! */}
              <div className="shrink-0 w-[84vw] md:w-[44vw] lg:w-[36vw] flex flex-col justify-start px-8 md:px-12 pt-8 md:pt-12 pb-12">
                <h2 className="w-full flex flex-col">
                  <span className="flex items-start justify-between w-full">
                    <span className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] select-none">
                      MY WORK
                    </span>
                    <span className="text-[10px] font-semibold text-accent uppercase tracking-widest font-geist mb-1.5 md:mb-2">
                      (WORKFLOW)
                    </span>
                  </span>
                  <span className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.95] select-none block">
                    FLOW
                  </span>
                </h2>
              </div>

              {process.map((p, i) => (
                <div
                  key={i}
                  className="relative flex flex-col justify-between border-y border-l last:border-r border-[#333]/50 w-[60vw] md:w-[24vw] shrink-0 p-8 md:p-12 h-full hover:bg-[#0d0d0d] transition-colors duration-300 group"
                >
                  {/* Step number — top */}
                  <div className="flex items-center gap-0.5">
                    <span className="font-geist font-semibold text-s text-[#888] uppercase tracking-widest">
                      STEP {i + 1}
                    </span>
                    <span className="text-accent font-bold text-sm">.</span>
                  </div>

                  {/* Title + description — bottom */}
                  <div className="flex flex-col gap-4 mt-auto">
                    <h3 className="font-inter font-bold text-[8.5vw] md:text-[3vw] lg:text-[2.8vw] text-white tracking-tight leading-[1.05]">
                      {p.title}
                    </h3>
                    <p className="text-[#888] text-s md:text-[16px] leading-relaxed opacity-85">
                      {p.text}
                    </p>
                  </div>

                  {/* Red bottom accent line on hover */}
                  <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-accent transition-all duration-500 ease-out" />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== TESTIMONIALS ===== */}
      {/* <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-8"> */}
      {/* Rating header */}
      {/* <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 md:border-r border-[#333] md:pr-12 shrink-0"
            >
              <span className="text-accent text-2xl">★</span>
              <div>
                <span className="font-geist font-black text-3xl text-white">
                  4.9<span className="text-muted text-lg font-normal">/5</span>
                </span>
                <span className="text-muted text-[10px] font-semibold uppercase tracking-widest block mt-1">
                  300+ Reviews on Clutch
                </span>
              </div>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="font-inter font-black text-2xl md:text-3xl text-white leading-snug italic"
            >
              We deliver data-driven and result-focused deliverables. Hear what
              they say about us.
            </motion.h2>
          </div> */}

      {/* Cards */}
      {/* <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={revealVariants}
                className="bg-[#111] border border-[#333] rounded-2xl p-8 flex flex-col justify-between gap-16 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#222] border border-[#333] flex items-center justify-center text-muted font-semibold text-xs">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h4 className="font-geist font-semibold text-sm text-white">
                      {t.name}
                    </h4>
                    <span className="text-muted text-[11px]">{t.role}</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-accent font-inter font-black text-2xl leading-none">
                    "
                  </span>
                  <p className="text-[#cacaca] text-[15px] leading-relaxed font-inter italic">
                    {t.quote}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div> */}
      {/* </div>
      </section> */}

      {/* ===== PRICING ===== */}
      <section className="py-24 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[1400px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column */}
          <motion.div
            variants={revealVariants}
            className="lg:col-span-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.85] select-none mb-6">
                PRICING
              </h2>
              <p className="text-[#888] text-sm md:text-base leading-relaxed mb-8 max-w-xs">
                From launch to scale, we've got you covered at every stage.
              </p>
              {/* Toggle */}
              <div className="flex items-center bg-[#111] border border-[#222] p-1 rounded-full w-fit mb-12">
                <button
                  onClick={() => setIsAnnual(false)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                    !isAnnual
                      ? "bg-[#252525] text-white"
                      : "text-[#666] hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setIsAnnual(true)}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all flex items-center gap-1.5 ${
                    isAnnual
                      ? "bg-[#252525] text-white"
                      : "text-[#666] hover:text-white"
                  }`}
                >
                  Annual{" "}
                  <span className="text-accent text-[10px] font-bold">
                    -20%
                  </span>
                </button>
              </div>
            </div>

            {/* Bespoke Block */}
            <div className="mt-16 border-t border-[#222] pt-8 flex items-center justify-between gap-6">
              <div>
                <h3 className="font-geist font-bold text-xl text-white">
                  Bespoke
                </h3>
                <p className="text-[#888] text-xs mt-1 leading-relaxed max-w-[200px]">
                  Perfect for specialized needs or early-stage projects.
                </p>
              </div>
              <Link
                href="/contact"
                className="border border-[#333] hover:border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300"
              >
                CONTACT US
              </Link>
            </div>
          </motion.div>

          {/* Right Column: pricing cards */}
          <motion.div
            variants={revealVariants}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`bg-[#0d0d0d] border ${pkg.popular ? "border-accent/40" : "border-[#222]"} rounded-3xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-accent" />
                )}
                <div>
                  <div className="flex items-baseline justify-between w-full mb-2">
                    <h3 className="font-geist font-bold text-2xl text-white">
                      {pkg.name}
                    </h3>
                    {pkg.popular && (
                      <span className="text-accent text-[11px] font-bold uppercase tracking-wider">
                        (POPULAR)
                      </span>
                    )}
                  </div>
                  <p className="text-[#666] text-xs md:text-sm mt-1 mb-8">
                    {pkg.desc}
                  </p>
                  <div className="border-t border-[#222] pt-8 flex flex-col gap-4">
                    {pkg.features.map((f, fi) => (
                      <div key={fi} className="flex items-center gap-3">
                        <span className="text-accent font-bold text-lg leading-none">
                          +
                        </span>
                        <span className="text-[#cacaca] text-[15px] font-medium tracking-tight">
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-0.5 mb-8 mt-12">
                    <span className="text-2xl text-white font-medium font-geist">
                      $
                    </span>
                    <span className="font-geist font-black text-5xl md:text-6xl text-white tracking-tighter">
                      {isAnnual ? Math.round(pkg.price * 0.8) : pkg.price}
                    </span>
                    <span className="text-[#666] text-base font-normal">
                      /mo
                    </span>
                  </div>
                  <a
                    href="#"
                    className="block w-full text-center bg-[#141414] hover:bg-[#1c1c1c] text-accent py-4 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    BOOK THIS PACKAGE
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        {/* Background Image sweep */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <img
            src="/images/why-us-bg.png"
            alt="Why Us Background"
            className="w-full h-full object-cover object-center opacity-60 mix-blend-screen scale-x-[-1]"
          />
          {/* Top gradient fade */}
          <div className="absolute top-0 inset-x-0 h-60 bg-gradient-to-b from-[#0a0a0a] to-transparent z-10" />
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 inset-x-0 h-60 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest">
              (FAQ)
            </span>
            <h2 className="font-anton text-[10vw] md:text-[140px] uppercase tracking-tight text-white leading-[0.85] select-none mt-4 mb-6">
              FAQ
            </h2>
            <h3 className="font-geist font-bold text-xl md:text-3xl text-white leading-tight mt-4">
              Got Questions?
              <br />
              We've got answers.
            </h3>
            <p className="text-[#888] text-lg leading-relaxed mt-4 max-w-xs">
              Find everything you need below. Can't find it? Feel free to reach
              out.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-8 border-t border-[#333]"
          >
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={revealVariants}
                  className="border-b border-[#333]"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full py-6 flex items-center justify-between text-left group"
                  >
                    <span className="font-geist font-semibold  text-lg md:text-2xl text-white pr-4">
                      {f.q}
                    </span>
                    <svg
                      className={`w-4 h-4 text-muted shrink-0 transition-transform duration-300 ${open ? "rotate-45" : ""}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-muted text-lg leading-relaxed pb-6">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
