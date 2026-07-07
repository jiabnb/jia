import type { Metadata, Viewport } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Jia — Curated Real Estate Pools on BNB Chain",
    template: "%s · Jia",
  },
  description:
    "Jia is a compliance-first real-estate RWA platform on BNB Chain. Explore tokenized property pools with document transparency, KYC-gated participation, risk disclosures, and on-chain records.",
  keywords: [
    "RWA",
    "BNB Chain",
    "real estate tokenization",
    "property pools",
    "compliance",
    "KYC",
  ],
  openGraph: {
    title: "Jia — Curated Real Estate Pools on BNB Chain",
    description:
      "A compliance-first real-estate RWA platform on BNB Chain with document transparency and KYC-gated participation. Solana and Base support coming soon.",
    type: "website",
  },
  icons: {
    icon: "/jia-logo.jpg",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body className="font-sans">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
