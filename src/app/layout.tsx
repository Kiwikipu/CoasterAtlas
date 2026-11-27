import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import { AtlasProvider } from "@/lib/store";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const viewport = { themeColor: "#fff9f2" };

export const metadata: Metadata = {
  title: "CoasterAtlas — Explore. Ride. Collect. Remember.",
  description:
    "Le compagnon de voyage des passionnés de parcs d'attractions. Chaque visite est une histoire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${poppins.variable} ${nunito.variable} antialiased`}>
        <AtlasProvider>{children}</AtlasProvider>
      </body>
    </html>
  );
}
