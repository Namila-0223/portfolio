"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { motion } from "framer-motion"

export const MessageInput = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In a real app, you would send the form data to your backend
    console.log({ name, email, message })

    setIsSubmitting(false)
    setIsSubmitted(true)
    setName("")
    setEmail("")
    setMessage("")

    // Reset submitted state after 3 seconds
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <motion.div
      className="sticky bottom-0 w-full bg-[#0f0f0f] border-t border-gray-800 p-4"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-800 border-gray-700"
          />
        </div>
        <div className="flex">
          <Textarea
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="bg-gray-800 border-gray-700 flex-1 resize-none"
            rows={2}
          />
          <Button type="submit" size="icon" className="ml-2 bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
            <Send size={18} />
          </Button>
        </div>

        {isSubmitted && (
          <motion.p className="text-green-400 text-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            Message sent! I'll get back to you soon.
          </motion.p>
        )}
      </form>
    </motion.div>
  )
}
