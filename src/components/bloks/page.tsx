import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import type { PageStoryblok } from "@/component-types-sb";
import { FC, Fragment } from "react";

const Page: FC<{ blok: PageStoryblok }> = ({ blok }) => (
  <Fragment>
    {blok.body &&
      blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
  </Fragment>
);

export default Page;
