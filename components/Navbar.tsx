'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';

interface GenericCartItem {
  quantity?: number;
}

interface GenericCartContext {
  cart?: GenericCartItem[];
  items?: GenericCartItem[];
  cartItems?: GenericCartItem[];
  openCart?: () => void;
  setIsOpen?: (open: boolean) => void;
  setIsCartOpen?: (open: boolean) => void;
  toggleCart?: () => void;
}

export default function Navbar() {
  const cartContext = useCart() as unknown as GenericCartContext;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const itemsList: GenericCartItem[] =
    cartContext?.items ||
    cartContext?.cart ||
    cartContext?.cartItems ||
    [];

  const totalItems = Array.isArray(itemsList)
    ? itemsList.reduce(
        (sum: number, item: GenericCartItem) => sum + (Number(item?.quantity) || 1),
        0
      )
    : 0;

  const handleCartClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof cartContext?.openCart === 'function') {
      cartContext.openCart();
    } else if (typeof cartContext?.setIsOpen === 'function') {
      cartContext.setIsOpen(true);
    } else if (typeof cartContext?.setIsCartOpen === 'function') {
      cartContext.setIsCartOpen(true);
    } else if (typeof cartContext?.toggleCart === 'function') {
      cartContext.toggleCart();
    } else {
      const targetEl = document.getElementById('cart');
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 pt-3 pb-1 transition-all pointer-events-none">
      <div className="max-w-7xl mx-auto pointer-events-auto">
        <div className="bg-white/85 backdrop-blur-xl border border-white/90 shadow-lg shadow-sky-950/5 rounded-full px-5 sm:px-7 h-16 sm:h-18 flex items-center justify-between transition-all">
          <a href="#" className="flex items-center gap-3 group cursor-pointer">
            <div className="relative group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/logo.png"
                alt="Babyblu Logo"
                width={130}
                height={36}
                className="h-8 sm:h-9 w-auto object-contain drop-shadow-2xs"
                priority
              />
            </div>
            <span className="bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200/60 text-sky-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider hidden sm:inline-flex items-center gap-1.5 shadow-2xs">
              Pediatric Tested
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-2 font-extrabold text-xs text-slate-600">
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, 'products')}
              className="px-4 py-2 rounded-full hover:bg-sky-50/80 hover:text-sky-600 transition-all cursor-pointer"
            >
              Catalog
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, 'about')}
              className="px-4 py-2 rounded-full hover:bg-sky-50/80 hover:text-sky-600 transition-all cursor-pointer"
            >
              Know About Us
            </a>
            <a
              href="#safety"
              onClick={(e) => handleNavClick(e, 'safety')}
              className="px-4 py-2 rounded-full hover:bg-sky-50/80 hover:text-sky-600 transition-all cursor-pointer"
            >
              Safety Standards
            </a>
            <a
              href="#reviews"
              onClick={(e) => handleNavClick(e, 'reviews')}
              className="px-4 py-2 rounded-full hover:bg-sky-50/80 hover:text-sky-600 transition-all cursor-pointer"
            >
              Parent Reviews
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCartClick}
              className="group relative bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-amber-200/80 hover:shadow-amber-300/90 cursor-pointer border border-amber-300/60"
            >
              <span className="text-sm">🛒</span>
              <span className="tracking-tight">Cart</span>
              <span className="bg-slate-950 text-amber-300 text-[11px] font-black min-w-[22px] h-5.5 px-1.5 rounded-full flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                {totalItems}
              </span>
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full bg-slate-100/80 hover:bg-slate-200/80 flex items-center justify-center text-slate-800 font-bold text-sm transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden mt-2 bg-white/95 backdrop-blur-2xl rounded-3xl border border-white shadow-xl p-5 flex flex-col gap-3 font-extrabold text-sm text-slate-700"
            >
              <a
                href="#products"
                onClick={(e) => handleNavClick(e, 'products')}
                className="hover:bg-sky-50 px-4 py-2.5 rounded-2xl transition-colors"
              >
                Catalog
              </a>
              <a
                href="#about"
                onClick={(e) => handleNavClick(e, 'about')}
                className="hover:bg-sky-50 px-4 py-2.5 rounded-2xl transition-colors"
              >
                Know About Us
              </a>
              <a
                href="#safety"
                onClick={(e) => handleNavClick(e, 'safety')}
                className="hover:bg-sky-50 px-4 py-2.5 rounded-2xl transition-colors"
              >
                Safety Standards
              </a>
              <a
                href="#reviews"
                onClick={(e) => handleNavClick(e, 'reviews')}
                className="hover:bg-sky-50 px-4 py-2.5 rounded-2xl transition-colors"
              >
                Parent Reviews
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}