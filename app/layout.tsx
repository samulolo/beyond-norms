import type { Metadata } from "next";
import { Playfair_Display, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const playfairDisplay = Playfair_Display({
  variable: "--font-headline",
  subsets: ["latin"],
});

const hankenGrotesk = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "BeyondNorms — Soul Speed Dating & Dinner Show in Lisbon";
const description =
  "An evening of real connection in Lisbon: Soul Speed Dating followed by an exclusive Dinner Show with surprise live performances. Spots are strictly limited.";
const ogImage = {
  url: "/images/product-image.jpeg",
  width: 1600,
  height: 800,
  alt: "BeyondNorms — Soul Speed Dating & Dinner Show",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | BeyondNorms",
  },
  description,
  keywords: [
    "speed dating Lisbon",
    "dinner show Lisbon",
    "singles experience Lisbon",
    "BeyondNorms",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "BeyondNorms",
    images: [ogImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfairDisplay.variable} ${hankenGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
         <Analytics />
      </body>
    </html>
  );
}
