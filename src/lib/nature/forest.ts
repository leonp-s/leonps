import { RefObject } from "react";
import { Tree } from "@/lib/nature/tree";
import seedRandom from "seedrandom";

class Forest {
  forestCanvasRef_: RefObject<HTMLCanvasElement>;
  trees: Array<ReturnType<typeof Tree>> = [];
  seedGen: seedRandom.PRNG;
  cancelAnim?: number;

  constructor(
    forestSeed: string,
    forestCanvasRef: RefObject<HTMLCanvasElement>,
  ) {
    this.forestCanvasRef_ = forestCanvasRef;
    this.seedGen = seedRandom(forestSeed);

    this.trees = [
      Tree(this.seedGen()),
      Tree(this.seedGen()),
      Tree(this.seedGen()),
      Tree(this.seedGen()),
    ];
  }

  simulate = () => {
    this.cancelAnim = requestAnimationFrame(this.update);
  };

  updateDimensions = (width: number, height: number) => {
    const canvas = this.forestCanvasRef_.current;
    if (canvas != null) {
      canvas.width = width;
      canvas.height = height;
    }
  };

  update = () => {
    const canvas = this.forestCanvasRef_.current;
    if (canvas != null) {
      const ctx = canvas.getContext("2d")!;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let drawTreeCount =
        canvas.width > 1920
          ? 4
          : canvas.width > 1200
            ? 3
            : canvas.width > 600
              ? 2
              : 1;

      for (let treeIndex = 0; treeIndex < drawTreeCount; treeIndex++) {
        this.trees[treeIndex].draw(
          canvas,
          ctx,
          (canvas.width / (drawTreeCount + 1)) * treeIndex +
            canvas.width / (drawTreeCount + 1),
          canvas.height,
        );
      }

      this.cancelAnim = requestAnimationFrame(this.update);
    }
  };

  end = () => {
    if (this.cancelAnim) cancelAnimationFrame(this.cancelAnim);
  };
}

export { Forest };
