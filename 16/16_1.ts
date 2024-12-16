const directions: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function countLowestReindeerScores(map: string[]) {
  const { start, finish } = findStartFinish(map);

  const queue: [[number, number], [number, number], number][] = [[start, [
    0,
    -1,
  ], 0]];
  const visitedPoints = new Map<string, number>();

  while (queue.length) {
    const [point, direction, cost] = queue.shift()!;
    for (const dir of directions) {
      const nextPoint: [number, number] = [
        point[0] + dir[0],
        point[1] + dir[1],
      ];
      if (map[point[0]][point[1]] === "#") {
        continue;
      }
      let nextCost = cost + 1;
      if (direction[0] === dir[0] && direction[1] === dir[1]) {
        //
      } else if (direction[0] !== dir[0] && direction[1] === dir[1]) {
        nextCost += 2 * 1000;
      } else {
        nextCost += 1000;
      }
      const pointKey = key(nextPoint, dir);
      const visited = visitedPoints.get(pointKey);
      if (visited === undefined || visited > nextCost) {
        visitedPoints.set(pointKey, nextCost);
        if (nextPoint[0] !== finish[0] || nextPoint[1] !== finish[1]) {
          queue.push([nextPoint, dir, nextCost]);
        }
      }
    }
  }

  let scores = Infinity;
  for (const dir of directions) {
    scores = Math.min(scores, visitedPoints.get(key(finish, dir)) ?? Infinity);
  }

  return scores;
}

function key(point: [number, number], direction: [number, number]) {
  return `${point[0]}:${point[1]}:${direction[0]}:${direction[1]}}`;
}

function findStartFinish(map: string[]) {
  const start: [number, number] = [-1, -1];
  const finish: [number, number] = [-1, -1];
  for (let i = 0; i < map.length; i++) {
    const j = map[i].indexOf("S");
    if (j !== -1) {
      start[0] = i;
      start[1] = j;
    }
    const k = map[i].indexOf("E");
    if (k !== -1) {
      finish[0] = i;
      finish[1] = k;
    }
  }

  return { start, finish };
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countLowestReindeerScores(puzzle));
}
