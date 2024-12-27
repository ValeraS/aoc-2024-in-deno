function countUniqPairs(input: string) {
  const { locks, keys, height } = readInput(input);

  let count = 0;
  for (const lock of locks) {
    for (const key of keys) {
      if (lock.every((v, i) => (v + key[i]) <= height)) {
        count++;
      }
    }
  }

  return count;
}

function readInput(input: string) {
  const patterns = input.split("\n\n");
  const keys = [];
  const locks = [];
  let height = 0;
  for (const p of patterns) {
    const pattern = p.split("\n");
    height = pattern.length - 2;
    const lengths = new Array(pattern[0].length).fill(0);
    if (pattern[0][0] === "#") {
      for (let i = 0; i < pattern[0].length; i++) {
        let j = 1;
        while (pattern[j][i] === "#" && j < pattern.length) {
          j++;
        }
        lengths[i] = j - 1;
      }
      locks.push(lengths);
    } else {
      for (let i = 0; i < pattern[0].length; i++) {
        let j = pattern.length - 1;
        while (pattern[j][i] === "#" && j > 0) {
          j--;
        }
        lengths[i] = pattern.length - j - 2;
      }
      keys.push(lengths);
    }
  }
  return { locks, keys, height };
}

if (import.meta.main) {
  const [filename] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).trim();

  console.log(countUniqPairs(puzzle));
}
