"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Copy, Calendar, Send, RefreshCw, ArrowUp, ExternalLink, ArrowDown, X } from "lucide-react";
import { ProfileHeader } from "@/components/profile-header";
import Lottie from "lottie-react";

//lottie animations
import behanceData from "/public/animations/behance.json";
import FloatingMenu from "@/components/floating-menu";

export default function Home() {
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [showTyping, setShowTyping] = useState(false);
    const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [showScrollToTop, setShowScrollToTop] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [lastViewedMessageIndex, setLastViewedMessageIndex] = useState(-1);
    const [activeImage, setActiveImage] = useState("");
    const [showImageModal, setShowImageModal] = useState(false);
    const imageModalRef = useRef<HTMLDivElement>(null);

    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000); // update every minute
        return () => clearInterval(timer);
    }, []);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(currentDate);

    const formattedTime = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
        timeZone: "Asia/Colombo", // Force correct time zone
    }).format(currentDate);

    // Copy to clipboard function
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText("namilapreshan11@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    };

    // Project data
    const designer = {
        name: "Namila Preshan",
        title: "UI/UX Engineer & Experience Designer",
        // workplace: "@Epic lanka",
        tagline: "Designing seamless, human-centered products ✨",
        location: "Sri Lanka",
        email: "hello@namila.me",
        personality: "ENFJ-T",
        avatar: "/images/namila_1.webp?height=250&width=250",
        isOnline: true,
    };

    // Calculate header height for proper spacing
    useEffect(() => {
        const calculateHeaderHeight = () => {
            const expandedHeight = isScrolled ? 80 : 200;
            setHeaderHeight(expandedHeight);
        };

        calculateHeaderHeight();
        window.addEventListener("resize", calculateHeaderHeight);
        return () => window.removeEventListener("resize", calculateHeaderHeight);
    }, [isScrolled]);

    // Messages for the chat
    const messages = [
        {
            id: 1,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Looking for a designer? Let’s chat!😎",
        },
        {
            id: 2,
            sender: "user",
            senderName: "You",
            content: "Can I see your work?",
        },
        {
            id: 3,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Of course! Here are some projects I've worked on recently.",
        },
        {
            id: 4,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "This is a mobile app I created for discovering and watching movie trailers.",
            hasImage: true,
            imageAlt: "Movie Trailler App UI Design",
            imageSrc: "/project/project-1.png",
            projectId: "mobile-app-ui",
        },
        {
            id: 5,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Take a look at my creative explorations on Behance.",
            hasLottie: true,
            lottieSrc: "/animations/behance.json",
            lottieAlt: "Behance animation",
            projectId: null,
            externalUrl: "https://www.behance.net/namilapreshan1",
        },
        // {
        //     id: 6,
        //     sender: "namila",
        //     senderName: "Namila Preshan",
        //     content: "A design system I built to deliver consistency, scalability, and impact across digital products.",
        //     hasImage: true,
        //     imageAlt: "Design System",
        //     imageSrc: "/images/design-system.png",
        //     projectId: "design-system",
        // },
        {
            id: 7,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "Explore the projects where I tackled real-world problems and delivered measurable results through thoughtful design.",
            isHeader: false,
        },
        {
            id: 8,
            sender: "user",
            senderName: "You",
            content: "Which design tools and development technologies do you work with?",
        },
        {
            id: 9,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Great question! Here's a quick overview of the tools and technologies I work with regularly.",
        },
        // {
        //     id: 10,
        //     sender: "namila",
        //     senderName: "Namila Preshan",
        //     content: "🧠 UX Skills: ",
        //     skill: [
        //         { name: "Wireframing" },
        //         { name: "Prototyping" },
        //         { name: "Interaction Design" },
        //         { name: "Usability Testing" },
        //         { name: "Information Architecture" },
        //     ],
        // },
        // {
        //     id: 11,
        //     sender: "namila",
        //     senderName: "Namila Preshan",
        //     content: "🎨 UI Skills: ",
        //     skill: [
        //         { name: "Design Systems" },
        //         { name: "Visual Design" },
        //         { name: "Typography" },
        //         { name: "Accessibility" },
        //         { name: "Responsive Design" },
        //     ],
        // },
        {
            id: 12,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "🛠 Design Tools I use:",
            tools: [
                { name: "Figma", icon: "/icons/Figma.svg" },
                { name: "Illustrator", icon: "/icons/Illustrator.svg" },
                { name: "Photoshop", icon: "/icons/Photoshop.svg" },
            ],
        },
        {
            id: 13,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "💻 Technologies I use:",
            tools: [
                { name: "HTML", icon: "/icons/HTML5.svg" },
                { name: "SCSS", icon: "/icons/Sass.svg" },
                { name: "Tailwind CSS", icon: "/icons/Photoshop.svg" },
                { name: "JavaScript", icon: "/icons/JS.svg" },
                { name: "Angular", icon: "/icons/Angular.svg" },
                { name: "Next.js", icon: "/icons/nextjs.png" },
                { name: "TypeScript", icon: "/icons/TypeScript.svg" },
            ],
        },
        {
            id: 14,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "And I'm always learning-currently diving deeper into design tokens and advanced component systems.",
        },
        {
            id: 15,
            sender: "user",
            senderName: "You",
            content: "I’d love to read what others think about working with you!",
        },
        {
            id: 16,
            sender: "namila",
            senderName: "You",
            content: "Sure! Here are some kind words from people I’ve had the pleasure of working with.",
        },
        {
            id: 17,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                '"Namila quickly adapts to new challenges and consistently delivers work with great attention to detail. His problem-solving mindset and enthusiasm for learning make him a strong contributor. He collaborates well with the team, openly shares ideas, and values feedback. Namila’s professionalism and growth-driven attitude make him a valuable asset to any team."',
            isTestimonial: true,
            testimonialAuthor: "- Sajith Bogahawaththa, Tech Lead at Epic Lanka",
        },
        {
            id: 18,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                '"Working with Namila has been a pleasure. He brings solid skills in visual, UX, and UI design-especially in Angular UI development. Despite being a junior, he’s contributed meaningfully to high-impact projects across eGov, eCommerce, and fintech. Namila is proactive, collaborative, and a reliable team player. He’d be an asset to any design or dev team."',
            isTestimonial: true,
            testimonialAuthor: "- Oshada S, UI UX Engineer at Epic Lanka",
        },
        {
            id: 19,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                '"Namila consistently designs intuitive, user-focused interfaces that elevate the user experience. His creativity, attention to detail, and strong understanding of UX principles have contributed to the success of multiple projects. I highly recommend him for any role in UI/UX."',
            isTestimonial: true,
            testimonialAuthor: "- Wathsala Nadeeshan, UI UX Engineer at Epic Lanka",
        },
        {
            id: 20,
            sender: "user",
            senderName: "You",
            content: "I'm very impressed by your work. Anything else you'd like to share?",
        },
        {
            id: 21,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "I'm passionate about making digital experiences easier and more enjoyable for people. With over a year of hands-on experience in design and UI development, I focus on creating interfaces that not only look great but also work smoothly and make sense to users.",
            hasProfileImage: true,
            profileImageSrc: "/images/profile_3_1.webp",
        },
        {
            id: 22,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "Occasionally, I share insights on design and development—here’s one of my recent posts.",
        },
        // {
        //     id: 22,
        //     sender: "namila",
        //     senderName: "Namila Preshan",
        //     content: "",
        //     isNewsletter: true,
        //     number: "A Comprehensive Guide to Information Architecture Basics in UX Design",
        // },
        {
            id: 23,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "If you like to see those, you can follow me for more updates and thoughts.",
            isfollowed: true,
        },
        {
            id: 24,
            sender: "user",
            senderName: "You",
            content: "How can I get in touch with you?",
        },
        {
            id: 25,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "My email is namilapreshan11@gmail.com. You can reach me there.",
            showContactButtons: true,
        },
        {
            id: 26,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "I mostly use LinkedIn to communicate. If you’d like a face-to-face chat, book a slot in my calendar for a video call!",
            showsocialtButtons: true,
        },

        {
            id: 27,
            sender: "namila",
            senderName: "Namila Preshan",
            content:
                "I usually reply within 24 hours to communicate a good fit. I like to focus on projects that make a real impact.",
        },
        {
            id: 28,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "You can also leave me a message, and I'll be sure to get back to you as soon as possible.",
            // showContactForm: true,
        },
        {
            id: 29,
            sender: "namila",
            senderName: "Namila Preshan",
            content: "That's it for this chat! Feel free to restart the conversation.",
            showRestart: true,
        },
    ];

    // Image modal state
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (showImageModal && imageModalRef.current && !imageModalRef.current.contains(event.target as Node)) {
                setShowImageModal(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showImageModal]);

    // Simulate typing and message appearance with slower pace
    useEffect(() => {
        if (currentMessageIndex < messages.length) {
            const currentMsg = messages[currentMessageIndex];

            if (currentMsg.sender === "namila") {
                setShowTyping(true);
                const typingTimer = setTimeout(() => {
                    setShowTyping(false);
                    setCurrentMessageIndex((prev) => {
                        const newIndex = prev + 1;
                        if (!isAtBottom && newIndex > lastViewedMessageIndex + 1) {
                            setUnreadCount((prev) => prev + 1);
                            setShowNewMessageAlert(true);
                        }
                        return newIndex;
                    });
                }, 2000 + Math.random() * 1500);
                return () => clearTimeout(typingTimer);
            } else {
                const userMsgTimer = setTimeout(() => {
                    setCurrentMessageIndex((prev) => {
                        const newIndex = prev + 1;
                        if (!isAtBottom && newIndex > lastViewedMessageIndex + 1) {
                            setUnreadCount((prev) => prev + 1);
                            setShowNewMessageAlert(true);
                        }
                        return newIndex;
                    });
                }, 2000);
                return () => clearTimeout(userMsgTimer);
            }
        }
    }, [currentMessageIndex, isAtBottom, lastViewedMessageIndex, messages.length]);

    // Check if user is at the bottom of the chat
    useEffect(() => {
        const checkIfAtBottom = () => {
            if (chatContainerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
                const atBottom = scrollTop + clientHeight >= scrollHeight - 100;
                setIsAtBottom(atBottom);
                setShowScrollToTop(scrollTop > 500);
                setIsScrolled(scrollTop > 100);

                // Update lastViewedMessageIndex if at bottom
                if (atBottom && currentMessageIndex > 0) {
                    setLastViewedMessageIndex(currentMessageIndex - 1);
                    setUnreadCount(0);
                    setShowNewMessageAlert(false);
                }
            }
        };

        const chatContainer = chatContainerRef.current;
        if (chatContainer) {
            chatContainer.addEventListener("scroll", checkIfAtBottom);
            checkIfAtBottom();
            return () => chatContainer.removeEventListener("scroll", checkIfAtBottom);
        }
    }, [currentMessageIndex]);

    // Auto-scroll to bottom only if user is at bottom
    useEffect(() => {
        if (chatContainerRef.current && isAtBottom && currentMessageIndex > 0) {
            chatContainerRef.current.scrollTo({
                top: chatContainerRef.current.scrollHeight,
                behavior: "smooth",
            });
            setLastViewedMessageIndex(currentMessageIndex - 1);
            setUnreadCount(0);
            setShowNewMessageAlert(false);
        }
    }, [currentMessageIndex, showTyping, isAtBottom]);

    const handleRestart = () => {
        setCurrentMessageIndex(0);
        setShowNewMessageAlert(false);
        setUnreadCount(0);
        setLastViewedMessageIndex(-1);
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = 0;
        }
        setIsAtBottom(true);
    };

    const scrollToTop = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    const scrollToFirstUnread = () => {
        if (unreadCount > 0 && messageRefs.current[lastViewedMessageIndex + 1]) {
            messageRefs.current[lastViewedMessageIndex + 1]?.scrollIntoView({ behavior: "smooth" });
            setLastViewedMessageIndex((prev) => prev + 1);
            setUnreadCount((prev) => {
                const newCount = prev - 1;
                if (newCount === 0) {
                    setShowNewMessageAlert(false);
                    setIsAtBottom(true);
                }
                return newCount;
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
            <ProfileHeader designer={designer} isScrolled={isScrolled} />

            <div style={{ paddingTop: `${headerHeight + 20}px` }}>
                <div
                    className="max-w-2xl mx-auto px-4 pb-8 h-[calc(100vh-80px)] overflow-y-auto hide-scrollbar"
                    ref={chatContainerRef}
                >
                    <div className="flex justify-center my-4">
                        <div className="bg-gray-950 rounded-full px-4 py-1 text-xs text-gray-400">
                            {formattedDate} • {formattedTime}
                        </div>
                    </div>

                    <div className="space-y-6 pb-20 pt-4">
                        {messages.slice(0, currentMessageIndex).map((msg, index) => (
                            <motion.div
                                key={msg.id}
                                ref={(el) => {
                                    messageRefs.current[index] = el;
                                }}
                                className={`flex ${msg.sender === "user" ? "justify-end" : ""}`}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={msg.sender === "user" ? userMessageVariants : namilaMessageVariants}
                            >
                                {msg.sender === "namila" && (
                                    <div className="w-8 h-8 mr-2 flex-shrink-0">
                                        <Image
                                            src="/images/namila_1.webp"
                                            alt="Namila"
                                            width={64}
                                            height={64}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col max-w-[80%]">
                                    <span
                                        className={`text-xs mb-1 ${
                                            msg.sender === "user" ? "text-right text-gray-400" : "text-gray-400"
                                        }`}
                                    >
                                        {msg.senderName}
                                    </span>

                                    <div
                                        className={`p-4 lg:w-96 md:w-96 ${
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

                                        {/* Skills */}
                                        {/* {msg.skill && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {msg.skill.map((skill, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center bg-gray-800 rounded-full px-3 py-1"
                                                    >
                                                        <span className="text-xs">{skill.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )} */}

                                        {/* Tools list */}
                                        {msg.tools && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {msg.tools.map((tool, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center bg-gray-800 rounded-full px-3 py-1"
                                                    >
                                                        <Image
                                                            src={tool.icon}
                                                            alt={tool.name}
                                                            width={24}
                                                            height={24}
                                                            className="mr-1"
                                                        />
                                                        <span className="text-xs">{tool.name}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Testimonial author */}
                                        {msg.testimonialAuthor && (
                                            <div className="mt-2 text-xs text-gray-400">
                                                <p>{msg.testimonialAuthor}</p>
                                            </div>
                                        )}

                                        {/* Image or Lottie animation */}
                                        {(msg.hasImage || msg.hasLottie) && (
                                            <div className="mt-3 mb-2">
                                                {msg.projectId || msg.externalUrl ? (
                                                    msg.externalUrl ? (
                                                        <a
                                                            href={msg.externalUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="block group"
                                                        >
                                                            <div className="relative overflow-hidden rounded-xl">
                                                                {msg.hasLottie ? (
                                                                    <div
                                                                        className="w-full"
                                                                        style={{
                                                                            backgroundImage:
                                                                                "url('/images/cardbg.jpg')",
                                                                            backgroundSize: "cover",
                                                                        }}
                                                                    >
                                                                        <Lottie
                                                                            animationData={behanceData}
                                                                            className="w-full h-56 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]"
                                                                            loop
                                                                            autoplay
                                                                        />
                                                                    </div>
                                                                ) : (
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
                                                                )}

                                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                    <div className="bg-blue-600 rounded-full p-2">
                                                                        <ExternalLink
                                                                            size={20}
                                                                            className="text-white"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            href={`/projects/${msg.projectId}`}
                                                            className="block group"
                                                        >
                                                            <div className="relative overflow-hidden rounded-xl">
                                                                {msg.hasLottie ? (
                                                                    <div
                                                                        className="w-full"
                                                                        style={{
                                                                            backgroundImage:
                                                                                "url('/images/cardbg.jpg')",
                                                                            backgroundSize: "cover",
                                                                        }}
                                                                    >
                                                                        <Lottie
                                                                            animationData={behanceData}
                                                                            className="w-full h-56 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]"
                                                                            loop
                                                                            autoplay
                                                                        />
                                                                    </div>
                                                                ) : (
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
                                                                )}

                                                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                                    <div className="bg-blue-600 rounded-full p-2">
                                                                        <ExternalLink
                                                                            size={20}
                                                                            className="text-white"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
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

                                        {/* Profile image */}
                                        {msg.hasProfileImage && (
                                            <div className="mt-3 flex flex-col items-center">
                                                <Image
                                                    src={msg.profileImageSrc || "/images/profile_3_1.webp"}
                                                    alt="Profile"
                                                    width={400}
                                                    height={400}
                                                    className="rounded-xl object-cover shadow-lg"
                                                    style={{ aspectRatio: "1/1", height: "auto", maxWidth: "200px" }}
                                                    onClick={() => {
                                                        setActiveImage(msg.profileImageSrc || "");
                                                        setShowImageModal(true);
                                                    }}
                                                />
                                                <p className="text-center mt-2 text-xs text-gray-400">That's me 😎</p>
                                            </div>
                                        )}

                                        {/* Newsletter */}
                                        {/* {msg.isNewsletter && (
                                            <div className="flex items-center">
                                                <a
                                                    href="https://medium.com/@namilapreshan11"
                                                    className="text-white font-bold italic"
                                                >
                                                    "{msg.number}"
                                                </a>
                                            </div>
                                        )} */}

                                        {/* follow button */}
                                        {msg.isfollowed && (
                                            <div className="flex flex-col items-center mt-3">
                                                <Link
                                                    href="https://medium.com/@namilapreshan11"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333] w-full"
                                                        type="button"
                                                    >
                                                        Follow
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}

                                        {/* Contact buttons */}
                                        {msg.showContactButtons && (
                                            <div className="flex flex-col gap-2 mt-3">
                                                <Button
                                                    onClick={handleCopy}
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333]"
                                                >
                                                    <Copy size={14} className="mr-2" />
                                                    {copied ? "Copied!" : "Copy"}
                                                </Button>
                                            </div>
                                        )}

                                        {msg.showsocialtButtons && (
                                            <div className="flex flex-col gap-2 mt-3">
                                                <Link
                                                    href="https://cal.com/namila-preshan"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333] w-full"
                                                        type="button"
                                                    >
                                                        <Calendar size={14} className="mr-2" />
                                                        Book a call
                                                    </Button>
                                                </Link>
                                                <Link
                                                    href="https://www.linkedin.com/in/namila-preshan/"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full"
                                                >
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        className="w-full bg-[#232323] hover:bg-[#2a2a2a] border-[#333]"
                                                        type="button"
                                                    >
                                                        <Linkedin size={14} className="mr-2" />
                                                        Connect on LinkedIn
                                                    </Button>
                                                </Link>
                                            </div>
                                        )}

                                        {/* Restart button */}
                                        {msg.showRestart && (
                                            <div className="flex justify-center mt-4">
                                                <Button
                                                    variant="outline"
                                                    className="bg-[#232323] hover:bg-[#2a2a2a] border-[#333] w-full"
                                                    onClick={handleRestart}
                                                >
                                                    <RefreshCw size={14} className="mr-2" />
                                                    Start over
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Message timestamp */}
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
                                        <Image
                                            src="/images/user_1.webp"
                                            alt="Namila"
                                            width={64}
                                            height={64}
                                            className="rounded-full object-cover"
                                        />
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        {showTyping && messages[currentMessageIndex]?.sender === "namila" && (
                            <motion.div
                                className="flex"
                                initial={{ opacity: 0, x: -20, scale: 0.9 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                <div className="w-8 h-8 mr-2">
                                    <Image
                                        src="/images/namila_1.webp"
                                        alt="Namila"
                                        width={32}
                                        height={32}
                                        className="rounded-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs mb-1 text-gray-400">Namila Preshan</span>
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

                    {/* <div className=" text-center text-xs text-gray-500 mt-8 pt-4 border-gray-800">
                        © 2025 Made with ❤️ by Namila Preshan
                        <a href="#" className="hover:text-gray-400">
                            Privacy
                        </a>
                    </div> */}

                    <div className="flex justify-center">
                        <AnimatePresence>
                            {showNewMessageAlert && unreadCount > 0 && (
                                <motion.button
                                    className="fixed bottom-6 mx-auto p-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg z-40 flex items-center"
                                    onClick={scrollToFirstUnread}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.2 }}
                                    aria-label="Scroll to new message"
                                >
                                    <ArrowDown size={12} className="mr-2" />
                                    <span className="text-sm">
                                        {unreadCount > 5 ? "5+" : unreadCount} New Message{unreadCount !== 1 ? "s" : ""}
                                    </span>
                                </motion.button>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="fixed bottom-0 h-[48px] w-full text-center text-xs bg-[#0f0f0f]  text-gray-500 mt-8 pt-4 border-gray-800">
                    © 2025 Made with ❤️ by Namila Preshan
                    {/* <a href="#" className="hover:text-gray-400">
                            Privacy
                        </a> */}
                </div>
                <AnimatePresence>
                    {showScrollToTop && (
                        <motion.button
                            className="fixed bottom-20 right-4 p-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg z-40"
                            onClick={scrollToTop}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.2 }}
                            aria-label="Scroll to top"
                        >
                            <ArrowUp size={16} />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            <FloatingMenu />

            {showImageModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div
                        ref={imageModalRef}
                        className="relative max-w-4xl w-fit mx-12 rounded-lg overflow-hidden shadow-xl bg-transparent"
                    >
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                        <img src={activeImage} alt="Preview" className="lg:w-96 md:w-96 sm:w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </main>
    );
}
