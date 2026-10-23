import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pastors Kids Program",
  description: "Explore encouragement, belonging, mentorship and spiritual support for pastors' children through Impact Generation Global.",
  alternates: { canonical: "/pastors-kids" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
