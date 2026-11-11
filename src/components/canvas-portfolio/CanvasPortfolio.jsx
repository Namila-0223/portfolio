"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Grid2X2, Layers2, List, Pause, Play, Plus, Send } from "lucide-react";
import styles from "./CanvasPortfolio.module.css";
import WorkGallery from "./WorkGallery";
import CanvasCursor from "./CanvasCursor";
import { ContactGraphic, CopyEmail, CraftMark, CraftWidget, HeroGraphic } from "./CanvasGraphics";
import useMotionPreference from "./useMotionPreference";

const labels = ["Intro", "Selected Work", "About", "Capabilities", "Experience", "Contact"];
const positions = [[0, 0], [132, 38], [12, 162], [144, 200], [24, 324], [156, 362]];
const demoProjects = [
  { name: "Forma", subtitle: "Space to focus.", description: "A quieter home for projects, people, and the work that matters.", type: "Product design", note: "less noise,", emphasis: "more focus." },
  { name: "Waymark", subtitle: "A little less lost.", description: "A trip-planning concept that keeps the next step within reach.", type: "Interaction design", note: "take a turn,", emphasis: "find your way." },
  { name: "Index", subtitle: "Small parts. One language.", description: "A component-library concept exploring consistent states and patterns.", type: "Design systems", note: "small details,", emphasis: "shared language." },
];
const pageQuery = "(max-width: 800px), (max-height: 660px), (prefers-reduced-motion: reduce)";
const smooth = (value, from, to) => {
  const t = Math.max(0, Math.min(1, (value - from) / (to - from)));
  return t * t * t * (t * (t * 6 - 15) + 10);
};

function InterfaceStudy({ project }) {
  if (project.name === "Waymark") return <div className={`${styles.study} ${styles.travelStudy}`}>
    <div className={styles.tripBoard}><div className={styles.tripTop}>↗ waymark <span>YOUR NEXT CHAPTER</span></div><div className={styles.tripGrid}><div><small>A WEEKEND, WELL SPENT.</small><h3>Somewhere<br />worth the detour.</h3><p>Ella, Sri Lanka<br /><span>3 days · A slower kind of getaway</span></p><div className={styles.itinerary}><span>01</span><div><b>Take the scenic route</b><small>Train journey · Morning</small></div><Check size={14} /></div><div className={styles.itinerary}><span>02</span><div><b>A view to remember</b><small>Little Adam’s Peak · Afternoon</small></div><ArrowUpRight size={14} /></div></div><div className={styles.mapDrawing} aria-hidden="true"><span>ELLA</span><i /><i /><i /><svg viewBox="0 0 180 240"><path d="M40 200C150 190 0 130 100 130S20 30 140 30" /></svg><b>YOUR ROUTE, AT A GLANCE</b></div></div></div>
    <span className={styles.studySticker}>{project.note}<br /><i>{project.emphasis}</i></span>
  </div>;
  if (project.name === "Index") return <div className={`${styles.study} ${styles.systemStudy}`}><div className={styles.systemBoard}><div className={styles.tripTop}>▦ index <span>COMPONENT LIBRARY / 01</span></div><h3>Consistency,<br />one detail at a time.</h3><div className={styles.systemTokens}>{["#315CEA", "#24272C", "#E7EDFF", "#FAF8F2"].map(color => <span key={color}><i style={{ background: color }} /><small>{color}</small></span>)}</div><div className={styles.componentStates}><span>Default <b>Continue <ArrowRight size={12} /></b></span><span>Selected <b><Check size={12} /> Saved</b></span><span>Disabled <b>Continue <ArrowRight size={12} /></b></span></div><div className={styles.systemType}><span>Aa</span><p>Type. Space. State.<br /><small>A shared language for useful interfaces.</small></p></div></div><span className={styles.studySticker}>{project.note}<br /><i>{project.emphasis}</i></span></div>;
  return <div className={styles.study} aria-label="Illustrative task management interface">
    <div className={styles.app}>
      <aside className={styles.appSidebar}>
        <div className={styles.appBrand}><span>f</span> forma</div>
        <small>WORKSPACE</small>
        <span className={styles.appSelected}><Layers2 size={13} /> Projects <b>04</b></span>
        <span>My tasks</span><span>Team</span>
        <div className={styles.appAvatar}>N<span>Personal workspace</span></div>
      </aside>
      <div className={styles.appContent}>
        <div className={styles.appBreadcrumb}>Workspace <span>/</span> Projects <ChevronDown size={10} /></div>
        <div className={styles.appHeading}><div><small>A LITTLE CLARITY, EVERY DAY</small><h3>Make room for<br />your best work.</h3></div><span className={styles.appPlus}><Plus size={16} /></span></div>
        <div className={styles.appTabs}><b>All projects <span>4</span></b><span>In progress</span><span>Completed</span></div>
        <div className={styles.task}><span className={styles.taskIcon}>✳</span><div><b>Website refresh</b><small>Design · 6 tasks</small></div><span className={styles.taskTag}>In progress</span></div>
        <div className={styles.task}><span className={styles.taskIcon}>↗</span><div><b>A better onboarding</b><small>Experience · 4 tasks</small></div><span className={styles.taskTag}>In progress</span></div>
        <div className={styles.task}><span className={styles.taskIcon}><Check size={17} /></span><div><b>The small details</b><small>Design system · 8 tasks</small></div><span className={styles.taskDone}>Complete</span></div>
        <div className={styles.appFooter}><span>Good things take a little focus.</span><span>↗</span></div>
      </div>
    </div>
    <span className={styles.studySticker}>less noise,<br /><i>more focus.</i></span>
  </div>;
}

