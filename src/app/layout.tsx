import type { Metadata, Viewport } from "next";
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
  metadataBase: new URL("https://aether-market.vercel.app"),
  title: "Aether Market | Cinematic E-Commerce",
  description: "A premium all-category marketplace featuring high-fidelity animations and desaturated modern design.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/favicon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Aether Market | Cinematic E-Commerce",
    description: "A premium all-category marketplace featuring high-fidelity animations and desaturated modern design.",
    type: "website",
    images: [{ url: "/favicon.png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#14140F",
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
