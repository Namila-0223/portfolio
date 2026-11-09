"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  useMotionValue,
} from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [monthYear, setMonthYear] = useState("");
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [showLogo, setShowLogo] = useState(pathname !== "/");

  const isHome = pathname === "/";

  // Dynamic flying text math matching the home layout
  const scaleMV = useMotionValue(6.0);
  const xMV = useMotionValue(12);
  const yMV = useMotionValue(24);

  useEffect(() => {
    if (!isHome) return;
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 768) {
        scaleMV.set(2.6);
        xMV.set(8);
        yMV.set(24);
      } else {
        // Ramp the scale up gradually between the tablet breakpoint and the
        // desktop container width, instead of jumping straight to 6.0 at 768px.
        // A hard jump made the logo collide with the status badges/CTA in the
        // header on tablet-width screens (768px-1400px), where both the
        // desktop logo scale and the desktop header content are visible
        // together but there isn't enough room for the full-size logo yet.
        const t = Math.min(1, Math.max(0, (w - 768) / (1400 - 768)));
        scaleMV.set(2.6 + t * (6.0 - 2.6));
        xMV.set(12);
        yMV.set(24);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isHome, scaleMV, xMV, yMV]);

  const scrollProgress = useTransform(scrollY, [0, 200], [0, 1]);

  // Scales down to 1.0 (header size) as you scroll down
  const logoScale = useTransform(scrollProgress, (p) =>
    isHome ? scaleMV.get() + p * (1 - scaleMV.get()) : 1,
  );
  // Translates down to 0 (header coordinates) as you scroll down
  const logoX = useTransform(scrollProgress, (p) =>
    isHome ? xMV.get() * (1 - p) : 0,
  );
  const logoY = useTransform(scrollProgress, (p) =>
    isHome ? yMV.get() * (1 - p) : 0,
  );

  useEffect(() => {
    if (pathname !== "/") {
      setShowLogo(true);
      return;
    }
    // Set initial value
    setShowLogo(scrollY.get() > 200);
    const unsub = scrollY.on("change", (latest) => {
      setShowLogo(latest > 200);
    });
    return () => unsub();
  }, [pathname, scrollY]);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now),
      );
      setMonthYear(
        new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Colombo",
          month: "short",
          year: "numeric",
        })
          .format(now)
          .toUpperCase(),
      );
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Works", path: "/works" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9999] px-4 md:px-6 pt-4 pb-12 bg-gradient-to-b from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent">
        <div className="w-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <motion.span
              style={
                isHome
                  ? {
                      scale: logoScale,
                      x: logoX,
                      y: logoY,
                      transformOrigin: "top left",
                    }
                  : {}
              }
              animate={!isHome ? { opacity: showLogo ? 1 : 0 } : { opacity: 1 }}
              transition={isHome ? { duration: 0 } : { duration: 0.3 }}
              className="font-anton text-2xl md:text-[36px] tracking-tight text-white uppercase origin-top-left inline-block"
            >
              NAMILA<sup className="text-[12px] ml-0.5 top-[-24px]">®</sup>
            </motion.span>
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Status badge - desktop */}
            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[11px] font-medium text-white">
                  Available for project
                </span>
              </div>
              <span className="text-[11px] text-muted">{monthYear}</span>
            </div>

            {/* Time */}
            <div className="hidden md:flex flex-col items-end text-right">
              <span className="text-[11px] font-semibold text-white">
                {time}
              </span>
              <span className="text-[10px] text-muted">(GMT+5:30)</span>
            </div>

            {/* CTA Button */}
            <Link
              href="/contact"
              className="hidden md:flex items-center gap-2 border border-[#555] hover:bg-white hover:text-black text-white px-5 py-2.5 rounded-full text-[11px] font-semibold tracking-wide transition-all duration-300 uppercase"
            >
              LET'S TALK
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-10 h-10 rounded-full border border-[#333] flex items-center justify-center hover:border-accent transition-colors"
              aria-label="Menu"
            >
              <div className="flex flex-col gap-[5px]">
                <span
                  className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[3.25px]" : ""}`}
                />
                <span
                  className={`block w-4 h-[1.5px] bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[3.25px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>
      {/* Offcanvas Drawer Backdrop and Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-[9998]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 h-screen w-full sm:w-[460px] bg-[#0a0a0a] border-l border-[#222]/50 z-[9999] flex flex-col justify-between px-4 md:px-6 pb-8 shadow-[-10px_0_40px_rgba(0,0,0,0.7)]"
            >
              {/* Drawer Top Header Row */}
              <div className="absolute top-0 left-0 w-full h-[76px] flex items-center justify-between px-4 md:px-6 border-b border-[#222]/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent inline-block"></span>
                  <span className="text-[10px] font-bold text-muted tracking-widest font-geist uppercase mt-0.5">
                    MENU
                  </span>
                </div>
                {/* Spacing placeholder for hamburger button sitting on z-50 */}
                <div className="w-10 h-10 opacity-0 pointer-events-none" />
              </div>

              {/* Navigation links - Top Aligned */}
              <nav className="flex flex-col w-full mt-[76px]">
                {links.map((link, i) => {
                  const isActive = pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: 0.12 + i * 0.04,
                        duration: 0.45,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="border-b border-[#222]/50 py-5 md:py-6 w-full"
                    >
                      <Link
                        href={link.path}
                        className={`font-anton text-4xl md:text-[44px] uppercase tracking-tight transition-colors flex items-center justify-between ${
                          isActive
                            ? "text-white"
                            : "text-[#262626] hover:text-[#555] focus:text-white"
                        }`}
                      >
                        <span className="flex items-center">
                          {link.name}
                          {isActive && (
                            <span className="w-1.5 h-1.5 bg-accent inline-block ml-3 mb-1"></span>
                          )}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Footer Section - Email & Socials Grid */}
              <div className="mt-auto pt-8 pb-4 w-full flex flex-col gap-6 font-geist">
                {/* Email Section */}
                <div>
                  <span className="text-[9px] font-bold text-muted tracking-widest uppercase block mb-1.5">
                    (EMAIL)
                  </span>
                  <a
                    href="mailto:Namilapreshan11@gmail.com"
                    className="font-anton text-xl md:text-2xl text-accent hover:text-white transition-colors uppercase tracking-tight block leading-none"
                  >
                    Namilapreshan11@gmail.com
                  </a>
                </div>

                {/* Socials Section */}
                <div>
                  <span className="text-[9px] font-bold text-muted tracking-widest uppercase block mb-2.5">
                    (SOCIALS)
                  </span>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] font-semibold text-white">
                    <a
                      href="#"
                      className="hover:text-accent transition-colors flex items-center gap-0.5"
                    >
                      X/Twitter <span className="text-[9px] text-muted">↗</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/namilapreshan11"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-accent transition-colors flex items-center gap-0.5"
                    >
                      LinkedIn <span className="text-[9px] text-muted">↗</span>
                    </a>
                    <a
                      href="#"
                      className="hover:text-accent transition-colors flex items-center gap-0.5"
                    >
                      Instagram <span className="text-[9px] text-muted">↗</span>
                    </a>
                    <a
                      href="#"
                      className="hover:text-accent transition-colors flex items-center gap-0.5"
                    >
                      Behance <span className="text-[9px] text-muted">↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
