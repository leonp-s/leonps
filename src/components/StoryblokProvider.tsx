"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactElement } from "react";

import Hero from "@/components/bloks/hero";
import Page from "@/components/bloks/page";

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
  },
});

type StoryblokProviderProps = {
  children: ReactElement;
};

export default function StoryblokProvider({
  children,
}: StoryblokProviderProps) {
  return children;
}
