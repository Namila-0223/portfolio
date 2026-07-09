"use client";
import React from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
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
        >CONTACT</motion.span>
      </div>

      <section className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-16"
        >
          {/* Left info */}
          <motion.div variants={revealVariants} className="lg:col-span-5">
            <span className="text-[10px] font-semibold text-accent uppercase tracking-widest">(GET IN TOUCH)</span>
            <h1 className="font-anton text-4xl md:text-6xl uppercase tracking-tight text-white leading-[0.95] mt-4">
              Let's build something great together.
            </h1>
            <p className="text-muted text-sm leading-relaxed mt-6 max-w-sm">
              Got a role or a project in mind? I'd love to hear about it. Drop me a message and I'll get back to you within 24 hours.
            </p>

            <div className="mt-12 flex flex-col gap-6 border-t border-[#333] pt-8">
              <div>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-widest block mb-2">Email</span>
                <a href="mailto:Namilapreshan11@gmail.com" className="text-white text-sm font-medium hover:text-accent transition-colors">Namilapreshan11@gmail.com</a>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-widest block mb-2">Phone</span>
                <a href="tel:+94789923608" className="text-white text-sm font-medium hover:text-accent transition-colors">+94 789 923 608</a>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-widest block mb-2">Location</span>
                <span className="text-white text-sm font-medium">Sri Lanka</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-muted uppercase tracking-widest block mb-2">Socials</span>
                <div className="flex gap-4">
                  {[
                    { name: 'X/Twitter', url: '#' },
                    { name: 'Instagram', url: '#' },
                    { name: 'LinkedIn', url: 'https://linkedin.com/in/namilapreshan11' },
                    { name: 'Behance', url: '#' }
                  ].map(s => (
                    <a key={s.name} href={s.url} className="text-[#cacaca] text-xs hover:text-accent transition-colors flex items-center gap-1">
                      {s.name}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div variants={revealVariants} className="lg:col-span-7">
            <form className="flex flex-col gap-6 bg-[#111] border border-[#333] rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-muted uppercase tracking-widest">Full Name</label>
                  <input type="text" placeholder="John Doe" className="bg-[#181818] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-accent focus:outline-none transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold text-muted uppercase tracking-widest">Email</label>
                  <input type="email" placeholder="john@example.com" className="bg-[#181818] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-accent focus:outline-none transition-colors" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-muted uppercase tracking-widest">Subject</label>
                <input type="text" placeholder="Project inquiry" className="bg-[#181818] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-accent focus:outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-semibold text-muted uppercase tracking-widest">Message</label>
                <textarea rows={6} placeholder="Tell me about your project or role..." className="bg-[#181818] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-accent focus:outline-none transition-colors resize-none" />
              </div>
              <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-white py-4 rounded-full font-geist font-semibold text-sm tracking-wide uppercase transition-colors">
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      </section>
    </div>
  )
}
