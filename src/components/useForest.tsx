"use client";

import React, { useRef, useEffect, FC } from "react";
import seedRandom from "seedrandom";

import { Tree } from "@/components/tree";
import { useElementSize } from "usehooks-ts";

const UseForest = (forestSeed: string) => {
  const forestCanvasRef = useRef<HTMLCanvasElement>(null);
  const [setSizeRef, { width, height }] = useElementSize<HTMLCanvasElement>();

  useEffect(() => {
    setSizeRef(forestCanvasRef.current);
  }, [setSizeRef, forestCanvasRef]);

  useEffect(() => {
    let cancelAnim: number;
    let timeout = setTimeout(() => {
      const canvas = forestCanvasRef.current!;

      canvas.width = width;
      canvas.height = height;

      let trees: Array<ReturnType<typeof Tree>> = [];

      let seedGen = seedRandom(forestSeed);

      let treeCount =
        canvas.width > 1920
          ? 4
          : canvas.width > 1200
          ? 3
          : canvas.width > 600
          ? 2
          : 1;

      for (let i = 0; i < treeCount; i++) {
        trees.push(
          Tree(
            canvas,
            seedGen(),
            (canvas.width / (treeCount + 1)) * i +
              canvas.width / (treeCount + 1),
            canvas.height,
          ),
        );
      }

      const update = () => {
        const canvas = forestCanvasRef.current;

        // JUST A TEMPORARY FIX
        if (canvas != null) {
          const ctx = canvas.getContext("2d")!;

          // Clear the canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw the tree
          trees.forEach((tree) => {
            tree.draw(ctx);
          });

          cancelAnim = requestAnimationFrame(update);
        }
      };

      cancelAnim = requestAnimationFrame(update);
    }, 400);

    return () => {
      cancelAnimationFrame(cancelAnim);
      clearTimeout(timeout);
    };
  }, [width, height, forestSeed]);

  return { forestCanvasRef };
};

export default UseForest;
