function calculateFencePrice(map: string[]) {
  let price = 0;
  const visited = new Set<string>();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (visited.has(id(i, j))) {
        continue;
      }
      price += priceOfFencingRegion(map, i, j, visited);
    }
  }
  return price;
}

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
function priceOfFencingRegion(
  map: string[],
  i: number,
  j: number,
  visited: Set<string>,
) {
  let area = 0;
  const queue = [[i, j]];
  const fencesByDirection = new Map<string, number[][]>();
  while (queue.length) {
    const [x, y] = queue.shift()!;
    if (visited.has(id(x, y))) {
      continue;
    }
    const v = map[x][y];
    visited.add(id(x, y));
    area++;
    for (const [dx, dy] of directions) {
      if (map[x + dx]?.[y + dy] === v) {
        queue.push([x + dx, y + dy]);
      } else {
        const fences = fencesByDirection.get(id(dx, dy)) ?? [];
        fences.push([x, y]);
        fencesByDirection.set(id(dx, dy), fences);
      }
    }
  }

  let sides = 0;
  for (const [dx, dy] of directions) {
    const fences = fencesByDirection.get(id(dx, dy)) ?? [];
    if (fences.length === 0) {
      continue;
    }
    const [fixed, changing] = dx ? [0, 1] : [1, 0];
    fences.sort((a, b) => {
      const r = a[fixed] - b[fixed];
      if (r === 0) {
        return a[changing] - b[changing];
      }
      return r;
    });
    let curr = fences[0][fixed];
    sides++;
    for (let i = 1; i < fences.length; i++) {
      if (curr !== fences[i][fixed]) {
        curr = fences[i][fixed];
        sides++;
      } else if (fences[i - 1][changing] + 1 !== fences[i][changing]) {
        sides++;
      }
    }
  }

  return sides * area;
}

function id(...args: unknown[]) {
  return args.join(":");
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(calculateFencePrice(puzzle));
}
