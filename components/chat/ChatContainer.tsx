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
  const pushMessage = (sender: "namila" | "user", content: string, tools?: { name: string; icon: string }[]) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        sender,
        content,
        tools,
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

    if (/tech|technology|stack|frontend|coding/i.test(text)) {
      setMessages(prev => [
        ...prev,
        {
          id: `${Date.now()}-tech`,
          sender: "namila",
          content: "💻 Technologies I use:",
          tools: [
            { name: "Figma", icon: "/icons/Figma.svg" },
            { name: "Illustrator", icon: "/icons/Illustrator.svg" },
            { name: "Photoshop", icon: "/icons/Photoshop.svg" },
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

    // Determine complexity
    const wordCount = text.trim().split(/\s+/).length;
    const matched = findTopicMatch(text);

    // Heuristic: 
    // - If it's a short query (< 4 words) and we have a match, use predefined.
    // - If it's a long query, we prefer AI UNLESS the match is exact/strong (score > 100).
    // - If no match, use AI.

    let reply = "";

    // Check if we should use predefined answer
    const isGreeting = matched?.topic === "greeting" || matched?.topic === "appreciation" || matched?.topic === "bye";
    const hasSpecialContent = matched?.tools || matched?.hasImage || matched?.hasLottie || (matched as any)?.triggerProject || (matched as any)?.triggerContactForm;

    // Use predefined answer if:
    // 1. It's a greeting/short query (< 4 words)
    // 2. It has special content (tools, images, projects)
    // 3. It's a topic-specific match (tools, projects, contact, etc.)
    const shouldUsePredefined = matched && (
      wordCount < 4 ||
      isGreeting ||
      hasSpecialContent ||
      matched.topic === "tools" ||
      matched.topic === "projects" ||
      matched.topic === "contact"
    );

    if (shouldUsePredefined) {
      reply = matched.answer;

      // If matched item has tools, add them to the message
      if (matched.tools && matched.tools.length > 0) {
        pushMessage("namila", reply, matched.tools);
        setIsTyping(false);
        return;
      }
    } else {
      // AI FALLBACK (Google Gemini)
      try {
        // console.log("Calling AI with:", text);
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        });

        const data = await res.json();
        // console.log("AI reply:", data);

        if (data.reply) {
          reply = data.reply;

          // Handle additional messages (split long responses into multiple bubbles)
          if (data.additionalMessages && data.additionalMessages.length > 0) {
            // Send first message
            await new Promise((r) => setTimeout(r, Math.min(900, reply.length * 6)));
            pushMessage("namila", reply);
            setIsTyping(false);

            // Send additional messages with delays
            for (let i = 0; i < data.additionalMessages.length; i++) {
              const additionalMsg = data.additionalMessages[i];

              // Show typing indicator
              await new Promise((r) => setTimeout(r, 800));
              setIsTyping(true);

              // Send message
              await new Promise((r) => setTimeout(r, Math.min(900, additionalMsg.length * 6)));
              pushMessage("namila", additionalMsg);
              setIsTyping(false);
            }
            return; // Exit early since we've handled all messages
          }
        } else if (matched) {
          // If AI fails but we had a sort-of match, fallback to it
          reply = matched.answer;
        } else {
          reply = "I'm having trouble connecting to my brain right now. 🧠 Try asking about my **Projects** or **Skills**.";
        }

      } catch (e) {
        console.error("AI Error:", e);
        if (matched) reply = matched.answer;
        else reply = "I’m focused on Namila’s work — ask me about his *Design System* or *Mobile Apps*.";
      }
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
              <div className="bg-[#1A1A1A] rounded-2xl p-3">
                <div className="flex items-center space-x-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
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
