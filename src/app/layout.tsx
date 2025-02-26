import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/loading-screen/loading-screen";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DP Backgrounds",
  description:
    "Free Background Remover & Photo Editor. Instantly remove image backgrounds and set custom backdrops. Perfect for social media, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolageGrotesque.variable} ${inter.variable} ${inter.className} bg-app-white antialiased`}
      >
        {children}
        <LoadingScreen />
      </body>
    </html>
  );
}
