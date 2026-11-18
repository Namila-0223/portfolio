"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";
const subscribe = notify => {
  const preference = window.matchMedia(query);
  preference.addEventListener("change", notify);
  return () => preference.removeEventListener("change", notify);
};
const snapshot = () => window.matchMedia(query).matches;
const serverSnapshot = () => true;

// Subscribe directly: the installed Framer Motion hook reads this preference
// only on mount. OS changes must also stop graphics and update the controls.
export default function useMotionPreference() {
  return useSyncExternalStore(subscribe, snapshot, serverSnapshot);
}
