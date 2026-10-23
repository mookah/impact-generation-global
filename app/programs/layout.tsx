import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Youth Empowerment Programs",
  description: "Explore Impact Generation Global programs including Boys to Men, Pad a Girl, School Ministry, Youth Camps, Pastors Kids and Cycle for Change.",
  alternates: { canonical: "/programs" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
