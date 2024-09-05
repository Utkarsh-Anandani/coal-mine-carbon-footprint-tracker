import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coal mine carbon footprint tracker",
  description:
    "A web application to track the carbon footprint of coal mines and improve their sustainability.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={noto_sans.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
