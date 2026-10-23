import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Impact Generation Global collects, uses and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="bg-brand-950 text-white">
        <div className="shell py-12 md:py-16">
          <h1 className="display text-3xl sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm font-semibold text-gold-300">
            Last updated: 23 October 2026
          </p>
        </div>
      </section>

      <section className="section">
        <div className="shell max-w-3xl space-y-8">
          <div>
            <h2 className="text-lg font-bold text-brand-950">
              Information we collect
            </h2>
            <p className="prose-body mt-2">
              When you contact us by email or phone, we receive the details you
              choose to share. If you donate through PayPal or GoFundMe, those
              services process your payment and handle your payment details
              directly — we never receive or store card numbers.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">
              How we use information
            </h2>
            <p className="prose-body mt-2">
              We use your information only to respond to your enquiry,
              coordinate programs and volunteers, send our newsletter if you ask
              for it, and keep accurate records of donations.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">
              Email subscriptions and AI assistance
            </h2>
            <p className="prose-body mt-2">
              We store your email, selected frequency, consent and confirmation
              dates in secure server-side storage. Emails are sent only after
              confirmation. Each email includes preferences and unsubscribe links.
              Supabase provides storage and authentication; Resend delivers email.
              Contact us to request deletion. We retain preferences while needed
              to manage subscriptions and prevent unwanted email.
            </p>
            <p className="prose-body mt-2">IMPACT AI sends your conversation and public website information to our AI provider. Subscriber and donor records are excluded. Please keep sensitive personal details and identifying information about children out of chat. Verify AI answers against linked sources. Abuse controls use hashed network identifiers and short-lived request counts.</p>
            <p className="prose-body mt-2">Facebook embeds may set cookies under Facebook&apos;s privacy policy. PayPal and GoFundMe process donations under their own terms.</p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">Your choices</h2>
            <p className="prose-body mt-2">
              You can ask us at any time to update or delete the information we
              hold about you, or to stop sending you newsletter updates.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold text-brand-950">Contact</h2>
            <p className="prose-body mt-2">
              Questions about this policy can be sent to{" "}
              <a
                href="mailto:dluby60@gmail.com"
                className="font-semibold text-brand-800 hover:underline"
              >
                dluby60@gmail.com
              </a>
              . You can also reach us through our{" "}
              <Link
                href="/contact"
                className="font-semibold text-brand-800 hover:underline"
              >
                contact page
              </Link>
              .
            </p>
          </div>

          <p className="text-xs text-slate-400">{site.name}</p>
        </div>
      </section>
    </main>
  );
}
