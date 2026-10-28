import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100 mt-16 py-12 px-6 sm:px-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <Image
            src="/logo.png"
            alt="Babyblu Logo"
            width={120}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <p className="text-slate-500 leading-relaxed">
            Premium oral care & gentle baby essentials designed to give little ones the healthiest start.
          </p>
        </div>
        <div>
          <h5 className="font-extrabold text-slate-900 mb-3 text-sm">Products</h5>
          <ul className="space-y-2">
            <li><a href="#products" className="hover:text-sky-600">Teethers & Pacifiers</a></li>
            <li><a href="#products" className="hover:text-sky-600">Oral Care & Toothbrushes</a></li>
            <li><a href="#products" className="hover:text-sky-600">Pure Water Wipes</a></li>
            <li><a href="#products" className="hover:text-sky-600">Electrokidz Line</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-extrabold text-slate-900 mb-3 text-sm">Help & Care</h5>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-sky-600">Shipping & Delivery</a></li>
            <li><a href="#" className="hover:text-sky-600">Safety Certifications</a></li>
            <li><a href="#" className="hover:text-sky-600">Returns & Exchanges</a></li>
            <li><a href="#" className="hover:text-sky-600">Contact Concierge</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-extrabold text-slate-900 mb-3 text-sm">Stay Updated</h5>
          <p className="text-slate-500 mb-3">Join the Babyblu club for parenting tips & exclusive drops.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter email"
              className="bg-slate-50 border border-slate-200 rounded-full px-3 py-2 text-xs flex-1 focus:outline-sky-400"
            />
            <button className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-full cursor-pointer">
              Join
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto border-t border-slate-100 mt-10 pt-6 text-center text-slate-400">
        © {new Date().getFullYear()} Babyblu Inc. All rights reserved. Made with ❤️ for happy babies.
      </div>
    </footer>
  );
}