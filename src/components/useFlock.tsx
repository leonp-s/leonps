import { RefObject, useEffect, useRef } from "react";
import { useElementSize } from "usehooks-ts";

function getRandom(seed: number, min: number, max: number) {
  return Math.floor(seed * (max - min + 1)) + min;
}

class Stars {
  flockCanvasRef: RefObject<HTMLCanvasElement>;
  cancelAnim?: number;

  constructor(flockCanvasRef: RefObject<HTMLCanvasElement>) {
    this.flockCanvasRef = flockCanvasRef;
  }

  end = () => {
    if (this.cancelAnim) cancelAnimationFrame(this.cancelAnim);
  };

  simulate = () => {
    this.cancelAnim = requestAnimationFrame(this.update);
  };

  updateDimensions = (width: number, height: number) => {
    const canvas = this.flockCanvasRef.current;
    if (canvas != null) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  update = () => {
    const canvas = this.flockCanvasRef.current;

    if (canvas != null) {
      const context = canvas.getContext("2d")!;
      context.clearRect(0, 0, canvas.width, canvas.height);

      this.cancelAnim = requestAnimationFrame(this.update);
    }
  };
}

const useFlock = () => {
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

export default useFlock;
