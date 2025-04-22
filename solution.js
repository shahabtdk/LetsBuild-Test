const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on("line", function (line) {
  if (line.trim() === "") return;
  const parts = line.trim().split(" ").map(Number);
  const [L, W, H, ...cubeCounts] = parts;

  const maxPower = cubeCounts.length - 1;
  const cubeAvailable = [...cubeCounts];
  const cubeUsed = new Array(cubeCounts.length).fill(0);

  let totalVolume = L * W * H;

  console.log({ maxPower, cubeAvailable, cubeUsed, totalVolume });
});
