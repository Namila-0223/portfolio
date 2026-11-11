"use client";

import { useId, useRef, useEffect, useState } from "react";
import { Code2, PenTool } from "lucide-react";
import styles from "./CanvasGraphics.module.css";

export function HeroGraphic() {
  return <svg className={styles.heroGraphic} viewBox="0 0 540 500" fill="none" aria-hidden="true">
    <circle cx="280" cy="245" r="190" stroke="#d6dce9" />
    <circle cx="280" cy="245" r="150" stroke="#bcc9ed" strokeDasharray="3 9" />
    <path d="M26 385H114V97H427V350H500" stroke="#c5cfe5" strokeWidth="1.2" />
    <path className={styles.signal} data-motion="signal" d="M26 385H114V97H427V350H500" stroke="#315cea" strokeWidth="2" strokeDasharray="35 850" />
    <path d="M38 230H500M280 28V463" stroke="#dce1ec" strokeDasharray="3 8" />
    <g className={styles.rotor} data-motion="rotate"><path d="M454 58V106M430 82H478M437 65L471 99M437 99L471 65" stroke="#315cea" strokeWidth="2" /></g>
    <g><rect x="30" y="115" width="112" height="50" rx="5" fill="#faf8f2" stroke="#c3cfec" /><circle cx="46" cy="132" r="3" fill="#315cea" /><text x="57" y="135" fill="#5b6c94" fontSize="8">01 / THE IDEA</text><path d="M46 148H110" stroke="#d0d7e7" strokeWidth="3" strokeLinecap="round" /></g>
    <g><rect x="395" y="316" width="117" height="65" rx="5" fill="#faf8f2" stroke="#c3cfec" /><text x="409" y="335" fill="#5b6c94" fontSize="8">03 / THE DETAILS</text><rect x="409" y="346" width="20" height="20" rx="3" fill="#315cea" /><rect x="435" y="346" width="20" height="20" rx="3" fill="#dce5ff" /><rect x="461" y="346" width="20" height="20" rx="3" fill="#f0dfb5" /></g>
    <path d="M256 28h48m-24-8v16M256 462h48m-24-8v16" stroke="#8c9bbd" />
    <text x="202" y="490" fill="#8b94a8" fontSize="8" letterSpacing="2">ALWAYS CONNECTING THE DOTS</text>
  </svg>;
}

export function CraftWidget() {
  const [code, setCode] = useState(false);
  return <div className={styles.widget}>
    <div className={styles.widgetTools} role="group" aria-label="Interface demonstration"><button aria-pressed={!code} onClick={() => setCode(false)}><PenTool size={11} />Design</button><button aria-pressed={code} onClick={() => setCode(true)}><Code2 size={12} />Build</button></div>
    <div className={styles.widgetBody} aria-live="polite">{code ? <div className={styles.code}><span>const</span> clarity =<br />&nbsp;&nbsp;&lt;<b>ThoughtfulInterface</b><br />&nbsp;&nbsp;&nbsp;&nbsp;details=&#123;true&#125;<br />&nbsp;&nbsp;/&gt;</div> : <><span className={styles.widgetEyebrow}>02 / THE INTERFACE</span><strong>Less noise.<br />More meaning.</strong><div className={styles.widgetBars}><i /><i /><i /></div></>}</div>
    <span className={styles.widgetFooter}><span /> Same idea. Both sides.</span>
  </div>;
}

export function ContactGraphic() {
  const id = useId().replaceAll(":", "");
  return <svg className={styles.contactGraphic} viewBox="0 0 420 280" fill="none" aria-hidden="true">
    <defs><path id={id} d="M325 82m-37 0a37 37 0 1 1 74 0a37 37 0 1 1-74 0" /></defs>
    <path d="M40 235C-6 125 157 224 170 132S307 185 377 207" stroke="#94a9e5" strokeDasharray="3 6" />
    <path className={styles.signal} data-motion="signal" d="M40 235C-6 125 157 224 170 132S307 185 377 207" stroke="#315cea" strokeWidth="2" strokeDasharray="24 600" />
    <g className={styles.plane} data-motion="float"><path d="M84 127L271 61L219 223L177 160L84 127Z" fill="#315cea" /><path d="M271 61L177 160L188 198" stroke="#faf8f2" strokeWidth="2" /><path d="M177 160L219 223L188 198L177 160Z" fill="#2648bd" /><path d="M115 127L240 81" stroke="#7899ff" strokeWidth="2" /></g>
    <g className={styles.stamp} data-motion="rotate"><circle cx="325" cy="82" r="47" stroke="#b6c4e9" /><text fill="#7d91c4" fontSize="8" letterSpacing="2.1"><textPath href={`#${id}`}>SRI LANKA · LET’S CONNECT · </textPath></text><path d="M316 82h18m-9-9v18" stroke="#7d91c4" /></g>
    <path d="M50 35v24m-12-12h24M353 233v18m-9-9h18" stroke="#9eafd6" />
    <text x="38" y="271" fill="#8c97ae" fontSize="8" letterSpacing="1.7">A SMALL HELLO. A NEW POSSIBILITY.</text>
  </svg>;
}

export function CraftMark() {
  return <svg className={styles.craftMark} viewBox="0 0 100 100" fill="none" aria-hidden="true"><g className={styles.rotor} data-motion="rotate"><path d="M50 5V95M5 50H95M18 18L82 82M18 82L82 18" stroke="currentColor" strokeWidth="1.2" /><circle cx="50" cy="50" r="31" stroke="currentColor" strokeDasharray="2 5" /></g></svg>;
}

export function CopyEmail() {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try { await navigator.clipboard.writeText("Namilapreshan11@gmail.com"); setStatus("Copied!"); }
    catch { setStatus("Use the email link"); }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 2500);
  }
  return <button className={styles.copy} onClick={copy} aria-live="polite">{status || "Copy email"}<span aria-hidden="true">{status === "Copied!" ? "✓" : "⧉"}</span></button>;
}
