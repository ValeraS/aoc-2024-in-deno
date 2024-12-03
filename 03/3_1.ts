function executeValidInstructions(memory: string) {
  const operation = /mul\((\d{1,3}),(\d{1,3})\)/g;
  let match;
  let result = 0;
  while (match = operation.exec(memory)) {
    const [, a, b] = match;
    result += Number(a) * Number(b);
  }
  return result;
}

if (import.meta.main) {
  const filename = Deno.args[0];
  const memory = await Deno.readTextFile(filename);
  console.log(executeValidInstructions(memory));
}
