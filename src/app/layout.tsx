import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { BackgroundEffects } from "@/components/animations/BackgroundEffects";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biplab | Developer Portfolio",
  description: "Modern, high-performance developer portfolio built with Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased dark`}
    >
      <body className={`${outfit.className} min-h-full flex flex-col bg-[#FEF3C7] text-[#1C1917] selection:bg-amber-400/40`}>
        <BackgroundEffects />
        {children}
      </body>
    </html>
  );
}
