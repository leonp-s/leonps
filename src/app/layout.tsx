import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/app/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ReactNode } from "react";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Page from "@/components/bloks/page";
import Hero from "@/components/bloks/hero";
import StoryblokProvider from "@/components/StoryblokProvider";

storyblokInit({
  accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
  },
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LeonPS - Portfolio",
  description: "",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <StoryblokProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} h-full`}>
          <Providers>
            {children}
            <Navbar />
            <Footer />
          </Providers>
        </body>
      </html>
    </StoryblokProvider>
  );
};

export default RootLayout;
