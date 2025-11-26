// // /components/chat/InputBar.tsx
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { Send } from "lucide-react";

// export default function InputBar({
//   onSend,
//   onTyping,
//   placeholder = "Type a question...",
// }: {
//   onSend: (text: string) => void;
//   onTyping: (text: string) => void;
//   placeholder?: string;
// }) {
//   const [value, setValue] = useState("");
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     onTyping(value);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [value]);

//   function submit(e?: React.FormEvent) {
//     e?.preventDefault();
//     const t = value.trim();
//     if (!t) return;
//     onSend(t);
//     setValue("");
//     inputRef.current?.focus();
//   }

//   return (
//     <form onSubmit={submit} className="mt-3 flex items-center gap-3">
//       <input
//         ref={inputRef}
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//         placeholder={placeholder}
//         className="flex-1 bg-[#121212] border border-gray-800 rounded-full px-4 py-2 text-sm text-gray-200 outline-none focus:ring-2 focus:ring-blue-600"
//       />
//       <button type="submit" aria-label="Send" className="bg-[#232323] hover:bg-[#2a2a2a] p-2 rounded-full">
//         <Send size={16} className="text-white" />
//       </button>
//     </form>
//   );
// }


// components/chat/InputBar.tsx
"use client";
import React, { useEffect, useRef, useState } from "react";
import { Send, Plus, X, Mail, Download } from "lucide-react";
import FloatingMenu from "../floating-menu";

export default function InputBar({
  value,
  onChange,
  onSend,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: (v?: string) => Promise<void> | void;
}) {
  const taRef = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState(40);

  useEffect(() => adjustHeight(), [value]);

  function adjustHeight() {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = "auto";

    const lineHeight = 20;
    const maxLines = 4;
    const maxHeight = lineHeight * maxLines + 12;

    let newH = Math.min(ta.scrollHeight, maxHeight);
    if (newH < 40) newH = 40;

    ta.style.height = `${newH}px`;
    setHeight(newH);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <>
      {/* Left + actions (your floating menu moved here) */}
      {/* <div className="relative">
        <button className="p-2 rounded-full hover:bg-white/5 transition" onClick={() => setOpen((s) => !s)} aria-label="Open actions">
          <Plus size={16} />
        </button>

        {open && (
          <div className="absolute left-0 bottom-14 w-44 bg-[#0b0b0b] border border-gray-800 rounded-lg shadow-lg p-2 z-50" onMouseLeave={() => setOpen(false)}>
            <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 flex items-center gap-2" onClick={() => {
              setOpen(false);
              // download link (open new tab)
              const a = document.createElement("a");
              a.href = "/documents/namila-cv.pdf"; // your existing path
              a.target = "_blank";
              a.rel = "noopener noreferrer";
              a.click();
              onDownloadCV?.();
            }}>
              <Download size={16} /> <span>Download CV</span>
            </button>

            <button className="w-full text-left px-3 py-2 rounded hover:bg-white/5 flex items-center gap-2" onClick={() => {
              setOpen(false);
              onOpenContact?.();
            }}>
              <Mail size={16} /> <span>Contact form</span>
            </button>
          </div>
        )}
      </div> */}
       <div className="flex items-end">
        <FloatingMenu />
      </div>

      {/* textarea */}
      <textarea
  value={value}
  onChange={(e) => onChange(e.target.value)}
  onKeyDown={handleKeyDown}
  placeholder="Type a message..."
  className="
    flex-1
    bg-transparent 
    outline-none 
    resize-none 
    text-sm 
    text-white 
    leading-tight
    max-h-16
  "
  rows={1}
/>

      {/* send */}
      <button onClick={() => onSend(undefined)} aria-label="Send message" className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition flex-shrink-0 ml-2">
        <Send size={16} />
      </button>
    </>
  );
}
