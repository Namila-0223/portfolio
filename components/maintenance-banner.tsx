"use client";

import React from "react";

// The input bar sits at bottom:12 z-index:70
// Suggestions sit at bottom:64 z-index:60
// We use z-index:50 so the pill slides BEHIND both

export default function MaintenanceBanner() {
  return (
    <>
      <style>{`
        @keyframes mb-ltr {
          from { transform: translateX(-100%); }
          to   { transform: translateX(100vw);  }
        }
        @keyframes mb-ping {
          0%   { transform: scale(1);   opacity: 0.55; }
          70%  { transform: scale(2.6); opacity: 0;    }
          100% { transform: scale(2.6); opacity: 0;    }
        }
        @keyframes mb-pulse {
          0%, 100% { opacity: 1;   }
          50%      { opacity: 0.4; }
        }
      `}</style>

      {/*
        Outer strip: full width, fixed at the bottom,
        overflow:hidden clips the pill when it enters/exits.
        pointer-events:none so it never blocks clicks.
        z-index:50 → behind input (70) and suggestions (60).
      */}
      <div
        style={{
          position: "fixed",
          bottom: "16px",
          left: 0,
          right: 0,
          height: "36px",
          overflow: "hidden",
          zIndex: 50,
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* Single pill — left to right, 16s, repeating */}
        <div
          style={{
            animation: "mb-ltr 16s linear infinite",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "6px 14px",
            borderRadius: "999px",
            background: "rgba(12,12,12,0.82)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
            whiteSpace: "nowrap",
            userSelect: "none",
          }}
        >
          {/* Pulsing dot */}
          <span
            style={{
              position: "relative",
              width: "8px",
              height: "8px",
              display: "inline-flex",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background: "#f59e0b",
                animation: "mb-ping 2.4s ease-in-out infinite",
              }}
            />
            <span
              style={{
                position: "relative",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#f59e0b",
                animation: "mb-pulse 2.4s ease-in-out infinite",
              }}
            />
          </span>

          <span
            style={{
              color: "#f59e0b",
              fontWeight: 700,
              fontSize: "11px",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Under Development
          </span>

          <span style={{ color: "#374151", fontSize: "10px" }}>·</span>

          <span style={{ color: "#9ca3af", fontSize: "11px", letterSpacing: "0.02em" }}>
            Still improving - thanks for your patience!!!
          </span>
        </div>
      </div>
    </>
  );
}
