// // /components/chat/Suggestions.tsx
// "use client";
// import React from "react";

// export default function Suggestions({
//   items,
//   onSelect,
// }: {
//   items: { id: number; text: string; topic: string }[];
//   onSelect: (topicOrText: string) => void;
// }) {
//   if (!items || items.length === 0) return null;

//   return (
//     <div className="mt-3 flex flex-wrap gap-2">
//       {items.map((s) => (
//         <button
//           key={s.id}
//           onClick={() => onSelect(s.text)}
//           className="bg-[#232323] px-3 py-1 rounded-full text-xs text-gray-200 hover:bg-[#2a2a2a] transition"
//         >
//           {s.text}
//         </button>
//       ))}
//     </div>
//   );
// }

// components/chat/SuggestionsBar.tsx
"use client";
import React from "react";

export default function SuggestionsBar({ items, onSelect }: { items: { id: number; text: string }[]; onSelect: (t: string) => void }) {
  return (
    <div className="px-2">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
        {items.map((s) => (
          <button key={s.id} onClick={() => onSelect(s.text)} className="whitespace-nowrap bg-[#1a1a1a] px-3 py-2 rounded-full text-sm border border-gray-800 hover:bg-[#222] flex-shrink-0">
            {s.text}
          </button>
        ))}
      </div>
    </div>
  );
}
