function calculateSafetyFactor(
  robots: string[],
  seconds: number,
  wide: number,
  tall: number,
) {
  const quadrants = [0, 0, 0, 0];
  const center = [Math.floor(wide / 2), Math.floor(tall / 2)];
  for (const line of robots) {
    const robot = /p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/.exec(line)!.slice(1)
      .map(
        Number,
      );
    const position = getRobotPosition(robot, seconds, wide, tall);
    if (position[0] < center[0]) {
      if (position[1] < center[1]) {
        quadrants[0]++;
      } else if (position[1] > center[1]) {
        quadrants[1]++;
      }
    } else if (position[0] > center[0]) {
      if (position[1] < center[1]) {
        quadrants[2]++;
      } else if (position[1] > center[1]) {
        quadrants[3]++;
      }
    }
  }
  return quadrants.reduce((p, n) => p * n);
}

function getRobotPosition(
  robot: number[],
  seconds: number,
  wide: number,
  tall: number,
) {
  let [x, y, vx, vy] = robot;

  x = (x + vx * seconds) % wide;
  y = (y + vy * seconds) % tall;

  if (x < 0) {
    x = (x + wide) % wide;
  }
  if (y < 0) {
    y = (y + tall) % tall;
  }

  return [x, y];
}

if (import.meta.main) {
  const [filename, wide, tall] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(calculateSafetyFactor(puzzle, 100, Number(wide), Number(tall)));
}
