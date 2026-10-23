import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Youth Empowerment in Zambia`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Impact Generation Global",
    "youth empowerment Zambia",
    "Christian youth ministry Zambia",
    "discipleship",
    "mentorship",
    "Pad A Girl",
    "Boys To Men",
    "Cycle For Change",
    "school ministry",
    "youth camps",
    "nonprofit Zambia",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_ZM",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Empowering a generation`,
    description: site.description,
    images: [
      {
        url: "/images/hero.webp",
        width: 1200,
        height: 630,
        alt: `${site.name} — young people in Zambia`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Empowering a generation`,
    description: site.description,
    images: ["/images/hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "nonprofit",
};

export const viewport: Viewport = {
  themeColor: "#123f78",
  width: "device-width",
  initialScale: 1,
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: site.name,
  alternateName: site.shortName,
  url: site.url,
  logo: `${site.url}/logo-new.png`,
  description: site.description,
  email: site.email,
  sameAs: [site.facebook, site.youtube],
  areaServed: ["Zambia", "United States"],
  address: {
    "@type": "PostalAddress",
    addressCountry: "ZM",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${display.variable}`}
      data-scroll-behavior="smooth"
    >
      <body className="bg-white text-slate-900 antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <Navbar />

        <main id="main">{children}</main>

        <Footer />
      </body>
    </html>
  );
}