"use client";
import React from 'react'
import { motion } from 'framer-motion'

export default function Blog() {
  const posts = [
    { title: 'Why Clarity in Design Wins Every Time', cat: 'Design', date: 'Jan 2025', desc: 'Exploring the principles behind clean, purposeful interfaces that convert.', img: '/images/blog-clarity.png' },
    { title: 'The Power of Motion in Web Experiences', cat: 'Motion', date: 'Dec 2024', desc: 'How subtle animations transform user engagement and perception of quality.', img: '/images/blog-motion.png' },
    { title: 'Building Templates That Scale', cat: 'Development', date: 'Nov 2024', desc: 'Lessons learned from building premium Framer templates used by thousands.', img: '/images/blog-template.png' },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      }
    }
  }

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <div className="bg-[#0a0a0a] pt-24 overflow-hidden">
      {/* Ghost heading */}
      <div className="text-center pointer-events-none select-none overflow-hidden pt-8">
        <motion.span
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="font-anton text-[14vw] md:text-[10vw] tracking-tight uppercase text-stroke block"
        >JOURNAL</motion.span>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[10px] font-semibold text-accent uppercase tracking-widest block"
        >(BLOG)</motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="font-anton text-4xl md:text-6xl uppercase tracking-tight text-white leading-none mt-3 mb-16"
        >Insights & Stories</motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {posts.map((p, i) => (
            <motion.article
              key={i}
              variants={revealVariants}
              className="bg-[#111] border border-[#333] rounded-2xl overflow-hidden group cursor-pointer hover:border-accent/30 transition-colors"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-[1.025] transition-transform duration-700" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-accent text-[10px] font-semibold uppercase tracking-widest">{p.cat}</span>
                  <span className="text-[#555] text-[10px]">•</span>
                  <span className="text-muted text-[10px]">{p.date}</span>
                </div>
                <h3 className="font-geist font-bold text-base text-white mb-2 leading-snug">{p.title}</h3>
                <p className="text-muted text-xs leading-relaxed">{p.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
