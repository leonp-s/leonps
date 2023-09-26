import * as Tabs from "@radix-ui/react-tabs";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useState } from "react";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";

const Navbar = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });
  const [transparentBackground, setTransparentBackground] = useState(true);

  const scrollVelocity = useVelocity(scrollYProgress);
  const scaledScrollVelocity = useTransform(scrollVelocity, [-1, 1], [-6, 6]);
  const smoothedScrollVelocity = useSpring(scaledScrollVelocity, {
    mass: 4,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    setTransparentBackground(scrollYProgress.get() < 0.06),
  );

  return (
    <div className="fixed w-full flex justify-center p-4 top-0">
      <Tabs.Root defaultValue="work">
        <Tabs.List
          className="tabs tabs-boxed p-2"
          aria-label="Manage your account"
          asChild
        >
          <motion.div
            className="tabs tabs-boxed p-2"
            layout
            style={{ marginTop: smoothedScrollVelocity }}
            animate={{
              ...(transparentBackground && {
                backgroundColor: "rgba(255,255,255,0)",
              }),
            }}
          >
            <Tabs.Trigger className="tab" value="work">
              Work <kbd className="kbd kbd-sm rounded-md ml-1">/</kbd>
            </Tabs.Trigger>
            <Tabs.Trigger className="tab" value="projects">
              Projects
            </Tabs.Trigger>
            <Tabs.Trigger className="tab" value="projects">
              <BiLogoGithub />
            </Tabs.Trigger>
            <Tabs.Trigger className="tab" value="projects">
              <BiLogoLinkedin />
            </Tabs.Trigger>
          </motion.div>
        </Tabs.List>
      </Tabs.Root>
    </div>
  );
};

export default Navbar;
