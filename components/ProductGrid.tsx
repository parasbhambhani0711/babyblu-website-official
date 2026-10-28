'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShopifyProduct } from '@/lib/shopify';

const CATEGORIES = [
  'All Products',
  'Teethers & Pacifiers',
  'Wipes & Essentials',
  'Oral Care',
  'Electrokidz',
];

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [activeCategory, setActiveCategory] = useState('All Products');

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Slurrp Farm-Style Pastel Category Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-300 ${
              activeCategory === cat
                ? 'bg-amber-400 text-slate-900 shadow-md scale-105'
                : 'bg-pink-50 text-pink-700 hover:bg-pink-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16 bg-pink-50/50 rounded-3xl mt-6 border border-dashed border-pink-200">
          <p className="text-slate-500 font-medium">No active products found in Shopify catalog.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {products.map((product) => {
            const price = parseFloat(
              product.priceRange?.minVariantPrice?.amount || '0'
            ).toFixed(0);
            const imageUrl = product.images?.edges[0]?.node?.url;

            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-48 bg-sky-50/50 rounded-2xl overflow-hidden relative mb-4 flex items-center justify-center">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.title}
                        className="w-full h-full object-contain p-3"
                      />
                    ) : (
                      <span className="text-xs text-slate-400 font-semibold">Babyblu Product</span>
                    )}
                    <span className="absolute top-2 left-2 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full">
                      BPA FREE
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-base leading-snug">
                    {product.title}
                  </h3>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-black text-slate-900">₹{price}</span>
                  <button
                    onClick={() => alert(`Added ${product.title} to cart!`)}
                    className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-extrabold px-4 py-2 rounded-full text-xs shadow-xs transition-colors"
                  >
                    + Add to Cart
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}