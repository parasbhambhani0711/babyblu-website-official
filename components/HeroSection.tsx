'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  // Precision Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Parallax Scroll Transforms
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  // Layered Parallax Speeds
  const bgBlobY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgBlobY2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  // Scroll Indicator Fade Out
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // 1. Logo Zoom: Starts 3.5x large, shifted down to y: 160 to clear Navbar, shrinks in 2.8s
  const logoZoomSequenceVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 3.5,
      y: 160, // Shifted down so top edge doesn't get cut by Navbar
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 2.8, // Reduced by 1 second
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // 2. Content Sequence: Reveals near the end of the 2.8s logo sequence
  const contentSequenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2.1, // Synchronized with 2.8s duration
        staggerChildren: 0.14,
      },
    },
  };

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const handleScrollToCatalog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const catalogEl = document.getElementById('products');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-100/70 via-pink-50/40 to-[#FAF9F5] px-6 pt-20 pb-16"
    >
      {/* Background Animated Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          style={{ y: bgBlobY1 }}
          animate={{ scale: [1, 1.25, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-20 w-[420px] h-[420px] bg-sky-200/50 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgBlobY2 }}
          animate={{ scale: [1.2, 1, 1.2], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-20 w-[460px] h-[460px] bg-pink-200/40 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-10 left-1/3 w-80 h-80 bg-amber-100/60 rounded-full blur-3xl"
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto text-center space-y-6 z-10">
        {/* Step 1: Big Centered Logo Shrinks to Normal Position */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoZoomSequenceVariants}
          className="flex justify-center"
        >
          <div className="relative group p-3.5 bg-white/85 backdrop-blur-md rounded-3xl border border-white shadow-xl transition-all hover:scale-105">
            <Image
              src="/logo.png"
              alt="Babyblu Logo"
              width={220}
              height={60}
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-md"
              priority
            />
          </div>
        </motion.div>

        {/* Step 2: Title, Tagline, & Subtitle reveal as Logo settles */}
        <motion.div
          style={{ y: contentY }}
          variants={contentSequenceVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Title */}
          <motion.div variants={fadeInUpVariants}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-slate-900 tracking-tight leading-none drop-shadow-xs">
              Baby<span className="bg-gradient-to-r from-sky-500 via-indigo-500 to-pink-500 bg-clip-text text-transparent">blu</span>
            </h1>
          </motion.div>

          {/* Tagline Badge */}
          <motion.div variants={fadeInUpVariants} className="inline-block pt-1">
            <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-5 py-2 rounded-full border border-sky-200/80 shadow-xs text-sky-700 font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
              Developed with Pediatric Expertise
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUpVariants}
            className="text-slate-600 font-medium text-base sm:text-lg max-w-md mx-auto leading-relaxed pt-1"
          >
            Ultra-soft teethers & gentle oral care tools crafted with newborn safety first.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <a
              href="#products"
              onClick={handleScrollToCatalog}
              className="group relative bg-amber-400 hover:bg-amber-400/90 text-slate-950 font-black px-8 py-4 rounded-full text-sm sm:text-base shadow-lg shadow-amber-200/80 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Shop Essentials 🍼</span>
            </a>
            <a
              href="#safety"
              className="bg-white/80 hover:bg-white text-slate-700 font-bold px-7 py-4 rounded-full text-sm border border-slate-200/80 shadow-xs transition-all hover:scale-105 backdrop-blur-md cursor-pointer"
            >
              Our Safety Standard
            </a>
          </motion.div>

          {/* Floating Proof Cards */}
          <motion.div
            variants={fadeInUpVariants}
            className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
          >
            <motion.div
              style={{ y: card1Y }}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-2xs text-left flex items-center gap-3 hover:bg-white transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-100/80 flex items-center justify-center text-sky-600 text-xl font-bold shrink-0">
                🦷
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">100% Food-Grade</h4>
                <p className="text-[11px] text-slate-500 font-medium">BPA & Phthalate Free</p>
              </div>
            </motion.div>

            <motion.div
              style={{ y: card2Y }}
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-2xs text-left flex items-center gap-3 hover:bg-white transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-pink-100/80 flex items-center justify-center text-pink-600 text-xl font-bold shrink-0">
                🩺
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Doctor Tested</h4>
                <p className="text-[11px] text-slate-500 font-medium">Approved by Dentists</p>
              </div>
            </motion.div>

            <motion.div
              style={{ y: card3Y }}
              animate={{ y: [-5, 5, -5] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/90 shadow-2xs text-left flex items-center gap-3 hover:bg-white transition-all hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100/80 flex items-center justify-center text-amber-600 text-xl font-bold shrink-0">
                🌸
              </div>
              <div>
                <h4 className="text-xs font-black text-slate-900">Ultra-Gentle</h4>
                <p className="text-[11px] text-slate-500 font-medium">Safe for Sensitive Gums</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Scroll Cue Indicator */}
      <motion.a
        href="#products"
        onClick={handleScrollToCatalog}
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 cursor-pointer group"
      >
        <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest group-hover:text-sky-600 transition-colors">
          Scroll to explore 🍼
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-slate-300 group-hover:border-sky-400 flex items-start justify-center p-1 transition-colors bg-white/50 backdrop-blur-2xs"
        >
          <div className="w-1.5 h-2.5 bg-sky-500 rounded-full" />
        </motion.div>
      </motion.a>
    </motion.section>
  );
}