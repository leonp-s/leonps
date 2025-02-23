"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/modeToggle";
import { RemoveScroll } from "react-remove-scroll";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"],
  });
  const [transparentBackground, setTransparentBackground] = useState(true);

  useMotionValueEvent(scrollYProgress, "change", (latest) =>
    setTransparentBackground(scrollYProgress.get() < 0.02),
  );

  const pathname = usePathname();

  return (
    <motion.nav className="fixed w-full flex justify-center top-0 p-4">
      <Tabs value={pathname} className={RemoveScroll.classNames.fullWidth}>
        <TabsList aria-label="navigation" asChild>
          <motion.div
            className={`backdrop-blur-md ${
              transparentBackground ? "bg-muted/0" : "bg-muted/60"
            }`}
            style={{
              transition: "background-color 0.4s ease",
            }}
          >
            <TabsTrigger value="/" asChild>
              <Link href="/">Home</Link>
            </TabsTrigger>
            {/*<TabsTrigger value="/about" asChild>*/}
            {/*  <Link href="/about">About</Link>*/}
            {/*</TabsTrigger>*/}
            {/*<TabsTrigger value="/projects" asChild>*/}
            {/*  <Link href="/projects">Projects</Link>*/}
            {/*</TabsTrigger>*/}
            <Button variant="link" className="h-full" asChild>
              <Link href="mailto:leon@leonps.com">Contact</Link>
            </Button>
            <Button variant="link" className="h-full" asChild>
              <Link href="https://github.com/leonp-s" target="_blank">
                <BiLogoGithub />
              </Link>
            </Button>
            <Button variant="link" className="h-full" asChild>
              <Link href="https://www.linkedin.com/in/leonp-s/" target="_blank">
                <BiLogoLinkedin />
              </Link>
            </Button>
          </motion.div>
        </TabsList>
      </Tabs>
      <div
        className={`fixed right-0 bottom-0 md:bottom-auto md:top-0 ${RemoveScroll.classNames.fullWidth}`}
        style={{ padding: "inherit" }}
      >
        <ModeToggle />
      </div>
    </motion.nav>
  );
};

export default Navbar;
