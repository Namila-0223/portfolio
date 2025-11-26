// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import MessageBubble from "./MessageBubble";
// import Suggestions from "./Suggestions";
// import FloatingInputBar from "./FloatingInputBar";
// import { QA_DATA } from "@/data/qa";
// import { findTopicMatch, getTopicSuggestions } from "@/lib/qa-engine";
// import { motion, AnimatePresence } from "framer-motion";

// type ChatMsg = {
//   id: string;
//   sender: "namila" | "user" | "system";
//   content: string;
//   time?: string;
// };

// const INTRO = [
//   "Hi — welcome to my portfolio! 👋",
//   "I’m Namila, a UI/UX Engineer based in Colombo.",
//   "Ask me about my projects, tools, or process — I’ll keep it short and clear.",
// ];

// export default function ChatLayout() {
//   const [messages, setMessages] = useState<ChatMsg[]>([]);
//   const [isIntroPlaying, setIsIntroPlaying] = useState(true);
//   const [userTyped, setUserTyped] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [suggestions, setSuggestions] = useState<{ id: number; text: string; topic: string }[]>([]);
//   const scrollRef = useRef<HTMLDivElement | null>(null);
//   const messagesContainerRef = useRef<HTMLDivElement | null>(null);

//   // Play intro (up to 3 messages), interrupt if user types
//   useEffect(() => {
//     if (!isIntroPlaying) return;
//     let cancelled = false;
//     let idx = 0;

//     const playNext = () => {
//       if (cancelled || userTyped) {
//         setIsIntroPlaying(false);
//         return;
//       }
//       if (idx >= INTRO.length) {
//         setIsIntroPlaying(false);
//         return;
//       }

//       const delayMs = 600 + INTRO[idx].length * 14;
//       setTimeout(() => {
//         if (cancelled || userTyped) {
//           setIsIntroPlaying(false);
//           return;
//         }
//         pushMessage("namila", INTRO[idx]);
//         idx++;
//         playNext();
//       }, delayMs);
//     };

//     playNext();
//     return () => {
//       cancelled = true;
//     };
//   }, [isIntroPlaying, userTyped]);

//   // Scroll to bottom on new messages (smooth)
//   useEffect(() => {
//     const node = messagesContainerRef.current;
//     if (!node) return;
//     // small timeout to wait for DOM update
//     requestAnimationFrame(() => {
//       node.scrollTo({ top: node.scrollHeight + 200, behavior: "smooth" });
//     });
//   }, [messages]);

//   function pushMessage(sender: ChatMsg["sender"], content: string) {
//     const time = new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
//     setMessages((s) => [...s, { id: `${Date.now()}-${Math.random()}`, sender, content, time }]);
//   }

//   function handleTyping(text: string) {
//     if (text && !userTyped) {
//       setUserTyped(true);
//       setIsIntroPlaying(false);
//     }
//     const sug = getTopicSuggestions(text, 6);
//     setSuggestions(sug);
//   }

//   async function handleSend(text: string) {
//     if (!text || !text.trim()) return;
//     pushMessage("user", text);
//     setSuggestions([]);
//     setIsTyping(true);

//     // small natural delay
//     await delay(400);

//     const matched = findTopicMatch(text);
//     if (matched) {
//       await delay(300 + Math.min(900, matched.answer.length * 6));
//       pushMessage("namila", matched.answer);
//     } else {
//       await delay(600);
//       pushMessage("namila", "I’m not sure I understood — could you rephrase? Or try a suggestion below.");
//     }
//     setIsTyping(false);
//   }

//   function handleSelectSuggestion(topicOrText: string) {
//     handleSend(topicOrText);
//   }

//   return (
//     <div className="flex flex-col h-full">
//       {/* Messages area (scrollable) */}
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto hide-scrollbar px-2 pt-4 pb-36" /* big bottom padding to avoid overlap with floating input */
//       >
//         <div className="space-y-6">
//           <AnimatePresence initial={false}>
//             {messages.map((m) => (
//               <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
//                 <MessageBubble msg={{ id: m.id, sender: m.sender as any, content: m.content, time: m.time }} />
//               </motion.div>
//             ))}
//           </AnimatePresence>

