"use client";

import React, { useEffect, useState } from "react";
import ChatContainer from "@/components/chat/ChatContainer";
import { ProfileHeader } from "@/components/profile-header";
import FloatingMenu from "@/components/floating-menu";
import Lottie from "lottie-react";
import behanceData from "@/public/animations/behance.json";

export default function Home() {
  const FOOTER_HEIGHT = 64;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate);

  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Colombo", // Force correct time zone
  }).format(currentDate);

  // Keep the same designer object and header UI as original file
  const designer = {
    name: "Namila Preshan",
    title: "UI/UX Engineer & Experience Designer",
    tagline: "Designing seamless, human-centered products ✨",
    location: "Sri Lanka",
    email: "hello@namila.me",
    personality: "ENFJ-T",
    avatar: "/images/namila_1.webp?height=250&width=250",
    isOnline: true,
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // update every minute
    return () => clearInterval(timer);
  }, []);

  // Sync header height with scroll state for proper spacing
  useEffect(() => {
    // If scrolled, header becomes smaller (80px), otherwise larger (220px to match initial expanded state)
    const newHeight = isScrolled ? 100 : 210;
    setHeaderHeight(newHeight);
  }, [isScrolled]);

  // Handler passed to ChatContainer to detect internal scroll
  const handleScrollChange = (scrolled: boolean) => {
    setIsScrolled(scrolled);
  };

  return (
    <main className="min-h-screen bg-[#0f0f0f] text-white overflow-hidden">
      {/* Header controlled by isScrolled state */}
      <ProfileHeader designer={designer} isScrolled={isScrolled} />

      <div style={{ paddingTop: `${headerHeight}px`, transition: "padding-top 0.3s ease-in-out" }}>
        {/* The chat area (we reduced markup here; ChatContainer has all chat UI) */}
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div className="flex justify-center py-3">
            <div className="flex justify-center">
              <div className="bg-gray-950 rounded-full px-4 py-1 text-xs text-gray-400">
                {formattedDate} • {formattedTime}
              </div>
            </div>
          </div>

          {/* ChatContainer takes remaining height */}
          <div className="flex-grow relative">
            <ChatContainer headerHeight={headerHeight} onScrollChange={handleScrollChange} />
          </div>
        </div>

        {/* Footer commented out as before */}
        {/* <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0b0b0b] border-t border-gray-800" style={{ height: `${FOOTER_HEIGHT}px` }}>
          <div className="max-w-2xl mx-auto px-4 h-full flex items-center justify-center text-xs text-gray-400">
            © 2025 Made with ❤️ by Namila Preshan
          </div>
        </div> */}

        {/* <FloatingMenu /> */}
      </div>
    </main>
  );
}
