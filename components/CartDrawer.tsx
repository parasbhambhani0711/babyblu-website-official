'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/app/context/CartContext';

const FREE_SHIPPING_THRESHOLD = 499;

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, subtotal, totalItems } =
    useCart();

  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const amountLeftForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 cursor-pointer"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛒</span>
                <h3 className="font-black text-slate-900 text-lg">Your Cart</h3>
                <span className="bg-sky-100 text-sky-700 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-black text-sm flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="bg-sky-50/80 p-3.5 border-b border-sky-100 text-center">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <p className="text-xs font-black text-emerald-700 flex items-center justify-center gap-1">
                  🎉 You unlocked FREE Express Shipping!
                </p>
              ) : (
                <p className="text-xs font-bold text-slate-700">
                  Add <span className="text-sky-600 font-black">₹{amountLeftForFreeShipping}</span> more for <span className="text-sky-600 uppercase font-black">Free Shipping</span>
                </p>
              )}
              <div className="w-full bg-sky-200/60 h-2 rounded-full mt-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${freeShippingProgress}%` }}
                  transition={{ duration: 0.5 }}
                  className="bg-sky-500 h-full rounded-full"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
                  <span className="text-5xl block animate-bounce">🍼</span>
                  <h4 className="font-extrabold text-slate-800 text-base">Your cart is empty</h4>
                  <p className="text-xs text-slate-400 max-w-xs">
                    Looks like you haven&apos;t added any safe oral care tools or teethers yet.
                  </p>
                  <button
                    onClick={closeCart}
                    className="mt-2 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs px-6 py-3 rounded-full shadow-2xs transition-all cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      key={item.id}
                      className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 flex gap-3.5 items-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-white border border-slate-100 flex items-center justify-center p-1 shrink-0 overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <span className="text-2xl">👶</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-xs text-slate-900 truncate">
                          {item.title}
                        </h4>
                        <span className="text-xs font-black text-slate-700 block mt-0.5">
                          ₹{item.price}
                        </span>

                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex items-center bg-white border border-slate-200 rounded-full px-2 py-0.5 shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-slate-600 hover:text-sky-600 font-bold text-xs px-1.5 cursor-pointer"
                            >
                              -
                            </button>
                            <span className="text-xs font-black px-2 text-slate-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-slate-600 hover:text-sky-600 font-bold text-xs px-1.5 cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-400 hover:text-rose-500 text-xs p-1 transition-colors cursor-pointer ml-auto"
                            title="Remove item"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-white space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between font-medium">
                    <span>Subtotal</span>
                    <span className="font-bold text-slate-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Shipping</span>
                    <span className="font-bold text-slate-900">
                      {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                        <span className="text-emerald-600">FREE</span>
                      ) : (
                        '₹49'
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-100">
                    <span>Total</span>
                    <span className="text-lg font-black text-sky-600">
                      ₹{subtotal >= FREE_SHIPPING_THRESHOLD ? subtotal : subtotal + 49}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => alert('Proceeding to Checkout!')}
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black py-3.5 rounded-full text-sm shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <span>→</span>
                </button>
                <p className="text-[10px] text-center text-slate-400 font-medium">
                  🔒 Encrypted & Safe Express Checkout
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}