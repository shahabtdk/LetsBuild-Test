const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

const results = [];

rl.on("line", function (line) {
  if (line.trim() === "") return;

  const parts = line.trim().split(" ").map(Number);
  const [L, W, H, ...cubeCounts] = parts;

  const maxPower = cubeCounts.length - 1;
  const cubeAvailable = [...cubeCounts];
  const cubeUsed = new Array(cubeCounts.length).fill(0);

  let totalVolume = L * W * H;
  let filledVolume = 0;

  // Store how many cubes of each size we can place
  for (let i = maxPower; i >= 0; i--) {
    const side = 2 ** i;
    const cubeVolume = side ** 3;

    // Fit in remaining space
    const fitLength = Math.floor(L / side);
    const fitWidth = Math.floor(W / side);
    const fitHeight = Math.floor(H / side);
    const maxFit = fitLength * fitWidth * fitHeight;

    // Reduce by space already filled by larger cubes
    let filledAlready = 0;
    for (let j = i + 1; j <= maxPower; j++) {
      filledAlready += cubeUsed[j] * (2 ** j / side) ** 3;
    }

    // Subtract filled space from possible space to get actual available space
    const availableSpace = maxFit - filledAlready;
    // Use the smaller of available space or the number of cubes we actually have
    const cubesToUse = Math.min(availableSpace, cubeAvailable[i]);
    // Record how many cubes we used
    cubeUsed[i] = cubesToUse;
    // Add volume to the filled total
    filledVolume += cubesToUse * cubeVolume;
  }

  if (filledVolume === totalVolume) {
    const totalCubesUsed = cubeUsed.reduce((sum, val) => sum + val, 0);
    results.push(totalCubesUsed);
  } else {
    results.push(-1);
  }
});

rl.on("close", function () {
  results.forEach((result) => console.log(result));
});
