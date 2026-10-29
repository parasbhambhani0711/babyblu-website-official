'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShopifyProduct } from '@/lib/shopify';
import { useCart } from '@/app/context/CartContext';

const CATEGORIES = [
  'All Products',
  'Teethers & Pacifiers',
  'Wipes & Essentials',
  'Oral Care',
  'Electrokidz',
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'Teethers & Pacifiers': ['teeth', 'pacifi', 'soother', 'chew', 'gum', 'toy'],
  'Wipes & Essentials': ['wipe', 'towel', 'cotton', 'essential', 'clean', 'tissue'],
  'Oral Care': ['oral', 'brush', 'toothpaste', 'dental', 'finger', 'tongue'],
  'Electrokidz': ['electro', 'electric', 'power', 'kidz', 'device', 'auto'],
};

interface ProductGridProps {
  products: ShopifyProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [wishlistedIds, setWishlistedIds] = useState<Record<string, boolean>>({});

  const handleAddToCart = (product: ShopifyProduct) => {
    addToCart(product);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 2200);
  };

  const toggleWishlist = (id: string) => {
    setWishlistedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const titleLower = p.title.toLowerCase();
      const matchesSearch = titleLower.includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;
      if (activeCategory === 'All Products') return true;

      const keywords = CATEGORY_KEYWORDS[activeCategory] || [];
      return keywords.some((kw) => titleLower.includes(kw));
    });

    if (result.length === 0 && !searchQuery && activeCategory !== 'All Products') {
      result = products;
    }

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => {
        const pA = parseFloat(a.priceRange?.minVariantPrice?.amount || '0');
        const pB = parseFloat(b.priceRange?.minVariantPrice?.amount || '0');
        return pA - pB;
      });
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => {
        const pA = parseFloat(a.priceRange?.minVariantPrice?.amount || '0');
        const pB = parseFloat(b.priceRange?.minVariantPrice?.amount || '0');
        return pB - pA;
      });
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  return (
    <section id="products" className="max-w-7xl mx-auto px-6 py-12 scroll-mt-20">
      {/* Header with Smooth Scroll Reveal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8"
      >
        <div>
          <div className="inline-flex items-center gap-2 text-sky-600 font-extrabold text-xs uppercase tracking-widest mb-2">
            <span>🌸 Pure & Safe Essentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Explore Babyblu Catalog 🍼
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-1">
            Pediatric dental-approved tools designed with soft food-grade silicone.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200/90 rounded-full pl-9 pr-8 py-2.5 text-xs font-medium focus:outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 transition-all shadow-2xs"
            />
            <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
            className="w-full sm:w-auto bg-white border border-slate-200/90 rounded-full px-4 py-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-sky-400 shadow-2xs cursor-pointer"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </motion.div>

      {/* Category Tabs Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-slate-100 mb-8"
      >
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer ${
                isActive ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-amber-400 rounded-full shadow-md"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200"
        >
          <span className="text-4xl block mb-3">🔍</span>
          <h3 className="text-base font-extrabold text-slate-800">No matching products found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Try adjusting your search keyword or switching category tabs.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All Products');
            }}
            className="mt-4 bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-5 py-2 rounded-full transition-all cursor-pointer shadow-2xs"
          >
            Reset Filters
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => {
              const price = parseFloat(
                product.priceRange?.minVariantPrice?.amount || '0'
              ).toFixed(0);
              const imageUrl = product.images?.edges[0]?.node?.url;
              const isAdded = addedIds[product.id];
              const isWishlisted = wishlistedIds[product.id];

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    duration: 0.55,
                    delay: (idx % 4) * 0.08,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  whileHover={{ y: -6 }}
                  key={product.id}
                  className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="w-full h-52 bg-gradient-to-b from-sky-50/50 via-pink-50/20 to-slate-50/80 rounded-2xl overflow-hidden relative mb-4 flex items-center justify-center p-4">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-300"
                        />
                      ) : (
                        <div className="text-center space-y-1">
                          <span className="text-4xl block">👶</span>
                          <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                            Babyblu
                          </span>
                        </div>
                      )}

                      <span className="absolute top-3 left-3 bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-full shadow-2xs">
                        BPA FREE
                      </span>

                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-xs shadow-2xs hover:scale-110 active:scale-90 transition-transform cursor-pointer"
                        aria-label="Wishlist"
                      >
                        {isWishlisted ? '❤️' : '🤍'}
                      </button>

                      <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-black px-2 py-0.5 rounded-full shadow-2xs flex items-center gap-1">
                        <span className="text-amber-400">★</span> 4.9
                      </div>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-medium mt-1">
                      100% Food-Grade • Pediatric Approved
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between pt-3 border-t border-slate-50">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase tracking-wider">
                        Price
                      </span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg sm:text-xl font-black text-slate-950">
                          ₹{price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className={`font-black px-4 py-2.5 rounded-full text-xs transition-all cursor-pointer shadow-2xs active:scale-95 flex items-center gap-1.5 ${
                        isAdded
                          ? 'bg-emerald-500 text-white scale-105'
                          : 'bg-amber-400 hover:bg-amber-400/90 text-slate-950 hover:shadow-md'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <span>Added!</span>
                          <span>✓</span>
                        </>
                      ) : (
                        <>
                          <span>+ Add</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}