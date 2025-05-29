import { useState, useRef, useEffect } from "react";
import { Mail, Download, Plus, X } from "lucide-react";
import Contact from "./contact-form";
import { Button } from "./ui/button";

export default function FloatingMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState({ showContactForm: false });
    const [isMessageSent, setIsMessageSent] = useState(false);
    const [showContact, setShowContact] = useState(false);
    const modalRef = useRef(null);

    const toggleMenu = () => setIsOpen(!isOpen);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Close modal on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (modalRef.current && !(modalRef.current as HTMLElement).contains(event.target as Node)) {
                setShowContact(false);
            }
        }

        if (showContact) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showContact]);

    return (
        <>
            {/* Backdrop when menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}
            {/* Floating Button + Menu */}
            <div className="fixed bottom-6 right-4 z-50 flex flex-col items-end space-y-2 rounded-full shadow-lg">
                {isOpen && (
                    <>
                        <div className="flex items-center space-x-2">
                            {isMobile && <div className="text-sm text-white">Contact me</div>}
                            <a
                                onClick={() => {
                                    setShowContact(true);
                                    setIsOpen(false);
                                }}
                                title="Contact Form"
                                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition"
                            >
                                <Mail size={20} />
                                <span className="hidden sm:inline">Contact me</span>
                            </a>
                        </div>

                        <div className="flex items-center space-x-2">
                            {isMobile && <div className="text-sm text-white">Download CV</div>}
                            <a
                                href="/documents/namila-cv.pdf"
                                download
                                title="Download CV"
                                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition"
                            >
                                <Download size={20} />
                                <span className="hidden sm:inline">Resume CV</span>
                            </a>
                        </div>
                    </>
                )}

                <Button
                    onClick={toggleMenu}
                    className="p-3 rounded-full bg-black text-white shadow-xl hover:bg-gray-800 transition "
                >
                    {isOpen ? <X size={16} /> : <Plus size={16} />}
                </Button>
            </div>

            {/* Contact Modal Overlay */}
            {showContact && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div
                        ref={modalRef}
                        className="relative bg-[#1a1a1a] rounded-xl shadow-lg p-6 lg:w-100 md:w-96 sm:w-80 max-w-lg"
                    >
                        <div className="flex justify-between w-full">
                            <h2 className="text-lg font-semibold text-white">Contact Me</h2>
                            <Button
                                onClick={() => setShowContact(false)}
                                className="bg-transparent hover:bg-gray-500/10 text-gray-500 hover:text-white transition"
                            >
                                <X size={20} />
                            </Button>
                        </div>
                        {/* Contact form */}
                        {!isMessageSent ? (
                            <Contact onMessageSent={() => setIsMessageSent(true)} />
                        ) : (
                            <p className="text-green-500 text-center">✅ Message sent! I’ll get back to you soon.</p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
