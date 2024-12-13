function tokensToWinPuzzles(input: string[]) {
  let tokens = 0;
  for (let i = 0; i < input.length; i = i + 4) {
    const [buttonAInput, buttonBInput, prizeInput] = input.slice(i, i + 3);
    const buttonA = /X\+(\d+).+?Y\+(\d+)/.exec(buttonAInput)?.slice(1, 3).map(
      Number,
    )!;
    const buttonB = /X\+(\d+).+?Y\+(\d+)/.exec(buttonBInput)?.slice(1, 3).map(
      Number,
    )!;
    const prize = /X=(\d+).+?Y=(\d+)/.exec(prizeInput)?.slice(1, 3).map(
      Number,
    )!;

    tokens += play(buttonA, buttonB, [
      10000000000000 + prize[0],
      10000000000000 + prize[1],
    ]);
  }
  return tokens;
}

const aTokens = 3;
const bTokens = 1;

// pX = ax * i + bx * j
// pY = ay * i + bx * j

function play(
  a: number[],
  b: number[],
  prize: number[],
) {
  const y = (prize[0] * a[1] - prize[1] * a[0]) / (b[0] * a[1] - b[1] * a[0]);
  const x = (prize[0] - b[0] * y) / a[0];
  return Number.isInteger(x) && Number.isInteger(y)
    ? x * aTokens + y * bTokens
    : 0;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(tokensToWinPuzzles(puzzle));
}
