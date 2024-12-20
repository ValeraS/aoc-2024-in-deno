const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

function key(x: number, y: number) {
  return `${x}:${y}`;
}

function countCheats(input: string[], minSave: number, cheatTime: number) {
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
  for (const [point, cost] of costNodeMap) {
    const [x, y] = point.split(":").map(Number);
    for (let i = 0; i < cheatTime + 1; i++) {
      for (let j = cheatTime - i; j >= 0; j--) {
        if (i === 0 && j === 0) {
          continue;
        }
        const points: [number, number][] = [];
        if (i > 0 && j > 0) {
          points.push([i, j], [-1 * i, j], [-1 * i, -1 * j], [i, -1 * j]);
        } else if (i > 0) {
          points.push([i, j], [-1 * i, j]);
        } else {
          points.push([i, j], [i, -1 * j]);
        }

        for (const p of points) {
          const id = key(x + p[0], y + p[1]);
          if (costNodeMap.has(id)) {
            const diff = costNodeMap.get(id)! - cost - (i + j);
            if (diff >= minSave) {
              count++;
            }
          }
        }
      }
    }
  }

  return count;
}

if (import.meta.main) {
  const [filename, minSave, cheatTime] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(countCheats(puzzle, Number(minSave), Number(cheatTime)));
}
