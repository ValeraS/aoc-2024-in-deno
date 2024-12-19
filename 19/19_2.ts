function countPossiblePatterns(input: string[]) {
  const towels = input[0].split(/,\s*/);

  let count = 0;
  for (let i = 2; i < input.length; i++) {
    count += countPossibleCombinations(input[i], towels);
  }

  return count;
}

function countPossibleCombinations(pattern: string, towels: string[]) {
  const positions: number[] = [0];
  const visited: number[][] = Array(pattern.length + 1).fill(0).map(() =>
    new Array(0)
  );

  while (positions.length > 0) {
    const pos = positions.shift()!;
    for (const t of towels) {
      const newPos = pos + t.length;
      if (pattern.slice(pos, newPos) === t) {
        if (!visited[newPos].includes(pos)) {
          visited[newPos].push(pos);
        }
        if (!positions.includes(newPos)) {
          positions.push(pos + t.length);
        }
      }
    }
  }

  const counted: number[] = new Array(visited.length).fill(-1);
  return countVisited(visited, visited.length - 1, counted);
}

function countVisited(
  visited: number[][],
  i: number,
  counted: number[],
): number {
  if (i === 0) {
    return 1;
  }

  let count = 0;
  for (const v of visited[i]) {
    if (counted[v] === -1) {
      counted[v] = countVisited(visited, v, counted);
    }
    count += counted[v];
  }
  return count;
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(countPossiblePatterns(puzzle));
}
