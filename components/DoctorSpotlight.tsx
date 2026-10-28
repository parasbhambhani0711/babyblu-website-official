export default function DoctorSpotlight() {
  return (
    <section id="safety" className="max-w-7xl mx-auto px-6 py-12">
      <div className="bg-gradient-to-r from-sky-500 via-indigo-500 to-sky-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl z-10">
          <span className="bg-white/20 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full backdrop-blur-md">
            Doctor Preferred
          </span>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">
            Crafted with zero compromises on newborn safety.
          </h2>
          <p className="text-sky-100 text-sm sm:text-base leading-relaxed">
            Every Babyblu product undergoes rigorous clinical evaluations to ensure smooth edges, non-toxic materials, and optimal ergonomics for tiny hands.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center max-w-xs w-full z-10">
          <div className="text-4xl mb-2">⭐⭐⭐⭐⭐</div>
          <p className="text-xs font-medium text-white italic">
            &quot;Babyblu oral teethers offer ideal texture contrast for soothing teething irritation without risking gag reflexes.&quot;
          </p>
          <span className="block text-xs font-bold mt-3 text-amber-300">
            — Pediatric Dental Advisory Board
          </span>
        </div>
      </div>
    </section>
  );
}