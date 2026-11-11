"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Grab, Hand } from "lucide-react";
import styles from "./CanvasCursor.module.css";

export default function CanvasCursor({ root }) {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const labelX = useSpring(x, { stiffness: 500, damping: 38 });
  const labelY = useSpring(y, { stiffness: 500, damping: 38 });
  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState("");
  const [mode, setMode] = useState("pointer");

  useEffect(() => {
    const query = matchMedia("(min-width: 801px) and (min-height: 661px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
    let shown = false;
    const hide = () => {
      shown = false;
      setVisible(false);
      setMode("pointer");
      root.current?.removeAttribute("data-pointer");
    };
    const move = event => {
      const target = event.target instanceof Element ? event.target : null;
      if (!query.matches || event.pointerType === "touch" || !root.current?.contains(target) || document.querySelector("dialog[open]")) return hide();
      x.set(event.clientX);
      y.set(event.clientY);
      if (!shown) {
        labelX.jump(event.clientX);
        labelY.jump(event.clientY);
        root.current.setAttribute("data-pointer", "active");
        shown = true;
        setVisible(true);
      }
      const annotation = target?.closest("[data-cursor-note]")?.getAttribute("data-cursor-note");
      const action = target?.closest("button, a");
      const board = target?.closest("[data-project-board]");
      const controls = target?.closest("[data-board-control]");
      const dragging = board?.getAttribute("data-dragging") === "true";
      const hand = board && !controls && (dragging || board.getAttribute("data-tool") === "hand" || !action);
      setMode(hand ? (dragging ? "grabbing" : "grab") : "pointer");
      setNote(hand ? (dragging ? "Dragging canvas" : "Drag canvas") : annotation ?? (action ? (action.tagName === "A" ? "Take a look ↗" : "Let’s explore") : ""));
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerdown", move, { passive: true });
    document.addEventListener("pointerup", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    query.addEventListener("change", hide);
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerdown", move);
      document.removeEventListener("pointerup", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      query.removeEventListener("change", hide);
      root.current?.removeAttribute("data-pointer");
    };
  }, [root, x, y, labelX, labelY]);

  return <div className={styles.cursor} data-visible={visible} data-mode={mode} aria-hidden="true">
    {mode === "pointer" ? <motion.svg className={styles.arrow} style={{ x, y }} width="20" height="24" viewBox="0 0 20 24"><path d="M2 2L17 13L10 14L7 21Z" fill="currentColor" stroke="white" strokeWidth="1.5" strokeLinejoin="round" /></motion.svg> : <motion.div className={styles.hand} style={{ x, y }}>{mode === "grabbing" ? <Grab size={23} fill="white" /> : <Hand size={23} fill="white" />}</motion.div>}
    <motion.div className={styles.tag} style={{ x: labelX, y: labelY }}><span>Namila</span>{note && <p>{note}</p>}</motion.div>
  </div>;
}
