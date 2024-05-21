import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeonPS - Portfolio",
  description: "",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers>
          {children}
          <Navbar />
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
