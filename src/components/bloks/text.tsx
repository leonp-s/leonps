import { storyblokEditable } from "@storyblok/react/rsc";
import { FC } from "react";
import { TextStoryblok } from "@/component-types-sb";
import RichTextRenderer from "@/components/RichTextRenderer";

const Text: FC<{ blok: TextStoryblok }> = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)}>
      <RichTextRenderer text={blok.text} />
    </section>
  );
};

export default Text;
