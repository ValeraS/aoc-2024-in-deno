function countStones(stones: string[], steps: number) {
  const m = new Map();
  let result = 0;
  for (const stone of stones) {
    result += countS(stone, steps, m);
  }
  return result;
}

function blink(stones: string[]) {
  const newStones: string[] = [];
  for (const stone of stones) {
    if (stone === "0") {
      newStones.push("1");
    } else if (stone.length % 2 === 0) {
      newStones.push(stone.slice(0, stone.length / 2));
      newStones.push(`${Number(stone.slice(stone.length / 2))}`);
    } else {
      newStones.push(`${Number(stone) * 2024}`);
    }
  }
  return newStones;
}

function countS(stone: string, steps: number, map: Map<string, number>) {
  let count = map.get(`${stone}:${steps}`) ?? 0;
  if (count) {
    return count;
  }

  const stones = blink([stone]);
  if (steps === 1) {
    count = stones.length;
  } else {
    for (let i = 0; i < stones.length; i++) {
      count += countS(stones[i], steps - 1, map);
    }
  }

  map.set(`${stone}:${steps}`, count);

  return count;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countStones(puzzle[0].split(/\s+/), 75));
}
