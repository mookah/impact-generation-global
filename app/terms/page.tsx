import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for the Impact Generation Global website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-12 md:py-16">
          <h1 className="display text-3xl sm:text-4xl md:text-5xl">
            Terms of Use
          </h1>
          <p className="mt-3 text-sm font-semibold text-gold-300">
            Last updated: 1 January 2026
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell max-w-3xl space-y-8">
          <div>
            <h2 className="text-lg font-bold text-brand-950">
              About this website
            </h2>
            <p className="prose-body mt-2">
              This website is operated by {site.name}. By using it you agree to
              these terms. If you do not agree, please do not use the site.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">Content</h2>
            <p className="prose-body mt-2">
              All text, photographs and materials on this site belong to{" "}
              {site.name} or are used with permission. Please contact us before
              reproducing anything for public use.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">Donations</h2>
            <p className="prose-body mt-2">
              Donations are processed by third-party providers such as PayPal and
              GoFundMe. Their terms and refund policies apply to those
              transactions. Donations are used for the charitable programs
              described on this website.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">
              Calendar and event information
            </h2>
            <p className="prose-body mt-2">
              Event dates are provided in good faith and may change. Please
              confirm with our team before travelling to an event.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">Contact</h2>
            <p className="prose-body mt-2">
              Questions about these terms?{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-800 hover:underline"
              >
                Get in touch
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
