import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { FC } from "react";
import { GridStoryblok } from "@/component-types-sb";

const Grid: FC<{ blok: GridStoryblok }> = ({ blok }) => {
  return (
    <div
      className="grid w-full gap-6 mx-auto items-center"
      {...storyblokEditable(blok)}
    >
      {blok.columns &&
        blok.columns.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  );
};

export default Grid;
