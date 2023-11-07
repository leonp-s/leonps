import {
  MARK_BOLD,
  MARK_LINK,
  NODE_HEADING,
  NODE_LI,
  NODE_OL,
  NODE_PARAGRAPH,
  NODE_UL,
  render,
} from "storyblok-rich-text-react-renderer";
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
        nodeResolvers: {
          [NODE_HEADING]: (children, { level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-4xl font-bold mb-4">{children}</h1>;
              case 2:
                return (
                  <h2 className="text-3xl font-semibold mb-3">{children}</h2>
                );
              case 3:
                return (
                  <h3 className="text-2xl font-semibold mb-2">{children}</h3>
                );
              case 4:
                return (
                  <h4 className="text-xl font-semibold mb-2">{children}</h4>
                );
              case 5:
                return (
                  <h5 className="text-lg font-semibold mb-2">{children}</h5>
                );
              case 6:
                return (
                  <h6 className="text-md font-semibold mb-2">{children}</h6>
                );
            }
          },
          [NODE_PARAGRAPH]: (children) => (
            <p className="text-lg mb-2">{children}</p>
          ),
          [NODE_LI]: (children) => <li className="mb-1">{children}</li>,
          [NODE_OL]: (children) => (
            <ol className="list-decimal pl-6 mb-2">{children}</ol>
          ),
          [NODE_UL]: (children) => (
            <ul className="list-disc list-outside space-y-5 pl-5 text-lg">
              {children}
            </ul>
          ),
        },
        markResolvers: {
          [MARK_BOLD]: (children) => (
            <strong className="font-semibold">{children}</strong>
          ),
          [MARK_LINK]: (
            children,
            { linktype, href, target, anchor, uuid, custom },
          ) => {
            return (
              <a
                target="_blank"
                href={href}
                className="text-blue-600 decoration-2 hover:underline font-medium"
              >
                {children}
              </a>
            );
          },
        },
      })}
    </>
  );
};

export default RichTextRenderer;
