// @ts-nocheck

import type { Metadata } from "next";
import { Sora } from "next/font/google";
import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";
import Header from "@/components/common/layout/header";
import Footer from "@/components/common/layout/footer";
import "./globals.css";

const sora = Sora({
  subsets: ['latin'],
  display: "swap",
  preload: true,
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://www.example.com"),
  title: {
    template: "%s | [PRODUCT]",
    default: "[PRODUCT]",
  },
  description: "Empower your business with [PRODUCT]! Experience innovative CPaaS & omnichannel business solutions. Bridge communication gaps between businesses & Customers.",
  openGraph: {
    title: {
      template: "%s | [PRODUCT]",
      default: "[PRODUCT]",
    },
    description: "Empower your business with [PRODUCT]! Experience innovative CPaaS & omnichannel business solutions. Bridge communication gaps between businesses & Customers.",
  },
  twitter: {
    title: {
      template: "%s | [PRODUCT]",
      default: "[PRODUCT]",
    },
    description: "Empower your business with [PRODUCT]! Experience innovative CPaaS & omnichannel business solutions. Bridge communication gaps between businesses & Customers.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html lang="en">
      <body className={`${sora.variable} font-sans antialiased w-full overflow-x-hidden`}>
        <Header />
        {children}
        {isDraftMode && <VisualEditing />}
        <Footer />
      </body>
    </html>
  );
}
