function calculateFencePrice(map: string[]) {
  let price = 0;
  const visited = new Set<string>();
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (visited.has(`${i}:${j}`)) {
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
  let perimeter = 0;
  let area = 0;
  const queue = [[i, j]];
  while (queue.length) {
    const [x, y] = queue.shift()!;
    if (visited.has(`${x}:${y}`)) {
      continue;
    }
    const v = map[x][y];
    visited.add(`${x}:${y}`);
    area++;
    for (const [dx, dy] of directions) {
      if (map[x + dx]?.[y + dy] === v) {
        queue.push([x + dx, y + dy]);
      } else {
        perimeter++;
      }
    }
  }
  return perimeter * area;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(calculateFencePrice(puzzle));
}
