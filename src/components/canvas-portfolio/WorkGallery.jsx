"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowUpRight, Grid2X2, Hand, List, Minus, MousePointer2, Plus, RotateCcw, X } from "lucide-react";
import styles from "./WorkGallery.module.css";
import useMotionPreference from "./useMotionPreference";

const decisions = {
  Forma: ["Clarity before density", "Group projects by task and status so the next action is easy to find.", "Reusable list rows and clear status labels keep the workspace consistent."],
  Waymark: ["The next step, in context", "Bring the itinerary and location together so visitors can understand the day at a glance.", "Numbered stops keep the route understandable beyond color alone."],
  Index: ["A shared interface language", "Explore default, selected, and disabled states as one connected component family.", "Keep type, spacing, and color decisions consistent across the system."],
};

const sceneSize = { width: 1600, height: 1050 };
const panMargin = 96;
const projectLayout = [
  { x: 50, y: 75, width: 650, aspect: 1.8 },
  { x: 860, y: 25, width: 460, aspect: 1.7 },
  { x: 760, y: 430, width: 740, aspect: 1.75 },
];

function ScaledPreview({ children }) {
  const container = useRef(null);
  const [size, setSize] = useState({ width: 320, height: 220 });
  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setSize({ width: entry.contentRect.width, height: entry.contentRect.height });
    });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, []);
  return <span ref={container} className={styles.previewSizer}><div style={{ width: 720, height: 720 * size.height / size.width, transform: `scale(${size.width / 720})` }}>{children}</div></span>;
}

