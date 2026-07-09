"use client";
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function WorkCard({ id, title, category, description, image, link }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
      className="group relative flex flex-col gap-6"
    >
      {/* Image container with scale & hover effects */}
      <Link href={link} className="relative overflow-hidden aspect-[4/3] rounded-3xl bg-neutral-900 border border-neutral-800/80 block">
        {/* Subtle hover gradient/tint overlay */}
        <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-colors duration-500 z-10" />
        
        {/* Project Image */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Floating Category Badge */}
        <div className="absolute top-6 left-6 z-20">
          <span className="bg-neutral-950/80 backdrop-blur-md border border-neutral-800/60 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase text-neutral-300">
            {category}
          </span>
        </div>

        {/* Hover Arrow Button overlay */}
        <div className="absolute bottom-6 right-6 z-20 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white shadow-xl shadow-brand/20">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight group-hover:text-brand transition-colors duration-300">
            <Link href={link}>{title}</Link>
          </h3>
          <span className="text-neutral-600 text-xs font-semibold font-display tracking-widest uppercase">
            {id}
          </span>
        </div>
        <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
