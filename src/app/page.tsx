"use client";

import Nature from "@/components/nature";
import Navbar from "@/components/navbar";
import { useTheme } from "next-themes";
import { Fragment } from "react";
import { BiChevronRight } from "react-icons/bi";

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="max-w-xl text-center mx-auto">
          <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200">
            {"Hi. I'm "}
            <span className="text-orange-300 dark:text-blue-300">Leon.</span>
          </h1>
          <h2 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-gray-200 mt-2">
            {"> Audio Software Developer"}
          </h2>
        </div>

        <div className="mt-6 max-w-3xl text-center mx-auto">
          <p className="text-lg text-gray-800 dark:text-gray-300">
            Audio software developer with a strong technical background in
            mathematics and audio engineering. Passionate musician and composer.
          </p>
        </div>

        <div className="flex justify-center mt-5">
          <a
            className="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600 dark:text-gray-400"
            href="#"
          >
            Explore some of my Projects
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

const Home = () => {
  const { theme, systemTheme } = useTheme();

  return (
    <Fragment>
      <div className="w-full h-full">
        <Nature timeOfDay={theme == "light" ? 0 : 1} />
        <div className="absolute flex top-[4%] w-full h-full justify-center">
          <Hero />
        </div>
      </div>
      <div style={{ height: "400vh" }} />
      <Navbar />
    </Fragment>
  );
};

export default Home;
