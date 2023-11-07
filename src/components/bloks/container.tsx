import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import type { ContainerStoryblok } from "@/component-types-sb";
import { FC } from "react";

const Container: FC<{ blok: ContainerStoryblok }> = ({ blok }) => (
  <div
    className="flex container justify-center my-24"
    {...storyblokEditable(blok)}
  >
    <div className={`${blok.max_width} space-y-5 md:space-y-8`}>
      {blok.body &&
        blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  </div>
);

export default Container;
