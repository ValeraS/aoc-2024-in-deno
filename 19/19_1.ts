function countPossiblePatterns(input: string[]) {
  const towels = input[0].split(/,\s*/);

  let count = 0;
  for (let i = 2; i < input.length; i++) {
    if (isPatternPossible(input[i], towels)) {
      count++;
    }
  }

  return count;
}

function isPatternPossible(pattern: string, towels: string[]) {
  const positions: number[] = [0];
  while (positions.length > 0) {
    const pos = positions.shift()!;
    for (const t of towels) {
      if (pattern.slice(pos, pos + t.length) === t) {
        const newPos = pos + t.length;
        if (newPos === pattern.length) {
          return true;
        }
        if (!positions.includes(newPos)) {
          positions.push(pos + t.length);
        }
      }
    }
  }
  return false;
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(countPossiblePatterns(puzzle));
}
