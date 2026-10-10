import type { Metadata } from "next";
import { Suspense } from "react";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navber from "@/components/Navber";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "আজকের বাজারের দাম এক নজরে",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" data-theme="light" suppressHydrationWarning>
      <body
        className={`${hindSiliguri.variable} font-sans flex min-h-screen flex-col bg-[#F0F5F0] antialiased`}
        suppressHydrationWarning
      >
        <Suspense
          fallback={
            <div className="sticky top-0 z-50">
              <header className="border-b border-gray-200 bg-[#FAFCFA]">
                <div className="container mx-auto px-4 py-2.5 sm:py-3">
                  <div className="skeleton h-10 w-40"></div>
                </div>
              </header>
            </div>
          }
        >
          <Navber>
            <Marquee />
          </Navber>
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
