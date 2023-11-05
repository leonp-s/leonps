import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import type { PageStoryblok } from "@/component-types-sb";
import { FC } from "react";

const Page: FC<{ blok: PageStoryblok }> = ({ blok }) => (
  <main className="w-full h-full" {...storyblokEditable(blok)}>
    {blok.body &&
      blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </main>
);

export default Page;
