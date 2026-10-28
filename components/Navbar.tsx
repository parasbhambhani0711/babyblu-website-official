import Image from 'next/image';

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  return (
    <>
      {/* Top Notice Bar */}
      <div className="bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-400 text-white text-xs font-bold py-2 text-center tracking-wide px-4">
        ✨ FREE Express Shipping on orders over ₹499 | 100% Non-Toxic & Pediatrician Approved
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100 px-6 sm:px-10 py-3.5 flex items-center justify-between transition-all">
        <div className="flex items-center gap-4">
          <a href="#" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Babyblu Logo"
              width={150}
              height={42}
              className="h-9 w-auto object-contain hover:opacity-95 transition-opacity"
              priority
            />
          </a>
          <span className="hidden md:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Pediatrician Tested
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-semibold text-sm text-slate-600">
          <a href="#products" className="hover:text-sky-600 transition-colors">Catalog</a>
          <a href="#safety" className="hover:text-sky-600 transition-colors">Safety Standards</a>
          <a href="#reviews" className="hover:text-sky-600 transition-colors">Parent Reviews</a>
        </nav>

        {/* Cart Action */}
        <div className="flex items-center gap-3">
          <button className="relative bg-sky-500 hover:bg-sky-600 text-white font-extrabold px-5 py-2.5 rounded-full text-xs sm:text-sm shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-95 flex items-center gap-2">
            <span>🛒 Cart</span>
            <span className="bg-white text-sky-600 text-[11px] font-black rounded-full h-5 w-5 flex items-center justify-center">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    </>
  );
}