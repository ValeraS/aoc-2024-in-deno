function shortestPath(input: string[], size: number, bytes: number) {
  const map: string[][] = new Array(size).fill([]).map(() =>
    new Array(size).fill(".")
  );
  for (let i = 0; i < bytes; i++) {
    const [x, y] = input[i].split(",").map(Number);
    map[y][x] = "#";
  }

  for (let i = bytes; i < input.length; i++) {
    const [x, y] = input[i].split(",").map(Number);
    map[y][x] = "#";
    if (findShortestPath(map, [0, 0], [size - 1, size - 1]) === -1) {
      return key([x, y]);
    }
  }
  return "not found";
}

type Point = [number, number];
const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]] as const;

function findShortestPath(map: string[][], start: Point, finish: Point) {
  const queue: [Point, number][] = [[start, 0]];
  const visited = new Set<string>();
  const size = map.length;
  while (queue.length) {
    const [point, length] = queue.shift()!;
    for (const dir of directions) {
      const newPoint: Point = [point[0] + dir[0], point[1] + dir[1]];
      if (
        newPoint[0] < 0 || newPoint[0] >= size || newPoint[1] < 0 ||
        newPoint[1] >= size || map[newPoint[0]][newPoint[1]] === "#" ||
        visited.has(key(newPoint))
      ) {
        continue;
      }
      visited.add(key(newPoint));
      if (newPoint[0] === finish[0] && newPoint[1] === finish[1]) {
        return length + 1;
      }
      queue.push([newPoint, length + 1]);
    }
  }
  return -1;
}

function key(p: [number, number]) {
  return `${p[0]}:${p[1]}`;
}

if (import.meta.main) {
  const [filename, size, bytes] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(shortestPath(puzzle, Number(size), Number(bytes)));
}
