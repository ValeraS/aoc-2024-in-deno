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
    const line = input[i];
    if (!line) {
      break;
    }
    const index = line.indexOf("@");
    if (index !== -1) {
      start = [i, index];
    }
    map.push(line.split(""));
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
  while (true) {
    i += direction[0];
    j += direction[1];
    if (map[i][j] === "#") {
      return;
    }
    if (map[i][j] === ".") {
      break;
    }
  }

  map[start[0]][start[1]] = ".";
  start[0] += direction[0];
  start[1] += direction[1];
  map[start[0]][start[1]] = "@";
  while (i !== start[0] || j !== start[1]) {
    map[i][j] = "O";
    i -= direction[0];
    j -= direction[1];
  }
}

function sumGPSCoordinates(map: string[][]) {
  let sum = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "O") {
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
