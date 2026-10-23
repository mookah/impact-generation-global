import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Impact Generation Global",
  description: "Reach Impact Generation Global to learn more about its Zambia youth empowerment programs, volunteer opportunities and partnerships.",
  alternates: { canonical: "/contact" },
};

export default function SectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
