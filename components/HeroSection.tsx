'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.94]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const bgBlobY1 = useTransform(scrollYProgress, [0, 1], [0, -130]);
  const bgBlobY2 = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const card1Y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [0, 70]);

  const logoZoomSequenceVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 3.2,
      y: 160,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 2.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const contentSequenceVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 2.0,
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
        duration: 0.75,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-20 pb-16"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        <Image
          src="/background.png"
          alt="Babyblu Nursery Background"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-80 contrast-[1.02] brightness-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sky-100/20 via-transparent via-60% to-[#FAF9F5]" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          style={{ y: bgBlobY1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 -left-20 w-[420px] h-[420px] bg-sky-200/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: bgBlobY2 }}
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -right-20 w-[440px] h-[440px] bg-indigo-100/25 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-6 z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoZoomSequenceVariants}
          className="flex justify-center"
        >
          <div className="relative group p-3.5 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/90 shadow-xl hover:shadow-2xl transition-all duration-300">
            <Image
              src="/logo.png"
              alt="Babyblu Logo"
              width={220}
              height={60}
              className="h-14 sm:h-16 w-auto object-contain drop-shadow-xs"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          style={{ y: contentY }}
          variants={contentSequenceVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          <motion.div variants={fadeInUpVariants}>
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-none drop-shadow-md">
              <span className="text-slate-950">Baby</span>
              <span className="bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 bg-clip-text text-transparent">
                blu
              </span>
            </h1>
          </motion.div>

          <motion.div variants={fadeInUpVariants} className="inline-block pt-1">
            <span className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-xl px-5 py-2 rounded-full border border-sky-200/80 shadow-md text-sky-800 font-extrabold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-ping"></span>
              Developed with Pediatric Expertise
            </span>
          </motion.div>

          <motion.p
            variants={fadeInUpVariants}
            className="text-slate-900 font-bold text-base sm:text-lg max-w-md mx-auto leading-relaxed pt-1 bg-white/80 backdrop-blur-xl px-6 py-3 rounded-2xl border border-white/90 shadow-sm"
          >
            Ultra-soft teethers & gentle oral care tools crafted with newborn safety first.
          </motion.p>

          <motion.div
            variants={fadeInUpVariants}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-3"
          >
            <a
              href="#products"
              onClick={(e) => handleScrollToSection(e, 'products')}
              className="group relative bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm sm:text-base shadow-xl shadow-amber-300/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <span>Shop Essentials 🍼</span>
            </a>

            <a
              href="#about"
              onClick={(e) => handleScrollToSection(e, 'about')}
              className="bg-white/90 hover:bg-white text-slate-900 font-extrabold px-6 py-3.5 rounded-full text-sm border border-slate-200/90 shadow-md transition-all hover:scale-105 backdrop-blur-xl cursor-pointer hover:shadow-lg flex items-center gap-1.5"
            >
              <span>Know About Us</span>
              <span>✨</span>
            </a>

            <a
              href="#safety"
              onClick={(e) => handleScrollToSection(e, 'safety')}
              className="bg-white/90 hover:bg-white text-slate-900 font-extrabold px-6 py-3.5 rounded-full text-sm border border-slate-200/90 shadow-md transition-all hover:scale-105 backdrop-blur-xl cursor-pointer hover:shadow-lg"
            >
              Our Safety Standard
            </a>
          </motion.div>

          <motion.div
            variants={fadeInUpVariants}
            className="pt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-3xl mx-auto"
          >
            <motion.div
              style={{ y: card1Y }}
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/90 shadow-lg shadow-sky-950/5 flex items-center gap-2.5 hover:bg-white hover:scale-105 transition-all cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 flex items-center justify-center text-white text-sm font-bold shadow-xs">
                🦷
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                100% Food-Grade Silicone
              </span>
            </motion.div>

            <motion.div
              style={{ y: card2Y }}
              animate={{ y: [4, -4, 4] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/90 shadow-lg shadow-sky-950/5 flex items-center gap-2.5 hover:bg-white hover:scale-105 transition-all cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-bold shadow-xs">
                🩺
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                Pediatric Dentist Tested
              </span>
            </motion.div>

            <motion.div
              style={{ y: card3Y }}
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              className="bg-white/90 backdrop-blur-xl px-4 py-2.5 rounded-full border border-white/90 shadow-lg shadow-sky-950/5 flex items-center gap-2.5 hover:bg-white hover:scale-105 transition-all cursor-default"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center text-white text-sm font-bold shadow-xs">
                🌸
              </div>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight">
                Ultra-Gentle on Gums
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}