import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-white text-slate-900">
      <section className="shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
          404
        </p>

        <h1 className="display mt-3 text-3xl text-brand-950 sm:text-4xl">
          We couldn&apos;t find that page
        </h1>

        <p className="prose-body mt-4 max-w-md">
          The link may be old or mistyped. Here are some places to pick up from.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Back home
          </Link>
          <Link href="/programs" className="btn btn-outline">
            Our programs
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact us
          </Link>
        </div>
      </section>
    </main>
  );
}
