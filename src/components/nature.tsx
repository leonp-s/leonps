"use client";

import UseForest from "@/components/useForest";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import useStars from "@/components/useStars";
import { useElementSize } from "usehooks-ts";
import { BiLogoGithub, BiLogoLinkedin } from "react-icons/bi";
import useForest from "@/components/useForest";

const Nature = () => {
  const natureRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: natureRef,
    offset: ["start start", "end end"],
  });

  const scrollYProgressSmooth = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 400,
  });

  const [animDivRef, { width, height }] = useElementSize();

  const sunOpacity = useTransform(
    scrollYProgressSmooth,
    [0, 0.4, 1],
    [0.6, 0, 0],
  );

  const moonOpacity = useTransform(
    scrollYProgressSmooth,
    [0, 0.6, 1],
    [0, 0, 0.9],
  );

  const scale = useTransform(scrollYProgressSmooth, [0, 1], [10, 3]);
  const lunarRotation = useTransform(scrollYProgressSmooth, [0, 1], [-20, 200]);

  const xPos = useTransform(scrollYProgressSmooth, [0, 1], ["0%", "80%"]);
  const xPosInv = useTransform(scrollYProgressSmooth, [0, 1], ["80%", "0%"]);

  const yPos = useTransform(
    scrollYProgressSmooth,
    [0, 0.5, 1],
    ["20%", "10%", "20%"],
  );

  const yPosInv = useTransform(scrollYProgressSmooth, [0, 1], ["28%", "0%"]);

  const { forestCanvasRef } = useForest("United Kingdom");
  const { starsCanvasRef } = useStars();

  const backgroundGradient = (
    <div
      className="absolute w-full h-full"
      style={{
        rotate: "180deg",
        background:
          "linear-gradient(-8deg, #fef3c7, #fefed8 5%, #f8e7e6 15%, #b4b0c6 30%, #4f4d64 50%, #433f53 60%, #1f2937 70%, #030712)",
        zIndex: -1,
        top: 0,
      }}
    />
  );

  const sun = (
    <motion.div
      className="p-4 sticky w-fit"
      style={{
        left: xPos,
        top: yPos,
        opacity: sunOpacity,
      }}
    >
      <motion.svg
        width="140"
        height="140"
        viewBox="-5 -5 10 10"
        initial="hidden"
        animate="visible"
      >
        <defs>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <motion.stop offset="0%" style={{ stopColor: "#f59e0b" }} />
            <motion.stop offset="100%" style={{ stopColor: "#fefed8" }} />
          </linearGradient>
          <linearGradient
            id="sunGradHighlight"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <motion.stop offset="0%" style={{ stopColor: "#f1a17e" }} />
            <motion.stop offset="100%" style={{ stopColor: "#fffdf7" }} />
          </linearGradient>
        </defs>
        <motion.circle r="5" fill="url(#sunGrad)" />
        <motion.circle r="4" fill="url(#sunGradHighlight)" opacity={0.2} />
      </motion.svg>
    </motion.div>
  );

  const moon = (
    <motion.div
      className="p-4 sticky w-full"
      style={{
        top: yPos,
        opacity: moonOpacity,
      }}
    >
      <motion.div className="relative w-full">
        <motion.svg
          width="140"
          height="140"
          viewBox="-5 -5 10 10"
          initial="hidden"
          animate="visible"
          className="absolute"
          style={{ right: xPosInv }}
        >
          <defs>
            <mask id="moon">
              <rect fill="white" x="-5" y="-5" width="10" height="10"></rect>
              <motion.circle fill="black" cx={scale} r="5" />
            </mask>
            <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <motion.stop offset="0%" style={{ stopColor: "#111827" }} />
              <motion.stop offset="100%" style={{ stopColor: "#1f2937" }} />
            </linearGradient>
          </defs>
          <motion.circle
            r="5"
            fill="url(#moonGrad)"
            mask="url(#moon)"
            style={{
              rotate: lunarRotation,
            }}
          />
        </motion.svg>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="relative" ref={natureRef}>
      {backgroundGradient}
      <div className="w-full" style={{ height: "400vh" }}>
        {sun}
        {moon}
      </div>
      <div className="sticky bottom-0 max-h-full -z-1" ref={animDivRef}>
        <canvas
          ref={forestCanvasRef}
          style={{ display: "block", height: "60vh" }}
          className="w-full"
        />

        <motion.canvas
          ref={starsCanvasRef}
          style={{
            display: "block",
            height: "100vh",
            opacity: moonOpacity,
            bottom: yPosInv,
          }}
          className="w-full absolute bottom-0"
        />
      </div>
    </div>
  );
};

export default Nature;
