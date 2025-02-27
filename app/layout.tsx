import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/molecules/Header";

import { AuthProvider } from "@/utils/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  font-sans h-full bg-slate-100 `}
      >
        <AuthProvider>
          <header className="h-[12vh]">
            <Header />
          </header>
          <main className="h-[88vh]">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
