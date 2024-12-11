function countTrailheadsScores(map: string[]) {
  let scores = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === "0") {
        scores += countTrailheadScores(map, i, j);
      }
    }
  }
  return scores;
}

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function countTrailheadScores(map: string[], i: number, j: number) {
  const queue: [number, number, number][] = [[i, j, 0]];
  const trails = new Set<string>();
  while (queue.length) {
    const [x, y, s] = queue.shift()!;
    for (const [dx, dy] of directions) {
      const next = `${s + 1}`;
      if (map[x + dx]?.[y + dy] === next) {
        if (next === "9") {
          trails.add(`${x + dx}:${y + dy}`);
        } else {
          queue.push([x + dx, y + dy, s + 1]);
        }
      }
    }
  }
  return trails.size;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countTrailheadsScores(puzzle));
}
