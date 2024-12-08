function countAntidote(puzzle: string[]) {
  const positions = new Map<string, [number, number][]>();
  const antidotes = new Set<string>();
  for (let i = 0; i < puzzle.length; i++) {
    for (let j = 0; j < puzzle[i].length; j++) {
      const freq = puzzle[i][j];
      if (freq === ".") {
        continue;
      }

      const freqPositions = positions.get(freq) ?? [];
      for (const p of freqPositions) {
        const difX = i - p[0];
        const difY = j - p[1];

        let antidoteX = p[0];
        let antidoteY = p[1];
        while (
          antidoteX >= 0 && antidoteX < puzzle.length && antidoteY >= 0 &&
          antidoteY < puzzle[i].length
        ) {
          antidotes.add(`${antidoteX}:${antidoteY}`);
          antidoteX += difX;
          antidoteY += difY;
        }

        antidoteX = i;
        antidoteY = j;
        while (
          antidoteX >= 0 && antidoteX < puzzle.length && antidoteY >= 0 &&
          antidoteY < puzzle[i].length
        ) {
          antidotes.add(`${antidoteX}:${antidoteY}`);
          antidoteX -= difX;
          antidoteY -= difY;
        }
      }
      freqPositions.push([i, j]);
      positions.set(freq, freqPositions);
    }
  }
  return antidotes.size;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  console.log(countAntidote(puzzle));
}
