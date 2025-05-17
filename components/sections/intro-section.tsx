"use client"

import { MessageBubble } from "../message-bubble"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"

interface IntroSectionProps {
  onComplete: () => void
  isActive: boolean
}

export const IntroSection = ({ onComplete, isActive }: IntroSectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      onComplete()
    }
  }, [inView, onComplete])

  if (!isActive) return null

  return (
    <div ref={ref}>
      <MessageBubble avatar="/placeholder.svg?height=40&width=40" delay={0}>
        <h1 className="text-xl font-bold mb-2">Hey! I'm John Doe</h1>
        <p>Digital Product Designer & Developer</p>
        <p className="text-sm text-gray-300 mt-2">Crafting interfaces that matter ✨</p>
      </MessageBubble>

      <MessageBubble isUser delay={1}>
        <p>Nice to meet you! Can I see your work?</p>
      </MessageBubble>

      <MessageBubble delay={2}>
        <p>
          Of course! Here's my portfolio where I've worked with startups and established brands to create meaningful
          digital products and brands that stand out.
        </p>
        <p className="mt-2">I focus on intuitive and truly useful solutions.</p>
      </MessageBubble>
    </div>
  )
}