export default function CanvasPortfolio() {
  const shell = useRef(null);
  const track = useRef(null);
  const navigation = useRef(null);
  const frames = useRef([]);
  const [preferredPage, setPreferredPage] = useState(false);
  const [pageView, setPageView] = useState(false);
  const [active, setActive] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const reduceMotion = useMotionPreference();
  const activeFrame = useRef(0);
  activeFrame.current = active;
  const [restore, setRestore] = useState(null);
  const plain = preferredPage || pageView;
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  // Damp physical scroll input once, before deriving both pan and zoom. Keeping
  // these on the same clock prevents drift between the camera's two movements.
  const cameraProgress = useSpring(scrollYProgress, { stiffness: 105, damping: 26, mass: .65, restDelta: .00001, restSpeed: .0001 });
  const chapter = useTransform(cameraProgress, v => Math.min(labels.length - 1, Math.max(0, v * (labels.length - 1))));
  const travel = useTransform(chapter, v => Math.floor(v) + smooth(v % 1, .23, .77));
  const scale = useTransform(chapter, v => 1 - .45 * smooth(v % 1, .07, .3) + .45 * smooth(v % 1, .7, .93));
  const cameraAxis = axis => {
    const value = travel.get();
    const index = Math.min(Math.floor(value), positions.length - 2);
    const position = positions[index][axis] + (positions[index + 1][axis] - positions[index][axis]) * (value - index);
    return `${-position * scale.get()}%`;
  };
  const x = useTransform(() => cameraAxis(0));
  const y = useTransform(() => cameraAxis(1));
  const zoom = useTransform(scale, v => `${Math.round(v * 100)}%`);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.setAttribute("data-in-view", String(entry.isIntersecting))), { threshold: .15 });
    frames.current.forEach(frame => { if (frame) observer.observe(frame); });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    frames.current.forEach((frame, index) => frame?.setAttribute("data-active", String(plain || index === active)));
  }, [active, plain]);

  useEffect(() => {
    let pending;
    const resize = () => {
      cancelAnimationFrame(pending);
      const index = activeFrame.current;
      pending = requestAnimationFrame(() => setRestore(index));
    };
    addEventListener("resize", resize);
    return () => { removeEventListener("resize", resize); cancelAnimationFrame(pending); };
  }, []);

  useEffect(() => {
    const nav = navigation.current;
    const button = nav?.querySelector('[aria-current="step"]');
    if (button && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: button.offsetLeft - (nav.clientWidth - button.clientWidth) / 2, behavior: "instant" });
  }, [active]);

  useEffect(() => {
    const query = matchMedia(pageQuery);
    setPreferredPage(query.matches);
    const update = () => {
      setRestore(current => current ?? activeFrame.current);
      setPreferredPage(query.matches);
    };
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [scrollYProgress]);

  useMotionValueEvent(travel, "change", value => {
    if (!plain) setActive(Math.round(value));
  });

  useEffect(() => {
    if (!plain) return;
    const update = () => {
      let current = 0;
      frames.current.forEach((frame, index) => { if (frame?.getBoundingClientRect().top < innerHeight * .5) current = index; });
      setActive(current);
    };
    update();
    addEventListener("scroll", update, { passive: true });
    return () => removeEventListener("scroll", update);
  }, [plain]);

  function goTo(index, instant = false) {
    const element = plain ? frames.current[index] : track.current;
    if (!element) return;
    const start = element.getBoundingClientRect().top + scrollY;
    const top = plain ? start - 128 : start + index / (labels.length - 1) * (element.offsetHeight - innerHeight);
    if (instant && !plain) cameraProgress.jump(index / (labels.length - 1));
    scrollTo({ top: Math.max(0, top), behavior: instant || preferredPage ? "instant" : "smooth" });
  }

  useEffect(() => {
    if (restore === null) return;
    goTo(restore, true);
    setActive(restore);
    setRestore(null);
  }, [plain, restore]);

  function toggleView() {
    setRestore(active);
    setPageView(value => !value);
  }

  return <main ref={shell} className={styles.shell} data-view={plain ? "page" : "canvas"} data-motion-enabled={motionEnabled && !reduceMotion}>
    <CanvasCursor root={shell} />
    <a className={styles.skip} href="#intro" onClick={event => { event.preventDefault(); setActive(0); goTo(0, true); requestAnimationFrame(() => document.getElementById("intro-title")?.focus({ preventScroll: true })); }}>Skip to introduction</a>
    <header className={styles.header}>
      <button className={styles.wordmark} onClick={() => goTo(0)} aria-label="Namila Preshan, introduction">namila<span>.</span></button>
      <div className={styles.headerLinks}><a className={styles.contact} href="mailto:Namilapreshan11@gmail.com">Let’s talk <ArrowUpRight size={15} /></a>{!reduceMotion && <button className={styles.motionToggle} aria-label={motionEnabled ? "Pause decorative motion" : "Play decorative motion"} title={motionEnabled ? "Pause motion" : "Play motion"} onClick={() => setMotionEnabled(value => !value)}>{motionEnabled ? <Pause size={13} /> : <Play size={13} />}</button>}</div>
    </header>
    <nav className={styles.navigation} ref={navigation} aria-label="Portfolio sections">
      <span className={styles.navLabel}>ON THIS CANVAS</span>
      {labels.map((label, index) => <button key={label} onClick={() => goTo(index)} aria-current={active === index ? "step" : undefined}>{active === index && <motion.i className={styles.navActive} layoutId="canvas-nav-active" aria-hidden="true" transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 450, damping: 38 }} />}<span>0{index + 1}</span>{label}</button>)}
      {!preferredPage && <button className={styles.viewToggle} onClick={toggleView}>{plain ? <Grid2X2 size={13} /> : <List size={13} />}{plain ? "Canvas view" : "Page view"}</button>}
    </nav>
    <div className={styles.track} ref={track}>
      <div className={styles.viewport}>
        <motion.div className={styles.world} style={plain ? {} : { x, y, scale }}>
          <div className={styles.connector} aria-hidden="true"><span>next chapter →</span></div>
          <section id="intro" ref={node => { frames.current[0] = node; }} className={`${styles.frame} ${styles.intro}`} aria-labelledby="intro-title" inert={!plain && active !== 0 ? "" : undefined}>
            <div className={styles.frameLabel}><Grid2X2 size={11} /> 01 — Intro <span>DESIGN / ENGINEERING</span></div>
            <div className={styles.introTop}><span>UI/UX ENGINEER</span><span>BASED IN SRI LANKA ↗</span></div>
            <div className={styles.heroLayout}>
              <div className={styles.introBody}>
                <p className={styles.eyebrow}><span className={styles.fileDot} /> A designer who builds.</p>
                <div className={styles.nameSelection} data-cursor-note="Hey, I’m Namila."><h1 id="intro-title" tabIndex={-1}>Namila<br /><span>Preshan.</span></h1><i /><i /><i /><i /><span className={styles.selectionTag}>A little curious. Very intentional.</span></div>
                <div className={styles.introDescription}><p>I turn complicated things into<br /><strong>interfaces that feel simple.</strong><br /><span>UI/UX design, design systems, and the code that brings it together.</span></p></div>
                <div className={styles.heroActions}><button onClick={() => goTo(1)}>Explore selected work <ArrowUpRight size={16} /></button><a href="mailto:Namilapreshan11@gmail.com">Say hello <span>↗</span></a></div>
              </div>
              <div className={styles.heroVisual}>
                <HeroGraphic />
                <figure className={styles.portrait}><span className={styles.portraitLabel}>The person behind the pixels.</span><img src="/images/namila1.png" alt="Namila Preshan" width="433" height="577" /><figcaption>Namila / Sri Lanka ↗</figcaption></figure>
                <CraftWidget />
                <span className={styles.visualCaption}>A designer’s eye.<br /><em>An engineer’s mindset.</em></span>
              </div>
            </div>
            <div className={styles.craftStrip}><span>01 <b>Understand</b></span><i aria-hidden="true">↗</i><span>02 <b>Make it clear</b></span><i aria-hidden="true">↗</i><span>03 <b>Bring it to life</b></span><span className={styles.stripNote}>THINKING IN FLOWS. CARING ABOUT DETAILS.</span></div>
            <footer className={styles.frameFooter}><span>PERSONAL PORTFOLIO / DESIGN & ENGINEERING</span><button onClick={() => goTo(1)}>The work, this way <ArrowDown size={14} /></button></footer>
          </section>
          <section id="selected-work" ref={node => { frames.current[1] = node; }} className={`${styles.frame} ${styles.work}`} aria-labelledby="work-title" inert={!plain && active !== 1 ? "" : undefined}>
            <div className={styles.frameLabel}><Grid2X2 size={11} /> 02 — Selected Work <span>PRODUCT / INTERFACE</span></div>
            <div className={styles.workHeading}><div><p className={styles.eyebrow}>Ideas made tangible</p><h2 id="work-title">Selected <em>work.</em></h2></div><span className={styles.workNumber}>03 INDEPENDENT CONCEPTS</span></div>
            <p className={styles.workIntro}>A few ideas on the workbench. Look around, then open a frame for a closer look.</p>
            <WorkGallery projects={demoProjects} renderPreview={project => <InterfaceStudy project={project} />} />
            <footer className={styles.frameFooter}><span>PRODUCT DESIGN &nbsp; / &nbsp; UI EXPLORATION</span><span>ILLUSTRATIVE STUDY · NOT CLIENT WORK</span></footer>
          </section>
          <section id="about" ref={node => { frames.current[2] = node; }} className={`${styles.frame} ${styles.extraFrame}`} style={{ "--frame-x": "12%", "--frame-y": "162%" }} aria-labelledby="about-title" inert={!plain && active !== 2 ? "" : undefined}>
            <CraftMark />
            <div className={styles.frameLabel}><Grid2X2 size={11} /> 03 — About <span>THE PERSON / THE PRACTICE</span></div>
            <p className={styles.eyebrow}>A little about me</p>
            <h2 id="about-title" className={styles.statement}>Curious by nature.<br />Thoughtful by design.</h2>
            <div className={styles.aboutContent}><div><p>I’m Namila, a UI/UX Engineer based in Sri Lanka. I work where product design meets frontend engineering.</p><p>I enjoy untangling complex workflows, finding the right structure, and carrying that thinking through to the interface people actually use.</p><div className={styles.personalTags}><span>Ask why.</span><span>Make it clear.</span><span>Mind the details.</span></div></div><aside className={styles.paperNote} data-motion="float"><span>NOTE TO SELF / 01</span><p>Understand the problem.<br />Make something useful.<br /><i>Then make it feel right.</i></p></aside></div>
            <footer className={styles.frameFooter}><span>DESIGN THINKING, WITH A BUILDER’S MINDSET</span><button onClick={() => goTo(3)}>What I bring <ArrowDown size={14} /></button></footer>
          </section>
          <section id="capabilities" ref={node => { frames.current[3] = node; }} className={`${styles.frame} ${styles.extraFrame}`} style={{ "--frame-x": "144%", "--frame-y": "200%" }} aria-labelledby="capabilities-title" inert={!plain && active !== 3 ? "" : undefined}>
            <div className={styles.frameLabel}><Grid2X2 size={11} /> 04 — Capabilities <span>THINK / DESIGN / BUILD</span></div>
            <p className={styles.eyebrow}>From the first question to the working interface</p><h2 id="capabilities-title" className={styles.statement}>Design with intent.<br />Build with care.</h2>
            <div className={styles.capabilityList}>{[
              ["Product & UX design", "Flows, information architecture, and prototypes that make complex tasks easier to follow."],
              ["Interface & interaction", "Hierarchy, responsive layouts, and considered states—from the first click to the last detail."],
              ["Design systems", "Reusable components, clear patterns, and a shared language between design and engineering."],
              ["Frontend engineering", "Bringing interfaces into code with React, Angular, HTML, and CSS."],
            ].map(([title, description], index) => <div key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p><ArrowUpRight size={17} aria-hidden="true" /></div>)}</div>
            <footer className={styles.frameFooter}><span>ONE CONNECTED PRACTICE</span><button onClick={() => goTo(4)}>The journey so far <ArrowDown size={14} /></button></footer>
          </section>
          <section id="experience" ref={node => { frames.current[4] = node; }} className={`${styles.frame} ${styles.extraFrame}`} style={{ "--frame-x": "24%", "--frame-y": "324%" }} aria-labelledby="experience-title" inert={!plain && active !== 4 ? "" : undefined}>
            <div className={styles.frameLabel}><Grid2X2 size={11} /> 05 — Experience <span>LEARN / MAKE / REFINE</span></div>
            <p className={styles.eyebrow}>The journey so far</p><h2 id="experience-title" className={styles.statement}>Growing through<br />the work.</h2>
            <div className={styles.experienceList}>{[
              ["JAN 2026 — PRESENT", "UI/UX Engineer", "Product design, design systems, and frontend delivery."],
              ["JAN 2025 — DEC 2025", "Associate UI/UX Engineer", "Interface design and implementation for enterprise workflows."],
              ["DEC 2023 — DEC 2024", "Intern UI/UX Engineer", "Building foundations in interface design and frontend engineering."],
            ].map(([date, role, detail]) => <article key={role}><p>{date}</p><div><h3>{role}</h3><span>Epic Lanka Technologies</span><p>{detail}</p></div></article>)}</div>
            <footer className={styles.frameFooter}><span>DESIGN & ENGINEERING / SRI LANKA</span><a href="mailto:Namilapreshan11@gmail.com?subject=CV%20request">Request CV <ArrowUpRight size={14} /></a></footer>
          </section>
          <section id="contact" ref={node => { frames.current[5] = node; }} className={`${styles.frame} ${styles.extraFrame} ${styles.contactFrame}`} style={{ "--frame-x": "156%", "--frame-y": "362%" }} aria-labelledby="contact-title" inert={!plain && active !== 5 ? "" : undefined}>
            <div className={styles.frameLabel}><Grid2X2 size={11} /> 06 — Contact <span>THE NEXT CHAPTER</span></div>
            <div className={styles.contactLayout}>
              <div className={styles.contactLead}><p className={styles.eyebrow}>Good work starts with a conversation.</p><h2 id="contact-title" className={styles.contactTitle}>Good things<br />start with<br /><span>a hello.</span></h2><p className={styles.contactIntro}>Looking for someone who can connect product thinking with the details in code? Let’s talk about what you’re building.</p><div className={styles.contactTopics}><span>UI/UX engineering</span><span>Product design</span><span>Design systems</span></div></div>
              <div className={styles.messageCard}><span className={styles.messageLabel}>GOOD CONVERSATIONS START SMALL.</span><ContactGraphic /><div className={styles.messageMeta}><span>TO</span><strong>Namila Preshan</strong><span>ABOUT</span><strong>Something worth making.</strong></div><a className={styles.messageAction} href="mailto:Namilapreshan11@gmail.com?subject=Let%E2%80%99s%20make%20something">Start a conversation <Send size={16} /></a></div>
            </div>
            <div className={styles.contactBar}><a className={styles.emailLink} href="mailto:Namilapreshan11@gmail.com">Namilapreshan11@gmail.com <ArrowUpRight size={17} /></a><CopyEmail /><div><a href="https://linkedin.com/in/namilapreshan11" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={13} /></a><a href="mailto:Namilapreshan11@gmail.com?subject=CV%20request">Request CV <ArrowUpRight size={13} /></a></div></div>
            <footer className={styles.frameFooter}><span>NAMILA PRESHAN / DESIGNED WITH INTENTION</span><button onClick={() => goTo(0)}>Back to the beginning <ArrowUpRight size={14} /></button></footer>
          </section>
        </motion.div>
      </div>
    </div>
    {!plain && <footer className={styles.canvasFooter}><span><span className={styles.scrollIcon} /> Scroll to explore</span><div><button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous frame"><ArrowLeft size={14} /></button><span>0{active + 1}<i>/</i>06</span><button onClick={() => goTo(active + 1)} disabled={active === labels.length - 1} aria-label="Next frame"><ArrowRight size={14} /></button></div><motion.span>{zoom}</motion.span></footer>}
  </main>;
}
