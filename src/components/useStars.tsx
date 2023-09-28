import React, { FC, RefObject, useEffect, useRef } from "react";
import { Tree } from "@/components/tree";
import seedRandom from "seedrandom";
import { useElementSize } from "usehooks-ts";

function getRandom(seed: number, min: number, max: number) {
  return Math.floor(seed * (max - min + 1)) + min;
}

class Stars {
  starsCanvasRef: RefObject<HTMLCanvasElement>;
  cancelAnim?: number;
  time: number = 0.0;
  static readonly starCount: number = 200;
  stars: Array<{
    xOrigin: number;
    yOrigin: number;
    radius: number;
    hue: number;
    saturation: number;
    offset: number;
  }> = [];

  constructor(starsCanvasRef: RefObject<HTMLCanvasElement>) {
    this.starsCanvasRef = starsCanvasRef;

    let seed = seedRandom("stable");
    const colourRange = [0, 60, 240];

    for (let starIndex = 0; starIndex < Stars.starCount; starIndex++) {
      this.stars.push({
        xOrigin: seed(),
        yOrigin: seed(),
        radius: seed(),
        hue: colourRange[getRandom(seed(), 0, colourRange.length - 1)],
        saturation: getRandom(seed(), 50, 100),
        offset: seed() * Math.PI * 2.0,
      });
    }
  }

  end = () => {
    if (this.cancelAnim) cancelAnimationFrame(this.cancelAnim);
  };

  simulate = () => {
    this.cancelAnim = requestAnimationFrame(this.update);
  };

  updateDimensions = (width: number, height: number) => {
    const canvas = this.starsCanvasRef.current;
    if (canvas != null) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  update = () => {
    const canvas = this.starsCanvasRef.current;

    if (canvas != null) {
      const context = canvas.getContext("2d")!;
      context.clearRect(0, 0, canvas.width, canvas.height);

      for (const star of this.stars) {
        let x =
          star.xOrigin * canvas.offsetWidth +
          Math.sin(0.5 * this.time + star.offset) * 100;
        let y =
          star.yOrigin * canvas.offsetHeight +
          Math.sin(0.5 * this.time + star.offset) * 100;
        let radius = star.radius * 1.2 * (Math.sin(0.5 + star.offset) + 1);

        context.beginPath();
        context.arc(x, y, radius, 0, 360);
        context.fillStyle =
          "hsla(" + star.hue + ", " + star.saturation + "%, 88%, 60%)";
        context.fill();
      }

      this.time += 0.004;
      this.cancelAnim = requestAnimationFrame(this.update);
    }
  };
}

const useStars = () => {
  const starsRef = useRef<Stars>();
  const starsCanvasRef = useRef<HTMLCanvasElement>(null);
  const [setSizeRef, { width, height }] = useElementSize<HTMLCanvasElement>();

  useEffect(() => {
    setSizeRef(starsCanvasRef.current);
  }, [setSizeRef, starsCanvasRef]);

  useEffect(() => {
    const forest = new Stars(starsCanvasRef);
    forest.simulate();
    starsRef.current = forest;

    return () => {
      starsRef.current?.end();
    };
  }, []);

  useEffect(() => {
    starsRef.current?.updateDimensions(width, height);
  }, [width, height]);

  return { starsCanvasRef };
};

export default useStars;
