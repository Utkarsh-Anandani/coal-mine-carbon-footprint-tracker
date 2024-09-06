import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/SessionProvider";

const noto_sans = Noto_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coal mine carbon footprint tracker",
  description:
    "A web application to track the carbon footprint of coal mines and improve their sustainability.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <SessionProvider session={session}>
      <html lang="en" className="dark">
        <body className={noto_sans.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