//           {isTyping && (
//             <div className="flex">
//               <div className="w-8 h-8 mr-2">
//                 <img src="/images/namila.jpg" className="rounded-full object-cover" alt="Namila" />
//               </div>
//               <div className="bg-[#1a1a1a] rounded-2xl p-3">
//                 <div className="flex space-x-1">
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
//                   <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Suggestions area placed just above the floating input (so it stays visible) */}
//       <div className="absolute left-0 right-0 bottom-24 flex justify-center pointer-events-none">
//         <div className="w-[min(720px,92%)] max-w-3xl pointer-events-auto px-4">
//           <Suggestions items={suggestions} onSelect={handleSelectSuggestion} />
//         </div>
//       </div>

//       {/* Floating input bar (centered) */}
//       <FloatingInputBar
//         onSend={handleSend}
//       />
//     </div>
//   );
// }

// function delay(ms: number) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// 2nd generated code
// components/chat/ChatContainer.tsx
// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import MessageBubble from "./MessageBubble";
// import InputBar from "./InputBar";
// import Suggestions from "./Suggestions";
// import AutoIntro from "./AutoIntro";
// import { INTRO_MESSAGES } from "@/data/introMessages";
// import { QA_DATA } from "@/data/qa";
// import { findTopicMatch, getTopicSuggestions } from "@/lib/qa-engine";

// type Message = {
//   id: string;
//   sender: "namila" | "user";
//   senderName?: string;
//   content?: string;
//   time?: string;
//   // optional UI fields...
// };

// export default function ChatContainer({ footerHeight }: { footerHeight: number }) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [introPlaying, setIntroPlaying] = useState(true);
//   const [userTyped, setUserTyped] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [suggestions, setSuggestions] = useState<{ id: number; text: string }[]>([]);
//   const messagesRef = useRef<HTMLDivElement | null>(null);

//   // format time helper
//   function formatTime(date = new Date()) {
//     return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
//   }

//   function pushMessage(sender: "namila" | "user", content: string) {
//     setMessages((prev) => [
//       ...prev,
//       {
//         id: `${Date.now()}-${Math.random()}`,
//         sender,
//         senderName: sender === "namila" ? "Namila Preshan" : "You",
//         content,
//         time: formatTime(),
//       },
//     ]);
//   }

//   // initialize default suggestions (before typing)
//   useEffect(() => {
//     setSuggestions(QA_DATA.slice(0, 6).map((i) => ({ id: i.id, text: i.topic })));
//   }, []);

//   // Auto scroll
//   useEffect(() => {
//     const node = messagesRef.current;
//     if (!node) return;
//     requestAnimationFrame(() => {
//       node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
//     });
//   }, [messages.length, isTyping]);

//   // AutoIntro pushes messages into chat via onPush
//   function handleIntroPush(msg: any) {
//     // Convert IntroMsg into Message shape and push
//     pushMessage(msg.sender, msg.content || "");
//   }

//   function handleIntroComplete() {
//     setIntroPlaying(false);
//   }

//   // Typing and suggestions handler
//   function handleTyping(value: string) {
//     setInputValue(value);
//     if (!userTyped && value.length > 0) {
//       setUserTyped(true);
//       setIntroPlaying(false);
//     }
//     if (value.trim() === "") {
//       setSuggestions(QA_DATA.slice(0, 6).map((i) => ({ id: i.id, text: i.topic })));
//     } else {
//       // realtime suggestions using qa-engine
//       const s = getTopicSuggestions(value, 6);
//       setSuggestions(s);
//     }
//   }

