function findStart(puzzle: string[]): [number, number, [number, number]] {
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

function countVisitedPositions(puzzle: string[]) {
  let [x, y, direction] = findStart(puzzle);
  const visited = new Set<string>();
  while (x >= 0 && y >= 0 && x < puzzle.length && y < puzzle.length) {
    visited.add(`${x}:${y}`);
    const newX = x + direction[0];
    const newY = y + direction[1];
    if (puzzle[newX]?.[newY] === "#") {
      direction = [direction[1], direction[0] * -1];
    } else {
      x = newX;
      y = newY;
    }
  }

  return visited.size;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countVisitedPositions(puzzle));
}
