import { storyblokEditable } from "@storyblok/react/rsc";
import { FC } from "react";
import { FigureStoryblok } from "@/component-types-sb";
import Image from "next/image";

const Figure: FC<{ blok: FigureStoryblok }> = ({ blok }) => {
  return (
    <figure {...storyblokEditable(blok)}>
      <Image
        src={blok.image.filename}
        alt={blok.image.alt ?? blok.image.name}
        width={800}
        height={800}
        className="w-full object-cover rounded-xl"
      />
      {blok.image.title && (
        <figcaption className="mt-3 text-sm text-center text-muted-foreground">
          {blok.image.title}
        </figcaption>
      )}
    </figure>
  );
};

export default Figure;
