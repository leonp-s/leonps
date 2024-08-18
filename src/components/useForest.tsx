"use client";

import { useRef, useEffect } from "react";
import { useElementSize } from "usehooks-ts";
import { Forest } from "@/lib/nature/forest";

const UseForest = (forestSeed: string) => {
  const forestRef = useRef<Forest>();
  const forestCanvasRef = useRef<HTMLCanvasElement>(null);
  const [setSizeRef, { width, height }] = useElementSize<HTMLCanvasElement>();

  useEffect(() => {
    setSizeRef(forestCanvasRef.current);
  }, [setSizeRef, forestCanvasRef]);

  useEffect(() => {
    const forest = new Forest(forestSeed, forestCanvasRef);
    forest.simulate();
    forestRef.current = forest;

    return () => {
      forestRef.current?.end();
    };
  }, [forestSeed]);

  useEffect(() => {
    forestRef.current?.updateDimensions(width, height);
  }, [width, height]);

  return { forestCanvasRef };
};

export default UseForest;
