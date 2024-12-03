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

function countDistances(first: number[], second: number[]) {
  first.sort((a, b) => a - b);
  second.sort((a, b) => a - b);

  let distance = 0;
  for (let i = 0; i < first.length; i++) {
    distance += Math.abs(first[i] - second[i]);
  }
  return distance;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const text = await Deno.readTextFile(filename);
  const { first, second } = readInput(text);
  console.log(countDistances(first, second));
}
