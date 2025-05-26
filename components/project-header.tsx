"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Link, ChevronLeft } from "lucide-react";

interface Project {
    title: string;
    avatar: string;
    isOnline: boolean;
    description: string;
    coverImage: string;
    client: string;
    duration: string;
    role: string;
    year: number;
}

interface ProjectHeaderProps {
    project: Project;
    isScrolled: boolean;
}

export function ProjectHeader({ project, isScrolled }: ProjectHeaderProps) {
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
            {/*this one have to remove after cmomplete site */}
            <div className="bg-gray-800 text-yellow-500 text-sm text-center py-1 px-4">
                🚧 This site is still under development – some content may be updated soon.
            </div>
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
                                src={project.avatar || "/images/namila.jpg"}
                                alt={project.title}
                                className="w-full h-full object-cover"
                                style={{ transform: "translateZ(0)" }}
                            />
                        </div>
                        {project.isOnline && (
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
                            {project.title}
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
                                    <Link
                                        href="/"
                                        className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition-colors"
                                    >
                                        <ChevronLeft size={16} className="mr-2" />
                                        Back to Portfolio
                                    </Link>

                                    <div className="flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                                            <img
                                                src="/images/namila.jpg"
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
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
