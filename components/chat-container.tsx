"use client"

import { useEffect, useRef, useState } from "react"
import { IntroSection } from "./sections/intro-section"
import { ProjectsSection } from "./sections/projects-section"
import { TestimonialsSection } from "./sections/testimonials-section"
import { ContactSection } from "./sections/contact-section"
import { MessageInput } from "./message-input"
import { useMobile } from "@/hooks/use-mobile"

export const ChatContainer = () => {
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMobile()

  // Load saved scroll position from localStorage
  useEffect(() => {
    const savedPosition = localStorage.getItem("chatScrollPosition")
    const savedSection = localStorage.getItem("activeChatSection")

    if (savedPosition && containerRef.current) {
      containerRef.current.scrollTop = Number.parseInt(savedPosition)
    }

    if (savedSection) {
      setActiveSection(Number.parseInt(savedSection))
    }
  }, [])

  // Save scroll position to localStorage
  const handleScroll = () => {
    if (containerRef.current) {
      localStorage.setItem("chatScrollPosition", containerRef.current.scrollTop.toString())
    }
  }

  return (
    <div className="w-full max-w-3xl mx-auto h-screen flex flex-col" ref={containerRef} onScroll={handleScroll}>
      <div className="flex-1 overflow-y-auto p-4 pb-32">
        <IntroSection
          onComplete={() => {
            setActiveSection(1)
            localStorage.setItem("activeChatSection", "1")
          }}
          isActive={activeSection >= 0}
        />

        <ProjectsSection
          onComplete={() => {
            setActiveSection(2)
            localStorage.setItem("activeChatSection", "2")
          }}
          isActive={activeSection >= 1}
        />

        <TestimonialsSection
          onComplete={() => {
            setActiveSection(3)
            localStorage.setItem("activeChatSection", "3")
          }}
          isActive={activeSection >= 2}
        />

        <ContactSection isActive={activeSection >= 3} />
      </div>

      <MessageInput />
    </div>
  )
}