export default function WorkGallery({ projects, renderPreview }) {
  const bounds = useRef(null);
  const dialog = useRef(null);
  const gesture = useRef(null);
  const dragged = useRef(false);
  const opener = useRef(null);
  const panAnimations = useRef([]);
  const [handTool, setHandTool] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [listView, setListView] = useState(false);
  const [simpleView, setSimpleView] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [fit, setFit] = useState(1);
  const [viewport, setViewport] = useState({ width: 1000, height: 500 });
  const [selected, setSelected] = useState(null);
  const reduceMotion = useMotionPreference();
  const panX = useMotionValue(0);
  const panY = useMotionValue(0);
  const mapX = useTransform(panX, value => -value / (fit * zoom) * 120 / sceneSize.width);
  const mapY = useTransform(panY, value => -value / (fit * zoom) * 78.75 / sceneSize.height);
  const list = listView || simpleView;

  useEffect(() => {
    const query = matchMedia("(max-width: 800px), (max-height: 660px), (pointer: coarse), (prefers-reduced-motion: reduce)");
    const update = () => setSimpleView(query.matches);
    update(); query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!bounds.current || list) return;
    const observer = new ResizeObserver(([entry]) => {
      // Size the opening view around the first large frame, not the whole board.
      // The remaining work extends beyond the viewport, like a real design file.
      setFit(Math.min(entry.contentRect.width / 1350, entry.contentRect.height / 540));
      setViewport({ width: entry.contentRect.width, height: entry.contentRect.height });
      panAnimations.current.forEach(animation => animation.stop());
      panX.set(0); panY.set(0);
    });
    observer.observe(bounds.current);
    return () => observer.disconnect();
  }, [list, panX, panY]);

  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    element.showModal();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const shell = element.closest("main");
    shell?.setAttribute("data-dialog-open", "true");
    return () => {
      document.documentElement.style.overflow = overflow;
      shell?.removeAttribute("data-dialog-open");
      opener.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  useEffect(() => () => panAnimations.current.forEach(animation => animation.stop()), []);

  function openProject(project, event) {
    if (dragged.current || (handTool && event.detail !== 0)) return;
    opener.current = event.currentTarget;
    setSelected(project);
  }

  function movePan(x, y) {
    panAnimations.current.forEach(animation => animation.stop());
    if (reduceMotion) { panX.set(x); panY.set(y); return; }
    const transition = { duration: .22, ease: [.22, 1, .36, 1] };
    panAnimations.current = [animate(panX, x, transition), animate(panY, y, transition)];
  }

  function reset() { setZoom(1); movePan(0, 0); }

  function changeZoom(nextZoom) {
    const ratio = nextZoom / zoom;
    const [x, y] = clampPan(viewport.width / 2 - (viewport.width / 2 - panX.get()) * ratio, viewport.height / 2 - (viewport.height / 2 - panY.get()) * ratio, nextZoom);
    setZoom(nextZoom); movePan(x, y);
  }

  function clampPan(x, y, level = zoom) {
    const element = bounds.current;
    return [
      Math.max(-Math.max(0, sceneSize.width * fit * level - element.clientWidth) - panMargin, Math.min(panMargin, x)),
      Math.max(-Math.max(0, sceneSize.height * fit * level - element.clientHeight) - panMargin, Math.min(panMargin, y)),
    ];
  }

  function locateProject(index) {
    const frame = projectLayout[index];
    const [x, y] = clampPan(viewport.width / 2 - (frame.x + frame.width / 2) * fit * zoom, viewport.height / 2 - (frame.y + frame.width / frame.aspect / 2) * fit * zoom);
    movePan(x, y);
  }

  function pointerDown(event) {
    if (event.button !== 0 || event.pointerType === "touch") return;
    panAnimations.current.forEach(animation => animation.stop());
    dragged.current = false;
    const element = bounds.current;
    gesture.current = { x: event.clientX, y: event.clientY, panX: panX.get(), panY: panY.get(), id: event.pointerId, cameraScale: element.getBoundingClientRect().width / element.offsetWidth, limitX: Math.max(0, sceneSize.width * fit * zoom - element.clientWidth) + panMargin, limitY: Math.max(0, sceneSize.height * fit * zoom - element.clientHeight) + panMargin };
    if (handTool) event.preventDefault();
  }

  function pointerMove(event) {
    const start = gesture.current;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (!dragged.current && Math.hypot(dx, dy) < 3) return;
    if (!dragged.current) {
      dragged.current = true;
      bounds.current.setPointerCapture(event.pointerId);
      bounds.current.setAttribute('data-dragging', 'true');
      setIsDragging(true);
    }
    // Direct motion values follow the hand without a trailing spring. Geometry is
    // captured once at pointer-down so moving the board doesn't force layout.
    panX.set(Math.max(-start.limitX, Math.min(panMargin, start.panX + dx / start.cameraScale)));
    panY.set(Math.max(-start.limitY, Math.min(panMargin, start.panY + dy / start.cameraScale)));
  }

  function pointerUp(event) {
    gesture.current = null;
    setIsDragging(false);
    event.currentTarget.removeAttribute('data-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return <div className={styles.gallery}>
    <div className={styles.galleryTools}>
      <span><Hand size={12} /> {list ? "Choose a project to explore" : handTool ? "Drag anywhere to pan" : "Drag the background · Click a project"}</span>
      {!list && <div className={styles.toolSwitch} aria-label="Project canvas tools"><button aria-label="Select projects" aria-pressed={!handTool} onClick={() => setHandTool(false)}><MousePointer2 size={13} />Select</button><button aria-label="Drag canvas" aria-pressed={handTool} onClick={() => setHandTool(true)}><Hand size={13} />Drag</button></div>}
      {!simpleView && <button onClick={() => setListView(value => !value)} aria-label={list ? "View projects as canvas" : "View projects as list"}>{list ? <Grid2X2 size={13} /> : <List size={13} />}{list ? "Canvas" : "View as list"}</button>}
    </div>
    {list ? <div className={styles.projectList}>{projects.map((project, index) => <button key={project.name} onClick={event => { dragged.current = false; opener.current = event.currentTarget; setSelected(project); }} data-cursor-note={`Open ${project.name}`}><span className={styles.listPreview} aria-hidden="true"><ScaledPreview>{renderPreview(project)}</ScaledPreview></span><span className={styles.listCopy}><small>0{index + 1} / {project.type}</small><strong>{project.name}</strong><span>{project.description}</span><em>Independent concept</em></span><ArrowUpRight size={18} /></button>)}</div> : <div ref={bounds} className={styles.board} data-project-board="true" data-tool={handTool ? 'hand' : 'select'} data-dragging={isDragging ? 'true' : undefined} data-cursor-note="Drag to explore" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onLostPointerCapture={() => { gesture.current = null; setIsDragging(false); }} onPointerLeave={() => { if (!dragged.current) gesture.current = null; }}>
      <motion.div className={styles.scene} style={{ x: panX, y: panY }} initial={false} animate={{ scale: fit * zoom }} transition={{ duration: reduceMotion ? 0 : .22, ease: [.22, 1, .36, 1] }}>
        {projects.map((project, index) => <button key={project.name} className={styles.projectFrame} style={{ left: projectLayout[index].x, top: projectLayout[index].y, width: projectLayout[index].width, "--preview-aspect": projectLayout[index].aspect }} onClick={event => openProject(project, event)} onKeyDown={() => { dragged.current = false; }} onFocus={event => { if (!gesture.current && event.currentTarget.matches(':focus-visible')) locateProject(index); }} data-cursor-note={`Open ${project.name}`} aria-label={`Open ${project.name} project`}><span className={styles.projectLabel}>0{index + 1} / {project.name} <span>{project.type}</span></span><div className={styles.thumbnail} aria-hidden="true"><ScaledPreview>{renderPreview(project)}</ScaledPreview></div><span className={styles.cardCaption}>{project.subtitle}<ArrowUpRight size={13} /></span></button>)}
      </motion.div>
      <div className={styles.minimap} data-board-control="true" aria-label="Project board map" onPointerDown={event => event.stopPropagation()}>{projects.map((project, index) => <button key={project.name} aria-label={`Locate ${project.name} on board`} data-cursor-note={`Find ${project.name}`} onClick={() => locateProject(index)} style={{ left: `${projectLayout[index].x / sceneSize.width * 100}%`, top: `${projectLayout[index].y / sceneSize.height * 100}%`, width: `${projectLayout[index].width / sceneSize.width * 100}%`, height: `${projectLayout[index].width / projectLayout[index].aspect / sceneSize.height * 100}%` }} />)}<motion.span className={styles.mapViewport} style={{ x: mapX, y: mapY, width: Math.min(120, viewport.width / (fit * zoom) * 120 / sceneSize.width), height: Math.min(78.75, viewport.height / (fit * zoom) * 78.75 / sceneSize.height) }} /></div>
      <div className={styles.zoomTools} data-board-control="true" onPointerDown={event => event.stopPropagation()}><button aria-label="Zoom projects out" disabled={zoom <= .75} onClick={() => changeZoom(Math.max(.75, +(zoom - .15).toFixed(2)))}><Minus size={13} /></button><output aria-label="Project zoom">{Math.round(zoom * 100)}%</output><button aria-label="Zoom projects in" disabled={zoom >= 1.6} onClick={() => changeZoom(Math.min(1.6, +(zoom + .15).toFixed(2)))}><Plus size={13} /></button><button aria-label="Reset project canvas" onClick={() => reset()}><RotateCcw size={12} /></button></div>
    </div>}
    {selected && <dialog ref={dialog} className={styles.detail} aria-labelledby="project-detail-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current.close(); }}><div className={styles.detailInner}><div className={styles.detailTop}><span>{selected.type} / Independent concept</span><button onClick={() => dialog.current.close()} aria-label="Close project"><X size={18} /></button></div><div className={styles.detailPreview}>{renderPreview(selected)}</div><div className={styles.detailCopy}><div><p className={styles.detailKicker}>A CLOSER LOOK</p><h3 id="project-detail-title">{selected.name}<span> — {selected.subtitle}</span></h3><p>{selected.description}</p></div><div className={styles.decisions}><h4>{decisions[selected.name][0]}</h4><p>{decisions[selected.name][1]}</p><p>{decisions[selected.name][2]}</p></div><div className={styles.detailBottom}><span>Illustrative exploration. No client work or performance claims.</span><button onClick={() => dialog.current.close()}>Back to the workbench <ArrowUpRight size={14} /></button></div></div></div></dialog>}
  </div>;
}
