import { render } from "storyblok-rich-text-react-renderer";
import { StoryblokComponent } from "@storyblok/react/rsc";
import { RichtextStoryblok } from "@/component-types-sb";

type RichTextRendererProps = {
  text: RichtextStoryblok;
};

const RichTextRenderer = ({ text }: RichTextRendererProps) => {
  return (
    <>
      {render(text, {
        defaultBlokResolver: (name, props) => (
          <StoryblokComponent blok={{ component: name, ...props }} />
        ),
      })}
    </>
  );
};

export default RichTextRenderer;
