function executeValidInstructions(memory: string) {
  const operations = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
  let match;
  let result = 0;
  let enabled = true;
  while (match = operations.exec(memory)) {
    const [m, a, b] = match;
    if (m === `don't()`) {
      enabled = false;
    } else if (m === `do()`) {
      enabled = true;
    } else if (enabled) {
      result += Number(a) * Number(b);
    }
  }
  return result;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const memory = await Deno.readTextFile(filename);
  console.log(executeValidInstructions(memory));
}
