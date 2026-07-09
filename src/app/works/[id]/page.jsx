"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { PROJECTS } from "../../../data/projects";

export default function ProjectDetails() {
  const params = useParams();
  const router = useRouter();
  const idStr = params.id;
  const id = parseInt(idStr, 10);
  
  const project = PROJECTS.find((p) => p.id === id);

  // Auto-hide global portfolio header on mount
  useEffect(() => {
    document.body.classList.add("hide-header");
    return () => {
      document.body.classList.remove("hide-header");
    };
  }, []);

  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Parallax Scroll hooks for Hero mockup
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], ["0%", "26%"]);
  const scaleParallax = useTransform(scrollY, [0, 800], [1.0, 1.12]);
  const opacityParallax = useTransform(scrollY, [0, 600], [1.0, 0.0]);

  if (!project) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        fontFamily: "Geist, Inter, sans-serif"
      }}>
        <h2>PROJECT NOT FOUND</h2>
        <Link href="/works" style={{ color: "#ff4925", marginTop: 16, textDecoration: "underline" }}>
          Back to Works
        </Link>
      </div>
    );
  }

  // Next project logic for footer
  const nextId = (project.id + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextId];

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#ffffff",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .text-stroke-title {
          color: transparent;
          -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.15);
        }
        .btn-behance {
          background: #181818;
          border: 1px solid #333;
          border-radius: 16px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-behance:hover {
          border-color: ${project.accent};
          background: rgba(255, 255, 255, 0.02);
          box-shadow: 0 12px 40px -15px ${project.accent}50;
          transform: translateY(-4px);
        }
        .btn-behance:hover .behance-arrow {
          transform: translate(4px, -4px);
        }
        .showcase-img {
          border-radius: 20px;
          border: 1px solid #222;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 20px 50px rgba(0,0,0,0.6);
        }
        .showcase-img:hover {
          border-color: ${project.accent}66;
          transform: scale(1.015);
          box-shadow: 0 30px 60px rgba(0,0,0,0.8), 0 0 30px ${project.accent}08;
        }
        .nav-next {
          border-top: 1px solid #222;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .nav-next:hover {
          background: rgba(255,255,255,0.015);
        }
        .nav-next:hover .next-title {
          color: ${project.accent} !important;
        }
        .nav-next:hover .next-arrow {
          transform: translateX(8px);
        }
      `}} />

      {/* Floating Back Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        style={{
          position: "fixed",
          top: screenSize.isMobile ? 32 : 48,
          left: screenSize.isMobile ? 20 : 40,
          zIndex: 1000,
        }}
      >
        <Link
          href="/works"
          data-view-transition="true"
          style={{
            background: "rgba(10, 10, 10, 0.72)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            color: "#ffffff",
            textDecoration: "none",
            padding: "10px 20px",
            borderRadius: "9999px",
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            display: "inline-block",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 24px rgba(0, 0, 0, 0.5)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = project.accent;
            e.currentTarget.style.boxShadow = `0 0 16px ${project.accent}30`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
            e.currentTarget.style.boxShadow = "0 4px 24px rgba(0, 0, 0, 0.5)";
          }}
        >
          ← BACK TO WORKS
        </Link>
      </motion.div>

      {/* ── SECTION 1: HERO ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "90vh",
          overflow: "hidden",
          background: "#050505",
          display: "flex",
          alignItems: "flex-end",
          paddingBottom: "8vh",
        }}
      >
        {/* Parallax Background Mockup Image & Gradient Overlay Transition Container */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            y: yParallax,
            scale: scaleParallax,
            opacity: opacityParallax,
            originY: 0,
            viewTransitionName: `project-image-${project.id}`,
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <img
              src={project.img}
              alt={project.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                filter: "brightness(0.58)",
              }}
            />
            {/* Gradient Shadow Overlay (contained inside view transition group to morph/fade synchronously) */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0.5) 45%, rgba(10,10,10,0.98) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>
        </motion.div>

        {/* Hero Meta Content */}
        <div
          style={{
            position: "relative",
            width: "90%",
            maxWidth: "1100px",
            margin: "0 auto",
            zIndex: 10,
          }}
        >
          {/* Project Name */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: screenSize.isMobile ? "3.2rem" : "clamp(4.2rem, 7.5vw, 7.2rem)",
              fontWeight: 400,
              color: "#ffffff",
              margin: "0 0 32px 0",
              lineHeight: 0.9,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              textShadow: "0 10px 40px rgba(0,0,0,0.5)",
            }}
          >
            {project.title}
          </motion.h1>

          {/* Project Metadata Grid */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.95 }}
            style={{
              display: "grid",
              gridTemplateColumns: screenSize.isMobile ? "1fr 1fr" : "1fr 1fr 1fr",
              gap: screenSize.isMobile ? "20px" : "32px",
              borderTop: "1px solid rgba(255,255,255,0.12)",
              paddingTop: "24px",
            }}
          >
            <div>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: 9,
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                marginBottom: 6
              }}>
                Role
              </span>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: screenSize.isMobile ? 13 : 15,
                color: "#ffffff",
                fontWeight: 500
              }}>
                {project.role}
              </span>
            </div>
            <div>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: 9,
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                marginBottom: 6
              }}>
                Timeline
              </span>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: screenSize.isMobile ? 13 : 15,
                color: "#ffffff",
                fontWeight: 500
              }}>
                {project.timeline}
              </span>
            </div>
            <div style={{ gridColumn: screenSize.isMobile ? "span 2" : "span 1" }}>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: 9,
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                marginBottom: 6
              }}>
                Industry
              </span>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: screenSize.isMobile ? 13 : 15,
                color: "#ffffff",
                fontWeight: 500
              }}>
                {project.industry}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── MAIN CONTENT WRAPPER ── */}
      <div style={{ width: "90%", maxWidth: "1100px", margin: "0 auto", display: "flex", flexDirection: "column" }}>

        {/* ── SECTION 2: OVERVIEW ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: screenSize.isMobile ? "64px" : "96px",
            paddingBottom: screenSize.isMobile ? "64px" : "96px",
            borderBottom: "1px solid #1c1c1c",
            display: "flex",
            flexDirection: screenSize.isMobile ? "column" : "row",
            gap: screenSize.isMobile ? 24 : 40,
          }}
        >
          <div style={{ width: screenSize.isMobile ? "100%" : "250px", flexShrink: 0 }}>
            <span style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: 10,
              color: project.accent,
              letterSpacing: "0.2em",
              fontWeight: 700,
              display: "block",
              textTransform: "uppercase",
              marginBottom: 6
            }}>
              01 / OVERVIEW
            </span>
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: "2rem", fontWeight: 400, color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
              THE PROJECT
            </h2>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: screenSize.isMobile ? 16 : 19,
              fontWeight: 300,
              color: "#cacaca",
              lineHeight: 1.8,
              margin: 0,
              maxWidth: "800px",
            }}>
              {project.overview}
            </p>
          </div>
        </motion.div>

        {/* ── SECTION 3: CHALLENGE & SOLUTION ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: screenSize.isMobile ? "64px" : "96px",
            paddingBottom: screenSize.isMobile ? "64px" : "96px",
            borderBottom: "1px solid #1c1c1c",
            display: "flex",
            flexDirection: screenSize.isMobile ? "column" : "row",
            gap: screenSize.isMobile ? 32 : 40,
          }}
        >
          <div style={{ width: screenSize.isMobile ? "100%" : "250px", flexShrink: 0 }}>
            <span style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: 10,
              color: project.accent,
              letterSpacing: "0.2em",
              fontWeight: 700,
              display: "block",
              textTransform: "uppercase",
              marginBottom: 6
            }}>
              02 / ASSESSMENT
            </span>
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: "2rem", fontWeight: 400, color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
              CHALLENGE
            </h2>
          </div>
          <div style={{ flex: 1, display: "grid", gridTemplateColumns: screenSize.isMobile ? "1fr" : "1fr 1fr", gap: "40px" }}>
            <div>
              <h3 style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 13, color: "#ff4925", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 12px 0" }}>
                THE CHALLENGE
              </h3>
              <p style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 15, color: "#8f8f8f", lineHeight: 1.7, margin: 0 }}>
                {project.challengeText}
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 13, color: "#10b981", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, margin: "0 0 12px 0" }}>
                THE SOLUTION
              </h3>
              <p style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 15, color: "#e2e2e2", lineHeight: 1.7, margin: 0 }}>
                {project.solutionText}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 4: PROCESS SNAPSHOT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: screenSize.isMobile ? "64px" : "96px",
            paddingBottom: screenSize.isMobile ? "64px" : "96px",
            borderBottom: "1px solid #1c1c1c",
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <span style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: 10,
              color: project.accent,
              letterSpacing: "0.2em",
              fontWeight: 700,
              display: "block",
              textTransform: "uppercase",
              marginBottom: 6
            }}>
              03 / PIPELINE
            </span>
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: "2rem", fontWeight: 400, color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
              PROCESS SNAPSHOT
            </h2>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: screenSize.isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: "24px",
          }}>
            {/* User Flow */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{
                aspectRatio: "4/3",
                borderRadius: 16,
                border: "1px solid #222",
                overflow: "hidden",
                background: "#141414"
              }}>
                <img
                  src="/images/process-flow.png"
                  alt="User Flow diagram representation"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                01 / User Flow
              </span>
            </div>
            
            {/* Wireframes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{
                aspectRatio: "4/3",
                borderRadius: 16,
                border: "1px solid #222",
                overflow: "hidden",
                background: "#141414"
              }}>
                <img
                  src="/images/process-wireframe.png"
                  alt="Wireframe blueprint representation"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                02 / Wireframes
              </span>
            </div>
            
            {/* Design System */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{
                aspectRatio: "4/3",
                borderRadius: 16,
                border: "1px solid #222",
                overflow: "hidden",
                background: "#141414"
              }}>
                <img
                  src="/images/process-system.png"
                  alt="Design system components representation"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <span style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 12, fontWeight: 700, color: "#ffffff", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                03 / Design System
              </span>
            </div>
          </div>
        </motion.div>

        {/* ── SECTION 5: FINAL UI SHOWCASE (50% OF PAGE LENGTH) ── */}
        <div style={{
          paddingTop: screenSize.isMobile ? "64px" : "96px",
          paddingBottom: screenSize.isMobile ? "64px" : "96px",
          borderBottom: "1px solid #1c1c1c",
          display: "flex",
          flexDirection: "column",
          gap: "48px"
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: 10,
              color: project.accent,
              letterSpacing: "0.2em",
              fontWeight: 700,
              display: "block",
              textTransform: "uppercase",
              marginBottom: 6
            }}>
              04 / PRODUCTION
            </span>
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: "2rem", fontWeight: 400, color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
              FINAL UI SHOWCASE
            </h2>
          </motion.div>

          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: screenSize.isMobile ? "32px" : "56px"
          }}>
            {/* 1. Large Flat UI Mockup (Primary Display) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="showcase-img"
              style={{ width: "100%", aspectRatio: "16/9" }}
            >
              <img
                src={project.detailImg}
                alt={`${project.title} flat UI screen mockup`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </motion.div>

            {/* 2. Side-by-Side Double Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "grid",
                gridTemplateColumns: screenSize.isMobile ? "1fr" : "1.2fr 1fr",
                gap: screenSize.isMobile ? "32px" : "40px"
              }}
            >
              {/* Desk Mockup */}
              <div className="showcase-img" style={{ aspectRatio: "4/3" }}>
                <img
                  src={project.img}
                  alt={`${project.title} device mockup on desk`}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Process style swatch mockup */}
              <div className="showcase-img" style={{ aspectRatio: "4/3", background: "#111", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "32px", boxSizing: "border-box", border: "1px solid #222" }}>
                <div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: project.accent }}>// COLOR GUIDE</span>
                  <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                    {project.caseStudy.designSystem.colors.map((c, idx) => (
                      <div key={idx} style={{ width: 36, height: 36, borderRadius: "50%", background: c.hex, border: "1px solid rgba(255,255,255,0.12)" }} />
                    ))}
                  </div>
                </div>
                <div>
                  <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: project.accent }}>// TYPOGRAPHY SPEC</span>
                  <h4 style={{ fontFamily: "Anton, sans-serif", fontSize: "1.8rem", textTransform: "uppercase", margin: "12px 0 0 0", color: "#ffffff" }}>
                    {project.caseStudy.designSystem.fonts[0].split(" ")[0]}
                  </h4>
                  <p style={{ fontFamily: "Geist, Inter, sans-serif", fontSize: 12, color: "#8f8f8f", margin: "4px 0 0 0" }}>
                    Primary Header & Interface Font System
                  </p>
                </div>
              </div>
            </motion.div>

            {/* 3. Widescreen Mockup Display (Secondary display) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="showcase-img"
              style={{ width: "100%", aspectRatio: "21/9" }}
            >
              <img
                src={project.detailImg}
                alt={`${project.title} widescreen UI mockup`}
                style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.1)", transformOrigin: "center top" }}
              />
            </motion.div>
          </div>
        </div>

        {/* ── SECTION 6: KEY RESULTS ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: screenSize.isMobile ? "64px" : "96px",
            paddingBottom: screenSize.isMobile ? "64px" : "96px",
            borderBottom: "1px solid #1c1c1c",
          }}
        >
          <div style={{ marginBottom: "40px" }}>
            <span style={{
              fontFamily: "Geist, Inter, sans-serif",
              fontSize: 10,
              color: project.accent,
              letterSpacing: "0.2em",
              fontWeight: 700,
              display: "block",
              textTransform: "uppercase",
              marginBottom: 6
            }}>
              05 / METRICS
            </span>
            <h2 style={{ fontFamily: "Anton, sans-serif", fontSize: "2rem", fontWeight: 400, color: "#ffffff", margin: 0, textTransform: "uppercase" }}>
              KEY RESULTS
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: screenSize.isMobile ? "1fr" : "1fr 1fr 1fr",
            gap: "24px",
          }}>
            {project.caseStudy.results.map((res, idx) => (
              <div key={idx} className="tech-card" style={{
                padding: "32px 24px",
                textAlign: "center",
                boxSizing: "border-box",
                position: "relative",
              }}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 40,
                  height: 2,
                  background: project.accent,
                }} />
                <div style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: "3.5rem",
                  fontWeight: 400,
                  color: "#ffffff",
                  textShadow: `0 0 20px ${project.accent}60`,
                  marginBottom: 8,
                  letterSpacing: "0.02em",
                  lineHeight: 1.1,
                }}>
                  {res.val}
                </div>
                <div style={{
                  fontFamily: "Geist, Inter, sans-serif",
                  fontSize: 10,
                  color: "#8f8f8f",
                  textTransform: "uppercase",
                  letterSpacing: "0.12em",
                  fontWeight: 700,
                }}>
                  {res.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── SECTION 7: VIEW FULL CASE STUDY (BEHANCE CTA) ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            paddingTop: screenSize.isMobile ? "64px" : "96px",
            paddingBottom: screenSize.isMobile ? "64px" : "96px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <a
            href={project.behanceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-behance"
            style={{
              width: "100%",
              maxWidth: "800px",
              padding: screenSize.isMobile ? "40px 24px" : "64px 48px",
              display: "flex",
              flexDirection: screenSize.isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: screenSize.isMobile ? "flex-start" : "center",
              gap: 24,
              textDecoration: "none",
              boxSizing: "border-box",
            }}
          >
            <div>
              <span style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: 10,
                color: project.accent,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                fontWeight: 700,
                display: "block",
                marginBottom: 8
              }}>
                Declassified Research Log
              </span>
              <h3 style={{
                fontFamily: "Anton, sans-serif",
                fontSize: screenSize.isMobile ? "1.8rem" : "2.5rem",
                color: "#ffffff",
                textTransform: "uppercase",
                margin: 0,
                letterSpacing: "0.02em",
                lineHeight: 1.2
              }}>
                VIEW FULL CASE STUDY ON BEHANCE
              </h3>
              <p style={{
                fontFamily: "Geist, Inter, sans-serif",
                fontSize: 13,
                color: "#8f8f8f",
                margin: "12px 0 0 0",
                maxWidth: "550px",
                lineHeight: 1.5
              }}>
                Access complete interactive wireframes, detailed persona layouts, competitor matrix research, and accessibility audits.
              </p>
            </div>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: `1.5px solid ${project.accent}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: project.accent,
              flexShrink: 0,
              transition: "all 0.3s ease",
            }} className="behance-arrow-wrapper">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="behance-arrow"
                style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </a>
        </motion.div>

      </div>

      {/* ── SECTION 8: NEXT PROJECT NAVIGATION (SIMPLE FOOTER) ── */}
      <Link
        href={`/works/${nextId}`}
        data-view-transition="true"
        className="nav-next"
        style={{
          width: "100%",
          padding: screenSize.isMobile ? "64px 5%" : "96px 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textDecoration: "none",
          boxSizing: "border-box",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{
            fontFamily: "Geist, Inter, sans-serif",
            fontSize: 9,
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: 10
          }}>
            NEXT PROJECT
          </span>
          <h2 className="next-title" style={{
            fontFamily: "Anton, sans-serif",
            fontSize: screenSize.isMobile ? "2.5rem" : "4.5rem",
            color: "#ffffff",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.0,
            transition: "color 0.3s ease"
          }}>
            {nextProject.title}
          </h2>
        </div>
        <div style={{
          width: screenSize.isMobile ? 48 : 64,
          height: screenSize.isMobile ? 48 : 64,
          borderRadius: "50%",
          border: "1px solid #333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffffff",
          flexShrink: 0,
        }}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="next-arrow"
            style={{ transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}
