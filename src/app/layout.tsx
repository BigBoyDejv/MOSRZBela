import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Rybky Spišská Belá | Rybolov v srdci Tatier",
  description:
    "Portál pre rybárov v Spišskej Belej. Aktuálne oznamy, povolenia na rybolov a informácie o revíroch pod Belianskymi Tatrami.",
  keywords: "rybolov, Spišská Belá, povolenky, rybársky spolok, Tatry, kapor, pstruh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk">
      <body>
        <Navbar />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
