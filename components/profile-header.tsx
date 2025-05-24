"use client";
import { motion, AnimatePresence } from "framer-motion";

interface Designer {
    name: string;
    title: string;
    workplace: string;
    tagline: string;
    location: string;
    email: string;
    personality: string;
    avatar: string;
    isOnline: boolean;
}

interface ProfileHeaderProps {
    designer: Designer;
    isScrolled: boolean;
}

export function ProfileHeader({ designer, isScrolled }: ProfileHeaderProps) {
    return (
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
            <div className="container max-w-2xl mx-auto px-4">
                <div className="flex flex-col items-center text-center py-2">
                    {/* Avatar with online indicator */}
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
                                src={designer.avatar || "/images/namila.jpg"}
                                alt={designer.name}
                                className="w-full h-full object-cover"
                                style={{ transform: "translateZ(0)" }}
                            />
                        </div>
                        {designer.isOnline && (
                            <div
                                className="absolute border-2 border-[#0f0f0f] bg-green-500 rounded-full"
                                style={{
                                    width: isScrolled ? "12px" : "16px",
                                    height: isScrolled ? "12px" : "16px",
                                    right: "0px",
                                    bottom: "0px",
                                    transition: "width 0.3s ease, height 0.3s ease",
                                    willChange: "width, height",
                                }}
                            ></div>
                        )}
                    </div>

                    <div>
                        {/* Name */}
                        <h1
                            className="text-xl font-bold"
                            style={{
                                fontSize: isScrolled ? "1.125rem" : "1.25rem",
                                transition: "font-size 0.3s ease",
                                willChange: "font-size",
                            }}
                        >
                            {designer.name}
                        </h1>

                        {/* Additional info with AnimatePresence for smooth enter/exit */}
                        <AnimatePresence>
                            {!isScrolled && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ overflow: "hidden", willChange: "opacity, height" }}
                                >
                                    {/* <p className="text-gray-400 text-sm mt-1 mb-2">{designer.pronouns}</p> */}
                                    <p className="text-sm text-gray-200">
                                        {designer.title}
                                        <a href="#" className="text-blue-400">
                                            {designer.workplace}
                                        </a>
                                    </p>
                                    {/* <p className="text-sm text-gray-400"></p> */}
                                    <p className="text-sm text-gray-300 mt-1">{designer.tagline}</p>
                                    <p className="text-xs text-gray-400 mt-2">
                                        {designer.personality} · {designer.location} · {designer.email}
                                    </p>
                                    <div className="text-xs text-gray-400 mt-1">
                                        <p>👋 Hey, how are you?</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
