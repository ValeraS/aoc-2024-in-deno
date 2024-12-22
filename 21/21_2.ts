function countSumOfComplexities(
  codes: string[],
  numberOfDirectionalKeyboards: number,
) {
  let sum = 0n;
  for (const code of codes) {
    sum += BigInt(shortestPathLength(
      code,
      numberOfDirectionalKeyboards + 1,
      numericKeyboard,
      emptyPlaceNumericKeyboard,
    )) *
      BigInt(parseInt(code, 10));
  }

  return sum;
}

const numericKeyboard: Record<string, [number, number]> = {
  "A": [3, 4],
  "0": [2, 4],
  "1": [1, 3],
  "2": [2, 3],
  "3": [3, 3],
  "4": [1, 2],
  "5": [2, 2],
  "6": [3, 2],
  "7": [1, 1],
  "8": [2, 1],
  "9": [3, 1],
};

const emptyPlaceNumericKeyboard: [number, number] = [1, 4];

const directionalKeyboard: Record<string, [number, number]> = {
  "A": [3, 1],
  "^": [2, 1],
  ">": [3, 2],
  "v": [2, 2],
  "<": [1, 2],
};

const emptyPlaceDirectionalKeyboard: [number, number] = [1, 1];

const cache = new Map<string, number>();

const directions: Record<string, [number, number]> = {
  "^": [0, -1],
  ">": [1, 0],
  "v": [0, 1],
  "<": [-1, 0],
};

function shortestPathLength(
  code: string,
  level: number,
  keyboard: Record<string, [number, number]>,
  empty: [number, number],
): number {
  if (level === 0) {
    return code.length;
  }

  if (cache.has(`${code}:${level}`)) {
    return cache.get(`${code}:${level}`)!;
  }

  let length = 0;
  let current = keyboard["A"];
  for (const b of code) {
    const mov = [...movements(
      keyboard[b][0] - current[0],
      keyboard[b][1] - current[1],
    )].filter((ins) => {
      let [x, y] = current;
      for (const c of ins) {
        const dir = directions[c];
        x += dir[0];
        y += dir[1];
        if (
          empty[0] === x &&
          empty[1] === y
        ) {
          return false;
        }
      }
      return true;
    });

    length += Math.min(
      ...mov.map((m) =>
        shortestPathLength(
          m + "A",
          level - 1,
          directionalKeyboard,
          emptyPlaceDirectionalKeyboard,
        )
      ),
    );
    current = keyboard[b];
  }

  cache.set(`${code}:${level}`, length);

  return length;
}

function* movements(dx: number, dy: number): Generator<string> {
  if (dx === 0 && dy === 0) {
    yield "";
  }
  if (dx > 0) {
    yield* [...movements(dx - 1, dy)].map((v) => ">" + v);
  }
  if (dy > 0) {
    yield* [...movements(dx, dy - 1)].map((v) => "v" + v);
  }
  if (dx < 0) {
    yield* [...movements(dx + 1, dy)].map((v) => "<" + v);
  }
  if (dy < 0) {
    yield* [...movements(dx, dy + 1)].map((v) => "^" + v);
  }
}

if (import.meta.main) {
  const [filename, numberOfDirectionalKeyboards] = Deno.args;
  const puzzle = (await Deno.readTextFile(filename)).split("\n").slice(0, -1);

  console.log(
    countSumOfComplexities(puzzle, Number(numberOfDirectionalKeyboards)),
  );
}
