"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, Grid2X2, List, Mouse, Sparkles } from "lucide-react";
import styles from "./PortfolioCanvas.module.css";

const sections = ["Intro", "Selected work"];
const pagePreference = "(max-width: 760px), (max-height: 570px), (prefers-reduced-motion: reduce)";

function cameraProgress(value) {
  const time = Math.max(0, Math.min(1, (value - 0.08) / 0.84));
  return time * time * (3 - 2 * time);
}

function ProjectPreview() {
  return (
    <div className={styles.projectPreview} aria-hidden="true">
      <div className={styles.projectTop}><span>◈ &nbsp; Fieldwork</span><span>WORKSPACE / 01</span></div>
      <div className={styles.projectBody}>
        <div className={styles.projectSide}>Overview<br />Activity<br />Reports</div>
        <div className={styles.projectMain}>
          <small>TEAM WORKSPACE</small>
          <strong>Operations overview</strong>
          <div className={styles.projectStats}>
            <span>Open requests <b>24</b></span>
            <span>In review <b>08</b></span>
            <span>Resolved <b>16</b></span>
          </div>
          <div className={styles.chart}>
            {[30, 48, 37, 60, 53, 71, 59, 84, 72, 91, 79, 97].map((height, index) => (
              <i key={index} style={{ height: height + "%" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioCanvas() {
  const track = useRef(null);
  const frameRefs = useRef([]);
  const [pageView, setPageView] = useState(false);
  const [preferredPage, setPreferredPage] = useState(false);
  const [active, setActive] = useState(0);
  const [requested, setRequested] = useState(null);
  const plain = pageView || preferredPage;
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const progress = useTransform(scrollYProgress, cameraProgress);
  const scale = useTransform(progress, value => 1 - Math.sin(Math.PI * value) * 0.49);
  const x = useTransform(() => (-122 * progress.get() * scale.get()) + "%");
  const y = useTransform(() => (-64 * progress.get() * scale.get()) + "%");
  const zoom = useTransform(scale, value => Math.round(value * 100) + "%");

  useEffect(() => {
    const query = window.matchMedia(pagePreference);
    const sync = () => setPreferredPage(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useMotionValueEvent(progress, "change", value => {
    if (!plain) setActive(value >= 0.5 ? 1 : 0);
  });

  useEffect(() => {
    if (!plain) return;
    function updateActive() {
      const work = frameRefs.current[1];
      if (work) setActive(work.getBoundingClientRect().top <= window.innerHeight * 0.45 ? 1 : 0);
    }
    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    return () => window.removeEventListener("scroll", updateActive);
  }, [plain]);

  function goTo(index, instant = false) {
    const target = plain ? frameRefs.current[index] : track.current;
    if (!target) return;
    const start = target.getBoundingClientRect().top + window.scrollY;
    const distance = plain ? -92 : target.offsetHeight - window.innerHeight;
    const top = plain ? start + distance : start + index * distance;
    window.scrollTo({ top, behavior: instant || preferredPage ? "instant" : "smooth" });
  }

  useEffect(() => {
    if (requested === null) return;
    goTo(requested, true);
    setRequested(null);
  }, [plain, requested]); // Restore the current frame after the layout switches.

  function toggleView() {
    setRequested(active);
    setPageView(!pageView);
  }

  return (
    <div id="portfolio-canvas" className={styles.shell} data-view={plain ? "page" : "canvas"}>
      <div className={styles.toolbar}>
        <button className={styles.mark} onClick={() => goTo(0)} aria-label="Go to introduction">NP<span>.</span></button>
        <nav className={styles.nav} aria-label="Portfolio sections">
          {sections.map((section, index) => (
            <button key={section} aria-current={index === active ? "step" : undefined} onClick={() => goTo(index)}>
              <span>0{index + 1}</span> {section}
            </button>
          ))}
        </nav>
        {!preferredPage && <button className={styles.viewToggle} onClick={toggleView}>
          {plain ? <Grid2X2 size={15} /> : <List size={16} />}
          {plain ? "Canvas view" : "Page view"}
        </button>}
      </div>

      <div className={styles.track} ref={track}>
        <div className={styles.viewport}>
          <motion.div className={styles.world} style={plain ? {} : { x, y, scale }}>
            <div className={styles.guide} aria-hidden="true" />
            <section className={styles.frame + " " + styles.intro} aria-labelledby="canvas-intro-title" ref={node => { frameRefs.current[0] = node; }}>
              <span className={styles.frameLabel}>01 / Intro</span>
              <div className={styles.heroCopy}>
                <p className={styles.kicker}><span /> UI/UX Engineer · Sri Lanka</p>
                <div className={styles.selection}><h1 id="canvas-intro-title">Namila<br />Preshan<span>.</span></h1></div>
                <p className={styles.subtitle}>I design clear interfaces for complex products and help bring them into code.</p>
                <button className={styles.primary} onClick={() => goTo(1)} tabIndex={!plain && active !== 0 ? -1 : undefined}>Explore selected work <ArrowUpRight size={17} /></button>
              </div>
              <aside className={styles.note}><Sparkles size={16} /> <span>From the first sketch<br />to the working interface.</span></aside>
              <div className={styles.frameBottom}>NAM / PORTFOLIO <span>FIG. 01</span></div>
            </section>

            <section className={styles.frame + " " + styles.work} aria-labelledby="canvas-work-title" ref={node => { frameRefs.current[1] = node; }}>
              <span className={styles.frameLabel}>02 / Selected work</span>
              <div className={styles.workCopy}>
                <p className={styles.kicker}><span /> A closer look</p>
                <h2 id="canvas-work-title">Selected<br />work<span>.</span></h2>
                <p className={styles.subtitle}>A sample interface to test how a project reads after the camera settles.</p>
                <small className={styles.sample}>ILLUSTRATIVE CONCEPT</small>
              </div>
              <ProjectPreview />
              <div className={styles.frameBottom}>WORK / FIELDWORK <span>FIG. 02</span></div>
            </section>
          </motion.div>
        </div>
      </div>

      {!plain && <div className={styles.hud}>
        <span><Mouse size={15} /> Scroll to move between frames</span>
        <button onClick={() => goTo(active === 0 ? 1 : 0)} aria-label={active === 0 ? "Next frame" : "Previous frame"}>
          0{active + 1} / 02 <ArrowDown size={15} className={active ? styles.up : undefined} />
        </button>
        <motion.span aria-hidden="true">{zoom}</motion.span>
      </div>}
    </div>
  );
}
