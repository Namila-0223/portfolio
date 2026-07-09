"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function ServiceCard({ index, title, description, items }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className="p-8 md:p-10 rounded-[32px] bg-neutral-900/40 border border-neutral-900 hover:border-brand/30 hover:bg-neutral-900/70 transition-all duration-500 flex flex-col justify-between h-full group relative overflow-hidden"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-brand/5 blur-2xl group-hover:bg-brand/10 transition-colors pointer-events-none" />

      <div>
        {/* Header (Index & Title) */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-display font-black text-4xl text-neutral-800 group-hover:text-brand/20 transition-colors">
            {index}
          </span>
          <div className="w-12 h-12 rounded-2xl bg-neutral-950 flex items-center justify-center border border-neutral-800 text-neutral-400 group-hover:text-brand group-hover:border-brand/40 transition-colors duration-500">
            <span className="w-2 h-2 rounded-full bg-brand" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight mb-4 uppercase">
          {title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-8">
          {description}
        </p>
      </div>

      {/* Items list */}
      <ul className="flex flex-col gap-3 pt-6 border-t border-neutral-950">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-3 text-sm text-neutral-300">
            <div className="w-5 h-5 rounded-full bg-neutral-950 border border-neutral-800/80 flex items-center justify-center text-brand">
              <Check className="w-3 h-3" />
            </div>
            <span className="font-medium">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}
