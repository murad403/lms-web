import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxWrapper from "@/components/wrapper/ReduxWrapper";
import { Toaster } from "sonner";
import AffiliateTracker from "@/utils/AffiliateTracker";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Forma-Cert",
  description: "Forma-Cert – Professional Training & Certification Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <ReduxWrapper>
          <AffiliateTracker />
          {children}
          <Toaster position="top-right" richColors />
        </ReduxWrapper>
      </body>
    </html>
  );
}
