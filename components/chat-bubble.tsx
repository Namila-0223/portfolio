"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import type { ReactNode } from "react"

interface ChatBubbleProps {
  isUser?: boolean
  children: ReactNode
  hasImage?: boolean
  imageUrl?: string
  imageAlt?: string
  isTestimonial?: boolean
}

export function ChatBubble({
  isUser = false,
  children,
  hasImage = false,
  imageUrl = "/placeholder.svg?height=180&width=280",
  imageAlt = "Image",
  isTestimonial = false,
}: ChatBubbleProps) {
  return (
    <motion.div
      className={`flex ${isUser ? "justify-end" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="w-8 h-8 mr-2 flex-shrink-0">
          <Image
            src="/placeholder.svg?height=32&width=32"
            alt="Namila"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      )}

      <div
        className={`p-4 max-w-[80%] ${
          isUser
            ? "bg-[#1a1a1a] rounded-2xl rounded-tr-none"
            : isTestimonial
              ? "bg-[#232323] rounded-2xl rounded-tl-none"
              : "bg-[#1a1a1a] rounded-2xl rounded-tl-none"
        }`}
      >
        <p className={isTestimonial ? "text-sm italic" : "text-sm"}>{children}</p>

        {hasImage && (
          <div className="mt-3 mb-2">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={imageAlt}
              width={280}
              height={180}
              className="rounded-lg w-full"
            />
          </div>
        )}
      </div>

      {isUser && (
        <div className="w-8 h-8 ml-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-700"></div>
        </div>
      )}
    </motion.div>
  )
}
