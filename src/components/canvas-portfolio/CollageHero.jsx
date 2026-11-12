"use client";

import { useState } from "react";
import { AlignCenter, AlignLeft, ArrowDown, ArrowUpRight, Check, Code2, Layers2, MapPin, PenTool, SquareDashed, Workflow } from "lucide-react";
import styles from "./CollageHero.module.css";

function BrushLine({ className = "" }) {
  return <svg className={className} viewBox="0 0 720 45" fill="none" preserveAspectRatio="none" aria-hidden="true"><path d="M7 31C194 7 472 8 704 22" stroke="currentColor" strokeWidth="5" /><path d="M15 38C221 15 473 11 711 23M9 27C254 5 523 10 696 19" stroke="currentColor" strokeWidth="1.5" /><path d="M30 33C292 9 496 15 678 22" stroke="currentColor" strokeWidth="2.5" strokeDasharray="100 4 40 2 180 3 60" /></svg>;
}

export default function CollageHero({ onExplore }) {
  const [build, setBuild] = useState(false);
  return <div className={styles.composition}>
    <h1 className={styles.signature} id="intro-title" tabIndex={-1}>Namila Preshan<BrushLine className={styles.nameUnderline} /></h1>
    <h2 className={styles.role}>UI/UX Engineer</h2>
    <p className={styles.summary}>I design clear interfaces and<br />bring them to life in code.</p>
    <div className={styles.actions}><button onClick={onExplore}>Explore selected work <ArrowUpRight size={18} /></button><a href="mailto:Namilapreshan11@gmail.com">Say hello</a></div>

    <figure className={styles.portrait} data-cursor-note="Hey, I’m Namila.">
      <div className={styles.selection} aria-hidden="true"><i /><i /><i /><i /></div>
      <img src="/images/namila1.png" alt="Namila Preshan in a black turtleneck, hands clasped" width="433" height="577" fetchPriority="high" />
    </figure>

    <aside className={styles.bringCard} aria-label="What I bring"><h3>What I bring</h3><ul>{["Product design", "Design systems", "Frontend engineering"].map(item => <li key={item}><Check size={15} />{item}</li>)}</ul></aside>

    <aside className={styles.ideaNote} aria-label="From idea to interface" data-motion="float"><span>From idea<br />to interface.</span><BrushLine className={styles.noteUnderline} /></aside>

    <div className={styles.inspector}>
      <h3>Design <span>↔</span> Build</h3>
      <div className={styles.inspectorTools} role="group" aria-label="Design and code preview"><button aria-pressed={!build} onClick={() => setBuild(false)}><PenTool size={12} />Design</button><button aria-pressed={build} onClick={() => setBuild(true)}><Code2 size={12} />Build</button></div>
      <div className={styles.inspectorPreview} aria-live="polite">{build ? <code><span>const</span> clarity =<br />&nbsp;&nbsp;&lt;Interface<br />&nbsp;&nbsp;&nbsp;&nbsp;details=&#123;true&#125;<br />&nbsp;&nbsp;/&gt;</code> : <div className={styles.glyphs} aria-hidden="true"><AlignLeft /><AlignCenter /><Workflow /><SquareDashed /><Layers2 /><Code2 /></div>}</div>
      <div className={styles.swatches} aria-hidden="true"><i /><i /><i /></div>
    </div>

    <span className={styles.practiceNote}>THINK · DESIGN · BUILD</span>
    <svg className={styles.doodles} viewBox="0 0 1000 600" preserveAspectRatio="none" fill="none" aria-hidden="true"><path className={styles.arrowStroke} data-motion="draw" d="M499 251Q523 222 555 229M545 222L555 229L547 239M337 506Q373 506 370 467M364 477L370 467L379 477" /><path d="M934 48L940 29L947 46L965 46L951 58L956 76L940 65L925 75L929 57L915 47Z" /><path d="M48 99L29 85M56 84L49 63M36 115L16 111" strokeWidth="3" /></svg>
    <div className={styles.tornEdge} aria-hidden="true" />
    <footer className={styles.heroFooter}><span><MapPin size={13} />Sri Lanka</span><button onClick={onExplore}>Scroll to explore <ArrowDown size={14} /></button><span>DESIGN / ENGINEERING</span></footer>
  </div>;
}