//   // send handler
//   async function handleSend(raw?: string) {
//     const text = (raw ?? inputValue ?? "").trim();
//     if (!text) return;
//     if (introPlaying) setIntroPlaying(false);
//     if (!userTyped) setUserTyped(true);

//     // add user message
//     pushMessage("user", text);
//     setInputValue("");
//     setSuggestions([]);

//     // simulate typing & generate reply via QA engine
//     setIsTyping(true);
//     await new Promise((r) => setTimeout(r, 350));
//     const matched = findTopicMatch(text);
//     let reply = "";
//     if (matched) {
//       reply = matched.answer;
//     } else {
//       // fallback: try direct keyword search across QA_DATA
//       const token = text.toLowerCase().split(/\s+/)[0] || text;
//       const fallback = QA_DATA.find((i) => i.keywords.some((k) => k.includes(token)));
//       if (fallback) reply = fallback.answer;
//       else reply = "Thanks — I'll reply shortly. If you want, try one of the suggestions below.";
//     }

//     // small delay to make it feel natural
//     await new Promise((r) => setTimeout(r, Math.min(900, reply.length * 6)));
//     pushMessage("namila", reply);
//     setIsTyping(false);
//   }

//   // suggestion click -> send
//   function handleSuggestionClick(text: string) {
//     handleSend(text);
//   }

//   return (
//     <div className="flex flex-col" style={{ height: `calc(100vh - ${footerHeight + 140}px)` }}>
//       {/* messages area */}
//       <div
//         ref={messagesRef}
//         className="flex-1 overflow-y-auto hide-scrollbar pr-1 pb-6"
//         aria-live="polite"
//         role="log"
//       >
//         <div className="space-y-6 pt-4">
//           {messages.map((msg) => (
//             <MessageBubble
//               key={msg.id}
//               msg={{ id: msg.id, sender: msg.sender as any, content: msg.content, time: msg.time }}
//             />
//           ))}

//           {/* typing indicator */}
//           {isTyping && (
//             <div className="flex px-2">
//               <div className="w-8 h-8 mr-3 flex-shrink-0">
//                 <img src="/images/namila_1.webp" alt="Namila" className="rounded-full object-cover w-8 h-8" />
//               </div>
//               <div className="bg-[#121212] rounded-2xl p-3">
//                 <div className="flex space-x-1">
//                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Suggestions above input */}
//       <div className="px-2">
//         {inputValue.trim() === "" && suggestions.length > 0 && (
//           <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
//             {suggestions.map((s) => (
//               <button
//                 key={s.id}
//                 onClick={() => handleSuggestionClick(s.text)}
//                 className="whitespace-nowrap bg-[#1a1a1a] px-3 py-2 rounded-full text-sm border border-gray-800 hover:bg-[#222] flex-shrink-0"
//               >
//                 {s.text}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* While typing show dynamic suggestions */}
//         {inputValue.trim() !== "" && suggestions.length > 0 && (
//           <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
//             {suggestions.map((s) => (
//               <button
//                 key={s.id}
//                 onClick={() => handleSuggestionClick(s.text)}
//                 className="whitespace-nowrap bg-[#111111] px-3 py-2 rounded-full text-sm border border-gray-800 hover:bg-[#222] flex-shrink-0"
//               >
//                 {s.text}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Input bar fixed above footer */}
//       <div
//         className="fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4"
//         style={{ bottom: `${footerHeight + 18}px`, pointerEvents: "none" }}
//       >
//         <div
//           className="pointer-events-auto backdrop-blur-lg bg-black/40 rounded-2xl px-3 py-2 shadow-lg border border-white/5 flex items-center gap-3"
//           style={{
//             transition: "height 160ms ease, transform 160ms ease",
//           }}
//         >
//           <InputBar value={inputValue} onChange={handleTyping} onSend={handleSend} />
//         </div>
//       </div>

//       {/* Autointro (non-visual, pushes messages when playing) */}
//       {introPlaying && <AutoIntro onPush={handleIntroPush} onComplete={handleIntroComplete} playing={introPlaying} />}

