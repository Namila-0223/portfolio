"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { Check, Calendar } from 'lucide-react'
import Link from 'next/link'

export default function PricingCard({ title, description, price, features, popular, isAnnual, linkText, linkUrl }) {
  const displayPrice = isAnnual ? Math.round(price * 0.8) : price

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`relative rounded-[32px] p-8 md:p-10 border transition-all duration-500 flex flex-col justify-between h-full bg-neutral-900/40 border-neutral-900 hover:bg-neutral-900/70 hover:border-brand/20 ${
        popular ? 'border-brand/40 shadow-xl shadow-brand/5' : ''
      }`}
    >
      {popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand text-white text-xs font-extrabold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          Most Popular
        </div>
      )}

      <div>
        {/* Tier Name & Description */}
        <div className="mb-6">
          <h3 className="font-display text-2xl font-extrabold uppercase mb-2 tracking-tight text-white">
            {title}
          </h3>
          <p className="text-neutral-400 text-xs leading-relaxed">
            {description}
          </p>
        </div>

        {/* Pricing block */}
        <div className="flex items-baseline gap-1 py-6 border-y border-neutral-950 mb-8">
          {typeof price === 'number' ? (
            <>
              <span className="text-4xl md:text-5xl font-display font-black text-white">
                ${displayPrice}
              </span>
              <span className="text-neutral-500 font-semibold text-sm">/mo</span>
            </>
          ) : (
            <span className="text-3xl md:text-4xl font-display font-black text-white py-1">
              {price}
            </span>
          )}
        </div>

        {/* Features Checklist */}
        <ul className="flex flex-col gap-4 mb-10">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3.5 text-sm text-neutral-300">
              <div className="w-5 h-5 rounded-full bg-brand/10 border border-brand/20 flex items-center justify-center text-brand flex-shrink-0 mt-0.5">
                <Check className="w-3 h-3" />
              </div>
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking CTA Button */}
      {price === 'Custom Quote' ? (
        <Link
          href="/contact"
          className="w-full text-center bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white py-4 rounded-2xl font-bold text-sm tracking-wide transition-colors duration-300 flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4 text-brand" />
          <span>{linkText}</span>
        </Link>
      ) : (
        <a
          href={linkUrl}
          target="_blank"
          rel="noreferrer"
          className={`w-full text-center py-4 rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 flex items-center justify-center gap-2 ${
            popular
              ? 'bg-brand hover:bg-brand-dark text-white shadow-lg shadow-brand/10'
              : 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-white'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{linkText}</span>
        </a>
      )}
    </motion.div>
  )
}
