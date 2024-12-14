function findEasterEgg(
  input: string[],
  wide: number,
  tall: number,
) {
  const robots = input.map((line) =>
    /p=(-?\d+),(-?\d+)\s+v=(-?\d+),(-?\d+)/.exec(line)!.slice(1)
      .map(
        Number,
      )
  );

  let seconds = 0;
  while (seconds < 10000) {
    seconds++;
    const positions = new Set<string>();
    let isUniq = true;
    for (const robot of robots) {
      const position = getRobotPosition(robot, seconds, wide, tall);
      if (positions.has(`${position[0]}:${position[1]}`)) {
        isUniq = false;
        break;
      }
      positions.add(`${position[0]}:${position[1]}`);
    }
    if (isUniq) {
      let string = "";
      for (let i = 0; i < tall; i++) {
        string += Array(wide).fill(".").map((v, j) =>
          positions.has(`${j}:${i}`) ? "*" : v
        ).join("") + "\n";
      }
      console.log(string);
      return seconds;
    }
  }
  return -1;
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
  console.log(findEasterEgg(puzzle, Number(wide), Number(tall)));
}
