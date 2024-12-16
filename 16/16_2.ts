const directions: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]];

function countLowestReindeerScores(map: string[]) {
  const { start, finish } = findStartFinish(map);

  const queue: [[number, number], [number, number], number, Set<string>][] = [[
    start,
    [
      0,
      -1,
    ],
    0,
    new Set([`${start[0]}:${start[1]}`]),
  ]];
  const visitedPoints = new Map<string, [number, Set<string>]>([[
    key(start, [0, -1]),
    [0, new Set([`${start[0]}:${start[1]}`])],
  ]]);

  while (queue.length) {
    const [point, direction, cost, points] = queue.shift()!;
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
      if (visited === undefined || visited[0] >= nextCost) {
        const newPoints = new Set(points);
        newPoints.add(`${nextPoint[0]}:${nextPoint[1]}`);
        if (visited && visited[0] === nextCost) {
          for (const p of visited[1]) {
            newPoints.add(p);
          }
        }
        visitedPoints.set(pointKey, [nextCost, newPoints]);

        if (nextPoint[0] !== finish[0] || nextPoint[1] !== finish[1]) {
          queue.push([nextPoint, dir, nextCost, newPoints]);
        }
      }
    }
  }

  let scores = Infinity;
  let points: Set<string> = new Set();
  for (const dir of directions) {
    const [score = Infinity, curPoints = new Set<string>()] =
      visitedPoints.get(key(finish, dir)) ?? [];
    if (score < scores) {
      scores = score;
      points = curPoints;
    }
  }

  return points.size;
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
