function countStones(stones: string[], steps: number) {
  let result = stones;
  for (let i = 0; i < steps; i++) {
    console.log(result);
    result = blink(result);
  }
  return result.length;
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

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countStones(puzzle[0].split(/\s+/), 25));
}
