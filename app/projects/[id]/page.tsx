"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRightCircleIcon, X } from "lucide-react";
import FloatingMenu from "@/components/floating-menu";

// Message type definition
type ProjectMessage = {
    id: number;
    sender: string;
    senderName: string;
    content: string | string[];
    hasImage?: boolean;
    imageSrc?: string;
    imageAlt?: string;
    showTools?: boolean;
    item?: string[];
    isfeatureList?: boolean;
    showButton?: boolean;
};

// Project data
const projectsData: {
    [key: string]: {
        title: string;
        description: string;
        coverImage: string;
        client: string;
        duration: string;
        role: string;
        year: string;
        tools: string[];
        feature: string[];
        messages: ProjectMessage[];
    };
} = {
    "mobile-app-ui": {
        title: "Movie Trailer App UI",
        description: "A sleek mobile app for discovering movie trailers and booking tickets.",
        coverImage: "/images/movie-app-cover.png",
        client: "Personal Concept Project",
        duration: "4 weeks",
        role: "UI/UX Designer",
        year: "2024",
        tools: ["Figma", "Notion", "Photoshop"],
        feature: [
            "Trailer previews with a clean scroll experience",
            "Seamless seat booking and showtime selection",
            "Smooth transitions and dark mode UI",
            "Lightweight interactions and ticket summary flow",
        ],
        messages: [
            {
                id: 1,
                sender: "user",
                senderName: "You",
                content: "What’s this Movie Trailer App about?",
            },
            {
                id: 2,
                sender: "namila",
                senderName: "Namila Preshan",
                content:
                    "It's a mobile app concept that lets users watch movie trailers and directly book tickets — all from one place.",
            },
            {
                id: 3,
                sender: "namila",
                senderName: "Namila Preshan",
                content:
                    "The goal was to create a clean, modern UI that simplifies the movie browsing and booking experience.",
            },
            {
                id: 4,
                sender: "namila",
                senderName: "Namila Preshan",
                content: "Here’s a look at the home screen:",
                hasImage: true,
                imageSrc: "/project/frame-1.png",
                imageAlt: "Movie app home screen",
            },
            {
                id: 5,
                sender: "user",
                senderName: "You",
                content: "How did you approach the design process?",
            },
            {
                id: 6,
                sender: "namila",
                senderName: "Namila Preshan",
                content:
                    "I started with research and user personas, then sketched wireframes, created a clear information structure, and finally designed a modern mobile UI.",
            },
            {
                id: 7,
                sender: "user",
                senderName: "Namila Preshan",
                content: "What tools did you use?",
            },
            {
                id: 8,
                sender: "namila",
                senderName: "Namila Preshan",
                content: "I mainly used Figma for UI and prototyping, and Notion for documenting the process.",
                showTools: true,
            },
            {
                id: 9,
                sender: "namila",
                senderName: "Namila Preshan",
                content: "Here’s the seat selection and booking screen:",
                hasImage: true,
                imageSrc: "/project/frame-2.png",
                imageAlt: "Seat booking screen",
            },
            {
                id: 10,
                sender: "user",
                senderName: "You",
                content: "What are some key features of the app?",
            },
            {
                id: 12,
                sender: "namila",
                senderName: "Namila Preshan",
                content: "Here are some highlights:",
                isfeatureList: true,
            },

            {
                id: 13,
                sender: "namila",
                senderName: "Namila Preshan",
                content: "Would you like to see more projects like this one?",
                showButton: true,
            },
        ],
    },
    "design-system": {
        title: "Design System",
        description: "A scalable, accessible, and reusable design system crafted for modern digital products.",
        coverImage: "/images/design-system.png",
        client: "Self-initiated",
        duration: "6 months",
        role: "Design Systems Lead",
        tools: [""],
        feature: [""],
        year: "2022",
        messages: [
            {
                id: 1,
                sender: "namila",
                senderName: "Namila",
                content:
                    "A comprehensive design system I developed to ensure consistency, scalability, and accessibility across digital products.",
                hasImage: true,
                imageSrc: "/images/design-system.png",
                imageAlt: "Design system overview",
            },
            {
                id: 2,
                sender: "namila",
                senderName: "Namila",
                content:
                    "Built entirely in Figma, this component library is optimized for web and mobile UI design, including SaaS platforms and dashboards. It leverages Auto Layout, Variants, and follows WCAG accessibility standards.",
            },
            {
                id: 3,
                sender: "namila",
                senderName: "Namila",
                content:
                    "This self-initiated project showcases my approach to scalable design architecture, system thinking, and visual consistency.",
            },
            {
                id: 4,
                sender: "namila",
                senderName: "Namila",
                content: "You can preview the Figma file here:",
                showButton: true,
                showTools: false,
            },
            {
                id: 30,
                sender: "user",
                senderName: "You",
                content: "Nice! Any more projects I can see?",
            },
            {
                id: 31,
                sender: "namila",
                senderName: "Namila",
                content: "Absolutely! Check out my Behance for more.",
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
    const messageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const messagesLength = project.messages.length;
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [showNewMessageAlert, setShowNewMessageAlert] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [lastViewedMessageIndex, setLastViewedMessageIndex] = useState(-1);
    const [showImageModal, setShowImageModal] = useState(false);
    const [activeImage, setActiveImage] = useState("");
    const [headerHeight, setHeaderHeight] = useState(0);

    const [currentDate, setCurrentDate] = useState(new Date());
    const imageModalRef = useRef<HTMLDivElement>(null);

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
        const project = projectsData[projectId as keyof typeof projectsData];
        if (!project || !project.messages) return;

        const messages = project.messages;

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
                }, 3500 + Math.random() * 1500);
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
    }, [currentMessageIndex, isAtBottom, lastViewedMessageIndex, projectId]);

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

    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white">
            {/*this one have to remove after cmomplete site */}
            {/* <div className="bg-gray-800 text-yellow-500 text-sm text-center py-1 px-4">
                🚧 This site is still under development – some content may be updated soon.
            </div> */}
            {/* Project header - visible only when not scrolled */}
            <div
                className={`fixed top-0 left-0 right-0 z-20 will-change-transform ${
                    isScrolled
                        ? "backdrop-blur-md bg-[#0f0f0f]/80 border-b border-gray-800/70 shadow-md"
                        : "bg-[#0f0f0f] border-b border-gray-800"
                }`}
                style={{
                    transition: "background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
                    contain: "layout paint style",
                    transform: "translateZ(0)",
                }}
            >
                {/* Optional notice bar */}
                {/* <div className="bg-gray-800 text-yellow-500 text-sm text-center py-1 px-4">
                    🚧 This site is still under development – some content may be updated soon.
                </div> */}

                <div className="container max-w-2xl mx-auto px-4 relative">
                    {/* Back button */}
                    <Link
                        href="/"
                        className="absolute left-0 top-4 flex items-center text-gray-300 hover:text-white transition-colors"
                    >
                        <ChevronLeft size={16} className="mr-2" />
                        Back
                    </Link>

                    <div className="flex flex-col items-center text-center py-2">
                        {/* Project icon/avatar */}
                        <div className="relative" style={{ marginBottom: isScrolled ? "4px" : "12px" }}>
                            <div
                                className="rounded-full overflow-hidden border-2 border-blue-500"
                                style={{
                                    width: isScrolled ? "48px" : "80px",
                                    height: isScrolled ? "48px" : "80px",
                                    transition: "width 0.3s ease, height 0.3s ease",
                                    willChange: "width, height",
                                    transform: "translateZ(0)",
                                }}
                            >
                                <img
                                    src="/project/app-icon.png"
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    style={{ transform: "translateZ(0)" }}
                                />
                            </div>
                        </div>

                        {/* Project title */}
                        <h1
                            className="font-bold"
                            style={{
                                fontSize: isScrolled ? "1.125rem" : "1.25rem",
                                transition: "font-size 0.3s ease",
                                willChange: "font-size",
                            }}
                        >
                            {project.title}
                        </h1>

                        {/* Extra info, animated */}
                        <AnimatePresence>
                            {!isScrolled && (
                                <motion.div
                                    key="project-info"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: "hidden", willChange: "opacity, height" }}
                                >
                                    <p className="text-sm text-gray-400 mt-1">{project.description}</p>

                                    <div className="grid grid-cols-2 gap-x-8 justify-items-start gap-y-2 mt-3 text-sm text-gray-300">
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Chat container */}
            <div style={{ paddingTop: `${headerHeight + 20}px` }}>
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
                                            src="/images/namila_1.webp"
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
                                        className={`p-4 lg:w-96 md:w-96 ${
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
                                                    className="rounded-lg w-full object-cover shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
                                                    style={{ aspectRatio: "16/9", height: "auto" }}
                                                    onClick={() => {
                                                        setActiveImage(msg.imageSrc || "");
                                                        setShowImageModal(true);
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* follow button */}
                                        {msg.showButton && (
                                            <div className="flex flex-col items-center mt-3">
                                                <Link
                                                    href="https://www.behance.net/namilapreshan1"
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
                                                        View more projects
                                                    </Button>
                                                </Link>
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

                                        {msg.isfeatureList && (
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                <ul className="list-disc pl-5 space-y-1 text-sm text-white">
                                                    {project.feature.map((item, index) => (
                                                        <li key={index}>{item}</li>
                                                    ))}
                                                </ul>
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
                                        src="/images/namila_1.webp"
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
                    </div>

                    {/* Footer */}
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
                                    className="fixed bottom-6 mx-auto p-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg z-50 flex items-center"
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
                    {/* Scroll to top button */}
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
            </div>
            <div className="fixed bottom-0 h-[48px] w-full text-center text-xs bg-[#0f0f0f]  text-gray-500 mt-8 pt-4 border-gray-800">
                © 2025 Made with ❤️ by Namila Preshan
                {/* <a href="#" className="hover:text-gray-400">
                            Privacy
                        </a> */}
            </div>

            <FloatingMenu />

            {showImageModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div
                        ref={imageModalRef}
                        className="relative max-w-4xl w-full mx-4 rounded-lg overflow-hidden shadow-xl bg-transparent"
                    >
                        <button
                            onClick={() => setShowImageModal(false)}
                            className="absolute top-3 right-3 text-white bg-black/40 hover:bg-black/70 p-2 rounded-full transition"
                            aria-label="Close"
                        >
                            <X size={24} />
                        </button>
                        <img src={activeImage} alt="Preview" className="w-full h-auto rounded-lg" />
                    </div>
                </div>
            )}
        </main>
    );
}