//       <style jsx>{`
//         @media (max-height: 600px) {
//           main {
//             padding-bottom: ${footerHeight + 12}px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// -----------------------------

// // components/chat/ChatContainer.tsx
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import MessageBubble from "./MessageBubble";
// import InputBar from "./InputBar";
// import Suggestions from "./Suggestions";
// import AutoIntro from "./AutoIntro";
// import { getTopicSuggestions, findTopicMatch } from "@/lib/qa-engine";
// import { QA_DATA } from "@/data/qa";

// type Message = { id: string; sender: "namila" | "user"; content?: string; time?: string; };

// export default function ChatContainer({ headerHeight  }: { headerHeight: number }) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [introPlaying, setIntroPlaying] = useState(true);
//   const [userTyped, setUserTyped] = useState(false);
//   const [isTyping, setIsTyping] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const [suggestions, setSuggestions] = useState<{ id: number; text: string }[]>([]);
//   const messagesRef = useRef<HTMLDivElement | null>(null);
//   const bottomRef = useRef<HTMLDivElement | null>(null);

//   function formatTime(date = new Date()) {
//     return new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).format(date);
//   }

//   function pushMessage(sender: "namila" | "user", content: string) {
//     setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, sender, content, time: formatTime() }]);
//   }

//   useEffect(() => {
//     setSuggestions(QA_DATA.slice(0, 6).map(i => ({ id: i.id, text: i.topic })));
//   }, []);

//   // WhatsApp-style smooth scrolling: always scroll to bottomRef when messages change
//   useEffect(() => {
//     const node = messagesRef.current;
//     if (!node) return;
//     // wait until DOM updated
//     requestAnimationFrame(() => {
//       bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
//     });
//   }, [messages.length, isTyping]);

//   function handleIntroPush(msg: any) {
//     pushMessage(msg.sender, msg.content || "");
//   }
//   function handleIntroComplete() {
//     setIntroPlaying(false);
//   }

//   function handleTyping(value: string) {
//     setInputValue(value);
//     if (!userTyped && value.length > 0) {
//       setUserTyped(true);
//       setIntroPlaying(false);
//     }
//     if (value.trim() === "") setSuggestions(QA_DATA.slice(0, 6).map(i => ({ id: i.id, text: i.topic })));
//     else {
//       setSuggestions(getTopicSuggestions(value, 6));
//     }
//   }

//   async function handleSend(raw?: string) {
//     const text = (raw ?? inputValue ?? "").trim();
//     if (!text) return;
//     if (introPlaying) setIntroPlaying(false);
//     if (!userTyped) setUserTyped(true);

//     pushMessage("user", text);
//     setInputValue("");
//     setSuggestions([]);

//     // show typing
//     setIsTyping(true);
//     await new Promise(r => setTimeout(r, 350));
//     const matched = findTopicMatch(text);
//     let reply = "";
//     if (matched) reply = matched.answer;
//     else {
//       // fallback search by token
//       const token = text.toLowerCase().split(/\s+/)[0] || text;
//       const fallback = QA_DATA.find(i => i.keywords.some(k => k.includes(token)));
//       reply = fallback ? fallback.answer : "Thanks — I'll reply shortly. Try one of the suggestions.";
//     }
//     // small realistic delay
//     await new Promise(r => setTimeout(r, Math.min(900, reply.length * 6)));
//     pushMessage("namila", reply);
//     setIsTyping(false);
//   }

//   function handleSuggestionClick(text: string) {
//     handleSend(text);
//   }

