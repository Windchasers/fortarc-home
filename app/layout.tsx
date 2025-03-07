import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from './components/providers/ClientProvider';
import { Toaster } from 'react-hot-toast';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FORTARC - 优雅生活美学",
  description: "FORTARC致力于打造高品质服饰，传递优雅生活美学，将现代设计与传统工艺完美融合。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <ClientProvider>
          <Toaster position="top-center" />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
