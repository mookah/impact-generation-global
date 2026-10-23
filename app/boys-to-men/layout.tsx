import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Boys to Men Mentorship",
  description: "Discover our Boys to Men program promoting character, faith, responsibility and leadership for young men in Zambia.",
  alternates: { canonical: "/boys-to-men" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
