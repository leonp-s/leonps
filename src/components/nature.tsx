"use client";

import React, { FC, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import useStars from "@/components/useStars";
import { useElementSize } from "usehooks-ts";
import useForest from "@/components/useForest";

const smoothedValue = (
  valueToSmooth: number,
  target: number,
  delta: number,
): number => {
  const step = (target - valueToSmooth) * delta;
  return valueToSmooth + step;
};

const smoothingTime = 0.8;

const approximatelyEqual = (v1: number, v2: number, epsilon = 0.001) =>
  Math.abs(v1 - v2) < epsilon;

const Nature: FC<{ timeOfDay: number }> = ({ timeOfDay }) => {
  const timeOfDaySmooth = useMotionValue(timeOfDay);

  useAnimationFrame((time, delta) => {
    const currentValue = timeOfDaySmooth.get();
    if (approximatelyEqual(currentValue, timeOfDay)) return;
    let smoothed = smoothedValue(
      currentValue,
      timeOfDay,
      (delta / 1000.0) * smoothingTime,
    );
    timeOfDaySmooth.set(smoothed);
  });

  const [animDivRef, { width, height }] = useElementSize();

  const sunOpacity = useTransform(timeOfDaySmooth, [0, 0.4, 1], [0.6, 0, 0]);

  const moonOpacity = useTransform(timeOfDaySmooth, [0, 0.6, 1], [0, 0, 0.9]);

  const scale = useTransform(timeOfDaySmooth, [0, 1], [10, 3]);
  const lunarRotation = useTransform(timeOfDaySmooth, [0, 1], [-20, 200]);

  const xPos = useTransform(timeOfDaySmooth, [0, 1], ["0%", "80%"]);
  const xPosInv = useTransform(timeOfDaySmooth, [0, 1], ["80%", "0%"]);

  const yPos = useTransform(
    timeOfDaySmooth,
    [0, 0.5, 1],
    ["20%", "10%", "20%"],
  );

  const backgroundYPos = useTransform(timeOfDaySmooth, [0, 1], ["100%", "0%"]);

  const yPosInv = useTransform(timeOfDaySmooth, [0, 1], ["28%", "0%"]);

  const { forestCanvasRef } = useForest("United Kingdom");
  const { starsCanvasRef } = useStars();

  const backgroundGradient = (
    <motion.div
      className="absolute w-full h-full"
      style={{
        rotate: "180deg",
        background:
          "linear-gradient(-8deg, #fef3c7, #fefed8 5%, #f8e7e6 15%, #b4b0c6 30%, #4f4d64 50%, #433f53 60%, #1f2937 70%, #030712)",
        backgroundSize: "100% 200%",
        backgroundPositionY: backgroundYPos,
        zIndex: -1,
        top: 0,
      }}
    />
  );

  const sun = (
    <motion.div
      layout
      className="w-full absolute"
      style={{
        top: yPos,
        opacity: sunOpacity,
      }}
    >
      <motion.svg
        layout
        width="140"
        height="140"
        viewBox="-5 -5 10 10"
        className="absolute p-4"
        style={{
          left: xPos,
        }}
      >
        <defs>
          <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <motion.stop offset="0%" style={{ stopColor: "#f59e0b" }} />
            <motion.stop offset="100%" style={{ stopColor: "#fefed8" }} />
          </linearGradient>
        </defs>
        <motion.circle r="5" fill="url(#sunGrad)" />
      </motion.svg>
    </motion.div>
  );

  const moon = (
    <motion.div
      layout
      className="w-full absolute"
      style={{
        top: yPos,
        opacity: moonOpacity,
      }}
    >
      <motion.svg
        layout
        width="140"
        height="140"
        viewBox="-5 -5 10 10"
        className="absolute p-4"
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
  );

  return (
    <div className="relative h-full">
      {backgroundGradient}
      <div className="absolute w-full h-full overflow-hidden">
        {sun}
        {moon}
      </div>
      <div className="absolute h-full w-full -z-1" ref={animDivRef}>
        <canvas
          ref={forestCanvasRef}
          style={{ display: "block", height: "60%" }}
          className="absolute w-full bottom-0"
        />

        <motion.canvas
          ref={starsCanvasRef}
          style={{
            display: "block",
            opacity: moonOpacity,
            bottom: yPosInv,
          }}
          className="absolute w-full h-full"
        />
      </div>
    </div>
  );
};

export default Nature;
