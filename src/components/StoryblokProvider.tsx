"use client";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import { ReactElement } from "react";

import Hero from "@/components/bloks/hero";
import Page from "@/components/bloks/page";
import Grid from "@/components/bloks/grid";
import Text from "@/components/bloks/text";
import Container from "@/components/bloks/container";
import Column from "@/components/bloks/column";
import Figure from "@/components/bloks/figure";

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components: {
    page: Page,
    hero: Hero,
    grid: Grid,
    text: Text,
    container: Container,
    column: Column,
    figure: Figure,
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
