"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Copy, Calendar, Send, RefreshCw, ArrowUp, ExternalLink } from "lucide-react";
import { ProfileHeader } from "@/components/profile-header";

export default function Home() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailSubscribe, setEmailSubscribe] = useState("");
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const [showTyping, setShowTyping] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
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

    // Project data
    const projects = [
        {
            id: "fintech-dashboard",
            title: "Fintech Dashboard",
            description: "A dashboard I designed for a fintech startup",
            image: "/images/dashboard-project.png",
        },
        {
            id: "dribbble-explorations",
            title: "Dribbble Explorations",
            description: "Creative design explorations on Dribbble",
            image: "/images/dribbble-shots.png",
        },
        {
            id: "design-system",
            title: "Design System",
            description: "A design system built for consistency and scalability",
            image: "/images/design-system.png",
        },
    ];

    const designer = {
        name: "Namila Preshan",
        title: "UI UX Enginieer at ",
        workplace: "@Epic lanka",
        tagline: "Crafting interfaces that matter ✨",
        location: "Colombo, Sri Lanka",
        email: "hello@namila.me",
        personality: "ENFJ",
        avatar: "/images/profile-1.jpeg?height=250&width=250",
        isOnline: true,
    };

    // Calculate header height for proper spacing
    useEffect(() => {
        // Function to calculate expanded header height
        const calculateHeaderHeight = () => {
            // Expanded header is approximately 200px, collapsed is about 80px
            const expandedHeight = isScrolled ? 80 : 200;
            setHeaderHeight(expandedHeight);
        };

        calculateHeaderHeight();

        // Recalculate when scroll state changes
        window.addEventListener("resize", calculateHeaderHeight);
        return () => window.removeEventListener("resize", calculateHeaderHeight);
    }, [isScrolled]);

    // Messages for the chat
    const messages = [
        // 1. Namila's greeting and self-introduction
        {
            id: 1,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Hey! I'm Namila, a product designer. Crafting interfaces that matter ✨",
        },

        // 2. User asking to see work
        {
            id: 2,
            sender: "user",
            senderName: "You",
            content: "Can I see your work?",
        },

        // 3. Namila sharing portfolio items
        {
            id: 3,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Of course! Here are some projects I've worked on recently:",
        },
        {
            id: 4,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Here's a dashboard I designed for a fintech startup:",
            hasImage: true,
            imageAlt: "Dashboard UI Design",
            imageSrc: "/images/dashboard-project.png",
            projectId: "fintech-dashboard",
        },
        {
            id: 5,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Take a look at my creative explorations on Behance:",
            hasImage: true,
            imageAlt: "Behance shots",
            imageSrc: "/images/behance.svg",
            projectId: "behance-explorations",
        },
        {
            id: 6,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "A design system I built to deliver consistency, scalability, and impact across digital products:",
            hasImage: true,
            imageAlt: "Design System",
            imageSrc: "/images/design-system.png",
            projectId: "design-system",
        },
        // {
        //     id: 7,
        //     sender: "namila",
        //     senderName: "Namila Preshan",
        //     content: "Design Projects",
        //     isHeader: true,
        // },
        {
            id: 7,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "Explore the projects where I've collaborated with startups to solve real problems and deliver measurable results.",
            isHeader: true,
        },

        // 4. Client testimonials
        {
            id: 8,
            sender: "user",
            senderName: "You",
            content: "Here's what a few people have said after working with me.",
        },
        {
            id: 9,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                '"Namila is a true asset to design, blending artistry with functionality. His exceptional user-friendly UX designs are always on point, and his ability to understand client needs has made our collaboration incredibly successful at project goals."',
            isTestimonial: true,
            testimonialAuthor: "- Samantha P, Product at Acme Co",
        },
        {
            id: 10,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                '"Namila stands out as a skilled UI/UX designer who not only gets the job done but does it with style. In spite of tight timelines, he delivers exceptional work. His meticulous attention to detail is remarkable for optimal user experience. His collaborative spirit and professionalism make him highly recommended!"',
            isTestimonial: true,
            testimonialAuthor: "- Samantha P, Product at Acme Co",
        },
        {
            id: 11,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                '"I highly recommend Namila as an exceptional product designer. He balances aesthetics and functionality, creating solutions that are intuitive and user-focused. Namila is creative and resourceful - a valuable asset to any team."',
            isTestimonial: true,
            testimonialAuthor: "- Samantha P, Product at Acme Co",
        },

        // 5. Tell me more about you
        {
            id: 12,
            sender: "user",
            senderName: "You",
            content: "I'm very impressed by your work. Anything else you'd like to share?",
        },
        {
            id: 13,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "I'm all about improving how people interact with digital products. With over 1 years of experience in design and UI development, I help brands create good design that looks amazing while being functional.",
            hasProfileImage: true,
            profileImageSrc: "/images/profile-3.jpg",
        },

        // 6. Newsletter subscription
        {
            id: 14,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "I also have a newsletter I write weekly, here's one of post",
        },
        {
            id: 15,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "A Comprehensive Guide to Information Architecture Basics in UX Design",
            isNewsletter: true,
            number: 1,
        },
        // {
        //     id: 17,
        //     sender: "namila",
        //     senderName: "Namila Preshan",
        //     content: "Exploring the New Notion UI/UX: Addressing the Controversy",
        //     isNewsletter: true,
        //     number: 2,
        // },
        {
            id: 16,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "If you're interested you can subscribe by entering your email below:",
            showSubscribe: true,
        },

        // 7. Contact section
        {
            id: 17,
            sender: "user",
            senderName: "You",
            content: "How can I get in touch with you?",
        },
        {
            id: 18,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "My email is hello@namila.me",
            showContactButtons: true,
        },
        {
            id: 19,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "I usually reply within 24 hours to communicate a good fit. I like to focus on projects that make a real impact.",
        },
        {
            id: 20,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "You can also leave me a message, and I'll be sure to get back to you as soon as possible.",
            showContactForm: true,
        },

        // 8. Final message
        {
            id: 21,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "That's it for this chat! Feel free to restart the conversation.",
            showRestart: true,
        },
    ];

    // Simulate typing and message appearance with slower pace
    useEffect(() => {
        if (currentMessageIndex < messages.length) {
            const currentMsg = messages[currentMessageIndex];

            // Only show typing indicator for Namila's messages
            if (currentMsg.sender === "namila") {
                setShowTyping(true);
                const typingTimer = setTimeout(
                    () => {
                        setShowTyping(false);
                        setCurrentMessageIndex((prev) => prev + 1);
                    },
                    // Increased delay for slower conversation
                    2500 + Math.random() * 1500
                );
                return () => clearTimeout(typingTimer);
            } else {
                // For user messages, just show them after a longer delay
                const userMsgTimer = setTimeout(() => {
                    setCurrentMessageIndex((prev) => prev + 1);
                }, 1500); // Increased from 800ms
                return () => clearTimeout(userMsgTimer);
            }
        }
    }, [currentMessageIndex, messages.length]);

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send the form data to your backend
        console.log({ name, email, message });

        // Show success message
        setIsMessageSent(true);

        // Clear form
        setName("");
        setEmail("");
        setMessage("");
    };

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would subscribe the email
        console.log({ emailSubscribe });

        // Show success message
        setIsSubscribed(true);

        // Clear form
        setEmailSubscribe("");
    };

    const handleRestart = () => {
        setCurrentMessageIndex(0);
        setIsSubscribed(false);
        setIsMessageSent(false);

        // Scroll to top when restarting
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 0;
        }
    };

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
            {/* Full header - visible only when not scrolled */}

            <ProfileHeader designer={designer} isScrolled={isScrolled} />

            {/* Compact sticky header - only shows when scrolled */}

            {/* Chat container */}
            <div style={{ paddingTop: `${headerHeight + 20}px` }}>
                <div
                    className="max-w-2xl mx-auto px-4 pb-8 pt-4 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar"
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
                        {messages.slice(0, currentMessageIndex).map((msg) => (
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
                                            src="/images/profile-1.jpeg"
                                            alt="Namila"
                                            width={64}
                                            height={64}
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
                                        className={`p-4 w-96 ${
                                            msg.sender === "user"
                                                ? "bg-[#1a1a1a] rounded-2xl rounded-tr-none message-bubble-user"
                                                : msg.isTestimonial
                                                ? "bg-[#232323] rounded-2xl rounded-tl-none message-bubble-namila"
                                                : "bg-[#1a1a1a] rounded-2xl rounded-tl-none message-bubble-namila"
                                        }`}
                                    >
                                        {msg.isHeader ? (
                                            <div className="bg-[#232323] p-4 rounded-lg">
                                                <h2 className="text-lg font-bold">{msg.content}</h2>
                                            </div>
                                        ) : (
                                            <p className={msg.isTestimonial ? "text-sm italic" : "text-sm"}>
                                                {msg.content}
                                            </p>
                                        )}

                                        {msg.testimonialAuthor && (
                                            <div className="mt-2 text-xs text-gray-400">
                                                <p>{msg.testimonialAuthor}</p>
                                            </div>
                                        )}

                                        {msg.hasImage && (
                                            <div className="mt-3 mb-2">
                                                {msg.projectId ? (
                                                    <Link href={`/projects/${msg.projectId}`} className="block group">
                                                        <div className="relative overflow-hidden rounded-xl">
                                                            <Image
                                                                src={
                                                                    msg.imageSrc ||
                                                                    "/placeholder.svg?height=180&width=280"
                                                                }
                                                                alt={msg.imageAlt || "Project"}
                                                                width={400}
                                                                height={225}
                                                                className="rounded-xl w-full object-cover shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]"
                                                                style={{ aspectRatio: "16/9", height: "auto" }}
                                                            />
                                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                <div className="bg-blue-600 rounded-full p-2">
                                                                    <ExternalLink size={20} className="text-white" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-blue-400 mt-2 flex items-center">
                                                            <span>View project details</span>
                                                            <ExternalLink size={12} className="ml-1" />
                                                        </p>
                                                    </Link>
                                                ) : (
                                                    <Image
                                                        src={msg.imageSrc || "/placeholder.svg?height=180&width=280"}
                                                        alt={msg.imageAlt || "Project"}
                                                        width={400}
                                                        height={225}
                                                        className="rounded-xl w-full object-cover shadow-lg hover:shadow-xl transition-shadow"
                                                        style={{ aspectRatio: "16/9", height: "auto" }}
                                                    />
                                                )}
                                            </div>
                                        )}

                                        {msg.hasProfileImage && (
                                            <div className="mt-3 flex flex-col items-center">
                                                <Image
                                                    src={msg.profileImageSrc || "/images/profile-3.jpg"}
                                                    alt="Profile"
                                                    width={400}
                                                    height={400}
                                                    className="rounded-xl object-cover shadow-lg"
                                                    style={{ aspectRatio: "1/1", height: "auto", maxWidth: "200px" }}
                                                />
                                                <p className="text-center mt-2 text-xs text-gray-400">That's me :)</p>
                                            </div>
                                        )}

                                        {msg.isNewsletter && (
                                            <div className="flex items-center">
                                                <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2 flex-shrink-0">
                                                    <span className="text-white font-bold">{msg.number}</span>
                                                </div>
                                                {/* <p className="text-sm">{msg.content}</p> */}
                                            </div>
                                        )}

                                        {msg.showSubscribe && !isSubscribed && (
                                            <form onSubmit={handleSubscribe} className="mt-3 flex flex-col gap-2">
                                                <Input
                                                    type="email"
                                                    placeholder="Your email"
                                                    className="bg-[#232323] border-[#333] focus:border-blue-500"
                                                    value={emailSubscribe}
                                                    onChange={(e) => setEmailSubscribe(e.target.value)}
                                                    required
                                                />
                                                <Button
                                                    type="submit"
                                                    className=" hover:bg-blue-700"
                                                    style={{ background: "rgb(46, 46, 46)" }}
                                                >
                                                    Subscribe
                                                </Button>
                                            </form>
                                        )}

                                        {msg.showSubscribe && isSubscribed && (
                                            <p className="mt-3 text-green-400 text-sm">Thanks for subscribing!</p>
                                        )}

                                        {msg.showContactButtons && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333]"
                                                >
                                                    <Copy size={14} className="mr-2" />
                                                    Copy
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333]"
                                                >
                                                    <Linkedin size={14} className="mr-2" />
                                                    Connect on LinkedIn
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333]"
                                                >
                                                    <Calendar size={14} className="mr-2" />
                                                    Book a call
                                                </Button>
                                            </div>
                                        )}

                                        {msg.showContactForm && !isMessageSent && (
                                            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                                                <Input
                                                    type="text"
                                                    placeholder="Your name"
                                                    className="bg-[#232323] border-[#333] focus:border-blue-500"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                                <Input
                                                    type="email"
                                                    placeholder="Your email"
                                                    className="bg-[#232323] border-[#333] focus:border-blue-500"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <Textarea
                                                    placeholder="Your message"
                                                    className="bg-[#232323] border-[#333] focus:border-blue-500 min-h-[100px]"
                                                    value={message}
                                                    onChange={(e) => setMessage(e.target.value)}
                                                    required
                                                />
                                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                                    <Send size={14} className="mr-2" />
                                                    Send
                                                </Button>
                                            </form>
                                        )}

                                        {msg.showContactForm && isMessageSent && (
                                            <p className="mt-3 text-green-400 text-sm">
                                                Message sent! I'll get back to you soon.
                                            </p>
                                        )}

                                        {msg.showRestart && (
                                            <div className="flex justify-center mt-4">
                                                <Button
                                                    variant="outline"
                                                    className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333]"
                                                    onClick={handleRestart}
                                                >
                                                    <RefreshCw size={14} className="mr-2" />
                                                    Start over
                                                </Button>
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
                        {showTyping && messages[currentMessageIndex]?.sender === "namila" && (
                            <motion.div
                                className="flex"
                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <div className="w-8 h-8 mr-2">
                                    <Image
                                        src="/images/profile-1.jpeg"
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
                                </div>
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
