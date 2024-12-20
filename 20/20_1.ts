const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function key(x: number, y: number) {
  return `${x}:${y}`;
}

function countCheats(input: string[], minSave: number) {
  const map = input.map((v) => v.split(""));
  let i = 0, j = 0;
  for (; i < map.length; i++) {
    j = map[i].indexOf("S");
    if (j !== -1) {
      map[i][j] = ".";
      break;
    }
  }

  const costNodeMap = new Map<string, number>();
  let cost = 0;
  while (true) {
    costNodeMap.set(key(i, j), cost);
    if (map[i][j] === "E") {
      map[i][j] = ".";
      break;
    }

    let found = false;
    for (const dir of directions) {
      const v = map[i + dir[0]]?.[j + dir[1]];
      if (
        (v === "." || v === "E") &&
        !costNodeMap.has(key(i + dir[0], j + dir[1]))
      ) {
        i += dir[0];
        j += dir[1];
        cost++;
        found = true;
        break;
      }
    }
    if (!found) {
      break;
    }
  }

  let count = 0;
  for (let i = 1; i < map.length - 1; i++) {
    for (let j = 1; j < map[i].length - 1; j++) {
      if (map[i][j] === "#") {
        if (map[i - 1]?.[j] === "." && map[i + 1]?.[j] === ".") {
          const cost = Math.abs(
            costNodeMap.get(key(i - 1, j))! - costNodeMap.get(key(i + 1, j))!,
          ) - 2;

          if (cost >= minSave) {
            count++;
          }
        }
        if (map[i][j - 1] === "." && map[i][j + 1] === ".") {
          const cost = Math.abs(
            costNodeMap.get(key(i, j - 1))! - costNodeMap.get(key(i, j + 1))!,
          ) - 2;

          if (cost >= minSave) {
            count++;
          }
        }
      }
    }
  }
  return count;
}

if (import.meta.main) {
  const [filename, minSave] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(countCheats(puzzle, Number(minSave)));
}
