import React from 'react'

export default function MarqueeLogos() {
  const logos = [
    { name: 'ARJUNA', style: 'tracking-[0.2em] font-black' },
    { name: 'BIMA CORP', style: 'tracking-[0.1em] font-extrabold italic text-brand' },
    { name: 'MANDALA', style: 'tracking-[0.3em] font-light' },
    { name: 'VELOX TECH', style: 'tracking-[0.15em] font-semibold' },
    { name: 'BATAVIA', style: 'tracking-[0.25em] font-bold text-neutral-400' },
    { name: 'SANJAYA', style: 'tracking-[0.05em] font-bold uppercase' }
  ]

  return (
    <div className="w-full py-8 border-y border-neutral-900 bg-neutral-950/20 overflow-hidden relative">
      {/* Gradients to fade out edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap animate-marquee-slow items-center">
        {/* Double the list for infinite loop */}
        {[...logos, ...logos, ...logos].map((logo, i) => (
          <div
            key={i}
            className="inline-flex items-center gap-4 mx-12 text-lg md:text-xl font-display font-bold text-neutral-600 hover:text-white transition-colors duration-300 select-none cursor-default"
          >
            <div className="w-2.5 h-2.5 bg-brand/40 rounded-full" />
            <span className={logo.style}>{logo.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