//   // compute chat container height so suggestions + input never overlap content
//   // The parent page has padding; chat container is in the main column — we keep this component's outer style flexible.
//   return (
//     <div className="flex flex-col" style={{ height: `calc(100vh - ${headerHeight  + 20}px)` }}>
//       <div ref={messagesRef} className="flex-1 overflow-y-auto hide-scrollbar pr-1 pb-6" aria-live="polite" role="log">
//         <div className="space-y-6 pt-4">
//           {messages.map(m => <MessageBubble key={m.id} msg={m as any} />)}
//           {isTyping && (
//             <div className="flex px-2">
//               <div className="w-8 h-8 mr-3 flex-shrink-0">
//                 <img src="/images/namila_1.webp" alt="Namila" className="rounded-full object-cover w-8 h-8" />
//               </div>
//               <div className="bg-[#121212] rounded-2xl p-3">
//                 <div className="flex space-x-1">
//                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
//                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
//                   <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
//                 </div>
//               </div>
//             </div>
//           )}
//           <div ref={bottomRef} />
//         </div>
//       </div>

//       {/* suggestions (above input) */}
//       <div className="px-2">
//         {suggestions.length > 0 && (
//           <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
//             {suggestions.map(s => (
//               <button key={s.id} onClick={() => handleSuggestionClick(s.text)} className="whitespace-nowrap bg-[#1a1a1a] px-3 py-2 rounded-full text-sm border border-gray-800 hover:bg-[#222] flex-shrink-0">
//                 {s.text}
//               </button>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* input fixed above footer (but inside component wrapper so layout adjusts) */}
//       <div className="fixed left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl px-4" style={{ bottom: `${headerHeight + 18}px`, pointerEvents: "none" }}>
//         <div className="pointer-events-auto backdrop-blur-lg bg-black/40 rounded-2xl px-3 py-2 shadow-lg border border-white/5 flex items-center gap-3" style={{ transition: "height 160ms ease, transform 160ms ease" }}>
//           <InputBar value={inputValue} onChange={handleTyping} onSend={handleSend} />
//         </div>
//       </div>

//       {introPlaying && <AutoIntro onPush={handleIntroPush} playing={introPlaying} onComplete={handleIntroComplete} />}

//       <style jsx>{`
//         @media (max-height: 600px) {
//           main { padding-bottom: ${headerHeight + 12}px; }
//         }
//       `}</style>
//     </div>
//   );
// }

"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import MessageBubble from "./MessageBubble";
import InputBar from "./InputBar";
import { getTopicSuggestions, findTopicMatch } from "@/lib/qa-engine";
import { QA_DATA } from "@/data/qa";
import { INTRO_MESSAGES } from "@/data/introMessages";
import behanceData from "@/public/animations/behance.json";

type Message = {
  id: string;
  sender: "namila" | "user" | "system";
  content?: string;
  time?: string;
  hasImage?: boolean;
  hasLottie?: boolean;
  imageSrc?: string;
  imageAlt?: string;
  lottieData?: any;
  externalUrl?: string;
  projectId?: string;
  hasProfileImage?: boolean;
  profileImageSrc?: string;
};

