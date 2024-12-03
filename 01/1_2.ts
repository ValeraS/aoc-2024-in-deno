export function readInput(text: string) {
  const lines = text.split("\n");
  const first: number[] = [];
  const second: number[] = [];

  for (const line of lines) {
    if (!line) {
      continue;
    }
    const [a, b] = line.split(/\s+/).map(Number);
    first.push(a);
    second.push(b);
  }

  return { first, second };
}

function countSimilarities(first: number[], second: number[]) {
  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);

  let similarityScore = 0;
  let count = 0;
  let index = 0;
  let last = Infinity;
  for (let i = 0; i < first.length; i++) {
    const current = first[i];
    if (last !== current) {
      last = current;
      count = 0;
      if (second[index] > current) {
        continue;
      }
      while (second[index] < current && index < second.length) {
        index++;
      }
      while (second[index] === current && index < second.length) {
        index++;
        count++;
      }
    }
    similarityScore += current * count;
  }
  return similarityScore;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const text = await Deno.readTextFile(filename);
  const { first, second } = readInput(text);
  console.log(countSimilarities(first, second));
}
