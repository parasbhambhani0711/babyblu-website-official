export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-pink-50/40 to-[#FAF9F5] pt-14 pb-16 px-6 sm:px-12 text-center">
      {/* Background Soft Glows */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-sky-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute bottom-5 right-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-white/90 text-sky-700 text-xs font-black uppercase tracking-wider px-4 py-2 rounded-full border border-sky-200/80 shadow-xs">
          <span>👶 Designed for Growing Smiles</span>
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-tight tracking-tight">
          Gentle Essentials for Every Small Step <span className="inline-block animate-bounce">🍼</span>
        </h1>
        
        <p className="text-slate-600 font-medium text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
          Ultra-soft teethers, pediatric oral care, water-pure wipes, and safe hydration tools formulated with safety first.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <a
            href="#products"
            className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-black px-7 py-3.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            Shop Best Sellers
          </a>
          <a
            href="#safety"
            className="bg-white hover:bg-slate-50 text-slate-700 font-bold px-6 py-3.5 rounded-full text-sm border border-slate-200 shadow-xs transition-all"
          >
            Explore Safety Standards →
          </a>
        </div>
      </div>
    </section>
  );
}