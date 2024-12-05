function readInput(puzzle: string[]) {
  const rules: Map<string, Set<string>> = new Map();
  const updates: string[][] = [];
  let i = 0;
  for (; i < puzzle.length; i++) {
    const line = puzzle[i];
    if (!line) {
      i++;
      break;
    }
    const [page, followPage] = line.split("|");
    const pages = rules.get(page) ?? new Set<string>();
    pages.add(followPage);
    rules.set(page, pages);
  }
  for (; i < puzzle.length; i++) {
    updates.push(puzzle[i].split(","));
  }

  return { rules, updates };
}

function sumMiddlePages(rules: Map<string, Set<string>>, updates: string[][]) {
  let sum = 0;
  for (const update of updates) {
    if (!isCorrectUpdate(rules, update)) {
      const fixedUpdate = fixUpdate(rules, update);
      sum += Number(fixedUpdate[Math.floor(fixedUpdate.length / 2)]);
    }
  }
  return sum;
}

function isCorrectUpdate(rules: Map<string, Set<string>>, update: string[]) {
  for (let i = 1; i < update.length; i++) {
    const currentPage = update[i];
    const followingPages = rules.get(currentPage) ?? new Set();
    for (let j = 0; j < i; j++) {
      if (followingPages.has(update[j])) {
        return false;
      }
    }
  }
  return true;
}

function fixUpdate(rules: Map<string, Set<string>>, update: string[]) {
  return update.toSorted((a, b) => {
    const aFollowers = rules.get(a) ?? new Set();
    if (aFollowers.has(b)) {
      return 1;
    }
    const bFollowers = rules.get(b) ?? new Set();
    if (bFollowers.has(a)) {
      return -1;
    }
    return 0;
  });
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);
  const { rules, updates } = readInput(puzzle);
  console.log(sumMiddlePages(rules, updates));
}
