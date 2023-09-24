import seedRandom from "seedrandom";

const drawLeaf = (
  context: CanvasRenderingContext2D,
  rootDna: number,
  drawDna: number,
  x: number,
  y: number,
  treeGrowVal: number,
  length: number,
) => {
  context.beginPath();
  context.lineWidth = 1;
  context.fillStyle = `hsla(
          ${360 * rootDna}, 
          ${(60 - 40) * drawDna + 40}%, 
          ${(80 - 40) * drawDna + 40}%, 
          ${(1 - 0.8) * drawDna + 0.8}
        )`;
  context.arc(x, y, treeGrowVal * length * 0.2, 0, 2 * Math.PI);
  context.fill();
};

const angleMin = 0.04;
const angleMax = 0.6;
const lengthMin = 0.6;
const lengthMax = 0.9;
const widthMin = 0.6;
const widthMax = 0.8;
const trunkMin = 6;
const trunkMax = 8;
const maxBranches = 100;

const Tree = (
  canvas: HTMLCanvasElement,
  seed: number,
  x: number,
  y: number,
) => {
  let treeDna: seedRandom.PRNG;
  let rootDna = seedRandom(seed.toString())();

  let branchCount = 0;
  let treeGrow = 0.01;
  let wind = 0;

  // Recusive tree
  const drawBranch = (
    x: number,
    y: number,
    dir: number,
    length: number,
    width: number,
    context: CanvasRenderingContext2D,
  ) => {
    let drawDna = treeDna();
    branchCount++;

    const treeGrowVal =
      (treeGrow > 1 ? 1 : treeGrow < 0.1 ? 0.1 : treeGrow) ** 2;

    // Change direction by addition based on the wind and scale, also add some phase
    dir +=
      (1 - width / 8) ** 8 * Math.cos(wind * width + Math.PI * rootDna * 2);

    context.strokeStyle = "#2a2a2a";
    context.lineWidth = width;
    context.beginPath();
    context.lineTo(x, y);
    x += Math.cos(dir) * length * treeGrowVal;
    y += Math.sin(dir) * length * treeGrowVal;
    context.lineTo(x, y);
    context.stroke();

    // if not to thick, not to short and not to wide
    if (branchCount < maxBranches && length > 5 && width > 1) {
      const rDir = drawDna ? -1 : 1;

      const angleDelta = (angleMax - angleMin) * drawDna + angleMin;
      const lengthReduction = (lengthMax - lengthMin) * drawDna + lengthMin;
      const widthReduction = (widthMax - widthMin) * drawDna + widthMin;

      drawBranch(
        x,
        y,
        dir + angleDelta * rDir,
        length * lengthReduction,
        width * widthReduction,
        context,
      );

      // Bend next branch the other way
      drawBranch(
        x,
        y,
        dir + angleDelta * -rDir,
        length * lengthReduction,
        width * widthReduction,
        context,
      );
    } else {
      drawLeaf(context, rootDna, drawDna, x, y, treeGrowVal, length);
    }
  };

  return {
    draw: (context: CanvasRenderingContext2D) => {
      branchCount = 0;
      treeGrow += 0.02;
      wind += Math.PI * 0.01;
      treeDna = seedRandom(seed.toString());
      let maxTrunk = (trunkMax - trunkMin) * treeDna() + trunkMin;
      drawBranch(x, y, -Math.PI / 2, canvas.height / 6, maxTrunk, context);
    },
  };
};

export { Tree };
