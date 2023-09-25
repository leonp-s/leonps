"use client";

import { ThemeChanger } from "@/app/ThemeChanger";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import Nature from "@/components/nature";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });
  const [transparentBackground, setTransparentBackground] = useState(true);

  const scrollVelocity = useVelocity(scrollYProgress);
  const scaledScrollVelocity = useTransform(scrollVelocity, [-1, 1], [-10, 10]);
  const smoothedScrollVelocity = useSpring(scaledScrollVelocity);

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    setTransparentBackground(scrollYProgress.get() < 0.06),
  );

  return (
    <div className="fixed w-full flex justify-center p-4 top-0">
      {/*<ThemeChanger />*/}
      <motion.div
        className="tabs tabs-boxed p-2"
        style={{ marginTop: smoothedScrollVelocity }}
        animate={{
          ...(transparentBackground && {
            backgroundColor: "rgba(255,255,255,0)",
          }),
        }}
      >
        <a className="tab mr-4">
          Work <kbd className="kbd kbd-sm rounded-md ml-1">/</kbd>
        </a>
        <a className="tab mr-4">Projects</a>
        <a className="tab mr-4">
          <BiLogoGithub />
        </a>
        <a className="tab mr-4">
          <BiLogoLinkedin />
        </a>
      </motion.div>
    </div>
  );
};
const Home = () => {
  return (
    <main>
      <Nature />
      <Navbar />
      <div className="bg-gray-900" style={{ height: "200vh" }} />
    </main>
  );
};

export default Home;
