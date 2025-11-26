"use client";
import React, { useRef, useState } from "react";
import { Send } from "lucide-react";

type Props = {
  onSend: (text: string) => void;
  placeholder?: string;
};

export default function FloatingInputBar({ onSend, placeholder = "Type a question..." }: Props) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function submit(e?: React.FormEvent) {
    e?.preventDefault();
    const text = value.trim();
    if (!text) return;
    onSend(text);
    setValue("");
    inputRef.current?.focus();
  }

  return (
    <div className="pointer-events-none"> 
      {/* pointer-events-none on outer to avoid it blocking underlying scrolling; inner form enables pointer events */}
      <div className="fixed left-1/2 transform -translate-x-1/2 bottom-6 z-50 w-[min(720px,92%)] max-w-3xl pointer-events-auto">
        <form
          onSubmit={submit}
          className="flex items-center gap-3 px-4 py-2 rounded-3xl shadow-xl backdrop-blur-md bg-white/6 border border-white/6"
          role="search"
        >
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent outline-none text-sm text-gray-100 placeholder:text-gray-400 px-2 py-2"
            aria-label="Message"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="p-2 rounded-full bg-[#232323] hover:bg-[#2a2a2a] transition"
          >
            <Send size={16} className="text-white" />
          </button>
        </form>
      </div>
    </div>
  );
}
