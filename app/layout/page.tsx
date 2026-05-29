import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Impact Generation Global",
  description:
    "Raising a generation transformed by faith, purpose, and practical support.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900 antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}