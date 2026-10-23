import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ImpactAssistant from "@/components/ImpactAssistant";
import { FACEBOOK_PAGE_URL, SITE_URL } from "@/lib/site";

const description =
  "Impact Generation Global is a Christ-centered nonprofit helping young people in Zambia through discipleship, mentorship, education, youth camps, healthy living, and community outreach.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Impact Generation Global | Empowering a Generation", template: "%s | Impact Generation Global" },
  description,
  applicationName: "Impact Generation Global",
  keywords: [
    "Impact Generation Global", "Zambia youth empowerment", "Zambia nonprofit",
    "youth mentorship Zambia", "Pad a Girl", "Boys to Men",
    "Cycle for Change", "Christian youth ministry", "community outreach Zambia",
  ],
  openGraph: {
    type: "website",
    siteName: "Impact Generation Global",
    url: SITE_URL,
    title: "Impact Generation Global | Empowering a Generation",
    description,
    locale: "en_ZM",
    images: [{ url: "/images/hero.jpg", alt: "Impact Generation Global youth ministry and community transformation" }],
  },
  twitter: { card: "summary_large_image", title: "Impact Generation Global", description, images: ["/images/hero.jpg"] },
  robots: { index: true, follow: true },
};

const organizationData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Impact Generation Global",
  url: SITE_URL,
  logo: SITE_URL + "/logo-new.png",
  description,
  sameAs: [FACEBOOK_PAGE_URL],
  areaServed: { "@type": "Country", name: "Zambia" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="bg-white text-slate-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData).replace(/</g, "\\u003c") }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ImpactAssistant />
      </body>
    </html>
  );
}
