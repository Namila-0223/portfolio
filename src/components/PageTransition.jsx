"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "../utils/cn";

/**
 * High-Fidelity Custom Page Transition & Loader Wrapper
 * Intercepts internal navigations, slides up from bottom to top to cover the screen,
 * reveals the brand animation text, and then collapses from bottom to top to uncover the page.
 */
export default function PageTransition({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [status, setStatus] = useState("presenting"); // starts in covered presenting state on first load
  const [textActive, setTextActive] = useState(true);
  const targetHref = useRef(null);
  const viewTransitionResolveRef = useRef(null);
  const viewTransitionTargetRef = useRef(null);

  // Initial load and navigation presenter
  useEffect(() => {
    if (status === "presenting") {
      setTextActive(true);
      const textTimer = setTimeout(() => {
        setTextActive(false);
      }, 1200);

      const revealTimer = setTimeout(() => {
        setStatus("revealing");
      }, 1300);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [status]);

  // Once pathname updates to target, start presentation reveal sequence or resolve view transitions
  useEffect(() => {
    if (targetHref.current) {
      const targetPath = targetHref.current.split("?")[0].split("#")[0];
      if (pathname === targetPath) {
        targetHref.current = null;
        setStatus("presenting");
      }
    }

    if (viewTransitionTargetRef.current) {
      const targetPath = viewTransitionTargetRef.current.split("?")[0].split("#")[0];
      if (pathname === targetPath) {
        viewTransitionTargetRef.current = null;
        if (viewTransitionResolveRef.current) {
          viewTransitionResolveRef.current();
          viewTransitionResolveRef.current = null;
        }
      }
    }
  }, [pathname]);

  // Global click listener to intercept link clicks and apply slide transitions
  useEffect(() => {
    const handleLinkClick = (e) => {
      const target = e.target.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");

      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("//") &&
        !href.includes("#") && // ignore anchor links
        target.getAttribute("target") !== "_blank" &&
        e.button === 0 &&
        !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey
      ) {
        e.preventDefault();
        e.stopPropagation();

        // If view transition is requested, bypass default slide transition and wait for navigation to complete
        if (target.getAttribute("data-view-transition") === "true") {
          if (document.startViewTransition) {
            viewTransitionTargetRef.current = href;
            let timeoutId;
            const promise = new Promise((resolve) => {
              viewTransitionResolveRef.current = () => {
                clearTimeout(timeoutId);
                resolve();
              };
            });
            // Safeguard timeout to ensure we don't freeze the UI if navigation hangs
            timeoutId = setTimeout(() => {
              if (viewTransitionResolveRef.current) {
                viewTransitionResolveRef.current();
                viewTransitionResolveRef.current = null;
              }
            }, 1500);

            document.startViewTransition(async () => {
              // Remove any temporary transition images appended synchronously during click event
              const tempImages = document.querySelectorAll(".temp-transition-image");
              tempImages.forEach((img) => img.remove());

              router.push(href);
              await promise;
            });
          } else {
            router.push(href);
          }
          return;
        }

        // If already animating, prevent overlapping triggers
        if (status !== "idle") return;

        targetHref.current = href;
        setStatus("covering");

        // After cover animation finishes, trigger router push
        setTimeout(() => {
          router.push(href);
        }, 600);
      }
    };

    // Intercept in the capture phase so we run BEFORE Next.js click listeners
    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleLinkClick, { capture: true });
  }, [status, router]);

  // Slide-up to cover (100% -> 0%) and slide-up to reveal (0% -> -100%)
  const panelVariants = {
    covering: {
      y: ["100%", "0%"],
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    presenting: {
      y: "0%",
    },
    revealing: {
      y: ["0%", "-100%"],
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
    idle: {
      y: "-100%",
    },
  };

  return (
    <>
      {/* Full-screen transition overlay sitting above everything */}
      <motion.div
        className={cn(
          "fixed inset-0 bg-accent z-[99999] flex items-center justify-center",
          status === "idle" ? "pointer-events-none" : "pointer-events-auto"
        )}
        initial={{ y: "0%" }} // begins fully covered
        animate={status}
        variants={panelVariants}
        onAnimationComplete={(definition) => {
          if (definition === "revealing") {
            setStatus("idle");
          }
        }}
      >
        {/* Animated Brand Text inside Loader */}
        {textActive && (status === "presenting" || status === "covering") && (
          <motion.span
            className="font-anton text-[8vw] text-black uppercase select-none tracking-tight block"
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{
              opacity: [0, 1, 1, 0],
              y: [30, 0, 0, -20],
              scale: [0.9, 1, 1, 0.95],
            }}
            transition={{
              times: [0, 0.2, 0.8, 1],
              duration: 1.2,
              ease: "easeInOut",
            }}
          >
            NAMILA
          </motion.span>
        )}
      </motion.div>

      {/* Children content mount */}
      <div className="w-full min-h-screen">
        {children}
      </div>
    </>
  );
}
