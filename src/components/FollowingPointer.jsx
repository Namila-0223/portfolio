"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { cn } from "../utils/cn";

export const FollowerPointerCard = ({ children, className, title }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef(null);
  const [rect, setRect] = useState(null);
  const [isInside, setIsInside] = useState(false);

  // Recalculate container bounds on mount and resize
  useEffect(() => {
    const updateBounds = () => {
      if (ref.current) {
        setRect(ref.current.getBoundingClientRect());
      }
    };
    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  const handleMouseMove = (e) => {
    if (ref.current) {
      const currentRect = ref.current.getBoundingClientRect();
      x.set(e.clientX - currentRect.left);
      y.set(e.clientY - currentRect.top);
    }
  };

  const handleMouseLeave = () => {
    setIsInside(false);
  };

  const handleMouseEnter = (e) => {
    if (ref.current) {
      const currentRect = ref.current.getBoundingClientRect();
      x.set(e.clientX - currentRect.left);
      y.set(e.clientY - currentRect.top);
    }
    setIsInside(true);
  };

  return (
    <div
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      style={{
        cursor: "none",
      }}
      ref={ref}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside && <FollowPointer x={x} y={y} title={title} />}
      </AnimatePresence>
      {children}
    </div>
  );
};

export const FollowPointer = ({ x, y, title }) => {
  const colors = [
    "#ff4925",
    "#0ea5e9",
    "#14b8a6",
    "#22c55e",
    "#3b82f6",
    "#ef4444",
    "#eab308",
  ];
  return (
    <motion.div
      className="absolute z-50 h-4 w-4 rounded-full pointer-events-none top-0 left-0"
      style={{
        x: x,
        y: y,
      }}
      initial={{
        scale: 1,
        opacity: 0,
      }}
      animate={{
        scale: 1,
        opacity: 1,
      }}
      exit={{
        scale: 0,
        opacity: 0,
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-6 w-6 -translate-x-[12px] -translate-y-[10px] -rotate-[70deg] transform stroke-[#ff4925] text-[#ff4925]"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
      </svg>
      <motion.div
        style={{
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        }}
        initial={{
          scale: 0.5,
          opacity: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
        }}
        className={
          "min-w-max rounded-full px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase whitespace-nowrap text-white font-geist shadow-lg"
        }
      >
        {title || `Namila Preshan`}
      </motion.div>
    </motion.div>
  );
};
