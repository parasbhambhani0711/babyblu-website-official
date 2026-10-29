'use client';

import { motion } from 'framer-motion';

export default function DoctorSpotlight() {
  return (
    <section id="safety" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-24">
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="bg-gradient-to-r from-sky-600 via-indigo-600 to-blue-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="space-y-4 max-w-xl z-10">
          <span className="bg-white/20 text-white text-xs font-black uppercase tracking-widest px-3.5 py-1 rounded-full backdrop-blur-md">
            Doctor Preferred
          </span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">
            Crafted with zero compromises on newborn safety.
          </h2>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed font-medium">
            Every Babyblu product undergoes rigorous clinical evaluations to ensure smooth edges, non-toxic materials, and optimal ergonomics for tiny hands.
          </p>
        </div>

        <motion.div
          id="reviews"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs w-full z-10 shadow-lg"
        >
          <div className="text-4xl mb-2 text-amber-400">⭐⭐⭐⭐⭐</div>
          <p className="text-xs font-medium text-white italic leading-relaxed">
            &quot;Babyblu oral teethers offer ideal texture contrast for soothing teething irritation without risking gag reflexes.&quot;
          </p>
          <span className="block text-xs font-bold mt-3 text-amber-300 uppercase tracking-wider">
            — Pediatric Dental Advisory Board
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}