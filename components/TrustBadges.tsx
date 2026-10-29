'use client';

import { motion } from 'framer-motion';

const TRUST_ITEMS = [
  { title: '100% Food-Grade', desc: 'BPA & Phthalate Free', icon: '🌿' },
  { title: 'Pediatric Approved', desc: 'Designed with Dentists', icon: '🩺' },
  { title: 'Ultra-Gentle', desc: 'Safe for Sensitive Gums', icon: '✨' },
  { title: 'Fast Delivery', desc: 'Dispatched in 24 hrs', icon: '🚚' },
];

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {TRUST_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{
              duration: 0.6,
              delay: idx * 0.12,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            whileHover={{ y: -4 }}
            className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs hover:shadow-md transition-shadow flex items-center gap-3"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
              <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}