export default function ChatContainer({ headerHeight }: { headerHeight: number }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [introPlaying, setIntroPlaying] = useState(true);
  const [userTyped, setUserTyped] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ id: number; text: string }[]>([]);

  const messagesRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const inputWrapperRef = useRef<HTMLDivElement | null>(null);
  const suggestionsWrapperRef = useRef<HTMLDivElement | null>(null);
  const [messagesHeight, setMessagesHeight] = useState<number>(0);

  const formatTime = (d = new Date()) =>
    new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" }).format(d);

  /** NORMAL MESSAGE */
  const pushMessage = (sender: "namila" | "user", content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender,
        content,
        time: formatTime(),
      },
    ]);
  };

  /** SYSTEM MESSAGE */
  const pushSystemMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender: "system",
        content,
        time: formatTime(),
      },
    ]);
  };

  /** CONTACT FORM SUBMIT */
  const handleSubmitContact = (form: any) => {
    setMessages((prev) => prev.filter((m) => m.content !== "__contact_form__"));

    pushMessage(
      "namila",
      `Thanks for reaching out! I received your message.<br/><br/>
       <strong>Name:</strong> ${form.name}<br/>
       <strong>Email:</strong> ${form.email}<br/>
       <strong>Message:</strong> ${form.message}<br/><br/>
       I’ll get back to you soon.`
    );
  };

  /** INTRO autoplay */
  useEffect(() => {
    if (!introPlaying) return;
    let cancel = false;

    const intro = INTRO_MESSAGES.slice(0, 4);
    let i = 0;

    const play = () => {
      if (cancel || i >= intro.length) {
        setIntroPlaying(false);
        return;
      }

      const msg = intro[i];
      const delay = 500 + Math.min(2200, msg.content.length * 14);

      setTimeout(() => {
        if (cancel) return;
        pushMessage("namila", msg.content);
        i++;
        play();
      }, delay);
    };

    play();
    return () => {
      cancel = true;
    };
  }, [introPlaying]);

  useEffect(() => {
    setSuggestions(QA_DATA.slice(0, 6).map((i) => ({ id: i.id, text: i.topic })));
  }, []);

  /** HEIGHT CALCULATION */
  const recomputeHeight = useCallback(() => {
    const vh = window.innerHeight;
    const header = headerHeight || 0;

    const inputH = inputWrapperRef.current
      ? inputWrapperRef.current.getBoundingClientRect().height
      : 70;

    const suggH = suggestionsWrapperRef.current
      ? suggestionsWrapperRef.current.getBoundingClientRect().height
      : 0;

    const available = vh - header - inputH - suggH - 16;
    setMessagesHeight(Math.max(140, available));
  }, [headerHeight]);

  useEffect(() => {
    recomputeHeight();
    const onResize = () => recomputeHeight();
    window.addEventListener("resize", onResize);

    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    return () => {
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = prev;
    };
  }, [recomputeHeight]);

  useEffect(() => {
    const id = setTimeout(() => recomputeHeight(), 50);
    return () => clearTimeout(id);
  }, [inputValue, suggestions.length, recomputeHeight]);

  /** AUTO SCROLL */
  useEffect(() => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    });
  }, [messages.length, isTyping]);

  /** TYPING */
  const handleTyping = (v: string) => {
    setInputValue(v);

    if (!userTyped && v.length > 0) {
      setUserTyped(true);
      setIntroPlaying(false);
    }

    if (!v.trim()) {
      setSuggestions(QA_DATA.slice(0, 6).map((i) => ({ id: i.id, text: i.topic })));
      return;
    }

    setSuggestions(getTopicSuggestions(v, 6));
  };

  /** SEND MESSAGE */
  const handleSend = async (raw?: string) => {
    const text = (raw ?? inputValue).trim();
    if (!text) return;

    setIntroPlaying(false);
    setUserTyped(true);
    pushMessage("user", text);
    setInputValue("");
    setSuggestions([]);

    /** 🔥 Contact form trigger */
    if (/contact|email|hire|reach|message you/i.test(text)) {
      pushSystemMessage("__contact_form__");
      return;
    }

    /** 🔥 PROFILE TRIGGER */
    if (/about you|yourself|who are you|your bio|who is namila/i.test(text)) {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-profile`,
          sender: "namila",
          content: "Here’s a little about me!, I'm passionate about making digital experiences easier and more enjoyable for people. With over a year of hands-on experience in design and UI development, I focus on creating interfaces that not only look great but also work smoothly and make sense to users.",
          hasProfileImage: true,
          profileImageSrc: "/images/profile_3_1.webp",
          time: formatTime(),
        },
      ]);
      return;
    }

    /** 🔥 PROJECT TRIGGER */
    if (/project|portfolio|app design|ui design/i.test(text)) {
      // First project
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-p1`,
          sender: "namila",
          content: "This is a mobile app I created for discovering and watching movie trailers.",
          hasImage: true,
          imageSrc: "/project/project-1.png",
          imageAlt: "Movie Trailer App UI Design",
          projectId: "mobile-app-ui",
          time: formatTime(),
        },
      ]);

      // Behance showcase
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-behance`,
            sender: "namila",
            content: "Check out more of my creative explorations on Behance.",
            hasLottie: true,
            lottieData: behanceData,
            externalUrl: "https://www.behance.net/namilapreshan1",
            time: formatTime(),
          },
        ]);
      }, 400);

      return;
    }

    if (/tools|design tools|figma|software/i.test(text)) {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-tools`,
          sender: "namila",
          content: "🛠 Design Tools I use:",
          tools: [
            { name: "Figma", icon: "/icons/Figma.svg" },
            { name: "Illustrator", icon: "/icons/Illustrator.svg" },
            { name: "Photoshop", icon: "/icons/Photoshop.svg" },
          ],
          time: formatTime(),
        },
      ]);
      return;
    }
   
    if (/tech|technology|stack|frontend|coding/i.test(text)) {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-tech`,
          sender: "namila",
          content: "💻 Technologies I use:",
          tools: [
            { name: "HTML", icon: "/icons/HTML5.svg" },
            { name: "SCSS", icon: "/icons/Sass.svg" },
            { name: "Tailwind CSS", icon: "/icons/Tailwind.svg" },
            { name: "JavaScript", icon: "/icons/JS.svg" },
            { name: "Angular", icon: "/icons/Angular.svg" },
            { name: "Next.js", icon: "/icons/nextjs.png" },
            { name: "TypeScript", icon: "/icons/TypeScript.svg" },
          ],
          time: formatTime(),
        },
      ]);
      return;
    }
    

    /** NORMAL QA FLOW */
    setIsTyping(true);
    await new Promise((r) => setTimeout(r, 300));

    const matched = findTopicMatch(text);
    let reply = "";

    if (matched) reply = matched.answer;
    else {
      const token = text.toLowerCase().split(/\s+/)[0];
      const fallback = QA_DATA.find((i) =>
        i.keywords.some((k) => k.includes(token))
      );
      reply = fallback
        ? fallback.answer
        : "I’ll get back to you soon. Try one of the suggestions.";
    }

    await new Promise((r) => setTimeout(r, Math.min(900, reply.length * 6)));
    pushMessage("namila", reply);
    setIsTyping(false);
  };

  return (
    <div className="w-full relative">

      <div
        ref={messagesRef}
        className="hide-scrollbar overflow-y-auto pr-3"
        style={{ height: `${messagesHeight - 24}px` }}
      >
        <div className="space-y-6 pt-4">
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              msg={m}
              onSubmitContact={handleSubmitContact}
            />
          ))}

          {isTyping && (
            <div className="flex px-2">
              <img src="/images/namila_1.webp" alt="namila" className="w-8 h-8 rounded-full mr-3" />
              <div className="bg-[#121212] rounded-2xl p-3">
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div
        ref={suggestionsWrapperRef}
        className="w-full px-4"
        style={{
          position: "fixed",
          bottom: 64,
          left: "50%",
          transform: "translateX(-50%)",
          maxWidth: 672,
          zIndex: 60,
        }}
      >
        {suggestions.length > 0 && (
          <div className="flex gap-2 overflow-x-auto hide-scrollbar py-2">
            {suggestions.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSend(s.text)}
                className="whitespace-nowrap bg-[#1a1a1a] px-3 py-2 rounded-full text-sm border border-gray-800 hover:bg-[#222]"
              >
                {s.text}
              </button>
            ))}
          </div>
        )}
      </div>

      <div
        ref={inputWrapperRef}
        style={{
          position: "fixed",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: 672,
          padding: "0 16px",
          zIndex: 70,
        }}
      >
        <div className="backdrop-blur-lg bg-black/40 border border-white/5 rounded-2xl px-3 py-2 flex items-center gap-3">
          <InputBar value={inputValue} onChange={handleTyping} onSend={handleSend} />
        </div>
      </div>
    </div>
  );
}
