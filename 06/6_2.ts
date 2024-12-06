function findStart(puzzle: string[][]): [number, number, [number, number]] {
  for (let i = 0; i < puzzle.length; i++) {
    let j = puzzle[i].indexOf("^");
    if (j !== -1) {
      return [i, j, [-1, 0]];
    }
    j = puzzle[i].indexOf(">");
    if (j !== -1) {
      return [i, j, [0, 1]];
    }
    j = puzzle[i].indexOf("v");
    if (j !== -1) {
      return [i, j, [1, 0]];
    }
    j = puzzle[i].indexOf("<");
    if (j !== -1) {
      return [i, j, [0, -1]];
    }
  }

  throw new Error("Incorrect input");
}

function isInLoop(
  puzzle: string[][],
  x: number,
  y: number,
  direction: [number, number],
) {
  const visited = new Set<string>();
  while (x >= 0 && y >= 0 && x < puzzle.length && y < puzzle.length) {
    const state = `${x}:${y}:${direction}`;
    if (visited.has(state)) {
      return true;
    }
    visited.add(`${x}:${y}:${direction}`);
    const newX = x + direction[0];
    const newY = y + direction[1];
    if (puzzle[newX]?.[newY] === "#") {
      direction = [direction[1], direction[0] * -1];
    } else {
      x = newX;
      y = newY;
    }
  }
  return false;
}

function countPossibleLoops(puzzle: string[][]) {
  const [startX, startY, startDirection] = findStart(puzzle);
  let loopsCount = 0;
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      if (puzzle[i][j] === ".") {
        puzzle[i][j] = "#";
        if (
          isInLoop(puzzle, startX, startY, [
            startDirection[0],
            startDirection[1],
          ])
        ) {
          loopsCount++;
        }
        puzzle[i][j] = ".";
      }
    }
  }

  return loopsCount;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1)
    .map((l) => l.split(""));
  console.log(countPossibleLoops(puzzle));
}
