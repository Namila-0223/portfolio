"use client"

import { MessageBubble } from "../message-bubble"
import { Button } from "@/components/ui/button"
import { Copy, Calendar, Linkedin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface ContactSectionProps {
  isActive: boolean
}

export const ContactSection = ({ isActive }: ContactSectionProps) => {
  const { toast } = useToast()

  if (!isActive) return null

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hello@example.com")
    toast({
      title: "Email copied!",
      description: "Email address copied to clipboard",
    })
  }

  return (
    <div>
      <MessageBubble isUser delay={0}>
        <p>I'm very impressed by your work. Anything else you'd like to share?</p>
      </MessageBubble>

      <MessageBubble delay={1}>
        <h2 className="text-xl font-bold mb-3">About Me</h2>
        <p>
          I'm all about improving how people interact with digital products. With over 5 years of experience in design
          and front-end development, I help brands create good design that looks amazing while being functional.
        </p>
        <div className="mt-4">
          <Image
            src="/placeholder.svg?height=200&width=200"
            alt="Profile photo"
            width={200}
            height={200}
            className="rounded-lg mx-auto"
          />
          <p className="text-center mt-2 text-sm">That's me :)</p>
        </div>
      </MessageBubble>

      <MessageBubble delay={2}>
        <p>I also have a newsletter I write weekly:</p>
        <div className="mt-3 space-y-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h3 className="font-medium">Improving Customer Experience: A Comparison</h3>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h3 className="font-medium">Exploring the New Notion UI/UX: Addressing the Controversy</h3>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-3">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="font-medium">10 UI/UX Micro Animations to Add in Your Design</h3>
            </div>
          </div>
        </div>
      </MessageBubble>

      <MessageBubble isUser delay={3}>
        <p>How can I get in touch with you?</p>
      </MessageBubble>

      <MessageBubble delay={4}>
        <h2 className="text-xl font-bold mb-3">Let's Connect</h2>
        <p className="mb-4">My email is hello@example.com</p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyEmail}
            className="bg-gray-700 hover:bg-gray-600 border-gray-600"
          >
            <Copy size={14} className="mr-2" />
            Copy Email
          </Button>

          <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 border-gray-600">
            <Linkedin size={14} className="mr-2" />
            Connect on LinkedIn
          </Button>

          <Button variant="outline" size="sm" className="bg-gray-700 hover:bg-gray-600 border-gray-600">
            <Calendar size={14} className="mr-2" />
            Book a call
          </Button>
        </div>

        <p className="mt-4 text-sm text-gray-300">
          I usually reply within 24 hours to communicate a good fit. I like to focus on projects that make a real
          impact.
        </p>
      </MessageBubble>

      <MessageBubble delay={5}>
        <p>You can also leave me a message, and I'll be sure to get back to you as soon as possible.</p>
      </MessageBubble>
    </div>
  )
}
