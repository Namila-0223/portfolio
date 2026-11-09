"use client";
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/works') return null;
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Works', path: '/works' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialLinks = [
    { name: 'X/Twitter', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/namilapreshan11' },
    { name: 'Behance', url: '#' },
  ]

  return (
    <footer className="bg-[#0a0a0a] border-t border-[#333] relative overflow-hidden">
      {/* CTA Section */}
      <div className="bg-accent py-20 md:py-32 px-6 relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="flex-1">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-anton text-[12vw] md:text-[8vw] text-black uppercase leading-[0.9] tracking-tight pr-14 md:pr-0"
            >
              LET'S WORK<br/>TOGETHER
            </motion.h2>
          </div>
          <Link
            href="/contact"
            className="bg-black text-white px-8 py-4 rounded-full font-geist font-semibold text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2 uppercase"
          >
            Start a project
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
          </Link>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Left: Brand */}
          <div className="flex flex-col gap-4 max-w-xs">
            <Link href="/" className="font-anton text-2xl tracking-tight uppercase">NAMILA<sup className="text-[8px]">®</sup></Link>
            <p className="text-muted text-xs leading-relaxed">
              Namila Preshan Rupasinghe is a UI/UX Engineer operating at the intersection of user research, design systems, and React/Angular front-end engineering.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-16">
            <div>
              <h4 className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-4">Pages</h4>
              <ul className="flex flex-col gap-2">
                {navLinks.map(link => (
                  <li key={link.path}>
                    <Link href={link.path} className="text-[13px] text-[#cacaca] hover:text-white transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-semibold text-muted uppercase tracking-widest mb-4">Socials</h4>
              <ul className="flex flex-col gap-2">
                {socialLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.url} className="text-[13px] text-[#cacaca] hover:text-white transition-colors flex items-center gap-1">
                      {link.name}
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright bar */}
        <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-[#333] text-[11px] text-muted gap-4">
          <span>&copy; {new Date().getFullYear()} Namila Preshan. All rights reserved.</span>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-muted inline-block"></span>
            <span>Beyond Visuals. Built with Vision.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
