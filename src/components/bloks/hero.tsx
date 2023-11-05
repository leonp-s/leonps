import Nature from "@/components/nature";
import { BiChevronRight } from "react-icons/bi";
import { FC } from "react";
import { HeroStoryblok, PageStoryblok } from "@/component-types-sb";
import { storyblokEditable } from "@storyblok/react/rsc";

const HeroCTA: FC<{
  info: string;
  tagline: string;
  introduction: string;
  cta: string;
}> = ({ info, tagline, cta, introduction }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="max-w-xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
            {introduction}
            <span className="text-orange-300 dark:text-blue-300">Leon.</span>
          </h1>
          <h2 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200 mt-2">
            {tagline}
          </h2>
        </div>

        <div className="mt-6 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-800 dark:text-gray-300">{info}</p>
        </div>

        <div className="flex justify-center mt-5">
          <a
            className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
            href="#"
          >
            {cta}
            <span className="flex items-center gap-x-1 text-orange-300 dark:text-blue-300">
              <span className="border-l border-gray-200 pl-2">Explore</span>
              <BiChevronRight />
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};

const Hero: FC<{ blok: HeroStoryblok }> = ({ blok }) => {
  return (
    <div className="w-full h-full" {...storyblokEditable(blok)}>
      <Nature />
      <div className="absolute flex top-[4%] w-full h-full justify-center">
        <HeroCTA
          info={blok.info}
          tagline={blok.tagline}
          cta={blok.cta}
          introduction={blok.introduction}
        />
      </div>
    </div>
  );
};

export default Hero;
