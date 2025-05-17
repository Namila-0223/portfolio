"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MessageBubbleProps {
  children: ReactNode
  isUser?: boolean
  delay?: number
  avatar?: string
  className?: string
}

export const MessageBubble = ({
  children,
  isUser = false,
  delay = 0,
  avatar = "/placeholder.svg?height=40&width=40",
  className,
}: MessageBubbleProps) => {
  const variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        delay: delay * 0.2,
      },
    },
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      className={cn("flex items-start mb-6 max-w-[85%]", isUser ? "ml-auto" : "mr-auto")}
    >
      {!isUser && (
        <div className="flex-shrink-0 mr-3">
          <Image src={avatar || "/placeholder.svg"} alt="Avatar" width={40} height={40} className="rounded-full" />
        </div>
      )}

      <div
        className={cn(
          "p-4 rounded-2xl shadow-md",
          isUser ? "bg-blue-600 text-white rounded-tr-none" : "bg-gray-800 text-white rounded-tl-none",
          className,
        )}
      >
        {children}
      </div>

      {isUser && (
        <div className="flex-shrink-0 ml-3">
          <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        </div>
      )}
    </motion.div>
  )
}
