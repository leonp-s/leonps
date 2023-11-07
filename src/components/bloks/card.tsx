import { storyblokEditable } from "@storyblok/react/rsc";
import { FC } from "react";
import { CardStoryblok, FigureStoryblok } from "@/component-types-sb";
import Image from "next/image";
import { BiChevronRight } from "react-icons/bi";
import RichTextRenderer from "@/components/RichTextRenderer";

const Card: FC<{ blok: CardStoryblok }> = ({ blok }) => {
  switch (blok.variant) {
    case "":
    case "separated":
      return (
        <a
          className="group rounded-xl overflow-hidden"
          href={blok.url.cached_url}
          {...storyblokEditable(blok)}
        >
          <div className="relative pt-[50%] sm:pt-[70%] rounded-xl overflow-hidden will-change-transform">
            <Image
              src={blok.image.filename}
              alt={blok.image.alt ?? blok.image.name}
              fill
              className="w-full h-full absolute top-0 left-0 object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
            />
          </div>

          <div className="mt-7">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              {blok.title}
            </h3>
            <div className="mt-3 text-gray-800 dark:text-gray-200">
              <RichTextRenderer text={blok.info} />
            </div>
            <p className="mt-5 inline-flex items-center gap-x-1.5 text-blue-600 decoration-2 group-hover:underline font-medium">
              Read more
              <BiChevronRight />
            </p>
          </div>
        </a>
      );
    case "overlay":
      return (
        <a
          className={`group relative flex flex-col w-full h-full bg-center bg-cover rounded-xl hover:shadow-lg transition`}
          style={{ backgroundImage: `url(${blok.image.filename})` }}
          href={blok.url.cached_url}
          {...storyblokEditable(blok)}
        >
          <div className="flex-auto p-4 md:p-6">
            <h3 className="text-xl">
              <span className="font-bold">{blok.title}</span>
            </h3>
            <RichTextRenderer text={blok.info} />
          </div>
          <div className="pt-0 p-4 md:p-6">
            <div className="inline-flex items-center gap-2 text-sm font-medium text-white group-hover:text-white/[.7]">
              Read more
              <BiChevronRight />
            </div>
          </div>
        </a>
      );
  }
};

export default Card;
