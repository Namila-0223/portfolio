"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, ChevronLeft } from "lucide-react";

// Project data
const projectsData = {
    "fintech-dashboard": {
        title: "Fintech Dashboard",
        description: "A comprehensive dashboard for a fintech startup",
        coverImage: "/images/dashboard-project.png",
        client: "FinanceFlow Inc.",
        duration: "3 months",
        role: "Lead UI/UX Designer",
        year: "2023",
        tools: ["Figma", "Illustrator", "Principle", "Notion"],
        messages: [
            {
                id: 1,
                sender: "user",
                senderName: "You",
                content: "Tell me more about this fintech dashboard project.",
            },
            {
                id: 2,
                sender: "namila",
                senderName: "Namila",
                content:
                    "This was an exciting project for FinanceFlow Inc., a startup in the financial technology space.",
            },
            {
                id: 3,
                sender: "namila",
                senderName: "Namila",
                content:
                    "The challenge was to create a dashboard that simplifies complex financial data for users while maintaining a clean, modern aesthetic.",
            },
            {
                id: 4,
                sender: "namila",
                senderName: "Namila",
                content: "Here's the main dashboard view:",
                hasImage: true,
                imageSrc: "/images/dashboard-project.png",
                imageAlt: "Dashboard main view",
            },
            {
                id: 5,
                sender: "namila",
                senderName: "Namila",
                content:
                    "I started with extensive user research to understand the needs of financial professionals and casual investors alike.",
            },
            {
                id: 6,
                sender: "user",
                senderName: "You",
                content: "What was your design process like?",
            },
            {
                id: 7,
                sender: "namila",
                senderName: "Namila",
                content: "I followed a user-centered design process with these key phases:",
            },
            {
                id: 8,
                sender: "namila",
                senderName: "Namila",
                content: "1. Research & Discovery",
                isProcess: true,
                number: 1,
            },
            {
                id: 9,
                sender: "namila",
                senderName: "Namila",
                content: "2. Wireframing & Information Architecture",
                isProcess: true,
                number: 2,
            },
            {
                id: 10,
                sender: "namila",
                senderName: "Namila",
                content: "3. Visual Design & Prototyping",
                isProcess: true,
                number: 3,
            },
            {
                id: 11,
                sender: "namila",
                senderName: "Namila",
                content: "4. User Testing & Iteration",
                isProcess: true,
                number: 4,
            },
            {
                id: 12,
                sender: "user",
                senderName: "You",
                content: "What tools did you use for this project?",
            },
            {
                id: 13,
                sender: "namila",
                senderName: "Namila",
                content: "I used a variety of tools for different phases of the project:",
                showTools: true,
            },
            {
                id: 14,
                sender: "namila",
                senderName: "Namila",
                content: "Here are some wireframes from the early stages:",
                hasImage: true,
                imageSrc: "/images/dashboard-wireframes.png",
                imageAlt: "Dashboard wireframes",
            },
            {
                id: 15,
                sender: "namila",
                senderName: "Namila",
                content: "And here's a detailed view of the analytics section:",
                hasImage: true,
                imageSrc: "/images/dashboard-analytics.png",
                imageAlt: "Dashboard analytics section",
            },
            {
                id: 16,
                sender: "user",
                senderName: "You",
                content: "What were some of the key features you implemented?",
            },
            {
                id: 17,
                sender: "namila",
                senderName: "Namila",
                content: "The dashboard includes several key features designed to enhance the user experience:",
            },
            {
                id: 18,
                sender: "namila",
                senderName: "Namila",
                content: "• Real-time financial data visualization with customizable charts",
            },
            {
                id: 19,
                sender: "namila",
                senderName: "Namila",
                content: "• Personalized insights and recommendations based on user behavior",
            },
            {
                id: 20,
                sender: "namila",
                senderName: "Namila",
                content: "• Simplified transaction history with smart categorization",
            },
            {
                id: 21,
                sender: "namila",
                senderName: "Namila",
                content: "• Dark/light mode for different working environments",
            },
            {
                id: 22,
                sender: "namila",
                senderName: "Namila",
                content: "• Responsive design that works seamlessly across devices",
            },
            {
                id: 23,
                sender: "namila",
                senderName: "Namila",
                content: "Here's the mobile version of the dashboard:",
                hasImage: true,
                imageSrc: "/images/dashboard-mobile.png",
                imageAlt: "Dashboard mobile version",
            },
            {
                id: 24,
                sender: "user",
                senderName: "You",
                content: "What was the outcome of this project?",
            },
            {
                id: 25,
                sender: "namila",
                senderName: "Namila",
                content: "The redesigned dashboard led to significant improvements:",
            },
            {
                id: 26,
                sender: "namila",
                senderName: "Namila",
                content: "• 42% increase in user engagement",
            },
            {
                id: 27,
                sender: "namila",
                senderName: "Namila",
                content: "• 35% reduction in support tickets related to UI confusion",
            },
            {
                id: 28,
                sender: "namila",
                senderName: "Namila",
                content: "• 28% increase in daily active users",
            },
            {
                id: 29,
                sender: "namila",
                senderName: "Namila",
                content:
                    "The client was extremely satisfied with the results, and we've continued our partnership for future product enhancements.",
            },
            {
                id: 30,
                sender: "namila",
                senderName: "Namila",
                content: "Would you like to see more projects like this one?",
            },
        ],
    },
    "dribbble-explorations": {
        title: "Dribbble Explorations",
        description: "Creative design explorations shared on Dribbble",
        coverImage: "/images/dribbble-shots.png",
        client: "Personal Projects",
        duration: "Ongoing",
        role: "UI/UX Designer",
        year: "2022-2023",
        tools: ["Figma", "Photoshop", "After Effects", "Blender"],
        messages: [
            {
                id: 1,
                sender: "user",
                senderName: "You",
                content: "I'd love to hear about your Dribbble explorations.",
            },
            {
                id: 2,
                sender: "namila",
                senderName: "Namila",
                content:
                    "My Dribbble explorations are where I get to experiment with new design trends and push my creative boundaries.",
            },
            {
                id: 3,
                sender: "namila",
                senderName: "Namila",
                content: "Here's a collection of some of my recent shots:",
                hasImage: true,
                imageSrc: "/images/dribbble-shots.png",
                imageAlt: "Dribbble shots collection",
            },
            {
                id: 4,
                sender: "namila",
                senderName: "Namila",
                content:
                    "These explorations help me stay fresh and innovative in my client work by experimenting with new styles, interactions, and visual languages.",
            },
            {
                id: 5,
                sender: "user",
                senderName: "You",
                content: "What tools do you use for these creative explorations?",
            },
            {
                id: 6,
                sender: "namila",
                senderName: "Namila",
                content: "I use a variety of tools depending on the type of exploration:",
                showTools: true,
            },
            {
                id: 7,
                sender: "user",
                senderName: "You",
                content: "What's your creative process for these explorations?",
            },
            {
                id: 8,
                sender: "namila",
                senderName: "Namila",
                content: "For my creative explorations, I follow a more fluid process:",
            },
            {
                id: 9,
                sender: "namila",
                senderName: "Namila",
                content: "1. Find inspiration from various sources (architecture, nature, other designers)",
                isProcess: true,
                number: 1,
            },
            {
                id: 10,
                sender: "namila",
                senderName: "Namila",
                content: "2. Sketch rough ideas and concepts",
                isProcess: true,
                number: 2,
            },
            {
                id: 11,
                sender: "namila",
                senderName: "Namila",
                content: "3. Create mood boards and color palettes",
                isProcess: true,
                number: 3,
            },
            {
                id: 12,
                sender: "namila",
                senderName: "Namila",
                content: "4. Design and refine in Figma",
                isProcess: true,
                number: 4,
            },
            {
                id: 13,
                sender: "namila",
                senderName: "Namila",
                content: "Here's a closer look at one of my favorite explorations - a music player concept:",
                hasImage: true,
                imageSrc: "/images/dribbble-music-player.png",
                imageAlt: "Music player concept",
            },
            {
                id: 14,
                sender: "namila",
                senderName: "Namila",
                content: "And here's a banking app concept I created:",
                hasImage: true,
                imageSrc: "/images/dribbble-banking-app.png",
                imageAlt: "Banking app concept",
            },
            {
                id: 15,
                sender: "user",
                senderName: "You",
                content: "How do these explorations influence your client work?",
            },
            {
                id: 16,
                sender: "namila",
                senderName: "Namila",
                content:
                    "These explorations have been invaluable for my professional growth and client work in several ways:",
            },
            {
                id: 17,
                sender: "namila",
                senderName: "Namila",
                content: "• They help me discover new techniques that I can apply to client projects",
            },
            {
                id: 18,
                sender: "namila",
                senderName: "Namila",
                content: "• They've connected me with a community of designers who provide feedback and inspiration",
            },
            {
                id: 19,
                sender: "namila",
                senderName: "Namila",
                content: "• They've actually led to client inquiries from people who discovered my work on Dribbble",
            },
            {
                id: 20,
                sender: "namila",
                senderName: "Namila",
                content:
                    "• They allow me to test ideas in a low-stakes environment before implementing them in client work",
            },
            {
                id: 21,
                sender: "namila",
                senderName: "Namila",
                content: "Would you like to see more of my design work?",
            },
        ],
    },
    "design-system": {
        title: "Design System",
        description: "A comprehensive design system for digital products",
        coverImage: "/images/design-system.png",
        client: "TechCorp",
        duration: "6 months",
        role: "Design Systems Lead",
        year: "2022",
        tools: ["Figma", "Storybook", "React", "Git"],
        messages: [
            {
                id: 1,
                sender: "user",
                senderName: "You",
                content: "Can you tell me about this design system project?",
            },
            {
                id: 2,
                sender: "namila",
                senderName: "Namila",
                content:
                    "This was a major project for TechCorp, a software company with multiple digital products that had inconsistent interfaces and user experiences.",
            },
            {
                id: 3,
                sender: "namila",
                senderName: "Namila",
                content:
                    "The challenge was to create a unified design system that would ensure consistency across all their products while allowing for flexibility and scalability.",
            },
            {
                id: 4,
                sender: "namila",
                senderName: "Namila",
                content: "Here's an overview of the design system:",
                hasImage: true,
                imageSrc: "/images/design-system.png",
                imageAlt: "Design system overview",
            },
            {
                id: 5,
                sender: "user",
                senderName: "You",
                content: "What tools did you use for this project?",
            },
            {
                id: 6,
                sender: "namila",
                senderName: "Namila",
                content: "For this design system project, I used these primary tools:",
                showTools: true,
            },
            {
                id: 7,
                sender: "user",
                senderName: "You",
                content: "What was your approach to building this design system?",
            },
            {
                id: 8,
                sender: "namila",
                senderName: "Namila",
                content: "I approached this project methodically with these key phases:",
            },
            {
                id: 9,
                sender: "namila",
                senderName: "Namila",
                content: "1. Audit & Analysis of existing products",
                isProcess: true,
                number: 1,
            },
            {
                id: 10,
                sender: "namila",
                senderName: "Namila",
                content: "2. Foundation Elements (colors, typography, grid)",
                isProcess: true,
                number: 2,
            },
            {
                id: 11,
                sender: "namila",
                senderName: "Namila",
                content: "3. Component Library Development",
                isProcess: true,
                number: 3,
            },
            {
                id: 12,
                sender: "namila",
                senderName: "Namila",
                content: "4. Pattern Creation & Documentation",
                isProcess: true,
                number: 4,
            },
            {
                id: 13,
                sender: "namila",
                senderName: "Namila",
                content: "5. Implementation & Team Training",
                isProcess: true,
                number: 5,
            },
            {
                id: 14,
                sender: "namila",
                senderName: "Namila",
                content: "Here's a look at the color system and typography foundations:",
                hasImage: true,
                imageSrc: "/images/design-system-foundations.png",
                imageAlt: "Design system foundations",
            },
            {
                id: 15,
                sender: "namila",
                senderName: "Namila",
                content: "And here's part of the component library we created:",
                hasImage: true,
                imageSrc: "/images/design-system-components.png",
                imageAlt: "Design system components",
            },
            {
                id: 16,
                sender: "user",
                senderName: "You",
                content: "What were some of the key features of this design system?",
            },
            {
                id: 17,
                sender: "namila",
                senderName: "Namila",
                content: "The design system included several key features:",
            },
            {
                id: 18,
                sender: "namila",
                senderName: "Namila",
                content: "• Comprehensive component library with 50+ reusable components",
            },
            {
                id: 19,
                sender: "namila",
                senderName: "Namila",
                content: "• Responsive design principles built into every component",
            },
            {
                id: 20,
                sender: "namila",
                senderName: "Namila",
                content: "• Accessibility compliance (WCAG AA) throughout",
            },
            {
                id: 21,
                sender: "namila",
                senderName: "Namila",
                content: "• Dark/light mode theming system",
            },
            {
                id: 22,
                sender: "namila",
                senderName: "Namila",
                content: "• Detailed documentation for designers and developers",
            },
            {
                id: 23,
                sender: "namila",
                senderName: "Namila",
                content: "Here's a page from the documentation:",
                hasImage: true,
                imageSrc: "/images/design-system-documentation.png",
                imageAlt: "Design system documentation",
            },
            {
                id: 24,
                sender: "user",
                senderName: "You",
                content: "What impact did this design system have?",
            },
            {
                id: 25,
                sender: "namila",
                senderName: "Namila",
                content: "The implementation of this design system had significant benefits for the company:",
            },
            {
                id: 26,
                sender: "namila",
                senderName: "Namila",
                content: "• 60% faster design-to-development handoff",
            },
            {
                id: 27,
                sender: "namila",
                senderName: "Namila",
                content: "• 45% reduction in design inconsistencies across products",
            },
            {
                id: 28,
                sender: "namila",
                senderName: "Namila",
                content: "• 30% improvement in development efficiency",
            },
            {
                id: 29,
                sender: "namila",
                senderName: "Namila",
                content: "• Significant improvement in user satisfaction scores",
            },
            {
                id: 30,
                sender: "namila",
                senderName: "Namila",
                content:
                    "The design system is now a central part of their product development process and continues to evolve as their products grow.",
            },
            {
                id: 31,
                sender: "namila",
                senderName: "Namila",
                content: "Would you like to see more of my work?",
            },
        ],
    },
};

