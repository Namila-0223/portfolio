"use client"

import { MessageBubble } from "../message-bubble"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

interface ProjectsSectionProps {
  onComplete: () => void
  isActive: boolean
}

export const ProjectsSection = ({ onComplete, isActive }: ProjectsSectionProps) => {
  const [ref, inView] = useInView({
    threshold: 0.3,
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
      <MessageBubble delay={0}>
        <h2 className="text-xl font-bold mb-3">Here's some recent work</h2>

        <div className="space-y-4">
          <div>
            <Image
              src="/placeholder.svg?height=200&width=350"
              alt="Project 1"
              width={350}
              height={200}
              className="rounded-lg mb-2 w-full"
            />
            <h3 className="font-medium">E-commerce Dashboard</h3>
            <p className="text-sm text-gray-300">A modern dashboard for managing products and orders</p>
          </div>
        </div>
      </MessageBubble>

      <MessageBubble delay={1}>
        <h3 className="font-medium mb-2">Take a look at my creative explorations</h3>
        <Image
          src="/placeholder.svg?height=200&width=350"
          alt="Dribbble shots"
          width={350}
          height={200}
          className="rounded-lg mb-2 w-full"
        />
        <p className="text-sm text-gray-300">Design concepts that push boundaries.</p>
        <Button variant="outline" size="sm" className="mt-3">
          <ExternalLink size={14} className="mr-2" />
          View on Dribbble
        </Button>
      </MessageBubble>

      <MessageBubble isUser delay={2}>
        <p>These look great! What kind of projects do you enjoy working on?</p>
      </MessageBubble>

      <MessageBubble delay={3}>
        <h2 className="text-xl font-bold mb-3">Design Projects</h2>
        <p>
          I enjoy projects where I've collaborated with startups to solve real problems and deliver measurable results.
        </p>
      </MessageBubble>
    </div>
  )
}
