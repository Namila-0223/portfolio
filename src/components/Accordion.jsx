"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

export default function Accordion({ index, title, content }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-neutral-900 last:border-0 py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left py-2 group focus:outline-none"
      >
        <div className="flex items-center gap-6 md:gap-8">
          <span className={`font-display text-lg font-bold ${isOpen ? 'text-brand' : 'text-neutral-600'} transition-colors`}>
            {index}
          </span>
          <span className="font-display text-lg md:text-2xl font-bold tracking-tight text-white group-hover:text-brand transition-colors duration-300">
            {title}
          </span>
        </div>

        <div className={`w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white transition-all duration-300 ${isOpen ? 'bg-brand/10 border-brand/30 text-brand' : ''}`}>
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pl-12 md:pl-16 pr-10 pt-4 pb-2">
              <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-3xl">
                {content}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
