function sumOfNSecretNumbers(input: string[], N: number) {
  let sum = 0n;
  for (const line of input) {
    const number = BigInt(line);
    sum += getNSecretNumber(number, N);
  }

  return sum;
}

function getNSecretNumber(number: bigint, N: number) {
  for (let i = 0; i < N; i++) {
    number = nextSecretNumber(number);
  }
  return number;
}

function nextSecretNumber(number: bigint) {
  number = ((number << 6n) ^ number) % 16777216n;
  number = ((number >> 5n) ^ number) % 16777216n;
  number = ((number << 11n) ^ number) % 16777216n;
  return number;
}

if (import.meta.main) {
  const [filename, N] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(
    sumOfNSecretNumbers(puzzle, Number(N)),
  );
}
