function sumOfGPSCoordinates(input: string[]) {
  const { map, moves, start } = readPuzzle(input);

  for (const move of moves) {
    makeMove(map, start, move);
  }

  return sumGPSCoordinates(map);
}

function readPuzzle(input: string[]) {
  const map: string[][] = [];
  let start: [number, number] = [0, 0];
  let i = 0;
  for (; i < input.length; i++) {
    const line = input[i].split("").flatMap((v) => {
      if (v === "#") {
        return ["#", "#"];
      }
      if (v === ".") {
        return [".", "."];
      }
      if (v === "O") {
        return ["[", "]"];
      }
      if (v === "@") {
        return ["@", "."];
      }
      throw new Error(`Unknown symbol: ${v}`);
    });
    if (line.length === 0) {
      break;
    }
    const index = line.indexOf("@");
    if (index !== -1) {
      start = [i, index];
    }
    map.push(line);
  }

  const moves = input.slice(i + 1).join("");

  return { map, moves, start };
}

const directions: Record<string, [number, number]> = {
  "^": [-1, 0],
  ">": [0, 1],
  "v": [1, 0],
  "<": [0, -1],
};

function makeMove(map: string[][], start: [number, number], move: string) {
  const direction = directions[move];
  let [i, j] = start;
  if (direction[1]) {
    const d = direction[1];
    while (true) {
      j += d;
      if (map[i][j] === "#") {
        return;
      }
      if (map[i][j] === ".") {
        break;
      }
    }
    while (j !== start[1] + d) {
      map[i][j] = d > 0 ? "]" : "[";
      map[i][j - d] = d > 0 ? "[" : "]";
      j -= 2 * d;
    }
  } else {
    const d = direction[0];
    const needToMove = [[j]];
    while (true) {
      i += d;
      if (needToMove[0].some((x) => map[i][x] === "#")) {
        return;
      }
      if (needToMove[0].every((x) => map[i][x] === ".")) {
        break;
      }

      const newNeedToMove: number[] = [];
      for (const x of needToMove[0]) {
        const v = map[i - d][x];
        const v1 = map[i][x];
        switch (v) {
          case "@": {
            if (v1 === "[") {
              newNeedToMove.push(x, x + 1);
            } else if (v1 === "]") {
              newNeedToMove.push(x - 1, x);
            }
            break;
          }
          case "[": {
            if (v1 === "[") {
              newNeedToMove.push(x);
            } else if (v1 === "]" && newNeedToMove.at(-1) !== x) {
              newNeedToMove.push(x - 1, x);
            }
            break;
          }
          case "]": {
            if (v1 === "[") {
              newNeedToMove.push(x, x + 1);
            } else if (v1 === "]") {
              newNeedToMove.push(x);
            }
          }
        }
      }
      needToMove.unshift(newNeedToMove);
    }

    for (const moved of needToMove) {
      for (const x of moved) {
        map[i][x] = map[i - d][x];
        map[i - d][x] = ".";
      }
      i -= d;
    }
  }

  map[start[0]][start[1]] = ".";
  start[0] += direction[0];
  start[1] += direction[1];
  map[start[0]][start[1]] = "@";
}

function sumGPSCoordinates(map: string[][]) {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "[") {
        sum += i * 100 + j;
      }
    }
  }
  return sum;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(sumOfGPSCoordinates(puzzle));
}
