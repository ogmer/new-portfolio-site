import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import SakuraAnimation from "@/components/SakuraAnimation";
import JsonLd from "@/components/JsonLd";
import React, { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "ogmer",
  description:
    "バックエンド開発を本業とし、フロントエンド開発を趣味とするエンジニアのポートフォリオサイトです。",
  metadataBase: new URL("https://ogmer.netlify.app"),
  openGraph: {
    title: "ogmer portfolio site",
    description:
      "バックエンド開発を本業とし、フロントエンド開発を趣味とするエンジニアのポートフォリオサイトです。",
    url: "https://ogmer.netlify.app",
    siteName: "ogmer portfolio site",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ogmer portfolio site",
    description:
      "バックエンド開発を本業とし、フロントエンド開発を趣味とするエンジニアのポートフォリオサイトです。",
  },
  icons: {
    icon: "/sakura.webp",
    apple: "/sakura.webp",
  },
};

// Props型を明示
interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="ja">
      <head>
        <JsonLd />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <SakuraAnimation />
          <main className="min-h-screen">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
