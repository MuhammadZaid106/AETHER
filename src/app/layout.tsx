import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/Providers";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aether Market | Cinematic E-Commerce",
  description: "A premium all-category marketplace featuring high-fidelity animations and desaturated modern design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="antialiased text-inter bg-[var(--bg-canvas)] text-[var(--ink-900)]" suppressHydrationWarning>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
