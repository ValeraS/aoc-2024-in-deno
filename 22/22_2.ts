function sumOfNSecretNumbers(input: string[], N: number) {
  const sequences = new Map<string, number>();

  for (const line of input) {
    const number = BigInt(line);
    getNSecretNumber(number, N, sequences);
  }

  let max = 0;
  let maxSeq = "";
  for (const [seq, price] of sequences) {
    if (max < price) {
      max = price;
      maxSeq = seq;
    }
  }

  console.log(maxSeq);

  return max;
}

function getNSecretNumber(
  number: bigint,
  N: number,
  sequences: Map<string, number>,
) {
  const sequence: number[] = [];
  const earlySequences = new Set<string>();
  let price = Number(number % 10n);
  for (let i = 0; i < N; i++) {
    number = nextSecretNumber(number);
    const currentPrice = Number(number % 10n);
    const diff = price - currentPrice;
    price = currentPrice;
    sequence.push(diff);
    if (sequence.length > 4) {
      sequence.shift();
    }
    if (sequence.length === 4) {
      const key = sequenceKey(sequence);
      if (!earlySequences.has(key)) {
        sequences.set(key, (sequences.get(key) ?? 0) + price);
        earlySequences.add(key);
      }
    }
  }
  return number;
}

function sequenceKey(s: number[]) {
  return s.join(":");
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
