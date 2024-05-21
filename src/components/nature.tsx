"use client";

import React, { Fragment } from "react";
import dynamic from "next/dynamic";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "framer-motion";
import useStars from "@/components/useStars";
import useForest from "@/components/useForest";
import { useTheme } from "next-themes";

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

const backgroundStyle = {
  rotate: "180deg",
  background:
    "linear-gradient(-8deg, #fef3c7, #fefed8 10%, #f8e7e6 25%, #b4b0c6 45%, #4f4d64 55%, #433f53 65%, #1f2937 82%, #030712)",
  backgroundSize: "100% 300%",
  zIndex: -1,
  top: 0,
};

const fixedBackground = (
  <Fragment>
    <motion.div
      className="absolute w-full h-full dark:hidden"
      style={{
        ...backgroundStyle,
        backgroundPositionY: "100%",
      }}
    />
    <motion.div
      className="absolute w-full h-full hidden dark:block"
      style={{
        ...backgroundStyle,
        backgroundPositionY: "0%",
      }}
    />
  </Fragment>
);

const withNoSSR = (Component: React.FunctionComponent) =>
  dynamic(() => Promise.resolve(Component), { ssr: false });

const NatureDynamic = withNoSSR(() => {
  const { resolvedTheme } = useTheme();
  const timeOfDay = resolvedTheme == "light" ? 0.0 : 1.0;

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

  const sunOpacity = useTransform(timeOfDaySmooth, [0, 0.4, 1], [0.6, 0, 0]);
  const moonOpacity = useTransform(timeOfDaySmooth, [0, 0.6, 1], [0, 0, 0.9]);

  const xPos = useTransform(timeOfDaySmooth, [0, 1], ["0%", "80%"]);
  const xPosInv = useTransform(timeOfDaySmooth, [0, 1], ["80%", "0%"]);
  const yPos = useTransform(timeOfDaySmooth, [0, 0.5, 1], ["20%", "4%", "20%"]);

  const backgroundYPos = useTransform(timeOfDaySmooth, [0, 1], ["100%", "0%"]);
  const yPosInv = useTransform(timeOfDaySmooth, [0, 1], ["28%", "0%"]);

  const { forestCanvasRef } = useForest("United Kingdom");
  const { starsCanvasRef } = useStars();

  const backgroundGradient = (
    <motion.div
      className="absolute w-full h-full"
      style={{
        ...backgroundStyle,
        backgroundPositionY: backgroundYPos,
      }}
    />
  );

  const sun = (
    <motion.div
      className="w-full absolute"
      style={{
        opacity: sunOpacity,
        top: yPos,
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
            <stop offset="0%" style={{ stopColor: "#f59e0b" }} />
            <stop offset="100%" style={{ stopColor: "#fefed8" }} />
          </linearGradient>
        </defs>
        <circle r="5" fill="url(#sunGrad)" />
      </motion.svg>
    </motion.div>
  );

  const moon = (
    <motion.div
      className="w-full absolute"
      style={{
        opacity: moonOpacity,
        top: yPos,
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
            <circle fill="black" cx={3} r="5" />
          </mask>
          <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: "#4b5364" }} />
            <stop offset="100%" style={{ stopColor: "#1b3049" }} />
          </linearGradient>
        </defs>
        <circle
          r="5"
          fill="url(#moonGrad)"
          mask="url(#moon)"
          style={{
            rotate: "200deg",
          }}
        />
      </motion.svg>
    </motion.div>
  );

  return (
    <Fragment>
      {backgroundGradient}
      <motion.div
        layout
        style={{ opacity: sunOpacity }}
        className="absolute top-0 w-full h-full bg-[url('/hero_blob_light.svg')] bg-no-repeat bg-contain bg-center"
      />
      <motion.div
        layout
        style={{ opacity: moonOpacity }}
        className="absolute w-full h-full bg-[url('/hero_blob_dark.svg')] bg-no-repeat bg-contain bg-center"
      />
      <div className="absolute w-full h-full overflow-hidden">
        {sun}
        {moon}
      </div>
      <div className="absolute h-full w-full">
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
    </Fragment>
  );
});

const Nature = () => {
  return (
    <div className="h-full w-full">
      {fixedBackground}
      <NatureDynamic />
    </div>
  );
};

export default Nature;
