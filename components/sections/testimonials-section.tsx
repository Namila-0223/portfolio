"use client"

import { MessageBubble } from "../message-bubble"
import { useEffect } from "react"
import { useInView } from "react-intersection-observer"
import Image from "next/image"

interface TestimonialsSectionProps {
  onComplete: () => void
  isActive: boolean
}

export const TestimonialsSection = ({ onComplete, isActive }: TestimonialsSectionProps) => {
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
      <MessageBubble isUser delay={0}>
        <p>Here's what a few people have said after working with me.</p>
      </MessageBubble>

      <MessageBubble delay={1} className="bg-gray-700">
        <div className="flex items-center mb-2">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="Client 1"
            width={30}
            height={30}
            className="rounded-full mr-2"
          />
          <span className="text-sm font-medium">Sarah J. • Product Manager</span>
        </div>
        <p className="italic text-gray-200">
          "John is a true asset to design, blending artistry with functionality. His exceptional user-friendly UX
          designs are always on point, and his ability to understand client needs has made our collaboration incredibly
          successful."
        </p>
      </MessageBubble>

      <MessageBubble delay={2} className="bg-gray-700">
        <div className="flex items-center mb-2">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="Client 2"
            width={30}
            height={30}
            className="rounded-full mr-2"
          />
          <span className="text-sm font-medium">Michael T. • CEO at TechStart</span>
        </div>
        <p className="italic text-gray-200">
          "Working with John has been a game-changer for our product. His designs are not only beautiful but also highly
          functional. His collaborative spirit and attention to detail make him highly recommended!"
        </p>
      </MessageBubble>

      <MessageBubble delay={3} className="bg-gray-700">
        <div className="flex items-center mb-2">
          <Image
            src="/placeholder.svg?height=30&width=30"
            alt="Client 3"
            width={30}
            height={30}
            className="rounded-full mr-2"
          />
          <span className="text-sm font-medium">Lisa R. • Marketing Director</span>
        </div>
        <p className="italic text-gray-200">
          "I highly recommend John as an exceptional product designer. His amazing balance of aesthetics and
          functionality has transformed our digital presence. John is creative and resourceful - a valuable asset to any
          team."
        </p>
      </MessageBubble>
    </div>
  )
}
