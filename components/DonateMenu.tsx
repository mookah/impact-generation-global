import Link from "next/link";

export default function DonateMenu() {
  return (
    <div className="relative group">
      <button className="rounded-full bg-red-600 px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-red-700">
        Donate ▾
      </button>

      <div className="absolute right-0 z-50 mt-3 hidden w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl group-hover:block">
        <a
          href="https://www.paypal.com/donate/?hosted_button_id=34HPDHC4M7YZA"
          target="_blank"
          rel="noopener noreferrer"
          className="block px-6 py-4 font-semibold text-slate-800 transition hover:bg-emerald-50"
        >
          ❤️ Donate with PayPal
          <p className="mt-1 text-sm font-normal text-slate-500">
            Make a secure online donation.
          </p>
        </a>

        <a
          href="https://gofund.me/7f8b19b5e"
          target="_blank"
          rel="noopener noreferrer"
          className="block border-t border-slate-100 px-6 py-4 font-semibold text-slate-800 transition hover:bg-emerald-50"
        >
          🌍 Donate with GoFundMe
          <p className="mt-1 text-sm font-normal text-slate-500">
            Support the Zambia Leadership Mission.
          </p>
        </a>

        <Link
          href="/donate"
          className="block border-t border-slate-100 px-6 py-4 font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          📖 Learn About the Mission →
          <p className="mt-1 text-sm font-normal text-slate-500">
            See the campaign, impact, and ministry vision.
          </p>
        </Link>
      </div>
    </div>
  );
}
