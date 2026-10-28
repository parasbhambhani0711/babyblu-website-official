const TRUST_ITEMS = [
  { title: '100% Food-Grade', desc: 'BPA & Phthalate Free', icon: '🌿' },
  { title: 'Pediatric Approved', desc: 'Designed with Dentists', icon: '🩺' },
  { title: 'Ultra-Gentle', desc: 'Safe for Sensitive Gums', icon: '✨' },
  { title: 'Fast Delivery', desc: 'Dispatched in 24 hrs', icon: '🚚' },
];

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      {TRUST_ITEMS.map((item, idx) => (
        <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-2xs flex items-center gap-3">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
            <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
          </div>
        </div>
      ))}
    </section>
  );
}