'use client';

import { motion } from 'framer-motion';

const PILLARS = [
  {
    icon: '🌱',
    title: 'Pure & Non-Toxic',
    desc: 'Crafted with 100% food-grade silicone and zero BPA, PVC, or phthalates.',
  },
  {
    icon: '🩺',
    title: 'Pediatrician Designed',
    desc: 'Ergonomically engineered alongside pediatric dentists for infant mouth development.',
  },
  {
    icon: '🤍',
    title: 'Gentle on Sensitive Gums',
    desc: 'Ultra-soft textures engineered to soothe teething discomfort without gag risks.',
  },
];

const STATS = [
  { value: '50K+', label: 'Happy Babies' },
  { value: '100%', label: 'Food-Grade Silicone' },
  { value: '200+', label: 'Pediatric Dentists' },
  { value: '0%', label: 'Harmful Chemicals' },
];

export default function AboutUs() {
  return (
    <section id="about" className="max-w-7xl mx-auto px-6 py-16 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative bg-gradient-to-b from-sky-50/80 via-white to-pink-50/40 rounded-3xl p-8 sm:p-14 border border-sky-100/80 shadow-xl overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <span className="inline-flex items-center gap-2 bg-white/90 px-4 py-1.5 rounded-full border border-sky-200 text-sky-700 font-extrabold text-xs tracking-wider uppercase shadow-2xs">
            ✨ Our Story & Vision
          </span>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Designed by Parents, Guided by Pediatricians 🍼
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto pt-2">
            Babyblu was born with a single promise: to create the purest, safest, and most ergonomic infant oral care tools. Every teether, toothbrush, and wipe is thoughtfully engineered to protect delicate newborn gums while making daily routines gentle and worry-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: idx * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-all flex flex-col items-center text-center space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-100/80 flex items-center justify-center text-2xl shadow-2xs">
                {pillar.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">
                {pillar.title}
              </h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <span className="block text-2xl sm:text-3xl font-black bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-xs font-bold text-slate-600">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}