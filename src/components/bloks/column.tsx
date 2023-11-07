import { storyblokEditable, StoryblokComponent } from "@storyblok/react/rsc";
import { FC } from "react";
import { ColumnStoryblok } from "@/component-types-sb";

const Column: FC<{ blok: ColumnStoryblok }> = ({ blok }) => {
  const numBloks = blok.body ? blok.body.length : "none";

  return (
    <div
      className={`grid grid-cols-1 mx-auto lg:grid-cols-${numBloks} gap-6 items-center w-full`}
      {...storyblokEditable(blok)}
    >
      {blok.body &&
        blok.body.map((nestedBlok) => (
          <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
    </div>
  );
};

export default Column;
