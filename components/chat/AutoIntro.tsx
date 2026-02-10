// // /components/chat/AutoIntro.tsx
// "use client";
// import React from "react";

// export default function AutoIntro({ lines }: { lines: string[] }) {
//   return (
//     <div className="space-y-3">
//       {lines.map((l, i) => (
//         <div key={i} className="max-w-[78%]">
//           <div className="p-3 rounded-2xl bg-[#0f1720] text-gray-100 text-sm rounded-tl-none shadow">
//             {l}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// components/chat/AutoIntro.tsx
"use client";
import { useEffect } from "react";
import { INTRO_MESSAGES } from "@/data/introMessages";

export default function AutoIntro({ onPush, playing, onComplete }: { onPush: (m: any) => void; playing: boolean; onComplete: () => void; }) {
  useEffect(() => {
    if (!playing) return;
    let cancelled = false;
    const msgs = INTRO_MESSAGES;
    let idx = 0;

    const playNext = () => {
      if (cancelled) {
        onComplete();
        return;
      }
      if (idx >= msgs.length) {
        onComplete();
        return;
      }
      const msg = msgs[idx];
      const delayMs = 500 + Math.min(2200, (msg.content || "").length * 14);
      const timer = setTimeout(() => {
        if (cancelled) {
          onComplete();
          return;
        }
        onPush(msg);
        idx++;
        playNext();
      }, delayMs);
      return () => clearTimeout(timer);
    };

    const stop = playNext();
    return () => {
      cancelled = true;
      if (typeof stop === "function") stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing]);

  return null;
}
