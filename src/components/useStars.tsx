import React, { FC, useEffect, useRef } from "react";
import { Tree } from "@/components/tree";
import seedRandom from "seedrandom";
import { useElementSize } from "usehooks-ts";

function getRandom(seed: seedRandom.PRNG, min: number, max: number) {
  return Math.floor(seed() * (max - min + 1)) + min;
}

const useStars = () => {
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const [setSizeRef, { width, height }] = useElementSize<HTMLCanvasElement>();

  useEffect(() => {
    setSizeRef(starsCanvasRef.current);
  }, [setSizeRef, starsCanvasRef]);

  useEffect(() => {
    let cancelAnim: number;
    let timeout = setTimeout(() => {
      const canvas = starsCanvasRef.current!;

      canvas.width = width;
      canvas.height = height;

      let time = 0;

      const update = () => {
        let seed = seedRandom("stable");

        const context = canvas.getContext("2d")!;
        context.clearRect(0, 0, canvas.width, canvas.height);

        const stars = 200;
        const colourRange = [0, 60, 240];

        for (let i = 0; i < stars; i++) {
          let x =
            seed() * canvas.offsetWidth + Math.sin((seed() - 0.5) * time) * 100;
          let y =
            seed() * canvas.offsetHeight +
            Math.sin((seed() - 0.5) * time) * 100;
          let radius = seed() * 1.2 * (Math.sin(seed() - 0.5) + 1);
          let hue = colourRange[getRandom(seed, 0, colourRange.length - 1)];
          let sat = getRandom(seed, 50, 100);
          context.beginPath();
          context.arc(x, y, radius, 0, 360);
          context.fillStyle = "hsla(" + hue + ", " + sat + "%, 88%, 60%)";
          context.fill();
        }

        time += 0.004;
        cancelAnim = requestAnimationFrame(update);
      };

      cancelAnim = requestAnimationFrame(update);
    }, 400);

    return () => {
      cancelAnimationFrame(cancelAnim);
      clearTimeout(timeout);
    };
  }, [width, height]);

  return { starsCanvasRef };
};

export default useStars;