export default function ProjectPage() {
    const params = useParams();
    const router = useRouter();
    const { id } = params;
    const projectId = Array.isArray(id) ? id[0] : id;

    const project = projectsData[projectId as keyof typeof projectsData];

    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [showTyping, setShowTyping] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [currentDate] = useState(new Date());

    // Format date for display
    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(currentDate);

    // Format time for display
    const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    }).format(currentDate);

    if (!project) {
        // Handle case where project doesn't exist
        return (
            <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Project not found</h1>
                    <Button onClick={() => router.push("/")} className="bg-blue-600 hover:bg-blue-700">
                        <ChevronLeft size={16} className="mr-2" />
                        Back to Home
                    </Button>
                </div>
            </div>
        );
    }

    // Simulate typing and message appearance with slower pace
    const messagesLength = project.messages.length;
    useEffect(() => {
        if (currentMessageIndex < messagesLength) {
            const currentMsg = project.messages[currentMessageIndex];

            // Only show typing indicator for Namila's messages
            if (currentMsg.sender === "namila") {
                setShowTyping(true);
                const typingTimer = setTimeout(
                    () => {
                        setShowTyping(false);
                        setCurrentMessageIndex((prev) => prev + 1);
                    },
                    // Increased delay for slower conversation
                    2000 + Math.random() * 1000
                );
                return () => clearTimeout(typingTimer);
            } else {
                // For user messages, just show them after a longer delay
                const userMsgTimer = setTimeout(() => {
                    setCurrentMessageIndex((prev) => prev + 1);
                }, 1200);
                return () => clearTimeout(userMsgTimer);
            }
        }
    }, [currentMessageIndex, messagesLength]);

    // Always auto-scroll to the latest message
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [currentMessageIndex, showTyping]);

    // Show/hide scroll to top button and track scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (chatContainerRef.current) {
                const scrollTop = chatContainerRef.current.scrollTop;
                setShowScrollToTop(scrollTop > 500);
                setIsScrolled(scrollTop > 100);
            }
        };

        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener("scroll", handleScroll);
            return () => chatContainer.removeEventListener("scroll", handleScroll);
        }
    }, []);

    const scrollToTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    // Message animation variants
    const userMessageVariants = {
        hidden: { opacity: 0, x: 20, y: 10, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5,
            },
        },
        exit: { opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.2 } },
    };

    const namilaMessageVariants = {
        hidden: { opacity: 0, x: -20, y: 10, scale: 0.9 },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 15,
                duration: 0.5,
            },
        },
        exit: { opacity: 0, x: -20, scale: 0.9, transition: { duration: 0.2 } },
    };

    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white">
            {/* Project header - visible only when not scrolled */}
            <AnimatePresence>
                {!isScrolled && (
                    <motion.div
                        className="pt-8 pb-4 px-4"
                        initial={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="max-w-2xl mx-auto">
                            <Link
                                href="/"
                                className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
                            >
                                <ChevronLeft size={16} className="mr-2" />
                                Back to Portfolio
                            </Link>

                            <div className="flex flex-col items-center justify-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                                    <Image
                                        src="/public/avatar.png"
                                        alt="Namila"
                                        width={64}
                                        height={64}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <h1 className="text-xl font-bold">{project.title}</h1>
                                <p className="text-sm text-gray-400 mt-1">{project.description}</p>

                                <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 text-sm">
                                    <div>
                                        <span className="text-gray-400">Client:</span> {project.client}
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Role:</span> {project.role}
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Duration:</span> {project.duration}
                                    </div>
                                    <div>
                                        <span className="text-gray-400">Year:</span> {project.year}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Compact sticky header - only shows when scrolled */}
            <div
                className={`sticky top-0 z-10 backdrop-blur-md bg-[#0f0f0f]/80 transition-all duration-300 ${
                    isScrolled ? "py-2" : "py-0 opacity-0"
                }`}
            >
                <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                        <ChevronLeft size={16} />
                    </Link>
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-full overflow-hidden mr-2">
                            <Image
                                src="/images/avatar.png"
                                alt="Namila"
                                width={24}
                                height={24}
                                className="rounded-full object-cover"
                            />
                        </div>
                        <h1 className="text-sm font-bold">{project.title}</h1>
                    </div>
                    <div className="w-4"></div> {/* Empty div for flex spacing */}
                </div>
            </div>

            {/* Chat container */}
            <div
                className="max-w-2xl mx-auto px-4 pb-8 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar"
                ref={chatContainerRef}
            >
                {/* Date/time separator */}
                <div className="flex justify-center my-4">
                    <div className="bg-gray-800 rounded-full px-4 py-1 text-xs text-gray-400">
                        {formattedDate} • {formattedTime}
                    </div>
                </div>

                {/* Chat messages */}
                <div className="space-y-6 pb-20 pt-4">
                    {project.messages.slice(0, currentMessageIndex).map((msg) => (
                        <motion.div
                            key={msg.id}
                            className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={msg.sender === "user" ? userMessageVariants : namilaMessageVariants}
                        >
                            {msg.sender === "namila" && (
                                <div className="w-8 h-8 mr-2 flex-shrink-0">
                                    <Image
                                        src="/images/avatar.png"
                                        alt="Namila"
                                        width={32}
                                        height={32}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col max-w-[80%]">
                                {/* Sender name */}
                                <span
                                    className={`text-xs mb-1 ${
                                        msg.sender === "user" ? "text-right text-gray-400" : "text-gray-400"
                                    }`}
                                >
                                    {msg.senderName}
                                </span>

                                <div
                                    className={`p-4 ${
                                        msg.sender === "user"
                                            ? "bg-[#1a1a1a] rounded-2xl rounded-tr-none message-bubble-user"
                                            : "bg-[#1a1a1a] rounded-2xl rounded-tl-none message-bubble-namila"
                                    }`}
                                >
                                    <p className="text-sm">{msg.content}</p>

                                    {msg.hasImage && (
                                        <div className="mt-3 mb-2">
                                            <Image
                                                src={msg.imageSrc || "/placeholder.svg?height=180&width=280"}
                                                alt={msg.imageAlt || "Project"}
                                                width={400}
                                                height={225}
                                                className="rounded-lg w-full object-cover shadow-lg hover:shadow-xl transition-shadow"
                                                style={{ aspectRatio: "16/9", height: "auto" }}
                                            />
                                        </div>
                                    )}

                                    {msg.isProcess && (
                                        <div className="flex items-center mt-2">
                                            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2 flex-shrink-0">
                                                <span className="text-white font-bold">{msg.number}</span>
                                            </div>
                                            <p className="text-sm">{msg.content}</p>
                                        </div>
                                    )}

                                    {msg.showTools && (
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {project.tools.map((tool, index) => (
                                                <span
                                                    key={index}
                                                    className="bg-[#232323] px-3 py-1 rounded-full text-xs"
                                                >
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Message time */}
                                <span
                                    className={`text-xs mt-1 ${
                                        msg.sender === "user" ? "text-right text-gray-500" : "text-gray-500"
                                    }`}
                                >
                                    {formattedTime}
                                </span>
                            </div>

                            {msg.sender === "user" && (
                                <div className="w-8 h-8 ml-2 flex-shrink-0">
                                    <div className="w-8 h-8 rounded-full bg-gray-700"></div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {showTyping && project.messages[currentMessageIndex]?.sender === "namila" && (
                        <motion.div
                            className="flex"
                            initial={{ opacity: 0, x: -20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        >
                            <div className="w-8 h-8 mr-2">
                                <Image
                                    src="/public/placeholder.svg"
                                    alt="Namila"
                                    width={32}
                                    height={32}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs mb-1 text-gray-400">Namila</span>
                                <div className="bg-[#1a1a1a] rounded-2xl rounded-tl-none p-3 typing-indicator">
                                    <div className="flex space-x-1">
                                        <div
                                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                            style={{ animationDelay: "0ms" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                            style={{ animationDelay: "150ms" }}
                                        ></div>
                                        <div
                                            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                                            style={{ animationDelay: "300ms" }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-xs mt-1 text-gray-500">{formattedTime}</span>
                            </div>
                        </motion.div>
                    )}

                    {/* Show "View more projects" button after all messages are displayed */}
                    {currentMessageIndex >= messagesLength && (
                        <motion.div
                            className="flex justify-center mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="/">
                                <Button className="bg-blue-600 hover:bg-blue-700">
                                    <ChevronLeft size={16} className="mr-2" />
                                    View more projects
                                </Button>
                            </Link>
                        </motion.div>
                    )}
                </div>

                {/* Footer */}
                <div className="text-center text-xs text-gray-500 mt-8 pt-4 border-t border-gray-800">
                    © 2023 Handcrafted by Namila •{" "}
                    <a href="#" className="hover:text-gray-400">
                        Privacy
                    </a>
                </div>
            </div>

            {/* Scroll to top button */}
            <AnimatePresence>
                {showScrollToTop && (
                    <motion.button
                        className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg z-50"
                        onClick={scrollToTop}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </main>
    );
}
