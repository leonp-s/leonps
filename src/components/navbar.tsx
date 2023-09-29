"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import { RemoveScroll } from "react-remove-scroll";

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
    setTransparentBackground(scrollYProgress.get() < 0.02),
  );

  return (
    <motion.nav
      layout
      className="fixed w-full flex justify-center top-0 p-4"
      style={{
        marginTop: smoothedScrollVelocity,
      }}
    >
      <Tabs defaultValue="work" className={RemoveScroll.classNames.fullWidth}>
        <TabsList aria-label="navigation" asChild>
          <motion.div
            layout
            className={`backdrop-blur-md ${
              transparentBackground ? "bg-muted/0" : "bg-muted/60"
            }`}
            style={{
              transition: "background-color 0.4s ease",
            }}
          >
            <TabsTrigger value="work">Work</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <Button variant="link" className="h-full">
              <BiLogoGithub />
            </Button>
            <Button variant="link" className="h-full">
              <BiLogoLinkedin />
            </Button>
          </motion.div>
        </TabsList>
      </Tabs>
      <div
        className={`fixed right-0 bottom-0 md:top-0 ${RemoveScroll.classNames.fullWidth}`}
        style={{ padding: "inherit" }}
      >
        <ModeToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
