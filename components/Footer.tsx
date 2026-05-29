import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white px-6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Impact Generation Global
          </h2>

          <p className="text-slate-300 leading-relaxed max-w-xl mb-8">
            A Christ-centered nonprofit devoted to discipleship, youth
            empowerment, education, counseling, and community transformation.
          </p>

          <Link
            href="/donate"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full transition"
          >
            Support The Mission
          </Link>
        </div>

        <div>
          <h3 className="text-amber-400 uppercase tracking-[0.25em] text-sm font-bold mb-6">
            Quick Links
          </h3>

          <div className="space-y-4 text-slate-300">
            <Link href="/" className="block hover:text-amber-400">Home</Link>
            <Link href="/about" className="block hover:text-amber-400">About</Link>
            <Link href="/gallery" className="block hover:text-amber-400">Gallery</Link>
            <Link href="/newsletter" className="block hover:text-amber-400">Newsletter</Link>
            <Link href="/contact" className="block hover:text-amber-400">Contact</Link>
          </div>
        </div>

        <div>
          <h3 className="text-amber-400 uppercase tracking-[0.25em] text-sm font-bold mb-6">
            Programs
          </h3>

          <div className="space-y-4 text-slate-300">
            <Link href="/boys-to-men" className="block hover:text-amber-400">
              Boys To Men
            </Link>
            <Link href="/pastors-kids" className="block hover:text-amber-400">
              Pastors Kids
            </Link>
            <Link href="/cycle-for-change" className="block hover:text-amber-400">
              Cycle For Change
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 mt-16 pt-8">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h3 className="text-amber-400 uppercase tracking-[0.25em] text-sm font-bold mb-4">
              Contact
            </h3>

            <p className="text-slate-300">info@impactgenerationglobal.org</p>
            <p className="text-slate-300">Livingstone, Zambia</p>
          </div>

          <div className="flex md:justify-end gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition">
              f
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition">
              ig
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500 transition">
              yt
            </a>
          </div>
        </div>

        <p className="text-slate-500 text-sm mt-10">
          © 2026 Impact Generation Global. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}