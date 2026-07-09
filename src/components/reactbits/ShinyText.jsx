import React from "react";

/**
 * React Bits - ShinyText Component
 * Creates a high-fidelity shimmering metallic light sweep effect across the text.
 */
export default function ShinyText({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`bg-clip-text inline-block ${disabled ? "" : "animate-shine"} ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(120deg, rgba(255, 255, 255, 0.4) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0.4) 60%)",
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        animationDuration: animationDuration,
        display: "inline-block",
      }}
    >
      {text}
    </span>
  );
}
