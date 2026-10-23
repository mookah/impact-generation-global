import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Mission",
  description: "Learn how Impact Generation Global empowers young people through faith, discipleship, leadership, mentorship and community outreach in Zambia.",
  alternates: { canonical: "/about" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
